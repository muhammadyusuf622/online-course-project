import Joi from "joi";


export const userRegisterSchema = Joi.object({
  username: Joi.string().min(4).max(24).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
}).required().unknown(true);

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
}).required();

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
}).required()

export const createNewPassword = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(10).required(),
})