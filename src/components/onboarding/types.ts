export type OnboardingStepId =
  | "school-details"
  | "admin-details"
  | "branding"
  | "review"; // Add more as your onboarding flow expands

export type OnboardingStep = {
  id: OnboardingStepId;
  title: string;
  description: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "school-details",
    title: "School Details",
    description: "Provide basic information about your school.",
  },
  {
    id: "admin-details",
    title: "Admin Details",
    description: "Set up the primary administrator account.",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Customize your platform's look and feel.",
  },
  { id: "review", title: "Review", description: "Confirm and launch your school." },
];