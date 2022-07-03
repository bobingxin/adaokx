const Okx = require("./okx")
class Transcation extends Okx {
  /**
   * 市价下单
   * @param {string} instId 产品ID
   * @param {string} clOrdId 客户订单号
   * @param {string} side 订单方向 buy：买 sell：卖
   * @param {string} posSide 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
   * @param {string} sz 委托数量: 当交割、永续、期权买入和卖出时，指合约张数
   * @returns
   */
  async order(instId, clOrdId, side, posSide, sz) {
    return await this.http("post", "/api/v5/trade/order", {
      instId: instId, // 产品ID
      tdMode: "isolated", // 保证金模式：isolated：逐仓 ；cross：全仓
      clOrdId: clOrdId, // 客户订单号
      side: side, // 订单方向 buy：买 sell：卖
      posSide: posSide, // 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
      ordType: "optimal_limit_ioc", // 市价委托立即成交并取消剩余（仅适用交割、永续）
      sz: sz, // 委托数量
    })
  }

  /**
   * 双向止盈止损条件下单
   * @param {string} instId 产品ID
   * @param {string} side 订单方向 buy：买 sell：卖
   * @param {string} posSide 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
   * @param {string} sz 委托数量: 当交割、永续、期权买入和卖出时，指合约张数
   * @param {string} tpTriggerPx 止盈触发价
   * @param {string} slTriggerPx 止损触发价
   * @returns
   */
  async orderAlgoOCO(instId, side, posSide, sz, tpTriggerPx, slTriggerPx) {
    return await this.http("post", "/api/v5/trade/order-algo", {
      instId: instId, // 产品ID
      tdMode: "isolated", // 保证金模式：isolated：逐仓 ；cross：全仓
      side: side, // 订单方向 buy：买 sell：卖
      posSide: posSide, // 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
      ordType: "oco", // oco：双向止盈止损
      sz: sz, // 委托数量
      tpTriggerPx: tpTriggerPx, // 止盈触发价
      tpTriggerPxType: "last", // 止盈触发价类型 last：最新价格
      tpOrdPx: "-1", // 止盈触发价, 委托价格为-1时，执行市价止盈
      slTriggerPx: slTriggerPx, // 止损触发价
      slTriggerPxType: "last", // 止损触发价类型 last：最新价格
      slOrdPx: "-1", // 止损触发价, 委托价格为-1时，执行市价止损
    })
  }
}

module.exports = Transcation
