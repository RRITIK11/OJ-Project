"use client";

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Coins,
  FileQuestion,
  FlaskConical,
  GitPullRequest,
} from "lucide-react";
import { Difficulty, Verification } from "@/config/constants";
import ContributionCard from "@/components/ContributePage/ContributionCard";
import { PageContainer } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ContributionInterface {
  _id: string;
  title: string;
  difficulty: Difficulty;
  number: string;
  verification: Verification;
  _approvedBy?: string | null;
  _rejectedBy?: string | null;
}

type Choice = "question" | "testcase";

const choices: {
  value: Choice;
  title: string;
  description: string;
  reward: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "question",
    title: "A new problem",
    description:
      "Statement, reference solution and test cases. Reviewed by a moderator before publishing.",
    reward: "+1000 coins on approval",
    icon: FileQuestion,
  },
  {
    value: "testcase",
    title: "Extra test cases",
    description:
      "Strengthen an existing problem with tricky inputs and edge cases.",
    reward: "+100 coins on approval",
    icon: FlaskConical,
  },
];

export default function ContributePage() {
  const router = useRouter();
  const [choice, setChoice] = React.useState<Choice>("question");
  const [contributions, setContributions] = React.useState<
    ContributionInterface[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await axios.get("/api/contribution");
        if (!cancelled) setContributions(response.data.contributions ?? []);
      } catch {
        if (!cancelled) setContributions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageContainer size="wide">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <GitPullRequest className="h-3.5 w-3.5" />
            Community contributions
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Add to the problem set
          </h1>
          <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">
            Seen a great interview question or a nasty edge case? Contribute it
            here. Moderators review every submission, and approved work earns
            coins on your profile.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {choices.map((option) => {
              const active = choice === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setChoice(option.value)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col rounded-lg border p-4 text-left transition-colors",
                    active
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "hover:border-primary/40 hover:bg-accent/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-md",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <option.icon className="h-4 w-4" />
                  </span>
                  <span className="mt-4 text-sm font-semibold">
                    {option.title}
                  </span>
                  <span className="mt-1 flex-1 text-sm leading-6 text-muted-foreground">
                    {option.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-warning">
                    <Coins className="h-3.5 w-3.5" />
                    {option.reward}
                  </span>
                </button>
              );
            })}
          </div>

          <Button
            size="lg"
            className="mt-6"
            onClick={() => router.push(`/contribute/${choice}`)}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <Card className="h-fit animate-fade-in [animation-delay:80ms]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your contributions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              ))}

            {!loading && contributions.length === 0 && (
              <EmptyState
                icon={GitPullRequest}
                title="Nothing submitted yet"
                description="Problems and test cases you contribute will show their review status here."
                className="py-8"
              />
            )}

            {!loading &&
              contributions.map((c) => (
                <ContributionCard key={c._id} contribution={c} />
              ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
