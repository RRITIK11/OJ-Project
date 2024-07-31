"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

function page() {
  const [filters, setFilters] = useState([]);
  const [problemsData, setProblemsData] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/problems");
      setProblemsData(response.data.problems);
      toast.success("Problems fetched successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="h-[100%] flex flex-col bg-[##1E1E1E]">
      <header className="bg-[#444444] grow-0 p-1 m-4 rounded-2xl flex flex-row justify-between items-center">
        <div className="text-2xl px-4 py-1 flex flex-row gap-2">
          Algo Galaxy
        </div>
        <div className="flex flex-row px-4 gap-2">
          <div>Notification</div>
          <div>Dark</div>
          <div>Streak</div>
        </div>
      </header>
      <div className="grow mb-4 ">
        <div className="mx-[8%] h-[100%] rounded-xl flex flex-row gap-2 ">
          {/* left section  */}
          <div className="flex flex-col bg-slate-600 grow rounded-xl p-2 gap-2">
            <div className="bg-slate-700 p-2 rounded-xl">Filter</div>

            {
              filters.length ? 
              <div className="rounded-xl flex flex-row gap-2">
                <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
                  Array <button>X</button>
                </div>
                <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
                  Array <button>X</button>
                </div>
                <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
                  Array <button>X</button>
                </div>
                <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
                  Array <button>X</button>
                </div>
              </div> : 
              null
            }

            

            <div className="bg-slate-800 rounded-xl p-2 grow flex flex-col">
              <div className="flex flex-col bg-slate-600 rounded-xl h-full">
                <div className="border-b-[0.5px] border-gray-400 flex flex-row mx-2 px-1 gap-2 ">
                  <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start ">
                    Status
                  </div>
                  <div className="px-1 font-light text-sm text-gray-200 grow text-start">
                    Title
                  </div>
                  <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
                    Acceptance
                  </div>
                  <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
                    Difficulty
                  </div>
                </div>

                <div className="flex flex-col bg-slate-600 overflow-y-auto rounded-xl gap-1 h-[100%] overflow-hidden">
                  {problemsData?.map((problem: any) => (
                    <div className="border-b-[0.5px] border-gray-400 flex flex-row mx-2 px-1 gap-2 ">
                      <Link
                        key={problem?._id}
                        href={`/problems/${problem.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="w-full flex flex-row gap-2 bg-[#333333]"
                      >
                        <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
                          -
                        </div>
                        <div className="px-1 font-light text-sm text-gray-200 grow text-start">
                          {problem.number}. {problem.title}
                        </div>
                        <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
                          {problem.status.accepted / problem.status.submissions}
                          %
                        </div>
                        <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
                          {problem.difficulty}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* //pagination */}
            <div className="bg-slate-500 p-2 rounded-xl">Pagination</div>
          </div>

          {/* right section */}
          <div className="bg-slate-700 rounded-xl w-[300px]"></div>
        </div>
      </div>
    </div>
  );
}

export default page;
