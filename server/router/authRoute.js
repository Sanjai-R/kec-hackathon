import express from 'express';
import { getDataByDate, getDataByWeek } from '../controller/user/getData.controller.js';
import { getHistory } from '../controller/user/getHistory.controller.js';
import getUserByMail from '../controller/user/getUser.controller.js';
import loginController from '../controller/user/login.controller.js';
import signupController from '../controller/user/signup.controller.js';
import { tracking } from '../controller/user/tracking.controller.js';

const authRoute = express.Router();


authRoute.post("/signup", signupController);
authRoute.post('/login', loginController);
authRoute.get('/getUserByMail', getUserByMail);
authRoute.get('/actions',tracking)
authRoute.get('/getData',getDataByDate)
authRoute.get('/getHistory',getHistory)
authRoute.get('/getDataByWeek',getDataByWeek)
export default authRoute;