"use client";

import { usePathname } from "next/navigation";
import { SubmissionsTable } from "@/components/ProblemPage/SubmissionsTable";

export default function AllSubmissionsPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const problemName = parts[parts.length - 2];

  return (
    <SubmissionsTable
      endpoint={`/api/problem/${problemName}/allSubmission`}
      dataKey="allSubmissions"
      showUser
      emptyTitle="Nobody has submitted yet"
      emptyDescription="Be the first to solve this problem."
    />
  );
}
