import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex flex-row text-black">
      {/* left-section */}
      <div className="w-[60%]  relative">
        <div className="p-8 py-24">
          <h1 className="font-bold text-2xl">Before you start...</h1>
          <div>
            We would like to understand the background of this question and your
            reasons for contributing this question.
          </div>
          <br />
          <div className="font-bold text-lg">
            Why are you contributing this question?<span>*</span>
          </div>
          <div className="w-full py-2">
            <textarea
              name=""
              id=""
              className="w-full resize-none h-[20em] text-black p-2"
              placeholder={`Providing complete background information about this question will help us better understand it and increase the chances that the contribution is approved and published.

- Where have you seen this question? 
- Was it in a coding challenge, phone screen, or an on-site interview? 
- How difficult do you think the question is? 
- Is there anything special about this question that motivates you to contribute?
`}
              maxLength={5000}
              required
            ></textarea>
          </div>

          <div className="flex flex-row gap-2 ">
            <input type="checkbox" className="w-5 h-5" />
            <div>
              Check this box if you wish to remain anonymous as the contributor
              of this question.
            </div>
          </div>

          <div className="flex flex-row gap-2 w-full justify-center">
            <div className="grow">
              <h1>Add company tags</h1>
              <input
                type="text"
                placeholder="e.g. Facebook, Apple..."
                className="w-full px-2"
              />
            </div>
            <div className="grow">
              <h1>Add topics tags</h1>
              <input
                type="text"
                placeholder="e.g. Binary Search, Graph..."
                className="w-full px-2"
              />
            </div>
          </div>
        </div>

        <div className=" absolute bottom-6 w-full">
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute"><div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white"> {"<"} </div></Link>
            <Link href="/contribute/question/question"><div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white"> {">"}</div></Link> 
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          <div>
          In order to better understand the question, we would love to see thorough explanations about the context of the question.
          </div>
          <br />
          <div>
          Sample
          </div>
          <br />
          <div>
          I received this problem at an on-site at Google for a SWE new grad position. We spent about half an hour on this problem.
          </div>
          <br />
          <div>
          I want to contribute this question because there are multiple solutions using different techniques (i.e. DP, recursion, math) that perform better than the brute force solution. I think this question would be a AlgoGalaxy Medium.


          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
