import {
  AdminStep,
  BrandingStep,
  OnboardingLayout,
  ReviewStep,
  SchoolInformationStep,
  SubdomainStep,
} from "@/components/onboarding";

import type { OnboardingStepId } from "@/components/onboarding/types";

const INITIAL_STEP_ID: OnboardingStepId = "school-details";

function RenderStep({ stepId }: { stepId: OnboardingStepId }) {
  switch (stepId) {
    case "school-details":
      return <SchoolInformationStep />;
    case "admin-details":
      return <AdminStep />;
    case "branding":
      return <BrandingStep />;
    case "review":
      return <ReviewStep />;
    default: {
      // exhaustive check (should be unreachable)
      return <SubdomainStep />;
    }
  }
}

export default function SignupPage() {
  return (
    <OnboardingLayout stepId={INITIAL_STEP_ID}>
      <RenderStep stepId={INITIAL_STEP_ID} />
    </OnboardingLayout>
  );
}

