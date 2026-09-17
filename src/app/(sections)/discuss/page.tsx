import type { Metadata } from "next";
import { MessagesSquare, PenSquare, Search } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Discuss" };

const categories = [
  { label: "General", count: 0 },
  { label: "Interview prep", count: 0 },
  { label: "Contests", count: 0 },
  { label: "Problem help", count: 0 },
  { label: "Feedback", count: 0 },
];

export default function DiscussPage() {
  return (
    <PageContainer>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Discuss
            <Badge variant="secondary">Coming soon</Badge>
          </span>
        }
        description="Threads about problems, approaches and the platform itself."
      >
        <Button disabled>
          <PenSquare className="h-4 w-4" />
          New post
        </Button>
      </PageHeader>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_240px]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search discussions"
              className="pl-8"
              disabled
              aria-label="Search discussions"
            />
          </div>
          <Card>
            <EmptyState
              icon={MessagesSquare}
              title="No discussions yet"
              description="Posting opens once the forum launches. Problem-specific threads will link from each problem page."
            />
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <ul className="space-y-0.5">
              {categories.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground"
                >
                  {c.label}
                  <span className="font-mono text-xs">{c.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
