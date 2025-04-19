import Joi from "joi";



export const createCourseSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  language: Joi.string().trim().required(),
  select_Category: Joi.string().trim().required(),
  course_Level: Joi.string().trim().required()
}).required();
