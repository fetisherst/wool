/*
@蛋炒饭
小程序/APP:蜜雪冰城
完成每日任务，一天7积分左右，可以兑换实物或者饮品
变量名:mxbcck
登录后抓包，找到https://mxsa.mxbc.net/api/开头的包，然后取Access-Token的值作为变量，多账号用@隔开
定时:一天一次
*/
NAME = "蜜雪冰城";
VALY = ["mxbcck"];
LOGS = 0;
CK = "";
var userList = [];
const axios = require("axios");
let request = require("request");
var rs = require("jsrsasign");
var privateKeyString = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCtypUdHZJKlQ9L
L6lIJSphnhqjke7HclgWuWDRWvzov30du235cCm13mqJ3zziqLCwstdQkuXo9sOP
Ih94t6nzBHTuqYA1whrUnQrKfv9X4/h3QVkzwT+xWflE+KubJZoe+daLKkDeZjVW
nUku8ov0E5vwADACfntEhAwiSZUALX9UgNDTPbj5ESeII+VztZ/KOFsRHMTfDb1G
IR/dAc1mL5uYbh0h2Fa/fxRPgf7eJOeWGiygesl3CWj0Ue13qwX9PcG7klJXfToI
576MY+A7027a0aZ49QhKnysMGhTdtFCksYG0lwPz3bIR16NvlxNLKanc2h+ILTFQ
bMW/Y3DRAgMBAAECggEBAJGTfX6rE6zX2bzASsu9HhgxKN1VU6/L70/xrtEPp4SL
SpHKO9/S/Y1zpsigr86pQYBx/nxm4KFZewx9p+El7/06AX0djOD7HCB2/+AJq3iC
5NF4cvEwclrsJCqLJqxKPiSuYPGnzji9YvaPwArMb0Ff36KVdaHRMw58kfFys5Y2
HvDqh4x+sgMUS7kSEQT4YDzCDPlAoEFgF9rlXnh0UVS6pZtvq3cR7pR4A9hvDgX9
wU6zn1dGdy4MEXIpckuZkhwbqDLmfoHHeJc5RIjRP7WIRh2CodjetgPFE+SV7Sdj
ECmvYJbet4YLg+Qil0OKR9s9S1BbObgcbC9WxUcrTgECgYEA/Yj8BDfxcsPK5ebE
9N2teBFUJuDcHEuM1xp4/tFisoFH90JZJMkVbO19rddAMmdYLTGivWTyPVsM1+9s
tq/NwsFJWHRUiMK7dttGiXuZry+xvq/SAZoitgI8tXdDXMw7368vatr0g6m7ucBK
jZWxSHjK9/KVquVr7BoXFm+YxaECgYEAr3sgVNbr5ovx17YriTqe1FLTLMD5gPrz
ugJj7nypDYY59hLlkrA/TtWbfzE+vfrN3oRIz5OMi9iFk3KXFVJMjGg+M5eO9Y8m
14e791/q1jUuuUH4mc6HttNRNh7TdLg/OGKivE+56LEyFPir45zw/dqwQM3jiwIz
yPz/+bzmfTECgYATxrOhwJtc0FjrReznDMOTMgbWYYPJ0TrTLIVzmvGP6vWqG8rI
S8cYEA5VmQyw4c7G97AyBcW/c3K1BT/9oAj0wA7wj2JoqIfm5YPDBZkfSSEcNqqy
5Ur/13zUytC+VE/3SrrwItQf0QWLn6wxDxQdCw8J+CokgnDAoehbH6lTAQKBgQCE
67T/zpR9279i8CBmIDszBVHkcoALzQtU+H6NpWvATM4WsRWoWUx7AJ56Z+joqtPK
G1WztkYdn/L+TyxWADLvn/6Nwd2N79MyKyScKtGNVFeCCJCwoJp4R/UaE5uErBNn
OH+gOJvPwHj5HavGC5kYENC1Jb+YCiEDu3CB0S6d4QKBgQDGYGEFMZYWqO6+LrfQ
ZNDBLCI2G4+UFP+8ZEuBKy5NkDVqXQhHRbqr9S/OkFu+kEjHLuYSpQsclh6XSDks
5x/hQJNQszLPJoxvGECvz5TN2lJhuyCupS50aGKGqTxKYtiPHpWa8jZyjmanMKnE
dOGyw/X4SFyodv8AEloqd81yGg==
-----END PRIVATE KEY-----`;
class Bar {
  constructor(_0x53f5e6) {
    this.acctoken = _0x53f5e6;
  }
  async user() {
    let _0x3ba287 = times(13);
    let _0x5722fc = SHA256withRSA("appId=d82be6bbc1da11eb9dd000163e122ecb&t=" + _0x3ba287);
    let _0x59b6dd = {
      "Access-Token": this.acctoken
    };
    let _0x46a616 = await task("get", "https://mxsa.mxbc.net/api/v1/customer/info?appId=d82be6bbc1da11eb9dd000163e122ecb&t=" + _0x3ba287 + "&sign=" + _0x5722fc, _0x59b6dd);
    this.name = _0x46a616.data.nickname;
    console.log("【" + this.name + "】==>现有积分 " + _0x46a616.data.customerPoint);
  }
  async signin() {
    let _0x2bee72 = times(13);
    let _0xdf7f6c = SHA256withRSA("appId=d82be6bbc1da11eb9dd000163e122ecb&t=" + _0x2bee72);
    let _0x3cbced = {
      "Access-Token": this.acctoken
    };
    let _0x4001ec = await task("get", "https://mxsa.mxbc.net/api/v1/customer/signin?t=" + _0x2bee72 + "&appId=d82be6bbc1da11eb9dd000163e122ecb&sign=" + _0xdf7f6c, _0x3cbced);
    console.log(_0x4001ec);
    if (_0x4001ec.code == 0) {
      console.log("【" + this.name + "】==>签到成功");
    } else {
      console.log("【" + this.name + "】==>签到失败 " + _0x4001ec.msg);
    }
  }
  async shop() {
    let _0x3162f8 = times(13);
    let _0xca5743 = SHA256withRSA("appId=d82be6bbc1da11eb9dd000163e122ecb&t=" + _0x3162f8);
    let _0x42002f = {
      "Access-Token": this.acctoken
    };
    let _0x13ab84 = await task("get", "https://mxsa.mxbc.net/api/v1/duiba/getLoginUrl?appId=d82be6bbc1da11eb9dd000163e122ecb&dbredirect=&sign=" + _0xca5743 + "&t=" + _0x3162f8, _0x42002f);
    if (_0x13ab84.code == 0) {
      console.log("【" + this.name + "】==>访问魔法铺成功");
    } else {
      console.log("【" + this.name + "】==>访问魔法铺失败 " + _0x13ab84.msg);
    }
  }
}
(async () => {
  console.log("蛋炒饭美食交流频道：https://t.me/+0GGCpN9dFmBjY2E1");
  console.log(NAME);
  checkEnv();
  for (let _0x29a14e of userList) {
    await _0x29a14e.user();
    await _0x29a14e.signin();
    await _0x29a14e.shop();
  }
})().catch(_0x5a9379 => {
  console.log(_0x5a9379);
}).finally(() => {});
function RT(_0x59bed8, _0x108d50) {
  return Math.round(Math.random() * (_0x108d50 - _0x59bed8) + _0x59bed8);
}
function times(_0x5aeacb) {
  if (_0x5aeacb == 10) {
    let _0x76f101 = Math.round(new Date().getTime() / 1000).toString();
    return _0x76f101;
  } else {
    let _0x33aa22 = new Date().getTime();
    return _0x33aa22;
  }
}
async function task(_0x1e7f31, _0x3ef1a6, _0x3ba1d1, _0x18c888) {
  if (_0x1e7f31 == "delete") {
    _0x1e7f31 = _0x1e7f31.toUpperCase();
  } else {
    _0x1e7f31 = _0x1e7f31;
  }
  const _0x276e77 = require("request");
  if (_0x1e7f31 == "post") {
    delete _0x3ba1d1["content-type"];
    delete _0x3ba1d1["Content-type"];
    delete _0x3ba1d1["content-Type"];
    if (safeGet(_0x18c888)) {
      _0x3ba1d1["Content-Type"] = "application/json;charset=UTF-8";
    } else {
      _0x3ba1d1["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (_0x18c888) {
      _0x3ba1d1["Content-Length"] = lengthInUtf8Bytes(_0x18c888);
    }
  }
  _0x3ba1d1.Host = _0x3ef1a6.replace("//", "/").split("/")[1];
  if (_0x1e7f31.indexOf("T") < 0) {
    var _0x1595fa = {
      url: _0x3ef1a6,
      headers: _0x3ba1d1,
      body: _0x18c888
    };
  } else {
    var _0x1595fa = {
      url: _0x3ef1a6,
      headers: _0x3ba1d1,
      form: JSON.parse(_0x18c888)
    };
  }
  return new Promise(async _0x1fc37b => {
    _0x276e77[_0x1e7f31.toLowerCase()](_0x1595fa, (_0x3a9e1c, _0x12de31, _0x2ed954) => {
      try {
        if (LOGS == 1) {
          console.log("==================请求==================");
          console.log(_0x1595fa);
          console.log("==================返回==================");
          console.log(JSON.parse(_0x2ed954));
        }
      } catch (_0xa0b7f5) {} finally {
        if (!_0x3a9e1c) {
          if (safeGet(_0x2ed954)) {
            _0x2ed954 = JSON.parse(_0x2ed954);
          } else {
            _0x2ed954 = _0x2ed954;
          }
        } else {
          _0x2ed954 = _0x3ef1a6 + "   API请求失败，请检查网络重试\n" + _0x3a9e1c;
        }
        return _0x1fc37b(_0x2ed954);
      }
    });
  });
}
function SJS(_0x1352dc) {
  _0x1352dc = _0x1352dc || 32;
  var _0x2d5ce9 = "1234567890";
  var _0x54cb7f = _0x2d5ce9.length;
  var _0x27c703 = "";
  for (i = 0; i < _0x1352dc; i++) {
    _0x27c703 += _0x2d5ce9.charAt(Math.floor(Math.random() * _0x54cb7f));
  }
  return _0x27c703;
}
function SJSxx(_0x55e91e) {
  _0x55e91e = _0x55e91e || 32;
  var _0x3625e4 = "abcdefghijklmnopqrstuvwxyz1234567890";
  var _0x2611cf = _0x3625e4.length;
  var _0x28c6a8 = "";
  for (i = 0; i < _0x55e91e; i++) {
    _0x28c6a8 += _0x3625e4.charAt(Math.floor(Math.random() * _0x2611cf));
  }
  return _0x28c6a8;
}
function safeGet(_0x5d3791) {
  try {
    if (typeof JSON.parse(_0x5d3791) == "object") {
      return true;
    }
  } catch (_0x1474c0) {
    return false;
  }
}
function lengthInUtf8Bytes(_0x30f14a) {
  let _0x4e6b27 = encodeURIComponent(_0x30f14a).match(/%[89ABab]/g);
  return _0x30f14a.length + (_0x4e6b27 ? _0x4e6b27.length : 0);
}
async function checkEnv() {
  let _0x1c8468 = process.env[VALY] || CK;
  let _0x3da0df = 0;
  if (_0x1c8468) {
    for (let _0x5d6c1e of _0x1c8468.split("@").filter(_0x48a65b => !!_0x48a65b)) {
      userList.push(new Bar(_0x5d6c1e));
    }
    _0x3da0df = userList.length;
  } else {
    console.log("\n【" + NAME + "】：未填写变量: " + VALY);
  }
  console.log("共找到" + _0x3da0df + "个账号");
  return userList;
}
function wait(_0xb7b2b6) {
  return new Promise(_0x2a576b => setTimeout(_0x2a576b, _0xb7b2b6));
}
function stringToBase64(_0x1d6737) {
  var _0x250d71 = Buffer.from(_0x1d6737).toString("base64");
  return _0x250d71;
}
function EncryptCrypto(_0x5bd548, _0x26a329, _0x9e49a1, _0x5d1c44, _0x5dec5f, _0x5d65c6) {
  const _0x55aea1 = require("crypto-js");
  const _0x4de965 = _0x55aea1.enc.Utf8.parse(_0x5d1c44);
  const _0x1b5e37 = _0x55aea1.enc.Utf8.parse(_0x5d65c6);
  const _0x3f97d4 = _0x55aea1.enc.Utf8.parse(_0x5dec5f);
  const _0x2b2ba5 = _0x55aea1[_0x5bd548].encrypt(_0x4de965, _0x3f97d4, {
    iv: _0x1b5e37,
    mode: _0x55aea1.mode[_0x26a329],
    padding: _0x55aea1.pad[_0x9e49a1]
  });
  return _0x2b2ba5.toString();
}
function DecryptCrypto(_0x2a9dd7, _0x1d1692, _0x501adc, _0x756a9f, _0x6b4796, _0x1fdb58) {
  const _0x5512f1 = require("crypto-js");
  const _0x360ce2 = _0x5512f1.enc.Utf8.parse(_0x1fdb58);
  const _0x598224 = _0x5512f1.enc.Utf8.parse(_0x6b4796);
  const _0x162ea5 = _0x5512f1[_0x2a9dd7].decrypt(_0x756a9f, _0x598224, {
    iv: _0x360ce2,
    mode: _0x5512f1.mode[_0x1d1692],
    padding: _0x5512f1.pad[_0x501adc]
  });
  return _0x162ea5.toString(_0x5512f1.enc.Utf8);
}
function SHA256withRSA(_0x27a4b2) {
  const _0x3d06a6 = rs.KEYUTIL.getKey(privateKeyString);
  const _0x280d91 = new rs.KJUR.crypto.Signature({
    alg: "SHA256withRSA"
  });
  _0x280d91.init(_0x3d06a6);
  _0x280d91.updateString(_0x27a4b2);
  const _0xa2399a = _0x280d91.sign();
  const _0x29ca7f = rs.hextob64u(_0xa2399a);
  return _0x29ca7f;
}
function RSA(_0x479941, _0x5a5984) {
  const _0x4b1120 = require("node-rsa");
  let _0x4c611f = new _0x4b1120("-----BEGIN PUBLIC KEY-----\n" + _0x5a5984 + "\n-----END PUBLIC KEY-----");
  _0x4c611f.setOptions({
    encryptionScheme: "pkcs1"
  });
  return _0x4c611f.encrypt(_0x479941, "base64", "utf8");
}
function SHA1_Encrypt(_0x482caf) {
  return CryptoJS.SHA1(_0x482caf).toString();
}
function SHA256(_0x432fe1) {
  const _0x230a2b = 8;
  const _0x3c32ed = 0;
  function _0x1cb51c(_0x6dfdb9, _0x49eacc) {
    const _0x368b67 = (_0x6dfdb9 & 65535) + (_0x49eacc & 65535);
    return (_0x6dfdb9 >> 16) + (_0x49eacc >> 16) + (_0x368b67 >> 16) << 16 | _0x368b67 & 65535;
  }
  function _0xfc3d5c(_0x4e9b4a, _0x2c8bcb) {
    return _0x4e9b4a >>> _0x2c8bcb | _0x4e9b4a << 32 - _0x2c8bcb;
  }
  function _0x17d26c(_0x107967, _0x516849) {
    return _0x107967 >>> _0x516849;
  }
  function _0xd3ca0d(_0x250699, _0x4b7d7e, _0x506100) {
    return _0x250699 & _0x4b7d7e ^ ~_0x250699 & _0x506100;
  }
  function _0x5b7c3f(_0x5074bc, _0x487a8e, _0x260e87) {
    return _0x5074bc & _0x487a8e ^ _0x5074bc & _0x260e87 ^ _0x487a8e & _0x260e87;
  }
  function _0x157a0f(_0x4891bf) {
    return _0xfc3d5c(_0x4891bf, 2) ^ _0xfc3d5c(_0x4891bf, 13) ^ _0xfc3d5c(_0x4891bf, 22);
  }
  function _0x33cff8(_0x50b0b4) {
    return _0xfc3d5c(_0x50b0b4, 6) ^ _0xfc3d5c(_0x50b0b4, 11) ^ _0xfc3d5c(_0x50b0b4, 25);
  }
  function _0x5561d8(_0x348bc2) {
    return _0xfc3d5c(_0x348bc2, 7) ^ _0xfc3d5c(_0x348bc2, 18) ^ _0x17d26c(_0x348bc2, 3);
  }
  return function (_0x3f8921) {
    const _0x4ac5be = _0x3c32ed ? "0123456789ABCDEF" : "0123456789abcdef";
    let _0x49e4b7 = "";
    for (let _0x52709f = 0; _0x52709f < _0x3f8921.length * 4; _0x52709f++) {
      _0x49e4b7 += _0x4ac5be.charAt(_0x3f8921[_0x52709f >> 2] >> (3 - _0x52709f % 4) * 8 + 4 & 15) + _0x4ac5be.charAt(_0x3f8921[_0x52709f >> 2] >> (3 - _0x52709f % 4) * 8 & 15);
    }
    return _0x49e4b7;
  }(function (_0x571d12, _0x344bc3) {
    const _0x5aa958 = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
    const _0x4c3bb5 = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
    const _0x115efa = new Array(64);
    let _0x10c9b7;
    let _0x3e5017;
    let _0x2292cf;
    let _0x2e8156;
    let _0x13274a;
    let _0x14d286;
    let _0x442a2f;
    let _0x161e0f;
    let _0x4f8de5;
    let _0x15240b;
    let _0x882149;
    let _0x417811;
    _0x571d12[_0x344bc3 >> 5] |= 128 << 24 - _0x344bc3 % 32;
    _0x571d12[15 + (_0x344bc3 + 64 >> 9 << 4)] = _0x344bc3;
    _0x4f8de5 = 0;
    for (; _0x4f8de5 < _0x571d12.length; _0x4f8de5 += 16) {
      _0x10c9b7 = _0x4c3bb5[0];
      _0x3e5017 = _0x4c3bb5[1];
      _0x2292cf = _0x4c3bb5[2];
      _0x2e8156 = _0x4c3bb5[3];
      _0x13274a = _0x4c3bb5[4];
      _0x14d286 = _0x4c3bb5[5];
      _0x442a2f = _0x4c3bb5[6];
      _0x161e0f = _0x4c3bb5[7];
      _0x15240b = 0;
      for (; _0x15240b < 64; _0x15240b++) {
        _0x115efa[_0x15240b] = _0x15240b < 16 ? _0x571d12[_0x15240b + _0x4f8de5] : _0x1cb51c(_0x1cb51c(_0x1cb51c(_0xfc3d5c(_0x16b401 = _0x115efa[_0x15240b - 2], 17) ^ _0xfc3d5c(_0x16b401, 19) ^ _0x17d26c(_0x16b401, 10), _0x115efa[_0x15240b - 7]), _0x5561d8(_0x115efa[_0x15240b - 15])), _0x115efa[_0x15240b - 16]);
        _0x882149 = _0x1cb51c(_0x1cb51c(_0x1cb51c(_0x1cb51c(_0x161e0f, _0x33cff8(_0x13274a)), _0xd3ca0d(_0x13274a, _0x14d286, _0x442a2f)), _0x5aa958[_0x15240b]), _0x115efa[_0x15240b]);
        _0x417811 = _0x1cb51c(_0x157a0f(_0x10c9b7), _0x5b7c3f(_0x10c9b7, _0x3e5017, _0x2292cf));
        _0x161e0f = _0x442a2f;
        _0x442a2f = _0x14d286;
        _0x14d286 = _0x13274a;
        _0x13274a = _0x1cb51c(_0x2e8156, _0x882149);
        _0x2e8156 = _0x2292cf;
        _0x2292cf = _0x3e5017;
        _0x3e5017 = _0x10c9b7;
        _0x10c9b7 = _0x1cb51c(_0x882149, _0x417811);
      }
      _0x4c3bb5[0] = _0x1cb51c(_0x10c9b7, _0x4c3bb5[0]);
      _0x4c3bb5[1] = _0x1cb51c(_0x3e5017, _0x4c3bb5[1]);
      _0x4c3bb5[2] = _0x1cb51c(_0x2292cf, _0x4c3bb5[2]);
      _0x4c3bb5[3] = _0x1cb51c(_0x2e8156, _0x4c3bb5[3]);
      _0x4c3bb5[4] = _0x1cb51c(_0x13274a, _0x4c3bb5[4]);
      _0x4c3bb5[5] = _0x1cb51c(_0x14d286, _0x4c3bb5[5]);
      _0x4c3bb5[6] = _0x1cb51c(_0x442a2f, _0x4c3bb5[6]);
      _0x4c3bb5[7] = _0x1cb51c(_0x161e0f, _0x4c3bb5[7]);
    }
    var _0x16b401;
    return _0x4c3bb5;
  }(function (_0x4d33bc) {
    const _0x4a658f = [];
    const _0xf154d4 = (1 << _0x230a2b) - 1;
    for (let _0x2a68a3 = 0; _0x2a68a3 < _0x4d33bc.length * _0x230a2b; _0x2a68a3 += _0x230a2b) {
      _0x4a658f[_0x2a68a3 >> 5] |= (_0x4d33bc.charCodeAt(_0x2a68a3 / _0x230a2b) & _0xf154d4) << 24 - _0x2a68a3 % 32;
    }
    return _0x4a658f;
  }(_0x432fe1 = function (_0x3d6dea) {
    _0x3d6dea = _0x3d6dea.replace(/\r\n/g, "\n");
    let _0x2e730e = "";
    for (let _0xeaee14 = 0; _0xeaee14 < _0x3d6dea.length; _0xeaee14++) {
      const _0x494d36 = _0x3d6dea.charCodeAt(_0xeaee14);
      if (_0x494d36 < 128) {
        _0x2e730e += String.fromCharCode(_0x494d36);
      } else if (_0x494d36 > 127 && _0x494d36 < 2048) {
        _0x2e730e += String.fromCharCode(_0x494d36 >> 6 | 192);
        _0x2e730e += String.fromCharCode(_0x494d36 & 63 | 128);
      } else {
        _0x2e730e += String.fromCharCode(_0x494d36 >> 12 | 224);
        _0x2e730e += String.fromCharCode(_0x494d36 >> 6 & 63 | 128);
        _0x2e730e += String.fromCharCode(_0x494d36 & 63 | 128);
      }
    }
    return _0x2e730e;
  }(_0x432fe1)), _0x432fe1.length * _0x230a2b));
}
function MD5Encrypt(_0x350ba5) {
  function _0x2be1dc(_0x1b9541, _0x3f1202) {
    return _0x1b9541 << _0x3f1202 | _0x1b9541 >>> 32 - _0x3f1202;
  }
  function _0x5548e8(_0x293647, _0xa578d6) {
    var _0x5b939b;
    var _0x133ca5;
    var _0xa624e4;
    var _0x239284;
    var _0xd2cc70;
    _0xa624e4 = _0x293647 & 2147483648;
    _0x239284 = _0xa578d6 & 2147483648;
    _0x5b939b = _0x293647 & 1073741824;
    _0x133ca5 = _0xa578d6 & 1073741824;
    _0xd2cc70 = (_0x293647 & 1073741823) + (_0xa578d6 & 1073741823);
    if (_0x5b939b & _0x133ca5) {
      return _0xd2cc70 ^ 2147483648 ^ _0xa624e4 ^ _0x239284;
    } else if (_0x5b939b | _0x133ca5) {
      if (_0xd2cc70 & 1073741824) {
        return _0xd2cc70 ^ 3221225472 ^ _0xa624e4 ^ _0x239284;
      } else {
        return _0xd2cc70 ^ 1073741824 ^ _0xa624e4 ^ _0x239284;
      }
    } else {
      return _0xd2cc70 ^ _0xa624e4 ^ _0x239284;
    }
  }
  function _0x3fc5e5(_0x1a8eb1, _0x56e62e, _0x47a596, _0x3cfb2e, _0x5ccd32, _0x5020e5, _0x3bcf05) {
    var _0x173f46;
    var _0x533422;
    _0x1a8eb1 = _0x5548e8(_0x1a8eb1, _0x5548e8(_0x5548e8((_0x173f46 = _0x56e62e) & (_0x533422 = _0x47a596) | ~_0x173f46 & _0x3cfb2e, _0x5ccd32), _0x3bcf05));
    return _0x5548e8(_0x2be1dc(_0x1a8eb1, _0x5020e5), _0x56e62e);
  }
  function _0x2a3886(_0x27f1ad, _0x566170, _0x584c18, _0x100bbc, _0xb07cf, _0x2c4354, _0x2e5540) {
    var _0x5ccc0e;
    var _0x4d83c3;
    var _0x473ec7;
    _0x27f1ad = _0x5548e8(_0x27f1ad, _0x5548e8(_0x5548e8((_0x5ccc0e = _0x566170, _0x4d83c3 = _0x584c18, _0x5ccc0e & (_0x473ec7 = _0x100bbc) | _0x4d83c3 & ~_0x473ec7), _0xb07cf), _0x2e5540));
    return _0x5548e8(_0x2be1dc(_0x27f1ad, _0x2c4354), _0x566170);
  }
  function _0x132eba(_0x172e96, _0x187818, _0x5aa663, _0x3e3518, _0xd35c52, _0x5e415f, _0x2d75f2) {
    var _0x245f8a;
    var _0x940642;
    _0x172e96 = _0x5548e8(_0x172e96, _0x5548e8(_0x5548e8((_0x245f8a = _0x187818) ^ (_0x940642 = _0x5aa663) ^ _0x3e3518, _0xd35c52), _0x2d75f2));
    return _0x5548e8(_0x2be1dc(_0x172e96, _0x5e415f), _0x187818);
  }
  function _0x4edf9b(_0x1afb00, _0x1d84ff, _0x16c249, _0x196604, _0x3ad1d6, _0x22ea76, _0xcb8433) {
    var _0x329a3b;
    var _0x41b09b;
    _0x1afb00 = _0x5548e8(_0x1afb00, _0x5548e8(_0x5548e8((_0x329a3b = _0x1d84ff, (_0x41b09b = _0x16c249) ^ (_0x329a3b | ~_0x196604)), _0x3ad1d6), _0xcb8433));
    return _0x5548e8(_0x2be1dc(_0x1afb00, _0x22ea76), _0x1d84ff);
  }
  function _0x95a13c(_0x1141c1) {
    var _0x309cf3;
    var _0x1b9d86 = "";
    var _0x24fa82 = "";
    for (_0x309cf3 = 0; _0x309cf3 <= 3; _0x309cf3++) {
      _0x1b9d86 += (_0x24fa82 = "0" + (_0x1141c1 >>> _0x309cf3 * 8 & 255).toString(16)).substr(_0x24fa82.length - 2, 2);
    }
    return _0x1b9d86;
  }
  var _0x33c437;
  var _0x505297;
  var _0x36d775;
  var _0x12fe07;
  var _0xeedd05;
  var _0x1856a2;
  var _0x23bce6;
  var _0x133949;
  var _0x3e9e65;
  var _0x3c020c = [];
  _0x3c020c = function (_0x1fac29) {
    for (var _0x174044, _0x37afa9 = _0x1fac29.length, _0x40a18d = _0x37afa9 + 8, _0x2b34a4 = ((_0x40a18d - _0x40a18d % 64) / 64 + 1) * 16, _0xe2306c = Array(_0x2b34a4 - 1), _0x16a990 = 0, _0x29df60 = 0; _0x37afa9 > _0x29df60;) {
      _0x174044 = (_0x29df60 - _0x29df60 % 4) / 4;
      _0x16a990 = _0x29df60 % 4 * 8;
      _0xe2306c[_0x174044] = _0xe2306c[_0x174044] | _0x1fac29.charCodeAt(_0x29df60) << _0x16a990;
      _0x29df60++;
    }
    _0x174044 = (_0x29df60 - _0x29df60 % 4) / 4;
    _0x16a990 = _0x29df60 % 4 * 8;
    _0xe2306c[_0x174044] = _0xe2306c[_0x174044] | 128 << _0x16a990;
    _0xe2306c[_0x2b34a4 - 2] = _0x37afa9 << 3;
    _0xe2306c[_0x2b34a4 - 1] = _0x37afa9 >>> 29;
    return _0xe2306c;
  }(_0x350ba5 = function (_0x34f725) {
    _0x34f725 = _0x34f725.replace(/\r\n/g, "\n");
    for (var _0x53260a = "", _0x12b883 = 0; _0x12b883 < _0x34f725.length; _0x12b883++) {
      var _0x377ef9 = _0x34f725.charCodeAt(_0x12b883);
      if (_0x377ef9 < 128) {
        _0x53260a += String.fromCharCode(_0x377ef9);
      } else if (_0x377ef9 > 127 && _0x377ef9 < 2048) {
        _0x53260a += String.fromCharCode(_0x377ef9 >> 6 | 192);
        _0x53260a += String.fromCharCode(_0x377ef9 & 63 | 128);
      } else {
        _0x53260a += String.fromCharCode(_0x377ef9 >> 12 | 224);
        _0x53260a += String.fromCharCode(_0x377ef9 >> 6 & 63 | 128);
        _0x53260a += String.fromCharCode(_0x377ef9 & 63 | 128);
      }
    }
    return _0x53260a;
  }(_0x350ba5));
  _0x1856a2 = 1732584193;
  _0x23bce6 = 4023233417;
  _0x133949 = 2562383102;
  _0x3e9e65 = 271733878;
  _0x33c437 = 0;
  for (; _0x33c437 < _0x3c020c.length; _0x33c437 += 16) {
    _0x505297 = _0x1856a2;
    _0x36d775 = _0x23bce6;
    _0x12fe07 = _0x133949;
    _0xeedd05 = _0x3e9e65;
    _0x1856a2 = _0x3fc5e5(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 0], 7, 3614090360);
    _0x3e9e65 = _0x3fc5e5(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 1], 12, 3905402710);
    _0x133949 = _0x3fc5e5(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 2], 17, 606105819);
    _0x23bce6 = _0x3fc5e5(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 3], 22, 3250441966);
    _0x1856a2 = _0x3fc5e5(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 4], 7, 4118548399);
    _0x3e9e65 = _0x3fc5e5(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 5], 12, 1200080426);
    _0x133949 = _0x3fc5e5(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 6], 17, 2821735955);
    _0x23bce6 = _0x3fc5e5(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 7], 22, 4249261313);
    _0x1856a2 = _0x3fc5e5(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 8], 7, 1770035416);
    _0x3e9e65 = _0x3fc5e5(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 9], 12, 2336552879);
    _0x133949 = _0x3fc5e5(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 10], 17, 4294925233);
    _0x23bce6 = _0x3fc5e5(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 11], 22, 2304563134);
    _0x1856a2 = _0x3fc5e5(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 12], 7, 1804603682);
    _0x3e9e65 = _0x3fc5e5(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 13], 12, 4254626195);
    _0x133949 = _0x3fc5e5(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 14], 17, 2792965006);
    _0x23bce6 = _0x3fc5e5(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 15], 22, 1236535329);
    _0x1856a2 = _0x2a3886(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 1], 5, 4129170786);
    _0x3e9e65 = _0x2a3886(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 6], 9, 3225465664);
    _0x133949 = _0x2a3886(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 11], 14, 643717713);
    _0x23bce6 = _0x2a3886(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 0], 20, 3921069994);
    _0x1856a2 = _0x2a3886(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 5], 5, 3593408605);
    _0x3e9e65 = _0x2a3886(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 10], 9, 38016083);
    _0x133949 = _0x2a3886(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 15], 14, 3634488961);
    _0x23bce6 = _0x2a3886(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 4], 20, 3889429448);
    _0x1856a2 = _0x2a3886(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 9], 5, 568446438);
    _0x3e9e65 = _0x2a3886(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 14], 9, 3275163606);
    _0x133949 = _0x2a3886(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 3], 14, 4107603335);
    _0x23bce6 = _0x2a3886(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 8], 20, 1163531501);
    _0x1856a2 = _0x2a3886(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 13], 5, 2850285829);
    _0x3e9e65 = _0x2a3886(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 2], 9, 4243563512);
    _0x133949 = _0x2a3886(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 7], 14, 1735328473);
    _0x23bce6 = _0x2a3886(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 12], 20, 2368359562);
    _0x1856a2 = _0x132eba(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 5], 4, 4294588738);
    _0x3e9e65 = _0x132eba(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 8], 11, 2272392833);
    _0x133949 = _0x132eba(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 11], 16, 1839030562);
    _0x23bce6 = _0x132eba(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 14], 23, 4259657740);
    _0x1856a2 = _0x132eba(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 1], 4, 2763975236);
    _0x3e9e65 = _0x132eba(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 4], 11, 1272893353);
    _0x133949 = _0x132eba(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 7], 16, 4139469664);
    _0x23bce6 = _0x132eba(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 10], 23, 3200236656);
    _0x1856a2 = _0x132eba(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 13], 4, 681279174);
    _0x3e9e65 = _0x132eba(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 0], 11, 3936430074);
    _0x133949 = _0x132eba(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 3], 16, 3572445317);
    _0x23bce6 = _0x132eba(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 6], 23, 76029189);
    _0x1856a2 = _0x132eba(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 9], 4, 3654602809);
    _0x3e9e65 = _0x132eba(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 12], 11, 3873151461);
    _0x133949 = _0x132eba(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 15], 16, 530742520);
    _0x23bce6 = _0x132eba(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 2], 23, 3299628645);
    _0x1856a2 = _0x4edf9b(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 0], 6, 4096336452);
    _0x3e9e65 = _0x4edf9b(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 7], 10, 1126891415);
    _0x133949 = _0x4edf9b(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 14], 15, 2878612391);
    _0x23bce6 = _0x4edf9b(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 5], 21, 4237533241);
    _0x1856a2 = _0x4edf9b(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 12], 6, 1700485571);
    _0x3e9e65 = _0x4edf9b(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 3], 10, 2399980690);
    _0x133949 = _0x4edf9b(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 10], 15, 4293915773);
    _0x23bce6 = _0x4edf9b(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 1], 21, 2240044497);
    _0x1856a2 = _0x4edf9b(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 8], 6, 1873313359);
    _0x3e9e65 = _0x4edf9b(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 15], 10, 4264355552);
    _0x133949 = _0x4edf9b(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 6], 15, 2734768916);
    _0x23bce6 = _0x4edf9b(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 13], 21, 1309151649);
    _0x1856a2 = _0x4edf9b(_0x1856a2, _0x23bce6, _0x133949, _0x3e9e65, _0x3c020c[_0x33c437 + 4], 6, 4149444226);
    _0x3e9e65 = _0x4edf9b(_0x3e9e65, _0x1856a2, _0x23bce6, _0x133949, _0x3c020c[_0x33c437 + 11], 10, 3174756917);
    _0x133949 = _0x4edf9b(_0x133949, _0x3e9e65, _0x1856a2, _0x23bce6, _0x3c020c[_0x33c437 + 2], 15, 718787259);
    _0x23bce6 = _0x4edf9b(_0x23bce6, _0x133949, _0x3e9e65, _0x1856a2, _0x3c020c[_0x33c437 + 9], 21, 3951481745);
    _0x1856a2 = _0x5548e8(_0x1856a2, _0x505297);
    _0x23bce6 = _0x5548e8(_0x23bce6, _0x36d775);
    _0x133949 = _0x5548e8(_0x133949, _0x12fe07);
    _0x3e9e65 = _0x5548e8(_0x3e9e65, _0xeedd05);
  }
  return (_0x95a13c(_0x1856a2) + _0x95a13c(_0x23bce6) + _0x95a13c(_0x133949) + _0x95a13c(_0x3e9e65)).toLowerCase();
}