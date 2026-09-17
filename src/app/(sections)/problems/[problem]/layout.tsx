"use client";

import * as React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  CloudUpload,
  List,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
} from "lucide-react";
import ProblemEditor from "@/components/ProblemEditor";
import {
  ProblemFormProvider,
  useProblemForm,
} from "@/context/ProblemFormContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { problemSlug, slugToTitle } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProblemSummary {
  _id: string;
  number: string;
  title: string;
  difficulty: string;
}

function formatClock(total: number) {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

function StudyTimer() {
  const [seconds, setSeconds] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="inline-flex h-8 items-center gap-0.5 rounded-md border bg-muted/40 pl-2 pr-0.5 text-xs">
      <TimerIcon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="ml-1.5 w-12 text-center font-mono tabular-nums">
        {formatClock(seconds)}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-7 w-7"
        aria-label={running ? "Pause timer" : "Start timer"}
        onClick={() => setRunning((r) => !r)}
      >
        {running ? (
          <Pause className="h-3.5 w-3.5" />
        ) : (
          <Play className="h-3.5 w-3.5" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="h-7 w-7"
        aria-label="Reset timer"
        onClick={() => {
          setRunning(false);
          setSeconds(0);
        }}
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

function ProblemListSheet({
  problems,
  currentSlug,
  loading,
}: {
  problems: ProblemSummary[];
  currentSlug: string;
  loading: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Problem list</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 sm:max-w-sm">
        <SheetHeader className="border-b px-4 py-3 text-left">
          <SheetTitle className="text-base">Problems</SheetTitle>
          <SheetDescription className="sr-only">
            Jump to another problem
          </SheetDescription>
        </SheetHeader>
        <div className="max-h-[calc(100vh-3.5rem)] overflow-y-auto p-2">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-2">
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))
            : problems.map((p) => {
                const slug = problemSlug(p.title);
                const active = slug === currentSlug;
                return (
                  <Link
                    key={p._id}
                    href={`/problems/${slug}`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent",
                      active && "bg-accent font-medium"
                    )}
                  >
                    <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                      {p.number}
                    </span>
                    <span className="flex-1 truncate">{p.title}</span>
                    <DifficultyBadge
                      difficulty={p.difficulty}
                      className="px-2 py-0 text-[10px]"
                    />
                  </Link>
                );
              })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Workspace({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { problem: string };
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const {
    problem,
    setProblem,
    lang,
    code,
    testcases,
    setIsAvailable,
    setCustomOutput,
    setResult,
    setShowResult,
    setResultWindow,
  } = useProblemForm();

  const [problems, setProblems] = React.useState<ProblemSummary[]>([]);
  const [loadingList, setLoadingList] = React.useState(true);
  const [busy, setBusy] = React.useState<"run" | "submit" | null>(null);

  const slug = params.problem;
  const problemTitle = slugToTitle(slug);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/problem/verifiedProblems");
        const all: any[] = response.data.problems ?? [];
        if (cancelled) return;
        setProblems(all);
        const found = all.find(
          (p) => p.title.toLowerCase() === problemTitle
        );
        if (!found) {
          toast.error("That problem does not exist");
          router.push("/problems");
          return;
        }
        setProblem(found);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error || "Could not load the problem"
        );
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [problemTitle, router, setProblem]);

  const handleRun = async () => {
    if (busy) return;
    setBusy("run");
    setIsAvailable(false);
    try {
      const { data } = await axios.post(`/api/run/${slug}`, {
        inputs: testcases.map((t) => t.input),
        solution: { lang, code },
      });
      setCustomOutput(data.verdictAll);
    } catch (error: any) {
      setCustomOutput(undefined);
      toast.error(error?.response?.data?.error || "Run failed");
    } finally {
      setBusy(null);
      setIsAvailable(true);
      setResultWindow("testresult");
    }
  };

  const handleSubmit = async () => {
    if (busy) return;
    setBusy("submit");
    setIsAvailable(false);
    try {
      const response = await axios.post(`/api/submit/${slug.trim()}`, {
        solution: { lang, code },
      });
      setResult(response.data);
      setShowResult(true);
      setResultWindow("verdict");
    } catch (error: any) {
      setResult(undefined);
      toast.error(error?.response?.data?.error || "Submission failed");
    } finally {
      setBusy(null);
      setIsAvailable(true);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="grid h-11 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b px-2 sm:px-3">
        <div className="flex min-w-0 items-center gap-1">
          <ProblemListSheet
            problems={problems}
            currentSlug={slug}
            loading={loadingList}
          />
          <div className="hidden h-4 w-px bg-border sm:block" />
          <div className="hidden min-w-0 items-center gap-2 sm:flex">
            {problem ? (
              <>
                <span className="truncate text-sm font-medium">
                  {problem.number}. {problem.title}
                </span>
                <DifficultyBadge
                  difficulty={problem.difficulty}
                  className="px-2 py-0 text-[10px]"
                />
              </>
            ) : (
              <Skeleton className="h-4 w-40" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRun}
                disabled={busy !== null}
                loading={busy === "run"}
              >
                {busy !== "run" && <Play className="h-3.5 w-3.5" />}
                Run
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={busy !== null}
                loading={busy === "submit"}
              >
                {busy !== "submit" && <CloudUpload className="h-3.5 w-3.5" />}
                Submit
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center justify-end">
          <StudyTimer />
        </div>
      </div>

      <div className="min-h-0 flex-1 p-2">
        <ProblemEditor>{children}</ProblemEditor>
      </div>
    </div>
  );
}

export default function ProblemLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { problem: string };
}) {
  return (
    <ProblemFormProvider>
      <Workspace params={params}>{children}</Workspace>
    </ProblemFormProvider>
  );
}
