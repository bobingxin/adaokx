var log4js = require('log4js');
var logger = log4js.getLogger();

function info(msg, data) {
  logger.info(msg, data);
}

function error(msg, data) {
  logger.error(msg, data);
}
module.exports = {
  info,
  error,
};
