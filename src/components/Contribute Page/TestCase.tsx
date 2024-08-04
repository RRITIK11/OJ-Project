"use client";
import React, { useState } from "react";

export default function TestCase() {
  return (
    <div className="flex flex-row w-full gap-2">
      <textarea
        name="input"
        id=""
        className="grow m-2 p-2 bg-blue-200 rounded-xl resize-none"
        placeholder="Write your input here"
      ></textarea>
      <textarea
        name="output"
        id=""
        className="grow m-2 p-2 bg-blue-200 rounded-xl resize-none"
        placeholder="Write your output here"
      ></textarea>
    </div>
  );
}