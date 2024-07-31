"use client"
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress"


export default function layout({children} : any) {
  const [progress, setProgress] = useState(40);

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(), 500)
  //   return () => clearTimeout(timer)
  // }, [])


  return (
    <div className="flex h-screen bg-[#a59d90] flex-row relative">

      {/* loader */}
      {/* <div className="bg-red-300 top-0 m-4 absolute">4</div> */}
      <div className=" top-0 left-0 w-full absolute">
        <div className="w-[calc(100% - 2rem)] h-10 m-4 mt-10 flex justify-center items-center relative">
          <Progress value={progress} className="w-[80%]" />
          <div className="flex flex-row justify-around absolute w-[80%] items-center">
            <div className="w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative">
              <div className="absolute -top-8 -left-4">Home</div>
            </div>
            <div className="w-6 h-6 bg-[#a59d90] rounded-full border-4 border-[#aaaaaa] relative">
            <div className="absolute -top-8 -left-8">Question</div>
            </div>
            <div className="w-6 h-6 bg-[#a59d90] rounded-full border-4 border-[#aaaaaa] relative">
            <div className="absolute -top-8 -left-6">Code</div>
            </div>
            <div className="w-6 h-6 bg-[#8e816d] rounded-full border-4 border-[#aaaaaa] relative">
            <div className="absolute -top-8 -left-7">Testcases</div>
            </div>
          </div>
        </div>
      </div>
        {children}
    </div>
  );
}
