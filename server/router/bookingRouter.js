import express from "express";
import { createBooking } from "../controller/booking/bookings.controller.js";
import { closeBookingController } from "../controller/booking/closeBooking.controller.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking)
bookingRoute.get("/closeBooking",closeBookingController)
export default bookingRoute;