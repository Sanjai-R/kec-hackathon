import trackingSchema from "../../models/tracking.schema.js";

export const getTrackingId = async (id, type, requested_hall) => {
    let authorizers;
    if (type == "Conventional Centre") {
        authorizers = ["HOD", "CCO", "Registrar", "Principal"]
    } else if (type == "Maharaja Auditorium") {
        authorizers = ["HOD", "CCO", "Registrar"]
    } else {
        authorizers = ["hall_incharge"]
    }
    
    const authorize_data = authorizers.map((authorizer) => ({ authorizer, tracking: "pending" }));
    const newTracking = {
        requested_by: id,
        tracking: authorize_data,
        requested_hall
    }
    console.log(newTracking)

    const tracking = await trackingSchema(newTracking);
    const data = await tracking.save();
    return data;
}