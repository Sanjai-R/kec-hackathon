import bookingSchema from "../../models/booking.schema.js";
import hallSchema from "../../models/hall.schema.js";
import userSchema from "../../models/user.schema.js";
import mongoose from "mongoose";
import moment from "moment";

export const getDataByDate = async (req, res) => {
    const { user_id } = req.query;
    const user = await userSchema.findById(user_id);
    if (!user) {
        return res.send({ status: false, desc: "User not found" });
    }
    const role = user.role.collection;
    let date = moment().format("YYYY-MM-DD");
    console.log(date)
    if (role === "s-admin") {
        const existingBooking = await bookingSchema.find({
            "schedule.date": new Date(date),
        });
        const listOfHalls = await hallSchema.find()
        let arr = [];
        const list = listOfHalls.map((e) => e._id.toString())
        const pr = []

        await existingBooking.map(async (item) => {
            {

                const index = list.indexOf(item.requested_hall.toString());
                if (index > -1) { // only splice array when item is found
                    list.splice(index, 1); // 2nd parameter means remove one item only
                }

            }
        });
        let usedHalls = [];
        for (let i = 0; i < existingBooking.length; i++) {
            const temp = await hallSchema.findById(existingBooking[i].requested_hall).populate("incharge");
            usedHalls.push(temp)
        }
        for (let i = 0; i < list.length; i++) {
            const id = mongoose.Types.ObjectId(list[i]);
            const temp = await hallSchema.findById(id).populate("incharge")
            arr.push({ ...temp, period: pr[i] })
        }
        const unusedHalls = arr.map((item) => ({ ...item._doc, period: item.period }));

        res.send({ status: true, data: { usedHalls,unusedHalls } });
    }

};
