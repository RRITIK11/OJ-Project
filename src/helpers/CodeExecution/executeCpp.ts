import path from "path";
import fs from "fs";
import { exec } from "child_process";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  console.log("output file created");
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = async (filePath: string, inputPath : string) => {
  const jobId = path.basename(filePath).split(".")[0];
  const output_filename = `${jobId}.exe`;
  const outPath = path.join(outputPath, output_filename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${output_filename} < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          const errorMessage = stderr.split(filePath).join('\n');
          resolve(errorMessage);
        }
        resolve(stdout);
      }
    );
  });
};
