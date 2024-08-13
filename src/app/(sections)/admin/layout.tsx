"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const curr = pathname.split("/").filter(Boolean);
  const currDash = curr[1];
  const currPage = curr[2];

  console.log(currPage);

  return (
    <div className="h-screen bg-[#677D6A] flex flex-col gap-2">
      <div className="text-4xl text-center bg-[#1A3636] px-2 py-2">
        Admin DashBoard
      </div>
      <div className="flex justify-center  mx-2 gap-6 items-center text-lg">
        <div className="flex bg-[#1A3636] rounded-full">
          <Link
            href="/admin/users"
            className={`p-2 px-4 ${
              currDash === "users"
                ? "bg-[#D6BD98] text-[#1A3636]   font-bold"
                : "bg-[#1A3636]"
            } rounded-full border-2 border-[#1A3636]`}
          >
            Users
          </Link>
          <Link
            href="/admin/problems"
            className={`p-2 px-4 ${
              currDash === "problems"
                ? "bg-[#D6BD98] text-[#1A3636] font-bold"
                : "bg-[#1A3636]"
            } rounded-full border-2 border-[#1A3636]`}
          >
            Problems
          </Link>
        </div>
        {
          currDash === "problems" &&
          <Link
              href="/admin/problems/trash"
              className={`${
                currPage === "trash"
                  ? "bg-[#D6BD98] text-[#1A3636] border-2 border-[#1A3636] font-bold"
                  : "bg-[#1A3636]"
              } p-2 px-4 rounded-full justify-center items-center flex`}
            >
              Trash
            </Link>
        }
        
      </div>
      {children}
    </div>
  );
}
