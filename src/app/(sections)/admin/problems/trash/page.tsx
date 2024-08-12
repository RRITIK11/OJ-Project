"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ProblemInterface } from "@/models/problem.model";

function Page() {
  const [problemsData, setProblemsData] = useState<ProblemInterface[]>([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/admin/problems/trash");
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
    await toast.promise(axios.post("/api/admin/problems/delete",{title}),{
      loading : "deleting problem",
      success : "problem deleted successfully",
      error : "Deletion failed"
    })
    fetchProblems();
  }
  const restoreHandler = async (title : string) =>{
    console.log("Hello")
    await toast.promise(axios.patch("/api/admin/problems/restore",{title}),{
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
    //     <div className="w-[10%] flex items-center">Created By</div>
    //     <div className="w-[10%] flex items-center">Approve By</div>
    //     <div className="w-[10%] flex items-center">Rejected By</div>
    //     <div className="w-[10%] flex items-center">Created At</div>
    //     <div className="w-[10%] flex items-center">Updated At</div>
    //     <div className="w-[10%] flex items-center justify-center">Restore</div>
    //     <div className="w-[15%] flex items-center justify-center">Permanently</div>
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
    //             <div className="w-[10%] text-center">{problem._createdBy}</div>
    //             <div className="w-[10%] text-center">{problem._approvedBy || "-"}</div>
    //             <div className="w-[10%] text-center">{problem._rejectedBy || "-"}</div>
    //             <div className="w-[10%] text-center">{createdAtFormatted}</div>
    //             <div className="w-[10%] text-center">{updatedAtFormatted}</div>
    //             <div
    //               className="w-[10%] p-1 flex justify-center items-center"
    //             >
    //               <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold"
    //               onClick={()=>restoreHandler(problem.title)}>
    //                 Restore
    //               </button>
    //             </div>
    //             <div
    //               className="w-[15%] p-1 flex justify-center items-center"
    //             >
    //               <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold" 
    //                 onClick={()=>deleteHandler(problem.title)}>
    //                 Delete
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
    <div className="w-[5%] flex items-center justify-center">S.No</div>
    <div className="w-[20%] flex items-center justify-center">Title</div>
    <div className="w-[15%] flex items-center justify-center">Created By</div>
    <div className="w-[15%] flex items-center justify-center">Approved By</div>
    <div className="w-[15%] flex items-center justify-center">Rejected By</div>
    <div className="w-[15%] flex items-center justify-center">Created</div>
    <div className="w-[15%] flex items-center justify-center">Updated</div>
    <div className="w-[10%] flex items-center justify-center">Restore</div>
    <div className="w-[10%] flex items-center justify-center">Delete</div>
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
            className="flex mx-2 my-1 p-2 text-sm gap-2 border-b-[1px] border-[#677D6A] items-center"
            key={problem._id}
          >
            <div className="w-[5%] text-center">{index + 1}</div>
            <div className="w-[20%] truncate">{problem.title}</div>
            <div className="w-[15%] text-center">{problem._createdBy}</div>
            <div className="w-[15%] text-center">{problem._approvedBy || "-"}</div>
            <div className="w-[15%] text-center">{problem._rejectedBy || "-"}</div>
            <div className="w-[15%] text-center">{createdAtFormatted}</div>
            <div className="w-[15%] text-center">{updatedAtFormatted}</div>
            <div className="w-[10%] flex justify-center">
              <button
                className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:bg-[#2A4C4C]"
                onClick={() => restoreHandler(problem.title)}
              >
                Restore
              </button>
            </div>
            <div className="w-[10%] flex justify-center">
              <button
                className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:bg-[#2A4C4C]"
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
