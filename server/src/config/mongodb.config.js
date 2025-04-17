import mongoose from "mongoose"
import dotenvConfig from "./dotenv.config.js";

export const connectDb = async () => {
  try {
    await mongoose.connect(dotenvConfig.mongodbUrl);
    console.log("mongodbga mufoqyatli ulandi ✅");
  } catch (error) {
    console.log("mongodbga ulanishda xatolik ❌");
    console.log(error)
  }
}