const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
