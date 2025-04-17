import { config } from "dotenv";

config()

export default {
  APP_PORT: process.env.APP_PORT,
  mongodbUrl: process.env.MONGODB_URL,
  ACCESSTOKEN_SECRET_KEY: process.env.ACCESSTOKEN_SECRET_KEY,
  ACCESSTOKEN_SECRET_TIME: process.env.ACCESSTOKEN_SECRET_TIME,
  REFRESHTOKEN_SECRET_KEY: process.env.REFRESHTOKEN_SECRET_KEY,
  REFRESHTOKEN_SECRET_TIME: process.env.REFRESHTOKEN_SECRET_TIME
}