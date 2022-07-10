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
