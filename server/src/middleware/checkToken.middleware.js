import dotenvConfig from "../config/dotenv.config.js";
import jwt from "jsonwebtoken"


export const checkTokenMiddleware = (req, res, next) => {

    const {refreshToken, accessToken} = req.cookies;
  
    if (accessToken && refreshToken) {
      try {
        jwt.verify(accessToken, dotenvConfig.ACCESSTOKEN_SECRET_KEY);
        return res.send({
          message: "ok",
        });
      } catch (err) {
        console.log("Access token yaroqsiz ❌");
      }
    }

    if (refreshToken && !accessToken){
      try {
        const decoded = jwt.verify(refreshToken, dotenvConfig.REFRESHTOKEN_SECRET_KEY);

        const newAccessToken = jwt.sign(
          { id: decoded.Id, username: decoded.username, role: decoded.role },
          dotenvConfig.ACCESSTOKEN_SECRET_KEY,
          { expiresIn: dotenvConfig.ACCESSTOKEN_SECRET_TIME }
        );

          const newRefreshToken = jwt.sign(
            { id: decoded.id, username: decoded.username, role: decoded.role },
            dotenvConfig.REFRESHTOKEN_SECRET_KEY,
            { expiresIn: dotenvConfig.REFRESHTOKEN_SECRET_TIME }
          );

        const accessMaxAge = 24 * 60 * 60 * 1000;
        const refreshMaxAge = 7 * 24 * 60 * 60 * 1000;

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: accessMaxAge
        });
      
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: refreshMaxAge
        });

        return res.send({
          message: "ok"
        });
      } catch (error) {
        return res.send({
          message: "error",
        });
      }
    }

    res.send({
      message: 'error'
    });
}