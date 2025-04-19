import PORT from "../../config/app.config.js";
import sendMail from "../../utils/mail.utils.js";
import userModel from "./user.model.js";
import { compare, hash } from "bcrypt";



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
      return {message: `Username ${username} already exists`}
    }
    const foundEmail = await this.userModel.findOne({ email });
    
    if(foundEmail){
      return {message: `Email ${email} already exists`};
    }

    const hashPassword = await hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashPassword,
    });

    await sendMail({
      to: email,
      subject: "Welcome to Tamerlane Teach 🎉",
      text: `Welcome to Tamerlane Teach!
    
    We’re thrilled to have you join our growing learning community.
    
    Explore new courses, share your knowledge, and become part of a global network of learners and educators.
    
    Let's start your journey together!
    
    Best regards,  
    Tamerlane Teach Team`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2e7d32;">Welcome to <span style="color: #1976d2;">Tamerlane Teach</span> 🎉</h2>
          <p>We’re <strong>thrilled</strong> to have you join our growing learning community.</p>
          <p>🚀 Explore new courses, 📚 share your knowledge, and 🌍 connect with learners and educators worldwide.</p>
          <p style="margin-top: 20px;">Let’s start your journey together!</p>
          <p style="color: #555; margin-top: 30px;">Best regards,<br/><strong>Tamerlane Teach Team</strong></p>
        </div>
      `,
    });
    

    return {
      message: "ok",
      data: user
    }
  }

  userLogin = async (email, password) => {
    
    const foundUser = await this.userModel.findOne({ email });

    if(!foundUser){
      return {message: "This email is not registered"};
    }

    const isMatch = await compare(password, foundUser.password);
    if(!isMatch){
      return {message: "Incorrect password"};
    }

    return {
      message: "ok",
      data: foundUser
    }
  }

  forgotPassword = async (email) => {
    
    const founduser = await this.userModel.findOne({ email });

    if(!founduser){
      return {message: "no such user found"}
    }

    const password = Date.now().toString().slice(7);

    await sendMail({
      to: email,
      subject: "Tamerlane Teach",
      text: `Enter This Code Into The Tamerlane Teach Platform`,
      html: `<h3>${password} </h3>`

    });

    return {
      message: "ok",
      password: password
    }
  }

  createNewPassword = async (email, password) => {

    const hashPassword = await hash(password, 10);
    await this.userModel.updateOne({email}, {$set: { password: hashPassword }});


    return {
      message: "ok"
    }
  }

  profilImg = async (userId, imageUrl) => {
    
    const dataAll = await this.userModel.findByIdAndUpdate(userId,{ profil_image: imageUrl}, { new: true });

    const data = dataAll.toObject();
    if (!data) {
      return { message: "User not found" };
    }

    data.profil_image = `http://localhost:${PORT}${data.profil_image.split("server")[1]}`;

    return{
      message: "ok",
    }
  }

  getByIdUser = async (userId) => {

    const dataAll = await this.userModel.findById(userId);

    if(!dataAll){
      return { message: "userId not found" };
    }

    const data = dataAll.toObject();


    if(!data){
      return { message: "userId not found" };
    }

    data.createdAt = data.createdAt.toISOString().split("T")[0];
    data.profil_image = `http://localhost:${PORT}${data.profil_image.split("server")[1]}`;

    return {
      message: "ok",
      data: data
    }
  }

  updateUserBio = async (userId, newBio) => {

    await this.userModel.findByIdAndUpdate( userId, {bio: newBio}, { new: true });

    return {
      message: "ok"
    }
  }
}

export default new UserService();