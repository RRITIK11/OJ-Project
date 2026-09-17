"use client";

import { usePathname } from "next/navigation";
import { SubmissionsTable } from "@/components/ProblemPage/SubmissionsTable";

export default function SubmissionsPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const problemName = parts[parts.length - 2];

  return (
    <SubmissionsTable
      endpoint={`/api/problem/${problemName}/submission`}
      dataKey="submissions"
      emptyTitle="No submissions yet"
      emptyDescription="Your submissions for this problem will appear here."
    />
  );
}
