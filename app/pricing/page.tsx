"use client";

import { useState } from "react";
import { NavbarLanding } from "@/components/navbar/navbarLanding";

const institutionTypes = [
  "Primary School",
  "Secondary School",
  "Tertiary Institution",
  "Business",
  "Hospital",
];

const billingPeriods = [
  { label: "Monthly", multiplier: 1 },
  { label: "Triannually", multiplier: 4 },
  { label: "Semiannually", multiplier: 6 },
  { label: "Annually", multiplier: 10 },
];

type PlanKey = "FREE" | "BASIC" | "DELUXE" | "ENTERPRISE";

const plans: {
  name: PlanKey;
  description: string;
  baseRate: number;
  chargeRate: number;
}[] = [
  { name: "FREE", description: "Free", baseRate: 139.5, chargeRate: 0.0173895 },
  {
    name: "BASIC",
    description: "Good for small organizations",
    baseRate: 170.5,
    chargeRate: 0.0173895,
  },
  {
    name: "DELUXE",
    description: "Advance Features with Finance",
    baseRate: 201.5,
    chargeRate: 0.0166534,
  },
  {
    name: "ENTERPRISE",
    description: "Good for big organization",
    baseRate: 0,
    chargeRate: 0.0166534,
  },
];

type Feature = {
  label: string;
  price: string;
  value: number;
  availability: Record<PlanKey, boolean>;
};

const initialFeatures: Feature[] = [
  {
    label: "Result Collation",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "General Academic Management",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Student Data Management",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Staff Data Management",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Exam and Testing",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Class Administration",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Student Portal",
    price: "₦0 (subsidized)",
    value: 0,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Computer Based Test System",
    price: "₦155",
    value: 155,
    availability: { FREE: true, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Export, print and data migration",
    price: "₦0 (subsidized)",
    value: 0,
    availability: { FREE: false, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Senate/Broadsheet",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Administration",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Admissions Processing",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Automated Fee Payment",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: true, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Learning Management System",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: false, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Human Resources Management",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: false, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Transcript and Results",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: false, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "Timetable System",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: false, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "E Library",
    price: "₦155",
    value: 155,
    availability: { FREE: false, BASIC: false, DELUXE: true, ENTERPRISE: true },
  },
  {
    label: "AI Virtual Class System",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Attendance System",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Teaching Evaluation System",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Payroll and Pension Management",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Inventory Management System",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Accounting System",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: true,
    },
  },
  {
    label: "Expense and Voucher Management",
    price: "₦155",
    value: 155,
    availability: {
      FREE: false,
      BASIC: false,
      DELUXE: false,
      ENTERPRISE: false,
    },
  },
];

// ── Checkbox component ──
function EnterpriseCheckbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label='Toggle Enterprise Feature'
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "4px",
        border: checked ? "none" : "2px solid #ccc",
        background: checked ? "#7B1F2E" : "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 0.15s ease",
      }}>
      {checked && (
        <svg width='11' height='11' viewBox='0 0 11 11' fill='none'>
          <path
            d='M2 5.5L4.5 8L9 3'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      )}
    </button>
  );
}

export default function PricingPage() {
  const [institution, setInstitution] = useState("Primary School");
  const [billingIndex, setBillingIndex] = useState(0);
  const [students, setStudents] = useState(300);
  const [storage, setStorage] = useState(1);
  const [localCurrency, setLocalCurrency] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("FREE");
  const [features, setFeatures] = useState<Feature[]>(initialFeatures);

  const currentBilling = billingPeriods[billingIndex];
  const symbol = localCurrency ? "₦" : "$";

  const enterpriseBaseRate =
    features.reduce(
      (sum, f) => (f.availability.ENTERPRISE ? sum + f.value : sum),
      0,
    ) * 0.1;

  const getBaseRate = (planName: PlanKey) =>
    planName === "ENTERPRISE"
      ? enterpriseBaseRate
      : plans.find(p => p.name === planName)!.baseRate;

  const currentBaseRate = getBaseRate(selectedPlan);
  const currentPlan = plans.find(p => p.name === selectedPlan)!;

  const rate = currentBaseRate * storage;
  const baseBill = students * rate * currentBilling.multiplier;
  const charge = parseFloat((baseBill * currentPlan.chargeRate).toFixed(2));
  const totalBill = baseBill + charge;
  const perUser = rate * currentBilling.multiplier;

  const formatMoney = (amount: number) =>
    amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const toggleEnterpriseFeature = (index: number) => {
    setFeatures(prev =>
      prev.map((f, i) =>
        i === index
          ? {
              ...f,
              availability: {
                ...f.availability,
                ENTERPRISE: !f.availability.ENTERPRISE,
              },
            }
          : f,
      ),
    );
  };

  const isSelected = (planName: PlanKey) => selectedPlan === planName;

  return (
    <>
      {/* ══════════════════════════════════════
          DESKTOP — hidden on mobile
      ══════════════════════════════════════ */}
      <main
        className='hidden md:block'
        style={{
          background: "#F5F0EE",
          color: "#0F0F0F",
          minHeight: "100vh",
          paddingBottom: "160px",
        }}>
        <NavbarLanding />

        {/* ── HEADER ── */}
        <section style={{ textAlign: "center", padding: "48px 20px 24px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#0F0F0F",
              letterSpacing: "-0.02em",
            }}>
            Ready to get started?
          </h1>
          <p
            style={{
              color: "#6B6B6B",
              marginTop: "8px",
              fontSize: "14px",
              fontWeight: 500,
            }}>
            Choose a plan tailored to your needs
          </p>

          <div style={{ marginTop: "24px" }}>
            <select
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              style={{
                padding: "10px 16px",
                border: "1px solid #EDE8E6",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6B6B6B",
                background: "#fff",
                cursor: "pointer",
                minWidth: "220px",
                outline: "none",
              }}>
              {institutionTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "inline-flex",
              background: "#EDE8E6",
              borderRadius: "50px",
              padding: "4px",
            }}>
            {billingPeriods.map((period, i) => (
              <button
                key={period.label}
                onClick={() => setBillingIndex(i)}
                style={{
                  padding: "8px 20px",
                  border: "none",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: billingIndex === i ? "#7B1F2E" : "transparent",
                  color: billingIndex === i ? "#fff" : "#6B6B6B",
                  transition: "all 0.2s ease",
                }}>
                {period.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── TABLE ── */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto 40px",
            padding: "0 24px",
            overflowX: "auto",
          }}>
          <div
            style={{
              border: "1px solid #EDE8E6",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "950px",
                tableLayout: "fixed",
              }}>
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid #EDE8E6",
                    background: "#fff",
                  }}>
                  <th
                    style={{
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#6B6B6B",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "20px 16px",
                      width: "28%",
                    }}>
                    Features
                  </th>
                  {plans.map(plan => (
                    <th
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      style={{
                        width: "18%",
                        padding: "20px 16px",
                        textAlign: "center",
                        borderLeft: "1px solid #F5F0EE",
                        background: isSelected(plan.name) ? "#F5E6E8" : "#fff",
                        cursor: "pointer",
                      }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 900,
                          color: "#0F0F0F",
                          letterSpacing: "0.05em",
                        }}>
                        {plan.name}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "#6B6B6B",
                          marginTop: "4px",
                          fontWeight: 500,
                        }}>
                        {plan.description}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.label}
                    style={{ borderBottom: "1px solid #F5F0EE" }}>
                    <td
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        fontSize: "13px",
                        color: "#0F0F0F",
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      {feature.label}
                      <span
                        style={{
                          color: "#6B6B6B",
                          fontSize: "10px",
                          fontWeight: 700,
                          marginLeft: "auto",
                          paddingRight: "8px",
                        }}>
                        {feature.price}
                      </span>
                    </td>
                    {plans.map(plan => (
                      <td
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        style={{
                          padding: "14px 16px",
                          textAlign: "center",
                          borderLeft: "1px solid #F5F0EE",
                          background: isSelected(plan.name)
                            ? "#F5E6E8"
                            : "transparent",
                          cursor: "pointer",
                        }}>
                        {plan.name === "ENTERPRISE" ? (
                          <EnterpriseCheckbox
                            checked={feature.availability.ENTERPRISE}
                            onToggle={() => toggleEnterpriseFeature(i)}
                          />
                        ) : feature.availability[plan.name] ? (
                          <span
                            style={{
                              color: "#7B1F2E",
                              fontSize: "14px",
                              fontWeight: 800,
                            }}>
                            ✓
                          </span>
                        ) : (
                          <span
                            style={{
                              color: "#ccc",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}>
                            —
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr style={{ background: "#F5F0EE" }}>
                  <td style={{ padding: "20px 16px" }} />
                  {plans.map(plan => (
                    <td
                      key={plan.name}
                      style={{
                        padding: "20px 16px",
                        textAlign: "center",
                        borderLeft: "1px solid #EDE8E6",
                        background: isSelected(plan.name)
                          ? "#F5E6E8"
                          : "#F5F0EE",
                      }}>
                      <button
                        onClick={() => setSelectedPlan(plan.name)}
                        disabled={isSelected(plan.name)}
                        style={{
                          width: "100%",
                          maxWidth: "140px",
                          padding: "8px 0",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 700,
                          border: "none",
                          cursor: isSelected(plan.name) ? "default" : "pointer",
                          background: isSelected(plan.name)
                            ? "#EDE8E6"
                            : "#7B1F2E",
                          color: isSelected(plan.name) ? "#6B6B6B" : "#fff",
                          transition: "background 0.15s ease",
                        }}>
                        {isSelected(plan.name) ? "Selected" : "Select Plan"}
                      </button>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════
          MOBILE — hidden on desktop
      ══════════════════════════════════════ */}
      <div
        className='block md:hidden'
        style={{
          background: "#F5F0EE",
          minHeight: "100vh",
          paddingBottom: "320px",
        }}>
        <NavbarLanding />

        {/* Header */}
        <section style={{ textAlign: "center", padding: "32px 16px 20px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#0F0F0F",
              letterSpacing: "-0.02em",
            }}>
            Ready to get started?
          </h1>
          <p
            style={{
              color: "#6B6B6B",
              marginTop: "8px",
              fontSize: "13px",
              fontWeight: 500,
            }}>
            Choose a plan tailored to your needs
          </p>

          <div style={{ marginTop: "16px" }}>
            <select
              value={institution}
              onChange={e => setInstitution(e.target.value)}
              style={{
                padding: "10px 16px",
                border: "1px solid #EDE8E6",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6B6B6B",
                background: "#fff",
                cursor: "pointer",
                width: "100%",
                outline: "none",
              }}>
              {institutionTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              background: "#EDE8E6",
              borderRadius: "50px",
              padding: "4px",
            }}>
            {billingPeriods.map((period, i) => (
              <button
                key={period.label}
                onClick={() => setBillingIndex(i)}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  border: "none",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: billingIndex === i ? "#7B1F2E" : "transparent",
                  color: billingIndex === i ? "#fff" : "#6B6B6B",
                  transition: "all 0.2s ease",
                }}>
                {period.label}
              </button>
            ))}
          </div>
        </section>

        {/* Plan Cards */}
        <section
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
          {plans.map(plan => {
            const selected = isSelected(plan.name);

            const availableFeatures = features.filter(
              f => f.availability[plan.name],
            );
            const unavailableFeatures = features.filter(
              f => !f.availability[plan.name],
            );

            return (
              <div
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  border: selected ? "2px solid #7B1F2E" : "1px solid #EDE8E6",
                  padding: "20px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                }}>
                {/* Selected badge */}
                {selected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "#7B1F2E",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      padding: "4px 10px",
                      borderRadius: "50px",
                      textTransform: "uppercase",
                    }}>
                    Selected
                  </div>
                )}

                {/* Plan name */}
                <div style={{ marginBottom: "4px" }}>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#0F0F0F",
                      letterSpacing: "0.02em",
                    }}>
                    {plan.name === "ENTERPRISE"
                      ? "Enterprise / Custom"
                      : plan.name.charAt(0) + plan.name.slice(1).toLowerCase()}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6B6B6B",
                      marginTop: "2px",
                      fontWeight: 500,
                    }}>
                    {plan.description}
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#EDE8E6",
                    margin: "16px 0",
                  }}
                />

                {/* Features label */}
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#6B6B6B",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "10px",
                  }}>
                  Features:
                </div>

                {/* Features list */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}>
                  {plan.name === "ENTERPRISE" ? (
                    features.map((f, i) => (
                      <div
                        key={f.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: 1,
                          }}>
                          <EnterpriseCheckbox
                            checked={f.availability.ENTERPRISE}
                            onToggle={() => toggleEnterpriseFeature(i)}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              color: f.availability.ENTERPRISE
                                ? "#0F0F0F"
                                : "#ccc",
                              fontWeight: 500,
                            }}>
                            {f.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "10px",
                            color: "#6B6B6B",
                            fontWeight: 600,
                            flexShrink: 0,
                          }}>
                          {f.price}
                        </span>
                      </div>
                    ))
                  ) : (
                    <>
                      {availableFeatures.map(f => (
                        <div
                          key={f.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                          }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}>
                            <span
                              style={{
                                color: "#7B1F2E",
                                fontWeight: 800,
                                fontSize: "14px",
                              }}>
                              ✓
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#0F0F0F",
                                fontWeight: 500,
                              }}>
                              {f.label}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "10px",
                              color: "#6B6B6B",
                              fontWeight: 600,
                              flexShrink: 0,
                            }}>
                            {f.price}
                          </span>
                        </div>
                      ))}
                      {unavailableFeatures.map(f => (
                        <div
                          key={f.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                          }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}>
                            <span
                              style={{
                                color: "#ccc",
                                fontWeight: 600,
                                fontSize: "12px",
                              }}>
                              —
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#ccc",
                                fontWeight: 500,
                              }}>
                              {f.label}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "10px",
                              color: "#ccc",
                              fontWeight: 600,
                              flexShrink: 0,
                            }}>
                            {f.price}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#EDE8E6",
                    margin: "16px 0",
                  }}
                />

                {/* Select button */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedPlan(plan.name);
                  }}
                  disabled={selected}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 700,
                    border: "none",
                    cursor: selected ? "default" : "pointer",
                    background: selected ? "#EDE8E6" : "#7B1F2E",
                    color: selected ? "#6B6B6B" : "#fff",
                    transition: "background 0.15s ease",
                  }}>
                  {selected ? "Selected" : "Select Plan"}
                </button>
              </div>
            );
          })}
        </section>
      </div>

      {/* ══════════════════════════════════════
          STICKY FOOTER — shared by both
      ══════════════════════════════════════ */}
      {/* ══════════════════════════════════════
    STICKY FOOTER — shared by both
══════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "#fff",
          borderTop: "1px solid #EDE8E6",
          boxShadow: "0 -10px 25px -5px rgba(123,31,46,0.08)",
        }}>
        {/* ── DESKTOP FOOTER ── */}
        <div
          className='hidden md:flex'
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 32px 8px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}>
          {/* Currency */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#0F0F0F",
              cursor: "pointer",
            }}>
            <input
              type='checkbox'
              checked={localCurrency}
              onChange={e => setLocalCurrency(e.target.checked)}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#7B1F2E",
                cursor: "pointer",
              }}
            />
            Use local currency
          </label>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <input
              type='number'
              value={students || ""}
              onChange={e => setStudents(Math.max(0, Number(e.target.value)))}
              placeholder='No. of Students'
              style={{
                padding: "8px 12px",
                border: "1px solid #EDE8E6",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                width: "150px",
                textAlign: "center",
                outline: "none",
                color: "#0F0F0F",
                background: "#fff",
              }}
            />
            <select
              value={currentBilling.label}
              onChange={e =>
                setBillingIndex(
                  billingPeriods.findIndex(b => b.label === e.target.value),
                )
              }
              style={{
                padding: "8px 12px",
                border: "1px solid #EDE8E6",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#6B6B6B",
                width: "130px",
                outline: "none",
                cursor: "pointer",
                background: "#fff",
              }}>
              {billingPeriods.map(p => (
                <option key={p.label}>{p.label}</option>
              ))}
            </select>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #EDE8E6",
                padding: "4px 10px",
                borderRadius: "8px",
                background: "#fff",
              }}>
              <span
                style={{ fontSize: "11px", fontWeight: 700, color: "#6B6B6B" }}>
                Storage:
              </span>
              <button
                onClick={() => setStorage(s => Math.max(1, s - 1))}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#EDE8E6",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#7B1F2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                −
              </button>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 900,
                  color: "#0F0F0F",
                  minWidth: "40px",
                  textAlign: "center",
                }}>
                {storage}
                <sup
                  style={{
                    fontSize: "9px",
                    fontWeight: 500,
                    color: "#6B6B6B",
                  }}>
                  gb
                </sup>
              </span>
              <button
                onClick={() => setStorage(s => s + 1)}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#EDE8E6",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#7B1F2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                +
              </button>
            </div>
          </div>

          {/* Bill */}
          <div style={{ textAlign: "right", marginLeft: "auto" }}>
            {students > 0 ? (
              <>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#6B6B6B",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                  Bill ({currentBilling.label}) :
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "flex-end",
                    gap: "6px",
                    marginTop: "2px",
                  }}>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#7B1F2E",
                      letterSpacing: "-0.02em",
                    }}>
                    {symbol}
                    {formatMoney(totalBill)}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#6B6B6B",
                    }}>
                    ({symbol}
                    {formatMoney(perUser)} / user)
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#6B6B6B",
                    marginTop: "2px",
                  }}>
                  {formatMoney(baseBill)} + {formatMoney(charge)} (charge)
                </div>
              </>
            ) : (
              <span
                style={{
                  fontSize: "12px",
                  color: "#6B6B6B",
                  fontWeight: 600,
                  fontStyle: "italic",
                }}>
                Enter number of students to see bill
              </span>
            )}
          </div>

          <button
            style={{
              padding: "10px 24px",
              background: "#7B1F2E",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#5e1722")}
            onMouseLeave={e => (e.currentTarget.style.background = "#7B1F2E")}>
            Get Started
          </button>
        </div>

        {/* ── MOBILE FOOTER — compact ── */}
        <div
          className='flex md:hidden'
          style={{
            padding: "12px 16px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}>
          {/* Left — students + storage */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type='number'
                value={students || ""}
                onChange={e => setStudents(Math.max(0, Number(e.target.value)))}
                placeholder='Students'
                style={{
                  padding: "6px 8px",
                  border: "1px solid #EDE8E6",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  width: "90px",
                  textAlign: "center",
                  outline: "none",
                  color: "#0F0F0F",
                  background: "#fff",
                }}
              />
              <select
                value={currentBilling.label}
                onChange={e =>
                  setBillingIndex(
                    billingPeriods.findIndex(b => b.label === e.target.value),
                  )
                }
                style={{
                  padding: "6px 8px",
                  border: "1px solid #EDE8E6",
                  borderRadius: "8px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6B6B6B",
                  outline: "none",
                  cursor: "pointer",
                  background: "#fff",
                }}>
                {billingPeriods.map(p => (
                  <option key={p.label}>{p.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{ fontSize: "11px", fontWeight: 700, color: "#6B6B6B" }}>
                Storage:
              </span>
              <button
                onClick={() => setStorage(s => Math.max(1, s - 1))}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#EDE8E6",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#7B1F2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                −
              </button>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#0F0F0F",
                  minWidth: "28px",
                  textAlign: "center",
                }}>
                {storage}
                <sup style={{ fontSize: "8px", color: "#6B6B6B" }}>gb</sup>
              </span>
              <button
                onClick={() => setStorage(s => s + 1)}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#EDE8E6",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#7B1F2E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                +
              </button>
            </div>
          </div>

          {/* Middle — bill */}
          <div style={{ textAlign: "center", flex: 1 }}>
            {students > 0 ? (
              <>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "#6B6B6B",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                  Bill ({currentBilling.label})
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#7B1F2E",
                    letterSpacing: "-0.02em",
                  }}>
                  {symbol}
                  {formatMoney(totalBill)}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#6B6B6B",
                    fontWeight: 600,
                  }}>
                  {symbol}
                  {formatMoney(perUser)} / user
                </div>
              </>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                  color: "#6B6B6B",
                  fontStyle: "italic",
                }}>
                Enter students to see bill
              </span>
            )}
          </div>

          {/* Right — get started */}
          <button
            style={{
              padding: "10px 16px",
              background: "#7B1F2E",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
            Get Started
          </button>
        </div>

        <p
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#6B6B6B",
            padding: "0 16px 8px",
            textAlign: "center",
          }}>
          Get 2 months free when you pay yearly
        </p>
      </div>
    </>
  );
}
