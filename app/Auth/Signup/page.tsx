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

import { useSignupData } from "@/utility/useSignupData";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { OnboardingStepId } from "@/components/onboarding/types";
import type { SchoolInformationData } from "@/components/onboarding/school-information-step";
import type { AdminAccountData } from "@/components/onboarding/admin-step";

const INITIAL_STEP_ID: OnboardingStepId = "school-details";

function RenderStep({
  stepId,
  onNext,
  onBack,
  onSchoolInfoCapture,
  onSubdomainCapture,
  onColorCapture,
  onLogoCapture,
  onAdminCapture,
  signupData,
  onLaunch,
}: {
  stepId: OnboardingStepId;
  onNext: (payload?: unknown) => void;
  onBack?: () => void;
  onSchoolInfoCapture?: (data: SchoolInformationData) => void;
  onSubdomainCapture?: (subdomain: string) => void;
  onColorCapture?: (color: string) => void;
  onLogoCapture?: (file: File) => Promise<void>;
  onAdminCapture?: (data: AdminAccountData) => void;
  signupData?: any;
  onLaunch?: () => Promise<void>;
}) {

  switch (stepId) {
    case "school-details":
      return (
        <SchoolInformationStep
          onNext={(data) => {
            onSchoolInfoCapture?.(data);
            onNext();
          }}
        />
      );
    case "subdomain":
      return (
        <SubdomainStep 
          onBack={onBack} 
          onNext={(subdomain) => {
            onSubdomainCapture?.(subdomain);
            onNext();
          }} 
        />
      );
    case "branding":
      return (
        <BrandingStep 
          onNext={(color) => {
            onColorCapture?.(color);
            onNext();
          }} 
        />
      );
    case "logo":
      return (
        <LogoStep
          onBack={onBack}
          onNext={async (logoFile) => {
            if (logoFile) {
              await onLogoCapture?.(logoFile);
            }
            onNext(logoFile);
          }}
        />
      );
    case "admin-details":
      return (
        <AdminStep 
          onBack={onBack} 
          onNext={(data) => {
            onAdminCapture?.(data);
            onNext();
          }} 
        />
      );
    case "review":
      return (
        <ReviewStep 
          onBack={onBack}
          data={{
            schoolName: signupData?.schoolInformation?.schoolName,
            subdomain: signupData?.subdomain,
            brandingLabel: signupData?.branding?.primaryColor,
            logoLabel: signupData?.logo?.fileName || "School Logo",
            admin: { email: signupData?.adminAccount?.email },
          }}
          onLaunch={onLaunch}
        />
      );
    default: {
      return null;
    }
  }
}

export default function SignupPage() {
  const router = useRouter();
  const [stepId, setStepId] = useState<OnboardingStepId>(INITIAL_STEP_ID);
  
  // Initialize signup data management
  const {
    data: signupData,
    updateSchoolInformation,
    updateSubdomain,
    updatePrimaryColor,
    updateLogo,
    updateAdminAccount,
    submit,
  } = useSignupData();

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

  const handleLaunch = async () => {
    try {
      const result = await submit();
      
      if (result.success) {
        // Navigate to success page after brief delay for feedback
        setTimeout(() => {
          router.push("/onboarding-success");
        }, 500);
      } else {
        throw new Error(result.message || "Failed to launch school");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <OnboardingLayout stepId={stepId}>
      <RenderStep
        stepId={stepId}
        onNext={() => {
          goNext();
        }}
        onBack={goBack}
        onSchoolInfoCapture={updateSchoolInformation}
        onSubdomainCapture={updateSubdomain}
        onColorCapture={updatePrimaryColor}
        onLogoCapture={updateLogo}
        onAdminCapture={updateAdminAccount}
        signupData={signupData}
        onLaunch={handleLaunch}
      />
    </OnboardingLayout>
  );
}


