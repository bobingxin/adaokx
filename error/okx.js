class OkxError extends Error {
  constructor(name, data) {
    this.name = name;
    this.message = JSON.stringify(data);
  }
}
