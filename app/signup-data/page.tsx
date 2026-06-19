"use client";

import { useSignupData } from "@/utility/useSignupData";
import { useEffect, useState } from "react";
import { Copy, Download, Trash2, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { exportSignupDataAsJSON } from "@/utility/signupData";

export default function SignupDataPage() {
  const { data, isLoading, error, clear, refresh } = useSignupData();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-slate-200 border-t-[#722F37]"></div>
          <p className="text-slate-600">Loading signup data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-slate-400" />
          <h1 className="mb-2 text-xl font-bold text-slate-900">No Signup Data</h1>
          <p className="mb-6 text-slate-600">
            No signup data is currently available. Start the signup process to capture user data.
          </p>
          <button
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-lg bg-[#722F37] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5a1f2a]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>
    );
  }

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
    a.download = `signup-data-${data.id}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm("Are you sure? This will delete all captured signup data.")) {
      clear();
    }
  };

  const completionPercentage = Math.round(
    (
      [
        data.schoolInformation,
        data.subdomain,
        data.branding.primaryColor,
        data.logo,
        data.adminAccount,
      ].filter(Boolean).length / 5
    ) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Captured Signup Data</h1>
          <p className="mt-2 text-slate-600">
            Manage and review all data collected during the signup process
          </p>
        </div>

        {/* Status Alert */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Session Info */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Session Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-600">Session ID</p>
              <p className="font-mono text-sm font-medium text-slate-900">{data.id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Status</p>
              <div className="flex items-center gap-2">
                <div
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    data.status === "submitted"
                      ? "bg-green-100 text-green-700"
                      : data.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600">Created</p>
              <p className="text-sm text-slate-900">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Last Updated</p>
              <p className="text-sm text-slate-900">
                {new Date(data.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Completion Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Overall Progress</span>
              <span className="text-sm font-semibold text-[#722F37]">{completionPercentage}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-[#722F37] to-[#8b3a47] transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {[
                { label: "School Information", value: !!data.schoolInformation },
                { label: "Subdomain", value: !!data.subdomain },
                { label: "Branding Color", value: !!data.branding.primaryColor },
                { label: "Logo", value: !!data.logo },
                { label: "Admin Account", value: !!data.adminAccount },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.value ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-slate-300"></div>
                  )}
                  <span className={`text-sm ${item.value ? "text-slate-900" : "text-slate-500"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* School Information */}
        {data.schoolInformation && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-slate-900">School Information</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">School Name</p>
                <p className="font-medium text-slate-900">{data.schoolInformation.schoolName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">School Type</p>
                <p className="font-medium text-slate-900">{data.schoolInformation.schoolType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Country</p>
                <p className="font-medium text-slate-900">{data.schoolInformation.country}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">State</p>
                <p className="font-medium text-slate-900">{data.schoolInformation.state}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-slate-600">Website</p>
                <p className="truncate font-mono text-sm text-slate-900">
                  {data.schoolInformation.website || "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Subdomain */}
        {data.subdomain && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-slate-900">Subdomain</h2>
            </div>
            <div>
              <p className="text-sm text-slate-600">Configured Subdomain</p>
              <p className="font-mono text-sm font-medium text-slate-900">
                https://{data.subdomain}.stonelearn.app
              </p>
            </div>
          </div>
        )}

        {/* Branding */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-slate-900">Branding</h2>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="h-20 w-20 rounded-lg border-2 border-slate-200 shadow-sm"
              style={{ backgroundColor: data.branding.primaryColor }}
            ></div>
            <div>
              <p className="text-sm text-slate-600">Primary Color</p>
              <p className="font-mono text-lg font-bold text-slate-900">
                {data.branding.primaryColor}
              </p>
            </div>
          </div>
        </div>

        {/* Logo */}
        {data.logo && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-slate-900">Logo</h2>
            </div>
            <div className="space-y-4">
              {data.logo.fileData && (
                <div className="flex items-center justify-center rounded-lg bg-slate-50 p-8">
                  <img
                    src={data.logo.fileData}
                    alt="School Logo"
                    className="max-h-32 max-w-xs object-contain"
                  />
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-600">File Name</p>
                  <p className="truncate font-mono text-sm text-slate-900">{data.logo.fileName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">File Type</p>
                  <p className="font-mono text-sm text-slate-900">{data.logo.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">File Size</p>
                  <p className="font-mono text-sm text-slate-900">
                    {(data.logo.fileSize / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Account */}
        {data.adminAccount && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-slate-900">Admin Account</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">First Name</p>
                <p className="font-medium text-slate-900">{data.adminAccount.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Last Name</p>
                <p className="font-medium text-slate-900">{data.adminAccount.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Email Address</p>
                <p className="font-mono text-sm text-slate-900">{data.adminAccount.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <p className="font-medium text-slate-900">{data.adminAccount.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-slate-600">Password</p>
                <p className="font-mono text-sm text-slate-900">••••••••</p>
              </div>
            </div>
          </div>
        )}

        {/* Backend Integration Notice */}
        <div className="mb-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
          <h3 className="mb-2 font-semibold text-amber-900">⚠️ Backend Integration Pending</h3>
          <p className="text-sm text-amber-800">
            This signup data is currently stored in your browser's local storage. When backend APIs are ready:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-amber-800">
            <li>
              • Data will be submitted to the backend server
            </li>
            <li>
              • User accounts will be created automatically
            </li>
            <li>
              • Authentication tokens will be generated for login
            </li>
            <li>
              • Email verification will be required
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={refresh}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            onClick={handleCopyJSON}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Copy size={16} />
            {copied ? "Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={handleDownloadJSON}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <Download size={16} />
            Export JSON
          </button>
          <button
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Clear Data
          </button>
        </div>

        {/* Notes Section */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-slate-900">Implementation Notes</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              ✓ <strong>Data Persistence:</strong> Currently using browser localStorage (max ~5-10MB)
            </li>
            <li>
              ✓ <strong>Security:</strong> Passwords should only be transmitted over HTTPS to backend
            </li>
            <li>
              ✓ <strong>File Upload:</strong> Logo currently stored as base64 (for large files, use multipart upload to backend)
            </li>
            <li>
              ✓ <strong>Multi-Session:</strong> Support for multiple signup sessions ready for implementation
            </li>
            <li>
              ✓ <strong>Email Verification:</strong> Add verification step before account creation
            </li>
            <li>
              ✓ <strong>Rate Limiting:</strong> Implement on backend to prevent abuse
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
