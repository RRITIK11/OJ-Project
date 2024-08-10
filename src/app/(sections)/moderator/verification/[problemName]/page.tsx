"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ProblemInterface } from "@/models/problem.model";

function Page() {
  const [problem, setProblem] = useState<ProblemInterface>();
  const [difficulty, setDifficulty] = useState<any>("easy");
  const [topics, setTopics] = useState<any>("");
  const [companies, setCompanies] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const problemName = pathnameArray[pathnameArray.length - 1];

  const fetchProblems = useCallback(async () => {
    try {
      const response = await axios.get(`/api/problems/${problemName}`);
      setProblem(response.data.problem);
      setDifficulty(response.data.problem?.difficulty);
      setTopics(response.data.problem?.topics);
      setCompanies(response.data.problem?.companies);
      setTitle(response.data.problem?.title);
      console.log(response.data.problem);
      toast.success("Problems fetched Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [problemName]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (
    <div className=" bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto my-4">
      <header className="text-xl text-center bg-[#1A3636] p-1">
        {problem ? `${problem?.title}` : "No problem Found"}
      </header>

      <div className="grow overflow-y-auto">
        <div className="h-full flex flex-row">
          <div className="flex flex-col grow overflow-hidden w-[50%] border-r-[#1A3636] border-r-2">
            <header className="text-sm bg-[#d6bd98] p-2 px-4 text-black flex font-bold">
              Description
            </header>

            <div className="grow overflow-y-auto">
              <div className="h-full flex flex-col font-light text-md tracking-widest">
                {problem ? (
                  <div className="p-4 gap-4 ">
                    <div className="font-light text-md tracking-widest border-b-[#677D6A] border-b-2 pb-4">
                      {problem?.description}
                    </div>
                    {problem?.testCases && (
                      <div className="pb-4 border-b-[#677D6A] border-b-2">
                        <div className="font-bold py-4">Example:</div>
                        <div className="flex flex-col gap-2">
                          {problem?.testCases.map((text: any) => {
                            return (
                              <div className=" flex flex-col w-full p-2 bg-[#677D6A] gap-2 rounded-xl"
                              key={text}>
                                <div className="flex gap-2">
                                  <div className="font-bold">Input: </div>
                                  <div>{text.input}</div>
                                </div>
                                <div className="flex gap-2">
                                  <div className="font-bold">Output: </div>
                                  <div>{text.output}</div>
                                </div>
                                {text?.explanation && (
                                  <div className="flex gap-2">
                                    <div className="font-bold">Explanation: </div>
                                    <div>{text.explanation}</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {problem?.hints && (
                      <div className="border-b-[#677D6A] border-b-2 py-4">
                        <div className="font-bold py-4">Hint:</div>
                        <div className="flex flex-col gap-2">
                          {problem?.hints.map((text: any, index: any) => {
                            return (
                              <div className=" flex w-full p-2 bg-[#677D6A] gap-2 rounded-xl"
                              key={text}>
                                <div>{index + 1}.</div>
                                <div>{text}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {problem?.constraints && (
                      <div>
                        <div className="font-bold py-4">Constraints:</div>
                        <div className="flex flex-col gap-2">
                          {problem?.constraints.map((text: any, index: any) => {
                            return (
                              <div className=" flex gap-2" key={text}>
                                <div className="bg-[#677D6A] p-2 rounded-xl">
                                  {text}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex justify-center items-center">
                    No Data found
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grow w-[50%]">
            <div className="h-full flex flex-col">
              <div className="flex flex-col grow overflow-hidden border-b-[#1A3636] border-b-2 h-[50%]">
                <header className="text-sm bg-[#d6bd98] p-2 px-4 text-black flex font-bold">
                  Reason for contribution
                </header>

                <div className="grow overflow-y-auto">
                  <div className="h-full flex flex-col font-light text-md tracking-widest">
                    {problem?.reasonForContribution || (
                      <div className="flex justify-center items-center h-full">
                        Not Provided
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden h-[50%]">
                <header className="text-sm bg-[#d6bd98] p-2 px-4 text-black flex font-bold">
                  Updation and Verification
                </header>
                <div className="grow overflow-y-auto">
                  <div className="h-full flex flex-col font-light text-md tracking-widest">
                    <div className="flex p-2 gap-4 items-center justify-center">
                      <div>Select Difficulty : </div>
                      <select
                        name="difficulty"
                        id="difficulty"
                        className="text-black bg-[#677D6A] p-2 rounded-xl px-4 focus:bg-white hover:bg-gray-400"
                        value={difficulty}
                        onChange={(e: any) => {
                          setDifficulty(e.target.value);
                        }}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div className="flex p-2 gap-4 items-center justify-center font-light text-md tracking-widest">
                      <div>Update Topics : </div>
                      <input
                        type="text"
                        className="text-black grow bg-[#677D6A] p-2 rounded-xl px-4 focus:font-bold focus:bg-white hover:bg-gray-400 "
                        value={topics}
                        onChange={(e: any) => {
                          setTopics(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex p-2 gap-4 items-center justify-center font-light text-md tracking-widest">
                      <div>Update Companies : </div>
                      <input
                        type="text"
                        className="text-black grow bg-[#677D6A] p-2 rounded-xl px-4 active:font-bold focus:bg-white hover:bg-gray-400 focus:font-bold"
                        value={companies}
                        onChange={(e: any) => {
                          setCompanies(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex p-2 gap-4 items-center justify-center">
                      <div>Update Title : </div>
                      <input
                        type="text"
                        className="text-black grow bg-[#677D6A] p-2 rounded-xl px-4 active:font-bold focus:bg-white hover:bg-gray-400 focus:font-bold"
                        value={title}
                        onChange={(e: any) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#d6bd98] w-full p-2 px-4 text-black flex font-bold justify-evenly ">
                  <div className="flex items-center justify-center">
                    <Link
                      href="/moderator"
                      className="bg-[#95b2e5] border-blue-700 border-2 rounded-xl p-1 px-4 hover:bg-[#959fc5]"
                    >
                      {`Update & Verify`}
                    </Link>
                  </div>
                  <div className="flex items-center justify-center">
                    <Link
                      href="/moderator"
                      className="bg-[#e59595] border-red-700 border-2 rounded-xl p-1 px-4 hover:bg-[#c59595]"
                    >
                      Reject
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
