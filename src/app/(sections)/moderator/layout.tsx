"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ModerateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const currPage = pathname.split('/').filter(Boolean)[1];
  console.log(currPage)
  return (
    <div className="h-screen bg-[#677D6A] flex flex-col gap-2">
      <div className="text-4xl text-center bg-[#1A3636] px-2 py-2">
        Moderator DashBoard
      </div>
      <div className="flex justify-center  mx-2 gap-6 items-center text-lg">
        <Link  href="/moderator/pending" className={`${currPage==="pending" ? "bg-[#D6BD98] text-[#1A3636] border-2 border-[#1A3636] font-bold" : "bg-[#1A3636]"} p-2 px-4 rounded-full`}>Pending</Link>
        <div className="flex bg-[#1A3636] rounded-full">
          <Link href="/moderator/verified" className={`p-2 px-4 ${currPage==="verified" ? "bg-[#D6BD98] text-[#1A3636]   font-bold" : "bg-[#1A3636]"} rounded-full border-2 border-[#1A3636]` }>Verified</Link>
          <Link href="/moderator/rejected" className={`p-2 px-4 ${currPage==="rejected" ? "bg-[#D6BD98] text-[#1A3636] font-bold" : "bg-[#1A3636]"} rounded-full border-2 border-[#1A3636]` }>Rejected</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
