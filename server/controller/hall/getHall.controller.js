import hallSchema from "../../models/hall.schema.js";
import eventSchema from "../../models/event.schema.js";
import bookingSchema from "../../models/booking.schema.js";
import mongoose from "mongoose";

export const getHallBySingle = async (req, res) => {

  const { capacity, date, type } = req.query;
  const existingBooking = await bookingSchema.find({
    "schedule.date": new Date(date),
  });
  const listOfHalls = await hallSchema.find({
    capacity: { $gte: capacity },
    type,
  })
  let arr = [];
  const list = listOfHalls.map((e) => e._id.toString())
  const pr = []
  const periods = await existingBooking.map((item) => {
    {
      if (item.schedule.period !== undefined && item.schedule.period.length < 7) {
        const index = list.indexOf(item.requested_hall.toString());
        if (index > -1) { // only splice array when item is found
          list.splice(index, 1); // 2nd parameter means remove one item only
        }
        pr.push(item.schedule.period)
      }
    }
  });
  for (let i = 0; i < list.length; i++) {
    const id = mongoose.Types.ObjectId(list[i]);
    const temp = await hallSchema.findById(id).populate("incharge")
    arr.push({ ...temp, period: pr[i] })
  }
  const data = arr.map((item) => ({ ...item._doc, period: item.period }));
  console.log(data)

  res.send({ status: true, data });
  // res.send("halls")
};

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
