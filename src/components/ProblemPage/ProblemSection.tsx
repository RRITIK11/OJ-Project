import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ProblemSection({children, params} : any) {
  const pathname = usePathname();
  console.log("Path -> ",pathname)
  return (
    <div className="bg-[#212121] h-full rounded-[8px] overflow-hidden">
      <header className="flex flex-row bg-[#333333] p-2 gap-4 text-sm px-4">
        <Link href="./description">Description</Link>
        <Link href="./solutions">Solutions</Link>
        <Link href="./submissions">Submissions</Link>
      </header>
      {children}
    </div>
  );
}

export default ProblemSection;
