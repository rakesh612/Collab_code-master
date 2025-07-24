const express = require("express");
const cors = require("cors");
const { submitCode, getOutput } = require("./controllers/codeController");
require("./queue/worker");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.post("/submit-code", submitCode);
app.get("/output/:roomId", getOutput);

const PORT = 5010;
app.listen(PORT, () => {
  console.log(`Code Executor Microservice running at http://localhost:${PORT}`);
});
