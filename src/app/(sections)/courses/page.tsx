import type { Metadata } from "next";
import { Binary, GitBranch, Layers, Lock } from "lucide-react";
import { PageContainer, PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Courses" };

const courses = [
  {
    icon: Layers,
    title: "Data structures",
    description:
      "Arrays, linked lists, stacks, queues, heaps and hash maps, with a problem set after each lesson.",
    lessons: 12,
    level: "Beginner",
  },
  {
    icon: GitBranch,
    title: "Graphs and trees",
    description:
      "Traversals, shortest paths, union-find and tree DP, built up from first principles.",
    lessons: 10,
    level: "Intermediate",
  },
  {
    icon: Binary,
    title: "Dynamic programming",
    description:
      "Recognising overlapping subproblems and turning recurrences into fast, memory-light code.",
    lessons: 8,
    level: "Advanced",
  },
];

export default function CoursesPage() {
  return (
    <PageContainer>
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            Courses
            <Badge variant="secondary">Coming soon</Badge>
          </span>
        }
        description="Short, practical tracks that pair lessons with problems from the judge."
      />

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <course.icon className="h-4 w-4" />
                </span>
                <Badge variant="muted">{course.level}</Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold">{course.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">
                {course.description}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {course.lessons} lessons planned
              </p>
              <Button variant="outline" className="mt-4 w-full" disabled>
                <Lock className="h-3.5 w-3.5" />
                Not yet available
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
