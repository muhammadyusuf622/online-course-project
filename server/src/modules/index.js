import { Router } from "express";
import userRouter from "./users/user.router.js";
import categoryRouter from "./categories/category.router.js";



const router = Router();


router.use('/user',userRouter);
router.use("/category", categoryRouter)

export default router;