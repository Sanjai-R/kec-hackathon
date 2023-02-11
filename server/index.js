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
import clubRoute from "./router/clubRoute.js";
import axios from "axios";

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

app.get("/", async (req, res) => {
  const ACCESS_TOKEN =
    "EAATSq5ecJpkBAL3rmX3JDYj21THdsPCbCjesR4jdX5PQ4k4rUbfnGHnHowGLaPvqAZCbAwK9cnN89TGPIu4qWh3CZAOSiaZAdXTYVYKeshys2Jx9PZAQuCKwZAUjg4q2oRoe8M62q6eQZCeM97ZAtLJWCTKZAHgbT9opjOnDQWqCu9psgYQRrndoJvLlpm2kH2yNqyLMBqSkNQy5kMH4pxbzvWS7249ZBMfEZD";
  await axios.post(
    `https://graph.facebook.com/v15.0/106023782412410/messages`,
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: "916383477194",
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
});

app.use("/api/user", userRoute);
app.use("/api/hall", hallRoute);
app.use("/api/event", eventRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/club", clubRoute);
