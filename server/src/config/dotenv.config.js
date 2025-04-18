import { config } from "dotenv";

config()

export default {
  APP_PORT: process.env.APP_PORT,
  mongodbUrl: process.env.MONGODB_URL,
  ACCESSTOKEN_SECRET_KEY: process.env.ACCESSTOKEN_SECRET_KEY,
  ACCESSTOKEN_SECRET_TIME: process.env.ACCESSTOKEN_SECRET_TIME,
  REFRESHTOKEN_SECRET_KEY: process.env.REFRESHTOKEN_SECRET_KEY,
  REFRESHTOKEN_SECRET_TIME: process.env.REFRESHTOKEN_SECRET_TIME,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS
}