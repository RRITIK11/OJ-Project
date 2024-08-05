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

    const output= await executeCode(lang, code , input);
    console.log(output);
    return NextResponse.json(
      {
        success: true,
        message: "Api works perfetly",
        body: body,
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
