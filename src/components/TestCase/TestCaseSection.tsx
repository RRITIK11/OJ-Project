"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

export interface TestcaseInterface {
  id: number;
  input: string;
  output: string;
}

function TestCaseSection() {
  const [testcases, setTestcases] = useState<TestcaseInterface[]>();
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
          <textarea className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[100px]"></textarea>
        </div>

      </div>
    </div>
  );
}

export default TestCaseSection;
