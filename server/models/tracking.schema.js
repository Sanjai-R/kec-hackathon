import mongoose from "mongoose";

const { Schema } = mongoose;

const trackingSchema = new Schema({
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  requested_hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall"
  },
  tracking: {
    type: [
      {
        authorizer: {
          type: "String",
          enum: ["HOD", "CCO", "Registrar", "Principal", "hall_incharge"],
        },
        tracking: {
          type: "String",
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  status: {
    type: "String",
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const tracking = mongoose.model("Tracking", trackingSchema);

export default tracking;