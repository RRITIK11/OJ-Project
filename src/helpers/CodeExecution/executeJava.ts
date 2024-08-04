import { exec } from "child_process";

export const executeJava = async (filePath: string, inputPath : string) => {

  return new Promise((resolve, reject) => {
    exec(
      `java ${filePath} < ${inputPath}`,
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
