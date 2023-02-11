import bookingSchema from "../../models/booking.schema.js";
import trackingSchema from "../../models/tracking.schema.js";

export const getHistory = async (req, res) => {
    const { userId } = req.query;
    const tracking = await trackingSchema.find({ requested_by: userId }).populate("requested_hall");
    const historyData = [];
    for (let i = 0; i < tracking.length; i++) {
        historyData.push(tracking[i]._id);
    }
    const history = await bookingSchema.find({ requested_by: { $in: historyData } }).populate([
        {
            path: "requested_by",
            populate: {
                path: "requested_by",
            },
        },
        {
            path: "requested_hall",
            populate: {
                path: "incharge",
            },
        },
        {
            path: "event",
            populate: {
                path: "club staff_incharge",
            },
        },
    ])
    res.send({ status: true, data: history })
}