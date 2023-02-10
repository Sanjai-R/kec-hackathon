import { hashPassword } from "../../utils/hashing.js";
import { generateToken } from "../../utils/auth.js";
import userModel from "../../models/user.schema.js";
const signupController = async (req, res) => {
  const { name, password, contact, email, role } = req.body;
  if (!name || !password || !contact || !email) {
    res
      .status(500)
      .send({ status: false, message: "Please fill required fields" });
  }
  const existingUser = await userModel.find({ email });

  if (existingUser.length > 0) {
    return res.json({
      status: false,
      desc: "Email already exist",
    });
  }
  const hashedPassword = await hashPassword(password);
  const token = await generateToken(email);
  const register = new userModel({
    name,
    password: hashedPassword,
    contact,
    email,
    role,
  });
  await register
    .save()
    .then(async (user) => {
      if (user) {
        const token = generateToken(email);
        return res.json({
          status: true,
          data: await userModel.findOne({ email }).select("-password"),
          token,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.json({
        status: false,
        desc: "Something Went Wrong. Try After Few Minutes",
      });
    });
};
export default signupController;
