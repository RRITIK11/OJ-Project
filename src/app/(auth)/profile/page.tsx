"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { UserInterface } from "@/models/user.model";
import { useAuth } from "@/context/AuthContext";

export default function Profilepage() {
  const {isAuthenticated, logout, user} = useAuth();
  console.log("user" , user)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      
      <h1 className="text-4xl">Profile Page</h1>
      <hr />

      <h2>
        {user == null ? (
          "no user"
        ) : (
          <Link href={`/profile/${user.username}`} >
            <div>{user?.username}</div> 
            <div>Is Admin : {user.roles.isAdmin ? "true" : "false"}</div>
            <div>Is Moderator : {user.roles.isModerator ? "true" : "false" }</div>
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
      
    </div>
  );
}
