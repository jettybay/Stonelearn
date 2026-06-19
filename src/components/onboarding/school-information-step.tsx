"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SCHOOL_TYPES = [
  "Primary School",
  "Secondary School",
  "Primary & Secondary",
  "College",
  "University",
  "Training Institute",
  "Corporate Academy",
];

type Props = {
  onNext?: (data: SchoolInformationData) => void;
};

export type SchoolInformationData = {
  schoolName: string;
  schoolType: string;
  country: string;
  state: string;
  website: string;
};

export function SchoolInformationStep({
  onNext,
}: Props) {
  const [form, setForm] =
    useState<SchoolInformationData>({
      schoolName: "",
      schoolType: "",
      country: "",
      state: "",
      website: "",
    });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    field: keyof SchoolInformationData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onNext?.(form);
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:p-10">

      {/* Header */}

      <div>
        <span className="text-sm font-semibold text-[#722F37]">
          Step 1 of 6
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          School Information
        </h1>

        <p className="mt-3 text-slate-600">
          Tell us about your institution.
          These details will be used to create
          your Stonelearn workspace.
        </p>
      </div>

      {/* Form */}

      <div className="mt-10 space-y-6">

        {/* School Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            School Name *
          </label>

          <input
            type="text"
            value={form.schoolName}
            onChange={(e) =>
              handleChange(
                "schoolName",
                e.target.value
              )
            }
            placeholder="Greenfield Academy"
            className="h-14 w-full rounded-2xl border border-slate-300 px-4 text-black placeholder:text-slate-400 outline-none transition focus:border-[#722F37]"
          />
        </div>

        {/* Row */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* School Type */}

          <div className="relative" ref={dropdownRef}>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              School Type *
            </label>

            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-14 w-full items-center justify-between rounded-2xl border border-slate-300 bg-white px-4 text-left outline-none transition focus:border-[#722F37]"
            >
              <span className={form.schoolType ? "font-bold text-[#722F37]" : "text-slate-400"}>
                {form.schoolType || "Select School Type"}
              </span>
              <ChevronDown
                size={20}
                className={`text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
                >
                  <div className="max-h-60 overflow-y-auto p-2">
                    {SCHOOL_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          handleChange("schoolType", type);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-[#722F37]/5 ${
                          form.schoolType === type
                            ? "bg-[#722F37]/5 font-bold text-[#722F37]"
                            : "text-slate-700"
                        }`}
                      >
                        {type}
                        {form.schoolType === type && (
                          <Check size={16} className="text-[#722F37]" />
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Country */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Country *
            </label>

            <input
              type="text"
              value={form.country}
              onChange={(e) =>
                handleChange(
                  "country",
                  e.target.value
                )
              }
              placeholder="Nigeria"
              className={`h-14 w-full rounded-2xl border border-slate-300 px-4 placeholder:text-slate-400 outline-none transition focus:border-[#722F37] ${
                form.country ? "font-bold text-[#722F37]" : "text-slate-900"
              }`}
            />
          </div>

        </div>

        {/* State */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            State / Region *
          </label>

          <input
            type="text"
            value={form.state}
            onChange={(e) =>
              handleChange(
                "state",
                e.target.value
              )
            }
            placeholder="Lagos"
            className={`h-14 w-full rounded-2xl border border-slate-300 px-4 placeholder:text-slate-400 outline-none transition focus:border-[#722F37] ${
              form.state ? "font-bold text-[#722F37]" : "text-slate-900"
            }`}
          />
        </div>

        {/* Website */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Website (Optional)
          </label>

          <input
            type="url"
            value={form.website}
            onChange={(e) =>
              handleChange(
                "website",
                e.target.value
              )
            }
            placeholder="https://school.edu"
            className="h-14 w-full rounded-2xl border border-slate-300 px-4 text-black placeholder:text-slate-400 outline-none transition focus:border-[#722F37]"
          />
        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 flex justify-end">

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#722F37] px-6 py-3 font-semibold text-white transition hover:bg-[#5E252C]"
        >
          Continue

          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}