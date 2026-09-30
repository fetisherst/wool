/*
@蛋炒饭
软件名:多娇江山
完成每日任务，一天55积分左右，可以兑换实物，外地正常发货
变量名:djjsck
手机号注册登录软件后，设置登陆密码，将手机号#密码填入变量，多账号换行隔开
定时:每天一到二次
*/
NAME = "多娇江山";
VALY = ["djjsck"];
CK = "";
LOGS = 0;
channel = ["6264b0b6fe3fc11a653387d2", "5da293a31b011b7c692ffda8", "5d3fe99a1b011b0b08d5244b", "637c91d5b40eef5a490bcea9", "5d3fea3ab198500f695bdec4"];
class Bar {
  constructor(_0x14a0c2) {
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.phone = _0x14a0c2.split("#")[0];
    this.password = $.RSA(_0x14a0c2.split("#")[1], this.rsakey).replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/==/g, "%3D%3D");
    this.ts = $.time(13);
    this.reid = $.udid(1);
    this.channelid = $.randomArr(channel);
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.logs = true;
  }
  async login() {
    let _0x2811fc = "client_id=35&password=" + this.password + "&phone_number=" + this.phone;
    let _0x23674c = await $.task("post", "https://passport.tmuyun.com/web/oauth/credential_auth", {}, _0x2811fc);
    if (_0x23674c.code == 0) {
      this.code = _0x23674c.data.authorization_code.code;
      console.log("【" + this.phone + "】登录成功");
      this.logs = true;
      await this.gettoken();
    } else {
      this.logs = false;
    }
  }
  async gettoken() {
    let _0x2137dd = $.SHA_Encrypt(1, "SHA256", "/api/zbtxz/login&&63ff005da7fd3936a2562958&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x4bea1a = {
      "X-SESSION-ID": "63ff005da7fd3936a2562958",
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x2137dd,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x2dd4ca = "code=" + this.code + "&token=&type=-1&union_id=";
    let _0xe13c4d = await $.task("post", "https://vapp.tmuyun.com/api/zbtxz/login", _0x4bea1a, _0x2dd4ca);
    this.sessionid = _0xe13c4d.data.session.id;
    this.name = _0xe13c4d.data.account.nick_name;
  }
  async tasklist() {
    let _0x259150 = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/numberCenter&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x1a3026 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x259150,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x16edf9 = await $.task("get", "https://vapp.tmuyun.com/api/user_mumber/numberCenter?is_new=1", _0x1a3026);
    if (_0x16edf9.code == 0) {
      console.log("【" + this.name + "】==>现有积分" + _0x16edf9.data.rst.total_integral);
      for (let _0x2308eb of _0x16edf9.data.rst.user_task_list) {
        if (_0x2308eb.name == "分享资讯给好友" && _0x2308eb.completed == 0) {
          for (let _0x1b1d01 = _0x2308eb.finish_times; _0x1b1d01 < _0x2308eb.frequency; _0x1b1d01++) {
            await this.share();
          }
        }
        if (_0x2308eb.name == "新闻资讯评论" && _0x2308eb.completed == 0) {
          for (let _0x180826 = _0x2308eb.finish_times; _0x180826 < _0x2308eb.frequency; _0x180826++) {
            await this.dailyoneword();
            await this.comment();
          }
        }
        if (_0x2308eb.name == "新闻资讯阅读" && _0x2308eb.completed == 0) {
          for (let _0xaa2645 = _0x2308eb.finish_times; _0xaa2645 < _0x2308eb.frequency; _0xaa2645++) {
            await this.read();
          }
        }
        if (_0x2308eb.name == "使用本地服务" && _0x2308eb.completed == 0) {
          await this.local();
        }
        if (_0x2308eb.name == "新闻资讯点赞" && _0x2308eb.completed == 0) {
          for (let _0x25a044 = _0x2308eb.finish_times; _0x25a044 < _0x2308eb.frequency; _0x25a044++) {
            await this.like();
          }
        }
      }
      for (let _0x105d27 of _0x16edf9.data.daily_sign_info.daily_sign_list) {
        if (_0x105d27.current == "今天" && _0x105d27.signed == false) {
          await this.signin();
        }
      }
    } else {
      console.log("【" + this.name + "】获取任务列表失败，请稍后再试");
    }
  }
  async share() {
    let _0x3970af = this.ii[$.RT(0, 29)].id;
    let _0x3c28a3 = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/doTask&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x1869d7 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x3c28a3,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x372567 = "memberType=3&member_type=3&target_id=" + _0x3970af;
    let _0xf14485 = await $.task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x1869d7, _0x372567);
    if (_0xf14485.code == 0) {
      console.log("【" + this.name + "】 分享资讯成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 分享资讯失败");
    }
  }
  async list() {
    let _0x222a69 = $.SHA_Encrypt(1, "SHA256", "/api/article/channel_list&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x54219f = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x222a69,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x587960 = await $.task("get", "https://vapp.tmuyun.com/api/article/channel_list?channel_id=" + this.channelid + "&isDiFangHao=false&is_new=true&list_count=0&size=30", _0x54219f);
    this.ii = _0x587960.data.article_list;
  }
  async dailyoneword() {
    let _0x1552d8 = await $.task("get", "https://v1.jinrishici.com/all.json", {});
    this.word = _0x1552d8.content;
  }
  async comment() {
    let _0x576cf3 = this.ii[$.RT(0, 29)].id;
    let _0x277b43 = $.SHA_Encrypt(1, "SHA256", "/api/comment/create&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x84f2ac = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x277b43,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x34a22a = "channel_article_id=" + _0x576cf3 + "&content=" + encodeURIComponent(this.word);
    let _0xcb34db = await $.task("post", "https://vapp.tmuyun.com/api/comment/create", _0x84f2ac, _0x34a22a);
    if (_0xcb34db.code == 0) {
      console.log("【" + this.name + "】 评论资讯成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 评论资讯失败");
    }
  }
  async read() {
    let _0x4a1b8f = this.ii[$.RT(0, 29)].id;
    let _0x2cf938 = $.SHA_Encrypt(1, "SHA256", "/api/article/detail&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x38ed33 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x2cf938,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x2d66ea = await $.task("get", "https://vapp.tmuyun.com/api/article/detail?id=" + _0x4a1b8f, _0x38ed33);
    if (_0x2d66ea.code == 0) {
      console.log("【" + this.name + "】 阅读文章成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 阅读文章失败");
    }
  }
  async like() {
    let _0x26091a = this.ii[$.RT(0, 29)].id;
    let _0x9534e3 = $.SHA_Encrypt(1, "SHA256", "/api/favorite/like&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x3cc079 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x9534e3,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x3b8780 = "action=true&id=" + _0x26091a;
    let _0x251a1a = await $.task("post", "https://vapp.tmuyun.com/api/favorite/like", _0x3cc079, _0x3b8780);
    if (_0x251a1a.code == 0) {
      console.log("【" + this.name + "】 资讯点赞成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 资讯点赞失败");
    }
  }
  async signin() {
    let _0x15eb2e = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/sign&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x41c0db = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x15eb2e,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x1c1a3d = await $.task("get", "https://vapp.tmuyun.com/api/user_mumber/sign", _0x41c0db);
    if (_0x1c1a3d.code == 0) {
      console.log("【" + this.name + "】 签到成功");
    } else {
      console.log("【" + this.name + "】 签到失败");
    }
  }
  async local() {
    let _0x41f937 = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/doTask&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&24");
    let _0x6b62bb = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x41f937,
      "X-TENANT-ID": 24,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0xfcfb9e = "memberType=6&member_type=6";
    let _0x2a850a = await $.task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x6b62bb, _0xfcfb9e);
    if (_0x2a850a.code == 0) {
      console.log("【" + this.name + "】 使用本地服务成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 使用本地服务失败");
    }
  }
}
$ = DD();
(async () => {
  await $.ExamineCookie();
  await $.Multithreading("login");
  let _0x51681c = $.cookie_list.filter(_0x9b41d9 => _0x9b41d9.logs == true);
  if (_0x51681c.length == 0) {
    console.log("Cookie格式错误 或 账号被禁封");
    return;
  } else {
    await $.Multithreading("list");
    await $.Multithreading("tasklist");
  }
})().catch(_0x3b2309 => {
  console.log(_0x3b2309);
}).finally(() => {});
function DD() {
  return new class {
    constructor() {
      this.cookie_list = [];
      this.CryptoJS = require("crypto-js");
      this.NodeRSA = require("node-rsa");
      this.request = require("request");
      this.Sha_Rsa = require("jsrsasign");
    }
    async Multithreading(_0x1c68c9, _0x4dae99, _0x5035d7) {
      let _0x47d372 = [];
      if (!_0x5035d7) {
        _0x5035d7 = 1;
      }
      while (_0x5035d7--) {
        for (let _0x474f30 of $.cookie_list) {
          _0x47d372.push(_0x474f30[_0x1c68c9](_0x4dae99));
        }
      }
      await Promise.allSettled(_0x47d372);
    }
    ExamineCookie() {
      let _0x193a04 = process.env[VALY] || CK;
      let _0x12d553 = 0;
      if (_0x193a04) {
        for (let _0x1bbf96 of _0x193a04.split("\n").filter(_0x12ff72 => !!_0x12ff72)) {
          $.cookie_list.push(new Bar(_0x1bbf96));
        }
        _0x12d553 = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }
      console.log("共找到" + _0x12d553 + "个账号");
      return $.cookie_list;
    }
    task(_0x467d86, _0x453631, _0x229edf, _0x241129, _0x403d99) {
      if (_0x467d86 == "delete") {
        _0x467d86 = _0x467d86.toUpperCase();
      } else {
        _0x467d86 = _0x467d86;
      }
      if (_0x467d86 == "post") {
        delete _0x229edf["content-type"];
        delete _0x229edf["Content-type"];
        delete _0x229edf["content-Type"];
        if ($.safeGet(_0x241129)) {
          _0x229edf["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x229edf["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (_0x241129) {
          _0x229edf["Content-Length"] = $.lengthInUtf8Bytes(_0x241129);
        }
      }
      if (_0x467d86 == "get") {
        delete _0x229edf["content-type"];
        delete _0x229edf["Content-type"];
        delete _0x229edf["content-Type"];
        delete _0x229edf["Content-Length"];
      }
      _0x229edf.Host = _0x453631.replace("//", "/").split("/")[1];
      return new Promise(async _0x5d5b27 => {
        if (_0x467d86.indexOf("T") < 0) {
          var _0x1329f2 = {
            url: _0x453631,
            headers: _0x229edf,
            body: _0x241129,
            proxy: "http://" + _0x403d99
          };
        } else {
          var _0x1329f2 = {
            url: _0x453631,
            headers: _0x229edf,
            form: JSON.parse(_0x241129),
            proxy: "http://" + _0x403d99
          };
        }
        if (!_0x403d99) {
          delete _0x1329f2.proxy;
        }
        this.request[_0x467d86.toLowerCase()](_0x1329f2, (_0x32cdd5, _0x4b563d, _0x260960) => {
          try {
            if (_0x260960) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x1329f2);
                console.log("================ 返回 ================");
                if ($.safeGet(_0x260960)) {
                  console.log(JSON.parse(_0x260960));
                } else {
                  console.log(_0x260960);
                }
              }
            }
          } catch (_0x5c3118) {
            console.log(_0x5c3118, _0x453631 + "\n" + _0x229edf);
          } finally {
            let _0x230aaf = "";
            if (!_0x32cdd5) {
              if ($.safeGet(_0x260960)) {
                _0x230aaf = JSON.parse(_0x260960);
              } else if (_0x260960.indexOf("/") != -1 && _0x260960.indexOf("+") != -1) {
                _0x230aaf = $.decrypts(_0x260960);
              } else {
                _0x230aaf = _0x260960;
              }
            } else {
              _0x230aaf = _0x453631 + "   API请求失败，请检查网络重试\n" + _0x32cdd5;
            }
            return _0x5d5b27(_0x230aaf);
          }
        });
      });
    }
    decrypts(_0x223e6b) {
      try {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x223e6b, this.key1, this.iv));
      } catch (_0x3e11e8) {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x223e6b, this.key2, this.iv));
      }
    }
    lengthInUtf8Bytes(_0xdd7351) {
      let _0x50bbc7 = encodeURIComponent(_0xdd7351).match(/%[89ABab]/g);
      return _0xdd7351.length + (_0x50bbc7 ? _0x50bbc7.length : 0);
    }
    randomArr(_0x30f7e9) {
      return _0x30f7e9[parseInt(Math.random() * _0x30f7e9.length, 10)];
    }
    wait(_0xce687a) {
      return new Promise(_0x15c792 => setTimeout(_0x15c792, _0xce687a));
    }
    time(_0xaad742) {
      if (_0xaad742 == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }
    timenow(_0x4d04f8) {
      let _0x39a90d = new Date();
      if (_0x4d04f8 == undefined) {
        let _0x3fa282 = new Date();
        let _0xa81663 = _0x3fa282.getFullYear() + "-";
        let _0x205582 = (_0x3fa282.getMonth() + 1 < 10 ? "0" + (_0x3fa282.getMonth() + 1) : _0x3fa282.getMonth() + 1) + "-";
        let _0xf92973 = _0x3fa282.getDate() + " ";
        let _0x3cf0ce = _0x3fa282.getHours() + ":";
        let _0x1644c4 = _0x3fa282.getMinutes() + ":";
        let _0xbc754f = _0x3fa282.getSeconds() + 1 < 10 ? "0" + _0x3fa282.getSeconds() : _0x3fa282.getSeconds();
        return _0xa81663 + _0x205582 + _0xf92973 + _0x3cf0ce + _0x1644c4 + _0xbc754f;
      } else if (_0x4d04f8 == 0) {
        return _0x39a90d.getFullYear();
      } else if (_0x4d04f8 == 1) {
        if (_0x39a90d.getMonth() + 1 < 10) {
          return "0" + (_0x39a90d.getMonth() + 1);
        } else {
          return _0x39a90d.getMonth() + 1;
        }
      } else if (_0x4d04f8 == 2) {
        return _0x39a90d.getDate();
      } else if (_0x4d04f8 == 3) {
        return _0x39a90d.getHours();
      } else if (_0x4d04f8 == 4) {
        return _0x39a90d.getMinutes();
      } else if (_0x4d04f8 == 5) {
        if (_0x39a90d.getSeconds() + 1 < 10) {
          return "0" + _0x39a90d.getSeconds();
        } else {
          return _0x39a90d.getSeconds();
        }
      }
    }
    safeGet(_0x591a94) {
      try {
        if (typeof JSON.parse(_0x591a94) == "object") {
          return true;
        }
      } catch (_0x499440) {
        return false;
      }
    }
    randomString(_0x2c146c, _0x118740) {
      if (_0x118740 == 0) {
        let _0x1014f7 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789";
        let _0x53a251 = _0x1014f7.length;
        let _0x5042db = "";
        for (let _0x3c79fd = 0; _0x3c79fd < _0x2c146c; _0x3c79fd++) {
          _0x5042db += _0x1014f7.charAt(Math.floor(Math.random() * _0x53a251));
        }
        return _0x5042db;
      } else {
        let _0x3d43c1 = "qwertyuiopasdfghjklzxcvbnm01234567890123456789QWERTYUIOPASDFGHJKLZXCVBNM";
        let _0x3aeb03 = _0x3d43c1.length;
        let _0x5365fe = "";
        for (let _0x56acec = 0; _0x56acec < _0x2c146c; _0x56acec++) {
          _0x5365fe += _0x3d43c1.charAt(Math.floor(Math.random() * _0x3aeb03));
        }
        return _0x5365fe;
      }
    }
    udid(_0x4b75ec) {
      function _0x18b47e() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      let _0xa7960 = _0x18b47e() + _0x18b47e() + "-" + _0x18b47e() + "-" + _0x18b47e() + "-" + _0x18b47e() + "-" + _0x18b47e() + _0x18b47e() + _0x18b47e();
      if (_0x4b75ec == 0) {
        return _0xa7960.toUpperCase();
      } else {
        return _0xa7960.toLowerCase();
      }
    }
    encodeUnicode(_0x35c3a5) {
      var _0x424730 = [];
      for (var _0x2a23d2 = 0; _0x2a23d2 < _0x35c3a5.length; _0x2a23d2++) {
        _0x424730[_0x2a23d2] = ("00" + _0x35c3a5.charCodeAt(_0x2a23d2).toString(16)).slice(-4);
      }
      return "\\u" + _0x424730.join("\\u");
    }
    decodeUnicode(_0x23af77) {
      _0x23af77 = _0x23af77.replace(/\\u/g, "%u");
      return unescape(unescape(_0x23af77));
    }
    RT(_0x581809, _0x56f47d) {
      return Math.round(Math.random() * (_0x56f47d - _0x581809) + _0x581809);
    }
    arrNull(_0x3ab11a) {
      var _0x56d2f8 = _0x3ab11a.filter(_0x46a2a3 => {
        return _0x46a2a3 && _0x46a2a3.trim();
      });
      return _0x56d2f8;
    }
    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }
    timecs() {
      let _0x289885 = $.nowtime();
      if (JSON.stringify(_0x289885).indexOf(" ") >= 0) {
        _0x289885 = _0x289885.replace(" ", "T");
      }
      return new Date(_0x289885).getTime() - 28800000;
    }
    rtjson(_0x59604a, _0x362be2, _0x254327, _0x557e55) {
      if (_0x557e55 == 0) {
        return JSON.stringify(_0x59604a.split(_0x362be2).reduce((_0x3dbc6d, _0x3cf32f) => {
          let _0x425260 = _0x3cf32f.split(_0x254327);
          _0x3dbc6d[_0x425260[0].trim()] = _0x425260[1].trim();
          return _0x3dbc6d;
        }, {}));
      } else {
        return _0x59604a.split(_0x362be2).reduce((_0x1a0f4c, _0x51563f) => {
          let _0x49227a = _0x51563f.split(_0x254327);
          _0x1a0f4c[_0x49227a[0].trim()] = _0x49227a[1].trim();
          return _0x1a0f4c;
        }, {});
      }
    }
    MD5Encrypt(_0xfddcb8, _0x54ecb5) {
      if (_0xfddcb8 == 0) {
        return this.CryptoJS.MD5(_0x54ecb5).toString().toLowerCase();
      } else if (_0xfddcb8 == 1) {
        return this.CryptoJS.MD5(_0x54ecb5).toString().toUpperCase();
      } else if (_0xfddcb8 == 2) {
        return this.CryptoJS.MD5(_0x54ecb5).toString().substring(8, 24).toLowerCase();
      } else if (_0xfddcb8 == 3) {
        return this.CryptoJS.MD5(_0x54ecb5).toString().substring(8, 24).toUpperCase();
      }
    }
    SHA_Encrypt(_0x7faf32, _0x421fa9, _0x477465) {
      if (_0x7faf32 == 0) {
        return this.CryptoJS[_0x421fa9](_0x477465).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x421fa9](_0x477465).toString();
      }
    }
    HmacSHA_Encrypt(_0x3adc97, _0x4f71d7, _0x4c6ecc, _0x5255d1) {
      if (_0x3adc97 == 0) {
        return this.CryptoJS[_0x4f71d7](_0x4c6ecc, _0x5255d1).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x4f71d7](_0x4c6ecc, _0x5255d1).toString();
      }
    }
    Base64(_0x488a96, _0x3af3cc) {
      if (_0x488a96 == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x3af3cc));
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x3af3cc));
      }
    }
    DecryptCrypto(_0x1de09d, _0x10c858, _0x4f9705, _0x39fab4, _0x10c3d1, _0x228e92, _0x179a1c) {
      if (_0x1de09d == 0) {
        const _0x1c7099 = this.CryptoJS[_0x10c858].encrypt(this.CryptoJS.enc.Utf8.parse(_0x10c3d1), this.CryptoJS.enc.Utf8.parse(_0x228e92), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x179a1c),
          mode: this.CryptoJS.mode[_0x4f9705],
          padding: this.CryptoJS.pad[_0x39fab4]
        });
        return _0x1c7099.toString();
      } else {
        const _0x4334d8 = this.CryptoJS[_0x10c858].decrypt(_0x10c3d1, this.CryptoJS.enc.Utf8.parse(_0x228e92), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x179a1c),
          mode: this.CryptoJS.mode[_0x4f9705],
          padding: this.CryptoJS.pad[_0x39fab4]
        });
        return _0x4334d8.toString(this.CryptoJS.enc.Utf8);
      }
    }
    RSA(_0x5f4bbb, _0x41289f) {
      const _0x411b1e = require("node-rsa");
      let _0x388b7d = new _0x411b1e("-----BEGIN PUBLIC KEY-----\n" + _0x41289f + "\n-----END PUBLIC KEY-----");
      _0x388b7d.setOptions({
        encryptionScheme: "pkcs1"
      });
      return _0x388b7d.encrypt(_0x5f4bbb, "base64", "utf8");
    }
    SHA_RSA(_0x10bc9a, _0xcb3b50) {
      let _0x246904 = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0xcb3b50, 76) + "\n-----END PRIVATE KEY-----");
      let _0x9bdbaf = new this.Sha_Rsa.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });
      _0x9bdbaf.init(_0x246904);
      _0x9bdbaf.updateString(_0x10bc9a);
      let _0x207c49 = _0x9bdbaf.sign();
      let _0x432c9c = this.Sha_Rsa.hextob64u(_0x207c49);
      return _0x432c9c;
    }
    getNewline(_0x213001, _0x22b171) {
      let _0x17564c = new String(_0x213001);
      let _0x3349aa = 0;
      let _0x53bb95 = "";
      for (let _0x129cfc = 0, _0x2ee506 = _0x17564c.length; _0x129cfc < _0x2ee506; _0x129cfc++) {
        let _0x1e610f = _0x17564c.charCodeAt(_0x129cfc);
        if (_0x1e610f >= 1 && _0x1e610f <= 126 || _0x1e610f >= 65376 && _0x1e610f <= 65439) {
          _0x3349aa += 1;
        } else {
          _0x3349aa += 2;
        }
        _0x53bb95 += _0x17564c.charAt(_0x129cfc);
        if (_0x3349aa >= _0x22b171) {
          _0x53bb95 = _0x53bb95 + "\n";
          _0x3349aa = 0;
        }
      }
      return _0x53bb95;
    }
  }();
}