import ErrorHandler from "../utils/ErrorHandler.utils.js";


export const ValidationMiddleware = (schema) => {
  return async (req, res, next ) => {
    try {
      const {error, value} = schema.validate(req.body);

      if(error) {
        throw new ErrorHandler(400, error.message);
      }
  
      next();
    } catch (error) {
      next(error);
    }
  };
};