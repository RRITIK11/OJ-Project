"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { UserInterface } from "@/models/user.model";
import { formatDistanceToNow } from "date-fns";

function Page() {
  const [usersData, setUsersData] = useState<UserInterface[]>([]);

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsersData(response.data.allUser);
      console.log(response.data.allUser);
      toast.success("Problems fetched Successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-3/4 mx-auto mb-4">
      <header className="text-xl text-center bg-[#1A3636] p-1">All Users</header>
      <header className="text-md font-bold bg-[#d6bd98] p-2 px-4 text-black flex">
        <div className="w-[10%] flex items-center">S.No</div>
        <div className="grow flex items-center">Username</div>
        <div className="w-[10%] flex items-center text-center">First Name</div>
        <div className="w-[10%] flex items-center text-center">Last Name</div>
        <div className="w-[10%] flex items-center">Created At</div>
        <div className="w-[10%] flex items-center">Updated At</div>
        <div className="w-[15%] flex items-center justify-center">Delete</div>
      </header>
      <div className="grow overflow-y-auto">
        <div className="h-full flex flex-col">
          {usersData?.map((user: any, index: number) => {
            // Convert date strings to Date objects
            const createdAt = new Date(user.createdAt);
            const updatedAt = new Date(user.updatedAt);

            // Format dates as "time ago"
            const createdAtFormatted = formatDistanceToNow(createdAt, { addSuffix: true });
            const updatedAtFormatted = formatDistanceToNow(updatedAt, { addSuffix: true });
            
            return (
              <div
                className="flex mx-4 text-sm gap-2 border-b-[1px] border-[#677D6A] justify-center items-center"
                key={user._id}
              >
                <div className="w-[10%]">{index + 1}</div>
                <div className="grow">{user.username}</div>
                <div className="w-[10%] text-center">{user.firstname}</div>
                <div className="w-[10%] text-center">{user.lastname}</div>
                <div className="w-[10%] text-center">{createdAtFormatted}</div>
                <div className="w-[10%] text-center">{updatedAtFormatted}</div>
                <Link
                  key={user?._id}
                  href={`/moderator/pending/${user.username.split(' ').join('-').toLowerCase()}`}
                  className="w-[15%] p-1 flex justify-center items-center"
                >
                  <button className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:font-bold">
                    Delete User
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
