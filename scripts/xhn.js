/*
@蛋炒饭
软件:新湖南
功能:完成日常任务，有红包，有兑换，自己找能外地发货的商品兑换。
变量名:xhnck
登陆之后设置登陆密作为变量，账号#密码，多账号&隔开
定时:一天一次即可
*/
NAME = "新湖南";
VALY = ["xhnck"];
LOGS = 0;
CK = "";
var userList = [];
var CryptoJS = require("crypto-js");
const axios = require("axios");
let request = require("request");
const JSEncrypt = require("node-jsencrypt");
class Bar {
  constructor(_0x8f1023) {
    this.i = _0x8f1023.split("#")[0];
    this.p = _0x8f1023.split("#")[1];
    this.log = true;
  }
  async login() {
    let _0x55ddb5 = {
      "XHN-Device-Type": "iphone",
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)"
    };
    let _0x1ef28e = "appid=9&logintype=1&password=" + this.p + "&type=1&username=" + this.i;
    let _0x329146 = await task("post", "https://cgi.voc.com.cn/app/mobile/bbsapi/wxhn_login.php", _0x55ddb5, _0x1ef28e);
    if (_0x329146.statecode == 1) {
      this.name = _0x329146.username;
      this.token = _0x329146.auth;
      console.log(this.i + " " + _0x329146.message);
      this.log = true;
    } else {
      this.log = false;
    }
  }
  async tasklist() {
    let _0x1b2788 = times(13);
    let _0x257bea = SHA1(_0x1b2788 + "200000hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz");
    let _0x28e980 = {
      nonce: "200000",
      time: "" + _0x1b2788,
      signature: "" + _0x257bea,
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)"
    };
    let _0x43b832 = await task("get", "https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/pointsData?appid=9&oauth_token=" + this.token, _0x28e980);
    if (_0x43b832.statecode == 1) {
      let _0x56eba0 = _0x43b832.data.pointsRuleBeanList[1].rewardCount;
      let _0x504b60 = _0x43b832.data.pointsRuleBeanList[1].recordCount;
      let _0x1029af = _0x43b832.data.pointsRuleBeanList[3].rewardCount;
      let _0x4ee7b0 = _0x43b832.data.pointsRuleBeanList[3].recordCount;
      let _0x246d76 = _0x43b832.data.pointsRuleBeanList[4].rewardCount;
      let _0x408b5d = _0x43b832.data.pointsRuleBeanList[4].recordCount;
      if (_0x43b832.data.pointsRuleBeanList[0].recordCount == 1) {
        console.log(this.name + " 签到任务已完成，请勿重复运行脚本");
      } else {
        await this.signin();
      }
      if (_0x43b832.data.pointsRuleBeanList[1].recordCount == 5) {
        console.log(this.name + " 阅读任务已完成，请勿重复运行脚本");
      } else {
        for (let _0xa3728a = _0x504b60; _0xa3728a < _0x56eba0; _0xa3728a++) {
          await this.read();
          await wait(10000);
        }
      }
      if (_0x43b832.data.pointsRuleBeanList[3].recordCount == 5) {
        console.log(this.name + " 点赞任务已完成，请勿重复运行脚本");
      } else {
        for (let _0x37bc48 = _0x4ee7b0; _0x37bc48 < _0x1029af; _0x37bc48++) {
          await this.like();
          await wait(10000);
        }
      }
      if (_0x43b832.data.pointsRuleBeanList[4].recordCount == 5) {
        console.log(this.name + " 分享任务已完成，请勿重复运行脚本");
      } else {
        for (let _0x52b461 = _0x408b5d; _0x52b461 < _0x246d76; _0x52b461++) {
          await this.share();
          await wait(10000);
        }
      }
    } else {
      console.log("未获取到任务列表，请重试");
    }
  }
  async signin() {
    let _0x2f79d0 = times(13);
    let _0x5264f6 = SHA1(_0x2f79d0 + "900000hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz");
    let _0xa5fd5e = {
      nonce: "900000",
      time: "" + _0x2f79d0,
      signature: "" + _0x5264f6,
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)"
    };
    let _0x26d6bf = "points_rule_id=8&appid=9&oauth_token=" + this.token;
    let _0x32c913 = await task("post", "https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/", _0xa5fd5e, _0x26d6bf);
    if (_0x32c913.statecode == 1) {
      console.log(this.name + " " + _0x32c913.data.successNote);
    } else {
      console.log("签到已完成，请勿重复运行");
    }
  }
  async read() {
    let _0x5f26ec = times(13);
    let _0x210dc2 = SJS(6);
    let _0x3e8ff0 = SHA1("" + _0x5f26ec + _0x210dc2 + "hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz");
    let _0x57ca6 = {
      nonce: "" + _0x210dc2,
      time: "" + _0x5f26ec,
      signature: "" + _0x3e8ff0,
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)",
      Connection: "keep-alive"
    };
    let _0x32943d = "appid=9&oauth_token=" + this.token + "&points_rule_id=2";
    let _0x45fc06 = await task("post", "https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/", _0x57ca6, _0x32943d);
    if (_0x45fc06.statecode == 1) {
      console.log(this.name + " " + _0x45fc06.data.successNote);
    } else {
      console.log("阅读任务 " + _0x45fc06.message);
    }
  }
  async like() {
    let _0x7990 = times(13);
    let _0x3244bb = SJS(6);
    let _0x16c5d9 = SHA1("" + _0x7990 + _0x3244bb + "hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz");
    let _0x3a7ebb = {
      nonce: "" + _0x3244bb,
      time: "" + _0x7990,
      signature: "" + _0x16c5d9,
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)",
      Connection: "keep-alive"
    };
    let _0x38e22d = "appid=9&oauth_token=" + this.token + "&points_rule_id=4";
    let _0x2b5d74 = await task("post", "https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/", _0x3a7ebb, _0x38e22d);
    if (_0x2b5d74.statecode == 1) {
      console.log(this.name + " " + _0x2b5d74.data.successNote);
    } else {
      console.log("点赞任务 " + _0x2b5d74.message);
    }
  }
  async share() {
    let _0x26cce4 = times(13);
    let _0x476f7f = SJS(6);
    let _0x365388 = SHA1("" + _0x26cce4 + _0x476f7f + "hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz");
    let _0x2127e1 = {
      nonce: "" + _0x476f7f,
      time: "" + _0x26cce4,
      signature: "" + _0x365388,
      "User-Agent": "NewHuNan/9.2.7 (iPhone; iOS 16.1; Scale/3.00)",
      Connection: "keep-alive"
    };
    let _0x520356 = "appid=9&oauth_token=" + this.token + "&points_rule_id=5";
    let _0x2c6e76 = await task("post", "https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/", _0x2127e1, _0x520356);
    if (_0x2c6e76.statecode == 1) {
      console.log(this.name + " " + _0x2c6e76.data.successNote);
    } else {
      console.log("分享任务 " + _0x2c6e76.message);
    }
  }
}
(async () => {
  console.log(NAME);
  checkEnv();
  for (let _0x52e307 of userList) {
    await _0x52e307.login();
  }
  let _0x177e24 = userList.filter(_0x36e2cf => _0x36e2cf.log == true);
  if (_0x177e24.length == 0) {
    console.log(NAME + " 用户名或密码错误，请认真检查！！！");
    return;
  }
  for (let _0x4f39d1 of _0x177e24) {
    await _0x4f39d1.tasklist();
  }
})().catch(_0x572db9 => {
  console.log(_0x572db9);
}).finally(() => {});
function RT(_0x313778, _0x605e52) {
  return Math.round(Math.random() * (_0x605e52 - _0x313778) + _0x313778);
}
function times(_0x5b24d3) {
  if (_0x5b24d3 == 10) {
    let _0x55f805 = Math.round(new Date().getTime() / 1000).toString();
    return _0x55f805;
  } else {
    let _0x1cc267 = new Date().getTime();
    return _0x1cc267;
  }
}
async function task(_0x2bf87e, _0x618b19, _0x379bfc, _0x3809aa) {
  if (_0x2bf87e == "delete") {
    _0x2bf87e = _0x2bf87e.toUpperCase();
  } else {
    _0x2bf87e = _0x2bf87e;
  }
  const _0x16b28b = require("request");
  if (_0x2bf87e == "post") {
    delete _0x379bfc["content-type"];
    delete _0x379bfc["Content-type"];
    delete _0x379bfc["content-Type"];
    if (safeGet(_0x3809aa)) {
      _0x379bfc["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x379bfc["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0x3809aa) {
      _0x379bfc["Content-Length"] = lengthInUtf8Bytes(_0x3809aa);
    }
  }
  _0x379bfc.Host = _0x618b19.replace("//", "/").split("/")[1];
  if (_0x2bf87e.indexOf("T") < 0) {
    var _0x2426ff = {
      url: _0x618b19,
      headers: _0x379bfc,
      body: _0x3809aa
    };
  } else {
    var _0x2426ff = {
      url: _0x618b19,
      headers: _0x379bfc,
      form: JSON.parse(_0x3809aa)
    };
  }
  return new Promise(async _0x3386ef => {
    _0x16b28b[_0x2bf87e.toLowerCase()](_0x2426ff, (_0x1e68ba, _0x333c49, _0x2b2eb3) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0x2426ff);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x2b2eb3));
        }
      } catch (_0x495428) {} finally {
        if (!_0x1e68ba) {
          if (safeGet(_0x2b2eb3)) {
            _0x2b2eb3 = JSON.parse(_0x2b2eb3);
          } else {
            _0x2b2eb3 = _0x2b2eb3;
          }
        } else {
          _0x2b2eb3 = _0x618b19 + "   API请求失败，请检查网络重试\n" + _0x1e68ba;
        }
        return _0x3386ef(_0x2b2eb3);
      }
    });
  });
}
function SJS(_0x13f184) {
  _0x13f184 = _0x13f184 || 32;
  var _0x266cc4 = "1234567890";
  var _0x766e48 = _0x266cc4.length;
  var _0x3ed4f7 = "";
  for (i = 0; i < _0x13f184; i++) {
    _0x3ed4f7 += _0x266cc4.charAt(Math.floor(Math.random() * _0x766e48));
  }
  return _0x3ed4f7;
}
function SJSxx(_0x652816) {
  _0x652816 = _0x652816 || 32;
  var _0x19954e = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0x46b6ee = _0x19954e.length;
  var _0x57e74e = "";
  for (i = 0; i < _0x652816; i++) {
    _0x57e74e += _0x19954e.charAt(Math.floor(Math.random() * _0x46b6ee));
  }
  return _0x57e74e;
}
function safeGet(_0x48ab0b) {
  try {
    if (typeof JSON.parse(_0x48ab0b) == "object") {
      return true;
    }
  } catch (_0x32c094) {
    return false;
  }
}
function lengthInUtf8Bytes(_0x131b56) {
  let _0xfb0b55 = encodeURIComponent(_0x131b56).match(/%[89ABab]/g);
  return _0x131b56.length + (_0xfb0b55 ? _0xfb0b55.length : 0);
}
async function checkEnv() {
  let _0x32a257 = process.env[VALY] || CK;
  let _0x14721e = 0;
  if (_0x32a257) {
    for (let _0x2d4da7 of _0x32a257.split("&").filter(_0x5dec1f => !!_0x5dec1f)) {
      userList.push(new Bar(_0x2d4da7));
    }
    _0x14721e = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x14721e + "个账号");
  return userList;
}
function wait(_0x184b3e) {
  return new Promise(_0x18435d => setTimeout(_0x18435d, _0x184b3e));
}
function stringToBase64(_0x448aba) {
  var _0x2416ec = Buffer.from(_0x448aba).toString("base64");
  return _0x2416ec;
}
function EncryptCrypto(_0x39ee5a, _0x25e053, _0x4a0841, _0x351bf7, _0xe4181d, _0xacd65e) {
  const _0x40f60d = require("crypto-js");
  const _0x113611 = _0x40f60d.enc.Utf8.parse(_0x351bf7);
  const _0x5271b2 = _0x40f60d.enc.Utf8.parse(_0xacd65e);
  const _0x604ad5 = _0x40f60d.enc.Utf8.parse(_0xe4181d);
  const _0x2faf8e = _0x40f60d[_0x39ee5a].encrypt(_0x113611, _0x604ad5, {
    iv: _0x5271b2,
    mode: _0x40f60d.mode[_0x25e053],
    padding: _0x40f60d.pad[_0x4a0841]
  });
  return _0x2faf8e.toString();
}
function DecryptCrypto(_0x579d35, _0x4ff3b1, _0x19b6a2, _0x2941d2, _0x576ca9, _0x5baf20) {
  const _0x6cd84e = require("crypto-js");
  const _0x169861 = _0x6cd84e.enc.Utf8.parse(_0x5baf20);
  const _0x5d5db3 = _0x6cd84e.enc.Utf8.parse(_0x576ca9);
  const _0x2fbf5d = _0x6cd84e[_0x579d35].decrypt(_0x2941d2, _0x5d5db3, {
    iv: _0x169861,
    mode: _0x6cd84e.mode[_0x4ff3b1],
    padding: _0x6cd84e.pad[_0x19b6a2]
  });
  return _0x2fbf5d.toString(_0x6cd84e.enc.Utf8);
}
function RSA(_0x414c7f, _0x3f81d6) {
  const _0x4d8a4b = require("node-rsa");
  let _0x418c36 = new _0x4d8a4b("-----BEGIN PUBLIC KEY-----\n" + _0x3f81d6 + "\n-----END PUBLIC KEY-----");
  _0x418c36.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x418c36.encrypt(_0x414c7f, "base64", "utf8");
}
function SHA1(_0x7a1fbb) {
  return CryptoJS.SHA1(_0x7a1fbb).toString();
}
function SHA256(_0x337be5) {
  const _0xcbe1c7 = 8;
  const _0x36fdae = 0;
  function _0x4decad(_0xdec0e5, _0x87ca7a) {
    const _0x1b003d = (_0xdec0e5 & 65535) + (_0x87ca7a & 65535);
    return (_0xdec0e5 >> 16) + (_0x87ca7a >> 16) + (_0x1b003d >> 16) << 16 | _0x1b003d & 65535;
  }
  function _0x431e9e(_0x576b15, _0x3623b7) {
    return _0x576b15 >>> _0x3623b7 | _0x576b15 << 32 - _0x3623b7;
  }
  function _0x150bdd(_0x21f47b, _0x54d59f) {
    return _0x21f47b >>> _0x54d59f;
  }
  function _0x4a079f(_0x57248c, _0x2787a6, _0x312789) {
    return _0x57248c & _0x2787a6 ^ ~_0x57248c & _0x312789;
  }
  function _0x8dee6d(_0x1b6cee, _0x2dea88, _0x36c12f) {
    return _0x1b6cee & _0x2dea88 ^ _0x1b6cee & _0x36c12f ^ _0x2dea88 & _0x36c12f;
  }
  function _0x83a4e(_0x50b348) {
    return _0x431e9e(_0x50b348, 2) ^ _0x431e9e(_0x50b348, 13) ^ _0x431e9e(_0x50b348, 22);
  }
  function _0x4430ed(_0x179896) {
    return _0x431e9e(_0x179896, 6) ^ _0x431e9e(_0x179896, 11) ^ _0x431e9e(_0x179896, 25);
  }
  function _0x1c5605(_0xa81bec) {
    return _0x431e9e(_0xa81bec, 7) ^ _0x431e9e(_0xa81bec, 18) ^ _0x150bdd(_0xa81bec, 3);
  }
  return function (_0x2c1964) {
    const _0x1eefd9 = _0x36fdae ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x197f2b = "";
    for (let _0x5e014e = 0; _0x5e014e < _0x2c1964.length * 4; _0x5e014e++) {
      _0x197f2b += _0x1eefd9.charAt(_0x2c1964[_0x5e014e >> 2] >> (3 - _0x5e014e % 4) * 8 + 4 & 15) + _0x1eefd9.charAt(_0x2c1964[_0x5e014e >> 2] >> (3 - _0x5e014e % 4) * 8 & 15);
    }
    return _0x197f2b;
  }(function (_0xd68309, _0x35fd5b) {
    const _0x100333 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x2eefea = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x5b0a3f = new Array(64);
    let _0x4c0c61;
    let _0x18b762;
    let _0x1d8183;
    let _0x11ee4f;
    let _0x44d1dc;
    let _0x79101e;
    let _0x4edad6;
    let _0x4fdfb0;
    let _0x31944b;
    let _0x3a7cef;
    let _0x47107e;
    let _0x4997d0;
    _0xd68309[_0x35fd5b >> 5] |= 128 << 24 - _0x35fd5b % 32;
    _0xd68309[15 + (_0x35fd5b + 64 >> 9 << 4)] = _0x35fd5b;
    _0x31944b = 0;
    for (; _0x31944b < _0xd68309.length; _0x31944b += 16) {
      _0x4c0c61 = _0x2eefea[0];
      _0x18b762 = _0x2eefea[1];
      _0x1d8183 = _0x2eefea[2];
      _0x11ee4f = _0x2eefea[3];
      _0x44d1dc = _0x2eefea[4];
      _0x79101e = _0x2eefea[5];
      _0x4edad6 = _0x2eefea[6];
      _0x4fdfb0 = _0x2eefea[7];
      _0x3a7cef = 0;
      for (; _0x3a7cef < 64; _0x3a7cef++) {
        _0x5b0a3f[_0x3a7cef] = _0x3a7cef < 16 ? _0xd68309[_0x3a7cef + _0x31944b] : _0x4decad(_0x4decad(_0x4decad(_0x431e9e(_0x4aeb4f = _0x5b0a3f[_0x3a7cef - 2], 17) ^ _0x431e9e(_0x4aeb4f, 19) ^ _0x150bdd(_0x4aeb4f, 10), _0x5b0a3f[_0x3a7cef - 7]), _0x1c5605(_0x5b0a3f[_0x3a7cef - 15])), _0x5b0a3f[_0x3a7cef - 16]);
        _0x47107e = _0x4decad(_0x4decad(_0x4decad(_0x4decad(_0x4fdfb0, _0x4430ed(_0x44d1dc)), _0x4a079f(_0x44d1dc, _0x79101e, _0x4edad6)), _0x100333[_0x3a7cef]), _0x5b0a3f[_0x3a7cef]);
        _0x4997d0 = _0x4decad(_0x83a4e(_0x4c0c61), _0x8dee6d(_0x4c0c61, _0x18b762, _0x1d8183));
        _0x4fdfb0 = _0x4edad6;
        _0x4edad6 = _0x79101e;
        _0x79101e = _0x44d1dc;
        _0x44d1dc = _0x4decad(_0x11ee4f, _0x47107e);
        _0x11ee4f = _0x1d8183;
        _0x1d8183 = _0x18b762;
        _0x18b762 = _0x4c0c61;
        _0x4c0c61 = _0x4decad(_0x47107e, _0x4997d0);
      }
      _0x2eefea[0] = _0x4decad(_0x4c0c61, _0x2eefea[0]);
      _0x2eefea[1] = _0x4decad(_0x18b762, _0x2eefea[1]);
      _0x2eefea[2] = _0x4decad(_0x1d8183, _0x2eefea[2]);
      _0x2eefea[3] = _0x4decad(_0x11ee4f, _0x2eefea[3]);
      _0x2eefea[4] = _0x4decad(_0x44d1dc, _0x2eefea[4]);
      _0x2eefea[5] = _0x4decad(_0x79101e, _0x2eefea[5]);
      _0x2eefea[6] = _0x4decad(_0x4edad6, _0x2eefea[6]);
      _0x2eefea[7] = _0x4decad(_0x4fdfb0, _0x2eefea[7]);
    }
    var _0x4aeb4f;
    return _0x2eefea;
  }(function (_0x55c12c) {
    const _0x2871a9 = [];
    const _0x1a83a1 = (1 << _0xcbe1c7) - 1;
    for (let _0x504b27 = 0; _0x504b27 < _0x55c12c.length * _0xcbe1c7; _0x504b27 += _0xcbe1c7) {
      _0x2871a9[_0x504b27 >> 5] |= (_0x55c12c.charCodeAt(_0x504b27 / _0xcbe1c7) & _0x1a83a1) << 24 - _0x504b27 % 32;
    }
    return _0x2871a9;
  }(_0x337be5 = function (_0x59870f) {
    _0x59870f = _0x59870f.replace(/\r\n/g, "\n");
    let _0x9106b5 = "";
    for (let _0x4888a0 = 0; _0x4888a0 < _0x59870f.length; _0x4888a0++) {
      const _0x2f2570 = _0x59870f.charCodeAt(_0x4888a0);
      if (_0x2f2570 < 128) {
        _0x9106b5 += String.fromCharCode(_0x2f2570);
      } else if (_0x2f2570 > 127 && _0x2f2570 < 2048) {
        _0x9106b5 += String.fromCharCode(_0x2f2570 >> 6 | 192);
        _0x9106b5 += String.fromCharCode(_0x2f2570 & 63 | 128);
      } else {
        _0x9106b5 += String.fromCharCode(_0x2f2570 >> 12 | 224);
        _0x9106b5 += String.fromCharCode(_0x2f2570 >> 6 & 63 | 128);
        _0x9106b5 += String.fromCharCode(_0x2f2570 & 63 | 128);
      }
    }
    return _0x9106b5;
  }(_0x337be5)), _0x337be5.length * _0xcbe1c7));
}
function MD5Encrypt(_0x317c75) {
  function _0x22dd8c(_0x3171e7, _0x45f8f6) {
    return _0x3171e7 << _0x45f8f6 | _0x3171e7 >>> 32 - _0x45f8f6;
  }
  function _0x4d4936(_0x3391ed, _0xe3d1d5) {
    var _0x34016e;
    var _0x214375;
    var _0x2754ad;
    var _0x101c89;
    var _0x110198;
    _0x2754ad = _0x3391ed & 2147483648;
    _0x101c89 = _0xe3d1d5 & 2147483648;
    _0x34016e = _0x3391ed & 1073741824;
    _0x214375 = _0xe3d1d5 & 1073741824;
    _0x110198 = (_0x3391ed & 1073741823) + (_0xe3d1d5 & 1073741823);
    if (_0x34016e & _0x214375) {
      return _0x110198 ^ 2147483648 ^ _0x2754ad ^ _0x101c89;
    } else if (_0x34016e | _0x214375) {
      if (_0x110198 & 1073741824) {
        return _0x110198 ^ 3221225472 ^ _0x2754ad ^ _0x101c89;
      } else {
        return _0x110198 ^ 1073741824 ^ _0x2754ad ^ _0x101c89;
      }
    } else {
      return _0x110198 ^ _0x2754ad ^ _0x101c89;
    }
  }
  function _0xf042e6(_0x20e7e9, _0x3763c0, _0x3fc818, _0x1dddab, _0x2c90bf, _0x4178b5, _0x35d583) {
    var _0x3e0e71;
    var _0x371e59;
    _0x20e7e9 = _0x4d4936(_0x20e7e9, _0x4d4936(_0x4d4936((_0x3e0e71 = _0x3763c0) & (_0x371e59 = _0x3fc818) | ~_0x3e0e71 & _0x1dddab, _0x2c90bf), _0x35d583));
    return _0x4d4936(_0x22dd8c(_0x20e7e9, _0x4178b5), _0x3763c0);
  }
  function _0x21b8c2(_0x1b5692, _0x5300c3, _0x4268f6, _0x7ae7d4, _0xcdbbd5, _0x489669, _0x40a6ec) {
    var _0x13e217;
    var _0x264838;
    var _0x4e2f70;
    _0x1b5692 = _0x4d4936(_0x1b5692, _0x4d4936(_0x4d4936((_0x13e217 = _0x5300c3, _0x264838 = _0x4268f6, _0x13e217 & (_0x4e2f70 = _0x7ae7d4) | _0x264838 & ~_0x4e2f70), _0xcdbbd5), _0x40a6ec));
    return _0x4d4936(_0x22dd8c(_0x1b5692, _0x489669), _0x5300c3);
  }
  function _0x570360(_0x13262e, _0x2e2841, _0x56a657, _0x3c7cce, _0x38dc0b, _0x148a31, _0x2d6aec) {
    var _0x52f970;
    var _0x2c4048;
    _0x13262e = _0x4d4936(_0x13262e, _0x4d4936(_0x4d4936((_0x52f970 = _0x2e2841) ^ (_0x2c4048 = _0x56a657) ^ _0x3c7cce, _0x38dc0b), _0x2d6aec));
    return _0x4d4936(_0x22dd8c(_0x13262e, _0x148a31), _0x2e2841);
  }
  function _0x4120b2(_0x30b112, _0x2ad1ac, _0x8f4722, _0x38475d, _0x2b8585, _0x5a8614, _0x44f9b8) {
    var _0x50cb11;
    var _0x2fbc2d;
    _0x30b112 = _0x4d4936(_0x30b112, _0x4d4936(_0x4d4936((_0x50cb11 = _0x2ad1ac, (_0x2fbc2d = _0x8f4722) ^ (_0x50cb11 | ~_0x38475d)), _0x2b8585), _0x44f9b8));
    return _0x4d4936(_0x22dd8c(_0x30b112, _0x5a8614), _0x2ad1ac);
  }
  function _0x1b3ad2(_0x3cc2c9) {
    var _0x2e3017;
    var _0x1a73cf = "";
    var _0xdff479 = "";
    for (_0x2e3017 = 0; _0x2e3017 <= 3; _0x2e3017++) {
      _0x1a73cf += (_0xdff479 = "0" + (_0x3cc2c9 >>> _0x2e3017 * 8 & 255).toString(16)).substr(_0xdff479.length - 2, 2);
    }
    return _0x1a73cf;
  }
  var _0x1e42b6;
  var _0x50020e;
  var _0x44b801;
  var _0x5e2243;
  var _0x1a3cea;
  var _0x505bc5;
  var _0x4161b0;
  var _0x503da1;
  var _0x1ee4dc;
  var _0x2e79e9 = [];
  _0x2e79e9 = function (_0x440b1e) {
    for (var _0x468f0b, _0x569a97 = _0x440b1e.length, _0x5ebec4 = _0x569a97 + 8, _0x3a94f0 = ((_0x5ebec4 - _0x5ebec4 % 64) / 64 + 1) * 16, _0x28cab3 = Array(_0x3a94f0 - 1), _0x2a4e70 = 0, _0x315bc9 = 0; _0x569a97 > _0x315bc9;) {
      _0x468f0b = (_0x315bc9 - _0x315bc9 % 4) / 4;
      _0x2a4e70 = _0x315bc9 % 4 * 8;
      _0x28cab3[_0x468f0b] = _0x28cab3[_0x468f0b] | _0x440b1e.charCodeAt(_0x315bc9) << _0x2a4e70;
      _0x315bc9++;
    }
    _0x468f0b = (_0x315bc9 - _0x315bc9 % 4) / 4;
    _0x2a4e70 = _0x315bc9 % 4 * 8;
    _0x28cab3[_0x468f0b] = _0x28cab3[_0x468f0b] | 128 << _0x2a4e70;
    _0x28cab3[_0x3a94f0 - 2] = _0x569a97 << 3;
    _0x28cab3[_0x3a94f0 - 1] = _0x569a97 >>> 29;
    return _0x28cab3;
  }(_0x317c75 = function (_0x2c1fd1) {
    _0x2c1fd1 = _0x2c1fd1.replace(/\r\n/g, "\n");
    for (var _0x44c0b7 = "", _0x5c4ed5 = 0; _0x5c4ed5 < _0x2c1fd1.length; _0x5c4ed5++) {
      var _0x4b56b7 = _0x2c1fd1.charCodeAt(_0x5c4ed5);
      if (_0x4b56b7 < 128) {
        _0x44c0b7 += String.fromCharCode(_0x4b56b7);
      } else if (_0x4b56b7 > 127 && _0x4b56b7 < 2048) {
        _0x44c0b7 += String.fromCharCode(_0x4b56b7 >> 6 | 192);
        _0x44c0b7 += String.fromCharCode(_0x4b56b7 & 63 | 128);
      } else {
        _0x44c0b7 += String.fromCharCode(_0x4b56b7 >> 12 | 224);
        _0x44c0b7 += String.fromCharCode(_0x4b56b7 >> 6 & 63 | 128);
        _0x44c0b7 += String.fromCharCode(_0x4b56b7 & 63 | 128);
      }
    }
    return _0x44c0b7;
  }(_0x317c75));
  _0x505bc5 = 1732584193;
  _0x4161b0 = 4023233417;
  _0x503da1 = 2562383102;
  _0x1ee4dc = 271733878;
  _0x1e42b6 = 0;
  for (; _0x1e42b6 < _0x2e79e9.length; _0x1e42b6 += 16) {
    _0x50020e = _0x505bc5;
    _0x44b801 = _0x4161b0;
    _0x5e2243 = _0x503da1;
    _0x1a3cea = _0x1ee4dc;
    _0x505bc5 = _0xf042e6(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 0], 7, 3614090360);
    _0x1ee4dc = _0xf042e6(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 1], 12, 3905402710);
    _0x503da1 = _0xf042e6(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 2], 17, 606105819);
    _0x4161b0 = _0xf042e6(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 3], 22, 3250441966);
    _0x505bc5 = _0xf042e6(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 4], 7, 4118548399);
    _0x1ee4dc = _0xf042e6(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 5], 12, 1200080426);
    _0x503da1 = _0xf042e6(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 6], 17, 2821735955);
    _0x4161b0 = _0xf042e6(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 7], 22, 4249261313);
    _0x505bc5 = _0xf042e6(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 8], 7, 1770035416);
    _0x1ee4dc = _0xf042e6(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 9], 12, 2336552879);
    _0x503da1 = _0xf042e6(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 10], 17, 4294925233);
    _0x4161b0 = _0xf042e6(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 11], 22, 2304563134);
    _0x505bc5 = _0xf042e6(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 12], 7, 1804603682);
    _0x1ee4dc = _0xf042e6(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 13], 12, 4254626195);
    _0x503da1 = _0xf042e6(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 14], 17, 2792965006);
    _0x4161b0 = _0xf042e6(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 15], 22, 1236535329);
    _0x505bc5 = _0x21b8c2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 1], 5, 4129170786);
    _0x1ee4dc = _0x21b8c2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 6], 9, 3225465664);
    _0x503da1 = _0x21b8c2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 11], 14, 643717713);
    _0x4161b0 = _0x21b8c2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 0], 20, 3921069994);
    _0x505bc5 = _0x21b8c2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 5], 5, 3593408605);
    _0x1ee4dc = _0x21b8c2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 10], 9, 38016083);
    _0x503da1 = _0x21b8c2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 15], 14, 3634488961);
    _0x4161b0 = _0x21b8c2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 4], 20, 3889429448);
    _0x505bc5 = _0x21b8c2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 9], 5, 568446438);
    _0x1ee4dc = _0x21b8c2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 14], 9, 3275163606);
    _0x503da1 = _0x21b8c2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 3], 14, 4107603335);
    _0x4161b0 = _0x21b8c2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 8], 20, 1163531501);
    _0x505bc5 = _0x21b8c2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 13], 5, 2850285829);
    _0x1ee4dc = _0x21b8c2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 2], 9, 4243563512);
    _0x503da1 = _0x21b8c2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 7], 14, 1735328473);
    _0x4161b0 = _0x21b8c2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 12], 20, 2368359562);
    _0x505bc5 = _0x570360(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 5], 4, 4294588738);
    _0x1ee4dc = _0x570360(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 8], 11, 2272392833);
    _0x503da1 = _0x570360(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 11], 16, 1839030562);
    _0x4161b0 = _0x570360(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 14], 23, 4259657740);
    _0x505bc5 = _0x570360(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 1], 4, 2763975236);
    _0x1ee4dc = _0x570360(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 4], 11, 1272893353);
    _0x503da1 = _0x570360(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 7], 16, 4139469664);
    _0x4161b0 = _0x570360(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 10], 23, 3200236656);
    _0x505bc5 = _0x570360(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 13], 4, 681279174);
    _0x1ee4dc = _0x570360(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 0], 11, 3936430074);
    _0x503da1 = _0x570360(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 3], 16, 3572445317);
    _0x4161b0 = _0x570360(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 6], 23, 76029189);
    _0x505bc5 = _0x570360(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 9], 4, 3654602809);
    _0x1ee4dc = _0x570360(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 12], 11, 3873151461);
    _0x503da1 = _0x570360(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 15], 16, 530742520);
    _0x4161b0 = _0x570360(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 2], 23, 3299628645);
    _0x505bc5 = _0x4120b2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 0], 6, 4096336452);
    _0x1ee4dc = _0x4120b2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 7], 10, 1126891415);
    _0x503da1 = _0x4120b2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 14], 15, 2878612391);
    _0x4161b0 = _0x4120b2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 5], 21, 4237533241);
    _0x505bc5 = _0x4120b2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 12], 6, 1700485571);
    _0x1ee4dc = _0x4120b2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 3], 10, 2399980690);
    _0x503da1 = _0x4120b2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 10], 15, 4293915773);
    _0x4161b0 = _0x4120b2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 1], 21, 2240044497);
    _0x505bc5 = _0x4120b2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 8], 6, 1873313359);
    _0x1ee4dc = _0x4120b2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 15], 10, 4264355552);
    _0x503da1 = _0x4120b2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 6], 15, 2734768916);
    _0x4161b0 = _0x4120b2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 13], 21, 1309151649);
    _0x505bc5 = _0x4120b2(_0x505bc5, _0x4161b0, _0x503da1, _0x1ee4dc, _0x2e79e9[_0x1e42b6 + 4], 6, 4149444226);
    _0x1ee4dc = _0x4120b2(_0x1ee4dc, _0x505bc5, _0x4161b0, _0x503da1, _0x2e79e9[_0x1e42b6 + 11], 10, 3174756917);
    _0x503da1 = _0x4120b2(_0x503da1, _0x1ee4dc, _0x505bc5, _0x4161b0, _0x2e79e9[_0x1e42b6 + 2], 15, 718787259);
    _0x4161b0 = _0x4120b2(_0x4161b0, _0x503da1, _0x1ee4dc, _0x505bc5, _0x2e79e9[_0x1e42b6 + 9], 21, 3951481745);
    _0x505bc5 = _0x4d4936(_0x505bc5, _0x50020e);
    _0x4161b0 = _0x4d4936(_0x4161b0, _0x44b801);
    _0x503da1 = _0x4d4936(_0x503da1, _0x5e2243);
    _0x1ee4dc = _0x4d4936(_0x1ee4dc, _0x1a3cea);
  }
  return (_0x1b3ad2(_0x505bc5) + _0x1b3ad2(_0x4161b0) + _0x1b3ad2(_0x503da1) + _0x1b3ad2(_0x1ee4dc)).toLowerCase();
}