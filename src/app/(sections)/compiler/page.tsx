"use client";
import axios from "axios";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";

type BoilerCode = {
  [key: string]: string;
};

function page() {
  const boilerCode : BoilerCode = {
    "c++" : `//Enter your code here
#include <iostream>
using namespace std;
int main(){
   cout<<"Hello World"<<endl;
}`,
    "java" : `public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
"python" : "print('Hello World')",
"javascript" : "console.log('Hello World')"
  }
  const [code, setCode] = useState<string>(boilerCode["c++"]);
  const [lang, setLang] = useState<string>("c++");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      lang,
      code,
      input
    };

    try {
      const data: any = await axios.post(
        "http://localhost:3000/api/run",
        payload
      );
      console.log(data.data.output);
      setOutput(data?.data?.output);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center h-screen">
      <div className="h-full flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Algo Galaxy Code Compiler</h1>
        <div className="flex gap-2">
          <div className="w-[600px] h-[400px] bg-[#333333]">
            <CodeMirror
              value={code}
              height="400px"
              width="600px"
              theme={vscodeDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(code) => {
                setCode(code);
              }}
            />
          </div>
          <div className="bg-pink flex flex-col">
            <select
              className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 text-black"
              onChange={(e) => {
                const selectedLang :string = e.target.value;
                setLang(selectedLang);
                setCode(boilerCode[selectedLang] || "// Code not available");
              }}
            >
              <option value="c++">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>
            <textarea
              name="input"
              id="input"
              placeholder="Enter your Input here"
              className="text-black grow"
              onChange = {(e)=>{
                setInput(e.target.value);
              }}
            ></textarea>
            Output : 
            <div className="outputbox mt-4 bg-[#222222] rounded-md shadow-md p-4 grow">
              <p
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              >
                {output}
              </p>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className=" flex items-center justify-center p-1 px-2 bg-green-400 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 me-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
