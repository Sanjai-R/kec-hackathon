import jwt from "jsonwebtoken";
import userModel from "../models/user.schema.js";

export const generateToken = (email) => {
  return jwt.sign({ email }, "secret");
};
export const verifyToken = async (req, res, next) => {
  const { email } = req.body;

  const auth = req.headers["authorization"];
  if (auth) {
    if (auth === "Bearer null") {
    } else {
      const token = auth.split(" ")[1];
      try {
        const decoded = jwt.verify(token, "secret");

        const user = await userModel.findOne({ email }).exec();
        if (user != null) {
          next();
        } else {
          return res.send({
            status: false,
            code: 404,
            message: "Not founded",
          });
        }
      } catch (err) {
        console.log(err);
        return res.send({
          status: false,
          code: 401,
          message: "Unauthorized ",
        });
      }
    }
  } else {
    return res.send({
      status: false,
      code: 401,
      message: "Unauthorized ",
    });
  }
};
