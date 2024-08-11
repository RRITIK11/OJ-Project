"use client"
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress"
import Link from "next/link";
import {useAddProblemForm } from "@/context/AddProblemForm";

export default function Layout({children} : any) {

  // React.useEffect(() => {
  //   const timer = setTimeout(() => setProgress(), 500)
  //   return () => clearTimeout(timer)
  // }, [])

  const {progress} = useAddProblemForm();


  return (
    <div className="flex h-screen bg-[#a59d90] flex-row relative">

      {/* loader */}
      {/* <div className="bg-red-300 top-0 m-4 absolute">4</div> */}
      <div className=" top-0 left-0 w-full absolute">
        <div className="w-[calc(100% - 2rem)] h-10 m-4 mt-10 flex justify-center items-center relative">
          <Progress value={progress} className="w-[80%]" />

          <div className="flex flex-row justify-around absolute w-[80%] items-center">
            <div className={`w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative ${progress>=10 ? " bg-[#756D61]" : "bg-[#a59d90]"}`}>
              <Link href="/contribute" className="absolute -top-8 -left-4">Home</Link>
            </div>
            <div className={`w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative ${progress>=30 ? " bg-[#756D61]" : "bg-[#a59d90]"}`}>
            <Link href="/contribute/question/background" className="absolute -top-8 -left-8">Background</Link>
            </div>
            <div className={`w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative ${progress>=50 ? " bg-[#756D61]" : "bg-[#a59d90]"}`}>
            <Link href="/contribute/question/question" className="absolute -top-8 -left-6">Question</Link>
            </div>
            <div className={`w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative ${progress>=70 ? " bg-[#756D61]" : "bg-[#8E816D]"}`}>
            <Link href="contribute/question/solution" className="absolute -top-8 -left-6">Solution</Link>
            </div>
            <div className={`w-6 h-6 bg-[#756D61] rounded-full border-4 border-[#aaaaaa] relative ${progress>=90 ? " bg-[#756D61]" : "bg-[#8E816D]"}`}>
            <Link href="/contribute/question/testcases" className="absolute -top-8 -left-7">Testcases</Link>
            </div>
          </div>

        </div>
      </div>
        {children}
    </div>
  );
}
