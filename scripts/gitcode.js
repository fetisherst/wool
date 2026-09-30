/**
 * GitCode 积分任务全自动:
 * 刷新token -> 随机浏览热门项目 -> Star+Unstar -> 模拟分享 -> 签到 -> 一键领取 -> 复查
 * token 失效时通过青龙 sendNotify 推送提醒
 * 环境变量: GITCODE_REFRESH_TOKEN (约7天), GITCODE_ACCESS_TOKEN (可选,自动刷新)
 *           + 任一青龙通知渠道变量 (如 PUSH_KEY / BARK_PUSH / TG_BOT_TOKEN 等)
 */
const BASE = 'https://web-api.gitcode.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36';
let accessToken = process.env.GITCODE_ACCESS_TOKEN || '';
const refreshToken = process.env.GITCODE_REFRESH_TOKEN || '';

let sendNotify = null;
try { sendNotify = require('./sendNotify.js').sendNotify; } catch (e) {}

function headers(pageUri, pageRef) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    Origin: 'https://gitcode.com',
    Referer: 'https://gitcode.com/',
    'User-Agent': UA,
    'x-app-channel': 'gitcode-fe',
    'x-device-type': 'Windows',
    'x-network-type': '4g',
    'x-os-version': '10',
    'x-platform': 'web',
    'page-uri': encodeURIComponent(pageUri || 'https://gitcode.com/setting/points'),
    'page-ref': encodeURIComponent(pageRef || 'https://gitcode.com/?p=seo'),
  };
}

async function req(method, url, pageUri, pageRef) {
  const res = await fetch(url, { method, headers: headers(pageUri, pageRef) });
  const text = await res.text();
  let data = null;
  if (text) { try { data = JSON.parse(text); } catch { data = text; } }
  if (!res.ok) { const e = new Error('HTTP ' + res.status); e.status = res.status; e.data = data; throw e; }
  return data;
}

async function notify(title, body) {
  console.log(`📢 ${title}: ${body}`);
  if (!sendNotify) return;
  try { await sendNotify(title, body); } catch (e) { console.log('通知发送失败:', e.message); }
}

async function doRefresh() {
  if (!refreshToken) { await notify('GitCode 积分脚本', '缺少 GITCODE_REFRESH_TOKEN，请从浏览器 Cookie 复制并更新到青龙环境变量'); return false; }
  try {
    const res = await fetch(`${BASE}/uc/api/v1/user/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
        Origin: 'https://gitcode.com', Referer: 'https://gitcode.com/',
        'User-Agent': UA, 'x-app-channel': 'gitcode-fe', 'x-platform': 'web',
      },
      body: 'refresh_token=' + encodeURIComponent(refreshToken),
    });
    const d = await res.json();
    if (res.ok && d.access_token) { accessToken = d.access_token; console.log('✅ token 已刷新'); return true; }
    // refresh token 也失效了 -> 推送提醒
    await notify('GitCode 积分脚本: token 已失效',
      `refresh token 刷新失败 (HTTP ${res.status})。\n请打开 gitcode.com -> F12 -> Application -> Cookies -> 复制 GITCODE_REFRESH_TOKEN，更新到青龙环境变量。`);
  } catch (e) {
    await notify('GitCode 积分脚本: token 刷新异常', e.message);
  }
  return false;
}

// 随机取一个热门项目 (前2页共30个里随机)
async function pickHotProject() {
  const page = 1 + Math.floor(Math.random() * 2);
  const d = await req('GET', `${BASE}/api/v2/projects?order_by=star_count&sort=desc&per_page=15&page=${page}`, 'https://gitcode.com/?p=seo');
  const list = d?.content || [];
  if (!list.length) throw new Error('热门列表为空');
  const p = list[Math.floor(Math.random() * list.length)];
  return { id: p.id, name: p.path_with_namespace || p.path };
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  if (!accessToken && !refreshToken) { console.log('❌ 缺少环境变量'); return; }

  // 验证 token, 失效则刷新
  try {
    await req('GET', `${BASE}/uc/api/v1/task?page=1&per_page=1&task_level=4&type=1`);
  } catch (e) {
    if (e.status === 401 || !accessToken) {
      if (!await doRefresh()) return; // 刷新失败已在 doRefresh 里推送提醒
    }
  }

  const log = [];

  // 1. 随机浏览热门项目 (task 59): 详情 + page_stay
  let pid = null;
  try {
    const hot = await pickHotProject();
    pid = hot.id;
    const pUri = `https://gitcode.com/${hot.name}?source_module=home_hot_selection`;
    await req('GET', `${BASE}/api/v2/projects/${pid}`, pUri);
    await sleep(3000 + Math.floor(Math.random() * 3000));
    await fetch(`${BASE}/api/v1/report?event_id=page_stay`, { method: 'POST', headers: headers(pUri), body: '{}' });
    console.log(`✅ 浏览热门项目: ${hot.name} (id=${pid})`);
    log.push(`浏览 ${hot.name}`);
  } catch (e) { console.log('⚠️ 浏览任务:', e.status || e.message); }
  await sleep(2000);

  // 2. Star + Unstar (task 62)
  if (pid) {
    try {
      await req('POST', `${BASE}/api/v2/projects/${pid}/star`);
      console.log(`✅ Star ${pid}`);
      log.push('Star');
    } catch (e) { console.log('⚠️ Star:', e.status); }
    await sleep(3000);
    try {
      await req('POST', `${BASE}/api/v2/projects/${pid}/unstar`);
      console.log(`✅ 已取消 Star ${pid}`);
    } catch (e) { console.log('⚠️ Unstar:', e.status); }
    await sleep(2000);
  }

  // 3. 模拟每日分享 (task 77)
  try {
    const inviteUri = 'https://gitcode.com/setting/points?type=invite';
    await fetch(`${BASE}/api/v1/report?event_id=page_click`, {
      method: 'POST', headers: headers(inviteUri, 'https://gitcode.com/setting/points'),
      body: JSON.stringify({ event_id: 'page_click', page_uri: inviteUri }),
    });
    console.log('✅ 分享行为已上报');
    log.push('分享');
  } catch (e) { console.log('⚠️ 分享上报失败:', e.message); }
  await sleep(2000);

  // 4. 签到 (task 1)
  try {
    await req('POST', `${BASE}/uc/api/v1/task/sign-in`);
    console.log('✅ 签到成功');
    log.push('签到');
  } catch (e) {
    const msg = e.data?.error_message || e.message;
    console.log(msg && (msg.includes('已签到') || msg.includes('已超过')) ? '☑ 签到: 今日已签' : `⚠️ 签到: ${e.status}`);
  }
  await sleep(2000);

  // 5. 一键领取
  try {
    const r = await req('POST', `${BASE}/uc/api/v1/task/claim-all`);
    console.log('✅ 一键领取:', JSON.stringify(r?.data ?? r));
  } catch (e) {
    console.log('❌ 一键领取失败:', e.status);
  }

  // 6. 复查
  let summary = '';
  try {
    const d = await req('GET', `${BASE}/uc/api/v1/task?page=1&per_page=20&task_level=4&type=1`);
    const list = d?.content || [];
    const remain = list.filter(t => t.status === 2);
    const earned = list.filter(t => t.status !== 2).reduce((s, t) => s + t.score, 0);
    summary = remain.length ? `剩余 ${remain.length} 个: ${remain.map(t => `${t.cn_name}(${t.score}分)`).join(' / ')} | 本轮已得 ${earned} 分` : `🎉 全部完成! 本轮共 ${earned} 分`;
    console.log(summary);
  } catch (e) { console.log('⚠️ 复查失败:', e.status); }

  // 7. 推送本轮结果
  await notify('GitCode 积分脚本', (log.length ? '本轮完成: ' + log.join(', ') + '\n' : '') + (summary || '复查失败，详见日志'));
})();
