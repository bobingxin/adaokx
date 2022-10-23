const Okx = require("./okx");
class Transcation extends Okx {
  /**
   * 下单
   * @param {Object} data
   * @returns
   */
  async order(data = {}) {
    return await this.http("post", "/api/v5/trade/order", data);
  }

  /**
   * 策略委托下单
   * @returns
   */
  async orderAlgo(data = {}) {
    return await this.http("post", "/api/v5/trade/order-algo", data);
  }

  /**
   * 获取订单信息
   */
  async orderInfo(data) {
    return await this.http("get", "/api/v5/trade/order", data);
  }

  /**
   * 一件平仓功能
   * @param {*} data
   * @returns
   */
  async closePosition(data = {}) {
    return await this.http("post", "/api/v5/trade/close-position", data);
  }

  /**
   * 取消委托
   * @returns
   */
  async cancelAlgos(data = {}) {
    return await this.http("post", "/api/v5/trade/cancel-algos", data);
  }
}

module.exports = Transcation;
