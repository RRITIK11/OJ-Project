"use client";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function TestCase() {
  return (
    <div className="flex flex-row w-full gap-2">
      <textarea
        name="input"
        id=""
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your input here"
      ></textarea>
      <textarea
        name="output"
        id=""
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your output here"
      ></textarea>
      <textarea
        name="Explanation"
        id=""
        className="grow m-2 p-2  rounded-xl resize-none"
        placeholder="Write your Explanation here"
      ></textarea>
      <div className="w-[10%] flex flex-row h-full items-center justify-around">
        <div ><input type="checkbox" className="h-6 w-6"/> </div>
        <MdDeleteForever className="h-8 w-8 text-red-600" />
      </div>
    </div>
  );
}