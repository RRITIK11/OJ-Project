"use client";
import axios from "axios";
import React, { useState } from "react";
import Editor from 'react-simple-code-editor'
import {highlight, languages} from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

function page() {
  const [code, setCode] = useState(`
    //Enter your code here
    #include <iostream>
using namespace std;
int main(){
   cout<<"Hello World"<<endl;
}
  `);
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: "c++",
      code,
    };

    try {
      const data : any= await axios.post("http://localhost:3000/api/run", payload);
      // const req = await data.json();
      console.log(data.data.output);
      setOutput(data?.data?.output);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">AlgoU Online Code Compiler</h1>
      <select className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 text-black">
        <option value="cpp">C++</option>
        <option value="c">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>
      <br />
      <div
        className="bg-[#333333] shadow-md w-full max-w-lg mb-4"
        style={{ height: "300px", overflowY: "auto" }}
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
            backgroundColor: "#333333",
            height: "100%",
            overflowY: "auto",
          }}
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
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

      {output && (
        <div className="outputbox mt-4 bg-[#222222] rounded-md shadow-md p-4">
          <p
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          >
            {output}
          </p>
        </div>
      )}
    </div>
  );
}

export default page;
