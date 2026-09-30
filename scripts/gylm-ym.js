/*
@蛋炒饭
软件名:高佣联盟(安卓苹果都可以)
养猫可以得红包，红包大小随机
活动入口:底部菜单栏-任务-每日签到养喵咪赚钱
变量名:gyncck
进入农场后抓包https://saas.hixiaoman.com/开头的，cookie里面userId和consumerId的值用#链接，只要数字就可以
如:userId=gylm-IOS-hdgj_rxbhsy=1891943122975506676;consumerId=gylm-IOS-hdgj_rxbhsy=5320418;变量只需要1891943122975506676#5320418就行
多账号@隔开
邀请码：23522129
定时:一天一到两次
*/
NAME = "高佣联盟-养猫咪";
VALY = ["gyncck"];
LOGS = 0;
CK = "";
var userList = [];
usid = 0;
class Bar {
  constructor(_0x693905) {
    this.i = _0x693905.split("#")[0];
    this.p = _0x693905.split("#")[1];
    this._ = ++usid;
    this.f = "账号 [" + this._ + "]";
    this.log = true;
  }
  async treeid() {
    let _0x357896 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x3ff80a = await task("get", "https://saas.hixiaoman.com/activityTreeMoney/getConfig ", _0x357896);
    if (_0x3ff80a.code == 0) {
      this.treeid = _0x3ff80a.data.treeConfig.treeId;
      this.reid = _0x3ff80a.data.treeConfig.upgradeReward.id;
      this.rety = _0x3ff80a.data.treeConfig.upgradeReward.taskType;
      this.log = true;
      console.log(this.f + "账户现金:" + _0x3ff80a.data.balance / 100 + "元==>喵咪等级:" + _0x3ff80a.data.treeConfig.treeLevelNo + "级");
    } else {
      this.log = false;
    }
  }
  async bottle() {
    let _0x5400f6 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x5e9d18 = "{\"treeId\":" + this.treeid + ",\"multiple\":1}";
    let _0x1a8b3f = await task("post", "https://saas.hixiaoman.com/activityTree/receiveBottle", _0x5400f6, _0x5e9d18);
    console.log(this.f + "领取福利猫粮:" + _0x1a8b3f.desc);
    await wait(3000);
  }
  async DayWelfare() {
    let _0x32e058 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x2d0ab8 = await task("post", "https://saas.hixiaoman.com/activityTree/receiveDayWelfare", _0x32e058);
    console.log(this.f + "领取每日福利:" + _0x2d0ab8.desc);
    await wait(3000);
  }
  async signtask() {
    let _0x149dfa = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0xcad827 = await task("get", "https://saas.hixiaoman.com/activityTask/getActivityTaskList", _0x149dfa);
    for (let _0x49afcb of _0xcad827.data.signTask) {
      this.sid = _0x49afcb.id;
      this.sty = _0x49afcb.taskType;
      await this.signin();
    }
  }
  async signin() {
    let _0x4379da = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x6d507 = "{\"taskType\":" + this.sty + ",\"taskConfigId\":" + this.sid + "}";
    let _0x49eef8 = await task("post", "https://saas.hixiaoman.com/activityTree/receiveSign", _0x4379da, _0x6d507);
    if (_0x49eef8.code == 0) {
      console.log(this.f + "签到:" + _0x49eef8.desc);
    } else if (_0x49eef8.code == 300515) {
      console.log(this.f + "签到:" + _0x49eef8.desc);
    }
  }
  async water() {
    for (let _0x5ec00c = 0; _0x5ec00c < 50; _0x5ec00c++) {
      let _0x416387 = {
        Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
        Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
        "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
      };
      let _0x21defc = "{\"treeId\":" + this.treeid + "}";
      let _0x218373 = await task("post", "https://saas.hixiaoman.com/activityTreeMoney/watering", _0x416387, _0x21defc);
      if (_0x218373.code == 0) {
        await wait(5000);
        console.log(this.f + "喂猫:" + _0x218373.desc);
      } else {
        console.log(this.f + "喂猫:" + _0x218373.desc);
        break;
      }
    }
  }
  async jdtasklist() {
    let _0x78cd2c = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0xbbb35a = await task("get", "https://saas.hixiaoman.com/activityTask/getActivityTaskList", _0x78cd2c);
    for (let _0x36e59d of _0xbbb35a.data.speedTask) {
      this.id = _0x36e59d.id;
      this.ty = _0x36e59d.taskType;
      await this.jdtask();
    }
  }
  async jdtask() {
    let _0x1535d7 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x416789 = "{\"taskType\":" + this.ty + ",\"taskConfigId\":" + this.id + "}";
    let _0x2afe67 = await task("post", "https://saas.hixiaoman.com/activityTask/receiveUpgradeSpeed", _0x1535d7, _0x416789);
    if (_0x2afe67.code == 0) {
      console.log(this.f + ":任务" + this.id + "领取阶段奖励:" + _0x2afe67.desc);
    } else {
      console.log(this.f + ":任务" + this.id + "领取阶段奖励结果:" + _0x2afe67.desc);
    }
    await wait(5000);
  }
  async daytasklist() {
    let _0x291a7f = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x171de3 = await task("get", "https://saas.hixiaoman.com/activityTask/getActivityTaskList", _0x291a7f);
    for (let _0x181466 of _0x171de3.data.taskList) {
      this.rid = _0x181466.id;
      this.rty = _0x181466.taskType;
      await this.daytask();
      await this.waterlist();
    }
  }
  async daytask() {
    let _0x3816a2 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x563f17 = "{\"taskType\":" + this.rty + ",\"taskConfigId\":" + this.rid + "}";
    let _0xbd55ab = await task("post", "https://saas.hixiaoman.com/activityTask/finishTask", _0x3816a2, _0x563f17);
    console.log(this.f + "完成日常任务:" + _0xbd55ab.desc);
    await wait(5000);
  }
  async waterlist() {
    let _0x3f0647 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x191657 = "{\"taskType\":" + this.rty + ",\"taskConfigId\":" + this.rid + "}";
    let _0x503ef7 = await task("post", "https://saas.hixiaoman.com/activityTask/receiveTaskList", _0x3f0647, _0x191657);
    if (_0x503ef7.code == 0) {
      console.log(this.f + ":任务" + this.rid + "领取奖励:" + _0x503ef7.desc);
    } else {
      console.log(this.f + ":任务" + this.rid + "奖励领取结果:" + _0x503ef7.desc);
    }
    await wait(5000);
  }
  async reward() {
    let _0x2d5b02 = {
      Referer: "https://saas.hixiaoman.com/tree_fortuneCat.html?ADTAG=12738&appKey=gylmhdgj-az_mkqyjo&activityNo=FARM_57_57_220720140641&parentActNo=FARM_57_57_220720140641&subActivityNo=FARM_57_57_220720140641&strategyId=17337&parentStrategyId=17337&parentPeriodId=177978&parentActPlanId=18931&activityId=56&bossId=16502&placeId=12738&activityType=6&putType=60000&as=2&skinId=229&themeId=10644109&flowId=0&flowActPlanId=0&activityPlanId=18931&flowActivityType=0&actPeriodId=177978&actTaskId=null&consumeType=1&userKey=" + this.i + "&isShare=null&consumerId=" + this.p + "&vcs=0&wuBaNum=0&adSources=1",
      Cookie: "userId=gylmhdgj-az_mkqyjo=" + this.i + "; appKey=gylmhdgj-az_mkqyjo; consumerId=gylmhdgj-az_mkqyjo=" + this.p,
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2012K2C Build/RKQ1.200928.002; wv) Chrome/87.0.4280.141 Mobile Safari/537.36bxnative-1.5.3.4"
    };
    let _0x1695d9 = "{\"taskType\":" + this.rety + ",\"taskConfigId\":" + this.reid + ",\"treeId\":" + this.treeid + "}";
    let _0x22ed6c = await task("post", "https://saas.hixiaoman.com/activityTreeMoney/receiveUpgrade", _0x2d5b02, _0x1695d9);
    if (_0x22ed6c.code == 0) {
      console.log(this.f + ":领取升级奖励:" + _0x22ed6c.desc);
    } else {
      console.log(this.f + ":升级奖励领取结果:" + _0x22ed6c.desc);
    }
    await wait(5000);
  }
}
(async () => {
  console.log("蛋炒饭美食交流频道：https://t.me/+s7DXGAezpNhjOGU1");
  console.log(NAME);
  checkEnv();
  for (let _0x203329 of userList) {
    await _0x203329.treeid();
  }
  let _0x42c53e = userList.filter(_0x21b47c => _0x21b47c.log == true);
  if (_0x42c53e.length == 0) {
    console.log(NAME + " 呆子，检查CK是否正确！！");
    return;
  }
  for (let _0x3635cf of _0x42c53e) {
    await _0x3635cf.bottle();
    await _0x3635cf.DayWelfare();
    await _0x3635cf.signtask();
    await _0x3635cf.water();
    await _0x3635cf.jdtasklist();
    await _0x3635cf.daytasklist();
    await _0x3635cf.reward();
  }
})().catch(_0x49218c => {
  console.log(_0x49218c);
}).finally(() => {});
function RT(_0x4ae7e8, _0x2b3295) {
  return Math.round(Math.random() * (_0x2b3295 - _0x4ae7e8) + _0x4ae7e8);
}
function times(_0xe3b5f3) {
  if (_0xe3b5f3 == 10) {
    let _0x330435 = Math.round(new Date().getTime() / 1000).toString();
    return _0x330435;
  } else {
    let _0x38b490 = new Date().getTime();
    return _0x38b490;
  }
}
async function task(_0x5128b9, _0x54f64c, _0x33415b, _0x17322c) {
  if (_0x5128b9 == "delete") {
    _0x5128b9 = _0x5128b9.toUpperCase();
  } else {
    _0x5128b9 = _0x5128b9;
  }
  const _0xc804f1 = require("request");
  if (_0x5128b9 == "post") {
    delete _0x33415b["content-type"];
    delete _0x33415b["Content-type"];
    delete _0x33415b["content-Type"];
    if (safeGet(_0x17322c)) {
      _0x33415b["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x33415b["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0x17322c) {
      _0x33415b["Content-Length"] = lengthInUtf8Bytes(_0x17322c);
    }
  }
  _0x33415b.Host = _0x54f64c.replace("//", "/").split("/")[1];
  if (_0x5128b9.indexOf("T") < 0) {
    var _0x3f913c = {
      url: _0x54f64c,
      headers: _0x33415b,
      body: _0x17322c
    };
  } else {
    var _0x3f913c = {
      url: _0x54f64c,
      headers: _0x33415b,
      form: JSON.parse(_0x17322c)
    };
  }
  return new Promise(async _0x3eadb1 => {
    _0xc804f1[_0x5128b9.toLowerCase()](_0x3f913c, (_0x174ddb, _0x1d8a11, _0x37bab7) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0x3f913c);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x37bab7));
        }
      } catch (_0x1168c8) {} finally {
        if (!_0x174ddb) {
          if (safeGet(_0x37bab7)) {
            _0x37bab7 = JSON.parse(_0x37bab7);
          } else {
            _0x37bab7 = _0x37bab7;
          }
        } else {
          _0x37bab7 = _0x54f64c + "   API请求失败，请检查网络重试\n" + _0x174ddb;
        }
        return _0x3eadb1(_0x37bab7);
      }
    });
  });
}
function SJS(_0x156183) {
  _0x156183 = _0x156183 || 32;
  var _0x31fbe4 = "1234567890";
  var _0x1be4cc = _0x31fbe4.length;
  var _0x10921c = "";
  for (i = 0; i < _0x156183; i++) {
    _0x10921c += _0x31fbe4.charAt(Math.floor(Math.random() * _0x1be4cc));
  }
  return _0x10921c;
}
function SJSxx(_0xde074c) {
  _0xde074c = _0xde074c || 32;
  var _0x1a9e26 = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0x31a269 = _0x1a9e26.length;
  var _0x311e45 = "";
  for (i = 0; i < _0xde074c; i++) {
    _0x311e45 += _0x1a9e26.charAt(Math.floor(Math.random() * _0x31a269));
  }
  return _0x311e45;
}
function safeGet(_0x51ccad) {
  try {
    if (typeof JSON.parse(_0x51ccad) == "object") {
      return true;
    }
  } catch (_0x1753d1) {
    return false;
  }
}
function lengthInUtf8Bytes(_0x10fbee) {
  let _0x4908e7 = encodeURIComponent(_0x10fbee).match(/%[89ABab]/g);
  return _0x10fbee.length + (_0x4908e7 ? _0x4908e7.length : 0);
}
async function checkEnv() {
  let _0x299865 = process.env[VALY] || CK;
  let _0x570ff8 = 0;
  if (_0x299865) {
    for (let _0x37858e of _0x299865.split("@").filter(_0x3a3ab1 => !!_0x3a3ab1)) {
      userList.push(new Bar(_0x37858e));
    }
    _0x570ff8 = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x570ff8 + "个账号");
  return userList;
}
function wait(_0x2ee71b) {
  return new Promise(_0x255aad => setTimeout(_0x255aad, _0x2ee71b));
}
function stringToBase64(_0x42cfb7) {
  var _0xe3a78b = Buffer.from(_0x42cfb7).toString("base64");
  return _0xe3a78b;
}
function EncryptCrypto(_0x2f28b6, _0x143333, _0x20f781, _0x30c9ca, _0x34436a, _0x5f1622) {
  const _0x563e29 = require("crypto-js");
  const _0x578795 = _0x563e29.enc.Utf8.parse(_0x30c9ca);
  const _0x3fbbd3 = _0x563e29.enc.Utf8.parse(_0x5f1622);
  const _0x5aba5c = _0x563e29.enc.Utf8.parse(_0x34436a);
  const _0x5b43bf = _0x563e29[_0x2f28b6].encrypt(_0x578795, _0x5aba5c, {
    iv: _0x3fbbd3,
    mode: _0x563e29.mode[_0x143333],
    padding: _0x563e29.pad[_0x20f781]
  });
  return _0x5b43bf.toString();
}
function DecryptCrypto(_0xec9cd4, _0x3e322d, _0x415c46, _0x268680, _0x8e292d, _0x2df8f9) {
  const _0x38a183 = require("crypto-js");
  const _0x40396b = _0x38a183.enc.Utf8.parse(_0x2df8f9);
  const _0x57b3a8 = _0x38a183.enc.Utf8.parse(_0x8e292d);
  const _0x1e46e8 = _0x38a183[_0xec9cd4].decrypt(_0x268680, _0x57b3a8, {
    iv: _0x40396b,
    mode: _0x38a183.mode[_0x3e322d],
    padding: _0x38a183.pad[_0x415c46]
  });
  return _0x1e46e8.toString(_0x38a183.enc.Utf8);
}
function RSA(_0x137bc2, _0x3c7dda) {
  const _0x4af901 = require("node-rsa");
  let _0x23304f = new _0x4af901("-----BEGIN PUBLIC KEY-----\n" + _0x3c7dda + "\n-----END PUBLIC KEY-----");
  _0x23304f.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x23304f.encrypt(_0x137bc2, "base64", "utf8");
}
function SHA1_Encrypt(_0x2bc2a9) {
  return CryptoJS.SHA1(_0x2bc2a9).toString();
}
function SHA256(_0x44ea58) {
  const _0x296d4a = 8;
  const _0xfcadb0 = 0;
  function _0x16c954(_0x49df18, _0xb8adb5) {
    const _0x250c06 = (_0x49df18 & 65535) + (_0xb8adb5 & 65535);
    return (_0x49df18 >> 16) + (_0xb8adb5 >> 16) + (_0x250c06 >> 16) << 16 | _0x250c06 & 65535;
  }
  function _0x6a84bb(_0x38ccbf, _0x36001b) {
    return _0x38ccbf >>> _0x36001b | _0x38ccbf << 32 - _0x36001b;
  }
  function _0x3a1e61(_0x3fc0a6, _0x5486e6) {
    return _0x3fc0a6 >>> _0x5486e6;
  }
  function _0x419e5c(_0x880d50, _0x22a921, _0x40b535) {
    return _0x880d50 & _0x22a921 ^ ~_0x880d50 & _0x40b535;
  }
  function _0x23d905(_0x5131ce, _0x2c1d09, _0x252dc1) {
    return _0x5131ce & _0x2c1d09 ^ _0x5131ce & _0x252dc1 ^ _0x2c1d09 & _0x252dc1;
  }
  function _0x31507f(_0x484a67) {
    return _0x6a84bb(_0x484a67, 2) ^ _0x6a84bb(_0x484a67, 13) ^ _0x6a84bb(_0x484a67, 22);
  }
  function _0x3583e4(_0x233df2) {
    return _0x6a84bb(_0x233df2, 6) ^ _0x6a84bb(_0x233df2, 11) ^ _0x6a84bb(_0x233df2, 25);
  }
  function _0x18400f(_0x1b11a8) {
    return _0x6a84bb(_0x1b11a8, 7) ^ _0x6a84bb(_0x1b11a8, 18) ^ _0x3a1e61(_0x1b11a8, 3);
  }
  return function (_0x2486ec) {
    const _0x250494 = _0xfcadb0 ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x398870 = "";
    for (let _0x2534ca = 0; _0x2534ca < _0x2486ec.length * 4; _0x2534ca++) {
      _0x398870 += _0x250494.charAt(_0x2486ec[_0x2534ca >> 2] >> (3 - _0x2534ca % 4) * 8 + 4 & 15) + _0x250494.charAt(_0x2486ec[_0x2534ca >> 2] >> (3 - _0x2534ca % 4) * 8 & 15);
    }
    return _0x398870;
  }(function (_0x1ab152, _0x94d5d8) {
    const _0x43f076 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x51ef42 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x5397e9 = new Array(64);
    let _0x4c3cdc;
    let _0x4efc45;
    let _0xf59507;
    let _0x235871;
    let _0x52897b;
    let _0xeae3ed;
    let _0x551d01;
    let _0x6b82c2;
    let _0x366e67;
    let _0xc633c7;
    let _0x43d456;
    let _0x17d757;
    _0x1ab152[_0x94d5d8 >> 5] |= 128 << 24 - _0x94d5d8 % 32;
    _0x1ab152[15 + (_0x94d5d8 + 64 >> 9 << 4)] = _0x94d5d8;
    _0x366e67 = 0;
    for (; _0x366e67 < _0x1ab152.length; _0x366e67 += 16) {
      _0x4c3cdc = _0x51ef42[0];
      _0x4efc45 = _0x51ef42[1];
      _0xf59507 = _0x51ef42[2];
      _0x235871 = _0x51ef42[3];
      _0x52897b = _0x51ef42[4];
      _0xeae3ed = _0x51ef42[5];
      _0x551d01 = _0x51ef42[6];
      _0x6b82c2 = _0x51ef42[7];
      _0xc633c7 = 0;
      for (; _0xc633c7 < 64; _0xc633c7++) {
        _0x5397e9[_0xc633c7] = _0xc633c7 < 16 ? _0x1ab152[_0xc633c7 + _0x366e67] : _0x16c954(_0x16c954(_0x16c954(_0x6a84bb(_0xf2308f = _0x5397e9[_0xc633c7 - 2], 17) ^ _0x6a84bb(_0xf2308f, 19) ^ _0x3a1e61(_0xf2308f, 10), _0x5397e9[_0xc633c7 - 7]), _0x18400f(_0x5397e9[_0xc633c7 - 15])), _0x5397e9[_0xc633c7 - 16]);
        _0x43d456 = _0x16c954(_0x16c954(_0x16c954(_0x16c954(_0x6b82c2, _0x3583e4(_0x52897b)), _0x419e5c(_0x52897b, _0xeae3ed, _0x551d01)), _0x43f076[_0xc633c7]), _0x5397e9[_0xc633c7]);
        _0x17d757 = _0x16c954(_0x31507f(_0x4c3cdc), _0x23d905(_0x4c3cdc, _0x4efc45, _0xf59507));
        _0x6b82c2 = _0x551d01;
        _0x551d01 = _0xeae3ed;
        _0xeae3ed = _0x52897b;
        _0x52897b = _0x16c954(_0x235871, _0x43d456);
        _0x235871 = _0xf59507;
        _0xf59507 = _0x4efc45;
        _0x4efc45 = _0x4c3cdc;
        _0x4c3cdc = _0x16c954(_0x43d456, _0x17d757);
      }
      _0x51ef42[0] = _0x16c954(_0x4c3cdc, _0x51ef42[0]);
      _0x51ef42[1] = _0x16c954(_0x4efc45, _0x51ef42[1]);
      _0x51ef42[2] = _0x16c954(_0xf59507, _0x51ef42[2]);
      _0x51ef42[3] = _0x16c954(_0x235871, _0x51ef42[3]);
      _0x51ef42[4] = _0x16c954(_0x52897b, _0x51ef42[4]);
      _0x51ef42[5] = _0x16c954(_0xeae3ed, _0x51ef42[5]);
      _0x51ef42[6] = _0x16c954(_0x551d01, _0x51ef42[6]);
      _0x51ef42[7] = _0x16c954(_0x6b82c2, _0x51ef42[7]);
    }
    var _0xf2308f;
    return _0x51ef42;
  }(function (_0x2e801f) {
    const _0x2f3304 = [];
    const _0x3716b4 = (1 << _0x296d4a) - 1;
    for (let _0x5ae088 = 0; _0x5ae088 < _0x2e801f.length * _0x296d4a; _0x5ae088 += _0x296d4a) {
      _0x2f3304[_0x5ae088 >> 5] |= (_0x2e801f.charCodeAt(_0x5ae088 / _0x296d4a) & _0x3716b4) << 24 - _0x5ae088 % 32;
    }
    return _0x2f3304;
  }(_0x44ea58 = function (_0x42690d) {
    _0x42690d = _0x42690d.replace(/\r\n/g, "\n");
    let _0x57879c = "";
    for (let _0x141c07 = 0; _0x141c07 < _0x42690d.length; _0x141c07++) {
      const _0x1abe47 = _0x42690d.charCodeAt(_0x141c07);
      if (_0x1abe47 < 128) {
        _0x57879c += String.fromCharCode(_0x1abe47);
      } else if (_0x1abe47 > 127 && _0x1abe47 < 2048) {
        _0x57879c += String.fromCharCode(_0x1abe47 >> 6 | 192);
        _0x57879c += String.fromCharCode(_0x1abe47 & 63 | 128);
      } else {
        _0x57879c += String.fromCharCode(_0x1abe47 >> 12 | 224);
        _0x57879c += String.fromCharCode(_0x1abe47 >> 6 & 63 | 128);
        _0x57879c += String.fromCharCode(_0x1abe47 & 63 | 128);
      }
    }
    return _0x57879c;
  }(_0x44ea58)), _0x44ea58.length * _0x296d4a));
}
function MD5Encrypt(_0x7ae860) {
  function _0xef592d(_0x3ef192, _0x27a58f) {
    return _0x3ef192 << _0x27a58f | _0x3ef192 >>> 32 - _0x27a58f;
  }
  function _0x1a9910(_0x4a8e15, _0x12aa36) {
    var _0x5d1457;
    var _0x311d1b;
    var _0x3bab31;
    var _0x25fbd2;
    var _0xa3a82;
    _0x3bab31 = _0x4a8e15 & 2147483648;
    _0x25fbd2 = _0x12aa36 & 2147483648;
    _0x5d1457 = _0x4a8e15 & 1073741824;
    _0x311d1b = _0x12aa36 & 1073741824;
    _0xa3a82 = (_0x4a8e15 & 1073741823) + (_0x12aa36 & 1073741823);
    if (_0x5d1457 & _0x311d1b) {
      return _0xa3a82 ^ 2147483648 ^ _0x3bab31 ^ _0x25fbd2;
    } else if (_0x5d1457 | _0x311d1b) {
      if (_0xa3a82 & 1073741824) {
        return _0xa3a82 ^ 3221225472 ^ _0x3bab31 ^ _0x25fbd2;
      } else {
        return _0xa3a82 ^ 1073741824 ^ _0x3bab31 ^ _0x25fbd2;
      }
    } else {
      return _0xa3a82 ^ _0x3bab31 ^ _0x25fbd2;
    }
  }
  function _0x381bd4(_0x275bbf, _0x39e447, _0x1325d0, _0x16a4d9, _0x3187a1, _0x514b5f, _0xbd29c6) {
    var _0x551563;
    var _0x5c033b;
    _0x275bbf = _0x1a9910(_0x275bbf, _0x1a9910(_0x1a9910((_0x551563 = _0x39e447) & (_0x5c033b = _0x1325d0) | ~_0x551563 & _0x16a4d9, _0x3187a1), _0xbd29c6));
    return _0x1a9910(_0xef592d(_0x275bbf, _0x514b5f), _0x39e447);
  }
  function _0x5b326c(_0x529616, _0x4a5546, _0x3ee8cd, _0x2a4616, _0x2f8947, _0x3a7396, _0x70c351) {
    var _0xe69c74;
    var _0x3b1c99;
    var _0x1100b4;
    _0x529616 = _0x1a9910(_0x529616, _0x1a9910(_0x1a9910((_0xe69c74 = _0x4a5546, _0x3b1c99 = _0x3ee8cd, _0xe69c74 & (_0x1100b4 = _0x2a4616) | _0x3b1c99 & ~_0x1100b4), _0x2f8947), _0x70c351));
    return _0x1a9910(_0xef592d(_0x529616, _0x3a7396), _0x4a5546);
  }
  function _0x42466e(_0x25e9ae, _0x15655c, _0x5abf8d, _0x27560f, _0x2786cb, _0x197f00, _0x5b96ad) {
    var _0x3d198c;
    var _0x3073e4;
    _0x25e9ae = _0x1a9910(_0x25e9ae, _0x1a9910(_0x1a9910((_0x3d198c = _0x15655c) ^ (_0x3073e4 = _0x5abf8d) ^ _0x27560f, _0x2786cb), _0x5b96ad));
    return _0x1a9910(_0xef592d(_0x25e9ae, _0x197f00), _0x15655c);
  }
  function _0xdd2aa1(_0x4cf7a2, _0x48fe95, _0x2e5dcd, _0xd2b873, _0x59343b, _0xfd6778, _0x239f84) {
    var _0xc59105;
    var _0x1f1630;
    _0x4cf7a2 = _0x1a9910(_0x4cf7a2, _0x1a9910(_0x1a9910((_0xc59105 = _0x48fe95, (_0x1f1630 = _0x2e5dcd) ^ (_0xc59105 | ~_0xd2b873)), _0x59343b), _0x239f84));
    return _0x1a9910(_0xef592d(_0x4cf7a2, _0xfd6778), _0x48fe95);
  }
  function _0x347daf(_0x5c71ce) {
    var _0x3ba0f7;
    var _0x59e622 = "";
    var _0x4743d0 = "";
    for (_0x3ba0f7 = 0; _0x3ba0f7 <= 3; _0x3ba0f7++) {
      _0x59e622 += (_0x4743d0 = "0" + (_0x5c71ce >>> _0x3ba0f7 * 8 & 255).toString(16)).substr(_0x4743d0.length - 2, 2);
    }
    return _0x59e622;
  }
  var _0x47ad34;
  var _0x27fd54;
  var _0x16bd5c;
  var _0x2c4f52;
  var _0x29dde9;
  var _0x5899d8;
  var _0x28007a;
  var _0x594590;
  var _0x398ae8;
  var _0x3481e0 = [];
  _0x3481e0 = function (_0x6026c0) {
    for (var _0x36feef, _0x453844 = _0x6026c0.length, _0x62c8b5 = _0x453844 + 8, _0x49ffc4 = ((_0x62c8b5 - _0x62c8b5 % 64) / 64 + 1) * 16, _0x366b35 = Array(_0x49ffc4 - 1), _0x342848 = 0, _0x2f33f6 = 0; _0x453844 > _0x2f33f6;) {
      _0x36feef = (_0x2f33f6 - _0x2f33f6 % 4) / 4;
      _0x342848 = _0x2f33f6 % 4 * 8;
      _0x366b35[_0x36feef] = _0x366b35[_0x36feef] | _0x6026c0.charCodeAt(_0x2f33f6) << _0x342848;
      _0x2f33f6++;
    }
    _0x36feef = (_0x2f33f6 - _0x2f33f6 % 4) / 4;
    _0x342848 = _0x2f33f6 % 4 * 8;
    _0x366b35[_0x36feef] = _0x366b35[_0x36feef] | 128 << _0x342848;
    _0x366b35[_0x49ffc4 - 2] = _0x453844 << 3;
    _0x366b35[_0x49ffc4 - 1] = _0x453844 >>> 29;
    return _0x366b35;
  }(_0x7ae860 = function (_0x19392b) {
    _0x19392b = _0x19392b.replace(/\r\n/g, "\n");
    for (var _0x3d9a53 = "", _0x22b3c2 = 0; _0x22b3c2 < _0x19392b.length; _0x22b3c2++) {
      var _0x2c5c42 = _0x19392b.charCodeAt(_0x22b3c2);
      if (_0x2c5c42 < 128) {
        _0x3d9a53 += String.fromCharCode(_0x2c5c42);
      } else if (_0x2c5c42 > 127 && _0x2c5c42 < 2048) {
        _0x3d9a53 += String.fromCharCode(_0x2c5c42 >> 6 | 192);
        _0x3d9a53 += String.fromCharCode(_0x2c5c42 & 63 | 128);
      } else {
        _0x3d9a53 += String.fromCharCode(_0x2c5c42 >> 12 | 224);
        _0x3d9a53 += String.fromCharCode(_0x2c5c42 >> 6 & 63 | 128);
        _0x3d9a53 += String.fromCharCode(_0x2c5c42 & 63 | 128);
      }
    }
    return _0x3d9a53;
  }(_0x7ae860));
  _0x5899d8 = 1732584193;
  _0x28007a = 4023233417;
  _0x594590 = 2562383102;
  _0x398ae8 = 271733878;
  _0x47ad34 = 0;
  for (; _0x47ad34 < _0x3481e0.length; _0x47ad34 += 16) {
    _0x27fd54 = _0x5899d8;
    _0x16bd5c = _0x28007a;
    _0x2c4f52 = _0x594590;
    _0x29dde9 = _0x398ae8;
    _0x5899d8 = _0x381bd4(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 0], 7, 3614090360);
    _0x398ae8 = _0x381bd4(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 1], 12, 3905402710);
    _0x594590 = _0x381bd4(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 2], 17, 606105819);
    _0x28007a = _0x381bd4(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 3], 22, 3250441966);
    _0x5899d8 = _0x381bd4(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 4], 7, 4118548399);
    _0x398ae8 = _0x381bd4(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 5], 12, 1200080426);
    _0x594590 = _0x381bd4(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 6], 17, 2821735955);
    _0x28007a = _0x381bd4(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 7], 22, 4249261313);
    _0x5899d8 = _0x381bd4(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 8], 7, 1770035416);
    _0x398ae8 = _0x381bd4(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 9], 12, 2336552879);
    _0x594590 = _0x381bd4(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 10], 17, 4294925233);
    _0x28007a = _0x381bd4(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 11], 22, 2304563134);
    _0x5899d8 = _0x381bd4(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 12], 7, 1804603682);
    _0x398ae8 = _0x381bd4(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 13], 12, 4254626195);
    _0x594590 = _0x381bd4(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 14], 17, 2792965006);
    _0x28007a = _0x381bd4(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 15], 22, 1236535329);
    _0x5899d8 = _0x5b326c(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 1], 5, 4129170786);
    _0x398ae8 = _0x5b326c(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 6], 9, 3225465664);
    _0x594590 = _0x5b326c(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 11], 14, 643717713);
    _0x28007a = _0x5b326c(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 0], 20, 3921069994);
    _0x5899d8 = _0x5b326c(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 5], 5, 3593408605);
    _0x398ae8 = _0x5b326c(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 10], 9, 38016083);
    _0x594590 = _0x5b326c(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 15], 14, 3634488961);
    _0x28007a = _0x5b326c(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 4], 20, 3889429448);
    _0x5899d8 = _0x5b326c(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 9], 5, 568446438);
    _0x398ae8 = _0x5b326c(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 14], 9, 3275163606);
    _0x594590 = _0x5b326c(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 3], 14, 4107603335);
    _0x28007a = _0x5b326c(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 8], 20, 1163531501);
    _0x5899d8 = _0x5b326c(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 13], 5, 2850285829);
    _0x398ae8 = _0x5b326c(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 2], 9, 4243563512);
    _0x594590 = _0x5b326c(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 7], 14, 1735328473);
    _0x28007a = _0x5b326c(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 12], 20, 2368359562);
    _0x5899d8 = _0x42466e(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 5], 4, 4294588738);
    _0x398ae8 = _0x42466e(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 8], 11, 2272392833);
    _0x594590 = _0x42466e(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 11], 16, 1839030562);
    _0x28007a = _0x42466e(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 14], 23, 4259657740);
    _0x5899d8 = _0x42466e(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 1], 4, 2763975236);
    _0x398ae8 = _0x42466e(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 4], 11, 1272893353);
    _0x594590 = _0x42466e(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 7], 16, 4139469664);
    _0x28007a = _0x42466e(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 10], 23, 3200236656);
    _0x5899d8 = _0x42466e(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 13], 4, 681279174);
    _0x398ae8 = _0x42466e(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 0], 11, 3936430074);
    _0x594590 = _0x42466e(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 3], 16, 3572445317);
    _0x28007a = _0x42466e(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 6], 23, 76029189);
    _0x5899d8 = _0x42466e(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 9], 4, 3654602809);
    _0x398ae8 = _0x42466e(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 12], 11, 3873151461);
    _0x594590 = _0x42466e(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 15], 16, 530742520);
    _0x28007a = _0x42466e(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 2], 23, 3299628645);
    _0x5899d8 = _0xdd2aa1(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 0], 6, 4096336452);
    _0x398ae8 = _0xdd2aa1(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 7], 10, 1126891415);
    _0x594590 = _0xdd2aa1(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 14], 15, 2878612391);
    _0x28007a = _0xdd2aa1(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 5], 21, 4237533241);
    _0x5899d8 = _0xdd2aa1(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 12], 6, 1700485571);
    _0x398ae8 = _0xdd2aa1(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 3], 10, 2399980690);
    _0x594590 = _0xdd2aa1(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 10], 15, 4293915773);
    _0x28007a = _0xdd2aa1(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 1], 21, 2240044497);
    _0x5899d8 = _0xdd2aa1(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 8], 6, 1873313359);
    _0x398ae8 = _0xdd2aa1(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 15], 10, 4264355552);
    _0x594590 = _0xdd2aa1(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 6], 15, 2734768916);
    _0x28007a = _0xdd2aa1(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 13], 21, 1309151649);
    _0x5899d8 = _0xdd2aa1(_0x5899d8, _0x28007a, _0x594590, _0x398ae8, _0x3481e0[_0x47ad34 + 4], 6, 4149444226);
    _0x398ae8 = _0xdd2aa1(_0x398ae8, _0x5899d8, _0x28007a, _0x594590, _0x3481e0[_0x47ad34 + 11], 10, 3174756917);
    _0x594590 = _0xdd2aa1(_0x594590, _0x398ae8, _0x5899d8, _0x28007a, _0x3481e0[_0x47ad34 + 2], 15, 718787259);
    _0x28007a = _0xdd2aa1(_0x28007a, _0x594590, _0x398ae8, _0x5899d8, _0x3481e0[_0x47ad34 + 9], 21, 3951481745);
    _0x5899d8 = _0x1a9910(_0x5899d8, _0x27fd54);
    _0x28007a = _0x1a9910(_0x28007a, _0x16bd5c);
    _0x594590 = _0x1a9910(_0x594590, _0x2c4f52);
    _0x398ae8 = _0x1a9910(_0x398ae8, _0x29dde9);
  }
  return (_0x347daf(_0x5899d8) + _0x347daf(_0x28007a) + _0x347daf(_0x594590) + _0x347daf(_0x398ae8)).toLowerCase();
}