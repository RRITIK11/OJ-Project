"use client"
import React, { useState } from "react";
import TestResultSection from "./TestCase/TestResultSection";
import TestCaseSection from "./TestCase/TestCaseSection";

function InputOutputEditor() {
  const [resultWindow, setResultWindow] = useState<boolean>(false);
  return (
    <div className="bg-[#212121] h-full rounded-[8px] overflow-hidden font-light text-md tracking-wide">
      <header className="flex flex-row bg-[#333333] px-4 p-1 text-sm">
        <div className={`hover:bg-[#212121] p-2 px-4 rounded-xl ${!resultWindow && "font-semibold"}`} onClick={()=>setResultWindow(false)}>
          ✅ Test Case
        </div>
        <div className={`hover:bg-[#212121] p-2 px-4 rounded-xl ${resultWindow && "font-semibold"}`} onClick={()=>setResultWindow(true)}>
          <span className="text-green-400">{` >_ `}</span> Test Result
        </div>
      </header>
      {
        resultWindow ? <TestResultSection/> : <TestCaseSection/> 
      }

    </div>
  );
}

export default InputOutputEditor;
