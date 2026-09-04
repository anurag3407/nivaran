"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, Clock, FileSpreadsheet, EyeOff } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "The Unmonitored 30-Day Void",
      icon: EyeOff,
      description:
        "The moment a patient exits tertiary hospital gates or surgical centers, all physiological telemetry drops to zero. Post-operative wound infection, dehydration, or deep vein thrombosis (DVT) incubates in total darkness for 7 to 12 days before septic emergency readmission.",
      stat: "72%",
      statLabel: "Complications occur after hospital day 3",
    },
    {
      num: "02",
      title: "The English Summary Paradox",
      icon: FileSpreadsheet,
      description:
        "Patients receive 4 dense pages of English medical jargon ('Tab Augmentin 625mg BD x 5d PC', 'Spirometry QID'). In Indian tier-2/3 demographics, low functional health literacy leads to 48% unintentional medication non-adherence and missed warning signs.",
      stat: "68%",
      statLabel: "Patients cannot interpret dosage frequency",
    },
    {
      num: "03",
      title: "The Clinician Workload Chokehold",
      icon: Clock,
      description:
        "Senior surgeons in high-volume tertiary hospital networks see 80–120 OPD patients daily. They cannot field unstructured WhatsApp voice notes, frantic phone calls, or blurry camera photos. Telehealth portals fail because they demand 10 minutes of clinician time per interaction.",
      stat: "1:20",
      statLabel: "Nurse to patient casualty ratio in public tertiary care",
    },
    {
      num: "04",
      title: "The Medico-Legal Liability Vacuum",
      icon: AlertTriangle,
      description:
        "Under the DPDP Act 2023 and NMC guidelines, home recovery complications trigger intense disputes: did the patient report fever early, or did the hospital fail to respond? Centralized hospital databases can be edited; unverified chats offer zero legal standing.",
      stat: "₹4.2 Cr",
      statLabel: "Average hospital litigation cost for post-op negligence",
    },
  ];

  return (
    <section id="problem" className="py-20 md:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">01 / PROBLEM STATEMENT</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Clinical Breakdown
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            THE UNMONITORED <br />
            <span className="text-accent">ABYSS</span> OF CARE.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Why India's premier surgical teams lose their greatest clinical victories to preventable post-discharge deterioration.
          </p>
        </div>

        {/* 4-Grid Problem Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <Card key={prob.num} className="border-border hover:border-border-hover transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl md:text-4xl font-mono font-black text-mutedForeground/40 group-hover:text-accent transition-colors">
                    {prob.num}
                  </span>
                  <Icon size={22} strokeWidth={1.5} className="text-mutedForeground group-hover:text-accent transition-colors" />
                </div>
                <CardTitle className="text-xl md:text-2xl mb-3">
                  {prob.title}
                </CardTitle>
                <CardContent className="px-0 pb-0 text-sm md:text-base text-mutedForeground leading-relaxed">
                  {prob.description}
                  <div className="mt-6 pt-4 border-t border-border flex items-baseline justify-between">
                    <span className="text-2xl md:text-3xl font-mono font-bold text-foreground">
                      {prob.stat}
                    </span>
                    <span className="text-xs font-mono text-mutedForeground uppercase tracking-wider">
                      {prob.statLabel}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
