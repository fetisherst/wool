/*
@肥皂 番茄小说 
任务包含 看书，听书，看漫画，看广告，抽奖，睡觉，吃饭，广告，浏览，逛街，宝箱，视频等等~
部分任务领取不了不会打印日志，号的问题，不用看了，正常不黑一天几块，黑号几毛
抓包 cookie的sessionid值&iid&did iid和did可不要
变量 fqxxsapp
每天多少次自己决定，其他我不管。。。
多账号@或者换行 多号并发限制五个一组，不建议太多号同时跑
*/
const $ = new Env("番茄小说");
let envSplitor = ["@", "\n"];
let httpResult;
let httpReq;
let httpResp;
let userCookie = ($.isNode() ? process.env.fqxxsapp : $.getdata("fqxxsapp")) || "";
let userList = [];
let userIdx = 0;
let userCount = 0;
let id;
let token;
let uu = "";
var myDate = new Date();
var myHour = myDate.getHours();
class UserInfo {
  constructor(_0x42f4e5) {
    this.index = ++userIdx;
    this.name = this.index;
    this.valid = false;
    this.cFlag = true;
    this.id = 0;
    this.token = "";
    this.ydid = "";
    this.name = "";
    this.tid = "";
    this.sjid = "";
    try {
      this.ck = _0x42f4e5;
      this.iid = random(16);
      this.did = random(16);
      this.uu = "&ac=wifi&mac_address=DE%3AEC%3A1D%3A07%3A26%3A05&channel=sem_shenma_hgxs25&aid=1967&app_name=novelapp&version_code=350&version_name=5.6.9.32&device_platform=android&ssmix=a&device_type=16s+Pro&device_brand=meizu&language=zh&os_api=29&os_version=10&openudid=23223b450f2405c0&manifest_version_code=569&resolution=1080*2232&dpi=480&update_version_code=56932&_rticket=1678886547809&_rticket=1678886547829&gender=1&comment_tag_c=3&vip_state=0&category_style=1&oaid=ef6bedfc76ecde9350702b295d1adcc5&cdid=06b1ac06-3035-45b8-9b29-644e9a79fc31&luckycat_version_name=3.0.0-rc.35-novel&luckycat_version_code=300035&status_bar_height=32&ip=192.168.68.17&new_bookshelf=true";
      this.ck = this.ck.split("&")[0];
    } catch (_0x545b78) {}
  }
  async sh() {
    try {
      await this.fqdl();
      await $.wait(100);
      await this.fqxx();
      await $.wait(100);
      await this.fqqt();
      await $.wait(100);
      await this.fqlist();
      await $.wait(100);
      await this.fqqd();
      await $.wait(100);
      await this.fqkgg();
      await this.fqtsgg();
      await this.fqllhw();
      await this.fqllsp();
      await $.wait(100);
      await this.fqgj();
      await $.wait(100);
      await this.fqbx();
      await $.wait(300);
      await this.fqbxsp();
      await this.fqewgg();
      for (let _0x20458b of ["excitation_ad_chapter_end", "excitation_ad_chapter_end_low_arpu", "excitation_ad_chapter_begin_low_arpu", "excitation_ad_repeat", "excitation_ad_chapter_end", "excitation_ad_chapter_start", "excitation_ad_daily_earning"]) {
        this.tid = _0x20458b;
        await this.fqewgg1();
      }
      for (let _0x4fd087 of ["{\"meal_type\":0}", "{\"meal_type\":1}", "{\"meal_type\":2}", "{\"meal_type\":3}"]) {
        this.tid = _0x4fd087;
        await this.fqcf();
      }
      await this.fqcjcs();
      await this.fqcj();
      await this.fqlxcj();
      if (myHour == 19) {
        await this.fqsj();
      } else if (myHour == 2) {
        await this.fqsx();
      }
    } catch (_0x304fcf) {
      console.log(_0x304fcf);
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqdl() {
    try {
      let _0x22107e = "https://i.snssdk.com/reading/user/info/v/?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      this.populateUrlObject(_0x22107e);
      await httpRequest("get", this.urlObject);
      let _0x17a7c9 = httpResult;
      if (_0x17a7c9.code == 0) {
        console.log("账号[" + this.index + "]:番茄小说用户：" + _0x17a7c9.data.user_name);
      } else {
        console.log("账号[" + this.index + "]:番茄小说用户：" + JSON.stringify(_0x17a7c9));
        this.cFlag = false;
      }
    } catch (_0x31b2b5) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqxx() {
    try {
      let _0x87b03e = "https://i.snssdk.com/luckycat/novel/v1/user/info?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      this.populateUrlObject(_0x87b03e);
      await httpRequest("get", this.urlObject);
      let _0x12b62b = httpResult;
      if (_0x12b62b.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说现金金额：" + _0x12b62b.data.income_info_list[0].amount / 100 + "元，金币金额：" + _0x12b62b.data.income_info_list[1].amount);
      } else {
        console.log("账号[" + this.index + "]:番茄小说：" + JSON.stringify(_0x12b62b));
        this.cFlag = false;
      }
    } catch (_0x164e46) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqlist() {
    try {
      let _0x44c048 = "https://i.snssdk.com/luckycat/novel/v1/task/list?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      this.populateUrlObject(_0x44c048);
      await httpRequest("get", this.urlObject);
      let _0x571d2a = httpResult;
      if (_0x571d2a.err_no == 0) {
        for (let _0x30dc6a = 0; _0x30dc6a < _0x571d2a.data.task_list.daily.length; _0x30dc6a++) {
          if (_0x571d2a.data.task_list.daily[_0x30dc6a].completed == false) {
            if (_0x571d2a.data.task_list.daily[_0x30dc6a].name.indexOf("阅读") > -1) {
              this.ydid = _0x571d2a.data.task_list.daily[_0x30dc6a].key;
              this.name = _0x571d2a.data.task_list.daily[_0x30dc6a].name;
              console.log("账号[" + this.index + "]:番茄小说任务：" + _0x571d2a.data.task_list.daily[_0x30dc6a].name + "，状态：未完成，前往完成~任务奖励：" + _0x571d2a.data.task_list.daily[_0x30dc6a].reward[0].amount + "金币");
              await this.fqyd();
            }
            if (_0x571d2a.data.task_list.daily[_0x30dc6a].name.indexOf("漫画") > -1) {
              this.ydid = _0x571d2a.data.task_list.daily[_0x30dc6a].key;
              this.name = _0x571d2a.data.task_list.daily[_0x30dc6a].name;
              console.log("账号[" + this.index + "]:番茄小说任务：" + _0x571d2a.data.task_list.daily[_0x30dc6a].name + "，状态：未完成，前往完成~任务奖励：" + _0x571d2a.data.task_list.daily[_0x30dc6a].reward[0].amount + "金币");
              await this.fqmh();
            }
            if (_0x571d2a.data.task_list.daily[_0x30dc6a].name.indexOf("听书") > -1) {
              this.ydid = _0x571d2a.data.task_list.daily[_0x30dc6a].key;
              this.name = _0x571d2a.data.task_list.daily[_0x30dc6a].name;
              console.log("账号[" + this.index + "]:番茄小说任务：" + _0x571d2a.data.task_list.daily[_0x30dc6a].name + "，状态：未完成，前往完成~任务奖励：" + _0x571d2a.data.task_list.daily[_0x30dc6a].reward[0].amount + "金币");
              await this.fqts();
            }
          }
        }
      } else {
        console.log("账号[" + this.index + "]:番茄小说：" + JSON.stringify(_0x571d2a));
        this.cFlag = false;
      }
    } catch (_0x3cd96f) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqkgg() {
    this.iid = random(16);
    this.did = random(16);
    try {
      let _0x2e7d4f = "https://i.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_signin?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x274916 = "{\"from\":\"sign_in\",\"task_key\":\"excitation_ad_signin\"}";
      this.populateUrlObject(_0x2e7d4f, _0x274916);
      await httpRequest("post", this.urlObject);
      let _0x2f244c = httpResult;
      if (_0x2f244c.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说看广告获得：" + _0x2f244c.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说看广告:" + _0x2f244c.err_tips);
        this.cFlag = false;
      }
    } catch (_0x2d54f9) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqtsgg() {
    try {
      let _0x276ad5 = "https://i.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_listen_page?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0xa0cb55 = "{\"task_key\":\"excitation_ad_listen_page\"}";
      this.populateUrlObject(_0x276ad5, _0xa0cb55);
      await httpRequest("post", this.urlObject);
      let _0x4947aa = httpResult;
      if (_0x4947aa.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说听书看广告获得：" + _0x4947aa.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说听书看广告:" + _0x4947aa.err_tips);
        this.cFlag = false;
      }
    } catch (_0x17a169) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqllhw() {
    try {
      let _0x159049 = "https://i.snssdk.com/luckycat/novel/v1/task/done/shopping_earn_money?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x224222 = "{\"task_key\":\"shopping_earn_money\"}";
      this.populateUrlObject(_0x159049, _0x224222);
      await httpRequest("post", this.urlObject);
      let _0x457730 = httpResult;
      if (_0x457730.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说浏览好物获得：" + _0x457730.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说浏览好物:" + _0x457730.err_tips);
        this.cFlag = false;
      }
    } catch (_0x4a212a) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqllsp() {
    try {
      let _0x5d7dcc = "https://i.snssdk.com/luckycat/novel/v1/task/done/browse_products?iid=" + this.iid + "&device_id=" + this.did + this.uu + "&new_bookshelf=true";
      let _0x5b0073 = "{\"{\"new_bookshelf\"\":\"true,\"task_key\":\"browse_products\"}\"}";
      this.populateUrlObject(_0x5d7dcc, _0x5b0073);
      await httpRequest("post", this.urlObject);
      let _0x3829f7 = httpResult;
      if (_0x3829f7.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说浏览商品获得：" + _0x3829f7.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说浏览商品:" + _0x3829f7.err_tips);
        this.cFlag = false;
      }
    } catch (_0x38761a) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqqd() {
    try {
      let _0x5ce37c = "https://i.snssdk.com/luckycat/novel/v1/task/done/sign_in?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0xb1735e = "{}";
      this.populateUrlObject(_0x5ce37c, _0xb1735e);
      await httpRequest("post", this.urlObject);
      let _0x13c3cc = httpResult;
      if (_0x13c3cc.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说签到获得：" + _0x13c3cc.data.amount + "金币");
        await this.fqqdsp();
      } else {
        console.log("账号[" + this.index + "]:番茄小说签到:" + _0x13c3cc.err_tips);
        await this.fqqdsp();
        this.cFlag = false;
      }
    } catch (_0x44a0e2) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqqdsp() {
    try {
      let _0x4e082e = "https://i.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_signin?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x498c25 = "{\"from\":\"sign_in\"}";
      this.populateUrlObject(_0x4e082e, _0x498c25);
      await httpRequest("post", this.urlObject);
      let _0x25165f = httpResult;
      if (_0x25165f.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说签到视频获得：" + _0x25165f.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说签到视频:" + _0x25165f.err_tips);
        this.cFlag = false;
      }
    } catch (_0x2d198a) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqgj() {
    try {
      let _0x3141fc = "https://i.snssdk.com/luckycat/novel/v1/task/done/shopping_earn_money?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x18e530 = "{}";
      this.populateUrlObject(_0x3141fc, _0x18e530);
      await httpRequest("post", this.urlObject);
      let _0x54fc75 = httpResult;
      if (_0x54fc75.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说逛街获得：" + _0x54fc75.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说逛街:" + _0x54fc75.err_tips);
        this.cFlag = false;
      }
    } catch (_0x42cec6) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqbx() {
    try {
      let _0x4823df = "https://i.snssdk.com/luckycat/novel/v1/task/done/treasure_task?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0xc33a40 = "{}";
      this.populateUrlObject(_0x4823df, _0xc33a40);
      await httpRequest("post", this.urlObject);
      let _0x495a58 = httpResult;
      if (_0x495a58.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说开宝箱获得：" + _0x495a58.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说开宝箱:" + _0x495a58.err_tips);
        this.cFlag = false;
      }
    } catch (_0x1c958f) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqbxsp() {
    try {
      let _0x20d22f = "https://i.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_treasure_box?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x55136f = "{\"from\":\"gold_coin_reward_dialog_open_treasure\"}";
      this.populateUrlObject(_0x20d22f, _0x55136f);
      await httpRequest("post", this.urlObject);
      let _0x192a01 = httpResult;
      if (_0x192a01.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说宝箱视频获得：" + _0x192a01.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说宝箱视频:" + _0x192a01.err_tips);
        this.cFlag = false;
      }
    } catch (_0x3b471f) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqewgg() {
    try {
      let _0x105a7c = "https://i.snssdk.com/luckycat/novel/v1/task/done/excitation_ad?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x37f4a2 = "{\"from\":\"listen_task\"}";
      this.populateUrlObject(_0x105a7c, _0x37f4a2);
      await httpRequest("post", this.urlObject);
      let _0x24856d = httpResult;
      if (_0x24856d.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说看额外广告获得：" + _0x24856d.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说看额外广告:" + _0x24856d.err_tips);
        this.cFlag = false;
      }
    } catch (_0x25d8c5) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqyd() {
    let _0x248c3f = new Date().getTime();
    try {
      let _0x1119cf = "https://i.snssdk.com/luckycat/novel/v1/task/done/" + this.ydid + "?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x320171 = "{\"task_key\":\"" + this.ydid + "\"}";
      this.populateUrlObject(_0x1119cf, _0x320171);
      await httpRequest("post", this.urlObject);
      let _0x1ea96f = httpResult;
      if (_0x1ea96f.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + "获得：" + _0x1ea96f.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + ":" + _0x1ea96f.err_tips);
        this.cFlag = false;
      }
    } catch (_0x4dd0d9) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqmh() {
    let _0x15ee7a = new Date().getTime();
    try {
      let _0x4fde2e = "https://api5-normal-lf.fqnovel.com/luckycat/novel/v1/task/done/daily_read_comics?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x54ee48 = "{\"read_comics_task_key\":\"" + this.ydid + "\",\"task_key\":\"daily_read_comics\"}";
      this.populateUrlObject(_0x4fde2e, _0x54ee48);
      await httpRequest("post", this.urlObject);
      let _0x3f40cc = httpResult;
      if (_0x3f40cc.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + "获得：" + _0x3f40cc.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + ":" + _0x3f40cc.err_tips);
        this.cFlag = false;
      }
    } catch (_0x4e7a17) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqts() {
    let _0x344304 = new Date().getTime();
    try {
      let _0x5ebc41 = "https://api3-normal-lf.fqnovel.com/luckycat/novel/v1/task/done/" + this.ydid + "?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x12422b = "{\"task_key\":\"" + this.ydid + "\"}";
      this.populateUrlObject(_0x5ebc41, _0x12422b);
      await httpRequest("post", this.urlObject);
      let _0x152a51 = httpResult;
      if (_0x152a51.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + "获得：" + _0x152a51.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + ":" + _0x152a51.err_tips);
        this.cFlag = false;
      }
    } catch (_0x1d3016) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqqt() {
    let _0x20d633 = new Date().getTime();
    try {
      let _0x49a3fc = "https://i.snssdk.com/luckycat/novel/v1/task/done/read_end_distribution?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x164256 = "{}";
      this.populateUrlObject(_0x49a3fc, _0x164256);
      await httpRequest("post", this.urlObject);
      let _0x19ec61 = httpResult;
      if (_0x19ec61.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + "获得：" + _0x19ec61.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说" + this.name + ":" + _0x19ec61.err_tips);
        this.cFlag = false;
      }
    } catch (_0x50a526) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqewgg1() {
    try {
      let _0x705c76 = "https://i.snssdk.com/luckycat/novel/v1/task/done/" + this.tid + "?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0xc12e23 = "{\"new_bookshelf\":true,\"task_key\":\"" + this.tid + "\"}";
      this.populateUrlObject(_0x705c76, _0xc12e23);
      await httpRequest("post", this.urlObject);
      let _0x13601b = httpResult;
      if (_0x13601b.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说额外任务获得：" + _0x13601b.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说额外任务:" + _0x13601b.err_tips);
        this.cFlag = false;
      }
    } catch (_0x3f05a8) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqcj() {
    try {
      let _0x16e82d = "https://i.snssdk.com/luckycat/novel/v1/lottery/do_lottery?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x41f439 = "{\"new_bookshelf\":true}";
      this.populateUrlObject(_0x16e82d, _0x41f439);
      await httpRequest("post", this.urlObject);
      let _0x180e79 = httpResult;
      if (_0x180e79.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说抽奖获得：" + _0x180e79.data.reward.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说抽奖:" + _0x180e79.err_tips);
        this.cFlag = false;
      }
    } catch (_0xbacaab) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqlxcj() {
    try {
      let _0x523d34 = "https://i.snssdk.com/luckycat/novel/v1/lottery/continue_lottery?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x2fffe1 = "{\"new_bookshelf\":true}";
      this.populateUrlObject(_0x523d34, _0x2fffe1);
      await httpRequest("post", this.urlObject);
      let _0x442c7a = httpResult;
      if (_0x442c7a.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说抽奖签到获得：" + _0x442c7a.data.amount + "金币");
      } else {
        console.log("账号[" + this.index + "]:番茄小说抽奖签到:" + _0x442c7a.err_tips);
        this.cFlag = false;
      }
    } catch (_0x3a6142) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqcf() {
    try {
      let _0x1a7b62 = "https://i-hl.snssdk.com/luckycat/novel/v1/task/done/meal?_request_from=web&new_bookshelf=false&ac=wifi&aid=1967&app_name=novelapp&version_code=300&version_name=3.0.0.32&device_platform=android&ssmix=a&device_brand=Xiaomi&language=zh&os_api=30&os_version=11&openudid=c1ad0d7fd6238e3a&manifest_version_code=300&resolution=1440*3007&dpi=560&update_version_code=30032&_rticket=1675348202727&gender=0&comment_tag_c=3&vip_state=0&category_style=1";
      let _0x4442d7 = this.tid;
      this.populateUrlObject(_0x1a7b62, _0x4442d7);
      await httpRequest("post", this.urlObject);
      let _0x290124 = httpResult;
      if (_0x290124.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说吃饭补贴，获得" + _0x290124.data.amount + "金币");
        this.sjid = _0x290124.data.ui_status;
        await this.fqsxlq();
      } else {
        console.log("账号[" + this.index + "]:番茄小说:" + _0x290124.err_tips);
        this.cFlag = false;
      }
    } catch (_0x5e107b) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqcjcs() {
    try {
      let _0x258dab = "https://i.snssdk.com/luckycat/novel/v1/lottery/update_chance?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x2da4a9 = "{\"task_id\":0}";
      this.populateUrlObject(_0x258dab, _0x2da4a9);
      await httpRequest("post", this.urlObject);
      let _0x3b5d58 = httpResult;
      if (_0x3b5d58.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说抽奖次数增加：" + _0x3b5d58.err_tips);
      } else {
        console.log("账号[" + this.index + "]:番茄小说抽奖:" + _0x3b5d58.err_tips);
        this.cFlag = false;
      }
    } catch (_0x385206) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqsj() {
    try {
      let _0x3c8384 = "https://i.snssdk.com/luckycat/novel/v1/task/done/sleep?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x2d005d = "{\"done_type\":\"start_sleep\",\"task_key\":\"sleep\"}";
      this.populateUrlObject(_0x3c8384, _0x2d005d);
      await httpRequest("post", this.urlObject);
      let _0x36e9ae = httpResult;
      if (_0x36e9ae.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说睡觉：" + _0x36e9ae.err_tips);
      } else {
        console.log("账号[" + this.index + "]:番茄小说睡觉:" + _0x36e9ae.err_tips);
        this.cFlag = false;
      }
    } catch (_0x51e625) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqsx() {
    try {
      let _0x28babf = "https://i.snssdk.com/luckycat/novel/v1/task/done/sleep?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x3a901c = "{\"done_type\":\"end_sleep\",\"task_key\":\"sleep\"}";
      this.populateUrlObject(_0x28babf, _0x3a901c);
      await httpRequest("post", this.urlObject);
      let _0x4da2ee = httpResult;
      if (_0x4da2ee.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说睡醒,可领取金币：" + _0x4da2ee.data.ui_status);
        this.sjid = _0x4da2ee.data.ui_status;
        await this.fqsxlq();
      } else {
        console.log("账号[" + this.index + "]:番茄小说睡醒:" + _0x4da2ee.err_tips);
        this.cFlag = false;
      }
    } catch (_0x51cb01) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async fqsxlq() {
    try {
      let _0x5c8150 = "https://i.snssdk.com/luckycat/novel/v1/task/done/sleep?iid=" + this.iid + "&device_id=" + this.did + this.uu;
      let _0x57c669 = "{\"done_type\":\"receive_awards\",\"amount\":" + this.sjid + ",\"task_key\":\"sleep\"}";
      this.populateUrlObject(_0x5c8150, _0x57c669);
      await httpRequest("post", this.urlObject);
      let _0x40c6b8 = httpResult;
      if (_0x40c6b8.err_no == 0) {
        console.log("账号[" + this.index + "]:番茄小说睡醒,领取金币：" + _0x40c6b8.data.title);
      } else {
        console.log("账号[" + this.index + "]:番茄小说睡醒:" + _0x40c6b8.err_tips);
        this.cFlag = false;
      }
    } catch (_0x4b1ab4) {
      console.log("账号[" + this.index + "]", JSON.stringify(result));
    } finally {
      return Promise.resolve(1);
    }
  }
  async populateUrlObject(_0x5a7ff2, _0x8ce971 = "") {
    let _0x1c36df = _0x5a7ff2.replace("//", "/").split("/")[1];
    let _0x2dca82 = {
      url: _0x5a7ff2,
      headers: {
        Host: _0x1c36df,
        "Content-Type": "application/json;charset=utf-8",
        Cookie: "sessionid=" + this.ck,
        gender: "1",
        "sdk-version": "1",
        "User-Agent": "com.dragon.read/310 (Linux; U; Android 10; zh_CN; 16s Pro; Build/QKQ1.191222.002; Cronet/TTNetVersion:4df3ca9d 2019-11-25)",
        "Accept-Encoding": "gzip, deflate",
        "X-Khronos": "",
        "X-Gorgon": ""
      },
      timeout: 5000
    };
    if (_0x8ce971) {
      _0x2dca82.body = _0x8ce971;
    }
    this.urlObject = _0x2dca82;
  }
}
(async () => {
  if (typeof $request !== "undefined") {
    await GetRewrite();
  } else {
    await Announcement();
    if (!(await checkEnv())) {
      return;
    }
    if (userList.length > 0) {
      taskall = [];
      for (let _0x4b980e of userList) {
        if (_0x4b980e.cFlag) {
          taskall.push(_0x4b980e.sh());
        }
        if (taskall.length > 4) {
          await Promise.all(taskall);
          taskall = [];
        }
      }
      if (taskall.length > 0) {
        await Promise.all(taskall);
      }
    }
    await $.showmsg();
  }
})().catch(_0x5b6c6a => console.log(_0x5b6c6a)).finally(() => $.done());
async function GetRewrite() {
  if ($request.url.indexOf("api.ibreader.com/api/user/userInfo") > -1) {
    ck = "" + $request.headers.Cookie;
    if (userCookie) {
      if (userCookie.indexOf(ck) == -1) {
        userCookie = userCookie + "@" + ck;
        $.setdata(userCookie, "bkcookie");
        ckList = userCookie.split("@");
        $.msg("获取第" + ckList.length + "个ck成功: " + ck);
      }
    } else {
      $.setdata(ck, "bkcookie");
      $.msg("获取第1个ck成功: " + ck);
    }
  }
}
function logAndNotify(_0x3091d9) {
  console.log(_0x3091d9);
}
async function Announcement() {
  let _0x1a47aa = {
    url: "https://luobook.coding.net/api/user/luobook/project/code.json/shared-depot/luobook/git/blob/master/code.json"
  };
  await httpRequest("get", _0x1a47aa);
  data = JSON.parse(httpResult.data.file.data);
  logAndNotify(data.commomLog + "\n");
}
async function checkEnv() {
  if (userCookie) {
    let _0xfc1971 = envSplitor[0];
    for (let _0x267a44 of envSplitor) {
      if (userCookie.indexOf(_0x267a44) > -1) {
        _0xfc1971 = _0x267a44;
        break;
      }
    }
    for (let _0x4b6465 of userCookie.split(_0xfc1971)) {
      if (_0x4b6465) {
        userList.push(new UserInfo(_0x4b6465));
      }
    }
    userCount = userList.length;
  } else {
    console.log("未找到CK");
    return;
  }
  console.log("共找到" + userCount + "个账号");
  return true;
}
function populateUrlObject(_0x2f6191, _0x4ac2c1, _0x59c96f = "") {
  let _0x250af1 = _0x2f6191.replace("//", "/").split("/")[1];
  let _0x27cd5e = {
    url: _0x2f6191,
    headers: {
      Host: _0x250af1,
      Cookie: this.ck
    },
    timeout: 5000
  };
  if (_0x59c96f) {
    _0x27cd5e.body = _0x59c96f;
  }
  return _0x27cd5e;
}
async function httpRequest(_0x19b511, _0x11747c) {
  httpResult = null;
  httpReq = null;
  httpResp = null;
  return new Promise(_0x26b65c => {
    $.send(_0x19b511, _0x11747c, async (_0x48a762, _0x539312, _0x3adcf0) => {
      try {
        httpReq = _0x539312;
        httpResp = _0x3adcf0;
        if (_0x48a762) ;else if (_0x3adcf0.body) {
          if (typeof _0x3adcf0.body == "object") {
            httpResult = _0x3adcf0.body;
          } else {
            try {
              httpResult = JSON.parse(_0x3adcf0.body);
            } catch (_0x5d8c1f) {
              httpResult = _0x3adcf0.body;
            }
          }
        }
      } catch (_0xfe556b) {
        console.log(_0xfe556b);
      } finally {
        _0x26b65c();
      }
    });
  });
}
function random(_0x4debdc = 12) {
  let _0x545d0d = "0123456789";
  let _0x134ecc = _0x545d0d.length;
  let _0x2bb6db = "";
  for (i = 0; i < _0x4debdc; i++) {
    _0x2bb6db += _0x545d0d.charAt(Math.floor(Math.random() * _0x134ecc));
  }
  return _0x2bb6db;
}
function MD5Encrypt(_0x188f2b) {
  function _0x1f9498(_0x266ca3, _0xc24c07) {
    return _0x266ca3 << _0xc24c07 | _0x266ca3 >>> 32 - _0xc24c07;
  }
  function _0x43098f(_0x45cd1e, _0x41c97d) {
    var _0x10c88f;
    var _0x513168;
    var _0xf8bf10;
    var _0xf201c2;
    var _0x55d21b;
    _0xf8bf10 = _0x45cd1e & 2147483648;
    _0xf201c2 = _0x41c97d & 2147483648;
    _0x10c88f = _0x45cd1e & 1073741824;
    _0x513168 = _0x41c97d & 1073741824;
    _0x55d21b = (_0x45cd1e & 1073741823) + (_0x41c97d & 1073741823);
    if (_0x10c88f & _0x513168) {
      return _0x55d21b ^ 2147483648 ^ _0xf8bf10 ^ _0xf201c2;
    } else if (_0x10c88f | _0x513168) {
      if (_0x55d21b & 1073741824) {
        return _0x55d21b ^ 3221225472 ^ _0xf8bf10 ^ _0xf201c2;
      } else {
        return _0x55d21b ^ 1073741824 ^ _0xf8bf10 ^ _0xf201c2;
      }
    } else {
      return _0x55d21b ^ _0xf8bf10 ^ _0xf201c2;
    }
  }
  function _0x212554(_0x50cc61, _0x41996c, _0x7b5807) {
    return _0x50cc61 & _0x41996c | ~_0x50cc61 & _0x7b5807;
  }
  function _0x5cdb51(_0x48b1d0, _0x43db21, _0x38c662) {
    return _0x48b1d0 & _0x38c662 | _0x43db21 & ~_0x38c662;
  }
  function _0x5e166e(_0x40cbaa, _0x12df13, _0x4b3f32) {
    return _0x40cbaa ^ _0x12df13 ^ _0x4b3f32;
  }
  function _0x461e2c(_0x186125, _0x1a9b6c, _0x50668a) {
    return _0x1a9b6c ^ (_0x186125 | ~_0x50668a);
  }
  function _0x6b3048(_0x232d64, _0x3ea9b1, _0x3e9640, _0x3c6b7f, _0x20b7f5, _0x2c26b1, _0x46f89e) {
    _0x232d64 = _0x43098f(_0x232d64, _0x43098f(_0x43098f(_0x212554(_0x3ea9b1, _0x3e9640, _0x3c6b7f), _0x20b7f5), _0x46f89e));
    return _0x43098f(_0x1f9498(_0x232d64, _0x2c26b1), _0x3ea9b1);
  }
  function _0x1f03a1(_0x2b514d, _0x2fe7c3, _0x10a1cf, _0x1df6b8, _0x22a9df, _0x46d14b, _0x9956ab) {
    _0x2b514d = _0x43098f(_0x2b514d, _0x43098f(_0x43098f(_0x5cdb51(_0x2fe7c3, _0x10a1cf, _0x1df6b8), _0x22a9df), _0x9956ab));
    return _0x43098f(_0x1f9498(_0x2b514d, _0x46d14b), _0x2fe7c3);
  }
  function _0x1b8763(_0x53619e, _0x2bdabb, _0x3e7f73, _0x48d5b2, _0x81cc80, _0x38755c, _0x46ee2c) {
    _0x53619e = _0x43098f(_0x53619e, _0x43098f(_0x43098f(_0x5e166e(_0x2bdabb, _0x3e7f73, _0x48d5b2), _0x81cc80), _0x46ee2c));
    return _0x43098f(_0x1f9498(_0x53619e, _0x38755c), _0x2bdabb);
  }
  function _0x3926fa(_0x3773da, _0x23712e, _0x2a78b4, _0x15ffd4, _0x58b90d, _0x25435e, _0x3b9b53) {
    _0x3773da = _0x43098f(_0x3773da, _0x43098f(_0x43098f(_0x461e2c(_0x23712e, _0x2a78b4, _0x15ffd4), _0x58b90d), _0x3b9b53));
    return _0x43098f(_0x1f9498(_0x3773da, _0x25435e), _0x23712e);
  }
  function _0x2095ef(_0x1eb5aa) {
    for (var _0x31212d, _0x1e491f = _0x1eb5aa.length, _0x4aae2e = _0x1e491f + 8, _0x5ae145 = (_0x4aae2e - _0x4aae2e % 64) / 64, _0x1ab79a = (_0x5ae145 + 1) * 16, _0xfb7ccb = new Array(_0x1ab79a - 1), _0x1aee4a = 0, _0x3fa458 = 0; _0x1e491f > _0x3fa458;) {
      _0x31212d = (_0x3fa458 - _0x3fa458 % 4) / 4;
      _0x1aee4a = _0x3fa458 % 4 * 8;
      _0xfb7ccb[_0x31212d] = _0xfb7ccb[_0x31212d] | _0x1eb5aa.charCodeAt(_0x3fa458) << _0x1aee4a;
      _0x3fa458++;
    }
    _0x31212d = (_0x3fa458 - _0x3fa458 % 4) / 4;
    _0x1aee4a = _0x3fa458 % 4 * 8;
    _0xfb7ccb[_0x31212d] = _0xfb7ccb[_0x31212d] | 128 << _0x1aee4a;
    _0xfb7ccb[_0x1ab79a - 2] = _0x1e491f << 3;
    _0xfb7ccb[_0x1ab79a - 1] = _0x1e491f >>> 29;
    return _0xfb7ccb;
  }
  function _0x2c0ef9(_0x581bbb) {
    var _0x38c25f;
    var _0x356941;
    var _0x1e23d9 = "";
    var _0x8225d7 = "";
    for (_0x356941 = 0; _0x356941 <= 3; _0x356941++) {
      _0x38c25f = _0x581bbb >>> _0x356941 * 8 & 255;
      _0x8225d7 = "0" + _0x38c25f.toString(16);
      _0x1e23d9 += _0x8225d7.substr(_0x8225d7.length - 2, 2);
    }
    return _0x1e23d9;
  }
  function _0x245813(_0x15abf0) {
    _0x15abf0 = _0x15abf0.replace(/\r\n/g, "\n");
    for (var _0x42735e = "", _0x429a07 = 0; _0x429a07 < _0x15abf0.length; _0x429a07++) {
      var _0x3df621 = _0x15abf0.charCodeAt(_0x429a07);
      if (_0x3df621 < 128) {
        _0x42735e += String.fromCharCode(_0x3df621);
      } else if (_0x3df621 > 127 && _0x3df621 < 2048) {
        _0x42735e += String.fromCharCode(_0x3df621 >> 6 | 192);
        _0x42735e += String.fromCharCode(_0x3df621 & 63 | 128);
      } else {
        _0x42735e += String.fromCharCode(_0x3df621 >> 12 | 224);
        _0x42735e += String.fromCharCode(_0x3df621 >> 6 & 63 | 128);
        _0x42735e += String.fromCharCode(_0x3df621 & 63 | 128);
      }
    }
    return _0x42735e;
  }
  var _0x436a4a;
  var _0x381013;
  var _0x2f64f5;
  var _0x34fd3a;
  var _0x58b225;
  var _0x2f2b99;
  var _0x41220f;
  var _0x3b408b;
  var _0x42a319;
  var _0xd63637 = [];
  var _0xdf1a06 = 7;
  var _0x2ac901 = 12;
  var _0x2c6e59 = 17;
  var _0xce4741 = 22;
  var _0x40ecf3 = 5;
  var _0x247d13 = 9;
  var _0x1da112 = 14;
  var _0xcf698b = 20;
  var _0x150bd4 = 4;
  var _0x2c6fdc = 11;
  var _0x2d1779 = 16;
  var _0x1f7596 = 23;
  var _0x2818bd = 6;
  var _0x374e28 = 10;
  var _0x593320 = 15;
  var _0x18c744 = 21;
  _0x188f2b = _0x245813(_0x188f2b);
  _0xd63637 = _0x2095ef(_0x188f2b);
  _0x2f2b99 = 1732584193;
  _0x41220f = 4023233417;
  _0x3b408b = 2562383102;
  _0x42a319 = 271733878;
  _0x436a4a = 0;
  for (; _0x436a4a < _0xd63637.length; _0x436a4a += 16) {
    _0x381013 = _0x2f2b99;
    _0x2f64f5 = _0x41220f;
    _0x34fd3a = _0x3b408b;
    _0x58b225 = _0x42a319;
    _0x2f2b99 = _0x6b3048(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 0], _0xdf1a06, 3614090360);
    _0x42a319 = _0x6b3048(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 1], _0x2ac901, 3905402710);
    _0x3b408b = _0x6b3048(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 2], _0x2c6e59, 606105819);
    _0x41220f = _0x6b3048(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 3], _0xce4741, 3250441966);
    _0x2f2b99 = _0x6b3048(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 4], _0xdf1a06, 4118548399);
    _0x42a319 = _0x6b3048(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 5], _0x2ac901, 1200080426);
    _0x3b408b = _0x6b3048(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 6], _0x2c6e59, 2821735955);
    _0x41220f = _0x6b3048(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 7], _0xce4741, 4249261313);
    _0x2f2b99 = _0x6b3048(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 8], _0xdf1a06, 1770035416);
    _0x42a319 = _0x6b3048(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 9], _0x2ac901, 2336552879);
    _0x3b408b = _0x6b3048(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 10], _0x2c6e59, 4294925233);
    _0x41220f = _0x6b3048(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 11], _0xce4741, 2304563134);
    _0x2f2b99 = _0x6b3048(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 12], _0xdf1a06, 1804603682);
    _0x42a319 = _0x6b3048(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 13], _0x2ac901, 4254626195);
    _0x3b408b = _0x6b3048(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 14], _0x2c6e59, 2792965006);
    _0x41220f = _0x6b3048(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 15], _0xce4741, 1236535329);
    _0x2f2b99 = _0x1f03a1(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 1], _0x40ecf3, 4129170786);
    _0x42a319 = _0x1f03a1(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 6], _0x247d13, 3225465664);
    _0x3b408b = _0x1f03a1(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 11], _0x1da112, 643717713);
    _0x41220f = _0x1f03a1(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 0], _0xcf698b, 3921069994);
    _0x2f2b99 = _0x1f03a1(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 5], _0x40ecf3, 3593408605);
    _0x42a319 = _0x1f03a1(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 10], _0x247d13, 38016083);
    _0x3b408b = _0x1f03a1(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 15], _0x1da112, 3634488961);
    _0x41220f = _0x1f03a1(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 4], _0xcf698b, 3889429448);
    _0x2f2b99 = _0x1f03a1(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 9], _0x40ecf3, 568446438);
    _0x42a319 = _0x1f03a1(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 14], _0x247d13, 3275163606);
    _0x3b408b = _0x1f03a1(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 3], _0x1da112, 4107603335);
    _0x41220f = _0x1f03a1(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 8], _0xcf698b, 1163531501);
    _0x2f2b99 = _0x1f03a1(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 13], _0x40ecf3, 2850285829);
    _0x42a319 = _0x1f03a1(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 2], _0x247d13, 4243563512);
    _0x3b408b = _0x1f03a1(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 7], _0x1da112, 1735328473);
    _0x41220f = _0x1f03a1(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 12], _0xcf698b, 2368359562);
    _0x2f2b99 = _0x1b8763(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 5], _0x150bd4, 4294588738);
    _0x42a319 = _0x1b8763(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 8], _0x2c6fdc, 2272392833);
    _0x3b408b = _0x1b8763(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 11], _0x2d1779, 1839030562);
    _0x41220f = _0x1b8763(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 14], _0x1f7596, 4259657740);
    _0x2f2b99 = _0x1b8763(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 1], _0x150bd4, 2763975236);
    _0x42a319 = _0x1b8763(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 4], _0x2c6fdc, 1272893353);
    _0x3b408b = _0x1b8763(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 7], _0x2d1779, 4139469664);
    _0x41220f = _0x1b8763(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 10], _0x1f7596, 3200236656);
    _0x2f2b99 = _0x1b8763(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 13], _0x150bd4, 681279174);
    _0x42a319 = _0x1b8763(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 0], _0x2c6fdc, 3936430074);
    _0x3b408b = _0x1b8763(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 3], _0x2d1779, 3572445317);
    _0x41220f = _0x1b8763(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 6], _0x1f7596, 76029189);
    _0x2f2b99 = _0x1b8763(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 9], _0x150bd4, 3654602809);
    _0x42a319 = _0x1b8763(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 12], _0x2c6fdc, 3873151461);
    _0x3b408b = _0x1b8763(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 15], _0x2d1779, 530742520);
    _0x41220f = _0x1b8763(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 2], _0x1f7596, 3299628645);
    _0x2f2b99 = _0x3926fa(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 0], _0x2818bd, 4096336452);
    _0x42a319 = _0x3926fa(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 7], _0x374e28, 1126891415);
    _0x3b408b = _0x3926fa(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 14], _0x593320, 2878612391);
    _0x41220f = _0x3926fa(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 5], _0x18c744, 4237533241);
    _0x2f2b99 = _0x3926fa(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 12], _0x2818bd, 1700485571);
    _0x42a319 = _0x3926fa(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 3], _0x374e28, 2399980690);
    _0x3b408b = _0x3926fa(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 10], _0x593320, 4293915773);
    _0x41220f = _0x3926fa(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 1], _0x18c744, 2240044497);
    _0x2f2b99 = _0x3926fa(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 8], _0x2818bd, 1873313359);
    _0x42a319 = _0x3926fa(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 15], _0x374e28, 4264355552);
    _0x3b408b = _0x3926fa(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 6], _0x593320, 2734768916);
    _0x41220f = _0x3926fa(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 13], _0x18c744, 1309151649);
    _0x2f2b99 = _0x3926fa(_0x2f2b99, _0x41220f, _0x3b408b, _0x42a319, _0xd63637[_0x436a4a + 4], _0x2818bd, 4149444226);
    _0x42a319 = _0x3926fa(_0x42a319, _0x2f2b99, _0x41220f, _0x3b408b, _0xd63637[_0x436a4a + 11], _0x374e28, 3174756917);
    _0x3b408b = _0x3926fa(_0x3b408b, _0x42a319, _0x2f2b99, _0x41220f, _0xd63637[_0x436a4a + 2], _0x593320, 718787259);
    _0x41220f = _0x3926fa(_0x41220f, _0x3b408b, _0x42a319, _0x2f2b99, _0xd63637[_0x436a4a + 9], _0x18c744, 3951481745);
    _0x2f2b99 = _0x43098f(_0x2f2b99, _0x381013);
    _0x41220f = _0x43098f(_0x41220f, _0x2f64f5);
    _0x3b408b = _0x43098f(_0x3b408b, _0x34fd3a);
    _0x42a319 = _0x43098f(_0x42a319, _0x58b225);
  }
  var _0x4b3ff8 = _0x2c0ef9(_0x2f2b99) + _0x2c0ef9(_0x41220f) + _0x2c0ef9(_0x3b408b) + _0x2c0ef9(_0x42a319);
  return _0x4b3ff8.toLowerCase();
}
function Env(name, env) {
  if (typeof process != "undefined" && JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  return new class {
    constructor(name, env) {
      this.name = name;
      this.notifyStr = "";
      this.startTime = new Date().getTime();
      Object.assign(this, env);
      console.log(`${this.name} 开始运行：\n`);
    }
    isNode() {
      return typeof module != "undefined" && !!module.exports;
    }
    isQuanX() {
      return typeof $task != "undefined";
    }
    isSurge() {
      return typeof $httpClient != "undefined" && typeof $loon == "undefined";
    }
    isLoon() {
      return typeof $loon != "undefined";
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t);
        const r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = false;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e);
        const o = this.getval(i);
        const h = i ? o === "null" ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(t);
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(t);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        return this.data[t];
      } else {
        return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(t, e);
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(t, e);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        this.data[e] = t;
        this.writedata();
        return true;
      } else {
        return this.data && this.data[e] || null;
      }
    }
    send(m, t, e = () => {}) {
      if (m != "get" && m != "post" && m != "put" && m != "delete") {
        console.log(`无效的http方法：${m}`);
        return;
      }
      if (m == "get" && t.headers) {
        delete t.headers["Content-Type"];
        delete t.headers["Content-Length"];
      } else if (t.body && t.headers) {
        if (!t.headers["Content-Type"]) {
          t.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          t.headers = t.headers || {};
          Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": false
          });
        }
        let conf = {
          method: m,
          url: t.url,
          headers: t.headers,
          timeout: t.timeout,
          data: t.body
        };
        if (m == "get") {
          delete conf.data;
        }
        $axios(conf).then(t => {
          const {
            status: i,
            request: q,
            headers: r,
            data: o
          } = t;
          e(null, q, {
            statusCode: i,
            headers: r,
            body: o
          });
        }).catch(err => console.log(err));
      } else if (this.isQuanX()) {
        t.method = m.toUpperCase();
        if (this.isNeedRewrite) {
          t.opts = t.opts || {};
          Object.assign(t.opts, {
            hints: false
          });
        }
        $task.fetch(t).then(t => {
          const {
            statusCode: i,
            request: q,
            headers: r,
            body: o
          } = t;
          e(null, q, {
            statusCode: i,
            headers: r,
            body: o
          });
        }, t => e(t));
      } else if (this.isNode()) {
        this.got = this.got ? this.got : require("got");
        const {
          url: s,
          ...i
        } = t;
        this.instance = this.got.extend({
          followRedirect: false
        });
        this.instance[m](s, i).then(t => {
          const {
            statusCode: i,
            request: q,
            headers: r,
            body: o
          } = t;
          e(null, q, {
            statusCode: i,
            headers: r,
            body: o
          });
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body);
        });
      }
    }
    time(t) {
      let e = {
        "M+": new Date().getMonth() + 1,
        "d+": new Date().getDate(),
        "h+": new Date().getHours(),
        "m+": new Date().getMinutes(),
        "s+": new Date().getSeconds(),
        "q+": Math.floor((new Date().getMonth() + 3) / 3),
        S: new Date().getMilliseconds()
      };
      if (/(y+)/.test(t)) {
        t = t.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let s in e) {
        if (new RegExp("(" + s + ")").test(t)) {
          t = t.replace(RegExp.$1, RegExp.$1.length == 1 ? e[s] : ("00" + e[s]).substr(("" + e[s]).length));
        }
      }
      return t;
    }
    async showmsg() {
      if (!this.notifyStr) {
        return;
      }
      let notifyBody = this.name + ` 运行通知

` + this.notifyStr;
      if ($.isNode()) {
        // var notify = require('./sendNotify');
        // console.log('\n============== 推送 ==============')
        // await notify.sendNotify(this.name, notifyBody);
      } else {
        this.msg(notifyBody);
      }
    }
    logAndNotify(str) {
      console.log(str);
      this.notifyStr += str;
      this.notifyStr += "\n";
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if (typeof t == "string") {
          if (this.isLoon()) {
            return t;
          } else if (this.isQuanX()) {
            return {
              "open-url": t
            };
          } else if (this.isSurge()) {
            return {
              url: t
            };
          } else {
            return undefined;
          }
        }
        if (typeof t == "object") {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"];
            let s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl;
            let s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(e, s, i, o(r));
        } else if (this.isQuanX()) {
          $notify(e, s, i, o(r));
        }
      }
      let h = ["", "============== 系统通知 =============="];
      h.push(e);
      if (s) {
        h.push(s);
      }
      if (i) {
        h.push(i);
      }
      console.log(h.join("\n"));
    }
    getMin(a, b) {
      if (a < b) {
        return a;
      } else {
        return b;
      }
    }
    getMax(a, b) {
      if (a < b) {
        return b;
      } else {
        return a;
      }
    }
    padStr(num, length, padding = "0") {
      let numStr = String(num);
      let numPad = length > numStr.length ? length - numStr.length : 0;
      let retStr = "";
      for (let i = 0; i < numPad; i++) {
        retStr += padding;
      }
      retStr += numStr;
      return retStr;
    }
    json2str(paramIn = {}) {
      let ret = [];
      let obj = paramIn.obj;
      let connector = paramIn.connector || "";
      let keys = Object.keys(obj);
      if (paramIn.isSort) {
        keys = keys.sort();
      }
      for (let key of keys) {
        let v = obj[key];
        if (v && typeof v === "object") {
          v = JSON.stringify(v);
        }
        if (v && paramIn.encodeUrl) {
          v = encodeURIComponent(v);
        }
        ret.push(key + "=" + v);
      }
      return ret.join(connector);
    }
    str2json(str, decodeUrl = false) {
      let ret = {};
      for (let item of str.split("&")) {
        if (!item) {
          continue;
        }
        let idx = item.indexOf("=");
        if (idx == -1) {
          continue;
        }
        let k = item.substr(0, idx);
        let v = item.substr(idx + 1);
        if (decodeUrl) {
          v = decodeURIComponent(v);
        }
        ret[k] = v;
      }
      return ret;
    }
    randomString(len, charset = "abcdef0123456789") {
      let str = "";
      for (let i = 0; i < len; i++) {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return str;
    }
    randomList(a) {
      let idx = Math.floor(Math.random() * a.length);
      return a[idx];
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime();
      const s = (e - this.startTime) / 1000;
      console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`);
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(t);
      }
      process.exit(0);
    }
    parseParam(p, d = "") {
      if (p === undefined) {
        return d;
      } else {
        return p;
      }
    }
    randomPattern(pattern, charset = "abcdef0123456789") {
      let str = "";
      for (let chars of pattern) {
        if (chars == "x") {
          str += charset.charAt(Math.floor(Math.random() * charset.length));
        } else if (chars == "X") {
          str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase();
        } else {
          str += chars;
        }
      }
      return str;
    }
    param2str(param, encodeUrl = true) {
      let ret = [];
      for (let key in param) {
        if (typeof param[key] === "object") {
          param[key] = JSON.stringify(param[key]);
        }
        let v = param[key];
        if (encodeUrl) {
          v = escape(v);
        }
        let str = key + "=" + v;
        ret.push(str);
      }
      return ret.join("&");
    }
    randomWait(basetime, randomtime) {
      if (basetime == 0) {
        return;
      }
      let t = Math.floor(Math.random() * randomtime) + basetime;
      return this.wait(t);
    }
  }(name, env);
}