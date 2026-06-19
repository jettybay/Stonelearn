"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useMemo, useState } from "react";

export type AdminAccountData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onBack?: () => void;
  onNext?: (data: AdminAccountData) => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AdminStep({ onBack, onNext }: Props) {
  const [form, setForm] = useState<AdminAccountData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState<Record<keyof AdminAccountData, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const errors = useMemo(() => {
    const next: Partial<Record<keyof AdminAccountData, string>> = {};

    if (!form.firstName.trim()) next.firstName = "First name is required.";
    if (!form.lastName.trim()) next.lastName = "Last name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(form.email)) next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";

    if (!form.password) next.password = "Password is required.";
    if (!form.confirmPassword) next.confirmPassword = "Confirm password is required.";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match.";
    }

    return next;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const setField = (key: keyof AdminAccountData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const markAllTouched = () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });
  };

  const handleContinue = () => {
    markAllTouched();
    if (hasErrors) return;

    onNext?.(form);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Admin Account</h2>
        <p className="mt-1 text-sm text-black/60">Create the first administrator account for this school.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">First Name</span>
          <input
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, firstName: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. Amina"
          />
          {touched.firstName && errors.firstName && (
            <p className="text-xs text-red-600">{errors.firstName}</p>
          )}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Last Name</span>
          <input
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, lastName: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. Johnson"
          />
          {touched.lastName && errors.lastName && (
            <p className="text-xs text-red-600">{errors.lastName}</p>
          )}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="admin@school.com"
          />
          {touched.email && errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Phone</span>
          <input
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. +234 801 234 5678"
          />
          {touched.phone && errors.phone && (
            <p className="text-xs text-red-600">{errors.phone}</p>
          )}
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-black/80">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setField("password", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, password: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="Create a password"
          />
          {touched.password && errors.password && (
            <p className="text-xs text-red-600">{errors.password}</p>
          )}
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-black/80">Confirm Password</span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, confirmPassword: true }))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="Re-enter password"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </label>
      </div>

      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm text-black/80">
        You can invite additional admins after the workspace is created.
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold text-black"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={false}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#722F37] px-6 py-3 font-semibold text-white"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}




