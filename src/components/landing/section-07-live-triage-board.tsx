"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INITIAL_PATIENTS, PatientRecord } from "@/lib/data/mockPatients";
import { AlertCircle, AlertTriangle, CheckCircle, ArrowUpRight, Phone, MessageSquare } from "lucide-react";

export function LiveTriageBoardSection() {
  const [selectedPatient, setSelectedPatient] = React.useState<PatientRecord>(INITIAL_PATIENTS[1]); // Default Mohammed Farooq (Critical)

  return (
    <section className="py-20 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">06 / CLINICAL COMMAND PREVIEW</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Live Stream Feed
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
              THE SURGEON'S <br />
              <span className="text-accent">COMMAND</span> CENTER.
            </h2>
            <p className="mt-3 text-sm md:text-base text-mutedForeground font-light max-w-2xl">
              Real-time post-discharge surveillance feed. Patients ranked by Deterioration Velocity ($\Delta R/\Delta t$).
            </p>
          </div>

          <Link href="/doctor/dashboard">
            <Button variant="accent-solid" size="default" className="text-xs">
              Open Full Clinician Suite
              <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Interactive Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border bg-card">
          {/* Left Column (7 cols): Patient Feed */}
          <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-border p-4 md:p-6 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono text-mutedForeground">
              <span>ACTIVE RECOVERY QUEUE ({INITIAL_PATIENTS.length} PATIENTS)</span>
              <span>SORTED BY RISK VELOCITY</span>
            </div>

            {INITIAL_PATIENTS.map((p) => {
              const isSelected = selectedPatient.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-muted/60"
                      : "border-border hover:border-border-hover bg-background/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{p.name}</span>
                        <span className="text-xs font-mono text-mutedForeground">({p.age}{p.gender})</span>
                      </div>
                      <div className="text-xs text-mutedForeground mt-0.5">
                        {p.surgery} • POD {p.dayPostOp}
                      </div>
                    </div>

                    <Badge
                      variant={
                        p.status === "CRITICAL"
                          ? "danger"
                          : p.status === "WARNING"
                          ? "warning"
                          : "success"
                      }
                    >
                      {p.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-[11px] font-mono text-mutedForeground">
                    <div>
                      VELOCITY: <span className="text-foreground font-bold">{p.riskVelocity > 0 ? `+${p.riskVelocity}` : p.riskVelocity}/d</span>
                    </div>
                    <div>
                      PAIN: <span className="text-foreground font-bold">{p.painScore}/10</span>
                    </div>
                    <div>
                      ASEPSIS: <span className="text-foreground font-bold">{p.asepsisScore}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (5 cols): Live SBAR Clinical Brief */}
          <div className="lg:col-span-5 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                Synthesized SBAR Clinical Brief
              </span>
              <span className="text-xs font-mono text-mutedForeground">
                {selectedPatient.uhid}
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 border border-border bg-[#0a0a0a]">
                <div className="text-accent font-bold mb-1">[S] SITUATION</div>
                <p className="font-sans text-xs text-foreground leading-relaxed">
                  {selectedPatient.sbar.situation}
                </p>
              </div>

              <div className="p-3 border border-border bg-[#0a0a0a]">
                <div className="text-mutedForeground font-bold mb-1">[B] BACKGROUND</div>
                <p className="font-sans text-xs text-foreground leading-relaxed">
                  {selectedPatient.sbar.background}
                </p>
              </div>

              <div className="p-3 border border-border bg-[#0a0a0a]">
                <div className="text-amber-400 font-bold mb-1">[A] ASSESSMENT</div>
                <p className="font-sans text-xs text-foreground leading-relaxed">
                  {selectedPatient.sbar.assessment}
                </p>
              </div>

              <div className="p-3 border border-border bg-[#0a0a0a]">
                <div className="text-emerald-400 font-bold mb-1">[R] RECOMMENDATION</div>
                <p className="font-sans text-xs text-foreground leading-relaxed">
                  {selectedPatient.sbar.recommendation}
                </p>
              </div>
            </div>

            {/* Clinician Action Buttons */}
            <div className="pt-4 border-t border-border flex items-center gap-3">
              <a
                href={`tel:${selectedPatient.phone}`}
                className="flex-1 text-center py-2.5 px-4 text-xs font-mono uppercase tracking-wider border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={14} /> Direct Call
              </a>
              <a
                href={`https://wa.me/${selectedPatient.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(selectedPatient.name)},%20this%20is%20your%20Surgical%20Care%20Team%20at%20Nivaran%20Health.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-2.5 px-4 text-xs font-mono uppercase tracking-wider bg-accent text-accentForeground font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare size={14} /> Tele-Escalate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
