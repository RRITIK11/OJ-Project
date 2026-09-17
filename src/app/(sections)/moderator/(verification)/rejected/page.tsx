"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DifficultyBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/layout/EmptyState";
import { TableSkeletonRows } from "@/components/layout/TableSkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RejectedPage() {
  const [problems, setProblems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/moderator/problemRejected");
        if (!cancelled) setProblems(response.data.problems ?? []);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Could not load list");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-28">Difficulty</TableHead>
            <TableHead className="w-40">Contributor</TableHead>
            <TableHead className="w-40">Rejected by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <TableSkeletonRows rows={5} cols={5} />}
          {!loading &&
            problems.map((problem, index) => (
              <TableRow key={problem._id ?? problem.title}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">{problem.title}</TableCell>
                <TableCell>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {problem._createdBy}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {problem._rejectedBy || "—"}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && problems.length === 0 && (
        <EmptyState
          icon={XCircle}
          title="Nothing rejected"
          description="Contributions that do not make the cut will be listed here."
        />
      )}
    </Card>
  );
}
