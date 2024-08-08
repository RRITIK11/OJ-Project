"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProblemEditor from "@/components/ProblemEditor";
import { ProblemFormProvider, useProblemForm } from "@/context/ProblemFormContext";
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

function layout({ children, params }: any) {
  const router = useRouter();

// timer

  const [timerColapse, setTimerColapse] = useState(false);
  const [startPlay, setStartPlay] = useState(false);

  function timerColapseHandler() {
    setTimerColapse((prev) => !prev);
  }
  function startPlayHandler() {
    setStartPlay((prev) => !prev);
  }


  // allproblems

  const [problems, setProblems] = useState([]);
  const problemTitle = params.problem.split("-").join(" ").toLowerCase();
  
  const [problem, setProblem] = useState({});

  const fetchProblems = async () => {
    try {
      const response = await axios.get("/api/problems/verifiedProblems");
      const allProblems = response.data.problems;
      setProblems(allProblems);
      console.log(allProblems);
      const foundObject: any = allProblems.find(
        (element: any) => element.title.toLowerCase() === problemTitle
      );
      console.log(foundObject);
      setProblem(foundObject);
      if (foundObject === undefined) {
        toast.error("Problem don't found");
        router.push("./");
      }
      setProblem(foundObject);
      toast.success("Problem fetch successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const {lang , code ,testcases} = useProblemForm();

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      lang,
      code,
      input : testcases.map((testcase)=>testcase.input)
    };

    console.log(payload)

    try {
      const data: any = await axios.post(
        "http://localhost:3000/api/run",
        payload
      );
      console.log(data.data.output);
      // setOutput(data?.data?.output);
    } catch (error: any) {
      console.log(error.response);
    }
  };

  return (
      <div className="h-screen p-2 flex flex-col gap-2">
        {/* navigation + questions side bar */}
        <nav className="flex flex-row justify-between text-[12px] font-medium mx-4">
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
                    {problems.map((problem: any) => (
                      <Link
                        key={problem?._id}
                        href={`/problems/${problem.title
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        className="w-full flex flex-row gap-2 bg-[#333333] py-2"
                      >
                        <p>{problem.number}</p>
                        <p>{problem.title}</p>
                      </Link>
                    ))}
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
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500" onClick={handleSubmit}>
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
            <div className="text-xl">
              <Link href="../../">Algo Galaxy</Link>
            </div>
          </div>
        </nav>

        <div className="grow">
          <div className="h-full">


            <ProblemEditor problem={problem} children={children} />

          </div>
        </div>
      </div>
  );
}

export default layout;
