"use client"
import React, { useState } from "react";
import TestResultSection from "./TestCase/TestResultSection";
import TestCaseSection from "./TestCase/TestCaseSection";
import VerdictSection from "./TestCase/VerdictSection"
import { useProblemForm } from "@/context/ProblemFormContext";

function InputOutputEditor() {
  

  const {result,showResult, resultWindow, setResultWindow} = useProblemForm();
  
  return (
    <div className="bg-[#212121] h-full rounded-[8px] overflow-hidden font-light text-md tracking-wide">
      <div className="h-full">
      <header className="flex flex-row bg-[#333333] px-4 p-1 text-sm ">
        <div className={`hover:bg-[#212121] p-2 px-4 rounded-xl ${resultWindow == "testcase" && "font-semibold"}`} onClick={()=>setResultWindow("testcase")}>
          ✅ Test Case
        </div>
        <div className={`hover:bg-[#212121] p-2 px-4 rounded-xl ${resultWindow === "testresult" && "font-semibold"}`} onClick={()=>setResultWindow("testresult")}>
          <span className="text-green-400">{` >_ `}</span> Test Result
        </div>
        <div className={`hover:bg-[#212121] p-2 px-4 rounded-xl ${resultWindow === "verdict" && "font-semibold"} ${showResult ? "visible" : "invisible"}` } onClick={()=>setResultWindow("verdict")}>
            {result?.verdict}
        </div>
      </header>
      {
        resultWindow === "testcase" && <TestCaseSection/>
      }
      {
        resultWindow === "testresult" && <TestResultSection/>
      }
      {
        resultWindow === "verdict" && <VerdictSection/>
      }

      </div>

    </div>
  );
}

export default InputOutputEditor;
