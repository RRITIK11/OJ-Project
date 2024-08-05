import fs from 'fs';
import path from "path";
import {v4 as uuid} from "uuid";
import { getCodeExtension } from './getCodeExtension';



const generateFile = async ( text : any = "", lang : string = "txt")=> { 
    console.log("Text : ",text);
    const codeExtension = getCodeExtension(lang);
    console.log("Code Extension : ",codeExtension);
    var dirTexts;
    const jobId = uuid();
    if(lang=="java"){
        dirTexts = path.join(__dirname,`${lang}codes\\${jobId}`);
    }else{
        dirTexts = path.join(__dirname,`${lang}codes`);
    } 
    if(!fs.existsSync(dirTexts)){
        console.log("file created");
        fs.mkdirSync(dirTexts,{recursive : true});
    }
    console.log("DirTexts : ",dirTexts);
    let filename = `${jobId}.${codeExtension}`;
    if(lang=="java"){
        filename = `Main.${codeExtension}`;
    }
    console.log("filename : " ,filename);
    const filePath = path.join(dirTexts,filename);
    console.log("Filepath : ", filePath);
    fs.writeFileSync(filePath,text);
    return filePath;
}

export {generateFile}