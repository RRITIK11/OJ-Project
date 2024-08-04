"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function Navigation({ isLoggedIn }: { isLoggedIn: boolean }) {
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
    <nav className="bg-gray-400 w-full flex flex-row justify-between absolute top-0 text-black px-5 py-2 opacity-[70%] font-bold  tracking-wider items-center">
      <div className=" select-none">
        Algo Galaxy
      </div>

      <div className="flex gap-8 ">
        <Link href="/problems" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Problems</Link>
        <Link href="/compiler" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Compiler</Link>
        <Link href="/courses" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Courses</Link>
      </div>
      {!isLogIn ? (
        <div className="flex gap-4">
          <Link href="/login" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Login</Link>
          <Link href="/signup" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Signup</Link>
        </div>
      ) : (
        <div>
          <button onClick={logout} className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
