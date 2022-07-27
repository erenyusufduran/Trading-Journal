const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) => {
  const statusCode = StatusCodes.NOT_FOUND;
  res.status(statusCode).send("Route doesn't exist.");
};

module.exports = notFoundMiddleware;
