/*
@蛋炒饭
软件名:爱海盐
完成每日任务，一天55积分左右，可以兑换实物，外地正常发货
变量名:ahyck
手机号注册登录软件后，设置登陆密码，将手机号#密码填入变量，多账号用@隔开
定时:每天一到二次
*/
NAME = "爱海盐";
VALY = ["ahyck"];
LOGS = 0;
CK = "";
var userList = [];
channel = ["6357999806287f04c3191637", "638db5cd7d9bcd1b7610b120", "63573b5c06287f04c31913bd", "638eced2b40eef425b4430ff", "63552eddfe3fc1680f583c1c"];
class Bar {
  constructor(_0x5f10ef) {
    this.phone = _0x5f10ef.split("#")[0];
    this.password = _0x5f10ef.split("#")[1];
    this.ts = times(13);
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.logs = true;
    this.channelid = randomArr(channel);
  }
  async login() {
    let _0x3f6d0e = RSA(this.password, this.rsakey);
    let _0x598b0e = _0x3f6d0e.replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/==/g, "%3D%3D");
    let _0x16691f = "client_id=10018&password=" + _0x598b0e + "&phone_number=" + this.phone;
    let _0x282b4d = await task("post", "https://passport.tmuyun.com/web/oauth/credential_auth", {}, _0x16691f);
    if (_0x282b4d.code == 0) {
      this.code = _0x282b4d.data.authorization_code.code;
      console.log("【" + this.phone + "】登录成功");
      this.logs = true;
      await this.gettoken();
    } else {
      this.logs = false;
    }
  }
  async gettoken() {
    let _0xa0a86e = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x19f356 = SHA256("/api/zbtxz/login&&63ee408b2cd91823e43927fa&&" + _0xa0a86e + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x542f38 = {
      "X-SESSION-ID": "63ee408b2cd91823e43927fa",
      "X-REQUEST-ID": _0xa0a86e,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x19f356,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0xa0a86e + ";iPhone13,2;ios;11;Release"
    };
    let _0x32eb96 = "code=" + this.code + "&token=&type=-1&union_id=";
    let _0xb5f7d9 = await task("post", "https://vapp.tmuyun.com/api/zbtxz/login", _0x542f38, _0x32eb96);
    this.sessionid = _0xb5f7d9.data.session.id;
    this.name = _0xb5f7d9.data.account.nick_name;
  }
  async tasklist() {
    let _0x2176a6 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x491160 = SHA256("/api/user_mumber/numberCenter&&" + this.sessionid + "&&" + _0x2176a6 + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x9b9cb1 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x2176a6,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x491160,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x2176a6 + ";iPhone13,2;ios;11;Release"
    };
    let _0x826ea7 = await task("get", "https://vapp.tmuyun.com/api/user_mumber/numberCenter?is_new=1", _0x9b9cb1);
    if (_0x826ea7.code == 0) {
      for (let _0xd5b8bf of _0x826ea7.data.rst.user_task_list) {
        if (_0xd5b8bf.name == "分享资讯给好友" && _0xd5b8bf.completed == 0) {
          for (let _0xbb90ac = _0xd5b8bf.finish_times; _0xbb90ac < _0xd5b8bf.frequency; _0xbb90ac++) {
            await this.share();
          }
        }
        if (_0xd5b8bf.name == "新闻资讯评论" && _0xd5b8bf.completed == 0) {
          for (let _0x1d7470 = _0xd5b8bf.finish_times; _0x1d7470 < _0xd5b8bf.frequency; _0x1d7470++) {
            await this.dailyoneword();
            await this.comment();
          }
        }
        if (_0xd5b8bf.name == "新闻资讯点赞" && _0xd5b8bf.completed == 0) {
          for (let _0x41d199 = _0xd5b8bf.finish_times; _0x41d199 < _0xd5b8bf.frequency; _0x41d199++) {
            await this.like();
          }
        }
        if (_0xd5b8bf.name == "新闻资讯阅读" && _0xd5b8bf.completed == 0) {
          for (let _0x37a121 = _0xd5b8bf.finish_times; _0x37a121 < _0xd5b8bf.frequency; _0x37a121++) {
            await this.read();
          }
        }
      }
      for (let _0x57b42a of _0x826ea7.data.daily_sign_info.daily_sign_list) {
        if (_0x57b42a.current == "今天" && _0x57b42a.signed == false) {
          await this.signin();
        }
      }
    } else {
      console.log("【" + this.name + "】获取任务列表失败，请稍后再试");
    }
  }
  async share() {
    let _0x2bbd48 = this.ii[RT(0, 49)].id;
    let _0x310766 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x5dd1f1 = SHA256("/api/user_mumber/doTask&&" + this.sessionid + "&&" + _0x310766 + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x19fe81 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x310766,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x5dd1f1,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x310766 + ";iPhone13,2;ios;11;Release"
    };
    let _0x3f121a = "memberType=3&member_type=3&target_id=" + _0x2bbd48;
    let _0x44e5e6 = await task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x19fe81, _0x3f121a);
    if (_0x44e5e6.code == 0) {
      console.log("【" + this.name + "】 分享资讯成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 分享资讯失败");
    }
  }
  async list() {
    let _0x5f8de0 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x5c0202 = SHA256("/api/article/channel_list&&" + this.sessionid + "&&" + _0x5f8de0 + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x3219c1 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x5f8de0,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x5c0202,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x5f8de0 + ";iPhone13,2;ios;11;Release"
    };
    let _0x27c19d = await task("get", "https://vapp.tmuyun.com/api/article/channel_list?channel_id=" + this.channelid + "&isDiFangHao=false&is_new=true&list_count=0&size=50", _0x3219c1);
    this.ii = _0x27c19d.data.article_list;
  }
  async dailyoneword() {
    let _0x1b233d = await task("get", "https://v1.jinrishici.com/all.json", {});
    this.word = _0x1b233d.content;
  }
  async comment() {
    let _0x1a8397 = this.ii[RT(0, 49)].id;
    let _0x23007e = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x214bcc = SHA256("/api/comment/create&&" + this.sessionid + "&&" + _0x23007e + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x2051cc = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x23007e,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x214bcc,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x23007e + ";iPhone13,2;ios;11;Release"
    };
    let _0x4b8203 = "channel_article_id=" + _0x1a8397 + "&content=" + encodeURIComponent(this.word);
    let _0x301082 = await task("post", "https://vapp.tmuyun.com/api/comment/create", _0x2051cc, _0x4b8203);
    if (_0x301082.code == 0) {
      console.log("【" + this.name + "】 评论资讯成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 评论资讯失败");
    }
  }
  async like() {
    let _0x54cf94 = this.ii[RT(0, 49)].id;
    let _0x57f79e = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x4d6c8e = SHA256("/api/favorite/like&&" + this.sessionid + "&&" + _0x57f79e + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x352aa6 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x57f79e,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x4d6c8e,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x57f79e + ";iPhone13,2;ios;11;Release"
    };
    let _0x455eef = "action=true&id=" + _0x54cf94;
    let _0x634c7e = await task("post", "https://vapp.tmuyun.com/api/favorite/like", _0x352aa6, _0x455eef);
    if (_0x634c7e.code == 0) {
      console.log("【" + this.name + "】 资讯点赞成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 资讯点赞失败");
    }
  }
  async read() {
    let _0x3543cb = this.ii[RT(0, 49)].id;
    let _0x4a688d = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x4c33bd = SHA256("/api/article/detail&&" + this.sessionid + "&&" + _0x4a688d + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x100765 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x4a688d,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x4c33bd,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x4a688d + ";iPhone13,2;ios;11;Release"
    };
    let _0x1c0d46 = await task("get", "https://vapp.tmuyun.com/api/article/detail?id=" + _0x3543cb, _0x100765);
    if (_0x1c0d46.code == 0) {
      console.log("【" + this.name + "】 资讯阅读成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 资讯阅读失败");
    }
  }
  async signin() {
    let _0x1a9c96 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x110789 = SHA256("/api/user_mumber/sign&&" + this.sessionid + "&&" + _0x1a9c96 + "&&" + this.ts + "&&FR*r!isE5W&&60");
    let _0x2f3575 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x1a9c96,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x110789,
      "X-TENANT-ID": 60,
      "User-Agent": "3.0.10;" + _0x1a9c96 + ";iPhone13,2;ios;11;Release"
    };
    let _0x300757 = await task("get", "https://vapp.tmuyun.com/api/user_mumber/sign", _0x2f3575);
    if (_0x300757.code == 0) {
      console.log("【" + this.name + "】 签到成功");
    } else {
      console.log("【" + this.name + "】 签到失败");
    }
  }
}
(async () => {
  console.log("蛋炒饭美食交流频道：https://t.me/+xjTie4yvzm83OTI9，私聊投稿");
  console.log(NAME);
  checkEnv();
  for (let _0x47829d of userList) {
    await _0x47829d.login();
  }
  let _0x24140f = userList.filter(_0xad747a => _0xad747a.logs == true);
  if (_0x24140f.length == 0) {
    console.log("呆子，检查一下你的CK是否正确");
    return;
  }
  for (let _0x28ab4b of _0x24140f) {
    await _0x28ab4b.list();
    await _0x28ab4b.tasklist();
  }
})().catch(_0x8f0a91 => {
  console.log(_0x8f0a91);
}).finally(() => {});
function randomArr(_0x5bd9e8) {
  return _0x5bd9e8[parseInt(Math.random() * _0x5bd9e8.length, 10)];
}
function RT(_0x1b1274, _0x5629c7) {
  return Math.round(Math.random() * (_0x5629c7 - _0x1b1274) + _0x1b1274);
}
function times(_0xbda152) {
  if (_0xbda152 == 10) {
    let _0x5378fa = Math.round(new Date().getTime() / 1000).toString();
    return _0x5378fa;
  } else {
    let _0x18af62 = new Date().getTime();
    return _0x18af62;
  }
}
async function task(_0x282b49, _0x289af1, _0x7e3e38, _0xbdf6b9) {
  if (_0x282b49 == "delete") {
    _0x282b49 = _0x282b49.toUpperCase();
  } else {
    _0x282b49 = _0x282b49;
  }
  const _0x52b986 = require("request");
  if (_0x282b49 == "post") {
    delete _0x7e3e38["content-type"];
    delete _0x7e3e38["Content-type"];
    delete _0x7e3e38["content-Type"];
    if (safeGet(_0xbdf6b9)) {
      _0x7e3e38["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x7e3e38["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0xbdf6b9) {
      _0x7e3e38["Content-Length"] = lengthInUtf8Bytes(_0xbdf6b9);
    }
  }
  _0x7e3e38.Host = _0x289af1.replace("//", "/").split("/")[1];
  if (_0x282b49.indexOf("T") < 0) {
    var _0xc5380f = {
      url: _0x289af1,
      headers: _0x7e3e38,
      body: _0xbdf6b9
    };
  } else {
    var _0xc5380f = {
      url: _0x289af1,
      headers: _0x7e3e38,
      form: JSON.parse(_0xbdf6b9)
    };
  }
  return new Promise(async _0x3d2de6 => {
    _0x52b986[_0x282b49.toLowerCase()](_0xc5380f, (_0x2b6db0, _0x160f1e, _0x57302c) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0xc5380f);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x57302c));
        }
      } catch (_0x221479) {} finally {
        if (!_0x2b6db0) {
          if (safeGet(_0x57302c)) {
            _0x57302c = JSON.parse(_0x57302c);
          } else {
            _0x57302c = _0x57302c;
          }
        } else {
          _0x57302c = _0x289af1 + "   API请求失败，请检查网络重试\n" + _0x2b6db0;
        }
        return _0x3d2de6(_0x57302c);
      }
    });
  });
}
function SJS(_0x5dd4a6) {
  _0x5dd4a6 = _0x5dd4a6 || 32;
  var _0x423a86 = "1234567890";
  var _0x54c83f = _0x423a86.length;
  var _0x4eeb31 = "";
  for (i = 0; i < _0x5dd4a6; i++) {
    _0x4eeb31 += _0x423a86.charAt(Math.floor(Math.random() * _0x54c83f));
  }
  return _0x4eeb31;
}
function SJSxx(_0x433639) {
  _0x433639 = _0x433639 || 32;
  var _0x55bde7 = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0xa660b8 = _0x55bde7.length;
  var _0x54288a = "";
  for (i = 0; i < _0x433639; i++) {
    _0x54288a += _0x55bde7.charAt(Math.floor(Math.random() * _0xa660b8));
  }
  return _0x54288a;
}
function safeGet(_0x4f23c5) {
  try {
    if (typeof JSON.parse(_0x4f23c5) == "object") {
      return true;
    }
  } catch (_0x1a01cb) {
    return false;
  }
}
function lengthInUtf8Bytes(_0xf99458) {
  let _0x281994 = encodeURIComponent(_0xf99458).match(/%[89ABab]/g);
  return _0xf99458.length + (_0x281994 ? _0x281994.length : 0);
}
async function checkEnv() {
  let _0x303900 = process.env[VALY] || CK;
  let _0x3c21ee = 0;
  if (_0x303900) {
    for (let _0x25f860 of _0x303900.split("@").filter(_0x4ccca5 => !!_0x4ccca5)) {
      userList.push(new Bar(_0x25f860));
    }
    _0x3c21ee = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x3c21ee + "个账号");
  return userList;
}
function wait(_0x579f8d) {
  return new Promise(_0x40cb88 => setTimeout(_0x40cb88, _0x579f8d));
}
function stringToBase64(_0x44d447) {
  var _0x1ad555 = Buffer.from(_0x44d447).toString("base64");
  return _0x1ad555;
}
function EncryptCrypto(_0xdc6f65, _0x336dce, _0x59d705, _0x4d90dc, _0x16646b, _0x1855ab) {
  const _0x4f966a = require("crypto-js");
  const _0x2c201d = _0x4f966a.enc.Utf8.parse(_0x4d90dc);
  const _0x3da711 = _0x4f966a.enc.Utf8.parse(_0x1855ab);
  const _0x481841 = _0x4f966a.enc.Utf8.parse(_0x16646b);
  const _0x4700d7 = _0x4f966a[_0xdc6f65].encrypt(_0x2c201d, _0x481841, {
    iv: _0x3da711,
    mode: _0x4f966a.mode[_0x336dce],
    padding: _0x4f966a.pad[_0x59d705]
  });
  return _0x4700d7.toString();
}
function DecryptCrypto(_0x418a96, _0x48b0fc, _0x54ab9f, _0x2efe39, _0x296a51, _0x3a7ba8) {
  const _0x247d68 = require("crypto-js");
  const _0x32652f = _0x247d68.enc.Utf8.parse(_0x3a7ba8);
  const _0x3b2fb7 = _0x247d68.enc.Utf8.parse(_0x296a51);
  const _0x507e83 = _0x247d68[_0x418a96].decrypt(_0x2efe39, _0x3b2fb7, {
    iv: _0x32652f,
    mode: _0x247d68.mode[_0x48b0fc],
    padding: _0x247d68.pad[_0x54ab9f]
  });
  return _0x507e83.toString(_0x247d68.enc.Utf8);
}
function RSA(_0x1290d3, _0x56c626) {
  const _0x4e05c0 = require("node-rsa");
  let _0x1114a0 = new _0x4e05c0("-----BEGIN PUBLIC KEY-----\n" + _0x56c626 + "\n-----END PUBLIC KEY-----");
  _0x1114a0.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x1114a0.encrypt(_0x1290d3, "base64", "utf8");
}
function SHA1_Encrypt(_0x1c6fcb) {
  return CryptoJS.SHA1(_0x1c6fcb).toString();
}
function SHA256(_0x24402c) {
  const _0x2980e6 = 8;
  const _0x11d7ba = 0;
  function _0xf99c79(_0x17def6, _0x341ebe) {
    const _0xc48368 = (_0x17def6 & 65535) + (_0x341ebe & 65535);
    return (_0x17def6 >> 16) + (_0x341ebe >> 16) + (_0xc48368 >> 16) << 16 | _0xc48368 & 65535;
  }
  function _0x1c557e(_0x3700d5, _0xf0a0d9) {
    return _0x3700d5 >>> _0xf0a0d9 | _0x3700d5 << 32 - _0xf0a0d9;
  }
  function _0x29497f(_0x3b2926, _0x28b96c) {
    return _0x3b2926 >>> _0x28b96c;
  }
  function _0x1c85f7(_0x5030a0, _0x4b7107, _0x36d6c9) {
    return _0x5030a0 & _0x4b7107 ^ ~_0x5030a0 & _0x36d6c9;
  }
  function _0xde6b0b(_0x4cfafc, _0x188477, _0xe75345) {
    return _0x4cfafc & _0x188477 ^ _0x4cfafc & _0xe75345 ^ _0x188477 & _0xe75345;
  }
  function _0x1e1326(_0x64fbee) {
    return _0x1c557e(_0x64fbee, 2) ^ _0x1c557e(_0x64fbee, 13) ^ _0x1c557e(_0x64fbee, 22);
  }
  function _0x4710ab(_0x368d45) {
    return _0x1c557e(_0x368d45, 6) ^ _0x1c557e(_0x368d45, 11) ^ _0x1c557e(_0x368d45, 25);
  }
  function _0x293f2b(_0x4fc5d0) {
    return _0x1c557e(_0x4fc5d0, 7) ^ _0x1c557e(_0x4fc5d0, 18) ^ _0x29497f(_0x4fc5d0, 3);
  }
  return function (_0xe721d1) {
    const _0x35ccd5 = _0x11d7ba ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x1ad480 = "";
    for (let _0x560e46 = 0; _0x560e46 < _0xe721d1.length * 4; _0x560e46++) {
      _0x1ad480 += _0x35ccd5.charAt(_0xe721d1[_0x560e46 >> 2] >> (3 - _0x560e46 % 4) * 8 + 4 & 15) + _0x35ccd5.charAt(_0xe721d1[_0x560e46 >> 2] >> (3 - _0x560e46 % 4) * 8 & 15);
    }
    return _0x1ad480;
  }(function (_0x138e5a, _0x5cc2bf) {
    const _0x126e0e = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x1ca24f = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x333ca7 = new Array(64);
    let _0x1e0e9d;
    let _0x2b98af;
    let _0x387806;
    let _0x5e0561;
    let _0x2fd97b;
    let _0x51ead6;
    let _0x51b222;
    let _0x361910;
    let _0x3793e2;
    let _0x33a9b0;
    let _0x501506;
    let _0x5d0096;
    _0x138e5a[_0x5cc2bf >> 5] |= 128 << 24 - _0x5cc2bf % 32;
    _0x138e5a[15 + (_0x5cc2bf + 64 >> 9 << 4)] = _0x5cc2bf;
    _0x3793e2 = 0;
    for (; _0x3793e2 < _0x138e5a.length; _0x3793e2 += 16) {
      _0x1e0e9d = _0x1ca24f[0];
      _0x2b98af = _0x1ca24f[1];
      _0x387806 = _0x1ca24f[2];
      _0x5e0561 = _0x1ca24f[3];
      _0x2fd97b = _0x1ca24f[4];
      _0x51ead6 = _0x1ca24f[5];
      _0x51b222 = _0x1ca24f[6];
      _0x361910 = _0x1ca24f[7];
      _0x33a9b0 = 0;
      for (; _0x33a9b0 < 64; _0x33a9b0++) {
        _0x333ca7[_0x33a9b0] = _0x33a9b0 < 16 ? _0x138e5a[_0x33a9b0 + _0x3793e2] : _0xf99c79(_0xf99c79(_0xf99c79(_0x1c557e(_0x2dd16c = _0x333ca7[_0x33a9b0 - 2], 17) ^ _0x1c557e(_0x2dd16c, 19) ^ _0x29497f(_0x2dd16c, 10), _0x333ca7[_0x33a9b0 - 7]), _0x293f2b(_0x333ca7[_0x33a9b0 - 15])), _0x333ca7[_0x33a9b0 - 16]);
        _0x501506 = _0xf99c79(_0xf99c79(_0xf99c79(_0xf99c79(_0x361910, _0x4710ab(_0x2fd97b)), _0x1c85f7(_0x2fd97b, _0x51ead6, _0x51b222)), _0x126e0e[_0x33a9b0]), _0x333ca7[_0x33a9b0]);
        _0x5d0096 = _0xf99c79(_0x1e1326(_0x1e0e9d), _0xde6b0b(_0x1e0e9d, _0x2b98af, _0x387806));
        _0x361910 = _0x51b222;
        _0x51b222 = _0x51ead6;
        _0x51ead6 = _0x2fd97b;
        _0x2fd97b = _0xf99c79(_0x5e0561, _0x501506);
        _0x5e0561 = _0x387806;
        _0x387806 = _0x2b98af;
        _0x2b98af = _0x1e0e9d;
        _0x1e0e9d = _0xf99c79(_0x501506, _0x5d0096);
      }
      _0x1ca24f[0] = _0xf99c79(_0x1e0e9d, _0x1ca24f[0]);
      _0x1ca24f[1] = _0xf99c79(_0x2b98af, _0x1ca24f[1]);
      _0x1ca24f[2] = _0xf99c79(_0x387806, _0x1ca24f[2]);
      _0x1ca24f[3] = _0xf99c79(_0x5e0561, _0x1ca24f[3]);
      _0x1ca24f[4] = _0xf99c79(_0x2fd97b, _0x1ca24f[4]);
      _0x1ca24f[5] = _0xf99c79(_0x51ead6, _0x1ca24f[5]);
      _0x1ca24f[6] = _0xf99c79(_0x51b222, _0x1ca24f[6]);
      _0x1ca24f[7] = _0xf99c79(_0x361910, _0x1ca24f[7]);
    }
    var _0x2dd16c;
    return _0x1ca24f;
  }(function (_0x134125) {
    const _0x107b83 = [];
    const _0x15ba43 = (1 << _0x2980e6) - 1;
    for (let _0x191acb = 0; _0x191acb < _0x134125.length * _0x2980e6; _0x191acb += _0x2980e6) {
      _0x107b83[_0x191acb >> 5] |= (_0x134125.charCodeAt(_0x191acb / _0x2980e6) & _0x15ba43) << 24 - _0x191acb % 32;
    }
    return _0x107b83;
  }(_0x24402c = function (_0x4d6764) {
    _0x4d6764 = _0x4d6764.replace(/\r\n/g, "\n");
    let _0x1d2191 = "";
    for (let _0x3f79c1 = 0; _0x3f79c1 < _0x4d6764.length; _0x3f79c1++) {
      const _0x26656c = _0x4d6764.charCodeAt(_0x3f79c1);
      if (_0x26656c < 128) {
        _0x1d2191 += String.fromCharCode(_0x26656c);
      } else if (_0x26656c > 127 && _0x26656c < 2048) {
        _0x1d2191 += String.fromCharCode(_0x26656c >> 6 | 192);
        _0x1d2191 += String.fromCharCode(_0x26656c & 63 | 128);
      } else {
        _0x1d2191 += String.fromCharCode(_0x26656c >> 12 | 224);
        _0x1d2191 += String.fromCharCode(_0x26656c >> 6 & 63 | 128);
        _0x1d2191 += String.fromCharCode(_0x26656c & 63 | 128);
      }
    }
    return _0x1d2191;
  }(_0x24402c)), _0x24402c.length * _0x2980e6));
}
function MD5Encrypt(_0x592620) {
  function _0x5914aa(_0x49505f, _0x240f62) {
    return _0x49505f << _0x240f62 | _0x49505f >>> 32 - _0x240f62;
  }
  function _0x923bcf(_0x23abe7, _0xe465a4) {
    var _0x2cbce5;
    var _0xb71617;
    var _0x38dc3a;
    var _0x53a598;
    var _0x2bb56d;
    _0x38dc3a = _0x23abe7 & 2147483648;
    _0x53a598 = _0xe465a4 & 2147483648;
    _0x2cbce5 = _0x23abe7 & 1073741824;
    _0xb71617 = _0xe465a4 & 1073741824;
    _0x2bb56d = (_0x23abe7 & 1073741823) + (_0xe465a4 & 1073741823);
    if (_0x2cbce5 & _0xb71617) {
      return _0x2bb56d ^ 2147483648 ^ _0x38dc3a ^ _0x53a598;
    } else if (_0x2cbce5 | _0xb71617) {
      if (_0x2bb56d & 1073741824) {
        return _0x2bb56d ^ 3221225472 ^ _0x38dc3a ^ _0x53a598;
      } else {
        return _0x2bb56d ^ 1073741824 ^ _0x38dc3a ^ _0x53a598;
      }
    } else {
      return _0x2bb56d ^ _0x38dc3a ^ _0x53a598;
    }
  }
  function _0x524476(_0x31d078, _0xa5623c, _0x1ef3ac, _0x3eb327, _0x319ee5, _0x96978b, _0xb26690) {
    var _0x2d7004;
    var _0x38649b;
    _0x31d078 = _0x923bcf(_0x31d078, _0x923bcf(_0x923bcf((_0x2d7004 = _0xa5623c) & (_0x38649b = _0x1ef3ac) | ~_0x2d7004 & _0x3eb327, _0x319ee5), _0xb26690));
    return _0x923bcf(_0x5914aa(_0x31d078, _0x96978b), _0xa5623c);
  }
  function _0x321123(_0x55a16c, _0x525551, _0x32c710, _0xb01fd4, _0x8f9c39, _0x50ddc1, _0x2b36b4) {
    var _0x4f70cf;
    var _0xb83cbf;
    var _0x2f6107;
    _0x55a16c = _0x923bcf(_0x55a16c, _0x923bcf(_0x923bcf((_0x4f70cf = _0x525551, _0xb83cbf = _0x32c710, _0x4f70cf & (_0x2f6107 = _0xb01fd4) | _0xb83cbf & ~_0x2f6107), _0x8f9c39), _0x2b36b4));
    return _0x923bcf(_0x5914aa(_0x55a16c, _0x50ddc1), _0x525551);
  }
  function _0x253c6f(_0x3d2f12, _0x14876b, _0x35b48b, _0xc37dda, _0x47530d, _0x18530a, _0x499cf2) {
    var _0x209c3d;
    var _0x3c0a9b;
    _0x3d2f12 = _0x923bcf(_0x3d2f12, _0x923bcf(_0x923bcf((_0x209c3d = _0x14876b) ^ (_0x3c0a9b = _0x35b48b) ^ _0xc37dda, _0x47530d), _0x499cf2));
    return _0x923bcf(_0x5914aa(_0x3d2f12, _0x18530a), _0x14876b);
  }
  function _0xd89275(_0x2ee7db, _0x3a8012, _0x22294f, _0x56c6b3, _0x27c0e3, _0x38153d, _0x37f819) {
    var _0x320f18;
    var _0x1a96bd;
    _0x2ee7db = _0x923bcf(_0x2ee7db, _0x923bcf(_0x923bcf((_0x320f18 = _0x3a8012, (_0x1a96bd = _0x22294f) ^ (_0x320f18 | ~_0x56c6b3)), _0x27c0e3), _0x37f819));
    return _0x923bcf(_0x5914aa(_0x2ee7db, _0x38153d), _0x3a8012);
  }
  function _0x12baa9(_0x560d52) {
    var _0x5276f4;
    var _0x2126b8 = "";
    var _0x55703b = "";
    for (_0x5276f4 = 0; _0x5276f4 <= 3; _0x5276f4++) {
      _0x2126b8 += (_0x55703b = "0" + (_0x560d52 >>> _0x5276f4 * 8 & 255).toString(16)).substr(_0x55703b.length - 2, 2);
    }
    return _0x2126b8;
  }
  var _0x42f960;
  var _0x27393e;
  var _0x595894;
  var _0x1309a6;
  var _0x58ae3b;
  var _0x5a35d6;
  var _0x56d745;
  var _0x5b6d96;
  var _0x16a119;
  var _0x2fafbf = [];
  _0x2fafbf = function (_0x2854a2) {
    for (var _0x447af6, _0x2c7dbc = _0x2854a2.length, _0x2a1f54 = _0x2c7dbc + 8, _0x7b2ede = ((_0x2a1f54 - _0x2a1f54 % 64) / 64 + 1) * 16, _0x9c7679 = Array(_0x7b2ede - 1), _0x563191 = 0, _0x18467c = 0; _0x2c7dbc > _0x18467c;) {
      _0x447af6 = (_0x18467c - _0x18467c % 4) / 4;
      _0x563191 = _0x18467c % 4 * 8;
      _0x9c7679[_0x447af6] = _0x9c7679[_0x447af6] | _0x2854a2.charCodeAt(_0x18467c) << _0x563191;
      _0x18467c++;
    }
    _0x447af6 = (_0x18467c - _0x18467c % 4) / 4;
    _0x563191 = _0x18467c % 4 * 8;
    _0x9c7679[_0x447af6] = _0x9c7679[_0x447af6] | 128 << _0x563191;
    _0x9c7679[_0x7b2ede - 2] = _0x2c7dbc << 3;
    _0x9c7679[_0x7b2ede - 1] = _0x2c7dbc >>> 29;
    return _0x9c7679;
  }(_0x592620 = function (_0x46f946) {
    _0x46f946 = _0x46f946.replace(/\r\n/g, "\n");
    for (var _0x5d3743 = "", _0x5ef017 = 0; _0x5ef017 < _0x46f946.length; _0x5ef017++) {
      var _0x280329 = _0x46f946.charCodeAt(_0x5ef017);
      if (_0x280329 < 128) {
        _0x5d3743 += String.fromCharCode(_0x280329);
      } else if (_0x280329 > 127 && _0x280329 < 2048) {
        _0x5d3743 += String.fromCharCode(_0x280329 >> 6 | 192);
        _0x5d3743 += String.fromCharCode(_0x280329 & 63 | 128);
      } else {
        _0x5d3743 += String.fromCharCode(_0x280329 >> 12 | 224);
        _0x5d3743 += String.fromCharCode(_0x280329 >> 6 & 63 | 128);
        _0x5d3743 += String.fromCharCode(_0x280329 & 63 | 128);
      }
    }
    return _0x5d3743;
  }(_0x592620));
  _0x5a35d6 = 1732584193;
  _0x56d745 = 4023233417;
  _0x5b6d96 = 2562383102;
  _0x16a119 = 271733878;
  _0x42f960 = 0;
  for (; _0x42f960 < _0x2fafbf.length; _0x42f960 += 16) {
    _0x27393e = _0x5a35d6;
    _0x595894 = _0x56d745;
    _0x1309a6 = _0x5b6d96;
    _0x58ae3b = _0x16a119;
    _0x5a35d6 = _0x524476(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 0], 7, 3614090360);
    _0x16a119 = _0x524476(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 1], 12, 3905402710);
    _0x5b6d96 = _0x524476(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 2], 17, 606105819);
    _0x56d745 = _0x524476(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 3], 22, 3250441966);
    _0x5a35d6 = _0x524476(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 4], 7, 4118548399);
    _0x16a119 = _0x524476(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 5], 12, 1200080426);
    _0x5b6d96 = _0x524476(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 6], 17, 2821735955);
    _0x56d745 = _0x524476(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 7], 22, 4249261313);
    _0x5a35d6 = _0x524476(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 8], 7, 1770035416);
    _0x16a119 = _0x524476(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 9], 12, 2336552879);
    _0x5b6d96 = _0x524476(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 10], 17, 4294925233);
    _0x56d745 = _0x524476(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 11], 22, 2304563134);
    _0x5a35d6 = _0x524476(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 12], 7, 1804603682);
    _0x16a119 = _0x524476(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 13], 12, 4254626195);
    _0x5b6d96 = _0x524476(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 14], 17, 2792965006);
    _0x56d745 = _0x524476(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 15], 22, 1236535329);
    _0x5a35d6 = _0x321123(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 1], 5, 4129170786);
    _0x16a119 = _0x321123(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 6], 9, 3225465664);
    _0x5b6d96 = _0x321123(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 11], 14, 643717713);
    _0x56d745 = _0x321123(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 0], 20, 3921069994);
    _0x5a35d6 = _0x321123(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 5], 5, 3593408605);
    _0x16a119 = _0x321123(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 10], 9, 38016083);
    _0x5b6d96 = _0x321123(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 15], 14, 3634488961);
    _0x56d745 = _0x321123(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 4], 20, 3889429448);
    _0x5a35d6 = _0x321123(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 9], 5, 568446438);
    _0x16a119 = _0x321123(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 14], 9, 3275163606);
    _0x5b6d96 = _0x321123(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 3], 14, 4107603335);
    _0x56d745 = _0x321123(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 8], 20, 1163531501);
    _0x5a35d6 = _0x321123(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 13], 5, 2850285829);
    _0x16a119 = _0x321123(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 2], 9, 4243563512);
    _0x5b6d96 = _0x321123(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 7], 14, 1735328473);
    _0x56d745 = _0x321123(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 12], 20, 2368359562);
    _0x5a35d6 = _0x253c6f(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 5], 4, 4294588738);
    _0x16a119 = _0x253c6f(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 8], 11, 2272392833);
    _0x5b6d96 = _0x253c6f(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 11], 16, 1839030562);
    _0x56d745 = _0x253c6f(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 14], 23, 4259657740);
    _0x5a35d6 = _0x253c6f(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 1], 4, 2763975236);
    _0x16a119 = _0x253c6f(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 4], 11, 1272893353);
    _0x5b6d96 = _0x253c6f(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 7], 16, 4139469664);
    _0x56d745 = _0x253c6f(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 10], 23, 3200236656);
    _0x5a35d6 = _0x253c6f(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 13], 4, 681279174);
    _0x16a119 = _0x253c6f(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 0], 11, 3936430074);
    _0x5b6d96 = _0x253c6f(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 3], 16, 3572445317);
    _0x56d745 = _0x253c6f(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 6], 23, 76029189);
    _0x5a35d6 = _0x253c6f(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 9], 4, 3654602809);
    _0x16a119 = _0x253c6f(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 12], 11, 3873151461);
    _0x5b6d96 = _0x253c6f(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 15], 16, 530742520);
    _0x56d745 = _0x253c6f(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 2], 23, 3299628645);
    _0x5a35d6 = _0xd89275(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 0], 6, 4096336452);
    _0x16a119 = _0xd89275(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 7], 10, 1126891415);
    _0x5b6d96 = _0xd89275(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 14], 15, 2878612391);
    _0x56d745 = _0xd89275(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 5], 21, 4237533241);
    _0x5a35d6 = _0xd89275(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 12], 6, 1700485571);
    _0x16a119 = _0xd89275(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 3], 10, 2399980690);
    _0x5b6d96 = _0xd89275(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 10], 15, 4293915773);
    _0x56d745 = _0xd89275(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 1], 21, 2240044497);
    _0x5a35d6 = _0xd89275(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 8], 6, 1873313359);
    _0x16a119 = _0xd89275(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 15], 10, 4264355552);
    _0x5b6d96 = _0xd89275(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 6], 15, 2734768916);
    _0x56d745 = _0xd89275(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 13], 21, 1309151649);
    _0x5a35d6 = _0xd89275(_0x5a35d6, _0x56d745, _0x5b6d96, _0x16a119, _0x2fafbf[_0x42f960 + 4], 6, 4149444226);
    _0x16a119 = _0xd89275(_0x16a119, _0x5a35d6, _0x56d745, _0x5b6d96, _0x2fafbf[_0x42f960 + 11], 10, 3174756917);
    _0x5b6d96 = _0xd89275(_0x5b6d96, _0x16a119, _0x5a35d6, _0x56d745, _0x2fafbf[_0x42f960 + 2], 15, 718787259);
    _0x56d745 = _0xd89275(_0x56d745, _0x5b6d96, _0x16a119, _0x5a35d6, _0x2fafbf[_0x42f960 + 9], 21, 3951481745);
    _0x5a35d6 = _0x923bcf(_0x5a35d6, _0x27393e);
    _0x56d745 = _0x923bcf(_0x56d745, _0x595894);
    _0x5b6d96 = _0x923bcf(_0x5b6d96, _0x1309a6);
    _0x16a119 = _0x923bcf(_0x16a119, _0x58ae3b);
  }
  return (_0x12baa9(_0x5a35d6) + _0x12baa9(_0x56d745) + _0x12baa9(_0x5b6d96) + _0x12baa9(_0x16a119)).toLowerCase();
}