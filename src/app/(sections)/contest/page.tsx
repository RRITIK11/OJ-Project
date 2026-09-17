"use client";

import * as React from "react";
import { BarChart3, BookOpenCheck, Timer, Trophy } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { SegmentedTabs } from "@/components/layout/SegmentedTabs";
import { EmptyState } from "@/components/layout/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const tabs = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
];

const pillars = [
  {
    icon: Timer,
    title: "Timed rounds",
    text: "Fixed-length rounds with a handful of problems, from warm-ups to hard finishers.",
  },
  {
    icon: BarChart3,
    title: "Live standings",
    text: "Scoreboard updates as verdicts land, with penalties for wrong submissions.",
  },
  {
    icon: BookOpenCheck,
    title: "Editorials",
    text: "Every round ships with a written editorial and reference solutions.",
  },
];

export default function ContestPage() {
  const [tab, setTab] = React.useState("upcoming");

  return (
    <PageContainer>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Contests
            <Badge variant="secondary">Coming soon</Badge>
          </span>
        }
        description="Timed rounds with live standings. The first round is being prepared."
      >
        <SegmentedTabs tabs={tabs} value={tab} onChange={setTab} />
      </PageHeader>

      <Card className="mt-6">
        <EmptyState
          icon={Trophy}
          title={tab === "upcoming" ? "No upcoming contests" : "No past contests"}
          description={
            tab === "upcoming"
              ? "Rounds will be announced here a week before they start."
              : "Once rounds have run, their standings and editorials will be archived here."
          }
        />
      </Card>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {pillars.map((p) => (
          <Card key={p.title}>
            <CardContent className="p-5">
              <p.icon className="h-4 w-4 text-muted-foreground" />
              <p className="mt-4 text-sm font-medium">{p.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {p.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
