import hallSchema from "../../models/hall.schema.js";
import eventSchema from "../../models/event.schema.js";
import bookingSchema from "../../models/booking.schema.js";

export const getHall = async (req, res) => {
    const { capacity, date } = req.query;
    const event = await bookingSchema.find({ "schedule.date": Date("2014-08-10") });
    const da = await bookingSchema.find()
    console.log(da)

    const hall = await hallSchema.find({ capacity: { $gte: capacity } });
    res.send({ status: true, data: event });
    // res.send("halls")
};
