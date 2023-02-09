import mongoose from "mongoose";

const { Schema } = mongoose;

const clubSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    faculty_coordinator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    student_coordinator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    hosted_events:{
        type: [Schema.Types.ObjectId],
        ref: "Event"
    }
})

const club = mongoose.model("Club",clubSchema);

export default club;