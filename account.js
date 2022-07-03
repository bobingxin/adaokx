const Okx = require('./okx');
class Account extends Okx {
  async config() {
    return await this.http('get', '/api/v5/account/config', {});
  }

  async setLeverage(data = {}) {
    return await this.http('post', '/api/v5/account/set-leverage', data);
  }

  async setLeverage() {
    return await this.http('get', '/api/v5/account/leverage-info', {});
  }
}

module.exports = Account;
