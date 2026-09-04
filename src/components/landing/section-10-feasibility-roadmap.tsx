"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Shield, Globe, Terminal } from "lucide-react";

export function FeasibilityRoadmapSection() {
  const phases = [
    {
      quarter: "Q1 2026",
      title: "Clinical Observational Pilot",
      status: "CURRENT",
      bullets: [
        "Retrospective validation on 10,000+ de-identified surgical records across tertiary trauma centers",
        "Fine-tuning computer-vision ASEPSIS model on Fitzpatrick skin types IV & V (Indian demographic calibration)",
        "Zero clinical disruption: runs in parallel shadow mode alongside routine outpatient visits",
      ],
    },
    {
      quarter: "Q2 2026",
      title: "Regulatory Filing & ABDM Integration",
      status: "UPCOMING",
      bullets: [
        "CDSCO Class B Clinical Decision Support System (SaMD) notification filing",
        "Full certification of Ayushman Bharat Digital Mission (ABDM) Milestone 1, 2, and 3 FHIR APIs",
        "HIPAA and DPDP Act 2023 third-party cryptographic security audit",
      ],
    },
    {
      quarter: "Q3 2026",
      title: "Multi-Center Prospective Trial",
      status: "PLANNED",
      bullets: [
        "Prospective trial across 3 tertiary hospital networks (500 elective laparoscopy & ortho patients)",
        "Quantification of primary endpoint: 30-day readmission rate reduction & time-to-SSI detection",
        "Deployment of Polygon Amoy on-chain escrow with pilot health insurance partner",
      ],
    },
    {
      quarter: "Q4 2026",
      title: "Commercial Rollout & Expansion",
      status: "PLANNED",
      bullets: [
        "Enterprise integration into Epic, Cerner, and Indian Hospital Information Systems (e-Hospital)",
        "Expansion into post-discharge cardiology (heart failure telemetry) and oncology care pathways",
        "Public health deployment in District Hospitals under National Health Mission (NHM) grant",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">09 / ROADMAP &amp; COMPLIANCE</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Feasibility Matrix
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            CLINICAL &amp; TECHNICAL <br />
            <span className="text-accent">FEASIBILITY</span>.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Engineered within real-world Indian regulatory frameworks. Zero clinical liability risk through CDSCO Class B SaMD classification.
          </p>
        </div>

        {/* 4-Phase Roadmap Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <div key={phase.quarter} className="border border-border p-6 bg-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-accent">{phase.quarter}</span>
                  <Badge variant={phase.status === "CURRENT" ? "accent" : "outline"} className="text-[10px]">
                    {phase.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">{phase.title}</h3>
                <ul className="space-y-3 text-xs text-mutedForeground font-mono leading-relaxed">
                  {phase.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent shrink-0 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
