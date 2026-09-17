"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { CheckCircle2, ExternalLink } from "lucide-react";
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

export default function VerifiedPage() {
  const [problems, setProblems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/moderator/problemVerified");
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
            <TableHead className="w-16">No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-28">Difficulty</TableHead>
            <TableHead className="w-36">Contributor</TableHead>
            <TableHead className="w-36">Approved by</TableHead>
            <TableHead className="w-20 text-right">Open</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <TableSkeletonRows rows={5} cols={7} />}
          {!loading &&
            problems.map((problem, index) => (
              <TableRow key={problem._id ?? problem.title}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {problem.number ?? "—"}
                </TableCell>
                <TableCell className="font-medium">{problem.title}</TableCell>
                <TableCell>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {problem._createdBy}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {problem._approvedBy || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild size="icon-sm" variant="ghost">
                    <Link
                      href={`/problems/${problemSlug(problem.title)}`}
                      aria-label={`Open ${problem.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && problems.length === 0 && (
        <EmptyState
          icon={CheckCircle2}
          title="No verified problems yet"
          description="Problems you approve will be listed here."
        />
      )}
    </Card>
  );
}
