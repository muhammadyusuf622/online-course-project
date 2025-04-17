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

  getUser = async (req, res, next) => {
    try {
      
      res.send("salom");
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController();