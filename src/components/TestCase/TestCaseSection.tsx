"use client";
import { useProblemForm } from "@/context/ProblemFormContext";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuid } from "uuid";


function TestCaseSection() {
  const { testcases, addTestcase, updateTestcase, deleteTestcase } =
    useProblemForm();

  const [currTestcase, setCurrTestcase] = useState(
    testcases[0] || {
      id: uuid(),
      input: "",
    }
  );

  useEffect(() => {
    if (testcases.length > 0) {
      setCurrTestcase(testcases[0]);
    } else {
      setCurrTestcase({
        id: uuid(),
        input: "",
      });
    }
  }, [testcases.length]);

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-4 text-gray-300 flex flex-col gap-4">
        <header className="flex flex-row justify-items-start w-full gap-2">
          {testcases.map((testcase, idx) => (
            <div
              className={`bg-[#333333] rounded-xl overflow-hidden ${
                currTestcase.id === testcase.id && "bg-[#555555]"
              } gap-2 flex `}
              key={testcase.id}
            >
              <button
              className="px-3 py-1"
                onClick={() => {
                  setCurrTestcase(testcase);
                }}
              >
                Case {idx + 1}
              </button>

              <button
                className={`border-l border-gray-600 flex justify-center items-center px-2 ${testcases.length===1 && "hidden"} bg-[#666666]`}
                onClick={() => {
                  deleteTestcase(testcase.id);
                }}
              >
                x
              </button>
            </div>
          ))}

          <button
            className="text-[#444444] hover:text-[#555555] rounded-xl flex justify-center items-center"
            onClick={() => {
              addTestcase();
            }}
          >
            <FaPlus />
          </button>
        </header>
        
        <div className="flex flex-col gap-2">
          <div>Input:</div>
          <textarea
            className="w-full bg-[#333333] rounded-xl p-2 resize-y h-[150px]"
            value={currTestcase.input}
            onChange={(e) => {
              setCurrTestcase({
                ...currTestcase,
                input: e.target.value,
              });
              updateTestcase(currTestcase.id, e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default TestCaseSection;
