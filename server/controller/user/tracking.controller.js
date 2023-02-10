import userSchema from "../../models/user.schema.js";
import trackingSchema from "../../models/tracking.schema.js";

export const tracking = async (req, res) => {
    const { userId, actions, trackingId } = req.query;
    const user = await userSchema.findById(userId);
    console.log(userId)
    if (!user) {
        return res.send({ status: false, desc: "User not found" })
    }

    else {
        const tracking = await trackingSchema.findById(trackingId);
        if (!tracking) {
            return res.send({ status: false, desc: "Tracking not found" })
        }
        else {
            const trackingIndex = tracking.tracking.findIndex((e) => e.authorizer === user.role.type);
            console.log(trackingIndex)
            if (trackingIndex === -1) {
                return res.send({ status: false, desc: "You are not authorized to perform this action" })
            }
            else {
                const trackingData = tracking.tracking[trackingIndex];
                if (trackingData.tracking === "approved") {
                    return res.send({ status: false, desc: "You have already approved this request" })
                }
                else if (trackingData.tracking === "rejected") {
                    return res.send({ status: false, desc: "You have already rejected this request" })
                }
                else {
                    console.log(tracking.tracking[trackingIndex])
                    tracking.tracking[trackingIndex].tracking = actions;
                    const data = await tracking.save();
                    return res.send({ status: true, desc: "Action performed successfully" })
                }
            }
        }
    }
}