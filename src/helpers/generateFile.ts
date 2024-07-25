import fs from 'fs';
import path from "path";
import {v4 as uuid} from "uuid";

const dirCodes = path.join(__dirname,'codes');

if(!fs.existsSync(dirCodes)){
    console.log("file created");
    fs.mkdirSync(dirCodes,{recursive : true});
}

const generateFile = async (codeExtension : String, code : any)=> {
    const jobId = uuid();
    console.log(dirCodes);
    const filename = `${jobId}.${codeExtension}`;
    console.log("filename : " ,filename);
    const filePath = path.join(dirCodes,filename);
    console.log("Filepath : ", filePath);
    fs.writeFileSync(filePath,code);
    return filePath;
}

export {generateFile}