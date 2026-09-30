/*
@蛋炒饭
软件名:无限玉环
完成每日任务，一天50积分左右，可以兑换实物或者各种视频会员
变量名:wxyhck
手机号注册登录软件后，抓包http://appapi.chinamcloud.com/api/开头的，找到user_id#token作为变量，多账号用@隔开
定时:一天一次
我的邀请码:2a53fb 欢迎大家填写！！
*/
NAME = "无限玉环";
VALY = ["wxyhck"];
LOGS = 0;
CK = "";
var userList = [];
class Bar {
  constructor(_0x4c842f) {
    this.uid = _0x4c842f.split("#")[0];
    this.token = _0x4c842f.split("#")[1];
    this.logs = true;
  }
  async getusername() {
    let _0x4546e5 = MD5Encrypt("api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033platformappfactory_mobilesystem_name2tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
    let _0x32944a = MD5Encrypt("api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033tenantidyhdsttest1");
    let _0x40b1a7 = "token=" + this.token + "&user_id=" + this.uid + "&platform=appfactory_mobile&system_name=2&tenantid=yhdst&api_version=3.6.1&app_version=3.1.61&client=android&cms_app_id=1033&app_id=1&sign=" + _0x4546e5;
    let _0x2bb36b = await task("post", "http://appapi.chinamcloud.com/api/renovation-login?tenantid=yhdst&api_version=3.6.1&app_version=3.1.61&client=android&cms_app_id=1033&app_id=1&sign=" + _0x32944a, {}, _0x40b1a7);
    if (_0x2bb36b.message == "this is a success message!") {
      this.username = _0x2bb36b.data.meta.username;
      this.name = _0x2bb36b.data.meta.nickname;
      console.log("【" + this.name + "】==>现有积分" + _0x2bb36b.data.meta.redites);
      this.logs = true;
    } else {
      this.logs = false;
    }
  }
  async tasklist() {
    let _0x539f72 = MD5Encrypt("api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033integral_type1tenantidyhdsttoken" + this.token + "user_id" + this.uid + "username" + this.username + "test1");
    let _0x5b89d2 = await task("get", "http://appapi.chinamcloud.com/api/integral/task?app_version=3.1.61&user_id=" + this.uid + "&integral_type=1&tenantid=yhdst&sign=" + _0x539f72 + "&client=android&cms_app_id=1033&api_version=3.6.1&app_id=1&token=" + this.token + "&username=" + this.username, {});
    if (_0x5b89d2.state == true) {
      for (let _0x3d18cf of _0x5b89d2.data) {
        if (_0x3d18cf.name == "每日签到" && _0x3d18cf.status == 0) {
          await this.signin();
        } else if (_0x3d18cf.name == "阅读新闻" && _0x3d18cf.todayIntegral < 10) {
          await this.read();
        } else if (_0x3d18cf.name == "新闻点赞" && _0x3d18cf.todayIntegral < 5) {
          await this.like();
        } else if (_0x3d18cf.name == "社交分享" && _0x3d18cf.todayIntegral < 5) {
          await this.share();
        } else if (_0x3d18cf.name == "评论新闻" && _0x3d18cf.todayIntegral < 5) {
          await this.comment();
        }
      }
    } else {
      console.log("【" + this.name + "】任务列表获取失败，请重试");
    }
  }
  async invite() {
    let _0x4e9c1a = MD5Encrypt("api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033invitation_code2a53fbtenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
    let _0x569909 = "invitation_code=2a53fb&app_version=3.1.61&user_id=" + this.uid + "&tenantid=yhdst&sign=" + _0x4e9c1a + "&client=android&cms_app_id=1033&api_version=3.6.1&app_id=1&token=" + this.token;
    let _0x77e619 = await task("post", "http://appapi.chinamcloud.com/api/member/invitation-code", {}, _0x569909);
  }
  async signin() {
    let _0x17026a = MD5Encrypt("action1api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033integral_type1tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
    let _0x3b27cc = "app_version=3.1.61&user_id=" + this.uid + "&integral_type=1&tenantid=yhdst&sign=" + _0x17026a + "&action=1&client=android&cms_app_id=1033&api_version=3.6.1&app_id=1&token=" + this.token;
    let _0x519e1a = await task("post", "http://appapi.chinamcloud.com/api/integral/sign", {}, _0x3b27cc);
    console.log("【" + this.name + "】 " + _0x519e1a.data.description);
  }
  async readlist() {
    let _0x46c10e = RT(1, 1200);
    let _0xe4ab27 = MD5Encrypt("api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033page" + _0x46c10e + "perPage10tenantidyhdsttest1");
    let _0x4d4b36 = await task("get", "http://appapi.chinamcloud.com/api/content/list/350?perPage=10&app_version=3.1.61&tenantid=yhdst&sign=" + _0xe4ab27 + "&client=android&cms_app_id=1033&page=" + _0x46c10e + "&api_version=3.6.1&app_id=1", {});
    this.a = _0x4d4b36.data.meta;
  }
  async read() {
    for (let _0x4890dd of this.a) {
      let _0x61ccf3 = _0x4890dd.id;
      let _0x47d7a2 = MD5Encrypt("action2api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033isStudyContent0source_id" + _0x61ccf3 + "tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
      let _0x51bbba = "app_version=3.1.61&sign=" + _0x47d7a2 + "&cms_app_id=1033&api_version=3.6.1&isStudyContent=0&token=" + this.token + "&user_id=" + this.uid + "&tenantid=yhdst&action=2&client=android&source_id=" + _0x61ccf3 + "&app_id=1";
      let _0x7d6954 = await task("post", "http://appapi.chinamcloud.com/api/integral/add-integral", {}, _0x51bbba);
      if (_0x7d6954.state = false) {
        console.log("【" + this.name + "】 " + _0x7d6954.error.description);
        break;
      } else {
        console.log("【" + this.name + "】 阅读成功");
        await wait(RT(10000, 15000));
      }
    }
  }
  async like() {
    for (let _0x13e8ca of this.a) {
      let _0x4265ff = _0x13e8ca.id;
      let _0x31cdce = MD5Encrypt("action16api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033isStudyContent0source_id" + _0x4265ff + "tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
      let _0x16e5e0 = "app_version=3.1.61&sign=" + _0x31cdce + "&cms_app_id=1033&api_version=3.6.1&isStudyContent=0&token=" + this.token + "&user_id=" + this.uid + "&tenantid=yhdst&action=16&client=android&source_id=" + _0x4265ff + "&app_id=1";
      let _0x21f6be = await task("post", "http://appapi.chinamcloud.com/api/integral/add-integral", {}, _0x16e5e0);
      if (_0x21f6be.state = false) {
        console.log("【" + this.name + "】 " + _0x21f6be.error.description);
        break;
      } else {
        console.log("【" + this.name + "】 点赞成功");
        await wait(RT(10000, 15000));
      }
    }
  }
  async share() {
    for (let _0x46c707 of this.a) {
      let _0x17c27d = _0x46c707.id;
      let _0x102fa2 = MD5Encrypt("action4api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033isStudyContent0source_id" + _0x17c27d + "tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
      let _0x3c8085 = "app_version=3.1.61&sign=" + _0x102fa2 + "&cms_app_id=1033&api_version=3.6.1&isStudyContent=0&token=" + this.token + "&user_id=" + this.uid + "&tenantid=yhdst&action=4&client=android&source_id=" + _0x17c27d + "&app_id=1";
      let _0x92cae1 = await task("post", "http://appapi.chinamcloud.com/api/integral/add-integral", {}, _0x3c8085);
      if (_0x92cae1.state = false) {
        console.log("【" + this.name + "】 " + _0x92cae1.error.description);
        break;
      } else {
        console.log("【" + this.name + "】 分享成功");
        await wait(RT(10000, 15000));
      }
    }
  }
  async comment() {
    for (let _0x3f1fd7 of this.a) {
      let _0x36af49 = _0x3f1fd7.id;
      let _0x101ec0 = MD5Encrypt("action3api_version3.6.1app_id1app_version3.1.61clientandroidcms_app_id1033isStudyContent0source_id" + _0x36af49 + "tenantidyhdsttoken" + this.token + "user_id" + this.uid + "test1");
      let _0x5bc48e = "app_version=3.1.61&sign=" + _0x101ec0 + "&cms_app_id=1033&api_version=3.6.1&isStudyContent=0&token=" + this.token + "&user_id=" + this.uid + "&tenantid=yhdst&action=3&client=android&source_id=" + _0x36af49 + "&app_id=1";
      let _0x4ecd3e = await task("post", "http://appapi.chinamcloud.com/api/integral/add-integral", {}, _0x5bc48e);
      if (_0x4ecd3e.state = false) {
        console.log("【" + this.name + "】 " + _0x4ecd3e.error.description);
        break;
      } else {
        console.log("【" + this.name + "】 评论成功");
        await wait(RT(10000, 15000));
      }
    }
  }
}
(async () => {
  console.log("蛋炒饭美食交流频道：https://t.me/+0GGCpN9dFmBjY2E1");
  console.log(NAME);
  checkEnv();
  for (let _0x49d197 of userList) {
    await _0x49d197.getusername();
    await _0x49d197.invite();
  }
  let _0x32c778 = userList.filter(_0x57fa68 => _0x57fa68.logs == true);
  if (_0x32c778.length == 0) {
    console.log(NAME + " 呆子，检查CK是否正确");
    return;
  }
  for (let _0x11f215 of _0x32c778) {
    await _0x11f215.readlist();
    await _0x11f215.tasklist();
  }
})().catch(_0x210761 => {
  console.log(_0x210761);
}).finally(() => {});
function RT(_0x10385c, _0x3827bf) {
  return Math.round(Math.random() * (_0x3827bf - _0x10385c) + _0x10385c);
}
function times(_0x5dabfd) {
  if (_0x5dabfd == 10) {
    let _0x25df4e = Math.round(new Date().getTime() / 1000).toString();
    return _0x25df4e;
  } else {
    let _0x387216 = new Date().getTime();
    return _0x387216;
  }
}
async function task(_0x41b9ba, _0x1d644c, _0x277a55, _0x3a0c9e) {
  if (_0x41b9ba == "delete") {
    _0x41b9ba = _0x41b9ba.toUpperCase();
  } else {
    _0x41b9ba = _0x41b9ba;
  }
  const _0x3e366a = require("request");
  if (_0x41b9ba == "post") {
    delete _0x277a55["content-type"];
    delete _0x277a55["Content-type"];
    delete _0x277a55["content-Type"];
    if (safeGet(_0x3a0c9e)) {
      _0x277a55["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x277a55["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0x3a0c9e) {
      _0x277a55["Content-Length"] = lengthInUtf8Bytes(_0x3a0c9e);
    }
  }
  _0x277a55.Host = _0x1d644c.replace("//", "/").split("/")[1];
  if (_0x41b9ba.indexOf("T") < 0) {
    var _0x8ef074 = {
      url: _0x1d644c,
      headers: _0x277a55,
      body: _0x3a0c9e
    };
  } else {
    var _0x8ef074 = {
      url: _0x1d644c,
      headers: _0x277a55,
      form: JSON.parse(_0x3a0c9e)
    };
  }
  return new Promise(async _0x20d321 => {
    _0x3e366a[_0x41b9ba.toLowerCase()](_0x8ef074, (_0x1fa0ed, _0xc2ca13, _0x525df1) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0x8ef074);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x525df1));
        }
      } catch (_0x119cc4) {} finally {
        if (!_0x1fa0ed) {
          if (safeGet(_0x525df1)) {
            _0x525df1 = JSON.parse(_0x525df1);
          } else {
            _0x525df1 = _0x525df1;
          }
        } else {
          _0x525df1 = _0x1d644c + "   API请求失败，请检查网络重试\n" + _0x1fa0ed;
        }
        return _0x20d321(_0x525df1);
      }
    });
  });
}
function SJS(_0x184ddd) {
  _0x184ddd = _0x184ddd || 32;
  var _0x55f86a = "1234567890";
  var _0xf9dc9f = _0x55f86a.length;
  var _0x567812 = "";
  for (i = 0; i < _0x184ddd; i++) {
    _0x567812 += _0x55f86a.charAt(Math.floor(Math.random() * _0xf9dc9f));
  }
  return _0x567812;
}
function SJSxx(_0xd6d3e) {
  _0xd6d3e = _0xd6d3e || 32;
  var _0x5e8588 = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0x5154de = _0x5e8588.length;
  var _0x578aba = "";
  for (i = 0; i < _0xd6d3e; i++) {
    _0x578aba += _0x5e8588.charAt(Math.floor(Math.random() * _0x5154de));
  }
  return _0x578aba;
}
function safeGet(_0x5c6c32) {
  try {
    if (typeof JSON.parse(_0x5c6c32) == "object") {
      return true;
    }
  } catch (_0xf6aca) {
    return false;
  }
}
function lengthInUtf8Bytes(_0x2f2292) {
  let _0x2c89f6 = encodeURIComponent(_0x2f2292).match(/%[89ABab]/g);
  return _0x2f2292.length + (_0x2c89f6 ? _0x2c89f6.length : 0);
}
async function checkEnv() {
  let _0x10f114 = process.env[VALY] || CK;
  let _0x2347c4 = 0;
  if (_0x10f114) {
    for (let _0x59c6bf of _0x10f114.split("@").filter(_0x4cb602 => !!_0x4cb602)) {
      userList.push(new Bar(_0x59c6bf));
    }
    _0x2347c4 = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x2347c4 + "个账号");
  return userList;
}
function wait(_0x43a809) {
  return new Promise(_0x42fc85 => setTimeout(_0x42fc85, _0x43a809));
}
function stringToBase64(_0x1eb2ae) {
  var _0x2f912d = Buffer.from(_0x1eb2ae).toString("base64");
  return _0x2f912d;
}
function EncryptCrypto(_0x8b231, _0x4715fb, _0xec6a93, _0x794784, _0x55d2fd, _0x2fcbb0) {
  const _0x3776d4 = require("crypto-js");
  const _0x4c396d = _0x3776d4.enc.Utf8.parse(_0x794784);
  const _0x2b5061 = _0x3776d4.enc.Utf8.parse(_0x2fcbb0);
  const _0x54d07e = _0x3776d4.enc.Utf8.parse(_0x55d2fd);
  const _0x523163 = _0x3776d4[_0x8b231].encrypt(_0x4c396d, _0x54d07e, {
    iv: _0x2b5061,
    mode: _0x3776d4.mode[_0x4715fb],
    padding: _0x3776d4.pad[_0xec6a93]
  });
  return _0x523163.toString();
}
function DecryptCrypto(_0x556ad4, _0x8a8a50, _0xbcb85, _0x440f36, _0x1c5398, _0x451ae9) {
  const _0x1a5ea3 = require("crypto-js");
  const _0x4e947d = _0x1a5ea3.enc.Utf8.parse(_0x451ae9);
  const _0x322284 = _0x1a5ea3.enc.Utf8.parse(_0x1c5398);
  const _0x42c7ce = _0x1a5ea3[_0x556ad4].decrypt(_0x440f36, _0x322284, {
    iv: _0x4e947d,
    mode: _0x1a5ea3.mode[_0x8a8a50],
    padding: _0x1a5ea3.pad[_0xbcb85]
  });
  return _0x42c7ce.toString(_0x1a5ea3.enc.Utf8);
}
function RSA(_0x2e4d15, _0x483f13) {
  const _0x4243ea = require("node-rsa");
  let _0x334562 = new _0x4243ea("-----BEGIN PUBLIC KEY-----\n" + _0x483f13 + "\n-----END PUBLIC KEY-----");
  _0x334562.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x334562.encrypt(_0x2e4d15, "base64", "utf8");
}
function SHA1_Encrypt(_0x29cc79) {
  return CryptoJS.SHA1(_0x29cc79).toString();
}
function SHA256(_0x363880) {
  const _0x3b6169 = 8;
  const _0x3fda09 = 0;
  function _0x1cd61d(_0xc7ba63, _0x39cb33) {
    const _0x13c66f = (_0xc7ba63 & 65535) + (_0x39cb33 & 65535);
    return (_0xc7ba63 >> 16) + (_0x39cb33 >> 16) + (_0x13c66f >> 16) << 16 | _0x13c66f & 65535;
  }
  function _0x553301(_0x195172, _0x332226) {
    return _0x195172 >>> _0x332226 | _0x195172 << 32 - _0x332226;
  }
  function _0x56db29(_0x243079, _0x59c672) {
    return _0x243079 >>> _0x59c672;
  }
  function _0x5c2a10(_0x15ddd0, _0x3e59c0, _0x1b18fb) {
    return _0x15ddd0 & _0x3e59c0 ^ ~_0x15ddd0 & _0x1b18fb;
  }
  function _0x289b13(_0x4c95e3, _0x39d3cd, _0x2e7b4b) {
    return _0x4c95e3 & _0x39d3cd ^ _0x4c95e3 & _0x2e7b4b ^ _0x39d3cd & _0x2e7b4b;
  }
  function _0x17b822(_0x220c92) {
    return _0x553301(_0x220c92, 2) ^ _0x553301(_0x220c92, 13) ^ _0x553301(_0x220c92, 22);
  }
  function _0x5971f9(_0x307f4b) {
    return _0x553301(_0x307f4b, 6) ^ _0x553301(_0x307f4b, 11) ^ _0x553301(_0x307f4b, 25);
  }
  function _0x314ac1(_0x5e3464) {
    return _0x553301(_0x5e3464, 7) ^ _0x553301(_0x5e3464, 18) ^ _0x56db29(_0x5e3464, 3);
  }
  return function (_0x5cc8ee) {
    const _0x486cef = _0x3fda09 ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x5f386f = "";
    for (let _0x23eda0 = 0; _0x23eda0 < _0x5cc8ee.length * 4; _0x23eda0++) {
      _0x5f386f += _0x486cef.charAt(_0x5cc8ee[_0x23eda0 >> 2] >> (3 - _0x23eda0 % 4) * 8 + 4 & 15) + _0x486cef.charAt(_0x5cc8ee[_0x23eda0 >> 2] >> (3 - _0x23eda0 % 4) * 8 & 15);
    }
    return _0x5f386f;
  }(function (_0x3ee3a3, _0x421659) {
    const _0x3f1c87 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x12e9c7 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x43a64d = new Array(64);
    let _0x580091;
    let _0x57b2bf;
    let _0x21f91d;
    let _0x459e2d;
    let _0x4afafe;
    let _0x1c7ecf;
    let _0x273220;
    let _0x1f6a99;
    let _0x21943a;
    let _0x4ee1e3;
    let _0x50d4ad;
    let _0x4029f0;
    _0x3ee3a3[_0x421659 >> 5] |= 128 << 24 - _0x421659 % 32;
    _0x3ee3a3[15 + (_0x421659 + 64 >> 9 << 4)] = _0x421659;
    _0x21943a = 0;
    for (; _0x21943a < _0x3ee3a3.length; _0x21943a += 16) {
      _0x580091 = _0x12e9c7[0];
      _0x57b2bf = _0x12e9c7[1];
      _0x21f91d = _0x12e9c7[2];
      _0x459e2d = _0x12e9c7[3];
      _0x4afafe = _0x12e9c7[4];
      _0x1c7ecf = _0x12e9c7[5];
      _0x273220 = _0x12e9c7[6];
      _0x1f6a99 = _0x12e9c7[7];
      _0x4ee1e3 = 0;
      for (; _0x4ee1e3 < 64; _0x4ee1e3++) {
        _0x43a64d[_0x4ee1e3] = _0x4ee1e3 < 16 ? _0x3ee3a3[_0x4ee1e3 + _0x21943a] : _0x1cd61d(_0x1cd61d(_0x1cd61d(_0x553301(_0x17f8ca = _0x43a64d[_0x4ee1e3 - 2], 17) ^ _0x553301(_0x17f8ca, 19) ^ _0x56db29(_0x17f8ca, 10), _0x43a64d[_0x4ee1e3 - 7]), _0x314ac1(_0x43a64d[_0x4ee1e3 - 15])), _0x43a64d[_0x4ee1e3 - 16]);
        _0x50d4ad = _0x1cd61d(_0x1cd61d(_0x1cd61d(_0x1cd61d(_0x1f6a99, _0x5971f9(_0x4afafe)), _0x5c2a10(_0x4afafe, _0x1c7ecf, _0x273220)), _0x3f1c87[_0x4ee1e3]), _0x43a64d[_0x4ee1e3]);
        _0x4029f0 = _0x1cd61d(_0x17b822(_0x580091), _0x289b13(_0x580091, _0x57b2bf, _0x21f91d));
        _0x1f6a99 = _0x273220;
        _0x273220 = _0x1c7ecf;
        _0x1c7ecf = _0x4afafe;
        _0x4afafe = _0x1cd61d(_0x459e2d, _0x50d4ad);
        _0x459e2d = _0x21f91d;
        _0x21f91d = _0x57b2bf;
        _0x57b2bf = _0x580091;
        _0x580091 = _0x1cd61d(_0x50d4ad, _0x4029f0);
      }
      _0x12e9c7[0] = _0x1cd61d(_0x580091, _0x12e9c7[0]);
      _0x12e9c7[1] = _0x1cd61d(_0x57b2bf, _0x12e9c7[1]);
      _0x12e9c7[2] = _0x1cd61d(_0x21f91d, _0x12e9c7[2]);
      _0x12e9c7[3] = _0x1cd61d(_0x459e2d, _0x12e9c7[3]);
      _0x12e9c7[4] = _0x1cd61d(_0x4afafe, _0x12e9c7[4]);
      _0x12e9c7[5] = _0x1cd61d(_0x1c7ecf, _0x12e9c7[5]);
      _0x12e9c7[6] = _0x1cd61d(_0x273220, _0x12e9c7[6]);
      _0x12e9c7[7] = _0x1cd61d(_0x1f6a99, _0x12e9c7[7]);
    }
    var _0x17f8ca;
    return _0x12e9c7;
  }(function (_0x5af7eb) {
    const _0x3f4d15 = [];
    const _0x19471e = (1 << _0x3b6169) - 1;
    for (let _0x16f4ff = 0; _0x16f4ff < _0x5af7eb.length * _0x3b6169; _0x16f4ff += _0x3b6169) {
      _0x3f4d15[_0x16f4ff >> 5] |= (_0x5af7eb.charCodeAt(_0x16f4ff / _0x3b6169) & _0x19471e) << 24 - _0x16f4ff % 32;
    }
    return _0x3f4d15;
  }(_0x363880 = function (_0x42ec41) {
    _0x42ec41 = _0x42ec41.replace(/\r\n/g, "\n");
    let _0x4d5cc8 = "";
    for (let _0x547f31 = 0; _0x547f31 < _0x42ec41.length; _0x547f31++) {
      const _0x136e4a = _0x42ec41.charCodeAt(_0x547f31);
      if (_0x136e4a < 128) {
        _0x4d5cc8 += String.fromCharCode(_0x136e4a);
      } else if (_0x136e4a > 127 && _0x136e4a < 2048) {
        _0x4d5cc8 += String.fromCharCode(_0x136e4a >> 6 | 192);
        _0x4d5cc8 += String.fromCharCode(_0x136e4a & 63 | 128);
      } else {
        _0x4d5cc8 += String.fromCharCode(_0x136e4a >> 12 | 224);
        _0x4d5cc8 += String.fromCharCode(_0x136e4a >> 6 & 63 | 128);
        _0x4d5cc8 += String.fromCharCode(_0x136e4a & 63 | 128);
      }
    }
    return _0x4d5cc8;
  }(_0x363880)), _0x363880.length * _0x3b6169));
}
function MD5Encrypt(_0x2b8b5c) {
  function _0x31b62b(_0x7a1326, _0x4a1004) {
    return _0x7a1326 << _0x4a1004 | _0x7a1326 >>> 32 - _0x4a1004;
  }
  function _0x2bba44(_0x16ea77, _0x393cac) {
    var _0x338fc0;
    var _0x39df94;
    var _0x50737c;
    var _0x5e9914;
    var _0x451957;
    _0x50737c = _0x16ea77 & 2147483648;
    _0x5e9914 = _0x393cac & 2147483648;
    _0x338fc0 = _0x16ea77 & 1073741824;
    _0x39df94 = _0x393cac & 1073741824;
    _0x451957 = (_0x16ea77 & 1073741823) + (_0x393cac & 1073741823);
    if (_0x338fc0 & _0x39df94) {
      return _0x451957 ^ 2147483648 ^ _0x50737c ^ _0x5e9914;
    } else if (_0x338fc0 | _0x39df94) {
      if (_0x451957 & 1073741824) {
        return _0x451957 ^ 3221225472 ^ _0x50737c ^ _0x5e9914;
      } else {
        return _0x451957 ^ 1073741824 ^ _0x50737c ^ _0x5e9914;
      }
    } else {
      return _0x451957 ^ _0x50737c ^ _0x5e9914;
    }
  }
  function _0x416551(_0x58e573, _0x4c7d1a, _0x221988, _0x378af4, _0x420009, _0x12696b, _0x529b1e) {
    var _0x3e8a07;
    var _0x3bb364;
    _0x58e573 = _0x2bba44(_0x58e573, _0x2bba44(_0x2bba44((_0x3e8a07 = _0x4c7d1a) & (_0x3bb364 = _0x221988) | ~_0x3e8a07 & _0x378af4, _0x420009), _0x529b1e));
    return _0x2bba44(_0x31b62b(_0x58e573, _0x12696b), _0x4c7d1a);
  }
  function _0x24f918(_0x15bb9a, _0x4a17c2, _0x926445, _0x1534e9, _0x3361a7, _0xea5743, _0x1ea88e) {
    var _0x326482;
    var _0x4a28ff;
    var _0x2c995e;
    _0x15bb9a = _0x2bba44(_0x15bb9a, _0x2bba44(_0x2bba44((_0x326482 = _0x4a17c2, _0x4a28ff = _0x926445, _0x326482 & (_0x2c995e = _0x1534e9) | _0x4a28ff & ~_0x2c995e), _0x3361a7), _0x1ea88e));
    return _0x2bba44(_0x31b62b(_0x15bb9a, _0xea5743), _0x4a17c2);
  }
  function _0x2088cd(_0x2e731c, _0x4bc9d8, _0x3158bb, _0x11b125, _0x36c46d, _0x58face, _0x527e6f) {
    var _0x4f1b1b;
    var _0x3aa4b9;
    _0x2e731c = _0x2bba44(_0x2e731c, _0x2bba44(_0x2bba44((_0x4f1b1b = _0x4bc9d8) ^ (_0x3aa4b9 = _0x3158bb) ^ _0x11b125, _0x36c46d), _0x527e6f));
    return _0x2bba44(_0x31b62b(_0x2e731c, _0x58face), _0x4bc9d8);
  }
  function _0xb56f85(_0x25782e, _0x235bbd, _0x2ed0f1, _0x5f2acf, _0x4f19b7, _0x57c8ae, _0x1d110c) {
    var _0x4c45f0;
    var _0x26fc03;
    _0x25782e = _0x2bba44(_0x25782e, _0x2bba44(_0x2bba44((_0x4c45f0 = _0x235bbd, (_0x26fc03 = _0x2ed0f1) ^ (_0x4c45f0 | ~_0x5f2acf)), _0x4f19b7), _0x1d110c));
    return _0x2bba44(_0x31b62b(_0x25782e, _0x57c8ae), _0x235bbd);
  }
  function _0x3f6f98(_0x386025) {
    var _0x5e0f8e;
    var _0x159358 = "";
    var _0x41dd97 = "";
    for (_0x5e0f8e = 0; _0x5e0f8e <= 3; _0x5e0f8e++) {
      _0x159358 += (_0x41dd97 = "0" + (_0x386025 >>> _0x5e0f8e * 8 & 255).toString(16)).substr(_0x41dd97.length - 2, 2);
    }
    return _0x159358;
  }
  var _0x1acf55;
  var _0x3e9370;
  var _0x2d51c8;
  var _0x215f62;
  var _0x157923;
  var _0x57d60c;
  var _0x36033d;
  var _0x3da672;
  var _0x9dcbb0;
  var _0x4a5c45 = [];
  _0x4a5c45 = function (_0x14af4a) {
    for (var _0xe59b10, _0x1a9733 = _0x14af4a.length, _0x4ebb80 = _0x1a9733 + 8, _0x3bfb84 = ((_0x4ebb80 - _0x4ebb80 % 64) / 64 + 1) * 16, _0x2ff79e = Array(_0x3bfb84 - 1), _0xe5232d = 0, _0xcb69e2 = 0; _0x1a9733 > _0xcb69e2;) {
      _0xe59b10 = (_0xcb69e2 - _0xcb69e2 % 4) / 4;
      _0xe5232d = _0xcb69e2 % 4 * 8;
      _0x2ff79e[_0xe59b10] = _0x2ff79e[_0xe59b10] | _0x14af4a.charCodeAt(_0xcb69e2) << _0xe5232d;
      _0xcb69e2++;
    }
    _0xe59b10 = (_0xcb69e2 - _0xcb69e2 % 4) / 4;
    _0xe5232d = _0xcb69e2 % 4 * 8;
    _0x2ff79e[_0xe59b10] = _0x2ff79e[_0xe59b10] | 128 << _0xe5232d;
    _0x2ff79e[_0x3bfb84 - 2] = _0x1a9733 << 3;
    _0x2ff79e[_0x3bfb84 - 1] = _0x1a9733 >>> 29;
    return _0x2ff79e;
  }(_0x2b8b5c = function (_0xf0ede3) {
    _0xf0ede3 = _0xf0ede3.replace(/\r\n/g, "\n");
    for (var _0x3e2a41 = "", _0xc93583 = 0; _0xc93583 < _0xf0ede3.length; _0xc93583++) {
      var _0x3fe5d8 = _0xf0ede3.charCodeAt(_0xc93583);
      if (_0x3fe5d8 < 128) {
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8);
      } else if (_0x3fe5d8 > 127 && _0x3fe5d8 < 2048) {
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8 >> 6 | 192);
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8 & 63 | 128);
      } else {
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8 >> 12 | 224);
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8 >> 6 & 63 | 128);
        _0x3e2a41 += String.fromCharCode(_0x3fe5d8 & 63 | 128);
      }
    }
    return _0x3e2a41;
  }(_0x2b8b5c));
  _0x57d60c = 1732584193;
  _0x36033d = 4023233417;
  _0x3da672 = 2562383102;
  _0x9dcbb0 = 271733878;
  _0x1acf55 = 0;
  for (; _0x1acf55 < _0x4a5c45.length; _0x1acf55 += 16) {
    _0x3e9370 = _0x57d60c;
    _0x2d51c8 = _0x36033d;
    _0x215f62 = _0x3da672;
    _0x157923 = _0x9dcbb0;
    _0x57d60c = _0x416551(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 0], 7, 3614090360);
    _0x9dcbb0 = _0x416551(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 1], 12, 3905402710);
    _0x3da672 = _0x416551(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 2], 17, 606105819);
    _0x36033d = _0x416551(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 3], 22, 3250441966);
    _0x57d60c = _0x416551(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 4], 7, 4118548399);
    _0x9dcbb0 = _0x416551(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 5], 12, 1200080426);
    _0x3da672 = _0x416551(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 6], 17, 2821735955);
    _0x36033d = _0x416551(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 7], 22, 4249261313);
    _0x57d60c = _0x416551(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 8], 7, 1770035416);
    _0x9dcbb0 = _0x416551(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 9], 12, 2336552879);
    _0x3da672 = _0x416551(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 10], 17, 4294925233);
    _0x36033d = _0x416551(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 11], 22, 2304563134);
    _0x57d60c = _0x416551(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 12], 7, 1804603682);
    _0x9dcbb0 = _0x416551(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 13], 12, 4254626195);
    _0x3da672 = _0x416551(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 14], 17, 2792965006);
    _0x36033d = _0x416551(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 15], 22, 1236535329);
    _0x57d60c = _0x24f918(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 1], 5, 4129170786);
    _0x9dcbb0 = _0x24f918(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 6], 9, 3225465664);
    _0x3da672 = _0x24f918(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 11], 14, 643717713);
    _0x36033d = _0x24f918(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 0], 20, 3921069994);
    _0x57d60c = _0x24f918(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 5], 5, 3593408605);
    _0x9dcbb0 = _0x24f918(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 10], 9, 38016083);
    _0x3da672 = _0x24f918(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 15], 14, 3634488961);
    _0x36033d = _0x24f918(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 4], 20, 3889429448);
    _0x57d60c = _0x24f918(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 9], 5, 568446438);
    _0x9dcbb0 = _0x24f918(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 14], 9, 3275163606);
    _0x3da672 = _0x24f918(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 3], 14, 4107603335);
    _0x36033d = _0x24f918(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 8], 20, 1163531501);
    _0x57d60c = _0x24f918(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 13], 5, 2850285829);
    _0x9dcbb0 = _0x24f918(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 2], 9, 4243563512);
    _0x3da672 = _0x24f918(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 7], 14, 1735328473);
    _0x36033d = _0x24f918(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 12], 20, 2368359562);
    _0x57d60c = _0x2088cd(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 5], 4, 4294588738);
    _0x9dcbb0 = _0x2088cd(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 8], 11, 2272392833);
    _0x3da672 = _0x2088cd(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 11], 16, 1839030562);
    _0x36033d = _0x2088cd(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 14], 23, 4259657740);
    _0x57d60c = _0x2088cd(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 1], 4, 2763975236);
    _0x9dcbb0 = _0x2088cd(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 4], 11, 1272893353);
    _0x3da672 = _0x2088cd(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 7], 16, 4139469664);
    _0x36033d = _0x2088cd(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 10], 23, 3200236656);
    _0x57d60c = _0x2088cd(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 13], 4, 681279174);
    _0x9dcbb0 = _0x2088cd(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 0], 11, 3936430074);
    _0x3da672 = _0x2088cd(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 3], 16, 3572445317);
    _0x36033d = _0x2088cd(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 6], 23, 76029189);
    _0x57d60c = _0x2088cd(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 9], 4, 3654602809);
    _0x9dcbb0 = _0x2088cd(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 12], 11, 3873151461);
    _0x3da672 = _0x2088cd(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 15], 16, 530742520);
    _0x36033d = _0x2088cd(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 2], 23, 3299628645);
    _0x57d60c = _0xb56f85(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 0], 6, 4096336452);
    _0x9dcbb0 = _0xb56f85(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 7], 10, 1126891415);
    _0x3da672 = _0xb56f85(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 14], 15, 2878612391);
    _0x36033d = _0xb56f85(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 5], 21, 4237533241);
    _0x57d60c = _0xb56f85(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 12], 6, 1700485571);
    _0x9dcbb0 = _0xb56f85(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 3], 10, 2399980690);
    _0x3da672 = _0xb56f85(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 10], 15, 4293915773);
    _0x36033d = _0xb56f85(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 1], 21, 2240044497);
    _0x57d60c = _0xb56f85(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 8], 6, 1873313359);
    _0x9dcbb0 = _0xb56f85(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 15], 10, 4264355552);
    _0x3da672 = _0xb56f85(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 6], 15, 2734768916);
    _0x36033d = _0xb56f85(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 13], 21, 1309151649);
    _0x57d60c = _0xb56f85(_0x57d60c, _0x36033d, _0x3da672, _0x9dcbb0, _0x4a5c45[_0x1acf55 + 4], 6, 4149444226);
    _0x9dcbb0 = _0xb56f85(_0x9dcbb0, _0x57d60c, _0x36033d, _0x3da672, _0x4a5c45[_0x1acf55 + 11], 10, 3174756917);
    _0x3da672 = _0xb56f85(_0x3da672, _0x9dcbb0, _0x57d60c, _0x36033d, _0x4a5c45[_0x1acf55 + 2], 15, 718787259);
    _0x36033d = _0xb56f85(_0x36033d, _0x3da672, _0x9dcbb0, _0x57d60c, _0x4a5c45[_0x1acf55 + 9], 21, 3951481745);
    _0x57d60c = _0x2bba44(_0x57d60c, _0x3e9370);
    _0x36033d = _0x2bba44(_0x36033d, _0x2d51c8);
    _0x3da672 = _0x2bba44(_0x3da672, _0x215f62);
    _0x9dcbb0 = _0x2bba44(_0x9dcbb0, _0x157923);
  }
  return (_0x3f6f98(_0x57d60c) + _0x3f6f98(_0x36033d) + _0x3f6f98(_0x3da672) + _0x3f6f98(_0x9dcbb0)).toLowerCase();
}