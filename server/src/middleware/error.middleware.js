import logger from "../config/winston.config.js";

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";


  
  console.log(`[ERROR] ${statusCode}, - ${message}`);

  logger.error(`${req.method} ${req.url}, - ${message}`);
  console.log(err)
  res.json({
    message: message
  });
};

export default errorMiddleware;