"use client";

import {
  AdminStep,
  BrandingStep,
  OnboardingLayout,
  ReviewStep,
  SchoolInformationStep,
  SubdomainStep,
} from "@/components/onboarding";

import { useMemo, useState } from "react";

import type { OnboardingStepId } from "@/components/onboarding/types";

const INITIAL_STEP_ID: OnboardingStepId = "school-details";

function RenderStep({
  stepId,
  onNext,
}: {
  stepId: OnboardingStepId;
  onNext: () => void;
}) {
  switch (stepId) {
    case "school-details":
      return <SchoolInformationStep />;
    case "admin-details":
      return <AdminStep />;
    case "branding":
      return <BrandingStep onNext={onNext} />;
    case "review":
      return <ReviewStep />;
    default: {
      // exhaustive check (should be unreachable)
      return <SubdomainStep />;
    }
  }
}

export default function SigninPage() {
  const [stepId, setStepId] = useState<OnboardingStepId>(INITIAL_STEP_ID);

  const onNext = useMemo(() => {
    return () => {
      setStepId((prev) => {
        if (prev === "branding") return "review";
        return prev;
      });
    };
  }, []);

  return (
    <OnboardingLayout stepId={stepId}>
      <RenderStep stepId={stepId} onNext={onNext} />
      <p className="mt-6 text-center text-sm text-slate-500">
        Don{"'"}t have an account?{" "}
        <a
          href="/auth/signup"
          className="font-medium text-[#722F37] hover:underline"
        >
          Sign up here
        </a>
        .
      </p>
    </OnboardingLayout>
  );
}

