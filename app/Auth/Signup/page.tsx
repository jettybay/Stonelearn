"use client";

import {
  AdminStep,
  BrandingStep,
  LogoStep,
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
  onBack,
}: {
  stepId: OnboardingStepId;
  onNext: (payload?: unknown) => void;
  onBack?: () => void;
}) {

  switch (stepId) {
    case "school-details":
      return (
        <SchoolInformationStep
          onNext={() => onNext()}
        />
      );
    case "subdomain":
      return <SubdomainStep onBack={onBack} onNext={() => onNext()} />;
    case "branding":
      return <BrandingStep onNext={() => onNext()} />;
    case "logo":
      return (
        <LogoStep
          onBack={onBack}
          onNext={(logoFile) => onNext(logoFile)}
        />
      );
    case "admin-details":
      return <AdminStep onBack={onBack} onNext={() => onNext()} />;
    case "review":
      return <ReviewStep onBack={onBack} />;
    default: {
      return null;
    }
  }
}

export default function SignupPage() {
  const [stepId, setStepId] = useState<OnboardingStepId>(INITIAL_STEP_ID);

  const stepOrder: OnboardingStepId[] = useMemo(
    () => [
      "school-details",
      "subdomain",
      "branding",
      "logo",
      "admin-details",
      "review",
    ],
    []
  );

  const goNext = useMemo(() => {
    return () => {
      setStepId((prev) => {
        const idx = stepOrder.indexOf(prev);
        const next = stepOrder[Math.min(idx + 1, stepOrder.length - 1)];
        return next ?? prev;
      });
    };
  }, [stepOrder]);

  const goBack = useMemo(() => {
    return () => {
      setStepId((prev) => {
        const idx = stepOrder.indexOf(prev);
        const next = stepOrder[Math.max(idx - 1, 0)];
        return next ?? prev;
      });
    };
  }, [stepOrder]);



  return (
    <OnboardingLayout stepId={stepId}>
      <RenderStep
        stepId={stepId}
        onNext={(payload) => {
          // payload currently unused; reserved for wiring to backend
          void payload;
          goNext();
        }}
        onBack={goBack}
      />
    </OnboardingLayout>
  );
}


