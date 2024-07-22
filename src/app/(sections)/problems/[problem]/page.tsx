"use client";
import ProblemEditor from "@/components/ProblemEditor";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  IconAlarm,
  IconRestore,
  IconChevronLeft,
  IconCaretRight,
  IconList,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ResizableDemo () {
  const [timerColapse, setTimerColapse] = useState(false);
  const [startPlay, setStartPlay] = useState(false);

  function timerColapseHandler() {
    setTimerColapse((prev) => !prev);
  }
  function startPlayHandler() {
    setStartPlay((prev) => !prev);
  }

  const [problems, setProblems] = useState([]);

  const fetchProblems = async() =>{
    try {
      const response = await axios.get("/api/problems");

      console.log(response.data.problems);
      setProblems(response.data.problems);
      console.log(problems)
      toast.success("Problem fetch successfully")
    } catch (error : any) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    fetchProblems();
  },[])
  return (
    <div className="h-svh rounded-[4px] border-2 p-2 border-white flex flex-col gap-2">
      <nav className="rounded-[4px] flex flex-row justify-between text-[12px] font-medium mx-4">
        <Sheet>
          <SheetTrigger className="flex flex-row justify-center items-center gap-2">
            <IconList />
            <div className="text-xl">Problem List</div>
          </SheetTrigger>
          <SheetContent side="left" className="bg-[#1A1A1A]">
            <SheetHeader>
              <SheetTitle>Problem List</SheetTitle>
              <div className="w-full border-b border-white "></div>
              <SheetDescription className="overflow-y-auto max-h-[calc(100vh-80px)]">
                  <div className="flex flex-col gap-2">
                    {
                      problems.map((problem : any) =>
                      <Link key={problem?._id} href={`./${problem.title}`} className="w-full flex flex-row gap-2 bg-[#333333]">
                        <p>{problem.number}</p>
                        <p>{problem.title}</p>
                      </Link> )
                    }
                  </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <div className="flex gap-2">
          <div className="flex gap-2 bg-[#232323] p-2 px-3 rounded-xl">
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">
              Run
            </button>
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500">
              Submit
            </button>
          </div>
          <div className="flex gap-2 bg-[#232323] rounded-xl px-2">
            {timerColapse ? (
              <button
                className="flex items-center justify-center"
                onClick={timerColapseHandler}
              >
                <IconAlarm height="25px" width="25px" />
              </button>
            ) : (
              <div className="flex flex-row gap-1 transition-all duration-1000">
                <button onClick={timerColapseHandler}>
                  <IconChevronLeft />
                </button>

                <div className="flex flex-row items-center gap-0.5 justify-center  transition-all duration-1000">
                  {startPlay ? (
                    <button onClick={startPlayHandler}>
                      <IconCaretRight height="25px" width="25px" />
                    </button>
                  ) : (
                    <button onClick={startPlayHandler}>
                      <IconPlayerPauseFilled
                        height="20px"
                        width="20px"
                        stroke={1}
                      />
                    </button>
                  )}
                  <div className="font-light text-sm">00:00:00</div>
                </div>

                <button className="px-2">
                  <IconRestore height="20px" width="20px" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center">
          <div className="text-xl">Algo Galaxy</div>
        </div>
      </nav>
      <ProblemEditor className="grow  rounded-[4px] " />
    </div>
  );
}
