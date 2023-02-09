import mongoose from "mongoose";
import userModel from "../../models/user.schema.js";
import { verifyPassword } from "../../utils/hashing.js";
import { generateToken } from "../../utils/auth.js";
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    console.log(user);
    return res.json({
      status: false,
      data: null,
      desc: "no user found",
    });
  }

  const isMatch = await verifyPassword(password, user.password);

  if (isMatch) {
    const token = generateToken(email);
    return res.json({
      status: true,
      data: await userModel.findOne({ email }).select("-password"),
      token,
    });
  }
  res.json({
    status: false,
    data: null,
    desc: "invalid password",
  });
};

export default loginController;
