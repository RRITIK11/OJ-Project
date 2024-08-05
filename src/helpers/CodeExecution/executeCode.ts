import { generateFile } from "../generateFile";
import { executeCpp } from "./executeCpp";
import { executeJava } from "./executeJava";
import { executeJavaScript } from "./executeJavascript";
import { executePython } from "./executePython";

export async function executeCode(lang : string , code : string , input :any){
    const filePath  = await generateFile(code,lang);
    const inputPath = await generateFile(input);
    console.log("FilePath : ",filePath);
    console.log("InputPath : ",inputPath);
    switch(lang) {
        case "c++" : 
            return await executeCpp(filePath,inputPath);
        case "java" : 
            return await executeJava(filePath,inputPath);
        case "javascript" : 
            return await executeJavaScript(filePath,inputPath);
        case "python" : 
            return await executePython(filePath,inputPath);
        default :
            return null
    }

}