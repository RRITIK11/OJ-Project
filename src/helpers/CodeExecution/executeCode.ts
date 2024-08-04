import { executeCpp } from "./executeCpp";
import { executeJava } from "./executeJava";
import { executeJavaScript } from "./executeJavascript";
import { executePython } from "./executePython";

export async function executeCode(lang : string , filePath : string, inputPath :string){
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