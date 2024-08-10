"use client";
import React from "react";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const Page = () => {
  const [value, setValue] = React.useState("**Hello world!!!**");
  const handleEditorChange = (value?: string) => {
    setValue(value || "");
  };
  return (
    <div className="w-full flex flex-row text-black">
      {/* left-section */}
      <div className="w-[60%] relative">
        <div className="p-8 py-24">
          <h1 className="font-bold text-3xl">
            Name and describe your question
          </h1>
          <div className="text-lg">
            It&apos;s good to provide examples which will help users understand
            easily.
          </div>

          <div className="flex flex-row gap-2 my-2">
            <div className="flex flex-col grow gap-1">
              <label htmlFor="title" className="text-lg">
                Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Pick a title"
                className="h-8 px-2"
              />
            </div>
            <div className="flex flex-col grow gap-1">
              <label htmlFor="difficulty" className="text-lg">
                Suggested Difficulty*
              </label>
              <select id="difficulty" className="h-8 px-2">
                <option value="easy" id="easy">
                  Easy
                </option>
                <option value="medium" id="medium">
                  Medium
                </option>
                <option value="hard" id="hard">
                  Hard
                </option>
              </select>
            </div>
          </div>

          <div className="container mx-auto py-4">
          <h1>Description *</h1>
      <div className="w-full h-[600px] overflow-hidden">
        <MDEditor
          value={value}
          onChange={handleEditorChange}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          style={{
            height: '100%', // Make the editor fill the container height
            resize: 'none', // Disable resizing
          }}
          className="w-full h-full"
        />
      </div>
    </div>
        </div>

        <div className=" absolute bottom-6 w-full">
        
          <div className="flex flex-row justify-between px-10 py-2">
            <Link href="/contribute/question/background">
              <div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white">
                {" "}
                {"<"}{" "}
              </div>
            </Link>
            <Link href="/contribute/question/solution">
              <div className="flex justify-center items-center w-10 h-10 bg-[#756D61] rounded-full font-bold text-white">
                {" "}
                {">"}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* righ-section */}
      <div className="w-[40%] bg-[#8e816d] flex flex-col justify-center items-center p-12">
        <div className="bg-gray-200 border-2 border-black text-sm p-4">
          <div className="font-bold">
            1. Great titles are concise, descriptive, and specific.
          </div>
          <div>❌ Find Substring</div>
          <div>✅ Shortest Unsorted Continuous Subarray</div>
          <br />
          <div className="font-bold">
            2. Clearly describe your question, and check our question set to
            make sure your problem isn’t already there.
          </div>
          <br />
          <div className="font-bold">Sample</div>
          <br />
          <div>
            Given an array of integers, return indices of the two numbers such
            that they add up to a specific target.
          </div>
          <br />
          <div>
            You may assume that each input would have exactly one solution, and
            you may not use the same element twice.
          </div>
          <br />
          <div className="font-bold">Example</div>
          <div>
            {`Given nums=[2,7,11,15], target = 9 Because nums[0] + nums[1] = 2+7 = 9, return [0,1].`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
