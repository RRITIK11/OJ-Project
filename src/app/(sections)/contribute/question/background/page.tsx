"use client";

import { useAddProblemForm } from "@/context/AddProblemForm";
import { Field, StepShell } from "@/components/ContributePage/StepShell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const placeholder = `Where did you come across this question? Was it a coding challenge, a phone screen or an on-site interview? How hard did it feel, and what makes it worth adding?`;

export default function BackgroundStep() {
  const {
    reasonForContribution,
    setReasonForContribtion,
    companies,
    setCompanies,
    topics,
    setTopics,
  } = useAddProblemForm();

  return (
    <StepShell
      title="Before you start"
      description="A little context helps moderators understand the question and speeds up review."
      backHref="/contribute"
      nextHref="/contribute/question/question"
      aside={
        <>
          <p>
            Thorough background raises the chance that a contribution is
            approved and published.
          </p>
          <p className="font-medium text-foreground">Sample</p>
          <p>
            “I received this problem at an on-site at Google for a new-grad SWE
            role. We spent about half an hour on it.”
          </p>
          <p>
            “There are several solutions using different techniques (DP,
            recursion, math) that beat brute force. I would rate it Medium.”
          </p>
        </>
      }
    >
      <Field
        label="Why are you contributing this question?"
        htmlFor="reason"
        required
        hint={`${reasonForContribution.length} / 5000`}
      >
        <Textarea
          id="reason"
          value={reasonForContribution}
          onChange={(e) => setReasonForContribtion(e.target.value)}
          placeholder={placeholder}
          maxLength={5000}
          className="min-h-[220px]"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company tags"
          htmlFor="companies"
          hint="Comma separated, e.g. Google, Stripe"
        >
          <Input
            id="companies"
            value={companies}
            onChange={(e) => setCompanies(e.target.value)}
            placeholder="Google, Stripe"
          />
        </Field>
        <Field
          label="Topic tags"
          htmlFor="topics"
          hint="Comma separated, e.g. binary search, graphs"
        >
          <Input
            id="topics"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="binary search, graphs"
          />
        </Field>
      </div>
    </StepShell>
  );
}
