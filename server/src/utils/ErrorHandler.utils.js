
class ErrorHandler extends Error {
  constructor(statusCode, message){
    super(message)
    this.statusCode = statusCode;

    Error.captureStackTrace(this, constructor);
  }
};

export default ErrorHandler;