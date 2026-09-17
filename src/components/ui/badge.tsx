import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        success:
          "border-success/20 bg-success/10 text-success",
        warning:
          "border-warning/20 bg-warning/10 text-warning",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

type Difficulty = "easy" | "medium" | "hard";

const difficultyVariant: Record<Difficulty, BadgeProps["variant"]> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty?: string;
  className?: string;
}) {
  const key = (difficulty || "").toLowerCase() as Difficulty;
  const variant = difficultyVariant[key] ?? "muted";
  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {difficulty || "unknown"}
    </Badge>
  );
}

export { Badge, badgeVariants, DifficultyBadge };
