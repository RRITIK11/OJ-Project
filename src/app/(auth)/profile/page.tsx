"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { UserInterface } from "@/models/user.model";

export default function Profilepage() {
  const router = useRouter();
  const [data, setData] = useState<Partial<UserInterface> | null>(null);
  const getUserDetalis = async () => {
    const res = await axios.get("/api/user/userInfo");
    console.log(res.data.data.roles)
    toast.success("User Data fetch");
    setData(res.data.data);
  };

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2>
        {data == null ? (
          "no user"
        ) : (
          <Link href={`/profile/${data.username}`} >{data?.username}
            <div>Is Admin : {data?.roles?.isAdmin ? "true" : "false"}</div>
            <div>Is Moderator : {data?.roles?.isModerator ? "true" : "false" }</div>
          </Link>
          
        )}
      </h2>
      <hr />
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black  bg-white text-black dark:text-white flex items-center space-x-2 dark:hover:font-extrabold hover:bg-white dark:bg-gradient-to-tr from-red-600  "
        onClick={logout}
      >
        Logout
      </HoverBorderGradient>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black  bg-white text-black dark:text-white flex items-center space-x-2 dark:hover:font-extrabold hover:bg-white dark:bg-gradient-to-tr from-green-600  "
        onClick={getUserDetalis}
      >
        Get user Details
      </HoverBorderGradient>
    </div>
  );
}
