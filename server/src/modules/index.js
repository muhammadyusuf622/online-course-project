import { Router } from "express";
import userRouter from "./users/user.router.js";
import categoryRouter from "./categories/category.router.js";
import courseRouter from "./courses/course.router.js";
import lessonRouter from "./lessons/lesson.router.js";



const router = Router();


router.use('/user',userRouter);
router.use("/category", categoryRouter);
router.use("/course", courseRouter);
router.use("/lesson", lessonRouter);

export default router;