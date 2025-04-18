import nodemailer from "nodemailer";
import dotenvConfig from "./dotenv.config.js";

const transporter = nodemailer.createTransport({
  host: dotenvConfig.SMTP_HOST,
  port: dotenvConfig.SMTP_PORT,  
  secure: false,                
  auth: {
    user: dotenvConfig.SMTP_USER,
    pass: dotenvConfig.SMTP_PASS,
  },
});

export default transporter;
