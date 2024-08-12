import path from "path";
import fs from "fs";
import { exec } from "child_process";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  console.log("output directory created");
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeJavaScript = async (filePath: string, inputPath: string) => {
  return new Promise<string>(async (resolve, reject) => {
    exec(
      `node ${filePath} < ${inputPath}`, // Run the JavaScript file
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
