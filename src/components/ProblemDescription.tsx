"use client";

import * as React from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Briefcase, FileQuestion, Lightbulb, Tag } from "lucide-react";
import type { ProblemInterface } from "@/models/problem.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/layout/EmptyState";
import { acceptanceRate } from "@/lib/format";
import { cn } from "@/lib/utils";

interface ProblemWithStats extends ProblemInterface {
  submissionStats: { accepted: number; submissions: number };
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-2.5", className)}>
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function MonoList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="rounded-md border bg-muted/50 px-3 py-1.5 font-mono text-xs"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExampleBlock({
  index,
  input,
  output,
  explanation,
}: {
  index: number;
  input: string;
  output?: string;
  explanation?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold">Example {index}</p>
      <div className="space-y-2 rounded-lg border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
        <p>
          <span className="text-muted-foreground">Input: </span>
          <span className="whitespace-pre-wrap">{input}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Output: </span>
          <span className="whitespace-pre-wrap">{output}</span>
        </p>
        {explanation && (
          <p className="font-sans text-[13px] text-muted-foreground">
            <span className="font-medium text-foreground">Explanation: </span>
            {explanation}
          </p>
        )}
      </div>
    </div>
  );
}

function JumpChip({
  icon: Icon,
  label,
  target,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  target: string;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      className="inline-flex h-6 items-center gap-1 rounded-full border bg-background px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-3 w-3" />
      {label}
    </button>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-4 p-5">
      <Skeleton className="h-6 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <Skeleton className="mt-4 h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export default function ProblemDescription() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const problemName = parts[parts.length - 2];

  const [problem, setProblem] = React.useState<ProblemWithStats>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const response = await axios.get(`/api/problem/${problemName}`);
        if (!cancelled) setProblem(response.data.problem);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error || "Could not load the description"
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [problemName]);

  if (loading) return <DescriptionSkeleton />;

  if (!problem || !problem.title) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Problem not found"
        description="This problem may have been removed or is still awaiting review."
      />
    );
  }

  const examples = (problem.testCases ?? []).filter(
    (t: any) => t.visible !== false
  );
  const stats = problem.submissionStats ?? { accepted: 0, submissions: 0 };
  const hasTopics = !!problem.topics?.length;
  const hasCompanies = !!problem.companies?.length;
  const hasHints = !!problem.hints?.length;

  return (
    <article className="animate-fade-in space-y-7 p-5">
      <header className="space-y-3">
        <h1 className="text-lg font-semibold leading-snug tracking-tight">
          {problem.number}. {problem.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={problem.difficulty} />
          {hasTopics && <JumpChip icon={Tag} label="Topics" target="topics" />}
          {hasCompanies && (
            <JumpChip icon={Briefcase} label="Companies" target="companies" />
          )}
          {hasHints && (
            <JumpChip icon={Lightbulb} label="Hints" target="hints" />
          )}
        </div>
      </header>

      <div className="markdown">
        <Markdown rehypePlugins={[rehypeSanitize]}>
          {problem.description || ""}
        </Markdown>
      </div>

      {!!problem.inputFormat?.length && (
        <Section title="Input format">
          <MonoList items={problem.inputFormat} />
        </Section>
      )}

      {!!problem.outputFormat?.length && (
        <Section title="Output format">
          <MonoList items={problem.outputFormat} />
        </Section>
      )}

      {examples.length > 0 && (
        <div className="space-y-4">
          {examples.map((example: any, index: number) => (
            <ExampleBlock
              key={example._id ?? index}
              index={index + 1}
              input={example.input}
              output={example.output}
              explanation={example.explanation}
            />
          ))}
        </div>
      )}

      {!!problem.constraints?.length && (
        <Section title="Constraints">
          <MonoList items={problem.constraints} />
        </Section>
      )}

      {problem.followUp && (
        <Section title="Follow up">
          <p className="text-sm text-muted-foreground">{problem.followUp}</p>
        </Section>
      )}

      <dl className="grid grid-cols-3 divide-x rounded-lg border bg-muted/30 text-center">
        <div className="px-3 py-3">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Accepted
          </dt>
          <dd className="mt-1 font-mono text-sm font-medium">
            {stats.accepted}
          </dd>
        </div>
        <div className="px-3 py-3">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Submissions
          </dt>
          <dd className="mt-1 font-mono text-sm font-medium">
            {stats.submissions}
          </dd>
        </div>
        <div className="px-3 py-3">
          <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Acceptance
          </dt>
          <dd className="mt-1 font-mono text-sm font-medium">
            {acceptanceRate(stats.accepted, stats.submissions)}
          </dd>
        </div>
      </dl>

      {(hasTopics || hasCompanies || hasHints) && (
        <Accordion type="multiple" className="rounded-lg border px-4">
          {hasTopics && (
            <AccordionItem value="topics" id="topics">
              <AccordionTrigger className="py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                  Topics
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-1.5">
                  {problem.topics!.map((topic) => (
                    <Badge key={topic} variant="secondary" className="capitalize">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          {hasCompanies && (
            <AccordionItem value="companies" id="companies">
              <AccordionTrigger className="py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                  Companies
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-1.5">
                  {problem.companies!.map((company) => (
                    <Badge
                      key={company}
                      variant="secondary"
                      className="capitalize"
                    >
                      {company}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          {hasHints &&
            problem.hints!.map((hint, index) => (
              <AccordionItem
                key={index}
                value={`hint-${index}`}
                id={index === 0 ? "hints" : undefined}
                className={index === problem.hints!.length - 1 ? "border-b-0" : ""}
              >
                <AccordionTrigger className="py-3 text-sm hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                    Hint {index + 1}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {hint}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      )}
    </article>
  );
}
