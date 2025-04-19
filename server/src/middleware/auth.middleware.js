import jwt from "jsonwebtoken"
import dotenvConfig from "../config/dotenv.config.js"


export const authMiddleware = (req, res, next) => {

  const {refreshToken, accessToken} = req.cookies;

    if (accessToken && refreshToken) {
      try {
        const decoded = jwt.verify(accessToken, dotenvConfig.ACCESSTOKEN_SECRET_KEY);
        req.user = decoded;
        return next()
      } catch (err) {
        console.log("Access token yaroqsiz ❌");
      }
    }
        if (refreshToken && !accessToken){
          try {
            const decoded = jwt.verify(refreshToken, dotenvConfig.REFRESHTOKEN_SECRET_KEY);
    
            const newAccessToken = jwt.sign(
              { id: decoded.id, username: decoded.username, role: decoded.role },
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
            
            req.user = decoded;
            return next()
          } catch (error) {
            return res.send({
              message: "goLogin",
            });
          }
        }

        res.send({
          message: "goLogin"
        });
}

