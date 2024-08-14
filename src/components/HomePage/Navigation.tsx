"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaHome, FaPlay, FaBook, FaTrophy, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

function Navigation() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-400 w-full flex flex-row justify-between absolute top-0 text-black px-5 py-2 opacity-70 font-bold tracking-wider items-center">
      <Link href="/" className="select-none">
        Algo Galaxy
      </Link>

      <div className="flex gap-8">
        <Link href="/problems" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
          <FaBook className="text-xl" />
          Problems
        </Link>
        <Link href="/playground" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
          <FaPlay className="text-xl" />
          Playground
        </Link>
        <Link href="/courses" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
          <FaBook className="text-xl" />
          Courses
        </Link>
        <Link href="/contest" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
          <FaTrophy className="text-xl" />
          Contest
        </Link>
      </div>

      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
              <FaSignInAlt className="text-xl" />
              Login
            </Link>
            <Link href="/signup" className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
              <FaUserPlus className="text-xl" />
              Signup
            </Link>
          </>
        ) : (
          <button onClick={logout} className="flex items-center gap-2 hover:bg-gray-700 rounded-xl hover:text-white py-2 px-4">
            <FaSignOutAlt className="text-xl" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
