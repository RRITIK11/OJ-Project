"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

function page() {
  const [problemData, setProblemsData] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        "/api/moderator/VerifiedProblems"
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
    <div className=" bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto my-4">
      <header className="text-xl text-center bg-[#1A3636] p-1">Problems for Verification</header>

      <header className="text-sm bg-[#d6bd98] p-2 px-4 text-black flex font-bold">
        <div className="w-[10%]  flex items-center justify-center">S.No</div>
        <div className="w-[10%] flex items-center justify-center">Number</div>
        <div className="grow flex items-center">Title</div>
        <div className="w-[10%] flex justify-center items-center">Difficulty</div>
        <div className="w-[10%] text-md text-nowrap flex justify-center items-center">
          Acceptance Rate
        </div>
        <div className="w-[10%] text-center flex justify-center items-center">Created By</div>
        <div className="w-[15%] flex items-center justify-center"><Link href="/moderator" className="bg-[#e59595] border-red-700 border-2 rounded-xl p-1 px-4 hover:bg-[#c59595]"> {`<-`} </Link></div>
      </header>
      
      <div className="grow overflow-y-auto">
        <div className="h-full flex flex-col">
          {problemData?.map((problem: any, index: number) => (
            <div className="flex text-sm mx-4 gap-2 border-b-[1px] border-[#677D6A] justify-center items-center">
              <div className="w-[10%] flex items-center justify-center">{index + 1}</div>
              <div className="w-[10%] flex items-center justify-center">{problem?.number}</div>
              <div className="grow flex items-center ">{problem?.title}</div>
              <div className="w-[10%] flex items-center justify-center">{problem?.difficulty}</div>
              <div className="w-[10%] text-md text-nowrap flex items-center justify-center">
                {
                  problem?.status?.submissions == 0 ? "no data" : `${problem?.status?.accepted/problem?.status?.submissions}%`
                }
              </div>
              <div className="w-[10%] text-center">{problem._createdBy}</div>
              <Link
                key={problem?._id}
                href={`/problems/${problem.title
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="w-[10%] p-1 flex justify-center items-center"
              >
                <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold">
                  View
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default page;
