import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    club: {
        type: Schema.Types.ObjectId,
        ref:"Club",
        required: true
    },
    staff_incharge: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    event_capacity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ""
    },
    requirements: {
        type: Array,
        default: []
    }
})

const event = mongoose.model("Event", eventSchema);

export default event;