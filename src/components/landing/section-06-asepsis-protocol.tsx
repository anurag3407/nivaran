"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShieldCheck, CheckSquare, Award } from "lucide-react";

export function AsepsisProtocolSection() {
  const criteria = [
    { letter: "A", name: "Additional Treatment", points: "0 or 10 pts", desc: "Antibiotics prescribed for wound infection" },
    { letter: "S", name: "Serous Discharge", points: "0 to 5 pts", desc: "Daily evaluation of wound margins serous fluid" },
    { letter: "E", name: "Erythema Margin", points: "0 to 5 pts", desc: "Spreading reactive hyperemia > 2cm border" },
    { letter: "P", name: "Purulent Exudate", points: "0 to 10 pts", desc: "Presence of frankly suppurative drainage" },
    { letter: "S", name: "Separation of Tissues", points: "0 to 10 pts", desc: "Dehiscence of superficial or fascial layers" },
    { letter: "I", name: "Isolation of Bacteria", points: "0 or 10 pts", desc: "Positive microbiological culture from swab" },
  ];

  return (
    <section id="asepsis" className="py-20 md:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">05 / SCIENTIFIC RIGOR</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Validated Clinical Metrics
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            THE WILSON <br />
            <span className="text-accent">A.S.E.P.S.I.S.</span> PROTOCOL.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            We do not use vague "AI heuristics". Nivaran.ai digitizes the gold-standard surgical wound scoring system validated in over 40 years of international surgical trials.
          </p>
        </div>

        {/* ASEPSIS Score Formula Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {criteria.map((item) => (
            <div key={item.letter} className="border border-border p-6 bg-card hover:border-border-hover transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl font-mono font-black text-accent">{item.letter}</span>
                <span className="text-xs font-mono text-mutedForeground">{item.points}</span>
              </div>
              <h4 className="text-base font-bold text-foreground mb-1">{item.name}</h4>
              <p className="text-xs text-mutedForeground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Clinical Literature Citations */}
        <div className="border border-border p-8 bg-muted/20">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={20} strokeWidth={1.5} className="text-accent" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-foreground font-bold">
              Peer-Reviewed Literature Citations
            </h3>
          </div>

          <div className="space-y-4 font-mono text-xs text-mutedForeground">
            <div className="p-3 border border-border bg-[#0a0a0a]">
              <strong className="text-foreground">Wilson AP, et al.</strong> (1986). 
              <span className="italic"> "A scoring method (ASEPSIS) for postoperative wound infections for use in clinical trials of antibiotic prophylaxis."</span> 
              <span className="text-accent"> The Lancet</span>, 327(8476), 311-313.
            </div>
            <div className="p-3 border border-border bg-[#0a0a0a]">
              <strong className="text-foreground">Indian Council of Medical Research (ICMR).</strong> (2022). 
              <span className="italic"> "National Guidelines for Infection Prevention and Control in Healthcare Facilities."</span> New Delhi: Ministry of Health & Family Welfare.
            </div>
            <div className="p-3 border border-border bg-[#0a0a0a]">
              <strong className="text-foreground">World Health Organization (WHO).</strong> (2018). 
              <span className="italic"> "Global guidelines for the prevention of surgical site infection."</span> WHO Guidelines Approved by the Guidelines Review Committee.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
