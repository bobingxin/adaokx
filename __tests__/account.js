const Account = require("../account");
const okxData = require("../testdata");

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
