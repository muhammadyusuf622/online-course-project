import express from  "express"
import cors from "cors"
import errorMiddleware from "./middleware/error.middleware.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
// import morgan from "morgan"
import router from "./modules/index.js";
import ErrorHandler from "./utils/ErrorHandler.utils.js";
import path from "path"
import dotenvConfig from "./config/dotenv.config.js";

const app = express()


// if(process.env.NODE_ENV?.trim() === 'development'){
//   app.use(morgan('tiny'));
// }


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.use(cors({
  origin: `${dotenvConfig.FRONT_DOMEN}4000`,
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello Tamerlane Teach testttttt")
});

app.get('/favicon.ico', (req, res) => res.status(204).end());


app.use('/api',router);


app.all("/*splat", (req, res, next) => {
  throw new ErrorHandler(404, "Page Not Found")
});

app.use(errorMiddleware)

export default app;
