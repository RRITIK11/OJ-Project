"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Navigation() {
  const router = useRouter();

  const {isAuthenticated, logout} = useAuth();

  return (
    <nav className="bg-gray-400 w-full flex flex-row justify-between absolute top-0 text-black px-5 py-2 opacity-[70%] font-bold  tracking-wider items-center">
      <Link href="/" className=" select-none">
        Algo Galaxy
      </Link>

      <div className="flex gap-8 ">
        <Link href="/problems" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Problems</Link>
        <Link href="/playground" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Playground</Link>
        <Link href="/courses" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Courses</Link>
        <Link href="/contest" className="hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">Contest</Link>
      </div>
      {!isAuthenticated ? (
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
