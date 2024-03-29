const { default: axios } = require("axios");
const log = require("./log");
const crypto = require("crypto");
const OkxError = require("./error/okx");
const appjson = "application/json";
class Okx {
  constructor(apikey, secretkey, passphrase, options = {}) {
    this.baseURL = options.sanbox
      ? "https://www.okx.com"
      : "https://www.okx.com";
    this.apikey = apikey;
    this.secretkey = secretkey;
    this.passphrase = passphrase;
    this.options = options;
  }

  /**
   * 生成头部信息
   * @param {string} method 访问类型，GET/POST
   * @param  {string} path 访问路径
   * @param  {{}} params GET和POST提交的数据
   * @returns {Object}
   */
  getHeaders(method, path, params = {}) {
    let _time = this.timestamp();
    let _sign;
    if (method === "GET") {
      let arr = [];
      for (const item of Object.keys(params)) {
        arr.push(`${item}=${params[item]}`);
      }
      _sign = this.signHttp(
        _time + method + path + (arr.length ? "?" + arr.join("&") : "")
      );
    } else {
      _sign = this.signHttp(_time + method + path + JSON.stringify(params));
    }
    const headers = {
      Accept: appjson,
      "Content-Type": appjson,
      "OK-ACCESS-KEY": this.apikey,
      "OK-ACCESS-SIGN": _sign,
      "OK-ACCESS-TIMESTAMP": _time,
      "OK-ACCESS-PASSPHRASE": this.passphrase,
      "x-simulated-trading": 1,
    };
    if (this.options.env && this.options.env == "production") {
      delete headers["x-simulated-trading"];
    }
    return headers;
  }

  /**
   * 返回当前IOS时间
   * @returns {string}
   */
  timestamp() {
    return new Date().toISOString();
  }

  /**
   * 签名操作
   * @param {string} str 签名的字符串
   * @returns {string}
   */
  signHttp(str) {
    return crypto
      .createHmac("sha256", this.secretkey)
      .update(str)
      .digest("base64");
  }

  async http(method, path, params) {
    method = method.toUpperCase();
    let options = Object.assign(
      {
        baseURL: this.baseURL,
        url: path,
        method: method,
      },
      { headers: this.getHeaders(method, path, params) }
    );
    Object.assign(
      options,
      method === "GET" ? { params: params } : { data: params }
    );
    let res = await axios(options);
    if (res.data.code === "0") {
      return res.data.data;
    } else {
      log.error("order_fail", res.data.data);
      throw new OkxError(res.data.msg, res.data.data);
    }
  }
}

module.exports = Okx;
