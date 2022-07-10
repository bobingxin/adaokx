const Account = require("../account");
const okxData = require("../testdata");
const moment = require("moment");
test("test blance", async () => {
  const account = new Account(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );
  const balanceData = await account.balance({ ccy: "USDT" });
  console.log(balanceData[0].details);
  expect(balanceData.length).toBe(1);
});

test("test_position_history", async () => {
  const account = new Account(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );

  const history = await account.positionsHistory({
    instId: "ETH-USDT-SWAP",
    instType: "SWAP",
    limit: 5,
  });
  const nHistory = history.map((item) => {
    return {
      ...item,
      createTime: moment.unix(item.cTime / 1000).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  console.log(nHistory);
});

//462529618719932418
test("positon1_test", async () => {
  const account = new Account(
    okxData.apikey,
    okxData.secretkey,
    okxData.passphrase
  );

  const positions = await account.positions({
    instId: "ETH-USDT-SWAP",
    instType: "SWAP",
  });
  const mPos = positions.map((item) => {
    return {
      ...item,
      createTime: moment.unix(item.cTime / 1000).format("YYYY-MM-DD HH:mm:ss"),
    };
  });
  console.log(mPos);
});
