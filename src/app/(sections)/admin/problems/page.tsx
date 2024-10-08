"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { UserInterface } from "@/models/user.model";
import { formatDistanceToNow } from "date-fns";
import { ProblemInterface } from "@/models/problem.model";
import { useRouter } from "next/navigation";

function Page() {
  const [problemsData, setProblemsData] = useState<ProblemInterface[]>([]);
  const router = useRouter()
  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/admin/problems");
      setProblemsData(response.data.allProblem);
      console.log(response.data.allProblem);
      toast.success("Problems fetched Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const deleteHandler = async (title : string) =>{
    console.log("Hello")
    await toast.promise(axios.patch("/api/admin/problems/remove",{title}),{
      loading : "deleting problem",
      success : "problem deleted successfully",
      error : "Deletion failed"
    })
    fetchProblems();
  }

  return (
    // <div className="bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto mb-4">
    //   <header className="text-xl text-center bg-[#1A3636] p-1">All Problem</header>
    //   <header className="text-md font-bold bg-[#d6bd98] p-2 px-4 text-black flex">
    //     <div className="w-[10%] flex items-center">S.No</div>
    //     <div className="grow flex items-center">title</div>
    //     <div className="w-[10%] flex items-center">Verification</div>
    //     <div className="w-[10%] flex items-center">Created At</div>
    //     <div className="w-[10%] flex items-center">Updated At</div>
    //     <div className="w-[15%] flex items-center justify-center">Delete</div>
    //   </header>
    //   <div className="grow overflow-y-auto">
    //     <div className="h-full flex flex-col">
    //       {problemsData?.map((problem: any, index: number) => {
    //         // Convert date strings to Date objects
    //         const createdAt = new Date(problem.createdAt);
    //         const updatedAt = new Date(problem.updatedAt);

    //         // Format dates as "time ago"
    //         const createdAtFormatted = formatDistanceToNow(createdAt, { addSuffix: true });
    //         const updatedAtFormatted = formatDistanceToNow(updatedAt, { addSuffix: true });
            
    //         return (
    //           <div
    //             className="flex mx-4 text-sm gap-2 border-b-[1px] border-[#677D6A] justify-center items-center"
    //             key={problem._id}
    //           >
    //             <div className="w-[10%]">{index + 1}</div>
    //             <div className="grow">{problem.title}</div>
    //             <div className="w-[10%] text-center">{problem.verification.toUpperCase()}</div>
    //             <div className="w-[10%] text-center">{createdAtFormatted}</div>
    //             <div className="w-[10%] text-center">{updatedAtFormatted}</div>
    //             <div
    //               className="w-[15%] p-1 flex justify-center items-center"
    //             >
    //               <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold" onClick={() => deleteHandler(problem.title)}>
    //                 Delete problem
    //               </button>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
    <div className="bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto mb-4">
  <header className="text-xl text-center bg-[#1A3636] p-2">All Problems</header>
  <header className="text-md font-bold bg-[#d6bd98] p-2 flex border-b-2 border-[#677D6A] text-black">
    <div className="w-[10%] flex items-center justify-center">S.No</div>
    <div className="w-[40%] flex items-center justify-center">Title</div>
    <div className="w-[15%] flex items-center justify-center">Verification</div>
    <div className="w-[15%] flex items-center justify-center">Created</div>
    <div className="w-[15%] flex items-center justify-center">Updated</div>
    <div className="w-[15%] flex items-center justify-center">Actions</div>
  </header>
  <div className="grow overflow-y-auto">
    <div className="h-full flex flex-col">
      {problemsData?.map((problem: any, index: number) => {
        // Convert date strings to Date objects
        const createdAt = new Date(problem.createdAt);
        const updatedAt = new Date(problem.updatedAt);

        // Format dates as "time ago"
        const createdAtFormatted = formatDistanceToNow(createdAt, { addSuffix: true });
        const updatedAtFormatted = formatDistanceToNow(updatedAt, { addSuffix: true });

        return (
          <div
            className="flex mx-4 text-sm gap-2 border-b-[1px] border-[#677D6A] items-center py-1"
            key={problem._id}
          >
            <div className="w-[10%] text-center">{index + 1}</div>
            <div className="w-[40%] truncate">{problem.title}</div>
            <div className="w-[15%] text-center">{problem.verification.toUpperCase()}</div>
            <div className="w-[15%] text-center">{createdAtFormatted}</div>
            <div className="w-[15%] text-center">{updatedAtFormatted}</div>
            <div className="w-[15%] flex justify-center">
              <button
                className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:bg-[#2A4C4C] hover:font-bold"
                onClick={() => deleteHandler(problem.title)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      
    </div>
  </div>
</div>

  );
}

export default Page;
