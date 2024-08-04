"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { ProblemInterface } from "@/models/problem.model";
import { FaRegLightbulb } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";

function ProblemDescription() {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const problemName = pathnameArray[pathnameArray.length - 2];
  const difficultyColors = Object.freeze({
    easy: "#26A099",
    medium: "#FFB700",
    hard: "#FFB700",
  });

  const [problem, setProblem] = useState<ProblemInterface>();

  const fetchProblems = async () => {
    try {
      const response = await axios.get(`/api/problems/${problemName}`);
      setProblem(response.data.problem);
      toast.success("Problems fetched successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="flex flex-col overflow-auto h-full font-light text-md tracking-widest">
      {problem ? (
        <div className="h-full flex flex-col p-3 gap-2 mb-4">
          <div className="w-full flex flex-row justify-between ">
            <div className="text-2xl font-semibold">
              {problem?.number}. {problem?.title}
            </div>
            <div></div>
          </div>

          <div className="flex flex-row gap-2 text-sm p-2">
            <div
              className={`bg-[#333333] py-1 px-2 rounded-xl font-bold`}
              style={{ color: difficultyColors[problem.difficulty] }}
            >
              {problem?.difficulty}
            </div>
            <button className="bg-[#333333] py-1 px-2 rounded-xl flex gap-1 justify-center items-center">
              <FiTag />
              <div>Topics</div>
            </button>
            <button className="bg-[#333333] py-1 px-2 rounded-xl flex gap-1 justify-center items-center">
              <IoBagOutline />
              <div>Company</div>
            </button>
            <button className="bg-[#333333] py-1 px-2 rounded-xl flex gap-1 justify-center items-center">
              <FaRegLightbulb />
              <div>Hint</div>
            </button>
          </div>

          <div className="py-4">{problem?.description}</div>

          {problem?.example?.length && (
            <div className="py-6">
              {problem?.example?.map((element: any, index: any) => (
                <div className="" key={element._id}>
                  <div className="font-bold py-2">Example {index + 1}:</div>
                  <div className="border-l-gray-500 px-4 border-l-2">
                    <div className="flex gap-2">
                      <div className="font-bold">Input: </div>{" "}
                      <div>{element.input}</div>
                    </div>

                    <div className="flex gap-2">
                      <div className="font-bold">Output: </div>{" "}
                      <div>{element.output}</div>
                    </div>

                    {element?.explanation && (
                      <div className="flex gap-2">
                        <div className="font-bold">Explanation: </div>{" "}
                        <div>{element.explanation}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {problem?.constraints && (
            <div className="flex flex-col py-4 gap-4">
              <div className="font-bold">Constraints:</div>
              <div className="flex flex-col gap-2 px-4">
                {problem?.constraints?.map((element: any) => (
                  <div className="flex">
                    <div className="bg-[#333333] rounded-xl grow-0 px-4 p-1">
                      {element}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {problem?.followUp && (
            <div className="flex flex-row gap-2 py-4">
              <div className="font-bold">Follow up :</div>
              {problem?.followUp}
            </div>
          )}

          <div className="w-full border-b-[0.5px] border-b-slate-400 mt-4 px-2"></div>

          <div className="flex justify-between text-sm">
            <div className="flex gap-2 justify-center items-center">
              <div>Accepted</div>
              <div className="font-bold text-xl">{problem.status.accepted}</div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div>Submissions</div>
              <div className="font-bold text-xl">
                {problem.status.submissions}
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div>Accepted Rate</div>
              <div className="font-bold text-xl">
                {`${problem.status.accepted / problem.status.submissions}%`}
              </div>
            </div>
          </div>

          <div className="w-full border-b-[0.5px] border-b-slate-400 px-2"></div>

          {problem.topics && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    id="topic"
                    className="px-2 flex gap-1 justify-center items-center"
                  >
                    <FiTag />
                    <div>Topics</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2">
                    {
                      problem?.topics.map((topic)=>(
                        <div className="bg-[#333333] p-1 px-2 rounded-xl">
                          {topic}
                        </div>
                      )) 
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {problem.companies && (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    id="companies"
                    className="px-2 flex gap-1 justify-center items-center"
                  >
                    <IoBagOutline/>
                    <div>Companies</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2">
                    {
                      problem?.companies.map((company)=>(
                        <div className="bg-[#333333] p-1 px-2 rounded-xl">
                          {company}
                        </div>
                      )) 
                    }
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {problem.hint && 
            <div  id="hint">
            {
              problem?.hint.map((text : any , index : any)=>(
                <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div
                    className="px-2 flex gap-1 justify-center items-center"
                  >
                    <IoBagOutline/>
                    <div>Hint {index+1}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {text}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
              ))
            }
            </div>
          }
            
        </div>
      ) : (
        <div className="flex justify-center h-full items-center font-bold text-2xl">
          No data found
        </div>
      )}
    </div>
  );
}

export default ProblemDescription;
