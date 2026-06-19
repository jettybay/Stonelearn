export type OnboardingStepId =
  | "school-details"
  | "subdomain"
  | "branding"
  | "logo"
  | "admin-details"
  | "review";

export type OnboardingStep = {
  id: OnboardingStepId;
  title: string;
  description: string;
};


export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "school-details",
    title: "School Information",
    description: "Provide basic information about your school.",
  },
  {
    id: "subdomain",
    title: "Subdomain",
    description: "Choose a subdomain for your school workspace.",
  },
  {
    id: "branding",
    title: "Branding",
    description: "Customize your platform's look and feel.",
  },
  {
    id: "logo",
    title: "Upload Logo",
    description: "Upload your school logo to personalize the workspace.",
  },
  {
    id: "admin-details",
    title: "Create Admin",
    description: "Set up the primary administrator account.",
  },
  {
    id: "review",
    title: "Review & Launch",
    description: "Confirm your details and create the workspace.",
  },
];
