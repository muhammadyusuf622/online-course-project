import { Router } from "express";
import userRouter from "./users/user.router.js";



const router = Router();


router.use('/createUser',userRouter);

export default router;