"use client";

import * as React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { RotateCcw, Trash2 } from "lucide-react";
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
import { timeAgo } from "@/lib/format";

export default function AdminTrashPage() {
  const [problems, setProblems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [busy, setBusy] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/admin/problems/trash");
      setProblems(response.data.allProblem ?? []);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Could not load trash");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const restore = async (title: string) => {
    setBusy(title);
    try {
      await toast.promise(
        axios.patch("/api/admin/problems/restore", { title }),
        {
          loading: "Restoring…",
          success: "Problem restored",
          error: "Restore failed",
        }
      );
      await load();
    } finally {
      setBusy(null);
    }
  };

  const destroy = async (title: string) => {
    if (
      !window.confirm(
        `Permanently delete “${title}”? Submissions referencing it will be orphaned.`
      )
    ) {
      return;
    }
    setBusy(title);
    try {
      await toast.promise(
        axios.post("/api/admin/problems/delete", { title }),
        {
          loading: "Deleting…",
          success: "Problem deleted permanently",
          error: "Deletion failed",
        }
      );
      await load();
    } finally {
      setBusy(null);
    }
  };

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-28">Difficulty</TableHead>
            <TableHead className="w-32">Contributor</TableHead>
            <TableHead className="w-32">Approved by</TableHead>
            <TableHead className="w-32">Rejected by</TableHead>
            <TableHead className="w-24">Created</TableHead>
            <TableHead className="w-44 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && <TableSkeletonRows rows={5} cols={8} />}
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
                <TableCell className="text-muted-foreground">
                  {p._createdBy || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p._approvedBy || "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p._rejectedBy || "—"}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {timeAgo(p.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={busy === p.title}
                      onClick={() => restore(p.title)}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Restore
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={busy === p.title}
                      onClick={() => destroy(p.title)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!loading && problems.length === 0 && (
        <EmptyState
          icon={Trash2}
          title="Trash is empty"
          description="Problems moved to trash can be restored or deleted permanently from here."
        />
      )}
    </Card>
  );
}
