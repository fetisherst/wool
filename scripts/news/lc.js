/*
@蛋炒饭
软件名:仑传
完成每日任务，一天145积分左右，可以兑换实物，外地正常发货
变量名:lcck
手机号注册登录软件后，设置登陆密码，将手机号#密码填入变量，多账号用@隔开
定时:每天一到二次
*/
NAME = "仑传";
VALY = ["lcck"];
LOGS = 0;
CK = "";
var userList = [];
channel = ["5cdcc989b198504a785efad1", "5cde70181b011b32d34f3f69", "62ce6c40373c557efc463687", "62e22699fe3fc1556e6a8819", "5cdcc9a61b011b32d34f3e5a", "6046d97aad61a43e70547c1a", "5cdcccf5b198504a785efad7"];
class Bar {
  constructor(_0x42b581) {
    this.phone = _0x42b581.split("#")[0];
    this.password = _0x42b581.split("#")[1];
    this.ts = times(13);
    this.rsakey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB";
    this.logs = true;
    this.channelid = randomArr(channel);
  }
  async login() {
    let _0x3142d5 = RSA(this.password, this.rsakey);
    let _0x118db4 = _0x3142d5.replace(/\+/g, "%2B").replace(/\//g, "%2F").replace(/==/g, "%3D%3D");
    let _0xe101a2 = "client_id=17&password=" + _0x118db4 + "&phone_number=" + this.phone;
    let _0x56a818 = await task("post", "https://passport.tmuyun.com/web/oauth/credential_auth", {}, _0xe101a2);
    if (_0x56a818.code == 0) {
      this.code = _0x56a818.data.authorization_code.code;
      console.log("【" + this.phone + "】登录成功");
      this.logs = true;
      await this.gettoken();
    } else {
      this.logs = false;
    }
  }
  async gettoken() {
    let _0x1106b0 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x152b15 = SHA256("/api/zbtxz/login&&63e66232a95d5a7663ae8a2e&&" + _0x1106b0 + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x50eaa1 = {
      "X-SESSION-ID": "63e66232a95d5a7663ae8a2e",
      "X-REQUEST-ID": _0x1106b0,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x152b15,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x1106b0 + ";iPhone13,2;ios;11;Release"
    };
    let _0x37551a = "code=" + this.code + "&token=&type=-1&union_id=";
    let _0x5d2fe6 = await task("post", "https://vapp.tmuyun.com/api/zbtxz/login", _0x50eaa1, _0x37551a);
    this.sessionid = _0x5d2fe6.data.session.id;
    this.name = _0x5d2fe6.data.account.nick_name;
  }
  async tasklist() {
    let _0x160f37 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x38c9d0 = SHA256("/api/user_mumber/numberCenter&&" + this.sessionid + "&&" + _0x160f37 + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x3df92e = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x160f37,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x38c9d0,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x160f37 + ";iPhone13,2;ios;11;Release"
    };
    let _0x2a7472 = await task("get", "https://vapp.tmuyun.com/api/user_mumber/numberCenter?is_new=1", _0x3df92e);
    if (_0x2a7472.code == 0) {
      console.log("【" + this.name + "】==>现有积分" + _0x2a7472.data.rst.total_integral);
      for (let _0x14c533 of _0x2a7472.data.rst.user_task_list) {
        if (_0x14c533.name == "分享资讯给好友" && _0x14c533.completed == 0) {
          for (let _0x57ce3a = _0x14c533.finish_times; _0x57ce3a < _0x14c533.frequency; _0x57ce3a++) {
            await this.share();
          }
        }
        if (_0x14c533.name == "新闻资讯评论" && _0x14c533.completed == 0) {
          for (let _0x26a2af = _0x14c533.finish_times; _0x26a2af < _0x14c533.frequency; _0x26a2af++) {
            await this.dailyoneword();
            await this.comment();
          }
        }
        if (_0x14c533.name == "新闻资讯点赞" && _0x14c533.completed == 0) {
          for (let _0x259f0c = _0x14c533.finish_times; _0x259f0c < _0x14c533.frequency; _0x259f0c++) {
            await this.like();
          }
        }
      }
      for (let _0x509cc3 of _0x2a7472.data.daily_sign_info.daily_sign_list) {
        if (_0x509cc3.current == "今天" && _0x509cc3.signed == false) {
          await this.signin();
        }
      }
    } else {
      console.log("【" + this.name + "】获取任务列表失败，请稍后再试");
    }
  }
  async share() {
    let _0x2bc985 = this.ii[RT(0, 29)].id;
    let _0x1928f4 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x281cc7 = SHA256("/api/user_mumber/doTask&&" + this.sessionid + "&&" + _0x1928f4 + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x44d9b8 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x1928f4,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x281cc7,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x1928f4 + ";iPhone13,2;ios;11;Release"
    };
    let _0x492aca = "memberType=3&member_type=3&target_id=" + _0x2bc985;
    let _0x5cfd07 = await task("post", "https://vapp.tmuyun.com/api/user_mumber/doTask", _0x44d9b8, _0x492aca);
    if (_0x5cfd07.code == 0) {
      console.log("【" + this.name + "】 分享资讯成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 分享资讯失败");
    }
  }
  async list() {
    let _0x511137 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x1608ce = SHA256("/api/article/channel_list&&" + this.sessionid + "&&" + _0x511137 + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0xcca545 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x511137,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x1608ce,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x511137 + ";iPhone13,2;ios;11;Release"
    };
    let _0x5e2c9f = await task("get", "https://vapp.tmuyun.com/api/article/channel_list?channel_id=" + this.channelid + "&isDiFangHao=false&is_new=true&list_count=0&size=30", _0xcca545);
    this.ii = _0x5e2c9f.data.article_list;
  }
  async dailyoneword() {
    let _0x41de63 = await task("get", "https://v1.jinrishici.com/all.json", {});
    this.word = _0x41de63.content;
  }
  async comment() {
    let _0x2d8180 = this.ii[RT(0, 29)].id;
    let _0x12eabe = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x345739 = SHA256("/api/comment/create&&" + this.sessionid + "&&" + _0x12eabe + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x1abe36 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x12eabe,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x345739,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x12eabe + ";iPhone13,2;ios;11;Release"
    };
    let _0xd13e20 = "channel_article_id=" + _0x2d8180 + "&content=" + encodeURIComponent(this.word);
    let _0x10b2ab = await task("post", "https://vapp.tmuyun.com/api/comment/create", _0x1abe36, _0xd13e20);
    if (_0x10b2ab.code == 0) {
      console.log("【" + this.name + "】 评论资讯成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 评论资讯失败");
    }
  }
  async like() {
    let _0x49267a = this.ii[RT(0, 29)].id;
    let _0x4e0c9a = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x123daf = SHA256("/api/favorite/like&&" + this.sessionid + "&&" + _0x4e0c9a + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x5976aa = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x4e0c9a,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x123daf,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x4e0c9a + ";iPhone13,2;ios;11;Release"
    };
    let _0x8b67e8 = "action=true&id=" + _0x49267a;
    let _0x36ec87 = await task("post", "https://vapp.tmuyun.com/api/favorite/like", _0x5976aa, _0x8b67e8);
    if (_0x36ec87.code == 0) {
      console.log("【" + this.name + "】 资讯点赞成功");
      await wait(10000, 18000);
    } else {
      console.log("【" + this.name + "】 资讯点赞失败");
    }
  }
  async signin() {
    let _0x555f67 = SJSxx(8) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(4) + "-" + SJSxx(12);
    let _0x27a42a = SHA256("/api/user_mumber/sign&&" + this.sessionid + "&&" + _0x555f67 + "&&" + this.ts + "&&FR*r!isE5W&&18");
    let _0x443990 = {
      "X-SESSION-ID": this.sessionid,
      "X-REQUEST-ID": _0x555f67,
      "X-TIMESTAMP": this.ts,
      "X-SIGNATURE": _0x27a42a,
      "X-TENANT-ID": 18,
      "User-Agent": "1.3.3;" + _0x555f67 + ";iPhone13,2;ios;11;Release"
    };
    let _0x99c58a = await task("get", "https://vapp.tmuyun.com/api/user_mumber/sign", _0x443990);
    if (_0x99c58a.code == 0) {
      console.log("【" + this.name + "】 签到成功");
    } else {
      console.log("【" + this.name + "】 签到失败");
    }
  }
}
(async () => {
  console.log("蛋炒饭美食交流频道：https://t.me/+xjTie4yvzm83OTI9");
  console.log(NAME);
  checkEnv();
  for (let _0x2a3856 of userList) {
    await _0x2a3856.login();
  }
  let _0x5f1911 = userList.filter(_0x124e33 => _0x124e33.logs == true);
  if (_0x5f1911.length == 0) {
    console.log("呆子，检查一下你的CK是否正确");
    return;
  }
  if (_0x5f1911.length < 6) {
    for (let _0x413e7b of _0x5f1911) {
      await _0x413e7b.list();
      await _0x413e7b.tasklist();
    }
  } else {
    console.log("账号数量超出可运行数，请控制在3个账号以内！");
  }
})().catch(_0x208e53 => {
  console.log(_0x208e53);
}).finally(() => {});
function randomArr(_0x487ae3) {
  return _0x487ae3[parseInt(Math.random() * _0x487ae3.length, 10)];
}
function RT(_0x56991d, _0x208d65) {
  return Math.round(Math.random() * (_0x208d65 - _0x56991d) + _0x56991d);
}
function times(_0x27b9a2) {
  if (_0x27b9a2 == 10) {
    let _0x5ab748 = Math.round(new Date().getTime() / 1000).toString();
    return _0x5ab748;
  } else {
    let _0x59b16 = new Date().getTime();
    return _0x59b16;
  }
}
async function task(_0x4323d5, _0x2fbd64, _0x37a616, _0x4db183) {
  if (_0x4323d5 == "delete") {
    _0x4323d5 = _0x4323d5.toUpperCase();
  } else {
    _0x4323d5 = _0x4323d5;
  }
  const _0xe70da7 = require("request");
  if (_0x4323d5 == "post") {
    delete _0x37a616["content-type"];
    delete _0x37a616["Content-type"];
    delete _0x37a616["content-Type"];
    if (safeGet(_0x4db183)) {
      _0x37a616["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x37a616["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0x4db183) {
      _0x37a616["Content-Length"] = lengthInUtf8Bytes(_0x4db183);
    }
  }
  _0x37a616.Host = _0x2fbd64.replace("//", "/").split("/")[1];
  if (_0x4323d5.indexOf("T") < 0) {
    var _0x56b006 = {
      url: _0x2fbd64,
      headers: _0x37a616,
      body: _0x4db183
    };
  } else {
    var _0x56b006 = {
      url: _0x2fbd64,
      headers: _0x37a616,
      form: JSON.parse(_0x4db183)
    };
  }
  return new Promise(async _0x2d72fd => {
    _0xe70da7[_0x4323d5.toLowerCase()](_0x56b006, (_0x16dfc5, _0x38563e, _0x8e2fa0) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0x56b006);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x8e2fa0));
        }
      } catch (_0x5a0303) {} finally {
        if (!_0x16dfc5) {
          if (safeGet(_0x8e2fa0)) {
            _0x8e2fa0 = JSON.parse(_0x8e2fa0);
          } else {
            _0x8e2fa0 = _0x8e2fa0;
          }
        } else {
          _0x8e2fa0 = _0x2fbd64 + "   API请求失败，请检查网络重试\n" + _0x16dfc5;
        }
        return _0x2d72fd(_0x8e2fa0);
      }
    });
  });
}
function SJS(_0x2a3c68) {
  _0x2a3c68 = _0x2a3c68 || 32;
  var _0x462bab = "1234567890";
  var _0x4ea4da = _0x462bab.length;
  var _0x2fd798 = "";
  for (i = 0; i < _0x2a3c68; i++) {
    _0x2fd798 += _0x462bab.charAt(Math.floor(Math.random() * _0x4ea4da));
  }
  return _0x2fd798;
}
function SJSxx(_0x16c3f8) {
  _0x16c3f8 = _0x16c3f8 || 32;
  var _0x588278 = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0x1f9479 = _0x588278.length;
  var _0x31c7fd = "";
  for (i = 0; i < _0x16c3f8; i++) {
    _0x31c7fd += _0x588278.charAt(Math.floor(Math.random() * _0x1f9479));
  }
  return _0x31c7fd;
}
function safeGet(_0x52f424) {
  try {
    if (typeof JSON.parse(_0x52f424) == "object") {
      return true;
    }
  } catch (_0xdb4164) {
    return false;
  }
}
function lengthInUtf8Bytes(_0x3545e0) {
  let _0x56ee84 = encodeURIComponent(_0x3545e0).match(/%[89ABab]/g);
  return _0x3545e0.length + (_0x56ee84 ? _0x56ee84.length : 0);
}
async function checkEnv() {
  let _0x47762e = process.env[VALY] || CK;
  let _0x2ad39a = 0;
  if (_0x47762e) {
    for (let _0x50f2c0 of _0x47762e.split("@").filter(_0x1ffc82 => !!_0x1ffc82)) {
      userList.push(new Bar(_0x50f2c0));
    }
    _0x2ad39a = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x2ad39a + "个账号");
  return userList;
}
function wait(_0x225d0d) {
  return new Promise(_0x320127 => setTimeout(_0x320127, _0x225d0d));
}
function stringToBase64(_0x46c6a8) {
  var _0x720455 = Buffer.from(_0x46c6a8).toString("base64");
  return _0x720455;
}
function EncryptCrypto(_0x4c6393, _0x28c890, _0x201040, _0x2d4e5e, _0x4db0b4, _0x2eff5e) {
  const _0x52296a = require("crypto-js");
  const _0x11d109 = _0x52296a.enc.Utf8.parse(_0x2d4e5e);
  const _0x446cc9 = _0x52296a.enc.Utf8.parse(_0x2eff5e);
  const _0x1f731f = _0x52296a.enc.Utf8.parse(_0x4db0b4);
  const _0x52c127 = _0x52296a[_0x4c6393].encrypt(_0x11d109, _0x1f731f, {
    iv: _0x446cc9,
    mode: _0x52296a.mode[_0x28c890],
    padding: _0x52296a.pad[_0x201040]
  });
  return _0x52c127.toString();
}
function DecryptCrypto(_0xe369e0, _0x26b40e, _0x3098a7, _0x20fc3c, _0x1f00b3, _0x17d848) {
  const _0x18e25f = require("crypto-js");
  const _0x1d2373 = _0x18e25f.enc.Utf8.parse(_0x17d848);
  const _0x5b38cc = _0x18e25f.enc.Utf8.parse(_0x1f00b3);
  const _0x474d9e = _0x18e25f[_0xe369e0].decrypt(_0x20fc3c, _0x5b38cc, {
    iv: _0x1d2373,
    mode: _0x18e25f.mode[_0x26b40e],
    padding: _0x18e25f.pad[_0x3098a7]
  });
  return _0x474d9e.toString(_0x18e25f.enc.Utf8);
}
function RSA(_0x357805, _0x26a9f3) {
  const _0x1585c3 = require("node-rsa");
  let _0x3f23eb = new _0x1585c3("-----BEGIN PUBLIC KEY-----\n" + _0x26a9f3 + "\n-----END PUBLIC KEY-----");
  _0x3f23eb.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x3f23eb.encrypt(_0x357805, "base64", "utf8");
}
function SHA1_Encrypt(_0x293f94) {
  return CryptoJS.SHA1(_0x293f94).toString();
}
function SHA256(_0x412734) {
  const _0x3b0326 = 8;
  const _0x7f01d4 = 0;
  function _0x271d92(_0x42f60b, _0x558b09) {
    const _0x417d65 = (_0x42f60b & 65535) + (_0x558b09 & 65535);
    return (_0x42f60b >> 16) + (_0x558b09 >> 16) + (_0x417d65 >> 16) << 16 | _0x417d65 & 65535;
  }
  function _0x12df9e(_0x33bdf5, _0x2e67a3) {
    return _0x33bdf5 >>> _0x2e67a3 | _0x33bdf5 << 32 - _0x2e67a3;
  }
  function _0x35b460(_0x15992d, _0x13181a) {
    return _0x15992d >>> _0x13181a;
  }
  function _0x37f9ef(_0x4f3ecb, _0x358af0, _0x5ae637) {
    return _0x4f3ecb & _0x358af0 ^ ~_0x4f3ecb & _0x5ae637;
  }
  function _0x125be0(_0x1f5c2e, _0x320fe0, _0x1bcb14) {
    return _0x1f5c2e & _0x320fe0 ^ _0x1f5c2e & _0x1bcb14 ^ _0x320fe0 & _0x1bcb14;
  }
  function _0x31c13b(_0x4e5ed0) {
    return _0x12df9e(_0x4e5ed0, 2) ^ _0x12df9e(_0x4e5ed0, 13) ^ _0x12df9e(_0x4e5ed0, 22);
  }
  function _0x43326b(_0x5152d5) {
    return _0x12df9e(_0x5152d5, 6) ^ _0x12df9e(_0x5152d5, 11) ^ _0x12df9e(_0x5152d5, 25);
  }
  function _0x295140(_0x508a3f) {
    return _0x12df9e(_0x508a3f, 7) ^ _0x12df9e(_0x508a3f, 18) ^ _0x35b460(_0x508a3f, 3);
  }
  return function (_0x52cc41) {
    const _0x5c2556 = _0x7f01d4 ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x21644e = "";
    for (let _0x51410b = 0; _0x51410b < _0x52cc41.length * 4; _0x51410b++) {
      _0x21644e += _0x5c2556.charAt(_0x52cc41[_0x51410b >> 2] >> (3 - _0x51410b % 4) * 8 + 4 & 15) + _0x5c2556.charAt(_0x52cc41[_0x51410b >> 2] >> (3 - _0x51410b % 4) * 8 & 15);
    }
    return _0x21644e;
  }(function (_0x2c8cfe, _0x737ab6) {
    const _0x387bd8 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x2bdfe3 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x7a0536 = new Array(64);
    let _0x7b4dbe;
    let _0x8a435e;
    let _0x9f101f;
    let _0x25b760;
    let _0x3f66c1;
    let _0x14071f;
    let _0x4a0454;
    let _0x46ee4f;
    let _0x5b50f6;
    let _0x204dee;
    let _0x327a3b;
    let _0x567b6d;
    _0x2c8cfe[_0x737ab6 >> 5] |= 128 << 24 - _0x737ab6 % 32;
    _0x2c8cfe[15 + (_0x737ab6 + 64 >> 9 << 4)] = _0x737ab6;
    _0x5b50f6 = 0;
    for (; _0x5b50f6 < _0x2c8cfe.length; _0x5b50f6 += 16) {
      _0x7b4dbe = _0x2bdfe3[0];
      _0x8a435e = _0x2bdfe3[1];
      _0x9f101f = _0x2bdfe3[2];
      _0x25b760 = _0x2bdfe3[3];
      _0x3f66c1 = _0x2bdfe3[4];
      _0x14071f = _0x2bdfe3[5];
      _0x4a0454 = _0x2bdfe3[6];
      _0x46ee4f = _0x2bdfe3[7];
      _0x204dee = 0;
      for (; _0x204dee < 64; _0x204dee++) {
        _0x7a0536[_0x204dee] = _0x204dee < 16 ? _0x2c8cfe[_0x204dee + _0x5b50f6] : _0x271d92(_0x271d92(_0x271d92(_0x12df9e(_0xeace0a = _0x7a0536[_0x204dee - 2], 17) ^ _0x12df9e(_0xeace0a, 19) ^ _0x35b460(_0xeace0a, 10), _0x7a0536[_0x204dee - 7]), _0x295140(_0x7a0536[_0x204dee - 15])), _0x7a0536[_0x204dee - 16]);
        _0x327a3b = _0x271d92(_0x271d92(_0x271d92(_0x271d92(_0x46ee4f, _0x43326b(_0x3f66c1)), _0x37f9ef(_0x3f66c1, _0x14071f, _0x4a0454)), _0x387bd8[_0x204dee]), _0x7a0536[_0x204dee]);
        _0x567b6d = _0x271d92(_0x31c13b(_0x7b4dbe), _0x125be0(_0x7b4dbe, _0x8a435e, _0x9f101f));
        _0x46ee4f = _0x4a0454;
        _0x4a0454 = _0x14071f;
        _0x14071f = _0x3f66c1;
        _0x3f66c1 = _0x271d92(_0x25b760, _0x327a3b);
        _0x25b760 = _0x9f101f;
        _0x9f101f = _0x8a435e;
        _0x8a435e = _0x7b4dbe;
        _0x7b4dbe = _0x271d92(_0x327a3b, _0x567b6d);
      }
      _0x2bdfe3[0] = _0x271d92(_0x7b4dbe, _0x2bdfe3[0]);
      _0x2bdfe3[1] = _0x271d92(_0x8a435e, _0x2bdfe3[1]);
      _0x2bdfe3[2] = _0x271d92(_0x9f101f, _0x2bdfe3[2]);
      _0x2bdfe3[3] = _0x271d92(_0x25b760, _0x2bdfe3[3]);
      _0x2bdfe3[4] = _0x271d92(_0x3f66c1, _0x2bdfe3[4]);
      _0x2bdfe3[5] = _0x271d92(_0x14071f, _0x2bdfe3[5]);
      _0x2bdfe3[6] = _0x271d92(_0x4a0454, _0x2bdfe3[6]);
      _0x2bdfe3[7] = _0x271d92(_0x46ee4f, _0x2bdfe3[7]);
    }
    var _0xeace0a;
    return _0x2bdfe3;
  }(function (_0x1c13dd) {
    const _0x293350 = [];
    const _0x1c5076 = (1 << _0x3b0326) - 1;
    for (let _0x455437 = 0; _0x455437 < _0x1c13dd.length * _0x3b0326; _0x455437 += _0x3b0326) {
      _0x293350[_0x455437 >> 5] |= (_0x1c13dd.charCodeAt(_0x455437 / _0x3b0326) & _0x1c5076) << 24 - _0x455437 % 32;
    }
    return _0x293350;
  }(_0x412734 = function (_0x21f216) {
    _0x21f216 = _0x21f216.replace(/\r\n/g, "\n");
    let _0x47c32e = "";
    for (let _0x15d23d = 0; _0x15d23d < _0x21f216.length; _0x15d23d++) {
      const _0x3c3f9c = _0x21f216.charCodeAt(_0x15d23d);
      if (_0x3c3f9c < 128) {
        _0x47c32e += String.fromCharCode(_0x3c3f9c);
      } else if (_0x3c3f9c > 127 && _0x3c3f9c < 2048) {
        _0x47c32e += String.fromCharCode(_0x3c3f9c >> 6 | 192);
        _0x47c32e += String.fromCharCode(_0x3c3f9c & 63 | 128);
      } else {
        _0x47c32e += String.fromCharCode(_0x3c3f9c >> 12 | 224);
        _0x47c32e += String.fromCharCode(_0x3c3f9c >> 6 & 63 | 128);
        _0x47c32e += String.fromCharCode(_0x3c3f9c & 63 | 128);
      }
    }
    return _0x47c32e;
  }(_0x412734)), _0x412734.length * _0x3b0326));
}
function MD5Encrypt(_0x4063b4) {
  function _0x325471(_0x4ed8a8, _0x8dfa11) {
    return _0x4ed8a8 << _0x8dfa11 | _0x4ed8a8 >>> 32 - _0x8dfa11;
  }
  function _0x3b6afd(_0x26e89d, _0x28d5ce) {
    var _0x58b25a;
    var _0x1f451a;
    var _0xe080ae;
    var _0x4f02f1;
    var _0x32671c;
    _0xe080ae = _0x26e89d & 2147483648;
    _0x4f02f1 = _0x28d5ce & 2147483648;
    _0x58b25a = _0x26e89d & 1073741824;
    _0x1f451a = _0x28d5ce & 1073741824;
    _0x32671c = (_0x26e89d & 1073741823) + (_0x28d5ce & 1073741823);
    if (_0x58b25a & _0x1f451a) {
      return _0x32671c ^ 2147483648 ^ _0xe080ae ^ _0x4f02f1;
    } else if (_0x58b25a | _0x1f451a) {
      if (_0x32671c & 1073741824) {
        return _0x32671c ^ 3221225472 ^ _0xe080ae ^ _0x4f02f1;
      } else {
        return _0x32671c ^ 1073741824 ^ _0xe080ae ^ _0x4f02f1;
      }
    } else {
      return _0x32671c ^ _0xe080ae ^ _0x4f02f1;
    }
  }
  function _0x3d9515(_0x1ae09b, _0x5ef004, _0x4827c9, _0x2f1243, _0x1763bd, _0x390adc, _0x4eca3a) {
    var _0x3f109d;
    var _0x476718;
    _0x1ae09b = _0x3b6afd(_0x1ae09b, _0x3b6afd(_0x3b6afd((_0x3f109d = _0x5ef004) & (_0x476718 = _0x4827c9) | ~_0x3f109d & _0x2f1243, _0x1763bd), _0x4eca3a));
    return _0x3b6afd(_0x325471(_0x1ae09b, _0x390adc), _0x5ef004);
  }
  function _0x4993a4(_0x53a315, _0x4ac5fc, _0x37dfd6, _0x7bc95, _0x3bc860, _0xe194ad, _0x1e2eb6) {
    var _0x19ea82;
    var _0x431547;
    var _0x370de5;
    _0x53a315 = _0x3b6afd(_0x53a315, _0x3b6afd(_0x3b6afd((_0x19ea82 = _0x4ac5fc, _0x431547 = _0x37dfd6, _0x19ea82 & (_0x370de5 = _0x7bc95) | _0x431547 & ~_0x370de5), _0x3bc860), _0x1e2eb6));
    return _0x3b6afd(_0x325471(_0x53a315, _0xe194ad), _0x4ac5fc);
  }
  function _0x562322(_0x55a1b7, _0x4dc5b6, _0x5e307a, _0x27054f, _0x4418a3, _0x5ed773, _0x13c5f6) {
    var _0x25467d;
    var _0x470c03;
    _0x55a1b7 = _0x3b6afd(_0x55a1b7, _0x3b6afd(_0x3b6afd((_0x25467d = _0x4dc5b6) ^ (_0x470c03 = _0x5e307a) ^ _0x27054f, _0x4418a3), _0x13c5f6));
    return _0x3b6afd(_0x325471(_0x55a1b7, _0x5ed773), _0x4dc5b6);
  }
  function _0x4e2e2f(_0x5af10f, _0x43705f, _0xd46e85, _0x574097, _0x59295c, _0x4bde4b, _0x2eb6cc) {
    var _0x118917;
    var _0x51e579;
    _0x5af10f = _0x3b6afd(_0x5af10f, _0x3b6afd(_0x3b6afd((_0x118917 = _0x43705f, (_0x51e579 = _0xd46e85) ^ (_0x118917 | ~_0x574097)), _0x59295c), _0x2eb6cc));
    return _0x3b6afd(_0x325471(_0x5af10f, _0x4bde4b), _0x43705f);
  }
  function _0x591ac2(_0x40bc0e) {
    var _0x145982;
    var _0x16be20 = "";
    var _0x268f51 = "";
    for (_0x145982 = 0; _0x145982 <= 3; _0x145982++) {
      _0x16be20 += (_0x268f51 = "0" + (_0x40bc0e >>> _0x145982 * 8 & 255).toString(16)).substr(_0x268f51.length - 2, 2);
    }
    return _0x16be20;
  }
  var _0x4960b3;
  var _0x41cc9a;
  var _0x46e858;
  var _0x571b1e;
  var _0x446d6b;
  var _0x473be2;
  var _0x4d6db4;
  var _0x5ea675;
  var _0xbc31c1;
  var _0x20e036 = [];
  _0x20e036 = function (_0x84e923) {
    for (var _0x10779b, _0x117f5f = _0x84e923.length, _0x54e504 = _0x117f5f + 8, _0xf4a062 = ((_0x54e504 - _0x54e504 % 64) / 64 + 1) * 16, _0x56f4fa = Array(_0xf4a062 - 1), _0x197b61 = 0, _0x1c2183 = 0; _0x117f5f > _0x1c2183;) {
      _0x10779b = (_0x1c2183 - _0x1c2183 % 4) / 4;
      _0x197b61 = _0x1c2183 % 4 * 8;
      _0x56f4fa[_0x10779b] = _0x56f4fa[_0x10779b] | _0x84e923.charCodeAt(_0x1c2183) << _0x197b61;
      _0x1c2183++;
    }
    _0x10779b = (_0x1c2183 - _0x1c2183 % 4) / 4;
    _0x197b61 = _0x1c2183 % 4 * 8;
    _0x56f4fa[_0x10779b] = _0x56f4fa[_0x10779b] | 128 << _0x197b61;
    _0x56f4fa[_0xf4a062 - 2] = _0x117f5f << 3;
    _0x56f4fa[_0xf4a062 - 1] = _0x117f5f >>> 29;
    return _0x56f4fa;
  }(_0x4063b4 = function (_0x5f12fc) {
    _0x5f12fc = _0x5f12fc.replace(/\r\n/g, "\n");
    for (var _0x55b813 = "", _0x4be2b5 = 0; _0x4be2b5 < _0x5f12fc.length; _0x4be2b5++) {
      var _0x8f7552 = _0x5f12fc.charCodeAt(_0x4be2b5);
      if (_0x8f7552 < 128) {
        _0x55b813 += String.fromCharCode(_0x8f7552);
      } else if (_0x8f7552 > 127 && _0x8f7552 < 2048) {
        _0x55b813 += String.fromCharCode(_0x8f7552 >> 6 | 192);
        _0x55b813 += String.fromCharCode(_0x8f7552 & 63 | 128);
      } else {
        _0x55b813 += String.fromCharCode(_0x8f7552 >> 12 | 224);
        _0x55b813 += String.fromCharCode(_0x8f7552 >> 6 & 63 | 128);
        _0x55b813 += String.fromCharCode(_0x8f7552 & 63 | 128);
      }
    }
    return _0x55b813;
  }(_0x4063b4));
  _0x473be2 = 1732584193;
  _0x4d6db4 = 4023233417;
  _0x5ea675 = 2562383102;
  _0xbc31c1 = 271733878;
  _0x4960b3 = 0;
  for (; _0x4960b3 < _0x20e036.length; _0x4960b3 += 16) {
    _0x41cc9a = _0x473be2;
    _0x46e858 = _0x4d6db4;
    _0x571b1e = _0x5ea675;
    _0x446d6b = _0xbc31c1;
    _0x473be2 = _0x3d9515(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 0], 7, 3614090360);
    _0xbc31c1 = _0x3d9515(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 1], 12, 3905402710);
    _0x5ea675 = _0x3d9515(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 2], 17, 606105819);
    _0x4d6db4 = _0x3d9515(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 3], 22, 3250441966);
    _0x473be2 = _0x3d9515(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 4], 7, 4118548399);
    _0xbc31c1 = _0x3d9515(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 5], 12, 1200080426);
    _0x5ea675 = _0x3d9515(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 6], 17, 2821735955);
    _0x4d6db4 = _0x3d9515(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 7], 22, 4249261313);
    _0x473be2 = _0x3d9515(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 8], 7, 1770035416);
    _0xbc31c1 = _0x3d9515(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 9], 12, 2336552879);
    _0x5ea675 = _0x3d9515(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 10], 17, 4294925233);
    _0x4d6db4 = _0x3d9515(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 11], 22, 2304563134);
    _0x473be2 = _0x3d9515(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 12], 7, 1804603682);
    _0xbc31c1 = _0x3d9515(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 13], 12, 4254626195);
    _0x5ea675 = _0x3d9515(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 14], 17, 2792965006);
    _0x4d6db4 = _0x3d9515(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 15], 22, 1236535329);
    _0x473be2 = _0x4993a4(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 1], 5, 4129170786);
    _0xbc31c1 = _0x4993a4(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 6], 9, 3225465664);
    _0x5ea675 = _0x4993a4(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 11], 14, 643717713);
    _0x4d6db4 = _0x4993a4(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 0], 20, 3921069994);
    _0x473be2 = _0x4993a4(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 5], 5, 3593408605);
    _0xbc31c1 = _0x4993a4(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 10], 9, 38016083);
    _0x5ea675 = _0x4993a4(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 15], 14, 3634488961);
    _0x4d6db4 = _0x4993a4(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 4], 20, 3889429448);
    _0x473be2 = _0x4993a4(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 9], 5, 568446438);
    _0xbc31c1 = _0x4993a4(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 14], 9, 3275163606);
    _0x5ea675 = _0x4993a4(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 3], 14, 4107603335);
    _0x4d6db4 = _0x4993a4(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 8], 20, 1163531501);
    _0x473be2 = _0x4993a4(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 13], 5, 2850285829);
    _0xbc31c1 = _0x4993a4(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 2], 9, 4243563512);
    _0x5ea675 = _0x4993a4(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 7], 14, 1735328473);
    _0x4d6db4 = _0x4993a4(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 12], 20, 2368359562);
    _0x473be2 = _0x562322(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 5], 4, 4294588738);
    _0xbc31c1 = _0x562322(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 8], 11, 2272392833);
    _0x5ea675 = _0x562322(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 11], 16, 1839030562);
    _0x4d6db4 = _0x562322(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 14], 23, 4259657740);
    _0x473be2 = _0x562322(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 1], 4, 2763975236);
    _0xbc31c1 = _0x562322(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 4], 11, 1272893353);
    _0x5ea675 = _0x562322(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 7], 16, 4139469664);
    _0x4d6db4 = _0x562322(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 10], 23, 3200236656);
    _0x473be2 = _0x562322(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 13], 4, 681279174);
    _0xbc31c1 = _0x562322(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 0], 11, 3936430074);
    _0x5ea675 = _0x562322(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 3], 16, 3572445317);
    _0x4d6db4 = _0x562322(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 6], 23, 76029189);
    _0x473be2 = _0x562322(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 9], 4, 3654602809);
    _0xbc31c1 = _0x562322(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 12], 11, 3873151461);
    _0x5ea675 = _0x562322(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 15], 16, 530742520);
    _0x4d6db4 = _0x562322(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 2], 23, 3299628645);
    _0x473be2 = _0x4e2e2f(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 0], 6, 4096336452);
    _0xbc31c1 = _0x4e2e2f(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 7], 10, 1126891415);
    _0x5ea675 = _0x4e2e2f(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 14], 15, 2878612391);
    _0x4d6db4 = _0x4e2e2f(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 5], 21, 4237533241);
    _0x473be2 = _0x4e2e2f(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 12], 6, 1700485571);
    _0xbc31c1 = _0x4e2e2f(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 3], 10, 2399980690);
    _0x5ea675 = _0x4e2e2f(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 10], 15, 4293915773);
    _0x4d6db4 = _0x4e2e2f(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 1], 21, 2240044497);
    _0x473be2 = _0x4e2e2f(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 8], 6, 1873313359);
    _0xbc31c1 = _0x4e2e2f(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 15], 10, 4264355552);
    _0x5ea675 = _0x4e2e2f(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 6], 15, 2734768916);
    _0x4d6db4 = _0x4e2e2f(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 13], 21, 1309151649);
    _0x473be2 = _0x4e2e2f(_0x473be2, _0x4d6db4, _0x5ea675, _0xbc31c1, _0x20e036[_0x4960b3 + 4], 6, 4149444226);
    _0xbc31c1 = _0x4e2e2f(_0xbc31c1, _0x473be2, _0x4d6db4, _0x5ea675, _0x20e036[_0x4960b3 + 11], 10, 3174756917);
    _0x5ea675 = _0x4e2e2f(_0x5ea675, _0xbc31c1, _0x473be2, _0x4d6db4, _0x20e036[_0x4960b3 + 2], 15, 718787259);
    _0x4d6db4 = _0x4e2e2f(_0x4d6db4, _0x5ea675, _0xbc31c1, _0x473be2, _0x20e036[_0x4960b3 + 9], 21, 3951481745);
    _0x473be2 = _0x3b6afd(_0x473be2, _0x41cc9a);
    _0x4d6db4 = _0x3b6afd(_0x4d6db4, _0x46e858);
    _0x5ea675 = _0x3b6afd(_0x5ea675, _0x571b1e);
    _0xbc31c1 = _0x3b6afd(_0xbc31c1, _0x446d6b);
  }
  return (_0x591ac2(_0x473be2) + _0x591ac2(_0x4d6db4) + _0x591ac2(_0x5ea675) + _0x591ac2(_0xbc31c1)).toLowerCase();
}