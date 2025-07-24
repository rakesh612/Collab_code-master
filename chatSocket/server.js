// chatServer.js
import http from "http";
import express from "express";
import { Server } from "socket.io";
import Redis from "ioredis";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

const redis = new Redis();

function getRoomKey(a, b) {
  return [a, b].sort().join("-");
}

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("join-chat", async ({ roomId }) => {
    socket.join(roomId);
    console.log(`👥 ${socket.id} joined room ${roomId}`);

    const raw = await redis.lrange(roomId, -50, -1);
    const history = raw.map((r) => JSON.parse(r));
    socket.emit("chat-history", history);
  });

  socket.on("send-message", async ({ roomId, message }) => {
    // Save to Redis
    await redis.rpush(roomId, JSON.stringify(message));

    // Broadcast to everyone except the sender
    socket.to(roomId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

server.listen(5002, () => {
  console.log("🚀 Chat Server listening on port 5002");
});
