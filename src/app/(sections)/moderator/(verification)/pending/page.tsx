"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { problemSlug } from "@/lib/format";

export default function PendingPage() {
  const [problems, setProblems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get(
          "/api/moderator/pendingProblemVerification"
        );
        if (!cancelled) setProblems(response.data.problems ?? []);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Could not load queue");
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
            <TableHead className="w-28 text-right">Action</TableHead>
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
                <TableCell className="text-right">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/moderator/pending/${problemSlug(problem.title)}`}
                    >
                      Review
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && problems.length === 0 && (
        <EmptyState
          icon={Inbox}
          title="The queue is empty"
          description="New contributions will appear here as soon as they are submitted."
        />
      )}
    </Card>
  );
}
