import Joi from "joi";

export const createLessonDtos = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  orderNumber: Joi.string().required().trim(),
  courseTitle: Joi.string().trim().required(),
  duration: Joi.string().trim().required()
}).required()