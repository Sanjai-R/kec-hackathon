import bookingSchema from "../../models/booking.schema.js";

export const getTracker = async (req, res) => {
  const { bookingId } = req.query;
  const booking = await bookingSchema.findById(bookingId).populate([
    {
      path: "requested_by",
      populate: {
        path: "tracking status",
      },
    },
    {
      path: "requested_hall",
      populate: {
        path: "incharge",
      },
    },
  ]);
  if (!booking) {
    return res.send({ status: false, desc: "No booking found" });
  } else {
    return res.send({ status: true, data: booking });
  }
};
