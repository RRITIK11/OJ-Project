import { exec } from "child_process";

export const executeJavaScript = async (filePath: string, inputPath : string) => {

  return new Promise((resolve, reject) => {
    exec(
      `node ${filePath} < ${inputPath}`,
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
