class OkxError extends Error {
  constructor(name, data) {
    super();
    this.name = name;
    this.message = JSON.stringify(data);
  }
}
module.exports = OkxError;
