import mongoose from "mongoose";

const { Schema } = mongoose;

const hallSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    incharge: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    gallery: {
        type: Array,
        default:[]
    },
    type:{
        type: String,
    }
})  

const hall = mongoose.model("Hall",hallSchema);

export default hall;