"use client";
import { VerdictInterface } from "@/app/api/run/[problemName]/route";
import { useProblemForm } from "@/context/ProblemFormContext";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuid } from "uuid";


function TestResultSection() {
  const { customOutput } =  useProblemForm();

  const [currOutput, setCurrOutput] = useState<VerdictInterface | undefined>(undefined);

  useEffect(() => {
    if (customOutput && customOutput.length > 0) {
      setCurrOutput(customOutput[0]);
    }
  }, [customOutput]);

  if(!currOutput){
    return <div className="flex justify-center items-center">
      no data found
    </div>
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-4 text-gray-300 flex flex-col gap-4">
        <header className="flex flex-row justify-items-start w-full gap-2">
          {customOutput && customOutput?.map((output, idx) => (  
            <div
              className={`bg-[#333333] rounded-xl overflow-hidden ${
                output.id === currOutput.id && "bg-[#444444]"
              } gap-2 flex 
              ${
                output.status === "Accepted" ? "border-2 border-green-400" : "border-2 border-red-500" 
              }`}
            >
              <button
              className="px-3 py-1"
                onClick={() => {
                  setCurrOutput(output);
                }}
              >
                Case {idx + 1}
              </button>
            </div>
          ))}

          
        </header>
        
        <div className="flex flex-col gap-2">
          <div>Input:</div>
          <textarea
            className="w-full bg-[#333333] rounded-xl p-2 resize-y"
            value={currOutput.input}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <div>Output:</div>
          <textarea
            className="w-full bg-[#333333] rounded-xl p-2 resize-y "
            value={currOutput.output}
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <div>Expected:</div>
          <textarea
            className="w-full bg-[#333333] rounded-xl p-2 resize-y "
            value={currOutput.expected}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default TestResultSection;
