import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config/db_config.js";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoute from "./router/authRoute.js";
import hallRoute from "./router/hallRoute.js";
import eventRoute from "./router/eventRoute.js";
import bookingRoute from "./router/bookingRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("socket connected");
});

httpServer.listen(PORT);

app.get("/", (req, res) => {
    res.send("hello from server");
});

app.use('/api/user', userRoute)
app.use('/api/hall', hallRoute)
app.use('/api/event', eventRoute)
app.use('/api/booking', bookingRoute)