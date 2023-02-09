import express from "express";
import addClubController from "../controller/club/createClub.controller.js";
import { getClub } from "../controller/club/getClub.controller.js";
import { updateClub } from "../controller/club/updateClub.controller.js";

const clubRoute = express.Router();

clubRoute.post("/create",addClubController)
clubRoute.get('/getClub',getClub)
clubRoute.patch('/updateClub',updateClub)
export default clubRoute;