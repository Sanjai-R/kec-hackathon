import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  requested_by: {
    type: Schema.Types.ObjectId,
    ref: "Tracking",
    required: true,
  },
  requested_hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  schedule: {
    date: {
      type: Date,
    },
    period: {
      type: Array,
    },
    range: {
      type: Array,
    },
  },
  type: {
    type: String,
    enum: ["single", "multiple"],
  },
  isClosed: {
    type: Boolean,
    default: false,
  },
  opt_in: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const bookings = mongoose.model("Booking", bookingSchema);

export default bookings;
