"use client";
import TestCase from "@/components/ContributePage/TestCase";
import React, { useState } from "react";
import Link from "next/link";
import { TestcaseInterface, useAddProblemForm } from "@/context/AddProblemForm";

const Page = () => {
  
  const {testCases, hints, setHints, addTestcase, constraints, setConstraints, followUp, setFollowUp, submitForm} = useAddProblemForm();

    return (
    <div className="w-full flex flex-row text-black h-screen">
      {/* left-section */}
      <div className="w-[60%] flex flex-col px-8 mt-[100px]">
        <h1 className="font-bold text-3xl">Create a Test Cases*</h1>
        <div className="text-lg">What does the input/output look like?</div>

        <div className="flex flex-col bg-gray-200 grow rounded-xl overflow-hidden">
          <header className="w-full bg-[#867b6b] flex flex-row text-center">
            <div className="w-[30%] p-2">Input</div>
            <div className="w-[30%] p-2">Output*</div>
            <div className="w-[30%] p-2">Explanation</div>
            <div className="w-[10%] p-2">Visible</div>
          </header>
          <div className="overflow-y-auto grow ">
            <div className="flex flex-col h-full">
              {
                testCases.map((testcase : any)=>{
                  return (
                    <TestCase key={testcase.id} testcase ={testcase}/>
                  )
                })
              }
            </div>
          </div>
          <div className="p-2 flex items-center justify-center bg-[#8E816D]">
            <button className="bg-green-300 px-3 p-1 rounded-xl" onClick={()=>{
              addTestcase();
            }}>
              Add More TestCase
            </button>
          </div>
        </div>

        <div className="w-full flex gap-2 my-2 items-center">
          <h1 className="font-bold text-xl">: Constraints</h1>
          <textarea
            placeholder="### constraint 1 ### constraint 2 ### constraint 3 ###"
            className="grow px-2 rounded-xl h-[30px]"
            value = {constraints}
            onChange={(e : any)=>{
              setConstraints(e.target.value)
            }}
          />
        </div>
        <div className="w-full flex gap-2 my-2 items-center">
          <h1 className="font-bold text-xl">: Hints </h1>
          <textarea
            placeholder="### Hint 1 ### Hint 2 ### Hint 3 ###"
            className="grow px-2 rounded-xl h-[30px]"
            value = {hints}
            onChange={(e : any)=>{
              setHints(e.target.value)
            }}
          />
        </div>
        <div className="w-full flex gap-2 my-2">
          <h1 className="font-bold text-xl">Follow up : </h1>
          <input
            type="text"
            placeholder="give a follow up!"
            className="grow px-2 rounded-xl"
            value = {followUp}
            onChange={(e: any)=>{
              setFollowUp(e.target.value)
            }}
          />
        </div>

        <div className="w-full p-2">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/solution">
              <div className="flex justify-center items-center w-14 h-14 bg-[#756D61] rounded-full font-bold text-white">
                {"<"}
              </div>
            </Link>
            {/* <Link href="/contribute"> */}
              <div className="flex justify-center items-center p-3 px-6 bg-[#756D61] rounded-full font-bold text-white text-xl cursor-pointer" onClick={()=>{
                submitForm()
              }}>
                Submit
              </div>
            {/* </Link> */}
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4 rounded-xl">
          <div className="font-bold">Give Test Cases for problem Vertict</div>
          <br />
          <div>Input/Output : Give input/output in same format as described by you on previous page</div>
          <div>Output* is mandatory for visible test cases</div>
          <div>Explanation can be give only to visible test cases</div>
          <div>Note. : </div>
          <div>It is madatory to give atleast 3 test case and one visible test case</div>
          <div>Not more than 5 test will be visible to user. If you select more than 3 to be visible then only top 5 would be visible</div>

          <div>Tip: It is good to give explanation to test case as it give more clarification to question.</div>

          <br />
          <div className="font-bold">Hint :</div>
          <div>Provide hint for user who stuck at some part.</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
