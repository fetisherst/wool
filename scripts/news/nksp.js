/*
@蛋炒饭
软件名：牛咔视频
完成：签到、阅读、看视频、收听一段音频、看广告、看直播、上互动视频、点赞、分享、评论任务
评论和上互动视频默认不做（因为容易黑）胆子大的可以将脚本中Comment = 0改成Comment = 1
变量名：nkspck
登陆软件后，找到https://apigateway.nbs.cn/开头的包，把body里的uid#token填入变量，多账号换行隔开
定时：每天运行1-2次
*/
Comment = 0;
NAME = "牛咔视频";
VALY = ["nkspck"];
CK = "";
LOGS = 0;
class Bar {
  constructor(_0x2cac50) {
    this.uid = _0x2cac50.split("#")[0];
    this.token = _0x2cac50.split("#")[1];
    this.logs = true;
  }
  async tasklist() {
    let _0x2fbe06 = await $.task("get", "https://apigateway.nbs.cn/Integral/getIntegralTask?uid=" + this.uid + "&token=" + this.token, {});
    this.name = _0x2fbe06.data.user.nick_name;
    console.log("【" + this.name + "】现有总积分: " + _0x2fbe06.data.user.integral);
    if (_0x2fbe06.error == 0) {
      let _0x3daacc = _0x2fbe06.data.signIn;
      let _0xa27555 = _0x2fbe06.data.readArticle;
      let _0xf2418f = _0x2fbe06.data.praises;
      let _0xe15c7e = _0x2fbe06.data.share;
      let _0x18d1aa = _0x2fbe06.data.comment;
      let _0x4735ed = _0x2fbe06.data.watchVideo;
      let _0x19d7cf = _0x2fbe06.data.audio;
      let _0x1e680c = _0x2fbe06.data.advertisement;
      let _0x16356c = _0x2fbe06.data.watchLive;
      let _0x365511 = _0x2fbe06.data.ugcVideo;
      if (_0x3daacc.name == "每日签到" && _0x3daacc.current_counts == 0) {
        this.taskname = _0x3daacc.name;
        this.action = "signIn";
        await this.dotask();
      } else {
        console.log("【" + this.name + "】签到任务已完成，请勿重复运行脚本！");
      }
      if (_0xa27555.name == "阅读文章" && _0xa27555.current_counts < _0xa27555.counts) {
        for (let _0x513287 = _0xa27555.current_counts; _0x513287 < _0xa27555.counts; _0x513287++) {
          this.taskname = _0xa27555.name;
          this.action = "readArticle";
          await this.dotask();
        }
      } else {
        console.log("【" + this.name + "】阅读任务已完成，请勿重复运行脚本！");
      }
      if (_0xf2418f.name == "点赞" && _0xf2418f.current_counts < _0xf2418f.counts) {
        for (let _0x401315 = _0xf2418f.current_counts; _0x401315 < _0xf2418f.counts; _0x401315++) {
          await this.praises();
        }
      } else {
        console.log("【" + this.name + "】点赞任务已完成，请勿重复运行脚本！");
      }
      if (_0xe15c7e.name == "分享" && _0xe15c7e.current_counts < _0xe15c7e.counts) {
        for (let _0x19efbb = _0xe15c7e.current_counts; _0x19efbb < _0xe15c7e.counts; _0x19efbb++) {
          await this.share();
        }
      } else {
        console.log("【" + this.name + "】分享任务已完成，请勿重复运行脚本！");
      }
      if (Comment == 1) {
        if (_0x18d1aa.name == "评论" && _0x18d1aa.current_counts < _0x18d1aa.counts) {
          for (let _0xa5ba96 = _0x18d1aa.current_counts; _0xa5ba96 < _0x18d1aa.counts; _0xa5ba96++) {
            await this.dailyoneword();
            await this.comment();
          }
        } else {
          console.log("【" + this.name + "】评论任务已完成，请勿重复运行脚本！");
        }
      } else {
        console.log("【" + this.name + "】默认不做评论任务，如需要开启，将脚本中Comment = 0改成Comment = 1");
      }
      if (_0x4735ed.name == "看视频" && _0x4735ed.current_counts < _0x4735ed.counts) {
        for (let _0x49ec5c = _0x4735ed.current_counts; _0x49ec5c < _0x4735ed.counts; _0x49ec5c++) {
          this.taskname = _0x4735ed.name;
          this.action = "watchVideo";
          await this.dotask();
        }
      } else {
        console.log("【" + this.name + "】看视频任务已完成，请勿重复运行脚本！");
      }
      if (_0x19d7cf.name == "收听一首音频" && _0x19d7cf.current_counts < _0x4735ed.counts) {
        for (let _0x149f11 = _0x19d7cf.current_counts; _0x149f11 < _0x19d7cf.counts; _0x149f11++) {
          this.taskname = _0x19d7cf.name;
          this.action = "audio";
          await this.dotask();
        }
      } else {
        console.log("【" + this.name + "】收听音频任务已完成，请勿重复运行脚本！");
      }
      if (_0x1e680c.name == "点击单个广告" && _0x1e680c.current_counts < _0x4735ed.counts) {
        for (let _0x51a9e0 = _0x1e680c.current_counts; _0x51a9e0 < _0x1e680c.counts; _0x51a9e0++) {
          this.taskname = _0x1e680c.name;
          this.action = "advertisement";
          await this.dotask();
        }
      } else {
        console.log("【" + this.name + "】点击广告任务已完成，请勿重复运行脚本！");
      }
      if (_0x16356c.name == "看直播" && _0x16356c.current_counts < _0x16356c.counts) {
        this.taskname = _0x16356c.name;
        this.action = "watchLive";
        await this.dotask();
      } else {
        console.log("【" + this.name + "】看直播任务已完成，请勿重复运行脚本！");
      }
      if (Comment == 1) {
        if (_0x365511.name == "互动上传视频" && _0x365511.current_counts < _0x365511.counts) {
          this.taskname = _0x365511.name;
          this.action = "ugcVideo";
          await this.dotask();
        } else {
          console.log("【" + this.name + "】上传互动视频任务已完成，请勿重复运行脚本！");
        }
      } else {
        console.log("【" + this.name + "】默认不做上传互动视频任务，如需要开启，将脚本中Comment = 0改成Comment = 1");
      }
    }
  }
  async dotask() {
    let _0x3d047c = "versionCode=8.7.8&appType=1&uid=" + this.uid + "&token=" + this.token;
    let _0x5677ed = await $.task("post", "https://apigateway.nbs.cn/user/setIntegralInc?uid=" + this.uid + "&appType=1&action=" + this.action + "&versionCode=8.7.8&token=" + this.token, {}, _0x3d047c);
    if (_0x5677ed.error == 0) {
      console.log("【" + this.name + "】" + this.taskname + " 成功");
      await $.wait($.RT(15000, 20000));
    } else {
      console.log("【" + this.name + "】" + this.taskname + " " + _0x5677ed.msg);
    }
  }
  async readlist() {
    let _0x4dc251 = "versionCode=8.7.8&appType=1&uid=" + this.uid + "&token=" + this.token;
    let _0x16717c = await $.task("post", "https://apigateway.nbs.cn/special/detailByCate?contentid=513721&cati=2831&size=10&width=16&height=9&uid=" + this.uid + "&appType=1&page=" + $.RT(1, 30) + "&versionCode=8.7.8&token=" + this.token, {}, _0x4dc251);
    this.aa = _0x16717c.data;
  }
  async praises() {
    let _0x719863 = this.aa[$.RT(0, 9)].contentid;
    let _0x311fc5 = "uid=" + this.uid + "&modelid=1&appType=1&contentid=" + _0x719863 + "&versionCode=8.7.8&token=" + this.token;
    let _0x9ced55 = await $.task("post", "https://apigateway.nbs.cn/content/support", {}, _0x311fc5);
    if (_0x9ced55.error == 0) {
      console.log("【" + this.name + "】" + _0x9ced55.msg);
      await $.wait($.RT(15000, 20000));
    } else {
      console.log("【" + this.name + "】" + this.taskname + " " + _0x9ced55.msg);
    }
  }
  async share() {
    let _0x387b54 = this.aa[$.RT(0, 9)].contentid;
    let _0x5fb3d0 = "uid=" + this.uid + "&modelid=1&appType=1&contentid=" + _0x387b54 + "&type=1&versionCode=8.7.8&token=" + this.token;
    let _0x20c762 = await $.task("post", "https://apigateway.nbs.cn/share/addShareCount", {}, _0x5fb3d0);
    if (_0x20c762.error == 0) {
      console.log("【" + this.name + "】" + _0x20c762.msg);
      await $.wait($.RT(15000, 20000));
    } else {
      console.log("【" + this.name + "】" + this.taskname + " " + _0x20c762.msg);
    }
  }
  async dailyoneword() {
    let _0x111108 = await $.task("get", "https://v1.jinrishici.com/all.json", {});
    this.word = _0x111108.content;
  }
  async comment() {
    let _0x234033 = this.aa[$.RT(0, 9)].topicid;
    let _0x4e2900 = "uid=" + this.uid + "&topicid=" + _0x234033 + "&appType=1&source=1&versionCode=8.7.8&content=" + encodeURIComponent(this.word) + "&token=" + this.token;
    let _0x18fd9a = await $.task("post", "https://apigateway.nbs.cn/topic/reply", {}, _0x4e2900);
    if (_0x18fd9a.error == 0) {
      console.log("【" + this.name + "】" + _0x18fd9a.msg);
      await $.wait($.RT(15000, 20000));
    } else {
      console.log("【" + this.name + "】" + this.taskname + " " + _0x18fd9a.msg);
      await $.wait($.RT(15000, 20000));
    }
  }
}
$ = DD();
(async () => {
  console.log("蛋炒饭唯一美食交流频道：https://t.me/+xjTie4yvzm83OTI9 \n其他渠道获取的脚本不保证安全性，出现任何问题与本人无关请谨慎使用");
  console.log("当前版本：V0.01");
  await $.ExamineCookie();
  await $.Multithreading("readlist");
  await $.Multithreading("tasklist");
})().catch(_0x5f3371 => {
  console.log(_0x5f3371);
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
    async Multithreading(_0x2c59eb, _0x4c4541, _0x2f3b1a) {
      let _0x4cb3bc = [];
      if (!_0x2f3b1a) {
        _0x2f3b1a = 1;
      }
      while (_0x2f3b1a--) {
        for (let _0x1eb105 of $.cookie_list) {
          _0x4cb3bc.push(_0x1eb105[_0x2c59eb](_0x4c4541));
        }
      }
      await Promise.allSettled(_0x4cb3bc);
    }
    ExamineCookie() {
      let _0x12fb30 = process.env[VALY] || CK;
      let _0x24956e = 0;
      if (_0x12fb30) {
        for (let _0x48775f of _0x12fb30.split("\n").filter(_0x35ba55 => !!_0x35ba55)) {
          $.cookie_list.push(new Bar(_0x48775f));
        }
        _0x24956e = $.cookie_list.length;
      } else {
        console.log("\n【" + NAME + "】：未填写变量: " + VALY);
      }
      console.log("共找到" + _0x24956e + "个账号");
      return $.cookie_list;
    }
    task(_0x4b9ab4, _0x1d79dd, _0x3e960f, _0x4adc64, _0x9718e6) {
      if (_0x4b9ab4 == "delete") {
        _0x4b9ab4 = _0x4b9ab4.toUpperCase();
      } else {
        _0x4b9ab4 = _0x4b9ab4;
      }
      if (_0x4b9ab4 == "post") {
        delete _0x3e960f["content-type"];
        delete _0x3e960f["Content-type"];
        delete _0x3e960f["content-Type"];
        if ($.safeGet(_0x4adc64)) {
          _0x3e960f["Content-Type"] = "application/json;charset=UTF-8";
        } else {
          _0x3e960f["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (_0x4adc64) {
          _0x3e960f["Content-Length"] = $.lengthInUtf8Bytes(_0x4adc64);
        }
      }
      if (_0x4b9ab4 == "get") {
        delete _0x3e960f["content-type"];
        delete _0x3e960f["Content-type"];
        delete _0x3e960f["content-Type"];
        delete _0x3e960f["Content-Length"];
      }
      _0x3e960f.Host = _0x1d79dd.replace("//", "/").split("/")[1];
      return new Promise(async _0x4a87da => {
        if (_0x4b9ab4.indexOf("T") < 0) {
          var _0x2abba3 = {
            url: _0x1d79dd,
            headers: _0x3e960f,
            body: _0x4adc64,
            proxy: "http://" + _0x9718e6
          };
        } else {
          var _0x2abba3 = {
            url: _0x1d79dd,
            headers: _0x3e960f,
            form: JSON.parse(_0x4adc64),
            proxy: "http://" + _0x9718e6
          };
        }
        if (!_0x9718e6) {
          delete _0x2abba3.proxy;
        }
        this.request[_0x4b9ab4.toLowerCase()](_0x2abba3, (_0x3965d9, _0x2d92d5, _0xcb0739) => {
          try {
            if (_0xcb0739) {
              if (LOGS == 1) {
                console.log("================ 请求 ================");
                console.log(_0x2abba3);
                console.log("================ 返回 ================");
                if ($.safeGet(_0xcb0739)) {
                  console.log(JSON.parse(_0xcb0739));
                } else {
                  console.log(_0xcb0739);
                }
              }
            }
          } catch (_0x68f3dd) {
            console.log(_0x68f3dd, _0x1d79dd + "\n" + _0x3e960f);
          } finally {
            let _0x230eac = "";
            if (!_0x3965d9) {
              if ($.safeGet(_0xcb0739)) {
                _0x230eac = JSON.parse(_0xcb0739);
              } else if (_0xcb0739.indexOf("/") != -1 && _0xcb0739.indexOf("+") != -1) {
                _0x230eac = $.decrypts(_0xcb0739);
              } else {
                _0x230eac = _0xcb0739;
              }
            } else {
              _0x230eac = _0x1d79dd + "   API请求失败，请检查网络重试\n" + _0x3965d9;
            }
            return _0x4a87da(_0x230eac);
          }
        });
      });
    }
    decrypts(_0x253b89) {
      try {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x253b89, this.key1, this.iv));
      } catch (_0xd85045) {
        return JSON.parse($.DecryptCrypto(0, "AES", "ECB", "Pkcs7", _0x253b89, this.key2, this.iv));
      }
    }
    lengthInUtf8Bytes(_0x45aeed) {
      let _0x5ec233 = encodeURIComponent(_0x45aeed).match(/%[89ABab]/g);
      return _0x45aeed.length + (_0x5ec233 ? _0x5ec233.length : 0);
    }
    randomArr(_0x5c9ca2) {
      return _0x5c9ca2[parseInt(Math.random() * _0x5c9ca2.length, 10)];
    }
    wait(_0x60065e) {
      return new Promise(_0x52c787 => setTimeout(_0x52c787, _0x60065e));
    }
    time(_0x5f086b) {
      if (_0x5f086b == 10) {
        return Math.round(+new Date() / 1000);
      } else {
        return +new Date();
      }
    }
    timenow(_0x12f340) {
      let _0x1b83df = new Date();
      if (_0x12f340 == undefined) {
        let _0x4d3f47 = new Date();
        let _0x56b18b = _0x4d3f47.getFullYear() + "-";
        let _0x5316c6 = (_0x4d3f47.getMonth() + 1 < 10 ? "0" + (_0x4d3f47.getMonth() + 1) : _0x4d3f47.getMonth() + 1) + "-";
        let _0x5756fd = _0x4d3f47.getDate() + " ";
        let _0x4cacde = _0x4d3f47.getHours() + ":";
        let _0x3f5fcb = _0x4d3f47.getMinutes() + ":";
        let _0x7f30dd = _0x4d3f47.getSeconds() + 1 < 10 ? "0" + _0x4d3f47.getSeconds() : _0x4d3f47.getSeconds();
        return _0x56b18b + _0x5316c6 + _0x5756fd + _0x4cacde + _0x3f5fcb + _0x7f30dd;
      } else if (_0x12f340 == 0) {
        return _0x1b83df.getFullYear();
      } else if (_0x12f340 == 1) {
        if (_0x1b83df.getMonth() + 1 < 10) {
          return "0" + (_0x1b83df.getMonth() + 1);
        } else {
          return _0x1b83df.getMonth() + 1;
        }
      } else if (_0x12f340 == 2) {
        return _0x1b83df.getDate();
      } else if (_0x12f340 == 3) {
        return _0x1b83df.getHours();
      } else if (_0x12f340 == 4) {
        return _0x1b83df.getMinutes();
      } else if (_0x12f340 == 5) {
        if (_0x1b83df.getSeconds() + 1 < 10) {
          return "0" + _0x1b83df.getSeconds();
        } else {
          return _0x1b83df.getSeconds();
        }
      }
    }
    safeGet(_0x29a64d) {
      try {
        if (typeof JSON.parse(_0x29a64d) == "object") {
          return true;
        }
      } catch (_0x15d492) {
        return false;
      }
    }
    randomString(_0x8cb64b, _0x2a462e) {
      if (_0x2a462e == 0) {
        let _0x3f0a31 = "QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789";
        let _0x48d4e6 = _0x3f0a31.length;
        let _0x24ee36 = "";
        for (let _0x3a209d = 0; _0x3a209d < _0x8cb64b; _0x3a209d++) {
          _0x24ee36 += _0x3f0a31.charAt(Math.floor(Math.random() * _0x48d4e6));
        }
        return _0x24ee36;
      } else {
        let _0x27a5dc = "qwertyuiopasdfghjklzxcvbnm01234567890123456789QWERTYUIOPASDFGHJKLZXCVBNM";
        let _0x3cc3de = _0x27a5dc.length;
        let _0x4fb937 = "";
        for (let _0x431779 = 0; _0x431779 < _0x8cb64b; _0x431779++) {
          _0x4fb937 += _0x27a5dc.charAt(Math.floor(Math.random() * _0x3cc3de));
        }
        return _0x4fb937;
      }
    }
    udid(_0x586408) {
      function _0x4297c8() {
        return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
      }
      let _0x46ef28 = _0x4297c8() + _0x4297c8() + "-" + _0x4297c8() + "-" + _0x4297c8() + "-" + _0x4297c8() + "-" + _0x4297c8() + _0x4297c8() + _0x4297c8();
      if (_0x586408 == 0) {
        return _0x46ef28.toUpperCase();
      } else {
        return _0x46ef28.toLowerCase();
      }
    }
    encodeUnicode(_0x1f82a9) {
      var _0x38d1cf = [];
      for (var _0x417b04 = 0; _0x417b04 < _0x1f82a9.length; _0x417b04++) {
        _0x38d1cf[_0x417b04] = ("00" + _0x1f82a9.charCodeAt(_0x417b04).toString(16)).slice(-4);
      }
      return "\\u" + _0x38d1cf.join("\\u");
    }
    decodeUnicode(_0x5316fc) {
      _0x5316fc = _0x5316fc.replace(/\\u/g, "%u");
      return unescape(unescape(_0x5316fc));
    }
    RT(_0x55ce94, _0xbd3089) {
      return Math.round(Math.random() * (_0xbd3089 - _0x55ce94) + _0x55ce94);
    }
    arrNull(_0x11ef08) {
      var _0x39bf5b = _0x11ef08.filter(_0x8bd780 => {
        return _0x8bd780 && _0x8bd780.trim();
      });
      return _0x39bf5b;
    }
    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000);
    }
    timecs() {
      let _0x2faaee = $.nowtime();
      if (JSON.stringify(_0x2faaee).indexOf(" ") >= 0) {
        _0x2faaee = _0x2faaee.replace(" ", "T");
      }
      return new Date(_0x2faaee).getTime() - 28800000;
    }
    rtjson(_0xc7ec4d, _0x46cbf1, _0x531539, _0x20a599) {
      if (_0x20a599 == 0) {
        return JSON.stringify(_0xc7ec4d.split(_0x46cbf1).reduce((_0x3e9b9a, _0x3a3135) => {
          let _0x1969bb = _0x3a3135.split(_0x531539);
          _0x3e9b9a[_0x1969bb[0].trim()] = _0x1969bb[1].trim();
          return _0x3e9b9a;
        }, {}));
      } else {
        return _0xc7ec4d.split(_0x46cbf1).reduce((_0x234973, _0x3ca9e1) => {
          let _0x1fe6d7 = _0x3ca9e1.split(_0x531539);
          _0x234973[_0x1fe6d7[0].trim()] = _0x1fe6d7[1].trim();
          return _0x234973;
        }, {});
      }
    }
    MD5Encrypt(_0x5cbe5f, _0x194273) {
      if (_0x5cbe5f == 0) {
        return this.CryptoJS.MD5(_0x194273).toString().toLowerCase();
      } else if (_0x5cbe5f == 1) {
        return this.CryptoJS.MD5(_0x194273).toString().toUpperCase();
      } else if (_0x5cbe5f == 2) {
        return this.CryptoJS.MD5(_0x194273).toString().substring(8, 24).toLowerCase();
      } else if (_0x5cbe5f == 3) {
        return this.CryptoJS.MD5(_0x194273).toString().substring(8, 24).toUpperCase();
      }
    }
    SHA_Encrypt(_0x4e856d, _0x45573c, _0x5ef974) {
      if (_0x4e856d == 0) {
        return this.CryptoJS[_0x45573c](_0x5ef974).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x45573c](_0x5ef974).toString();
      }
    }
    HmacSHA_Encrypt(_0x424f88, _0x32fd1c, _0x3680b4, _0x5e8261) {
      if (_0x424f88 == 0) {
        return this.CryptoJS[_0x32fd1c](_0x3680b4, _0x5e8261).toString(this.CryptoJS.enc.Base64);
      } else {
        return this.CryptoJS[_0x32fd1c](_0x3680b4, _0x5e8261).toString();
      }
    }
    Base64(_0xd8b688, _0x437b40) {
      if (_0xd8b688 == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(_0x437b40));
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(_0x437b40));
      }
    }
    DecryptCrypto(_0x3244c3, _0x27b5b9, _0x44941d, _0x1de7c0, _0x31e3b1, _0x11beb4, _0x52d5cf) {
      if (_0x3244c3 == 0) {
        const _0x1a2140 = this.CryptoJS[_0x27b5b9].encrypt(this.CryptoJS.enc.Utf8.parse(_0x31e3b1), this.CryptoJS.enc.Utf8.parse(_0x11beb4), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x52d5cf),
          mode: this.CryptoJS.mode[_0x44941d],
          padding: this.CryptoJS.pad[_0x1de7c0]
        });
        return _0x1a2140.toString();
      } else {
        const _0x637641 = this.CryptoJS[_0x27b5b9].decrypt(_0x31e3b1, this.CryptoJS.enc.Utf8.parse(_0x11beb4), {
          iv: this.CryptoJS.enc.Utf8.parse(_0x52d5cf),
          mode: this.CryptoJS.mode[_0x44941d],
          padding: this.CryptoJS.pad[_0x1de7c0]
        });
        return _0x637641.toString(this.CryptoJS.enc.Utf8);
      }
    }
    RSA(_0x3f19dd, _0xee2d8a) {
      const _0x544db9 = require("node-rsa");
      let _0x33cf3e = new _0x544db9("-----BEGIN PUBLIC KEY-----\n" + _0xee2d8a + "\n-----END PUBLIC KEY-----");
      _0x33cf3e.setOptions({
        encryptionScheme: "pkcs1"
      });
      return _0x33cf3e.encrypt(_0x3f19dd, "base64", "utf8");
    }
    SHA_RSA(_0x5ab075, _0x4ea6ed) {
      let _0x1095a0 = this.Sha_Rsa.KEYUTIL.getKey("-----BEGIN PRIVATE KEY-----\n" + $.getNewline(_0x4ea6ed, 76) + "\n-----END PRIVATE KEY-----");
      let _0x70aede = new this.Sha_Rsa.KJUR.crypto.Signature({
        alg: "SHA256withRSA"
      });
      _0x70aede.init(_0x1095a0);
      _0x70aede.updateString(_0x5ab075);
      let _0x58f4bf = _0x70aede.sign();
      let _0x2df3ce = this.Sha_Rsa.hextob64u(_0x58f4bf);
      return _0x2df3ce;
    }
    getNewline(_0x55add7, _0x3188a0) {
      let _0x363827 = new String(_0x55add7);
      let _0x560bb0 = 0;
      let _0xae4a72 = "";
      for (let _0x575db6 = 0, _0x2de8eb = _0x363827.length; _0x575db6 < _0x2de8eb; _0x575db6++) {
        let _0x8e5ea5 = _0x363827.charCodeAt(_0x575db6);
        if (_0x8e5ea5 >= 1 && _0x8e5ea5 <= 126 || _0x8e5ea5 >= 65376 && _0x8e5ea5 <= 65439) {
          _0x560bb0 += 1;
        } else {
          _0x560bb0 += 2;
        }
        _0xae4a72 += _0x363827.charAt(_0x575db6);
        if (_0x560bb0 >= _0x3188a0) {
          _0xae4a72 = _0xae4a72 + "\n";
          _0x560bb0 = 0;
        }
      }
      return _0xae4a72;
    }
  }();
}