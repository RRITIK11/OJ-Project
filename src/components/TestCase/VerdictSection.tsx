"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useProblemForm } from "@/context/ProblemFormContext";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Progress } from "../ui/progress";

function VerdictSection() {
  const { result} =
    useProblemForm();

  return (
    <div className="overflow-y-auto h-full">
      <div className="p-4 text-gray-300 flex flex-col gap-4">
        <header className="flex flex-row justify-items-start w-full gap-2">
          {/* <div className="bg-[#333333] p-1 px-4 rounded-xl">Case</div> */}
          {result?.verdict === "Accepted" && (
            <div className="font-bold text-green-400 text-xl ">
              <div className="flex justify-center gap-1 items-center">
                {" "}
                Accepted <FaCheck />
              </div>
            </div>
          )}
          {result?.verdict === "Wrong Answer" && (
            <div className="font-bold text-red-400 text-xl ">
              <div className="flex justify-center gap-1 items-center">
                {" "}
                Wrong Answer <ImCross />
              </div>
            </div>
          )}
          <div className="flex justify-center items-center gap-2">
            <div className="text-sm">Test Cases Passed : </div>
            <div>
              {result?.Result.totalTestCasePassed || 0}/
              {result?.Result.totalTestCase || 0}
            </div>
          </div>
        </header>

        <Progress
          value={
            result && result.Result.totalTestCase > 0
              ? (result.Result.totalTestCasePassed /
                  result.Result.totalTestCase) *
                100
              : 0 // or any default value
          }
          className="w-[100%]"
        />

        {result?.verdict === "Accepted" && (
          <div className="flex justify-center items-center text-6xl h-full">
            All test cases Passed ✨
          </div>
        )}

        {result?.verdict === "Wrong Answer" && (
          <div className="flex flex-col gap-2">
            <div className="text-sm border-b-[1px] py-1 border-gray-600 ">
              First failed Test Case :{" "}
            </div>
            <div className="flex flex-col py-1">
              <div className="text-sm px-2 pb-1">Input:</div>
              <textarea
                className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[50px]"
                disabled
              >
                {result?.Result.firstFailedTestCase?.input}
              </textarea>
            </div>
            <div className="flex flex-col py-1">
              <div className="text-sm px-2 pb-1">Output:</div>
              <textarea
                className="w-full resize-none bg-[#333333] rounded-xl p-2 h-[50px]"
                disabled
              >
                {result?.Result.firstFailedTestCase?.output}
              </textarea>
            </div>
            <div className="flex flex-col py-1">
              <div className="text-sm px-2 pb-1">Expected:</div>
              <textarea
                className="w-full resize-none bg-[#444444]  rounded-xl p-2 h-[50px]"
                disabled
              >
                {result?.Result.firstFailedTestCase?.expected}
              </textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerdictSection;
