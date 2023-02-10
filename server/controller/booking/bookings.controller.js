import bookingSchema from "../../models/booking.schema.js";

export const createBooking = async (req, res) => {
    const { requested_by, requested_hall, event, type, schedule, range } = req.body;
    let date;
    if (type === "single") {
        date = new Date(schedule.date);
    }
    const newBooking = new bookingSchema({ ...req.body, schedule: { ...req.body.schedule, date } });
    try {
        await newBooking.save();
        const bookingData = await newBooking.populate(
            "requested_hall event requested_by",
            "-password"
        );
        res.send({
            status: true,
            data: bookingData,
            desc: "slot booked Successfully",
        });
    } catch (error) {
        console.log(error);
        res
           
            .send({
                status: true,
                error: error.message,
                desc: "Something went wrong",
            });
    }
};
