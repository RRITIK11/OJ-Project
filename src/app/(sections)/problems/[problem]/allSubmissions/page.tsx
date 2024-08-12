"use client";
import { Success } from "@/config/constants";
import { ProblemSubmissionInterface } from "@/models/problemSubmission.model";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

function Page() {
  const [submissions, setSubmissions] = useState([]);
  const pathname = usePathname();
  const pathnameArray = pathname.split("/").filter(Boolean);
  const problemName = pathnameArray[pathnameArray.length - 2];
  const fetchSubmissions = useCallback(async () => {
    const response = await axios.get(`/api/problem/${problemName}/allSubmission`);
    setSubmissions(response.data.allSubmissions);
  }, [problemName]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  function timeAgo(createdAt: Date | string): string {
    if (typeof createdAt === "string") {
      createdAt = new Date(createdAt); // Convert string to Date object if needed
    }

    if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
      throw new Error("Invalid date provided");
    }

    const now = Date.now();
    const createdTime = createdAt.getTime(); // Get the timestamp of the createdAt date
    const difference = now - createdTime; // Difference in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="flex flex-col px-4 py-2">
      <header className="flex justify-around text-stone-400 text-sm border-b-[1px] py-2 border-b-stone-400">
        <div>Solved By</div>
        <div>Status</div>
        <div>Language</div>
        <div>Time</div>
        <div>Testcases Passed</div>
      </header>
      {submissions && submissions.length > 0 &&
        submissions.map(
          (submission: ProblemSubmissionInterface, idx: number) => {
            return (
              <div
                className="flex justify-around text-stone-200 text-sm border-b-[1px] py-1 border-b-stone-400"
                key={idx}
              >
                <div>{submission.whoSolved}</div>
                <div
                  className={`${
                    submission.verdict.status.success === Success.Accepted
                      ? "text-green-400"
                      : "text-red-400"
                  } font-bold`}
                >
                  {submission.verdict.status.success}
                </div>
                <div>{submission.solution.language}</div>
                <div>{timeAgo(submission.createdAt)}</div>
                <div>
                  {submission.verdict.testcasePassed} /{" "}
                  {submission.verdict.totalTestcase}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
}

export default Page;
