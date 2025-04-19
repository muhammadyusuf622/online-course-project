import createTokenAndSetcookie from "../../utils/createToken.utils.js";
import ErrorHandler from "../../utils/ErrorHandler.utils.js";
import userService from "./user.service.js";


class UserController {
  #_service;
  constructor(){
    this.#_service = userService
  }

  createUser = async (req, res, next) => {
    try {
      const {username, email ,password, confirm_password} = req.body;

      const data = await this.#_service.createUser(username, email ,password, confirm_password);

      if(data.message == "ok"){
        createTokenAndSetcookie(data.data, res);
      }

      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  userLogin = async (req,res, next) => {
    try {
      const {email, password} = req.body;

      const data = await this.#_service.userLogin(email, password);

      if(data.message == "ok"){
        createTokenAndSetcookie(data.data, res)
      }

      res.send(data);

    } catch (error) {
      next(error)
    }
  }

  forgotPassword = async (req, res, next) => {
    try {
      const {email} = req.body;

      const data = await this.#_service.forgotPassword(email);

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  createNewPassword = async (req, res, next) => {
    try {
      const {email, password} = req.body

      const data = await this.#_service.createNewPassword(email, password);

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  profilImg = async (req, res, next) => {
    try {
      const { file } = req;
      const  userId  = req.user?.id;
  
      if (!file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const imageUrl = file.path;
  
      const data = await this.#_service.profilImg(userId, imageUrl);
  
      res.send(data);
  
    } catch (error) {
      next(error);
    }
  }

  getByidUSer = async (req, res, next) => {
    try {
      const  userId  = req.user?.id;

      console.log(req.user)

      const data = await this.#_service.getByIdUser(userId);

      res.send(data);

    } catch (error) {
      next(error)
    }
  }

  updateUserBio = async (req, res, next) => {
    try {
      const  userId  = req.user?.id;
      const { bio } = req.body;

      if(!bio.trim()){
        throw new ErrorHandler(404, "Bio Not Found");
      }

      const data = await this.#_service.updateUserBio(userId, bio);

      res.send(data);
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();