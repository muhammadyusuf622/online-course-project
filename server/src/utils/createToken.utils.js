import jwt from "jsonwebtoken"
import dotenvConfig from "../config/dotenv.config.js"

/**
 * Foydalanuvchi uchun access va refresh tokenlar yaratadi va cookie sifatida brauzerga yuboradi.
 * 
 * @param {{ id: string, username: string, role: string }} user - Foydalanuvchi ma'lumotlari
 * @param {import("express").Response} res - Express Response obyekti
 */

const createTokenAndSetcookie = (user, res) => {
  const accessToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    dotenvConfig.ACCESSTOKEN_SECRET_KEY,
    { expiresIn: dotenvConfig.ACCESSTOKEN_SECRET_TIME }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    dotenvConfig.REFRESHTOKEN_SECRET_KEY,
    { expiresIn: dotenvConfig.REFRESHTOKEN_SECRET_TIME }
  );

  const accessMaxAge = 24 * 60 * 60 * 1000;
  const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessMaxAge
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: refreshMaxAge
  });
};

export default createTokenAndSetcookie;
