"use client"
import React from "react";
import { useState } from "react";
import { TestcaseInterface } from "./TestCaseSection";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

interface TestResultInterface extends TestcaseInterface {
  output : string
}

function TestResultSection() {
  const [testcases, setTestcases] = useState<TestResultInterface[]>();
  const [count, setCount] = useState<number>(1);
  const [active, setActive] = useState<number>(1);
  return (
    <div className="overflow-y-auto h-full">
      <div className="p-4 text-gray-300 flex flex-col gap-4">
        <header className="flex flex-row justify-items-start w-full gap-2">
          <div className="bg-[#333333] p-1 px-4 rounded-xl">Case</div>
          <div
            className="text-[#444444] hover:text-[#555555] rounded-xl flex justify-center items-center"
            onClick={() => setCount(count + 1)}
          >
            <FaPlus />
          </div>
        </header>

        <div className="flex flex-col gap-2">
          <div>Input:</div>
          <textarea className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[50px]" ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <div>Output:</div>
          <textarea className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[50px]"></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <div>Expected:</div>
          <textarea className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[50px]"></textarea>
        </div>

      </div>
    </div>
  );
}


export default TestResultSection;
