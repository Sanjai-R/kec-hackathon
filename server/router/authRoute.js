import express from 'express';
import loginController from '../controller/user/login.controller.js';
import signupController from '../controller/user/signup.controller.js';

const authRoute = express.Router();


authRoute.post("/signup", signupController);
authRoute.post('/login', loginController);

export default authRoute;