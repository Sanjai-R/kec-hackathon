import express from 'express';
import createHall from '../controller/hall/createHall.controller.js';
import { getHall } from '../controller/hall/getHall.controller.js';


const hallRoute = express.Router();


hallRoute.post("/create", createHall);
hallRoute.get("/getHall", getHall)

export default hallRoute;