import hallSchema from "../../models/hall.schema.js";
import eventSchema from "../../models/event.schema.js";
import bookingSchema from "../../models/booking.schema.js";

export const getHall = async (req, res) => {
  const { capacity, date } = req.query;
  const existingBooking = await bookingSchema.find({
    "schedule.date": new Date(date),
    "schedule.period.6": { $exists: false },
  });
  const periods = await existingBooking.map((item) => item.schedule.period);
  console.log(periods);
  const existingEvent = existingBooking.map((item) => item.requested_hall);
  const halls = await hallSchema.find({
    _id: {
      $in: existingEvent,
    },
    capacity: { $gte: capacity },
  });
  res.send({ status: true, data: halls });
  // res.send("halls")
};
