import express from "express"
import createEventController from "../controller/event/createEvent.controller.js";

const eventRoute = express.Router();

eventRoute.post('/create',createEventController)

export default eventRoute;