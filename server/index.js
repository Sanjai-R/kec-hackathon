import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config/db_config.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 5000;

const httpServer = createServer();
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("socket connected");
});

httpServer.listen(PORT);

app.get("_", (req, res) => {
    res.send("hello from server");
});
