"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight } from "lucide-react";

export function TelemetryFailureSection() {
  const comparisons = [
    {
      feature: "Intake Modality",
      statusQuo: "Dense 4-page printed English paper sheet",
      nivaran: "Zero-install PWA with vernacular voice audio schedules",
    },
    {
      feature: "Surgical Wound Surveillance",
      statusQuo: "Blind unmonitored home healing until stitch removal",
      nivaran: "Daily computer-vision incision grading via ASEPSIS protocol",
    },
    {
      feature: "Symptom Tracking",
      statusQuo: "Passive memory recall at 14-day OPD visit",
      nivaran: "Active 60-second conversational voice triage every 24h",
    },
    {
      feature: "Clinician Notification",
      statusQuo: "Emergency casualty arrival at 2:00 AM in septic shock",
      nivaran: "Structured SBAR alert pushed to surgeon within 120 seconds",
    },
    {
      feature: "Legal & Regulatory Audit",
      statusQuo: "Scattered WhatsApp chats and paper receipts",
      nivaran: "Cryptographic SHA-256 hash anchored to on-chain ledger",
    },
    {
      feature: "Hardware / Sensor Cost",
      statusQuo: "Wearable patches ($80–$150/unit; cost-prohibitive)",
      nivaran: "₹0 Hardware (utilizes patient's existing smartphone camera)",
    },
  ];

  return (
    <section className="py-20 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">02 / PARADIGM SHIFT</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Comparative Matrix
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            FROM STATIC PAPER <br />
            TO <span className="text-accent">CLOSED-LOOP</span> RECOVERY.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            How Nivaran transforms the chaotic hospital-to-home transition into an unbroken clinical telemetry channel.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="border border-border">
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-muted/40 p-4 md:p-6 border-b border-border font-mono text-xs uppercase tracking-wider text-mutedForeground">
            <div className="col-span-12 md:col-span-4 font-bold text-foreground">Clinical Dimension</div>
            <div className="col-span-6 md:col-span-4 text-red-400">Standard Practice (Failure Mode)</div>
            <div className="col-span-6 md:col-span-4 text-accent">Nivaran.ai OS (Winning Mode)</div>
          </div>

          {/* Data Rows */}
          {comparisons.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-12 p-4 md:p-6 border-b last:border-b-0 border-border hover:bg-muted/20 transition-colors items-center gap-2"
            >
              <div className="col-span-12 md:col-span-4 font-medium text-sm md:text-base text-foreground">
                {row.feature}
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-start gap-2.5 text-xs md:text-sm text-mutedForeground">
                <X size={16} strokeWidth={2} className="text-red-500 shrink-0 mt-0.5" />
                <span>{row.statusQuo}</span>
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-4 flex items-start gap-2.5 text-xs md:text-sm text-foreground font-medium">
                <Check size={16} strokeWidth={2} className="text-accent shrink-0 mt-0.5" />
                <span className="text-white">{row.nivaran}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
