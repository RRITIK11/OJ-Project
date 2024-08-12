import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { count } from "console";

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  console.log("Output directory created");
  fs.mkdirSync(outputPath, { recursive: true });
}

export const executeJava = async (filePath: string, inputPath: string) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const classFilePath = path.join(outputPath, `${fileName}.class`); // Path to the class file

  return new Promise<string>(async (resolve, reject) => {
    exec(`javac ${filePath} -d ${outputPath}`, (compileError) => { // Compile with output directory
      if (compileError) {
        console.log(`Compilation Error: ${compileError.message}`)
        return reject(`Compilation Error: ${compileError.message}`);
      }
      console.log("I am here ")
      exec(`java -cp ${outputPath} ${fileName} < ${inputPath}`, async (runError, stdout, stderr) => {
        let result;
        try {
          if (runError || stderr) {
            const errorMessage = stderr.split(filePath).join('\n');
            result = errorMessage;
            console.log("Result : ",result)
          } else {
            result = stdout;
            console.log("Result : ",result)
          }

          // Delete the class file and input file after execution
          await fs.promises.unlink(classFilePath);
          await fs.promises.unlink(inputPath);
          console.log("Unlinking done")
          console.log("Resutk : ",result)
          resolve(result);
        } catch (err: any) {
          console.log(`Error during file cleanup: ${err.message}`)
          reject(`Error during file cleanup: ${err.message}`);
        }
      });
    });
  });
};
