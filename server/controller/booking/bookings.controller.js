import bookingSchema from "../../models/booking.schema.js";
import hallSchema from "../../models/hall.schema.js";
import trackingSchema from "../../models/tracking.schema.js";
import { getTrackingId } from "./tracking.controller.js";

export const createBooking = async (req, res) => {
  const {
    requested_by,
    requested_hall_type,
    requested_hall,
    event,
    type,
    schedule,
    range,
  } = req.body;
  console.log(requested_hall);
  let date, dateRange;
  if (type === "single") {
    date = new Date(schedule.date);
  } else {
    dateRange = schedule.range.map((e) => new Date(e));
    console.log(dateRange);
  }
  const existingHall = await trackingSchema.findOne({ requested_hall });
  const trackingData = await getTrackingId(
    requested_by,
    requested_hall_type,
    requested_hall
  );
  // console.log(existingHall)
  //

  const newData = {
    ...{ ...req.body, requested_by: trackingData._id },
    "schedule.range": dateRange,
  };
  const newBooking = new bookingSchema({
    ...newData,
    schedule: { ...newData.schedule, date },
  });
  console.log(newBooking);
  try {
    await newBooking.save();
    const bookingData = await newBooking.populate(
      "requested_hall event requested_by requested_by.requested_by requested_by.requested_hall",
      "-password"
    );
    res.send({
      status: true,
      data: bookingData,
      desc: "slot booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: true,
      error: error.message,
      desc: "Something went wrong",
    });
  }
};
