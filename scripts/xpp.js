/*
小程序:香飘飘Home+
有二维码的自己扫码可以有更多次数，本脚本每天看视频，玩游戏，共有2次抽奖机会
定时:建议每天跑一次，早点跑
本地重写:sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/index url script-request-header xpp.js
hostname = game.vrupup.com
变量名:xpptoken,青龙自己抓包，登录小程序，进入首页横幅活动页面，抓https://game.vrupup.com/sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/index的请求头里面token部分。
多账号用@隔开
*/
const jsname = "香飘飘";
const $ = new Env(jsname);
let logDebug = 0;
LBJSNAMED = $.isNode() ? require("path").basename(__filename) : "xpp.js";
NAME = LBJSNAMED.split(".")[0];
let status;
status = (status = $.getval(NAME + "status") || "1") > 1 ? "" + status : "";
let userCookie = [];
let userList = [];
let userIdx = 0;
let parallel = 1;
let cxdata = {
  headers: ["token"]
};
let cxurl = "sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/index";
let host = "https://game.vrupup.com/";
class USER_LB {
  constructor() {
    this.index = ++userIdx;
  }
  async setValueForKey(_0xb02738, _0x4517f5) {
    this[_0xb02738] = _0x4517f5;
  }
  async LB_GET(_0xf84c56) {
    this.populateUrlObject(_0xf84c56, "");
    await httpRequest("get", this.urlObject);
    let _0x38da5a = httpResult;
    return _0x38da5a;
  }
  async LB_POST(_0x1d233b, _0x2fb2b2 = "") {
    this.populateUrlObject(_0x1d233b, _0x2fb2b2);
    await httpRequest("post", this.urlObject);
    let _0x209ac8 = httpResult;
    return _0x209ac8;
  }
  async populateUrlObject(_0x3c4ef3, _0x53d065 = "") {
    let _0x7d2963 = host.replace("//", "/").split("/")[1];
    let _0x3bdd83 = {
      url: host + _0x3c4ef3,
      headers: {
        Host: _0x7d2963,
        Connection: "Keep-Alive",
        Origin: "https://game.vrupup.com",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Content-Type": "application/json"
      }
    };
    if (cxdata.url) {
      for (let _0x5a0e91 of cxdata.url) {
        if (_0x3bdd83.url.indexOf("?") == -1) {
          _0x3bdd83.url = _0x3bdd83.url + ("?" + _0x5a0e91 + "=" + this[_0x5a0e91]);
        } else {
          _0x3bdd83.url = _0x3bdd83.url + ("&" + _0x5a0e91 + "=" + this[_0x5a0e91]);
        }
      }
    }
    if (cxdata.headers) {
      for (let _0x69ca19 of cxdata.headers) {
        _0x3bdd83.headers[_0x69ca19] = this[_0x69ca19];
      }
    }
    if (cxdata.body) {
      for (let _0x3361b7 of cxdata.body) {
        if (_0x53d065.indexOf("{") > -1) {
          _0x53d065 = JSON.parse(_0x53d065);
          _0x53d065[_0x3361b7] = this[_0x3361b7];
          _0x53d065 = JSON.stringify(_0x53d065);
          _0x3bdd83.headers["Content-Type"] = "application/json";
        } else {
          if (_0x53d065 == "") {
            _0x53d065 = _0x53d065 + (_0x3361b7 + "=" + this[_0x3361b7]);
          } else {
            _0x53d065 = _0x53d065 + ("&" + _0x3361b7 + "=" + this[_0x3361b7]);
          }
          _0x3bdd83.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
      }
    }
    if (_0x53d065) {
      _0x3bdd83.body = _0x53d065;
      _0x3bdd83.headers["Content-Length"] = _0x53d065 ? _0x53d065.length : 0;
    }
    this.urlObject = _0x3bdd83;
  }
}
(async () => {
  if (typeof $request !== "undefined") {
    await get_data();
  } else {
    if (!(await handleCK())) {
      return;
    }
    console.log("------------- 共" + userList.length + "个账号-------------\n");
    if (parallel) {
      for (let _0x5de4ff = 0; _0x5de4ff < userList.length; _0x5de4ff++) {
        let _0x137e50;
        let _0x1d79a2;
        let _0x9a32ce = _0x5de4ff + 1;
        let _0x54b720 = userList[_0x5de4ff];
        timestamp = new Date().getTime();
        ts = Math.round(new Date().getTime() / 1000).toString();
        _0x137e50 = await userList[_0x5de4ff].LB_POST("sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/video");
        console.log("账号【" + _0x9a32ce + "】看视频，" + _0x137e50.msg);
        await $.wait(3000);
        _0x137e50 = await userList[_0x5de4ff].LB_POST("sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/game_start");
        _0x137e50 = await userList[_0x5de4ff].LB_POST("sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/game_end");
        console.log("账号【" + _0x9a32ce + "】玩游戏，" + _0x137e50.msg);
        await $.wait(3000);
        do {
          _0x137e50 = await userList[_0x5de4ff].LB_POST("sanguo/wujinwen/h5/xpp_10yx/public/index.php/api/prize_draw");
          if (_0x137e50.code == 1) {
            console.log("账号【" + _0x9a32ce + "】" + _0x137e50.msg + "==>>抽中:" + _0x137e50.data.prize_info.prize_name);
          } else {
            console.log("账号【" + _0x9a32ce + "】" + _0x137e50.msg);
            break;
          }
        } while (1);
      }
    } else {
      let _0x362481 = [];
      for (let _0x1c67e9 of userList) {
        let _0x3fbb74 = async function () {
          let _0x398aba;
          _0x398aba = await _0x1c67e9.LB_GET("iplist", "{\"schV\":\"1\",\"appID\":[10,2000],\"setV\":\"234_422_0_2000:10\",\"vID\":\"1E306818-F65C-4017-A964-B55584C54D28\",\"sysV\":\"14.2\",\"sdkV\":\"5.2.7\",\"net\":\"1\"}");
          console.log(JSON.stringify(_0x398aba));
        };
        _0x362481.push(_0x3fbb74());
      }
      await Promise.all(_0x362481);
    }
  }
})().catch(_0x4abbff => $.logErr(_0x4abbff)).finally(() => $.done());
function get_data() {
  if ($request.url.indexOf(cxurl) > -1) {
    if (cxdata.headers) {
      for (let _0x5c89fa of cxdata.headers) {
        let _0x58496f = $request.headers[_0x5c89fa];
        let _0x557270 = ($.isNode() ? process.env[NAME + _0x5c89fa] : $.getdata(NAME + _0x5c89fa)) || "";
        if (_0x557270.indexOf(_0x58496f) == -1) {
          if (_0x557270) {
            _0x557270 = _0x557270 + "@" + _0x58496f;
          } else {
            _0x557270 = _0x58496f;
          }
          $.setdata(_0x557270, NAME + _0x5c89fa);
          ckList = _0x557270.split("@");
          $.msg(jsname + ":获取第" + ckList.length + "个" + _0x5c89fa + "成功: " + _0x58496f);
        } else {
          $.msg(jsname + ":" + (NAME + _0x5c89fa) + "变量已存在: " + _0x58496f);
        }
      }
    }
    if (cxdata.body) {
      for (let _0x1134c5 of cxdata.body) {
        let _0x38261e = $request.body;
        if (_0x38261e.indexOf("{") == -1) {
          if (_0x38261e.indexOf("&") == -1) {
            var _0x3a1244 = _0x1134c5 + "=(.*)";
            var _0xfd565d = new RegExp(_0x3a1244);
            _0x38261e = _0x38261e.match(_0xfd565d)[1];
          } else {
            let _0x475df6 = _0x38261e.split(_0x1134c5);
            if (_0x475df6.indexOf("&") == -1) {
              var _0x3a1244 = _0x1134c5 + "=(.*)";
              var _0xfd565d = new RegExp(_0x3a1244);
              _0x38261e = _0x38261e.match(_0xfd565d)[1];
            } else {
              var _0x3a1244 = _0x1134c5 + "=(.*)&";
              var _0xfd565d = new RegExp(_0x3a1244);
              _0x38261e = _0x38261e.match(_0xfd565d)[1];
            }
          }
        } else {
          _0x38261e = JSON.parse(_0x38261e);
          _0x38261e = _0x38261e[_0x1134c5];
        }
        let _0x2df406 = ($.isNode() ? process.env[NAME + _0x1134c5] : $.getdata(NAME + _0x1134c5)) || "";
        if (_0x2df406.indexOf(_0x38261e) == -1) {
          if (_0x2df406) {
            _0x2df406 = _0x2df406 + "@" + _0x38261e;
          } else {
            _0x2df406 = _0x38261e;
          }
          $.setdata(_0x2df406, NAME + _0x1134c5);
          ckList = _0x2df406.split("@");
          $.msg(jsname + ":获取第" + ckList.length + "个" + _0x1134c5 + "成功: " + _0x38261e);
        } else {
          $.msg(jsname + ":" + (NAME + _0x1134c5) + "变量已存在: " + _0x38261e);
        }
      }
    }
    if (cxdata.url) {
      for (let _0x4ee5af of cxdata.url) {
        let _0x52db2d = $request.url;
        let _0x2ae8ef = ($.isNode() ? process.env[NAME + _0x4ee5af] : $.getdata(NAME + _0x4ee5af)) || "";
        let _0x5c2d46 = _0x52db2d.split(_0x4ee5af);
        if (_0x5c2d46.indexOf("&") == -1) {
          var _0x3a1244 = _0x4ee5af + "=(.*)";
          var _0xfd565d = new RegExp(_0x3a1244);
          _0x52db2d = _0x52db2d.match(_0xfd565d)[1];
        } else {
          var _0x3a1244 = _0x4ee5af + "=(.*)&";
          var _0xfd565d = new RegExp(_0x3a1244);
          _0x52db2d = _0x52db2d.match(_0xfd565d)[1];
        }
        if (_0x2ae8ef.indexOf(_0x52db2d) == -1) {
          if (_0x2ae8ef) {
            _0x2ae8ef = _0x2ae8ef + "@" + _0x52db2d;
          } else {
            _0x2ae8ef = _0x52db2d;
          }
          $.setdata(_0x2ae8ef, NAME + _0x4ee5af);
          ckList = _0x2ae8ef.split("@");
          $.msg(jsname + ":获取第" + ckList.length + "个" + _0x4ee5af + "成功: " + _0x52db2d);
        } else {
          $.msg(jsname + ":" + (NAME + _0x4ee5af) + "变量已存在: " + _0x52db2d);
        }
      }
    }
  }
}
function handleCK() {
  let _0x59fcaa = ["\n", "@", "&"];
  for (let _0x4298c4 in cxdata) {
    for (let _0x6f3eb5 of cxdata[_0x4298c4]) {
      userCookie[_0x6f3eb5] = ($.isNode() ? process.env[NAME + _0x6f3eb5] : $.getdata(NAME + _0x6f3eb5)) || "";
      if (userCookie[_0x6f3eb5]) {
        let _0x2ccc34 = _0x59fcaa[0];
        for (let _0xf55f76 of _0x59fcaa) {
          if (userCookie[_0x6f3eb5].indexOf(_0xf55f76) > -1) {
            _0x2ccc34 = _0xf55f76;
            break;
          }
        }
        if (userList.length > 0) {
          let _0x5b4c89 = userCookie[_0x6f3eb5].split(_0x2ccc34);
          if (_0x5b4c89.length != userList.length) {
            console.log("CK变量长度不对应");
            return;
          }
          for (let _0x12f7b9 = 0; _0x12f7b9 < userList.length; _0x12f7b9++) {
            userList[_0x12f7b9].setValueForKey(_0x6f3eb5, _0x5b4c89[_0x12f7b9]);
          }
        } else {
          for (let _0x310e98 of userCookie[_0x6f3eb5].split(_0x2ccc34)) {
            const _0x54485d = new USER_LB();
            _0x54485d.setValueForKey(_0x6f3eb5, _0x310e98);
            if (_0x310e98) {
              userList.push(_0x54485d);
            }
          }
        }
      } else {
        console.log("\n未找到CK，变量名为：" + (NAME + _0x6f3eb5));
        return;
      }
    }
  }
  console.log("共找到" + userList.length + "个账号");
  return true;
}
async function httpRequest(_0x420d, _0x2c34d4) {
  httpResult = null;
  if (_0x420d == "get") {
    delete _0x2c34d4.body;
  }
  return new Promise(_0x317b3f => {
    $[_0x420d](_0x2c34d4, async (_0x315383, _0x20decf, _0x419b2b) => {
      try {
        if (_0x315383) {
          console.log(_0x420d + "请求失败");
          console.log(JSON.stringify(_0x315383));
          $.logErr(_0x315383);
        } else if (safeGet(_0x419b2b)) {
          httpResult = JSON.parse(_0x419b2b);
          if (logDebug) {
            console.log(JSON.stringify(httpResult));
          }
        } else {
          httpResult = _0x419b2b;
        }
      } catch (_0x550d12) {
        $.logErr(_0x550d12, _0x20decf);
      } finally {
        _0x317b3f();
      }
    });
  });
}
function safeGet(_0x41f6ce) {
  try {
    if (typeof JSON.parse(_0x41f6ce) == "object") {
      return true;
    } else {}
  } catch (_0x2c649d) {
    console.log(JSON.stringify(_0x2c649d));
    console.log("服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function timestampToTime(_0x343199) {
  return new Date(parseInt(_0x343199)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
function stringToBase64(_0x4426c1) {
  var _0x377f86 = Buffer.from(_0x4426c1).toString("base64");
  return _0x377f86;
}
function sleep(_0x321d34) {
  return new Promise(_0x336156 => setTimeout(_0x336156, _0x321d34));
}
function reconvert(_0x402b8f) {
  _0x402b8f = _0x402b8f.replace(/(\\u)(\w{1,4})/gi, function (_0x21f1d3) {
    return String.fromCharCode(parseInt(escape(_0x21f1d3).replace(/(%5Cu)(\w{1,4})/g, "$2"), 16));
  });
  _0x402b8f = _0x402b8f.replace(/(&#x)(\w{1,4});/gi, function (_0x56f360) {
    return String.fromCharCode(parseInt(escape(_0x56f360).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
  });
  _0x402b8f = _0x402b8f.replace(/(&#)(\d{1,6});/gi, function (_0x302d01) {
    return String.fromCharCode(parseInt(escape(_0x302d01).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
  });
  return _0x402b8f;
}
function encodeUTF8(_0x8c2648) {
  let _0xa9cd9f = "";
  for (let _0x30d466 = 0; _0x30d466 < _0x8c2648.length; _0x30d466++) {
    let _0x4b0dda = _0x8c2648[_0x30d466];
    let _0x3cf36b = "";
    if (encodeURIComponent(_0x4b0dda).length < 4) {
      _0x3cf36b = _0x4b0dda.charCodeAt(0).toString(16);
    } else {
      _0x3cf36b = encodeURIComponent(_0x4b0dda);
      _0x3cf36b = _0x3cf36b.replaceAll("%", "");
    }
    console.log("每个字符", _0x30d466, _0x4b0dda, _0x3cf36b);
    _0xa9cd9f += _0x3cf36b;
  }
  console.log("转换后", _0xa9cd9f);
  return _0xa9cd9f;
}
function MD5Encrypt(_0x42546a) {
  function _0x4ff63d(_0x370dec, _0x5a8f34) {
    return _0x370dec << _0x5a8f34 | _0x370dec >>> 32 - _0x5a8f34;
  }
  function _0x41a6c2(_0x195efe, _0x30433a) {
    var _0x2e6078;
    var _0x29ee89;
    var _0x1cca6d;
    var _0x384d1b;
    var _0x3dae9a;
    _0x1cca6d = _0x195efe & 2147483648;
    _0x384d1b = _0x30433a & 2147483648;
    _0x2e6078 = _0x195efe & 1073741824;
    _0x29ee89 = _0x30433a & 1073741824;
    _0x3dae9a = (_0x195efe & 1073741823) + (_0x30433a & 1073741823);
    if (_0x2e6078 & _0x29ee89) {
      return _0x3dae9a ^ 2147483648 ^ _0x1cca6d ^ _0x384d1b;
    } else if (_0x2e6078 | _0x29ee89) {
      if (_0x3dae9a & 1073741824) {
        return _0x3dae9a ^ 3221225472 ^ _0x1cca6d ^ _0x384d1b;
      } else {
        return _0x3dae9a ^ 1073741824 ^ _0x1cca6d ^ _0x384d1b;
      }
    } else {
      return _0x3dae9a ^ _0x1cca6d ^ _0x384d1b;
    }
  }
  function _0x3841ab(_0x2f91b3, _0xf48f13, _0x299b8c) {
    return _0x2f91b3 & _0xf48f13 | ~_0x2f91b3 & _0x299b8c;
  }
  function _0x30f46e(_0x220384, _0x29f966, _0x5f3a3e) {
    return _0x220384 & _0x5f3a3e | _0x29f966 & ~_0x5f3a3e;
  }
  function _0x202562(_0x33b6f2, _0x278477, _0x6b341) {
    return _0x33b6f2 ^ _0x278477 ^ _0x6b341;
  }
  function _0x83d0e5(_0x562709, _0x5a1419, _0x308558) {
    return _0x5a1419 ^ (_0x562709 | ~_0x308558);
  }
  function _0x58e81a(_0xd37db5, _0x4154e5, _0x18de90, _0x49e7e1, _0x2512d8, _0x48be68, _0x1931fa) {
    _0xd37db5 = _0x41a6c2(_0xd37db5, _0x41a6c2(_0x41a6c2(_0x3841ab(_0x4154e5, _0x18de90, _0x49e7e1), _0x2512d8), _0x1931fa));
    return _0x41a6c2(_0x4ff63d(_0xd37db5, _0x48be68), _0x4154e5);
  }
  function _0x45b089(_0x5c567b, _0x25ed31, _0x2fe974, _0x52982d, _0x47dbcf, _0x4d94c0, _0x4fd5df) {
    _0x5c567b = _0x41a6c2(_0x5c567b, _0x41a6c2(_0x41a6c2(_0x30f46e(_0x25ed31, _0x2fe974, _0x52982d), _0x47dbcf), _0x4fd5df));
    return _0x41a6c2(_0x4ff63d(_0x5c567b, _0x4d94c0), _0x25ed31);
  }
  function _0x372b26(_0x360d9e, _0x1358eb, _0x6b2e28, _0x279a6d, _0x316462, _0x53b755, _0x5cf4f2) {
    _0x360d9e = _0x41a6c2(_0x360d9e, _0x41a6c2(_0x41a6c2(_0x202562(_0x1358eb, _0x6b2e28, _0x279a6d), _0x316462), _0x5cf4f2));
    return _0x41a6c2(_0x4ff63d(_0x360d9e, _0x53b755), _0x1358eb);
  }
  function _0x2c6aa5(_0x10c1de, _0x253ce2, _0x1f4de4, _0x42447b, _0x324851, _0x56efcc, _0xe1cd4f) {
    _0x10c1de = _0x41a6c2(_0x10c1de, _0x41a6c2(_0x41a6c2(_0x83d0e5(_0x253ce2, _0x1f4de4, _0x42447b), _0x324851), _0xe1cd4f));
    return _0x41a6c2(_0x4ff63d(_0x10c1de, _0x56efcc), _0x253ce2);
  }
  function _0x26bfab(_0x2a1237) {
    for (var _0x259c16, _0x1cd490 = _0x2a1237.length, _0x5a0876 = _0x1cd490 + 8, _0x1ca56e = (_0x5a0876 - _0x5a0876 % 64) / 64, _0x182d56 = (_0x1ca56e + 1) * 16, _0x597cb6 = new Array(_0x182d56 - 1), _0x5b35e3 = 0, _0x4ccd11 = 0; _0x1cd490 > _0x4ccd11;) {
      _0x259c16 = (_0x4ccd11 - _0x4ccd11 % 4) / 4;
      _0x5b35e3 = _0x4ccd11 % 4 * 8;
      _0x597cb6[_0x259c16] = _0x597cb6[_0x259c16] | _0x2a1237.charCodeAt(_0x4ccd11) << _0x5b35e3;
      _0x4ccd11++;
    }
    _0x259c16 = (_0x4ccd11 - _0x4ccd11 % 4) / 4;
    _0x5b35e3 = _0x4ccd11 % 4 * 8;
    _0x597cb6[_0x259c16] = _0x597cb6[_0x259c16] | 128 << _0x5b35e3;
    _0x597cb6[_0x182d56 - 2] = _0x1cd490 << 3;
    _0x597cb6[_0x182d56 - 1] = _0x1cd490 >>> 29;
    return _0x597cb6;
  }
  function _0x261b14(_0xb3b9e6) {
    var _0x4ebfbd;
    var _0x5c6788;
    var _0x533bbb = "";
    var _0x1be798 = "";
    for (_0x5c6788 = 0; _0x5c6788 <= 3; _0x5c6788++) {
      _0x4ebfbd = _0xb3b9e6 >>> _0x5c6788 * 8 & 255;
      _0x1be798 = "0" + _0x4ebfbd.toString(16);
      _0x533bbb += _0x1be798.substr(_0x1be798.length - 2, 2);
    }
    return _0x533bbb;
  }
  function _0x2a8b0e(_0x4bf17c) {
    _0x4bf17c = _0x4bf17c.replace(/\r\n/g, "\n");
    for (var _0x32826a = "", _0x3ecc02 = 0; _0x3ecc02 < _0x4bf17c.length; _0x3ecc02++) {
      var _0x16d3bd = _0x4bf17c.charCodeAt(_0x3ecc02);
      if (_0x16d3bd < 128) {
        _0x32826a += String.fromCharCode(_0x16d3bd);
      } else if (_0x16d3bd > 127 && _0x16d3bd < 2048) {
        _0x32826a += String.fromCharCode(_0x16d3bd >> 6 | 192);
        _0x32826a += String.fromCharCode(_0x16d3bd & 63 | 128);
      } else {
        _0x32826a += String.fromCharCode(_0x16d3bd >> 12 | 224);
        _0x32826a += String.fromCharCode(_0x16d3bd >> 6 & 63 | 128);
        _0x32826a += String.fromCharCode(_0x16d3bd & 63 | 128);
      }
    }
    return _0x32826a;
  }
  var _0x5c497d;
  var _0x19f5c6;
  var _0x2028f2;
  var _0x3f3e77;
  var _0x589bc2;
  var _0x1f4c11;
  var _0x37236b;
  var _0x45f829;
  var _0x19dcf0;
  var _0x3ef128 = [];
  var _0x5d4463 = 7;
  var _0x12d3d9 = 12;
  var _0x2ec24c = 17;
  var _0x1e7b0c = 22;
  var _0x79a07c = 5;
  var _0x20adec = 9;
  var _0x4ad6d0 = 14;
  var _0x5680fd = 20;
  var _0x3407b1 = 4;
  var _0x307bea = 11;
  var _0x289071 = 16;
  var _0x25f6cf = 23;
  var _0x1069ca = 6;
  var _0x868fdd = 10;
  var _0xd8f73 = 15;
  var _0x2b4dc8 = 21;
  _0x42546a = _0x2a8b0e(_0x42546a);
  _0x3ef128 = _0x26bfab(_0x42546a);
  _0x1f4c11 = 1732584193;
  _0x37236b = 4023233417;
  _0x45f829 = 2562383102;
  _0x19dcf0 = 271733878;
  _0x5c497d = 0;
  for (; _0x5c497d < _0x3ef128.length; _0x5c497d += 16) {
    _0x19f5c6 = _0x1f4c11;
    _0x2028f2 = _0x37236b;
    _0x3f3e77 = _0x45f829;
    _0x589bc2 = _0x19dcf0;
    _0x1f4c11 = _0x58e81a(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 0], _0x5d4463, 3614090360);
    _0x19dcf0 = _0x58e81a(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 1], _0x12d3d9, 3905402710);
    _0x45f829 = _0x58e81a(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 2], _0x2ec24c, 606105819);
    _0x37236b = _0x58e81a(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 3], _0x1e7b0c, 3250441966);
    _0x1f4c11 = _0x58e81a(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 4], _0x5d4463, 4118548399);
    _0x19dcf0 = _0x58e81a(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 5], _0x12d3d9, 1200080426);
    _0x45f829 = _0x58e81a(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 6], _0x2ec24c, 2821735955);
    _0x37236b = _0x58e81a(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 7], _0x1e7b0c, 4249261313);
    _0x1f4c11 = _0x58e81a(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 8], _0x5d4463, 1770035416);
    _0x19dcf0 = _0x58e81a(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 9], _0x12d3d9, 2336552879);
    _0x45f829 = _0x58e81a(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 10], _0x2ec24c, 4294925233);
    _0x37236b = _0x58e81a(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 11], _0x1e7b0c, 2304563134);
    _0x1f4c11 = _0x58e81a(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 12], _0x5d4463, 1804603682);
    _0x19dcf0 = _0x58e81a(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 13], _0x12d3d9, 4254626195);
    _0x45f829 = _0x58e81a(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 14], _0x2ec24c, 2792965006);
    _0x37236b = _0x58e81a(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 15], _0x1e7b0c, 1236535329);
    _0x1f4c11 = _0x45b089(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 1], _0x79a07c, 4129170786);
    _0x19dcf0 = _0x45b089(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 6], _0x20adec, 3225465664);
    _0x45f829 = _0x45b089(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 11], _0x4ad6d0, 643717713);
    _0x37236b = _0x45b089(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 0], _0x5680fd, 3921069994);
    _0x1f4c11 = _0x45b089(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 5], _0x79a07c, 3593408605);
    _0x19dcf0 = _0x45b089(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 10], _0x20adec, 38016083);
    _0x45f829 = _0x45b089(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 15], _0x4ad6d0, 3634488961);
    _0x37236b = _0x45b089(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 4], _0x5680fd, 3889429448);
    _0x1f4c11 = _0x45b089(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 9], _0x79a07c, 568446438);
    _0x19dcf0 = _0x45b089(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 14], _0x20adec, 3275163606);
    _0x45f829 = _0x45b089(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 3], _0x4ad6d0, 4107603335);
    _0x37236b = _0x45b089(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 8], _0x5680fd, 1163531501);
    _0x1f4c11 = _0x45b089(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 13], _0x79a07c, 2850285829);
    _0x19dcf0 = _0x45b089(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 2], _0x20adec, 4243563512);
    _0x45f829 = _0x45b089(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 7], _0x4ad6d0, 1735328473);
    _0x37236b = _0x45b089(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 12], _0x5680fd, 2368359562);
    _0x1f4c11 = _0x372b26(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 5], _0x3407b1, 4294588738);
    _0x19dcf0 = _0x372b26(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 8], _0x307bea, 2272392833);
    _0x45f829 = _0x372b26(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 11], _0x289071, 1839030562);
    _0x37236b = _0x372b26(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 14], _0x25f6cf, 4259657740);
    _0x1f4c11 = _0x372b26(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 1], _0x3407b1, 2763975236);
    _0x19dcf0 = _0x372b26(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 4], _0x307bea, 1272893353);
    _0x45f829 = _0x372b26(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 7], _0x289071, 4139469664);
    _0x37236b = _0x372b26(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 10], _0x25f6cf, 3200236656);
    _0x1f4c11 = _0x372b26(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 13], _0x3407b1, 681279174);
    _0x19dcf0 = _0x372b26(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 0], _0x307bea, 3936430074);
    _0x45f829 = _0x372b26(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 3], _0x289071, 3572445317);
    _0x37236b = _0x372b26(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 6], _0x25f6cf, 76029189);
    _0x1f4c11 = _0x372b26(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 9], _0x3407b1, 3654602809);
    _0x19dcf0 = _0x372b26(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 12], _0x307bea, 3873151461);
    _0x45f829 = _0x372b26(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 15], _0x289071, 530742520);
    _0x37236b = _0x372b26(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 2], _0x25f6cf, 3299628645);
    _0x1f4c11 = _0x2c6aa5(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 0], _0x1069ca, 4096336452);
    _0x19dcf0 = _0x2c6aa5(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 7], _0x868fdd, 1126891415);
    _0x45f829 = _0x2c6aa5(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 14], _0xd8f73, 2878612391);
    _0x37236b = _0x2c6aa5(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 5], _0x2b4dc8, 4237533241);
    _0x1f4c11 = _0x2c6aa5(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 12], _0x1069ca, 1700485571);
    _0x19dcf0 = _0x2c6aa5(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 3], _0x868fdd, 2399980690);
    _0x45f829 = _0x2c6aa5(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 10], _0xd8f73, 4293915773);
    _0x37236b = _0x2c6aa5(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 1], _0x2b4dc8, 2240044497);
    _0x1f4c11 = _0x2c6aa5(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 8], _0x1069ca, 1873313359);
    _0x19dcf0 = _0x2c6aa5(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 15], _0x868fdd, 4264355552);
    _0x45f829 = _0x2c6aa5(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 6], _0xd8f73, 2734768916);
    _0x37236b = _0x2c6aa5(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 13], _0x2b4dc8, 1309151649);
    _0x1f4c11 = _0x2c6aa5(_0x1f4c11, _0x37236b, _0x45f829, _0x19dcf0, _0x3ef128[_0x5c497d + 4], _0x1069ca, 4149444226);
    _0x19dcf0 = _0x2c6aa5(_0x19dcf0, _0x1f4c11, _0x37236b, _0x45f829, _0x3ef128[_0x5c497d + 11], _0x868fdd, 3174756917);
    _0x45f829 = _0x2c6aa5(_0x45f829, _0x19dcf0, _0x1f4c11, _0x37236b, _0x3ef128[_0x5c497d + 2], _0xd8f73, 718787259);
    _0x37236b = _0x2c6aa5(_0x37236b, _0x45f829, _0x19dcf0, _0x1f4c11, _0x3ef128[_0x5c497d + 9], _0x2b4dc8, 3951481745);
    _0x1f4c11 = _0x41a6c2(_0x1f4c11, _0x19f5c6);
    _0x37236b = _0x41a6c2(_0x37236b, _0x2028f2);
    _0x45f829 = _0x41a6c2(_0x45f829, _0x3f3e77);
    _0x19dcf0 = _0x41a6c2(_0x19dcf0, _0x589bc2);
  }
  var _0x4e0524 = _0x261b14(_0x1f4c11) + _0x261b14(_0x37236b) + _0x261b14(_0x45f829) + _0x261b14(_0x19dcf0);
  return _0x4e0524.toLowerCase();
}
var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode: function (_0x40847e) {
    var _0x55f89e = "";
    var _0x4a4c6b;
    var _0x112328;
    var _0x30d744;
    var _0x40df7c;
    var _0x409d06;
    var _0xdce8dc;
    var _0x131cfe;
    var _0x7f1e14 = 0;
    _0x40847e = Base64._utf8_encode(_0x40847e);
    while (_0x7f1e14 < _0x40847e.length) {
      _0x4a4c6b = _0x40847e.charCodeAt(_0x7f1e14++);
      _0x112328 = _0x40847e.charCodeAt(_0x7f1e14++);
      _0x30d744 = _0x40847e.charCodeAt(_0x7f1e14++);
      _0x40df7c = _0x4a4c6b >> 2;
      _0x409d06 = (_0x4a4c6b & 3) << 4 | _0x112328 >> 4;
      _0xdce8dc = (_0x112328 & 15) << 2 | _0x30d744 >> 6;
      _0x131cfe = _0x30d744 & 63;
      if (isNaN(_0x112328)) {
        _0xdce8dc = _0x131cfe = 64;
      } else if (isNaN(_0x30d744)) {
        _0x131cfe = 64;
      }
      _0x55f89e = _0x55f89e + this._keyStr.charAt(_0x40df7c) + this._keyStr.charAt(_0x409d06) + this._keyStr.charAt(_0xdce8dc) + this._keyStr.charAt(_0x131cfe);
    }
    return _0x55f89e;
  },
  decode: function (_0x1fda6d) {
    var _0x39c682 = "";
    var _0x5c92c3;
    var _0xc32088;
    var _0x2d1fdd;
    var _0xf40662;
    var _0x47de72;
    var _0x499980;
    var _0x1edf92;
    var _0x23309d = 0;
    _0x1fda6d = _0x1fda6d.replace(/[^A-Za-z0-9+/=]/g, "");
    while (_0x23309d < _0x1fda6d.length) {
      _0xf40662 = this._keyStr.indexOf(_0x1fda6d.charAt(_0x23309d++));
      _0x47de72 = this._keyStr.indexOf(_0x1fda6d.charAt(_0x23309d++));
      _0x499980 = this._keyStr.indexOf(_0x1fda6d.charAt(_0x23309d++));
      _0x1edf92 = this._keyStr.indexOf(_0x1fda6d.charAt(_0x23309d++));
      _0x5c92c3 = _0xf40662 << 2 | _0x47de72 >> 4;
      _0xc32088 = (_0x47de72 & 15) << 4 | _0x499980 >> 2;
      _0x2d1fdd = (_0x499980 & 3) << 6 | _0x1edf92;
      _0x39c682 = _0x39c682 + String.fromCharCode(_0x5c92c3);
      if (_0x499980 != 64) {
        _0x39c682 = _0x39c682 + String.fromCharCode(_0xc32088);
      }
      if (_0x1edf92 != 64) {
        _0x39c682 = _0x39c682 + String.fromCharCode(_0x2d1fdd);
      }
    }
    _0x39c682 = Base64._utf8_decode(_0x39c682);
    return _0x39c682;
  },
  _utf8_encode: function (_0x5626fe) {
    _0x5626fe = _0x5626fe.replace(/rn/g, "n");
    var _0x1452e0 = "";
    for (var _0x125a97 = 0; _0x125a97 < _0x5626fe.length; _0x125a97++) {
      var _0x158609 = _0x5626fe.charCodeAt(_0x125a97);
      if (_0x158609 < 128) {
        _0x1452e0 += String.fromCharCode(_0x158609);
      } else if (_0x158609 > 127 && _0x158609 < 2048) {
        _0x1452e0 += String.fromCharCode(_0x158609 >> 6 | 192);
        _0x1452e0 += String.fromCharCode(_0x158609 & 63 | 128);
      } else {
        _0x1452e0 += String.fromCharCode(_0x158609 >> 12 | 224);
        _0x1452e0 += String.fromCharCode(_0x158609 >> 6 & 63 | 128);
        _0x1452e0 += String.fromCharCode(_0x158609 & 63 | 128);
      }
    }
    return _0x1452e0;
  },
  _utf8_decode: function (_0x4dab09) {
    var _0x1c70b0 = "";
    var _0x33eb0b = 0;
    var _0x5d9adc = c1 = c2 = 0;
    while (_0x33eb0b < _0x4dab09.length) {
      _0x5d9adc = _0x4dab09.charCodeAt(_0x33eb0b);
      if (_0x5d9adc < 128) {
        _0x1c70b0 += String.fromCharCode(_0x5d9adc);
        _0x33eb0b++;
      } else if (_0x5d9adc > 191 && _0x5d9adc < 224) {
        c2 = _0x4dab09.charCodeAt(_0x33eb0b + 1);
        _0x1c70b0 += String.fromCharCode((_0x5d9adc & 31) << 6 | c2 & 63);
        _0x33eb0b += 2;
      } else {
        c2 = _0x4dab09.charCodeAt(_0x33eb0b + 1);
        c3 = _0x4dab09.charCodeAt(_0x33eb0b + 2);
        _0x1c70b0 += String.fromCharCode((_0x5d9adc & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        _0x33eb0b += 3;
      }
    }
    return _0x1c70b0;
  }
};
function Env(_0x544329, _0x1bb12e) {
  class _0x352c90 {
    constructor(_0xfdf4c6) {
      this.env = _0xfdf4c6;
    }
    send(_0x25b6fd, _0xf9b7ae = "GET") {
      _0x25b6fd = typeof _0x25b6fd == "string" ? {
        url: _0x25b6fd
      } : _0x25b6fd;
      let _0xbbe3a1 = this.get;
      if (_0xf9b7ae === "POST") {
        _0xbbe3a1 = this.post;
      }
      return new Promise((_0x2b2da1, _0x16db14) => {
        _0xbbe3a1.call(this, _0x25b6fd, (_0x475efd, _0x243df5, _0x2b2487) => {
          if (_0x475efd) {
            _0x16db14(_0x475efd);
          } else {
            _0x2b2da1(_0x243df5);
          }
        });
      });
    }
    get(_0x3ab27d) {
      return this.send.call(this.env, _0x3ab27d);
    }
    post(_0x16503b) {
      return this.send.call(this.env, _0x16503b, "POST");
    }
  }
  return new class {
    constructor(_0x29465a, _0x22911b) {
      this.name = _0x29465a;
      this.http = new _0x352c90(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = false;
      this.isNeedRewrite = false;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x22911b);
      this.log("", "🔔" + this.name + ", 开始!");
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
    toObj(_0x3801a3, _0xe56baf = null) {
      try {
        return JSON.parse(_0x3801a3);
      } catch {
        return _0xe56baf;
      }
    }
    toStr(_0x137cc1, _0x24d17f = null) {
      try {
        return JSON.stringify(_0x137cc1);
      } catch {
        return _0x24d17f;
      }
    }
    getjson(_0x52ae6f, _0x4abb62) {
      let _0x3965ae = _0x4abb62;
      const _0x8214f9 = this.getdata(_0x52ae6f);
      if (_0x8214f9) {
        try {
          _0x3965ae = JSON.parse(this.getdata(_0x52ae6f));
        } catch {}
      }
      return _0x3965ae;
    }
    setjson(_0x5b4d66, _0x134b24) {
      try {
        return this.setdata(JSON.stringify(_0x5b4d66), _0x134b24);
      } catch {
        return false;
      }
    }
    getScript(_0xe96a99) {
      return new Promise(_0x5ce4f5 => {
        this.get({
          url: _0xe96a99
        }, (_0xfd94e3, _0x3fa21a, _0x4d4da2) => _0x5ce4f5(_0x4d4da2));
      });
    }
    runScript(_0x221e50, _0x3e8e88) {
      return new Promise(_0x3e60ae => {
        let _0x2f2c50 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x2f2c50 = _0x2f2c50 ? _0x2f2c50.replace(/\n/g, "").trim() : _0x2f2c50;
        let _0x36eb4a = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x36eb4a = _0x36eb4a ? _0x36eb4a * 1 : 20;
        _0x36eb4a = _0x3e8e88 && _0x3e8e88.timeout ? _0x3e8e88.timeout : _0x36eb4a;
        const [_0x3d2a50, _0x387d53] = _0x2f2c50.split("@");
        const _0x21a042 = {
          url: "http://" + _0x387d53 + "/v1/scripting/evaluate",
          body: {
            script_text: _0x221e50,
            mock_type: "cron",
            timeout: _0x36eb4a
          },
          headers: {
            "X-Key": _0x3d2a50,
            Accept: "*/*"
          }
        };
        this.post(_0x21a042, (_0x4123de, _0x402894, _0x23ca9c) => _0x3e60ae(_0x23ca9c));
      }).catch(_0x35f55c => this.logErr(_0x35f55c));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x2caa78 = this.path.resolve(this.dataFile);
        const _0x471b59 = this.path.resolve(process.cwd(), this.dataFile);
        const _0x5b1025 = this.fs.existsSync(_0x2caa78);
        const _0x2684be = !_0x5b1025 && this.fs.existsSync(_0x471b59);
        if (!_0x5b1025 && !_0x2684be) {
          return {};
        }
        {
          const _0x11b2fa = _0x5b1025 ? _0x2caa78 : _0x471b59;
          try {
            return JSON.parse(this.fs.readFileSync(_0x11b2fa));
          } catch (_0x5bc7ab) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x2782f5 = this.path.resolve(this.dataFile);
        const _0x31e89d = this.path.resolve(process.cwd(), this.dataFile);
        const _0x1678bf = this.fs.existsSync(_0x2782f5);
        const _0x17cd1a = !_0x1678bf && this.fs.existsSync(_0x31e89d);
        const _0x293f47 = JSON.stringify(this.data);
        if (_0x1678bf) {
          this.fs.writeFileSync(_0x2782f5, _0x293f47);
        } else if (_0x17cd1a) {
          this.fs.writeFileSync(_0x31e89d, _0x293f47);
        } else {
          this.fs.writeFileSync(_0x2782f5, _0x293f47);
        }
      }
    }
    lodash_get(_0x2f5458, _0x2fa3de, _0x4f965f) {
      const _0x2853bd = _0x2fa3de.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x4e4f73 = _0x2f5458;
      for (const _0x2c1ca1 of _0x2853bd) {
        _0x4e4f73 = Object(_0x4e4f73)[_0x2c1ca1];
        if (_0x4e4f73 === undefined) {
          return _0x4f965f;
        }
      }
      return _0x4e4f73;
    }
    lodash_set(_0x517c68, _0x3c7c4b, _0x216d00) {
      if (Object(_0x517c68) !== _0x517c68) {
        return _0x517c68;
      } else {
        if (!Array.isArray(_0x3c7c4b)) {
          _0x3c7c4b = _0x3c7c4b.toString().match(/[^.[\]]+/g) || [];
        }
        _0x3c7c4b.slice(0, -1).reduce((_0x467b7d, _0x19f678, _0xbe7a2a) => Object(_0x467b7d[_0x19f678]) === _0x467b7d[_0x19f678] ? _0x467b7d[_0x19f678] : _0x467b7d[_0x19f678] = Math.abs(_0x3c7c4b[_0xbe7a2a + 1]) >> 0 == +_0x3c7c4b[_0xbe7a2a + 1] ? [] : {}, _0x517c68)[_0x3c7c4b[_0x3c7c4b.length - 1]] = _0x216d00;
        return _0x517c68;
      }
    }
    getdata(_0x20a283) {
      let _0x346aa7 = this.getval(_0x20a283);
      if (/^@/.test(_0x20a283)) {
        const [, _0x454e2f, _0x2ce036] = /^@(.*?)\.(.*?)$/.exec(_0x20a283);
        const _0x3940f0 = _0x454e2f ? this.getval(_0x454e2f) : "";
        if (_0x3940f0) {
          try {
            const _0x4d368a = JSON.parse(_0x3940f0);
            _0x346aa7 = _0x4d368a ? this.lodash_get(_0x4d368a, _0x2ce036, "") : _0x346aa7;
          } catch (_0x59d4e2) {
            _0x346aa7 = "";
          }
        }
      }
      return _0x346aa7;
    }
    setdata(_0x5d4fd0, _0x2bab94) {
      let _0x1b8991 = false;
      if (/^@/.test(_0x2bab94)) {
        const [, _0x15e285, _0x5784f7] = /^@(.*?)\.(.*?)$/.exec(_0x2bab94);
        const _0x258e79 = this.getval(_0x15e285);
        const _0x10f384 = _0x15e285 ? _0x258e79 === "null" ? null : _0x258e79 || "{}" : "{}";
        try {
          const _0x308454 = JSON.parse(_0x10f384);
          this.lodash_set(_0x308454, _0x5784f7, _0x5d4fd0);
          _0x1b8991 = this.setval(JSON.stringify(_0x308454), _0x15e285);
        } catch (_0x30801b) {
          const _0x2927c9 = {};
          this.lodash_set(_0x2927c9, _0x5784f7, _0x5d4fd0);
          _0x1b8991 = this.setval(JSON.stringify(_0x2927c9), _0x15e285);
        }
      } else {
        _0x1b8991 = this.setval(_0x5d4fd0, _0x2bab94);
      }
      return _0x1b8991;
    }
    getval(_0x564e54) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(_0x564e54);
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(_0x564e54);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        return this.data[_0x564e54];
      } else {
        return this.data && this.data[_0x564e54] || null;
      }
    }
    setval(_0x35835b, _0x448e12) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(_0x35835b, _0x448e12);
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(_0x35835b, _0x448e12);
      } else if (this.isNode()) {
        this.data = this.loaddata();
        this.data[_0x448e12] = _0x35835b;
        this.writedata();
        return true;
      } else {
        return this.data && this.data[_0x448e12] || null;
      }
    }
    initGotEnv(_0x6fc893) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      if (_0x6fc893) {
        _0x6fc893.headers = _0x6fc893.headers ? _0x6fc893.headers : {};
        if (_0x6fc893.headers.Cookie === undefined && _0x6fc893.cookieJar === undefined) {
          _0x6fc893.cookieJar = this.ckjar;
        }
      }
    }
    get(_0x38466c, _0x282733 = () => {}) {
      if (_0x38466c.headers) {
        delete _0x38466c.headers["Content-Type"];
        delete _0x38466c.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          _0x38466c.headers = _0x38466c.headers || {};
          Object.assign(_0x38466c.headers, {
            "X-Surge-Skip-Scripting": false
          });
        }
        $httpClient.get(_0x38466c, (_0x5ddc44, _0xf22f13, _0x28ce44) => {
          if (!_0x5ddc44 && _0xf22f13) {
            _0xf22f13.body = _0x28ce44;
            _0xf22f13.statusCode = _0xf22f13.status;
          }
          _0x282733(_0x5ddc44, _0xf22f13, _0x28ce44);
        });
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          _0x38466c.opts = _0x38466c.opts || {};
          Object.assign(_0x38466c.opts, {
            hints: false
          });
        }
        $task.fetch(_0x38466c).then(_0x491a58 => {
          const {
            statusCode: _0x45e9cd,
            statusCode: _0x5ebb43,
            headers: _0x9da694,
            body: _0x298945
          } = _0x491a58;
          _0x282733(null, {
            status: _0x45e9cd,
            statusCode: _0x5ebb43,
            headers: _0x9da694,
            body: _0x298945
          }, _0x298945);
        }, _0x341b83 => _0x282733(_0x341b83));
      } else if (this.isNode()) {
        this.initGotEnv(_0x38466c);
        this.got(_0x38466c).on("redirect", (_0x11f109, _0xb2021a) => {
          try {
            if (_0x11f109.headers["set-cookie"]) {
              const _0x55e2a8 = _0x11f109.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
              this.ckjar.setCookieSync(_0x55e2a8, null);
              _0xb2021a.cookieJar = this.ckjar;
            }
          } catch (_0x1eb7f5) {
            this.logErr(_0x1eb7f5);
          }
        }).then(_0x2671db => {
          const {
            statusCode: _0x46f1f0,
            statusCode: _0x55d5d4,
            headers: _0x556a05,
            body: _0x2a10da
          } = _0x2671db;
          _0x282733(null, {
            status: _0x46f1f0,
            statusCode: _0x55d5d4,
            headers: _0x556a05,
            body: _0x2a10da
          }, _0x2a10da);
        }, _0x321653 => {
          const {
            message: _0x2a368e,
            response: _0x344e70
          } = _0x321653;
          _0x282733(_0x2a368e, _0x344e70, _0x344e70 && _0x344e70.body);
        });
      }
    }
    post(_0x6dceb9, _0x100e62 = () => {}) {
      if (_0x6dceb9.body && _0x6dceb9.headers && !_0x6dceb9.headers["Content-Type"]) {
        _0x6dceb9.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      if (_0x6dceb9.headers) {
        delete _0x6dceb9.headers["Content-Length"];
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          _0x6dceb9.headers = _0x6dceb9.headers || {};
          Object.assign(_0x6dceb9.headers, {
            "X-Surge-Skip-Scripting": false
          });
        }
        $httpClient.post(_0x6dceb9, (_0x5b8bc7, _0x48098b, _0x2c0407) => {
          if (!_0x5b8bc7 && _0x48098b) {
            _0x48098b.body = _0x2c0407;
            _0x48098b.statusCode = _0x48098b.status;
          }
          _0x100e62(_0x5b8bc7, _0x48098b, _0x2c0407);
        });
      } else if (this.isQuanX()) {
        _0x6dceb9.method = "POST";
        if (this.isNeedRewrite) {
          _0x6dceb9.opts = _0x6dceb9.opts || {};
          Object.assign(_0x6dceb9.opts, {
            hints: false
          });
        }
        $task.fetch(_0x6dceb9).then(_0x2fc0da => {
          const {
            statusCode: _0x4cc58a,
            statusCode: _0x4968d4,
            headers: _0x340b05,
            body: _0x1ec8b5
          } = _0x2fc0da;
          _0x100e62(null, {
            status: _0x4cc58a,
            statusCode: _0x4968d4,
            headers: _0x340b05,
            body: _0x1ec8b5
          }, _0x1ec8b5);
        }, _0x22d09b => _0x100e62(_0x22d09b));
      } else if (this.isNode()) {
        this.initGotEnv(_0x6dceb9);
        const {
          url: _0x593d6f,
          ..._0x21aa04
        } = _0x6dceb9;
        this.got.post(_0x593d6f, _0x21aa04).then(_0x1181cd => {
          const {
            statusCode: _0x31cddc,
            statusCode: _0x53c95b,
            headers: _0x512a4d,
            body: _0x30a79f
          } = _0x1181cd;
          _0x100e62(null, {
            status: _0x31cddc,
            statusCode: _0x53c95b,
            headers: _0x512a4d,
            body: _0x30a79f
          }, _0x30a79f);
        }, _0xda1b18 => {
          const {
            message: _0x34fbdf,
            response: _0x4b9097
          } = _0xda1b18;
          _0x100e62(_0x34fbdf, _0x4b9097, _0x4b9097 && _0x4b9097.body);
        });
      }
    }
    time(_0x40b166) {
      let _0x52db79 = {
        "M+": new Date().getMonth() + 1,
        "d+": new Date().getDate(),
        "H+": new Date().getHours(),
        "m+": new Date().getMinutes(),
        "s+": new Date().getSeconds(),
        "q+": Math.floor((new Date().getMonth() + 3) / 3),
        S: new Date().getMilliseconds()
      };
      if (/(y+)/.test(_0x40b166)) {
        _0x40b166 = _0x40b166.replace(RegExp.$1, (new Date().getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let _0x1b8126 in _0x52db79) {
        if (new RegExp("(" + _0x1b8126 + ")").test(_0x40b166)) {
          _0x40b166 = _0x40b166.replace(RegExp.$1, RegExp.$1.length == 1 ? _0x52db79[_0x1b8126] : ("00" + _0x52db79[_0x1b8126]).substr(("" + _0x52db79[_0x1b8126]).length));
        }
      }
      return _0x40b166;
    }
    msg(_0x2468f6 = _0x544329, _0x2a3f81 = "", _0x1038bf = "", _0x27a01f) {
      const _0x2633c9 = _0x5f3ea1 => {
        if (!_0x5f3ea1) {
          return _0x5f3ea1;
        }
        if (typeof _0x5f3ea1 == "string") {
          if (this.isLoon()) {
            return _0x5f3ea1;
          } else if (this.isQuanX()) {
            return {
              "open-url": _0x5f3ea1
            };
          } else if (this.isSurge()) {
            return {
              url: _0x5f3ea1
            };
          } else {
            return undefined;
          }
        }
        if (typeof _0x5f3ea1 == "object") {
          if (this.isLoon()) {
            let _0x4cfaa1 = _0x5f3ea1.openUrl || _0x5f3ea1.url || _0x5f3ea1["open-url"];
            let _0x5a2bcd = _0x5f3ea1.mediaUrl || _0x5f3ea1["media-url"];
            return {
              openUrl: _0x4cfaa1,
              mediaUrl: _0x5a2bcd
            };
          }
          if (this.isQuanX()) {
            let _0x8a3405 = _0x5f3ea1["open-url"] || _0x5f3ea1.url || _0x5f3ea1.openUrl;
            let _0x521fb4 = _0x5f3ea1["media-url"] || _0x5f3ea1.mediaUrl;
            return {
              "open-url": _0x8a3405,
              "media-url": _0x521fb4
            };
          }
          if (this.isSurge()) {
            let _0x43a817 = _0x5f3ea1.url || _0x5f3ea1.openUrl || _0x5f3ea1["open-url"];
            return {
              url: _0x43a817
            };
          }
        }
      };
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(_0x2468f6, _0x2a3f81, _0x1038bf, _0x2633c9(_0x27a01f));
        } else if (this.isQuanX()) {
          $notify(_0x2468f6, _0x2a3f81, _0x1038bf, _0x2633c9(_0x27a01f));
        }
      }
      let _0x1a2226 = ["", "==============📣系统通知📣=============="];
      _0x1a2226.push(_0x2468f6);
      if (_0x2a3f81) {
        _0x1a2226.push(_0x2a3f81);
      }
      if (_0x1038bf) {
        _0x1a2226.push(_0x1038bf);
      }
      console.log(_0x1a2226.join("\n"));
      this.logs = this.logs.concat(_0x1a2226);
    }
    log(..._0x2ca796) {
      if (_0x2ca796.length > 0) {
        this.logs = [...this.logs, ..._0x2ca796];
      }
      console.log(_0x2ca796.join(this.logSeparator));
    }
    logErr(_0x2f3e42, _0x841786) {
      const _0x2feb7e = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      if (_0x2feb7e) {
        this.log("", "❗️" + this.name + ", 错误!", _0x2f3e42.stack);
      } else {
        this.log("", "❗️" + this.name + ", 错误!", _0x2f3e42);
      }
    }
    wait(_0x1866c8) {
      return new Promise(_0x51d1e8 => setTimeout(_0x51d1e8, _0x1866c8));
    }
    done(_0x2b29b3 = {}) {
      const _0x4b4560 = new Date().getTime();
      const _0x33e21c = (_0x4b4560 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x33e21c + " 秒");
      this.log();
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(_0x2b29b3);
      }
    }
  }(_0x544329, _0x1bb12e);
}