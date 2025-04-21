import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import lessonController from "./lesson.controller.js";
import upload from "../../middleware/upload.middleware.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { createLessonDtos } from "./dtos/lesson.dtos.js";


const lessonRouter = Router();


lessonRouter.post("/createLesson", authMiddleware, upload.single("media"), ValidationMiddleware(createLessonDtos), lessonController.createLesson)
.post("/getLessonByTitle", authMiddleware, lessonController.getLessonByTitle)


export default lessonRouter;