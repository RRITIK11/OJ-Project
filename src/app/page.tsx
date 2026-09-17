import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GitPullRequest,
  SquareTerminal,
  Zap,
  ShieldCheck,
  Languages,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Problem set",
    description:
      "Curated problems with visible examples, constraints, hints and per-problem submission history.",
    href: "/problems",
    cta: "Browse problems",
    icon: BookOpen,
  },
  {
    title: "Playground",
    description:
      "A scratchpad for quick experiments. Pick a language, paste input, run, and read the output.",
    href: "/playground",
    cta: "Open playground",
    icon: SquareTerminal,
  },
  {
    title: "Contribute",
    description:
      "Submit your own problems and test cases. Moderators review every contribution before it goes live.",
    href: "/contribute",
    cta: "Start contributing",
    icon: GitPullRequest,
  },
];

const facts = [
  {
    icon: Languages,
    label: "Four languages",
    text: "C++, Java, Python and JavaScript run on the same judge.",
  },
  {
    icon: Zap,
    label: "Instant verdicts",
    text: "Run against visible cases, then submit for the full set.",
  },
  {
    icon: ShieldCheck,
    label: "Reviewed content",
    text: "Every community problem is verified before it is listed.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="bg-glow pointer-events-none absolute inset-0 -z-10" />
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

          <div className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-center sm:pb-28 sm:pt-32">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Online judge for C++, Java, Python and JavaScript
            </div>

            <h1 className="animate-fade-in mt-7 text-4xl font-semibold tracking-tight text-foreground [animation-delay:60ms] sm:text-6xl sm:leading-[1.05]">
              Where every algorithm
              <br className="hidden sm:block" /> finds its{" "}
              <span className="text-primary">star.</span>
            </h1>

            <p className="animate-fade-in mx-auto mt-6 max-w-xl text-base text-muted-foreground [animation-delay:120ms] sm:text-lg">
              Practice curated problems, run code against real test cases, and
              help grow a community-reviewed problem set.
            </p>

            <div className="animate-fade-in mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:flex-row">
              <Button asChild size="lg">
                <Link href="/problems">
                  Explore problems
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/playground">Open playground</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group flex flex-col rounded-lg border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <f.icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {f.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {f.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex gap-3">
                <fact.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{fact.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {fact.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
