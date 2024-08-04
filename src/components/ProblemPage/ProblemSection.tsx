import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


function ProblemSection({children} : any) {
  const [currentSection, setCurrentSection] = useState("description");
  const pathname = usePathname();
  useEffect(()=>{
    const pathArray = pathname.split('/');
    setCurrentSection(pathArray[pathArray.length-1]);
  },[pathname,currentSection])
  return (
    <div className="flex flex-col bg-[#212121] h-full rounded-[8px] overflow-hidden">
      <header className="flex flex-row bg-[#333333] p-1 text-sm px-4">
        <Link href="./description" className={`p-2 px-4 hover:bg-[#212121] rounded-xl ${currentSection=="description" ? "font-bold" : "font-light"} `}>Description</Link>
        <Link href="./solutions" className={`p-2 px-4 hover:bg-[#212121] rounded-xl ${currentSection=="solutions" ? "font-bold" : "font-light"} `}>Solutions</Link>
        <Link href="./submissions" className={`p-2 px-4 hover:bg-[#212121] rounded-xl ${currentSection=="submissions" ? "font-bold" : "font-light"} `}>Submissions</Link>
      </header>
      <div className="grow overflow-y-auto">
        {children}
      </div>

    </div>
  );
}

export default ProblemSection;
