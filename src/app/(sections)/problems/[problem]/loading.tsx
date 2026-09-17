import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex h-11 shrink-0 items-center justify-between border-b px-3">
        <Skeleton className="h-6 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 p-2 md:grid-cols-[45fr_55fr]">
        <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
          <div className="flex h-10 items-center gap-2 border-b bg-muted/40 px-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="space-y-3 p-5">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="mt-6 h-24 w-full" />
          </div>
        </div>
        <div className="grid min-h-0 grid-rows-[62fr_38fr] gap-2">
          <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
            <div className="flex h-10 items-center border-b bg-muted/40 px-3">
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="space-y-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4" style={{ width: `${40 + (i * 13) % 50}%` }} />
              ))}
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-lg border bg-card">
            <div className="flex h-10 items-center gap-2 border-b bg-muted/40 px-3">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="space-y-3 p-4">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
