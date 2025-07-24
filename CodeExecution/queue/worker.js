const { jobQueue } = require("./submitQueue");
const { redisClient } = require("../config/redis");
const { writeFileSync, mkdirSync } = require("fs");
const { exec } = require("child_process");
const os = require("os");
const path = require("path");

jobQueue.process(async (job) => {
  const { roomId, code, input = "", language } = job.data;
  const tempDir = path.join(os.tmpdir(), `job-${roomId}`);
  mkdirSync(tempDir, { recursive: true });

  let codeFile, dockerImage;
  if (language === "cpp") {
    codeFile = "main.cpp";
    dockerImage = "cpp-runner";
  } else if (language === "python") {
    codeFile = "main.py";
    dockerImage = "python-runner";
  } else if (language === "java") {
    codeFile = "Main.java";
    dockerImage = "java-runner";
  }

  const codePath = path.join(tempDir, codeFile);
  const inputPath = path.join(tempDir, "input.txt");

  writeFileSync(codePath, code);
  writeFileSync(inputPath, input);

  const dockerCodePath = codePath.replace(/\\/g, "/").replace(/^([A-Za-z]):/, (m, p1) => `/${p1.toLowerCase()}`);
  const dockerInputPath = inputPath.replace(/\\/g, "/").replace(/^([A-Za-z]):/, (m, p1) => `/${p1.toLowerCase()}`);

  return new Promise((resolve, reject) => {
    exec(
      `docker run --rm -v ${dockerCodePath}:/app/${codeFile} -v ${dockerInputPath}:/app/input.txt ${dockerImage}`,
      (err, stdout, stderr) => {
        const output = stderr || stdout || "No output";
        redisClient.set(`output:${job.id}`, output);
        if (err || stderr) reject(stderr || err.message);
        else resolve(stdout);
      }
    );
  });
});
