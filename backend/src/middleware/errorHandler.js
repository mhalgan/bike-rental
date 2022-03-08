const logger = require("../config/winston");
const { getReasonPhrase } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let logError;

  const { url, method, params, query, headers, body } = req;
  const { statusCode } = res;

  // Filter relevant request fields
  if (err) {
    logError = {
      url,
      method,
      params,
      query,
      headers,
      body,
      statusCode,
      statusMessage: getReasonPhrase(statusCode),
      error: err,
    };
  }

  if (res.statusCode >= 400 && res.statusCode <= 499) {
    logger.warn(logError);
  } else if (res.statusCode >= 500 && res.statusCode <= 599) {
    logger.error(logError);
  }

  return res.json({ error: err });
};

module.exports = errorHandler;
