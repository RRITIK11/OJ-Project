import { PageContainer } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <PageContainer size="wide">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-72" />
      </div>
      <Card className="mt-6 divide-y overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-6 px-4 py-3">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="ml-auto h-8 w-20" />
          </div>
        ))}
      </Card>
    </PageContainer>
  );
}
