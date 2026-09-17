import { Badge, type BadgeProps } from "@/components/ui/badge";

const map: Record<string, { label: string; variant: BadgeProps["variant"] }> =
  {
    pending: { label: "Pending", variant: "warning" },
    verified: { label: "Verified", variant: "success" },
    rejected: { label: "Rejected", variant: "destructive" },
    deleted: { label: "In trash", variant: "muted" },
  };

export function VerificationBadge({
  status,
  className,
}: {
  status?: string;
  className?: string;
}) {
  const entry = map[(status || "").toLowerCase()] ?? {
    label: status || "Unknown",
    variant: "muted" as const,
  };
  return (
    <Badge variant={entry.variant} className={className}>
      {entry.label}
    </Badge>
  );
}
