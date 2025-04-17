import userModel from "./user.model.js";
import { hash } from "bcrypt";


class UserService {
  constructor(){
    this.userModel = userModel;
  }

  createUser = async (username, email ,password, confirm_password) => {

    if(password !== confirm_password){
      return "The passwords are not the same"
    }
    
    const foundUsername = await this.userModel.findOne({ username });

    if(foundUsername){
      return `Username ${username} already exists`
    }
    const foundEmail = await this.userModel.findOne({ email });
    
    if(foundEmail){
      return `Email ${email} already exists`
    }

    const hashPassword = await hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashPassword,
    });

    return {
      message: "ok",
      data: user
    }
  }
}

export default new UserService();