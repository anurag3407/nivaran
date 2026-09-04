"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShieldAlert, CheckCircle2 } from "lucide-react";

export function UnitEconomicsSection() {
  return (
    <section id="economics" className="py-20 md:py-32 border-b border-border bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="outline">08 / BUSINESS MODEL</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Financial Sustainability
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            UNIT ECONOMICS <br />
            &amp; <span className="text-accent">FINANCIAL</span> VIABILITY.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Built as a zero-hardware pure software play. Serverless edge compute delivers institutional-grade margins and clear payer ROI.
          </p>
        </div>

        {/* Big Numbers Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="border border-border p-6 bg-card">
            <span className="text-xs font-mono uppercase text-mutedForeground tracking-wider">
              Cost Per Discharged Patient
            </span>
            <div className="text-4xl md:text-5xl font-mono font-black text-emerald-400 mt-2">
              ₹1.80
            </div>
            <p className="text-[11px] text-mutedForeground mt-2 font-mono">
              Serverless DB + Edge AI tokens (14-day monitoring window)
            </p>
          </div>

          <div className="border border-border p-6 bg-card">
            <span className="text-xs font-mono uppercase text-mutedForeground tracking-wider">
              Price Charged to Hospital
            </span>
            <div className="text-4xl md:text-5xl font-mono font-black text-foreground mt-2">
              ₹150
            </div>
            <p className="text-[11px] text-mutedForeground mt-2 font-mono">
              Per surgical discharge episode billed to private hospital / trust
            </p>
          </div>

          <div className="border border-border p-6 bg-card">
            <span className="text-xs font-mono uppercase text-mutedForeground tracking-wider">
              Gross Profit Margin
            </span>
            <div className="text-4xl md:text-5xl font-mono font-black text-accent mt-2">
              92.4%
            </div>
            <p className="text-[11px] text-mutedForeground mt-2 font-mono">
              Pure software gross margins with zero hardware inventory risk
            </p>
          </div>

          <div className="border border-border p-6 bg-card">
            <span className="text-xs font-mono uppercase text-mutedForeground tracking-wider">
              Annual Contract Value (ACV)
            </span>
            <div className="text-4xl md:text-5xl font-mono font-black text-foreground mt-2">
              ₹24 L
            </div>
            <p className="text-[11px] text-mutedForeground mt-2 font-mono">
              Per 300-bed hospital network (General Surgery + Ortho + CTVS)
            </p>
          </div>
        </div>

        {/* Dual Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card highlighted className="space-y-4">
            <Badge variant="accent">PRIMARY REVENUE STREAM</Badge>
            <CardTitle className="text-2xl">B2B Hospital SaaS Subscription</CardTitle>
            <CardContent className="px-0 pb-0 space-y-3 text-xs md:text-sm text-mutedForeground leading-relaxed">
              <p>
                Targeting tier-1 and tier-2 private hospital networks (Apollo, Max, Fortis, Manipal, Narayana Health).
              </p>
              <div className="space-y-2 font-mono pt-2">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>₹80,000 / month per departmental surgical unit</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Avoids 30-day readmissions (saving hospital ₹1.8L–₹3.5L per prevented ICU readmission)</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Directly drives NABH 5th Edition digital clinical governance compliance</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="space-y-4">
            <Badge variant="outline">SECONDARY REVENUE STREAM</Badge>
            <CardTitle className="text-2xl">B2B2C Health Insurer Risk-Share</CardTitle>
            <CardContent className="px-0 pb-0 space-y-3 text-xs md:text-sm text-mutedForeground leading-relaxed">
              <p>
                Partnering with standalone health insurers (Star Health, HDFC ERGO, Care Health Insurance, Niva Bupa).
              </p>
              <div className="space-y-2 font-mono pt-2">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>₹100 per insured surgical claim under Cashless Everywhere policy</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Insurers save millions by preventing secondary septic revision surgeries</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span>Smart contracts verify post-op medication adherence prior to claim payout</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
