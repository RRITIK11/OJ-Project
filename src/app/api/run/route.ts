import { generateFile } from "@/helpers/generateFile";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import { NextRequest, NextResponse } from "next/server";
import { executeCode } from "@/helpers/CodeExecution/executeCode";

export async function POST(request: NextRequest) {
  try {
    const body = await getDataFromHeader(request);
    if (!body) {
      return NextResponse.json(
        {
          error: "Send Data in Correct form",
        },
        { status: 400 }
      );
    }
    const { lang, code, input }: any = body;
    console.log(body)

    if(!lang || !code){
        return NextResponse.json(
            {
              error: "Code and language required!",
            },
            { status: 400 }
          );
    }


    const filePath = await generateFile(code,lang);
    const inputPath = await generateFile(input);
    console.log("Response FilePath : ", filePath);
    console.log("Response InputPath : ", inputPath);

    const output= await executeCode(lang, filePath,inputPath);
    console.log(output);
    return NextResponse.json(
      {
        success: true,
        message: "Api works perfetly",
        body: body,
        filePath: filePath,
        output,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
