"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/ui/status-badge";
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
import { timeAgo } from "@/lib/format";

export default function AdminProblemsPage() {
  const [problems, setProblems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/problems");
      setProblems(response.data.allProblem ?? []);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Could not load problems");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const moveToTrash = async (title: string) => {
    await toast.promise(axios.patch("/api/admin/problems/remove", { title }), {
      loading: "Moving to trash…",
      success: "Moved to trash",
      error: "Could not move to trash",
    });
    await load();
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-28">Difficulty</TableHead>
            <TableHead className="w-28">Status</TableHead>
            <TableHead className="w-36">Contributor</TableHead>
            <TableHead className="w-24">Created</TableHead>
            <TableHead className="w-24">Updated</TableHead>
            <TableHead className="w-16 text-right">Trash</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <TableSkeletonRows rows={6} cols={8} />}
          {!loading &&
            problems.map((p, index) => (
              <TableRow key={p._id ?? p.title}>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>
                  <DifficultyBadge difficulty={p.difficulty} />
                </TableCell>
                <TableCell>
                  <VerificationBadge status={p.verification} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p._createdBy || "—"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {timeAgo(p.createdAt)}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {timeAgo(p.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Move ${p.title} to trash`}
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => moveToTrash(p.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && problems.length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="No problems"
          description="Contributed problems, in any state, will be listed here."
        />
      )}
    </Card>
  );
}
