"use client";

import * as React from "react";
import axios from "axios";
import { History } from "lucide-react";
import { Success } from "@/config/constants";
import type { ProblemSubmissionInterface } from "@/models/problemSubmission.model";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/layout/EmptyState";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { languageLabels } from "@/lib/editorTheme";
import { timeAgo } from "@/lib/format";

export function SubmissionsTable({
  endpoint,
  dataKey,
  showUser = false,
  emptyTitle,
  emptyDescription,
}: {
  endpoint: string;
  dataKey: string;
  showUser?: boolean;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const [submissions, setSubmissions] = React.useState<
    ProblemSubmissionInterface[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(endpoint);
        if (!cancelled) setSubmissions(response.data[dataKey] ?? []);
      } catch {
        if (!cancelled) setSubmissions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [endpoint, dataKey]);

  if (!loading && submissions.length === 0) {
    return (
      <EmptyState
        icon={History}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {showUser && <TableHead>User</TableHead>}
          <TableHead>Status</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Passed</TableHead>
          <TableHead className="text-right">When</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              {showUser && (
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              )}
              <TableCell>
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-14" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="ml-auto h-4 w-16" />
              </TableCell>
            </TableRow>
          ))}

        {!loading &&
          submissions.map((submission, idx) => {
            const accepted =
              submission.verdict?.status?.success === Success.Accepted;
            return (
              <TableRow key={(submission as any)._id ?? idx}>
                {showUser && (
                  <TableCell className="font-medium">
                    {submission.whoSolved}
                  </TableCell>
                )}
                <TableCell>
                  <Badge variant={accepted ? "success" : "destructive"}>
                    {accepted ? "Accepted" : "Rejected"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {languageLabels[submission.solution?.language] ??
                    submission.solution?.language}
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {submission.verdict?.testcasePassed} /{" "}
                  {submission.verdict?.totalTestcase}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {timeAgo(submission.createdAt)}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
