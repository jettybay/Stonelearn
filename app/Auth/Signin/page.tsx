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

export default function SigninPage() {
  return (
    <OnboardingLayout stepId={INITIAL_STEP_ID}>
      <RenderStep stepId={INITIAL_STEP_ID} />
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

