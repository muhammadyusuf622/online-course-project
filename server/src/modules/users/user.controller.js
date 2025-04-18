import createTokenAndSetcookie from "../../utils/createToken.utils.js";
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
}

export default new UserController();