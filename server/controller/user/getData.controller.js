import bookingSchema from "../../models/booking.schema.js";
import hallSchema from "../../models/hall.schema.js";
import userSchema from "../../models/user.schema.js";
import mongoose from "mongoose";
import moment from "moment";
import bookings from "../../models/booking.schema.js";
import hall from "../../models/hall.schema.js";

export const getDataByDate = async (req, res) => {
  const { user_id } = req.query;
  const user = await userSchema.findById(user_id);
  if (!user) {
    return res.send({ status: false, desc: "User not found" });
  }

  const used = await bookings
    .find({ "schedule.date": moment().format("YYYY-MM-DD") })
    .populate([
      {
        path: "requested_by",
        populate: {
          path: "requested_by",
        },
      },
      {
        path: "requested_hall",
        populate: {
          path: "incharge",
        },
      },
      {
        path: "event",
        populate: {
          path: "club staff_incharge",
        },
      },
    ]);
  const usedArr = [];
  for (let i = 0; i < used.length; i++) {
    usedArr.push(used[i].requested_hall._id);
  }
  const unused = await hallSchema
    .find({
      _id: {
        $nin: usedArr,
      },
    })
    .populate("incharge");
  res.send({
    status: true,
    data: { usedHalls: used, unusedHalls: unused },
  });
};
