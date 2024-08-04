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
      const response = await axios.get("/api/problems/verifiedProblems");
      setProblemsData(response.data.problems);
      console.log(response.data.problems);
      toast.success("Problems fetched Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#262626]">
      <header className="bg-[#444444] grow-0 p-1  flex flex-row justify-between items-center">
        <div className="text-2xl px-4 py-1 flex flex-row gap-2">
          Algo Galaxy
        </div>
        <div className="flex flex-row px-4 gap-2">
          <div>Notification</div>
          <div>Dark</div>
          <div>Streak</div>
        </div>
      </header>

      <div className="flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto my-4 border-[#A3F7BF]">
        <header className="text-xl text-center bg-[#A3F7BF] p-1 text-black">
          All Problems
        </header>
        <header className="text-md font-bold border-b-gray-400 border-b-2 p-2 flex gap-2 px-8">
          <div className="w-[10%] text-center">Status</div>
          <div className="w-[70%] flex items-center">Title</div>
          <div className="w-[10%] text-center">Difficulty</div>
          <div className="w-[10%] text-center">Acceptance</div>
        </header>
        <div className="grow overflow-y-auto">
          <div className="h-full flex flex-col">
            {problemsData?.map((problem: any, index: number) => (
              <Link href={`/problems/${problem?.title?.toLowerCase().split(' ').join("-")}`} className={`flex text-sm gap-2 justify-center items-center p-2 px-8 ${index%2!=0 && "bg-gray-800"}`}>
                <div className="w-[10%] text-center">-</div>
                <div className="w-[70%] flex items-center">{problem.number}. {problem.title}</div>
                <div className="w-[10%] text-center">{problem.difficulty}</div>
                <div className="w-[10%] text-center">{problem?.status?.submissions == 0
                    ? "no data"
                    : `${
                        problem?.status?.accepted / problem?.status?.submissions
                      }%`}</div>
              </Link>
            ))}
          </div>
        </div>
        <footer className="text-xl text-center bg-[#A3F7BF] p-1 text-black">
          Pagination
        </footer>
      </div>
    </div>
  );
}

export default page;

// {/* <div className="mx-[8%] h-[100%] rounded-xl flex flex-row gap-2 ">
//           {/* left section  */}
//           <div className="flex flex-col bg-slate-600 grow rounded-xl p-2 gap-2">
//             <div className="bg-slate-700 p-2 rounded-xl">Filter</div>

//             {
//               filters.length ?
//               <div className="rounded-xl flex flex-row gap-2">
//                 <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
//                   Array <button>X</button>
//                 </div>
//                 <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
//                   Array <button>X</button>
//                 </div>
//                 <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
//                   Array <button>X</button>
//                 </div>
//                 <div className="bg-[#444444] px-2 py-1 rounded-xl text-sm font-light">
//                   Array <button>X</button>
//                 </div>
//               </div> :
//               null
//             }

//             <div className="bg-slate-800 rounded-xl p-2 grow flex flex-col">
//               <div className="flex flex-col bg-slate-600 rounded-xl h-full">
//                 <div className="border-b-[0.5px] border-gray-400 flex flex-row mx-2 px-1 gap-2 ">
//                   <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start ">
//                     Status
//                   </div>
//                   <div className="px-1 font-light text-sm text-gray-200 grow text-start">
//                     Title
//                   </div>
//                   <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
//                     Acceptance
//                   </div>
//                   <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
//                     Difficulty
//                   </div>
//                 </div>

//                 <div className="flex flex-col bg-slate-600 overflow-y-auto rounded-xl gap-1 h-[100%] overflow-hidden">
//                   {problemsData?.map((problem: any) => (
//                     <div className="border-b-[0.5px] border-gray-400 flex flex-row mx-2 px-1 gap-2 ">
//                       <Link
//                         key={problem?._id}
//                         href={`/problems/${problem.title
//                           .split(" ")
//                           .join("-")
//                           .toLowerCase()}`}
//                         className="w-full flex flex-row gap-2 bg-[#333333]"
//                       >
//                         <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
//                           -
//                         </div>
//                         <div className="px-1 font-light text-sm text-gray-200 grow text-start">
//                           {problem.number}. {problem.title}
//                         </div>
//                         <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
//                           {problem.status.accepted / problem.status.submissions}
//                           %
//                         </div>
//                         <div className="px-1 font-light text-sm text-gray-200 w-[100px] text-start">
//                           {problem.difficulty}
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* //pagination */}
//             <div className="bg-slate-500 p-2 rounded-xl">Pagination</div>
//           </div>

//           {/* right section */}
//           <div className="bg-slate-700 rounded-xl w-[300px]"></div>
//         </div> */}
