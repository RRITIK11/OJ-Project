"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

function Page() {
  const [problemsData, setProblemsData] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        "/api/moderator/pendingProblemVerification"
      );
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
      <div className=" bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto mb-4">
        <header className="text-xl text-center bg-[#1A3636] p-1">Pending Problems</header>
        <header className="text-md font-bold bg-[#d6bd98] p-2 px-4 text-black flex">
          <div className="w-[10%] flex items-center">S.No</div>
          <div className="grow flex items-center">Title</div>
          <div className="w-[10%] flex items-center text-center">Difficulty</div>
          <div className="w-[10%] flex items-center">Created By</div>
          {/* <div className="w-[15%] flex items-center justify-center"><Link href="/moderator/verification" className="bg-[#e59595] border-red-700 border-2 rounded-xl p-1 px-4 hover:bg-[#c59595]"> {`->`} </Link></div> */}
          <div className="w-[15%] flex items-center justify-center"></div>
        </header>
        <div className="grow overflow-y-auto">
          <div className="h-full flex flex-col">
            {problemsData?.map((problem: any, index: number) => (
              <div className="flex mx-4 text-sm gap-2 border-b-[1px] border-[#677D6A] justify-center items-center" key={problem.title}>
                <div className="w-[10%] ">{index + 1}</div>
                <div className="grow ">{problem.title}</div>
                <div className="w-[10%] text-center">{problem.difficulty}</div>
                <div className="w-[10%] text-center">{problem._createdBy}</div>
                <Link
                  key={problem?._id}
                  href={`/moderator/pending/${problem.title.split(' ').join('-').toLowerCase()}`}
                  className="w-[15%] p-1 flex justify-center items-center"
                >
                  <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold">Verify</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

  );
}

export default Page;
