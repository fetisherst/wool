/**
 *
 * 卡夫亨
 *
 * cron 0 0,8 * * *  kfh_v2.js         
 *  多账号并行执行任务模板 
 * fscrm.kraftheinz.net.cn/crm/域名下的token
 */
//=====================================================//
const $ = new Env("卡夫亨");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1
const debug = 0
let ckStr = ($.isNode() ? process.env.kfh_data : $.getdata('kfh_data')) || '';  //检测CK  外部
let msg, ck;
let host = 'fscrm.kraftheinz.net.cn';
let hostname = 'https://' + host;
let sharecode = [];
//---------------------------------------------------//
async function tips(ckArr) {
    //DoubleLog(`当前脚本版本${Version}\n📌,如果脚本版本不一致请及时更新`);
    DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
    debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}
!(async () => {
    //await tips(ckArr);  //脚本提示
    await start(); //开始任务
    await SendMsg(msg); //发送通知

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());


//---------------------------------------------------------------------------------封装循环测试
async function newstart(name, taskname, time) {  //任务名 函数名 等待时间
    let ckArr = await checkEnv(ckStr, "kfh_data");  //检查CK
    console.log("\n📌📌📌📌📌📌📌📌" + name + "📌📌📌📌📌📌📌📌");
    for (i = 0; i < ckArr.length; i++) {
        ck = ckArr[i].split("&");                 //单账号多变量分割符,如果一个账号需要user和token两个变量,那么则输入user1&token1@user2&token2...   
        //let CK = ckArr[i]
        await taskname();
        await $.wait(time * 1000);
    }
}
async function newstart1(name, taskname, ckArr) {  //任务名 函数名 等待时间
    //let ckArr = await checkEnv(ckStr, "kfh_data");  //检查CK
    console.log("\n📌📌📌📌📌📌📌📌" + name + "📌📌📌📌📌📌📌📌");
    for (i = 0; i < ckArr.length; i++) {
        ck = ckArr[i].split("&");                 //单账号多变量分割符,如果一个账号需要user和token两个变量,那么则输入user1&token1@user2&token2...   
        //let CK = ckArr[i]
        await taskname(ckArr);
        //await $.wait(time * 1000);
    }
}
//-------------------------------------------------------------------------------封装循环测试

async function start() {
    //console.log("\n📌📌📌📌📌📌📌📌执行任务1📌📌📌📌📌📌📌📌");
    //for (i = 0; i < ckArr.length; i++) {
    //    ck = ckArr[i].split("&");                 //单账号多变量分割符,如果一个账号需要user和token两个变量,那么则输入user1&token1@user2&token2...   
    //    let CK = ckArr[i]
    //    await userinfo();
    //    await $.wait(2 * 1000);
    //}
    let ckArr = await checkEnv(ckStr, "kfh_data");
    await newstart("用户信息查询", userinfo, 2)
    await newstart("获取分享ID", getshareid, 2)
    await newstart1("内部互助", recordshare, ckArr)

}




//------------------------------------------------------------------------------------------
//用户信息查询
async function userinfo() {
    try {
        let url = {
            url: `${hostname}/crm/public/index.php/api/v1/getUserInfo`,
            headers: {
                "Host": host,
                "token": ck[0]
            },

        };
        let result = await httpGet(url, `用户信息查询`);

        //console.log(result);
        if (result?.error_code == 0) {
            //console.log(`账号[` + Number(i + 1) + `]` + `当前用户:${result.data.nickname} 🎉`);
            nickname = result.data.nickname
            await signin();
        } else {
            console.log(`账号[` + Number(i + 1) + `]` + `用户查询失败 🎉`);
            //console.log(result);
        }
    } catch (error) {
        //console.log(error);
        console.log("卡夫亨服务器卡爆啦");
    }

}


//用户签到 post
async function signin() {
    try {
        let url = {
            url: `${hostname}/crm/public/index.php/api/v1/dailySign`,
            headers: {
                "Host": host,
                "token": ck[0],
            },

        };
        let result = await httpPost(url, `签到`);

        //console.log(result);
        if (result?.error_code == 0) {
            console.log(`账号[` + Number(i + 1) + `]` + `用户:` + nickname + `签到成功🎉`);
        } else if (result?.error_code == 30001) {
            console.log(`账号[` + Number(i + 1) + `]` + `用户:` + nickname + `签到失败,${result.msg}🎉`);
            //console.log(result);
        } else {
            console.log(`账号[` + Number(i + 1) + `]` + `用户:` + nickname + `签到失败,${result.msg}🎉`);
        }
    } catch (error) {
        //console.log(error);
        console.log("卡夫亨服务器卡爆啦");
    }

}

/**
  * 获取分享文章    httpPost  看你的请求头
  */
async function getshareid() {
    try {
        let url = {
            url: `${hostname}/crm/public/index.php/api/v1/getCookbookIndex`,
            headers: {
                "Host": host,
                "token": ck[0],
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": 18,
            },
            body: "page=1&pagesize=10"
        };
        let result = await httpPost(url, `获取随机分享文章ID`);

        //console.log(result);
        if (result?.error_code == 0) {
            index = randomInt(0, 9)
            //console.log(`获取随机分享文章ID:${result.data.chineseCookbook.data[index].id} 🎉`);
            let shareid = result.data.chineseCookbook.data[index].id
            await share(shareid);
        } else {
            console.log(`获取: 失败 ❌ 了呢,原因未知!`);
            //console.log(result);
        }

    } catch (error) {
        //console.log(error);
        console.log("卡夫亨服务器卡爆啦");
    }

}

/**
* 分享    httpPost        //参考上面的即可  这个函数也可以复制 改下相应的就可以
*/
async function share(shareid) {
    try {
        let url = {
            url: `${hostname}/crm/public/index.php/api/v1/createCookbookCode`,
            headers: {
                "Host": host,
                "token": ck[0],
                "Content-Length": 15,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "cookbook_id=" + shareid
        };
        let result = await httpPost(url, `分享`);

        //console.log(result);
        if (result?.error_code == 0) {
            code_url = result?.data.code_url.replace("https://fscrm.kraftheinz.net.cn/?", "")
            console.log(`账号[` + Number(i + 1) + `]${code_url}获取分享文章链接成功,添加到内部助力池成功 🎉`);
            await wait(1);
            //shareurl=result?.data.code_url 
            //sharecode = shareurl.replace("https://fscrm.kraftheinz.net.cn/?","")  //删除链接中多余部分
            //shareurl=result?.data.code_url  //将分享链接push到助力池
            //inviteId.push(sharecode)
            sharecode.push(code_url)
        } else {
            console.log(`账号[` + Number(i + 1) + `]获取分享链接:失败,原因未知!`);
            //console.log(result);
        }
    } catch (error) {
        //console.log(error);
        console.log("卡夫亨服务器卡爆啦");
    }

}



/**
 *内部互助    httpPost  看你的请求头
 */  //循环助力 第二个账号助力第一个账号的链接 依次类推 最后一个账号被账号一助力
async function recordshare(ckArr) {
    if (i + 1 !== ckArr.length) {
        try {
            let url = {
                url: `${hostname}/crm/public/index.php/api/v1/recordScoreShare`,
                headers: {
                    "Host": host,
                    "token": ck[0],

                },
                body: sharecode[i + 1]
            };
            let result = await httpPost(url, `内部互助`);

            if (result?.error_code == 0) {
                console.log(`账号[` + Number(i + 2) + `]个账号被助力成功:${result.msg} 🎉`);
                await wait(1);
            } else {
                console.log(`内部互助: 失败 ❌ 了呢,原因未知!`);
                //console.log(result);
            }

            //console.log(result);

        } catch (error) {
            //console.log(error);
            console.log("卡夫亨服务器卡爆啦");
        }
    }
    if (i + 1 == ckArr.length) {
        try {
            let url = {
                url: `${hostname}/crm/public/index.php/api/v1/recordScoreShare`,
                headers: {
                    "Host": host,
                    "token": ck[0],

                },
                body: sharecode[0]
            };
            let result = await httpPost(url, `内部互助`);

            //console.log(result);
            if (result?.error_code == 0) {
                console.log(`账号最后一位助力首账号成功:${result.msg} 🎉`);
                await wait(1);
            } else {
                console.log(`内部互助: 失败 ❌ 了呢,原因未知!`);
                //console.log(result);
            }
        } catch (error) {
            //console.log(error);
            console.log("卡夫亨服务器卡爆啦");
        }
    }

}






















// #region ********************************************************  固定代码  ********************************************************
/**
 * 变量检查
 */
async function checkEnv(ck, Variables) {
    return new Promise((resolve) => {
        let ckArr = []
        if (ck) {
            if (ck.indexOf("@") !== -1) {

                ck.split("@").forEach((item) => {
                    ckArr.push(item);
                });
            } else if (ck.indexOf("\n") !== -1) {

                ck.split("\n").forEach((item) => {
                    ckArr.push(item);
                });
            } else {
                ckArr.push(ck);
            }
            resolve(ckArr)
        } else {
            console.log(` ${$.neme}:未填写变量 ${Variables} ,请仔细阅读脚本说明!`)
        }
    }
    )
}
/**
 * 发送消息
 */
async function SendMsg(message) {
    if (!message) return;
    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require("./sendNotify");
            await notify.sendNotify($.name, message);
        } else {
            // $.msg(message);
            $.msg($.name, '', message)
        }
    } else {
        console.log(message);
    }
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
    if ($.isNode()) {
        if (data) {
            console.log(`${data}`);
            msg += `\n${data}`;
        }
    } else {
        console.log(`${data}`);
        msg += `\n${data}`;
    }

}
/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
* 等待 X 秒
*/
function wait(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}

/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3) {
    return new Promise((resolve) => {
        let url = getUrlObject;
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
            console.log(url);
        }

        $.get(
            url,
            async (err, resp, data) => {
                try {
                    if (debug) {
                        console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
                        console.log(data);
                        console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
                        console.log(JSON.parse(data));
                    }
                    let result = JSON.parse(data);
                    if (result == undefined) {
                        return;
                    } else {
                        resolve(result);
                    }

                } catch (e) {
                    //console.log(err, resp);
                    console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    msg = `\n ${tip} 失败了!请稍后尝试!!`
                    console.log("卡夫亨服务器卡爆啦");
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}

/**
 * post请求
 */
async function httpPost(postUrlObject, tip, timeout = 3) {
    return new Promise((resolve) => {
        let url = postUrlObject;
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
            console.log(url);
        }

        $.post(
            url,
            async (err, resp, data) => {
                try {
                    if (debug) {
                        console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
                        console.log(data);
                        console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
                        console.log(JSON.parse(data));
                    }
                    let result = JSON.parse(data);
                    if (result == undefined) {
                        return;
                    } else {
                        resolve(result);
                    }

                } catch (e) {
                    //console.log(err, resp);
                    console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                    msg = `\n ${tip} 失败了!请稍后尝试!!`
                    console.log("卡夫亨服务器卡爆啦");
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}

/**
 * 网络请求 (get, post等)
 */
async function httpRequest(postOptionsObject, tip, timeout = 3) {
    return new Promise((resolve) => {

        let Options = postOptionsObject;
        let request = require('request');
        if (!tip) {
            let tmp = arguments.callee.toString();
            let re = /function\s*(\w*)/i;
            let matches = re.exec(tmp);
            tip = matches[1];
        }
        if (debug) {
            console.log(`\n 【debug】=============== 这是 ${tip} 请求 信息 ===============`);
            console.log(Options);
        }

        request(Options, async (err, resp, data) => {
            try {
                if (debug) {
                    console.log(`\n\n 【debug】===============这是 ${tip} 返回数据==============`);
                    console.log(data);
                    console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
                    console.log(JSON.parse(data));
                }
                let result = JSON.parse(data);
                if (!result) return;
                resolve(result);
            } catch (e) {
                //console.log(err, resp);
                console.log(`\n ${tip} 失败了!请稍后尝试!!`);
                msg = `\n ${tip} 失败了!请稍后尝试!!`
                console.log("卡夫亨服务器卡爆啦");
            } finally {
                resolve();
            }
        }), timeout

    });
}


/**
 * debug调试
 */
function debugLog(...args) {
    if (debug) {
        console.log(...args);
    }
}

// 完整 Env
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
