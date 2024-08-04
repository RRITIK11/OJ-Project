"use client";
import TestCase from "@/components/Contribute Page/TestCase";
import React, { useState } from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex flex-row text-black h-screen">
      {/* left-section */}
      <div className="w-[60%] flex flex-col px-8 mt-[100px]">
        <h1 className="font-bold text-3xl">Create a Test Cases*</h1>
        <div className="text-lg">What does the input/output look like?</div>

        <div className="flex flex-col bg-gray-200 grow rounded-xl overflow-hidden">
          <header className="w-full bg-[#867b6b] flex flex-row text-center">
            <div className="w-[50%] p-2">Input</div>
            <div className="w-[50%] p-2">Output</div>
          </header>
          <div className="overflow-y-auto grow ">
            <div className="flex flex-col h-full">
              <TestCase />
              <TestCase />
              <TestCase />
              <TestCase />
              <TestCase />
              <TestCase />
              <TestCase />
              <TestCase />
            </div>
          </div>
          <div className="p-2 flex items-center justify-center bg-[#8E816D]">
            <button className="bg-green-300 px-3 p-1 rounded-xl">
              Add More TestCase
            </button>
          </div>
        </div>

        <div className="w-full flex gap-2 my-2">
          <h1 className="font-bold text-3xl">Hint : </h1>
          <input
            type="text"
            placeholder="e.g. hint1,hint2,.."
            className="grow px-2 rounded-xl"
          />
        </div>

        <div className="w-full p-2">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/solution">
              <div className="flex justify-center items-center w-14 h-14 bg-[#756D61] rounded-full font-bold text-white">
                {"<"}
              </div>
            </Link>
            <Link href="/contribute">
              <div className="flex justify-center items-center p-3 px-6 bg-[#756D61] rounded-full font-bold text-white text-xl">
                Submit
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          <div className="font-bold">Sample</div>
          <br />
          <div>Input: nums = [2, 7, 11, 15], target = 9</div>
          <div>Output: [0, 1]</div>
          <br />
          <div>Input: nums=[-3, 4, 3, 90], target = 0</div>
          <div>Output: [0, 2]</div>
        </div>
      </div>
    </div>
  );
};

export default page;
