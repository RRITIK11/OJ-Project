"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { IconBell, IconMoonFilled, IconSun, IconStarFilled } from '@tabler/icons-react';

const difficultyColors = Object.freeze({
  easy: "#26A099",
  medium: "#FFB700",
  hard: "#FF6B6B",
});

type Difficulty = keyof typeof difficultyColors;

function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [problemsData, setProblemsData] = useState<any[]>([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/problem/verifiedProblems");
      setProblemsData(response.data.problems);
      toast.success("Problems fetched Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-[#1E1E1E]' : 'bg-[#262626]'}`}>
      <header className={`p-1 flex flex-row justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-[#444444]'}`}>
        <div className="text-2xl px-4 py-1 flex flex-row gap-2 text-white">
          Algo Galaxy
        </div>
        <div className="flex flex-row px-4 gap-2 items-center">
          <div className="text-white">
            <IconBell className="h-6 w-6" />
          </div>
          <div className="text-white">
            {darkMode ? (
              <IconSun className="h-6 w-6 cursor-pointer" onClick={() => setDarkMode(!darkMode)} />
            ) : (
              <IconMoonFilled className="h-6 w-6 cursor-pointer" onClick={() => setDarkMode(!darkMode)} />
            )}
          </div>
          <div className="text-white flex gap-2 items-center">
            <IconStarFilled className="h-6 w-6" />
            <div>0</div>
          </div>
        </div>
      </header>

      <div className="flex flex-col grow rounded-xl overflow-hidden mx-4 my-4">
        <header className="text-xl text-center bg-gray-400 p-2 text-black">
          All Problems
        </header>
        <header className="text-md font-bold border-b border-gray-400 p-2 flex gap-2 px-4 md:px-8 items-center">
          <div className="w-[15%] text-center">Status</div>
          <div className="w-[60%] flex items-center">Title</div>
          <div className="w-[15%] text-center">Difficulty</div>
          <div className="w-[10%] text-center">Acceptance</div>
        </header>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col">
            {problemsData?.map((problem: any, index: number) => (
              <Link
                href={`/problems/${problem?.title?.toLowerCase().split(' ').join("-")}`}
                className={`flex text-sm gap-2 justify-between items-center p-2 px-4 md:px-8 ${index % 2 !== 0 ? "bg-gray-600" : "bg-gray-700"}`}
                key={problem.title}
              >
                <div className="w-[15%] text-center">-</div>
                <div className="w-[60%] flex items-center">{problem.number}. {problem.title}</div>
                <div
                  className="w-[15%] text-center font-bold"
                  style={{ color: difficultyColors[problem.difficulty as Difficulty] }}
                >
                  {problem.difficulty}
                </div>
                <div className="w-[10%] text-center">
                  {problem?.status?.submissions === 0
                    ? "no data"
                    : `${(problem?.status?.accepted / problem?.status?.submissions * 100).toFixed(2)}%`}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <footer className="text-xl text-center bg-gray-400 p-2 text-black">
          Pagination
        </footer>
      </div>
    </div>
  );
}

export default Page;
