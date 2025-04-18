import { Router } from "express";
import categoryController from "./category.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";



const categoryRouter = Router()


categoryRouter.get("/getAllCategory", authMiddleware, categoryController.getAllCategory);


export default categoryRouter;