"use client";

import React, { useState } from "react";
import Link from "next/link";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const page = () => {
  const [code, setCode] = useState(`Code your possible solutions`);
  return (
    <div className="w-full flex flex-row text-black">
      {/* left-section */}
      <div className="w-[60%] relative">
        <div className="p-8 py-24">
          <h1 className="font-bold text-3xl">Share your solution *</h1>
          <div className="text-lg">
            Do you have any workable ideas or code you want to share? Link your
            playground or write your pseudocode here.
          </div>
          <div
            className="bg-[#333333] shadow-md w-full m-2"
            style={{ height: "400px", overflowY: "auto" }}
          >
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                outline: "none",
                border: "none",
                // backgroundColor: "#333333",
                height: "100%",
                overflowY: "auto",
              }}
              className="bg-pink-50 text-black"
            />
          </div>
          <div className="w-full flex gap-2">
            <h1 className="font-bold text-3xl">Hint : </h1>
            <input type="text" placeholder="e.g. hint1,hint2,.." className="grow px-2"/>
          </div>
        </div>

        <div className=" absolute bottom-6 w-full">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/question">
              <div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white">
                {"<"}
              </div>
            </Link>
            <Link href="/contribute/question/testcases">
              <div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white">
                {">"}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          <div>
            You can share a Playground link or write your pseudocode here!
          </div>
          <br />
          <div className="font-bold">Sample</div>
          <br />
          <div>The idea is</div>
          <div>
            {`When we iterate the array, we put target - current and index as (key, value) into a dictionary.
We check if the current number already exists in the dictionary. If it exists, then we have found the answer. If not, we keep searching until we find the answer or reach the end of the array.`}
          </div>
          <br />
          <pre className="bg-gray-400 ">
            {`class Solution(object):
  def twoSum(self, nums, target):
    match = {}
    for idx, n in enumerate(nums):
      if n not in match:
        match[target - n] = idx
      else:
        return match[n], idx
    return -1, -1`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default page;
