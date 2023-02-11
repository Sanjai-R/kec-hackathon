import express from "express";
import { createBooking } from "../controller/booking/bookings.controller.js";
import { closeBookingController } from "../controller/booking/closeBooking.controller.js";
import { getTracker } from "../controller/booking/getTracker.controller.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking)
bookingRoute.get("/closeBooking",closeBookingController)
bookingRoute.get('/getTracker',getTracker)
export default bookingRoute;