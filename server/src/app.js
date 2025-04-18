import express from  "express"
import cors from "cors"
import errorMiddleware from "./middleware/error.middleware.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
// import morgan from "morgan"
import router from "./modules/index.js";
import ErrorHandler from "./utils/ErrorHandler.utils.js";

const app = express()


// if(process.env.NODE_ENV?.trim() === 'development'){
//   app.use(morgan('tiny'));
// }


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors({
  origin: "http://localhost:4000",
  credentials: true
}));

app.use('/api',router);



app.all("/*splat", (req, res, next) => {
  throw new ErrorHandler(404, "Page Not Found")
});

app.use(errorMiddleware)

export default app;