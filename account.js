const Okx = require('./okx');
class Account extends Okx {
  async config() {
    return await this.http('get', '/api/v5/account/config', {});
  }
}

module.exports = Account;
