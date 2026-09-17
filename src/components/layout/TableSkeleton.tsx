import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const widths = ["w-6", "w-40", "w-16", "w-24", "w-20", "w-24", "w-16", "w-20"];

export function TableSkeletonRows({
  rows = 5,
  cols = 4,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r} className="hover:bg-transparent">
          {Array.from({ length: cols }).map((_, c) => (
            <TableCell key={c}>
              <Skeleton className={`h-4 ${widths[c % widths.length]}`} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
