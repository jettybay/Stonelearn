"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader, AlertCircle, Copy, Download, ArrowRight } from "lucide-react";
import { getSignupData, exportSignupDataAsJSON } from "@/utility/signupData";
import type { SignupFormData } from "@/utility/signupData";

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [data, setData] = useState<SignupFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Simulate server processing
    const timer = setTimeout(() => {
      const signupData = getSignupData();

      if (!signupData) {
        setStep("error");
        setErrorMessage("No signup data found. Please start the signup process again.");
        setLoading(false);
        return;
      }

      if (
        !signupData.schoolInformation ||
        !signupData.subdomain ||
        !signupData.adminAccount ||
        !signupData.logo
      ) {
        setStep("error");
        setErrorMessage("Incomplete signup data. Please complete all steps.");
        setLoading(false);
        return;
      }

      // TODO: When backend is ready, send data to server here
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   body: JSON.stringify(signupData)
      // });
      // if (!response.ok) throw new Error('Server error');

      setData(signupData);
      setStep("success");
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyJSON = () => {
    const json = exportSignupDataAsJSON();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const json = exportSignupDataAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `school-setup-${data?.id}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading && step === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Processing Animation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[#722F37]/10 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#722F37] to-[#8b3a47] flex items-center justify-center">
                  <Loader className="w-8 h-8 text-white animate-spin" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                Launching Your School
              </h2>
              <p className="text-slate-600 text-center mb-8">
                Setting up your workspace with all the details you provided...
              </p>

              {/* Progress steps */}
              <div className="w-full space-y-3">
                {[
                  "Validating school information",
                  "Configuring workspace",
                  "Setting up admin account",
                  "Initializing dashboard",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#722F37]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#722F37] animate-pulse"></div>
                    </div>
                    <span className="text-sm text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600 mt-4">This usually takes 30-60 seconds...</p>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-red-200 p-8 shadow-lg">
            <div className="flex flex-col items-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-red-100 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-red-900 mb-2 text-center">Launch Failed</h2>
              <p className="text-red-700 text-center mb-6">{errorMessage}</p>

              <button
                onClick={() => router.push("/app/Auth/Signup")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Start Over
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-pulse scale-110"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            School Launched Successfully! 🎉
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your {data?.schoolInformation?.schoolName} workspace is ready to go.
          </p>
        </div>

        {/* Workspace Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Your Workspace Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Info */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">School Name</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {data?.schoolInformation?.schoolName}
              </p>
            </div>

            {/* Subdomain */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Workspace URL</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 break-all">
                {data?.subdomain}.stonelearn.app
              </p>
            </div>

            {/* Admin Email */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Admin Email</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {data?.adminAccount?.email}
              </p>
            </div>

            {/* School Type */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">School Type</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {data?.schoolInformation?.schoolType}
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-4">📋 Next Steps</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white flex-shrink-0">
                1
              </span>
              <div>
                <p className="font-medium text-blue-900">Verify Your Email</p>
                <p className="text-sm text-blue-700 mt-1">
                  Check your email for verification link
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white flex-shrink-0">
                2
              </span>
              <div>
                <p className="font-medium text-blue-900">Access Your Dashboard</p>
                <p className="text-sm text-blue-700 mt-1">
                  Log in to your workspace at {data?.subdomain}.stonelearn.app
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white flex-shrink-0">
                3
              </span>
              <div>
                <p className="font-medium text-blue-900">Invite Your Team</p>
                <p className="text-sm text-blue-700 mt-1">
                  Add teachers and staff members to your workspace
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Branding Preview */}
        {data?.logo?.fileData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-4">School Branding Preview</h3>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 p-4 h-24 w-24 flex items-center justify-center">
                <img
                  src={data.logo.fileData}
                  alt="School Logo"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-slate-600">Primary Color</p>
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="h-12 w-12 rounded-lg border-2 border-slate-200 shadow-sm"
                    style={{ backgroundColor: data.branding.primaryColor }}
                  ></div>
                  <code className="text-sm font-mono text-slate-700">{data.branding.primaryColor}</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Export Section */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-6">
          <h3 className="font-semibold text-amber-900 mb-3">📦 Export Setup Data</h3>
          <p className="text-sm text-amber-800 mb-4">
            Keep a backup of your school setup configuration for records.
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleCopyJSON}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50 transition"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy JSON"}
            </button>
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50 transition"
            >
              <Download size={16} />
              Download JSON
            </button>
          </div>
        </div>

        {/* Backend Integration Notice */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-3">⚠️ Development Mode</h3>
          <p className="text-sm text-slate-700 mb-3">
            This is a development build. When the backend APIs are complete:
          </p>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Account creation will be automated</li>
            <li>Verification email will be sent immediately</li>
            <li>Workspace will be fully initialized</li>
            <li>Admin login credentials will be secured</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row justify-center">
          <button
            onClick={() => router.push("/app/signup-data")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            View Setup Details
          </button>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#722F37] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5a1f2a] transition"
          >
            Back to Home
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
