"use client";
import { TestcaseInterface, useAddProblemForm } from "@/context/AddProblemForm";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function TestCase( {testcase,key} : {testcase : TestcaseInterface, key : string}) {
  const {deleteTestcase, updateTestcase} = useAddProblemForm();
  return (
    <div className="flex flex-row w-full gap-2" key = {key}>
      <textarea
        name="input"
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your input here"
        value={testcase.input}
        onChange={(e: any)=>{
          updateTestcase({...testcase, input : e.target.value})
        }}
      ></textarea>
      <textarea
        name="output"
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your output here"
        value={testcase.output}
        onChange={(e: any)=>{
          updateTestcase({...testcase, output : e.target.value})
        }}
      ></textarea>
      <textarea
        name="Explanation"
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your Explanation here"
        value={testcase.explanation}
        onChange={(e: any)=>{
          updateTestcase({...testcase, explanation : e.target.value})
        }}
      ></textarea>
      <div className="w-[10%] flex flex-row h-full items-center justify-around">
        <div ><input type="checkbox" className="h-6 w-6"
        checked={testcase.visible}
        onChange={(e: any)=>{
          console.log(e.target.checked)
          updateTestcase({...testcase,  visible : e.target.checked})
        }}/> </div>
        <MdDeleteForever className="h-8 w-8 text-red-600" onClick={()=>{
          deleteTestcase(testcase.id);
        }} />
      </div>
    </div>
  );
}