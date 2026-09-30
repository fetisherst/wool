/*
@蛋炒饭
软件名:运动柯城
完成每日任务，一天55积分左右，可以兑换实物，外地正常发货
变量名:ydkcck
手机号注册登录软件后，设置登陆密码，将手机号#密码填入变量，多账号换行隔开
定时:每天一到二次
*/
NAME = "运动柯城";
VALY = ["ydkcck"];
CK = "";
LOGS = 0;
channel = ["5d60be1db1985030db8625f2", "5d60bf44b1985030db8625f4", "63490a34fe3fc1680f581e1f", "6229a95cad61a429c691c707", "5d60bdf21b011b2a0fbb9c4a"];
class Bar {
  constructor(_0x4a66dc) {
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.phone = _0x4a66dc.split("#")[0];
    this.password = $.RSA(_0x4a66dc.split("#")[1], this.rsakey).replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/==/g, "%3D%3D");
    this.ts = $.time(13);
    this.reid = $.udid(1);
    this.channelid = $.randomArr(channel);
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.logs = true;
  }
  async login() {
    let _0x4eef4c = "client_id=42&password=" + this.password + "&phone_number=" + this.phone;
    let _0x19f3fa = await $.task("post", "https://passport.tmuyun.com/web/oauth/credential_auth", {}, _0x4eef4c);
    if (_0x19f3fa.code == 0) {
      this.code = _0x19f3fa.data.authorization_code.code;
      console.log("【" + this.phone + "】登录成功");
      this.logs = true;
      await this.gettoken();
    } else {
      this.logs = false;
    }
  }
  async gettoken() {
    let _0x3bb5e2 = $.SHA_Encrypt(1, "SHA256", "/api/zbtxz/login&&63fecca75057613538d94d82&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x4b5d53 = {
      "X-SESSION-ID": "63fecca75057613538d94d82",
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x3bb5e2,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x42d3ea = "code=" + this.code + "&token=&type=-1&union_id=";
    let _0x45c635 = await $.task("post", "https://vapp.tmuyun.com/api/zbtxz/login", _0x4b5d53, _0x42d3ea);
    this.sessionid = _0x45c635.data.session.id;
    this.name = _0x45c635.data.account.nick_name;
  }
  async tasklist() {
    let _0x350c2a = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/numberCenter&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x3b5c35 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x350c2a,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x56d5ed = await $.task("get", "https://vapp.tmuyun.com/api/user_mumber/numberCenter?is_new=1", _0x3b5c35);
    if (_0x56d5ed.code == 0) {
      console.log("【" + this.name + "】==>现有积分" + _0x56d5ed.data.rst.total_integral);
      for (let _0x208954 of _0x56d5ed.data.rst.user_task_list) {
        if (_0x208954.name == "分享资讯给好友" && _0x208954.completed == 0) {
          for (let _0x3ce438 = _0x208954.finish_times; _0x3ce438 < _0x208954.frequency; _0x3ce438++) {
            await this.share();
          }
        }
        if (_0x208954.name == "新闻资讯评论" && _0x208954.completed == 0) {
          for (let _0x14c3a6 = _0x208954.finish_times; _0x14c3a6 < _0x208954.frequency; _0x14c3a6++) {
            await this.dailyoneword();
            await this.comment();
          }
        }
        if (_0x208954.name == "新闻资讯阅读" && _0x208954.completed == 0) {
          for (let _0x1fe8c0 = _0x208954.finish_times; _0x1fe8c0 < _0x208954.frequency; _0x1fe8c0++) {
            await this.read();
          }
        }
        if (_0x208954.name == "使用本地服务" && _0x208954.completed == 0) {
          await this.local();
        }
        if (_0x208954.name == "新闻资讯点赞" && _0x208954.completed == 0) {
          for (let _0x2870b2 = _0x208954.finish_times; _0x2870b2 < _0x208954.frequency; _0x2870b2++) {
            await this.like();
          }
        }
      }
      for (let _0x5e497f of _0x56d5ed.data.daily_sign_info.daily_sign_list) {
        if (_0x5e497f.current == "今天" && _0x5e497f.signed == false) {
          await this.signin();
        }
      }
    } else {
      console.log("【" + this.name + "】获取任务列表失败，请稍后再试");
    }
  }
  async share() {
    let _0x146786 = this.ii[$.RT(0, 29)].id;
    let _0x32663d = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/doTask&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x3f2f15 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x32663d,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0xcc6243 = "memberType=3&member_type=3&target_id=" + _0x146786;
    let _0x4bce5f = await $.task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x3f2f15, _0xcc6243);
    if (_0x4bce5f.code == 0) {
      console.log("【" + this.name + "】 分享资讯成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 分享资讯失败");
    }
  }
  async list() {
    let _0x1a5a76 = $.SHA_Encrypt(1, "SHA256", "/api/article/channel_list&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x131ae9 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x1a5a76,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x26bfaa = await $.task("get", "https://vapp.tmuyun.com/api/article/channel_list?channel_id=" + this.channelid + "&isDiFangHao=false&is_new=true&list_count=0&size=30", _0x131ae9);
    this.ii = _0x26bfaa.data.article_list;
  }
  async dailyoneword() {
    let _0x181d25 = await $.task("get", "https://v1.jinrishici.com/all.json", {});
    this.word = _0x181d25.content;
  }
  async comment() {
    let _0x13d766 = this.ii[$.RT(0, 29)].id;
    let _0x228a5e = $.SHA_Encrypt(1, "SHA256", "/api/comment/create&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x97dd6 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x228a5e,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x46075d = "channel_article_id=" + _0x13d766 + "&content=" + encodeURIComponent(this.word);
    let _0x48e0b9 = await $.task("post", "https://vapp.tmuyun.com/api/comment/create", _0x97dd6, _0x46075d);
    if (_0x48e0b9.code == 0) {
      console.log("【" + this.name + "】 评论资讯成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 评论资讯失败");
    }
  }
  async read() {
    let _0x58e89d = this.ii[$.RT(0, 29)].id;
    let _0x37c17e = $.SHA_Encrypt(1, "SHA256", "/api/article/detail&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x418cc5 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x37c17e,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x2c556b = await $.task("get", "https://vapp.tmuyun.com/api/article/detail?id=" + _0x58e89d, _0x418cc5);
    if (_0x2c556b.code == 0) {
      console.log("【" + this.name + "】 阅读文章成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 阅读文章失败");
    }
  }
  async like() {
    let _0x193b99 = this.ii[$.RT(0, 29)].id;
    let _0x295cd6 = $.SHA_Encrypt(1, "SHA256", "/api/favorite/like&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x24b582 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x295cd6,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x5bfcd6 = "action=true&id=" + _0x193b99;
    let _0x467d84 = await $.task("post", "https://vapp.tmuyun.com/api/favorite/like", _0x24b582, _0x5bfcd6);
    if (_0x467d84.code == 0) {
      console.log("【" + this.name + "】 资讯点赞成功");
      await $.wait(10000, 20000);
    } else {
      console.log("【" + this.name + "】 资讯点赞失败");
    }
  }
  async signin() {
    let _0x1ca61a = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/sign&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x1a1ee1 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x1ca61a,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x3fad73 = await $.task("get", "https://vapp.tmuyun.com/api/user_mumber/sign", _0x1a1ee1);
    if (_0x3fad73.code == 0) {
      console.log("【" + this.name + "】 签到成功");
    } else {
      console.log("【" + this.name + "】 签到失败");
    }
  }
  async local() {
    let _0x3a6cea = $.SHA_Encrypt(1, "SHA256", "/api/user_mumber/doTask&&" + this.sessionid + "&&" + this.reid + "&&" + this.ts + "&&FR*r!isE5W&&29");
    let _0x5405dd = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": this.reid,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x3a6cea,
      "X-TENANT-ID": 29,
      "User-Agent": "1.1.5;" + this.reid + ";iPhone13,2;ios;11;Release"
    };
    let _0x4d0736 = "memberType=6&member_type=6";
    let _0x904322 = await $.task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x5405dd, _0x4d0736);
    if (_0x904322.code == 0) {
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
  let _0x11eabd = $.cookie_list.filter(_0x2c951b => _0x2c951b.logs == true);
  if (_0x11eabd.length == 0) {
    console.log("Cookie格式错误 或 账号被禁封");
    return;
  } else {
    await $.Multithreading("list");
    await $.Multithreading("tasklist");
  }
})().catch(_0x4f184e => {
  console.log(_0x4f184e);
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
    async Multithreading(_0x347627, _0x252a6d, _0x19f05b) {
      let _0x5f1571 = [];
      if (!_0x19f05b) {
        _0x19f05b = 1;
      }
      while (_0x19f05b--) {
        for (let _0x1d02b7 of $.cookie_list) {
          _0x5f1571.push(_0x1d02b7[_0x347627](_0x252a6d));
        }
      }
      await Promise.allSettled(_0x5f1571);
    }
    ExamineCookie() {
      let _0x3405f6 = process.env[VALY] || CK;
      let _0x383b54 = 0;
      if (_0x3405f6) {
        for (let _0x3c23b5 of _0x3405f6.split("\n").filter(_0x5e08ab => !!_0x5e08ab)) {
          $.cookie_list.push(new Bar(_0x3c23b5));
        }
        _0x383b54 = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }
      console.log("共找到" + _0x383b54 + "个账号");
      return $.cookie_list;
    }
    task(_0x8d8e20, _0x51c971, _0xe8fb07, _0x24c42c, _0x28bd7e) {
      if (_0x8d8e20 == "delete") {
        _0x8d8e20 = _0x8d8e20.toUpperCase();
      } else {
        _0x8d8e20 = _0x8d8e20;
      }
      if (_0x8d8e20 == "post") {
        delete _0xe8fb07["content-type"];
        delete _0xe8fb07["Content-type"];
        delete _0xe8fb07["content-Type"];
        if ($.safeGet(_0x24c42c)) {
          _0xe8fb07["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0xe8fb07["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (_0x24c42c) {
          _0xe8fb07["Content-Length"] = $.lengthInUtf8Bytes(_0x24c42c);
        }
      }
      if (_0x8d8e20 == "get") {
        delete _0xe8fb07["content-type"];
        delete _0xe8fb07["Content-type"];
        delete _0xe8fb07["content-Type"];
        delete _0xe8fb07["Content-Length"];
      }
      _0xe8fb07.Host = _0x51c971.replace("//", "/").split("/")[1];
      return new Promise(async _0x3fe563 => {
        if (_0x8d8e20.indexOf("T") < 0) {
          var _0x424e0a = {
            url: _0x51c971,
            headers: _0xe8fb07,
            body: _0x24c42c,
            proxy: "http://" + _0x28bd7e
          };
        } else {
          var _0x424e0a = {
            url: _0x51c971,
            headers: _0xe8fb07,
            form: JSON.parse(_0x24c42c),
            proxy: "http://" + _0x28bd7e
          };
        }
        if (!_0x28bd7e) {
          delete _0x424e0a.proxy;
        }
        this.request[_0x8d8e20.toLowerCase()](_0x424e0a, (_0x5146bb, _0x5bab22, _0x4fd531) => {
          try {
            if (_0x4fd531) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x424e0a);
                console.log("================ 返回 ================");
                if ($.safeGet(_0x4fd531)) {
                  console.log(JSON.parse(_0x4fd531));
                } else {
                  console.log(_0x4fd531);
                }
              }
            }
          } catch (_0x5273f4) {
            console.log(_0x5273f4, _0x51c971 + "\n" + _0xe8fb07);
          } finally {
            let _0x2228f3 = "";
            if (!_0x5146bb) {
              if ($.safeGet(_0x4fd531)) {
                _0x2228f3 = JSON.parse(_0x4fd531);
              } else if (_0x4fd531.indexOf("/") != -1 && _0x4fd531.indexOf("+") != -1) {
                _0x2228f3 = $.decrypts(_0x4fd531);
              } else {
                _0x2228f3 = _0x4fd531;
              }
            } else {
              _0x2228f3 = _0x51c971 + "   API请求失败，请检查网络重试\n" + _0x5146bb;
            }
            return _0x3fe563(_0x2228f3);
          }
        });
      });
    }
    decrypts(_0x5e55f3) {
      try {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x5e55f3, this.key1, this.iv));
      } catch (_0x287dd8) {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x5e55f3, this.key2, this.iv));
      }
    }
    lengthInUtf8Bytes(_0x5373dd) {
      let _0x54d3c9 = encodeURIComponent(_0x5373dd).match(/%[89ABab]/g);
      return _0x5373dd.length + (_0x54d3c9 ? _0x54d3c9.length : 0);
    }
    randomArr(_0x3bbc38) {
      return _0x3bbc38[parseInt(Math.random() * _0x3bbc38.length, 10)];
    }
    wait(_0x1f86e2) {
      return new Promise(_0xcb7e7d => setTimeout(_0xcb7e7d, _0x1f86e2));
    }
    time(_0x15c918) {
      if (_0x15c918 == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }
    timenow(_0x3934bb) {
      let _0x446633 = new Date();
      if (_0x3934bb == undefined) {
        let _0x8e9da9 = new Date();
        let _0x38bfd6 = _0x8e9da9.getFullYear() + "-";
        let _0x4eb3c4 = (_0x8e9da9.getMonth() + 1 < 10 ? "0" + (_0x8e9da9.getMonth() + 1) : _0x8e9da9.getMonth() + 1) + "-";
        let _0x128cdd = _0x8e9da9.getDate() + " ";
        let _0x44c619 = _0x8e9da9.getHours() + ":";
        let _0x34bb25 = _0x8e9da9.getMinutes() + ":";
        let _0x329988 = _0x8e9da9.getSeconds() + 1 < 10 ? "0" + _0x8e9da9.getSeconds() : _0x8e9da9.getSeconds();
        return _0x38bfd6 + _0x4eb3c4 + _0x128cdd + _0x44c619 + _0x34bb25 + _0x329988;
      } else if (_0x3934bb == 0) {
        return _0x446633.getFullYear();
      } else if (_0x3934bb == 1) {
        if (_0x446633.getMonth() + 1 < 10) {
          return "0" + (_0x446633.getMonth() + 1);
        } else {
          return _0x446633.getMonth() + 1;
        }
      } else if (_0x3934bb == 2) {
        return _0x446633.getDate();
      } else if (_0x3934bb == 3) {
        return _0x446633.getHours();
      } else if (_0x3934bb == 4) {
        return _0x446633.getMinutes();
      } else if (_0x3934bb == 5) {
        if (_0x446633.getSeconds() + 1 < 10) {
          return "0" + _0x446633.getSeconds();
        } else {
          return _0x446633.getSeconds();
        }
      }
    }
    safeGet(_0x2a439a) {
      try {
        if (typeof JSON.parse(_0x2a439a) == "object") {
          return true;
        }
      } catch (_0x48fdf8) {
        return false;
      }
    }
    randomString(_0x2316f8, _0x5791d4) {
      if (_0x5791d4 == 0) {
        let _0x3fff43 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789";
        let _0x2b0ac2 = _0x3fff43.length;
        let _0x4dd638 = "";
        for (let _0x4d178c = 0; _0x4d178c < _0x2316f8; _0x4d178c++) {
          _0x4dd638 += _0x3fff43.charAt(Math.floor(Math.random() * _0x2b0ac2));
        }
        return _0x4dd638;
      } else {
        let _0x4947ae = "qwertyuiopasdfghjklzxcvbnm01234567890123456789QWERTYUIOPASDFGHJKLZXCVBNM";
        let _0x23bf92 = _0x4947ae.length;
        let _0x1962c4 = "";
        for (let _0x457b15 = 0; _0x457b15 < _0x2316f8; _0x457b15++) {
          _0x1962c4 += _0x4947ae.charAt(Math.floor(Math.random() * _0x23bf92));
        }
        return _0x1962c4;
      }
    }
    udid(_0x124147) {
      function _0x4c4f97() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      let _0x11b529 = _0x4c4f97() + _0x4c4f97() + "-" + _0x4c4f97() + "-" + _0x4c4f97() + "-" + _0x4c4f97() + "-" + _0x4c4f97() + _0x4c4f97() + _0x4c4f97();
      if (_0x124147 == 0) {
        return _0x11b529.toUpperCase();
      } else {
        return _0x11b529.toLowerCase();
      }
    }
    encodeUnicode(_0x53732d) {
      var _0x478788 = [];
      for (var _0x3b2911 = 0; _0x3b2911 < _0x53732d.length; _0x3b2911++) {
        _0x478788[_0x3b2911] = ("00" + _0x53732d.charCodeAt(_0x3b2911).toString(16)).slice(-4);
      }
      return "\\u" + _0x478788.join("\\u");
    }
    decodeUnicode(_0x51695a) {
      _0x51695a = _0x51695a.replace(/\\u/g, "%u");
      return unescape(unescape(_0x51695a));
    }
    RT(_0x15ec87, _0x4a32d6) {
      return Math.round(Math.random() * (_0x4a32d6 - _0x15ec87) + _0x15ec87);
    }
    arrNull(_0x4d1586) {
      var _0x4cf7fb = _0x4d1586.filter(_0x325b79 => {
        return _0x325b79 && _0x325b79.trim();
      });
      return _0x4cf7fb;
    }
    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }
    timecs() {
      let _0x451efe = $.nowtime();
      if (JSON.stringify(_0x451efe).indexOf(" ") >= 0) {
        _0x451efe = _0x451efe.replace(" ", "T");
      }
      return new Date(_0x451efe).getTime() - 28800000;
    }
    rtjson(_0x118d46, _0x35c421, _0x4429be, _0x93f8c6) {
      if (_0x93f8c6 == 0) {
        return JSON.stringify(_0x118d46.split(_0x35c421).reduce((_0x2c6ece, _0x2fc78e) => {
          let _0xef14de = _0x2fc78e.split(_0x4429be);
          _0x2c6ece[_0xef14de[0].trim()] = _0xef14de[1].trim();
          return _0x2c6ece;
        }, {}));
      } else {
        return _0x118d46.split(_0x35c421).reduce((_0x53a060, _0x1d04f8) => {
          let _0x30bd17 = _0x1d04f8.split(_0x4429be);
          _0x53a060[_0x30bd17[0].trim()] = _0x30bd17[1].trim();
          return _0x53a060;
        }, {});
      }
    }
    MD5Encrypt(_0x3ab41e, _0x38ff8f) {
      if (_0x3ab41e == 0) {
        return this.CryptoJS.MD5(_0x38ff8f).toString().toLowerCase();
      } else if (_0x3ab41e == 1) {
        return this.CryptoJS.MD5(_0x38ff8f).toString().toUpperCase();
      } else if (_0x3ab41e == 2) {
        return this.CryptoJS.MD5(_0x38ff8f).toString().substring(8, 24).toLowerCase();
      } else if (_0x3ab41e == 3) {
        return this.CryptoJS.MD5(_0x38ff8f).toString().substring(8, 24).toUpperCase();
      }
    }
    SHA_Encrypt(_0x20822a, _0x45194d, _0x1f00c9) {
      if (_0x20822a == 0) {
        return this.CryptoJS[_0x45194d](_0x1f00c9).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x45194d](_0x1f00c9).toString();
      }
    }
    HmacSHA_Encrypt(_0x2bcddd, _0xea1d3d, _0x395b06, _0x1bee0b) {
      if (_0x2bcddd == 0) {
        return this.CryptoJS[_0xea1d3d](_0x395b06, _0x1bee0b).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0xea1d3d](_0x395b06, _0x1bee0b).toString();
      }
    }
    Base64(_0x9a3036, _0x4e6327) {
      if (_0x9a3036 == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x4e6327));
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x4e6327));
      }
    }
    DecryptCrypto(_0x5d56fd, _0x497ad7, _0x517166, _0x2ff139, _0x20d8b1, _0x309063, _0x23a118) {
      if (_0x5d56fd == 0) {
        const _0x282cb4 = this.CryptoJS[_0x497ad7].encrypt(this.CryptoJS.enc.Utf8.parse(_0x20d8b1), this.CryptoJS.enc.Utf8.parse(_0x309063), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x23a118),
          mode: this.CryptoJS.mode[_0x517166],
          padding: this.CryptoJS.pad[_0x2ff139]
        });
        return _0x282cb4.toString();
      } else {
        const _0x3dbdbe = this.CryptoJS[_0x497ad7].decrypt(_0x20d8b1, this.CryptoJS.enc.Utf8.parse(_0x309063), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x23a118),
          mode: this.CryptoJS.mode[_0x517166],
          padding: this.CryptoJS.pad[_0x2ff139]
        });
        return _0x3dbdbe.toString(this.CryptoJS.enc.Utf8);
      }
    }
    RSA(_0x1c13ac, _0x40c933) {
      const _0x572b75 = require("node-rsa");
      let _0x76ab1e = new _0x572b75("-----BEGIN PUBLIC KEY-----\n" + _0x40c933 + "\n-----END PUBLIC KEY-----");
      _0x76ab1e.setOptions({
        encryptionScheme: "pkcs1"
      });
      return _0x76ab1e.encrypt(_0x1c13ac, "base64", "utf8");
    }
    SHA_RSA(_0x33022d, _0x3f73b7) {
      let _0x3057c6 = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0x3f73b7, 76) + "\n-----END PRIVATE KEY-----");
      let _0x520a1c = new this.Sha_Rsa.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });
      _0x520a1c.init(_0x3057c6);
      _0x520a1c.updateString(_0x33022d);
      let _0x51f4bd = _0x520a1c.sign();
      let _0x3ff20f = this.Sha_Rsa.hextob64u(_0x51f4bd);
      return _0x3ff20f;
    }
    getNewline(_0x15a4c0, _0x3e98e6) {
      let _0x53a46a = new String(_0x15a4c0);
      let _0x349728 = 0;
      let _0x24140a = "";
      for (let _0x499c7e = 0, _0x294b10 = _0x53a46a.length; _0x499c7e < _0x294b10; _0x499c7e++) {
        let _0xb1fe7b = _0x53a46a.charCodeAt(_0x499c7e);
        if (_0xb1fe7b >= 1 && _0xb1fe7b <= 126 || _0xb1fe7b >= 65376 && _0xb1fe7b <= 65439) {
          _0x349728 += 1;
        } else {
          _0x349728 += 2;
        }
        _0x24140a += _0x53a46a.charAt(_0x499c7e);
        if (_0x349728 >= _0x3e98e6) {
          _0x24140a = _0x24140a + "\n";
          _0x349728 = 0;
        }
      }
      return _0x24140a;
    }
  }();
}