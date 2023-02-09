import userSchema from "../../models/user.schema.js";

const getUserByMail = async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.send({ status: false, data: null, desc: "data missing" })
    } else {
        const user = await userSchema.findOne({ email });
        if (user === null) {
            res.send({ status: false, data: null, desc: "No user found" });
        } else {
            res.send({ status: true, data: user });
        }
    }
}

export default getUserByMail;