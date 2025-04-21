import logger from "../config/winston.config.js";

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.json({
      message: `${field} already exists! Please choose a different value.`
    });
  }

  console.log(`[ERROR] ${statusCode}, - ${message}`);

  logger.error(`${req.method} ${req.url}, - ${message}`);
  
  res.json({
    message: message
  });
};

export default errorMiddleware;
