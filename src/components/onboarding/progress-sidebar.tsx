import {
  CheckCircle2,
  School,
} from "lucide-react";

import {
  ONBOARDING_STEPS,
  OnboardingStepId,
} from "./types";

type Props = {
  stepId: OnboardingStepId;
};

export function ProgressSidebar({
  stepId,
}: Props) {
  const currentIndex =
    ONBOARDING_STEPS.findIndex(
      (step) => step.id === stepId
    );

  const progress =
    ((currentIndex + 1) /
      ONBOARDING_STEPS.length) *
    100;

  return (
    <aside className="relative overflow-hidden bg-[#722F37] text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.15),transparent_40%)]" />

      <div className="relative flex h-full flex-col p-8 lg:p-10">

        {/* Logo */}

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <School size={24} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Stonelearn
              </h1>

              <p className="text-sm text-white/70">
                School Setup Wizard
              </p>
            </div>

          </div>
        </div>

        {/* Intro */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold leading-tight">
            Launch your digital campus.
          </h2>

          <p className="mt-4 text-white/80">
            Complete the steps below to
            create your branded learning
            platform.
          </p>

        </div>

        {/* Progress */}

        <div className="mt-10">

          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

        {/* Steps */}

        <div className="mt-10 flex-1 space-y-5">

          {ONBOARDING_STEPS.map(
            (step, index) => {
              const completed =
                index < currentIndex;

              const active =
                index === currentIndex;

              return (
                <div
                  key={step.id}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}

                  <div
                    className={
                      "mt-1 flex h-8 w-8 items-center justify-center rounded-full border transition-all " +
                      (completed
                        ? "border-white bg-white text-[#722F37]"
                        : active
                        ? "border-white bg-white/20"
                        : "border-white/30 text-white/50")
                    }
                  >
                    {completed ? (
                      <CheckCircle2
                        size={16}
                      />
                    ) : (
                      <span className="text-xs font-bold">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}

                  <div>
                    <p
                      className={
                        "font-semibold " +
                        (active
                          ? "text-white"
                          : completed
                          ? "text-white"
                          : "text-white/60")
                      }
                    >
                      {step.title}
                    </p>

                    <p className="text-sm text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            }
          )}

        </div>

        {/* Bottom Card */}

        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">

          <p className="text-sm text-white/70">
            Your school URL
          </p>

          <p className="mt-1 font-semibold">
            school.stonelearn.com
          </p>

          <div className="mt-4 text-sm text-white/70">
            Multi-tenant LMS Platform
          </div>

        </div>

      </div>

    </aside>
  );
}