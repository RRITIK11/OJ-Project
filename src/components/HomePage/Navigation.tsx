"use client"
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function Navigation({isLoggedIn} : {isLoggedIn : boolean}) {
  const [isLogIn, setIsLogIn] = useState(isLoggedIn);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      setIsLogIn(false);
      // router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <nav className="bg-gray-400 w-[40%] flex flex-row justify-between absolute top-[40px] rounded-xl text-black px-5 py-2 opacity-[70%]">
        <div className="flex gap-4">
      <Link href="/problems">Problems</Link>
      <Link href="/compiler">Compiler</Link>
      <Link href="/courses">Courses</Link>

        </div>
      {
        !isLogIn ? <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
        </div> : 
        <div>
            <button onClick={logout}>Logout</button>
        </div>
      }
      
    </nav>
  );
}

export default Navigation;
