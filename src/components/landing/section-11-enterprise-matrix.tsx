"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Layers, ShieldCheck, CheckCircle2, Cpu, Activity, Database, Lock, Eye, Mic, Stethoscope } from "lucide-react";

export function EnterprisePlatformMatrixSection() {
  const modules = [
    { num: "01", title: "Inpatient EHR & FHIR Gateway", focus: "Turnkey ABDM Milestone 1-3 connectivity, automated discharge summary deconstruction & FHIR scheduling.", icon: Database },
    { num: "02", title: "Autonomous Closed-Loop Telemetry", focus: "24/7 post-discharge patient risk tracking with automated multi-agent surveillance loops.", icon: Activity },
    { num: "03", title: "Vernacular Voice Interface", focus: "Voice-first PWA conversational triage supporting 22 Indic languages and regional dialects.", icon: Mic },
    { num: "04", title: "Computer-Vision Wound Grading", focus: "In-browser Wilson ASEPSIS protocol classification calibrated across Fitzpatrick skin types IV–VI.", icon: Eye },
    { num: "05", title: "Clinician SBAR Decision Engine", focus: "Automated noise suppression filtering 95% of routine calls; pushes structured SBAR briefs only.", icon: Stethoscope },
    { num: "06", title: "Medico-Legal Audit Ledger", focus: "SHA-256 cryptographic state proofs anchored on-chain for non-repudiation under DPDP Act 2023.", icon: Lock },
    { num: "07", title: "Surgical Command Center", focus: "Real-time institutional patient queue ranking recoveries by Deterioration Velocity (ΔR/Δt).", icon: Cpu },
    { num: "08", title: "Payer Risk-Share & Escrow", focus: "Pre-authorization automation, readmission penalty mitigation, and cashless insurance verification.", icon: ShieldCheck },
    { num: "09", title: "Multi-Tenant Hospital RBAC", focus: "Departmental isolation across General Surgery, Ortho, CTVS, and OB-GYN with granular role permissions.", icon: Layers },
    { num: "10", title: "Regulatory & SaMD Standards", focus: "CDSCO Class B Clinical Decision Support System architecture, ICMR guidelines, and HIPAA readiness.", icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="accent">10 / ENTERPRISE PLATFORM MATRIX</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Comprehensive SaaS Architecture
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            THE 10-PILLAR <br />
            <span className="text-accent">ENTERPRISE</span> SUITE.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Architected for enterprise hospital networks, surgical department chiefs, and clinical governance teams. Zero hardware footprint, turnkey ABDM integration, and sub-second edge intelligence.
          </p>
        </div>

        {/* 10 Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.num}
                className="p-5 border border-border bg-card hover:border-accent transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-accent">MODULE {m.num}</span>
                    <Icon size={14} className="text-mutedForeground" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-2">{m.title}</h4>
                  <p className="text-[11px] text-mutedForeground leading-relaxed font-mono">
                    {m.focus}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/80 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 size={12} /> Enterprise Ready
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
