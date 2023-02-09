import bookingSchema from "../../models/booking.schema.js";

export const createBooking = async (req, res) => {
    const { requested_by, requested_hall, event, type, schedule, range } = req.body;
    const date = new Date(schedule.date);
    const newBooking = new bookingSchema({ ...req.body, schedule: { ...req.body.schedule, date } });
    try {
        await newBooking.save();
        const bookingData = await newBooking.populate(
            "requested_hall event requested_by",
            "-password"
        );
        res.status(200).send({
            status: true,
            data: bookingData,
            message: "slot booked Successfully",
        });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({
                status: true,
                error: error.message,
                message: "Something went wrong",
            });
    }
};
