import app from "./app.js";
import PORT from "./config/app.config.js";
import { connectDb } from "./config/mongodb.config.js";
import checkDisk from "./utils/checkDiskSpace.utils.js";

await connectDb();

setInterval(() => {
  checkDisk()
}, 10 * 60 * 1000);

app.listen(PORT,(err) => {
  if (err) console.log(err);
  console.log(`http://localhost:${PORT}`);
});