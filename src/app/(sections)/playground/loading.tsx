import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-[1400px] flex-col gap-3 p-3 sm:p-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-3 w-64" />
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
        <Skeleton className="h-full min-h-[360px] rounded-lg" />
        <div className="grid min-h-0 grid-rows-2 gap-3">
          <Skeleton className="rounded-lg" />
          <Skeleton className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
