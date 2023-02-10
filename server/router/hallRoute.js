import express from 'express';
import createHall from '../controller/hall/createHall.controller.js';
import { getEventByMultiple, getHallBySingle } from '../controller/hall/getHall.controller.js';


const hallRoute = express.Router();


hallRoute.post("/create", createHall);
hallRoute.get("/getHallBySingle", getHallBySingle)
hallRoute.get("/getHallByMulti", getEventByMultiple)

export default hallRoute;