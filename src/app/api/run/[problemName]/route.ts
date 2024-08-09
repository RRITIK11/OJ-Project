import { executeCode } from "@/helpers/CodeExecution/executeCode";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Problem from "@/models/problem.model";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuid} from "uuid"

// function normalizeString(str: string): string {
//   return str.trim().replace(/\s+/g, ' ');
// }

function normalizeString(str: string): string {
  return str
      .split('\n') // Split the string into lines
      .map(line => line.replace(/\s+$/, '')) 
      .filter(line => line.length > 0) // Remove any empty lines (if needed)
      .join('\n') // Join the lines with a single space
      .replace(/\s+$/, ''); // Remove trailing whitespace (including newlines)
}

export interface VerdictInterface {
    id : string,
    input : string,
    status : "Accepted" | "Wrong Answer",
    output : string,
    expected : string
}

export async function POST(request: NextRequest) {
  try {
    const decoded = await getDataFromToken(request);
    if (!decoded.username) {
      return NextResponse.json(
        {
          message: "No user found!",
        },
        { status: 400 }
      );
    }

    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").pop();
    const problemName = problemNameSlug?.split("-").join(" ");
    const regex = new RegExp(`^${problemName}$`, "i");
    const body  = await getDataFromHeader(request);
    
    const {inputs , solution } : {
      inputs : string[],
      solution : {
        lang : string,
        code : string
      }
    } = body;
    
    console.log("Hee hee",inputs,solution,body)
    if (!inputs || !Array.isArray(inputs)) {
      return NextResponse.json({
          error: 'Invalid input data',
          message: 'Inputs array is missing or invalid'
      }, {
          status: 400
      });
    }

    if( !solution || !solution?.lang || !solution?.code){
        throw new Error("inputs or solution with lang and code field required")
    }

    console.log("inputs : ",inputs);
    console.log("solution: ", solution)

    console.log("regex : ",regex)
    console.log("body : " , body)
    
    
    const problem = await Problem.findOne({title : regex},{
        solution : 1
    });
    console.log(problem)
    const correctSolution = problem?.solution;

    if(!correctSolution){
        throw new Error("No solution provided for validation")
    }


    const verdictPromises = inputs?.map(async (input : string) => {
        const output : any = await executeCode(solution.lang, solution.code , input);
        const expected : any = await executeCode(correctSolution.language, correctSolution.code , input);
        return {
            id : uuid(),
            input,
            status : normalizeString(output) == normalizeString(expected) ? "Accepted" : "Wrong Answer",
            output ,
            expected 
        } as VerdictInterface;
    });

    let verdictAll : VerdictInterface[] = await Promise.all(verdictPromises);

    return NextResponse.json({
        verdictAll
    },{
        status : 200
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
