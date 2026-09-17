"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen, Search } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { SegmentedTabs } from "@/components/layout/SegmentedTabs";
import { EmptyState } from "@/components/layout/EmptyState";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DifficultyBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { acceptanceRate, problemSlug } from "@/lib/format";

interface ProblemRow {
  _id: string;
  number: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  status?: { accepted: number; submissions: number };
}

const difficultyTabs = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export default function ProblemsPage() {
  const [problems, setProblems] = React.useState<ProblemRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("all");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/problem/verifiedProblems");
        if (!cancelled) setProblems(response.data.problems ?? []);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Could not load problems");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) || String(p.number).includes(q)
      );
    });
  }, [problems, query, difficulty]);

  return (
    <PageContainer>
      <PageHeader
        title="Problems"
        description={
          loading
            ? "Loading the problem set…"
            : `${problems.length} verified ${
                problems.length === 1 ? "problem" : "problems"
              } across all difficulties.`
        }
      >
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or number"
            className="pl-8"
            aria-label="Search problems"
          />
        </div>
      </PageHeader>

      <div className="mt-6 flex items-center justify-between gap-4">
        <SegmentedTabs
          tabs={difficultyTabs}
          value={difficulty}
          onChange={setDifficulty}
        />
        {!loading && (
          <p className="hidden text-xs text-muted-foreground sm:block">
            Showing {filtered.length} of {problems.length}
          </p>
        )}
      </div>

      <Card className="mt-4 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-28">Difficulty</TableHead>
              <TableHead className="w-28 text-right">Acceptance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-56" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="ml-auto h-4 w-12" />
                  </TableCell>
                </TableRow>
              ))}

            {!loading &&
              filtered.map((problem) => (
                <TableRow key={problem._id ?? problem.title}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {problem.number}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/problems/${problemSlug(problem.title)}`}
                      className="font-medium hover:text-primary"
                    >
                      {problem.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-muted-foreground">
                    {acceptanceRate(
                      problem.status?.accepted,
                      problem.status?.submissions
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={BookOpen}
            title={
              problems.length === 0
                ? "No problems yet"
                : "No problems match your filters"
            }
            description={
              problems.length === 0
                ? "Verified problems will show up here once moderators approve them."
                : "Try a different search term or difficulty."
            }
          />
        )}
      </Card>
    </PageContainer>
  );
}
