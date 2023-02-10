import hallSchema from "../../models/hall.schema.js";
import eventSchema from "../../models/event.schema.js";
import bookingSchema from "../../models/booking.schema.js";

export const getHallBySingle = async (req, res) => {
    const { capacity, date,type } = req.query;
    const existingBooking = await bookingSchema.find({
        "schedule.date": new Date(date),
        "schedule.period.6": { $exists: false },
    });
    const periods = await existingBooking.map((item) => item.schedule.period);
    const existingEvent = existingBooking.map((item) => item.requested_hall);
    console.log(periods,existingEvent)
    let halls
    if(existingEvent.length < 1){
        console.log("gte")
        halls = await hallSchema.find({
            capacity: { $gte: capacity },
            type
        });
    }
    else{
        halls = await hallSchema.find({
            _id: {
                $in: existingEvent,
            },
            capacity: { $gte: capacity },
            type
        });
       
    }

    const response = halls.map((item, i) => ({ ...item, period: periods[i] }))
    const data = response.map((item) => ({ ...item._doc, period: item.period }))
    res.send({ status: true, data });
    // res.send("halls")
};

export const getEventByMultiple = async (req, res) => {
    const { capacity, range } = req.query;

    const existingBooking = await bookingSchema.find({

        'schedule.date': {
            $in: range
        },
    })

}