import { executeCpp } from "@/helpers/executeCpp";
import { generateFile } from "@/helpers/generateFile";
import { NextRequest, NextResponse } from "next/server";
import {parse} from 'querystring';

export async function POST(request : NextRequest){
    const contentType = request.headers.get('content-type');
    console.log(contentType);
    try {
        let body;
        if(contentType === 'application/json'){
            body = await request.json();
        }else if(contentType === 'application/x-www-form-urlencoded'){
            const rawBody = await request.text();
            body = Object(parse(rawBody));
        }else{
            return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
        }
        console.log(body)
        const {language, code} : any = body;
        console.log("language : ",language);
        console.log("code : ",code);
        
        let codeExtension : String = "cpp";
        if(language === 'c++') codeExtension = "cpp";

        const filePath = await generateFile(codeExtension,code);
        console.log("Response FilePath : ",filePath);

        const output = await executeCpp(filePath);
        console.log(output);
        
        return NextResponse.json({language, code, filePath : filePath,output});
    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        },{
            status : 500
        })
    }
}