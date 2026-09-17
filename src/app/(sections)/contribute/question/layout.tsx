import { Stepper } from "@/components/ContributePage/Stepper";

const steps = [
  { label: "Background", href: "/contribute/question/background" },
  { label: "Question", href: "/contribute/question/question" },
  { label: "Solution", href: "/contribute/question/solution" },
  { label: "Test cases", href: "/contribute/question/testcases" },
];

export default function QuestionContributionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Contribute
          </p>
          <h1 className="text-xl font-semibold tracking-tight">
            New problem
          </h1>
        </div>
        <Stepper steps={steps} />
      </div>
      {children}
    </div>
  );
}
