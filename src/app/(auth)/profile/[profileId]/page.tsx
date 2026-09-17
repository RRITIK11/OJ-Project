import type { Metadata } from "next";
import { Activity } from "lucide-react";
import { initials } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/layout/EmptyState";

type Props = { params: { profileId: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: params.profileId };
}

const stats = [
  { label: "Solved", value: "—" },
  { label: "Submissions", value: "—" },
  { label: "Contributions", value: "—" },
];

export default function PublicProfilePage({ params }: Props) {
  const username = decodeURIComponent(params.profileId);

  return (
    <div className="w-full max-w-2xl animate-fade-in space-y-4">
      <Card>
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary ring-1 ring-primary/20">
            {initials(username)}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {username}
              </h1>
              <Badge variant="muted">Member</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Public profiles are being built. Stats below will fill in once
              they ship.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 font-mono text-xl font-semibold">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Recent activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <EmptyState
            icon={Activity}
            title="Nothing to show yet"
            description="Accepted submissions and contributions will appear here."
            className="py-10"
          />
        </CardContent>
      </Card>
    </div>
  );
}
