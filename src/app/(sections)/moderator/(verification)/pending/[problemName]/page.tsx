"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, Eye, EyeOff, FileQuestion } from "lucide-react";
import { Difficulty } from "@/config/constants";
import type { ProblemInterface } from "@/models/problem.model";
import { Button } from "@/components/ui/button";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/layout/EmptyState";
import { Field } from "@/components/ContributePage/StepShell";

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardContent className="space-y-3 p-6">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-4 h-24 w-full" />
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

export default function ReviewPage() {
  const pathname = usePathname();
  const router = useRouter();
  const problemName = pathname.split("/").filter(Boolean).pop() || "";

  const [problem, setProblem] = React.useState<ProblemInterface>();
  const [loading, setLoading] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<Difficulty>(
    Difficulty.Easy
  );
  const [topics, setTopics] = React.useState("");
  const [companies, setCompanies] = React.useState("");
  const [busy, setBusy] = React.useState<"verify" | "reject" | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get(`/api/moderator/${problemName}`);
        const p = response.data.problem;
        if (cancelled || !p) return;
        setProblem(p);
        setTitle(p.title ?? "");
        setDifficulty(p.difficulty ?? Difficulty.Easy);
        setTopics((p.topics ?? []).join(", "));
        setCompanies((p.companies ?? []).join(", "));
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Could not load problem");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [problemName]);

  const toList = (value: string) =>
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const verify = async () => {
    if (busy) return;
    setBusy("verify");
    try {
      await toast.promise(
        axios.patch(`/api/moderator/${problemName}/updateAndVerify`, {
          title,
          difficulty,
          topics: toList(topics),
          companies: toList(companies),
        }),
        {
          loading: "Publishing…",
          success: "Problem verified and published",
          error: "Verification failed",
        }
      );
      router.push("/moderator/pending");
    } catch {
      setBusy(null);
    }
  };

  const reject = async () => {
    if (busy) return;
    if (!window.confirm("Reject this contribution? The author will see it as rejected.")) {
      return;
    }
    setBusy("reject");
    try {
      await toast.promise(
        axios.patch(`/api/moderator/${problemName}/rejectProblem`),
        {
          loading: "Rejecting…",
          success: "Problem rejected",
          error: "Rejection failed",
        }
      );
      router.push("/moderator/pending");
    } catch {
      setBusy(null);
    }
  };

  const visibleCases = (problem?.testCases ?? []).filter(
    (t: any) => t.visible
  );
  const hiddenCount = (problem?.testCases?.length ?? 0) - visibleCases.length;

  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
        <Link href="/moderator/pending">
          <ChevronLeft className="h-4 w-4" />
          Pending queue
        </Link>
      </Button>

      {loading ? (
        <ReviewSkeleton />
      ) : !problem ? (
        <Card>
          <EmptyState
            icon={FileQuestion}
            title="Problem not found"
            description="It may have been reviewed already or removed."
          />
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl">{problem.title}</CardTitle>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              <CardDescription>
                Contributed by{" "}
                <span className="font-medium text-foreground">
                  {problem._createdBy}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="markdown">
                <Markdown rehypePlugins={[rehypeSanitize]}>
                  {problem.description || ""}
                </Markdown>
              </div>

              {(problem.inputFormat?.length || problem.outputFormat?.length) && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {!!problem.inputFormat?.length && (
                    <Block title="Input format">
                      <ul className="space-y-1.5">
                        {problem.inputFormat.map((line, i) => (
                          <li
                            key={i}
                            className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-xs"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </Block>
                  )}
                  {!!problem.outputFormat?.length && (
                    <Block title="Output format">
                      <ul className="space-y-1.5">
                        {problem.outputFormat.map((line, i) => (
                          <li
                            key={i}
                            className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-xs"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </Block>
                  )}
                </div>
              )}

              {!!problem.testCases?.length && (
                <Block title="Test cases">
                  <div className="space-y-2">
                    {problem.testCases.map((tc: any, i: number) => (
                      <div
                        key={tc._id ?? i}
                        className="space-y-1.5 rounded-lg border bg-muted/30 p-3 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between font-sans">
                          <span className="font-medium">Case {i + 1}</span>
                          <Badge
                            variant={tc.visible ? "secondary" : "muted"}
                            className="gap-1"
                          >
                            {tc.visible ? (
                              <Eye className="h-3 w-3" />
                            ) : (
                              <EyeOff className="h-3 w-3" />
                            )}
                            {tc.visible ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                        <p>
                          <span className="text-muted-foreground">Input: </span>
                          <span className="whitespace-pre-wrap">{tc.input}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">Output: </span>
                          <span className="whitespace-pre-wrap">
                            {tc.output || "—"}
                          </span>
                        </p>
                        {tc.explanation && (
                          <p className="font-sans text-muted-foreground">
                            {tc.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {visibleCases.length} visible, {hiddenCount} hidden
                  </p>
                </Block>
              )}

              {!!problem.constraints?.length && (
                <Block title="Constraints">
                  <ul className="space-y-1.5">
                    {problem.constraints.map((c, i) => (
                      <li
                        key={i}
                        className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-xs"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {!!problem.hints?.length && (
                <Block title="Hints">
                  <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {problem.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ol>
                </Block>
              )}

              {problem.solution?.code && (
                <Block title={`Reference solution · ${problem.solution.language}`}>
                  <pre className="max-h-80 overflow-auto rounded-lg border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
                    {problem.solution.code}
                  </pre>
                </Block>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <Card className="animate-fade-in [animation-delay:60ms]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Reason for contribution</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {problem.reasonForContribution?.trim() || (
                  <span className="italic">Not provided.</span>
                )}
              </CardContent>
            </Card>

            <Card className="animate-fade-in [animation-delay:120ms]">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm">Review</CardTitle>
                <CardDescription>
                  Adjust the metadata, then publish or reject.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label="Title" htmlFor="title">
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field>
                <Field label="Difficulty" htmlFor="difficulty">
                  <Select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) =>
                      setDifficulty(e.target.value as Difficulty)
                    }
                  >
                    <option value={Difficulty.Easy}>Easy</option>
                    <option value={Difficulty.Medium}>Medium</option>
                    <option value={Difficulty.Hard}>Hard</option>
                  </Select>
                </Field>
                <Field label="Topics" htmlFor="topics" hint="Comma separated">
                  <Input
                    id="topics"
                    value={topics}
                    onChange={(e) => setTopics(e.target.value)}
                  />
                </Field>
                <Field
                  label="Companies"
                  htmlFor="companies"
                  hint="Comma separated"
                >
                  <Input
                    id="companies"
                    value={companies}
                    onChange={(e) => setCompanies(e.target.value)}
                  />
                </Field>
              </CardContent>
              <Separator />
              <CardFooter className="justify-between pt-4">
                <Button
                  variant="outline"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={reject}
                  loading={busy === "reject"}
                  disabled={busy !== null}
                >
                  Reject
                </Button>
                <Button
                  onClick={verify}
                  loading={busy === "verify"}
                  disabled={busy !== null || !title.trim()}
                >
                  Verify and publish
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
