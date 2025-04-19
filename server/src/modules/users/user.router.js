import { Router } from "express";
import userController from "./user.controller.js";
import { ValidationMiddleware } from "../../middleware/validation.middleware.js";
import { createNewPassword, forgotPasswordSchema, userLoginSchema, userRegisterSchema } from "./dtos/user.dtos.js";
import { checkTokenMiddleware } from "../../middleware/checkToken.middleware.js";
import upload from "../../middleware/upload.middleware.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";



const userRouter = Router();

userRouter.post('/register', ValidationMiddleware(userRegisterSchema), userController.createUser)
.post("/login", ValidationMiddleware(userLoginSchema), userController.userLogin)
.post("/forgotPassword", ValidationMiddleware(forgotPasswordSchema), userController.forgotPassword)
.post("/createNewPassword", ValidationMiddleware(createNewPassword), userController.createNewPassword)
.post("/checkToken", checkTokenMiddleware)
.put("/profilImg", authMiddleware ,upload.single("profileImg"), userController.profilImg)
.get("/getByIdUser", authMiddleware, userController.getByidUSer)
.put("/updateBio", authMiddleware, userController.updateUserBio)


export default userRouter;