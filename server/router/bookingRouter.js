import express from "express";
import { createBooking } from "../controller/booking/bookings.controller.js";

const bookingRoute = express.Router();

bookingRoute.post("/",createBooking)

export default bookingRoute;