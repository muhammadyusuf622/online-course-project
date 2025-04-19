import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import courseController from "./course.controller.js";
import { createCourseSchema } from "./dios/course.dtos.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";


const courseRouter = Router()


courseRouter.post("/createCourse", authMiddleware, upload.single('courseImg'), ValidationMiddleware(createCourseSchema), courseController.createCourse)
.get("/getByIdcategory", authMiddleware, courseController.getByIdCategory)

export default courseRouter;