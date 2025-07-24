import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { createClient } from "redis";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Room from "./backend/src/models/Room.js";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

await mongoose.connect(process.env.CONNECTION_STRING);

const redisClient = createClient();
await redisClient.connect();

io.on("connection", (socket) => {
  socket.on("join-room", async (roomId) => {
    socket.join(roomId);

    const redisKey = `room:${roomId}:code`;
    try {
      let code = await redisClient.get(redisKey);
      if (!code) {
        const room = await Room.findById(roomId);
        if (room) {
          code = room.currentCode;
          await redisClient.set(redisKey, code);
        }
      }
      if (code) {
        socket.emit("code-update", { code });
      }
    } catch (err) {
      console.error("Error during room join:", err);
    }
  });

  socket.on("code-change", async ({ roomId, code }) => {
    const redisKey = `room:${roomId}:code`;
    try {
      await redisClient.set(redisKey, code);
    } catch (err) {
      console.error("Redis write failed:", err);
    }
    socket.to(roomId).emit("code-update", { code });
  });

  socket.on("disconnecting", async () => {
    const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    for (const roomId of rooms) {
      const redisKey = `room:${roomId}:code`;
      try {
        const code = await redisClient.get(redisKey);
        if (code) {
          await Room.findByIdAndUpdate(roomId, { currentCode: code });
        }
      } catch (err) {
        console.error("MongoDB flush on disconnect failed:", err);
      }
    }
  });
});

server.listen(5000, () => {
  console.log("Socket.IO server running on port 5000");
});
