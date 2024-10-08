import { Success } from "@/config/constants";
import { executeCode } from "@/helpers/CodeExecution/executeCode";
import { getDataFromHeader } from "@/helpers/getDataFromHeader";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Problem from "@/models/problem.model";
import ProblemSubmission, { ProblemSubmissionInterface } from "@/models/problemSubmission.model";
import { NextRequest, NextResponse } from "next/server";

export interface ResultInterface {
  verdict : "Wrong Answer" | "Accepted",
  Result : {
    totalTestCasePassed : number,
    totalTestCase : number
    firstFailedTestCase? : {
      input : string,
      output : string,
      expected : string
    } 
  }
}

function normalizeString(str: string): string {
  return str
      .split('\n')
      .map(line => line.replace(/\s+$/, '')) 
      .filter(line => line.length > 0) 
      .join('\n')
      .replace(/\s+$/, '');
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
    const body  = await getDataFromHeader(request);
    
    const url = new URL(request.url);
    const problemNameSlug = url.pathname.split("/").pop();
    const problemName = problemNameSlug?.split("-").join(" ");
    const regex = new RegExp(`^${problemName}$`, "i");
    
    const { solution }  : {
      solution : {
        lang : string,
        code : string
      }
    }= body;
    
    if(!solution.lang || !solution.code){
      throw new Error("inputs or solution with lang and code field required")
    }
      
    const pipeline = [
      {
        $match : {
          title : regex
        }
      },{
        $project : {
          "_id" : 0,
          "solution" : 1,
          "inputs" : {
            $map : {
              input : "$testCases",
              as : "testCase",
              in : "$$testCase.input"
            }
          }
        }
      }
    ];    

    const problems = await Problem.aggregate(pipeline).exec();
    if(problems.length==0) throw new Error("No Problem found")
    const problem : {
      solution : {
        language : string,
        code : string
      },
      inputs : string[]
    } = problems[0];

    const correctSolution = problem?.solution;
    const inputs = problem?.inputs;

    if(!correctSolution){
      throw new Error("No solution provided for validation")
    }

    let Result : {
      totalTestCasePassed : number,
      totalTestCase : number,
      firstFailedTestCase? : {
        input : string,
        output : string,
        expected : string
      }
    } = {
      totalTestCasePassed : 0,
      totalTestCase : inputs.length
    }

    for(const input of inputs){
      const output : any = await executeCode(solution.lang,solution.code, input);
      const expected : any = await executeCode(correctSolution.language, correctSolution.code, input);

      if(normalizeString(output) !== normalizeString(expected)){
        Result.firstFailedTestCase = {
          input,
          output,
          expected
        };

        break;
      }else{
        Result.totalTestCasePassed += 1;
      }
    }

    const submissionDetail = {
      whoSolved : decoded.username,
      problemTitle : problemName,
      solution : {
        language : solution.lang,
        code : solution.code
      },
      verdict : {
        testcasePassed : Result.totalTestCasePassed,
        totalTestcase : Result.totalTestCase,
        status : {
          success : Result.firstFailedTestCase ? Success.Rejected : Success.Accepted,
          message : "Submitted!"
        }
      }
    }

    const newSubmission  = new ProblemSubmission(submissionDetail);

    const submissionNew = await newSubmission.save();


    return NextResponse.json({
        verdict : Result.firstFailedTestCase ? "Wrong Answer" : "Accepted",
        Result,
        submissionNew
        
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
