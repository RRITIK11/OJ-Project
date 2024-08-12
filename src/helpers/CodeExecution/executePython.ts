import path from "path";
import fs from "fs";
import { exec } from "child_process";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  console.log("output directory created");
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executePython = async (filePath: string, inputPath: string) => {
  return new Promise<string>(async (resolve, reject) => {
    exec(
      `python ${filePath} < ${inputPath}`, // Run the Python script
      async (error, stdout, stderr) => {
        let result;
        try {
          if (error || stderr) {
            const errorMessage = stderr.split(filePath).join('\n');
            result = errorMessage;
          } else {
            result = stdout;
          }

          // Delete the input file after execution
          await fs.promises.unlink(inputPath);

          resolve(result);
        } catch (err: any) {
          reject(`Error during file cleanup: ${err.message}`);
        }
      }
    );
  });
};
