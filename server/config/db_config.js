import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
mongoose.set('strictQuery', false);
const connection = mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("DB Connected "))
  .catch((e) => console.log(e));
export default connection;
