import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    role: {
        type: {
            type: String,
        },
        collection: {
            type: String,
        }
    },
});

const user = mongoose.model("User", userSchema);

export default user;