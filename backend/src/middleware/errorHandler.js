const logger = require("../config/winston");
const { getReasonPhrase } = require("http-status-codes");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let logError;

  if (res.statusCode >= 200 && res.statusCode <= 299) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  const { url, method, params, query, headers, body } = req;
  const { statusCode } = res;

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
