import bookingSchema from "../../models/booking.schema.js";
import trackingSchema from "../../models/tracking.schema.js";

export const getHistory = async (req, res) => {
    const { userId } = req.query;
    const tracking = await trackingSchema.find({ requested_by: userId });
    //     const historyData = await tracking.map((e) => {
    // const temp 
    //     })
    let arr = [];

    for (let i = 0; i < tracking.length; i++) {
        const temp = await bookingSchema.findOne({ requested_by: tracking[i]._id })
        if (temp !== null) {
            arr.push({ ...tracking[i], booking: temp })
        }

    }
    const data = arr.map((item) => {
        
    })
    res.send({ arr })
}