import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function StepShell({
  title,
  description,
  children,
  aside,
  backHref,
  nextHref,
  onSubmit,
  submitLabel = "Submit",
  submitting = false,
  submitDisabled = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  backHref?: string;
  nextHref?: string;
  onSubmit?: () => void;
  submitLabel?: string;
  submitting?: boolean;
  submitDisabled?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-5">{children}</CardContent>
        <CardFooter className="justify-between border-t pt-6">
          {backHref ? (
            <Button asChild variant="ghost">
              <Link href={backHref}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {nextHref && (
            <Button asChild>
              <Link href={nextHref}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {onSubmit && (
            <Button
              onClick={onSubmit}
              loading={submitting}
              disabled={submitDisabled}
            >
              {submitLabel}
            </Button>
          )}
        </CardFooter>
      </Card>

      {aside && (
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-warning" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              {aside}
            </CardContent>
          </Card>
        </aside>
      )}
    </div>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  required,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium leading-none">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
