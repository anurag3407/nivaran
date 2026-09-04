"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, Mic, Eye, Stethoscope, ArrowRight, ShieldCheck } from "lucide-react";

export function AgentLoopSection() {
  const agents = [
    {
      step: "01",
      name: "Care-Plan Synthesizer",
      subtitle: "Unstructured Document Parser",
      icon: FileText,
      description:
        "Ingests dense paper discharge notes, surgical operative summaries, and discharge medications. Converts complex latin/English schedules ('Tab Augmentin 625mg BD PC') into plain vernacular interactive schedules with audio reminders.",
      tech: "OpenAI JSON Schema • Multi-dialect translation",
    },
    {
      step: "02",
      name: "Vernacular Voice Vigilance",
      subtitle: "Autonomous Telephonic / PWA Intake",
      icon: Mic,
      description:
        "Initiates 60-second daily conversational check-ins via Web Speech API or automated WhatsApp voice prompts in Hindi, Bengali, Tamil, and Hinglish. Quantifies pain progression, bowel motility, and medication compliance.",
      tech: "Web Speech API • Real-time symptom vector extraction",
    },
    {
      step: "03",
      name: "Vision Wound Inspector",
      subtitle: "Contactless Incision Surveillance",
      icon: Eye,
      description:
        "Analyzes patient-submitted camera photos of surgical incisions against the internationally validated Wilson ASEPSIS protocol. Detects erythema margins (>2cm), seroma, wound edge dehiscence, and purulent exudate without physical contact.",
      tech: "Multimodal Vision • ASEPSIS Classification Model",
    },
    {
      step: "04",
      name: "SBAR Clinical Escalator",
      subtitle: "Zero-Burden Doctor Triage Feed",
      icon: Stethoscope,
      description:
        "Filters 95% of normal convalescence. When clinical deterioration velocity exceeds threshold, it synthesizes a structured medical SBAR (Situation, Background, Assessment, Recommendation) alert pushed directly to the attending surgical team.",
      tech: "Clinical SBAR Synthesis • 1-Click Tele-escalation",
    },
  ];

  return (
    <section id="agent-loop" className="py-20 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">04 / AUTONOMOUS ARCHITECTURE</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            The 4-Agent Orchestrator
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            A CLOSED-LOOP <br />
            <span className="text-accent">MULTI-AGENT</span> PIPELINE.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Four specialized micro-agents working synchronously to eliminate hospital-to-home blind spots.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.step}
                className="relative border border-border p-6 bg-card flex flex-col justify-between hover:border-border-hover transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-mono font-black text-mutedForeground/30 group-hover:text-accent transition-colors">
                      {agent.step}
                    </span>
                    <Icon size={20} strokeWidth={1.5} className="text-accent" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight">
                    {agent.name}
                  </h3>
                  <div className="text-xs font-mono text-mutedForeground mb-4">
                    {agent.subtitle}
                  </div>

                  <p className="text-xs text-mutedForeground leading-relaxed mb-6 font-normal">
                    {agent.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/80">
                  <span className="text-[10px] font-mono text-mutedForeground uppercase tracking-wider block">
                    {agent.tech}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
