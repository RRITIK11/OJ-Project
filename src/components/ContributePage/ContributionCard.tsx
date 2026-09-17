import type { ContributionInterface } from "@/app/(sections)/contribute/page";
import { DifficultyBadge } from "@/components/ui/badge";
import { VerificationBadge } from "@/components/ui/status-badge";

export default function ContributionCard({
  contribution,
}: {
  contribution: ContributionInterface;
}) {
  const reviewer = contribution._approvedBy
    ? `Approved by ${contribution._approvedBy}`
    : contribution._rejectedBy
    ? `Rejected by ${contribution._rejectedBy}`
    : "Awaiting review";

  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border bg-card p-3">
      <div className="min-w-0 space-y-1">
        <p className="truncate text-sm font-medium">{contribution.title}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyBadge
            difficulty={contribution.difficulty}
            className="px-2 py-0 text-[10px]"
          />
          <span className="text-xs text-muted-foreground">{reviewer}</span>
        </div>
      </div>
      <VerificationBadge status={contribution.verification} />
    </div>
  );
}
