import bookingSchema from "../../models/booking.schema.js";

export const closeBookingController = async (req, res) => {
    const { booking_id } = req.param;
    const booking = await bookingSchema.findOneAndUpdate({ _id, booking_id }, { isClosed: false }, { new: true });
    if (!booking) {
        return res.send({ status: false, desc: "No booking found" })
    } else {
        return res.send({ status: true, desc: "Booking closed successfully" })
    }
}