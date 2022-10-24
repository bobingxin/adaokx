const Transcation = require("../transaction");
const okxData = require("../testdata");
const moment = require("moment");

test("test_order", async () => {
  const transaction = new Transcation(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );
  const cusOrderNumber = moment().valueOf();
  console.log(cusOrderNumber);
  const orderInfo = await transaction.order({
    instId: "ETH-USDT-SWAP", // 产品ID
    tdMode: "cross", // 保证金模式：isolated：逐仓 ；cross：全仓
    clOrdId: cusOrderNumber, // 客户订单号
    side: "buy", // 订单方向 buy：买 sell：卖
    posSide: "long",
    ordType: "market", // 市价委托立即成交并取消剩余（仅适用交割、永续）
    tag: "0c4bc633283dBCDE",
    sz: 10, // 委托数量'
  });
  console.log(orderInfo);
});

test("order_info", async () => {
  const transaction = new Transcation(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );

  const orderInfo = await transaction.orderInfo({
    instId: "ETH-USDT-SWAP",
    clOrdId: "1657331653792",
  });
  console.log(orderInfo);
});

test("order_algo", async () => {
  const transaction = new Transcation(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );

  const algoRes = await transaction.orderAlgo({
    instId: "ETH-USDT-SWAP", // 产品ID
    tdMode: "cross", // 保证金模式：isolated：逐仓 ；cross：全仓
    side: "sell", // 订单方向 buy：买 sell：卖
    posSide: "long", // 持仓方向 在双向持仓模式下必填，且仅可选择 long 或 short
    ordType: "oco", // oco：双向止盈止损
    sz: 10, // 委托数量
    tag: "0c4bc633283dBCDE",
    tpTriggerPx: "1400", // 止盈触发价
    tpTriggerPxType: "last", // 止盈触发价类型 last：最新价格
    tpOrdPx: "-1", // 止盈触发价, 委托价格为-1时，执行市价止盈
    slTriggerPx: "1300", // 止损触发价
    slTriggerPxType: "last", // 止损触发价类型 last：最新价格
    slOrdPx: "-1", // 止损触发价, 委托价格为-1时，执行市价止损
  });
  console.log(algoRes);
});
//504774100720680960
test("order_cancel_algo", async () => {
  const transaction = new Transcation(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );
  try {
    const cancelRes = await transaction.cancelAlgos([
      {
        instId: "ETH-USDT-SWAP", // 产品ID
        algoId: "504774100720680960", // 保证金模式：isolated：逐仓 ；cross：全仓
      },
    ]);
  } catch (e) {
    console.log(e);
  }
});
