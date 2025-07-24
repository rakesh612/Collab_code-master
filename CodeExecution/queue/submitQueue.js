const Queue = require("bull");
const jobQueue = new Queue("code-submission-queue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

jobQueue.on("error", (err) => console.error("Queue error:", err));

module.exports = { jobQueue };