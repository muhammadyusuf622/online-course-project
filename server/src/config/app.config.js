import dotenvConfig from "./dotenv.config.js";


const PORT = parseInt(dotenvConfig.APP_PORT, 10) || 5000;

export default PORT;