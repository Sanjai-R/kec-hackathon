import hallSchema from "../../models/hall.schema.js";
import eventSchema from "../../models/event.schema.js";
import bookingSchema from "../../models/booking.schema.js";

export const getHallBySingle = async (req, res) => {

  const { capacity, date, type } = req.query;
  const existingBooking = await bookingSchema.find({
    "schedule.date": new Date(date),
    "schedule.period.6": { $exists: false },
  });
  const periods = await existingBooking.map((item) => item.schedule.period);
  const existingEvent = existingBooking.map((item) => item.requested_hall);
  console.log(periods, existingEvent);
  let halls;
  if (existingEvent.length < 1) {
    console.log("gte");
    halls = await hallSchema
      .find({
        capacity: { $gte: capacity },
        type,
      })
      .populate("incharge");
  } else {
    halls = await hallSchema
      .find({
        _id: {
          $nin: existingEvent,
        },
        capacity: { $gte: capacity },
        type,
      })
      .populate("incharge");
  }

  const response = halls.map((item, i) => ({ ...item, period: periods[i] }));
  const data = response.map((item) => ({ ...item._doc, period: item.period }));
  res.send({ status: true, data });
  // res.send("halls")
};
const checkDate = (date, range) => {
    const flag = range.includes(date)
    console.log(date, range)
    return flag;
}
export const getEventByMultiple = async (req, res) => {
    const { capacity, range, type } = req.body;
    let halls;
    const date = range.map((e) => new Date(e))
    const data = await bookingSchema.find({
        "schedule.range": {
            $elemMatch: {
                $in: date
            }
        }

    });
    const matchedSingleDate = await bookingSchema.find({
        "schedule.date": { $in: date }

    });
    matchedSingleDate.map((e) => data.push(e))
    const existingEvent = data.map((item) => item.requested_hall);
    console.log(existingEvent)
    if (existingEvent.length < 1) {
        halls = await hallSchema.find({
            _id: {
                $in: data,
            },
            capacity: { $gte: capacity },
            type
        });
    }
    else {
        
        halls = await hallSchema.find({
            capacity: { $gte: capacity },
            type
        });
    }
    // console.log([...existingBooking1, existingBooking2])

    res.send({ data: halls })

}
