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
  const output_filename = `${jobId}.out`;
  const outPath = path.join(outputPath, output_filename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${output_filename} < ${inputPath}`,
      async (error, stdout, stderr) => {
        let result;
        try {
          if (error || stderr) {
            const errorMessage = stderr.split(filePath).join('\n');
            result = errorMessage;
          } else {
            result = stdout;
          }

          // Delete the output and input files after execution
          await fs.promises.unlink(outPath);
          await fs.promises.unlink(inputPath);
          
          resolve(result);
        } catch (err : any) {
          reject(`Error during file cleanup: ${err.message}`);
        }
      }
    );
  });
};
