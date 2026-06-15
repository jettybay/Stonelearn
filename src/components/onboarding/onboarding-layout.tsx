import { ReactNode } from "react";
import { ProgressSidebar } from "../onboarding/progress-sidebar";
import type { OnboardingStepId } from "./types";

type Props = {
  children: ReactNode;
  stepId: OnboardingStepId;
};

export function OnboardingLayout({ children, stepId }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#F7EDEE]">
      <div className="grid min-h-screen lg:grid-cols-[380px_1fr]">
        <ProgressSidebar stepId={stepId} />

        <main className="flex items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

