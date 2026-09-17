import { Stepper } from "@/components/ContributePage/Stepper";
import { Badge } from "@/components/ui/badge";

const steps = [
  { label: "Pick a problem", href: "/contribute/testcase/question" },
  { label: "Test cases", href: "/contribute/testcase/testcases" },
];

export default function TestcaseContributionLayout({
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
          <h1 className="flex items-center gap-3 text-xl font-semibold tracking-tight">
            Extra test cases
            <Badge variant="secondary">Preview</Badge>
          </h1>
        </div>
        <Stepper steps={steps} />
      </div>
      {children}
    </div>
  );
}
