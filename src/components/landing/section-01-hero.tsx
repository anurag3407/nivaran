"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, ShieldAlert, Zap, Stethoscope, UserCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 md:pt-28 pb-20 md:pb-36 border-b border-border overflow-hidden">
      {/* Decorative large background watermark */}
      <div className="absolute top-10 right-0 -z-10 select-none pointer-events-none opacity-[0.03] text-right font-mono font-black text-9xl md:text-[16rem] leading-none text-foreground">
        NIVARAN
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Badge variant="outline" className="text-xs font-mono">
            ENTERPRISE CLINICAL OS
          </Badge>
          <Badge variant="accent" className="text-xs font-mono">
            POST-DISCHARGE CARE CONTINUUM
          </Badge>
          <span className="text-xs font-mono text-mutedForeground tracking-wider">
            MULTI-CENTER HOSPITAL DEPLOYMENT • HIPAA &amp; DPDP 2023 COMPLIANT
          </span>
        </div>

        {/* The Massive Headline */}
        <div className="relative mb-10 max-w-5xl">
          <div className="h-1 w-20 bg-accent mb-6" />
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.92] text-foreground text-shadow-layer">
            THE GAP <br />
            BETWEEN <span className="text-accent">SURGERY</span> <br />
            &amp; SURVIVAL.
          </h1>
        </div>

        {/* Asymmetric 8 / 4 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 pt-8 border-t border-border">
          {/* Left Column (8 cols): Manifesto Lead */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-lg md:text-2xl text-foreground font-light leading-relaxed tracking-normal">
              Discharge marks the end of an inpatient bed, but begins the most vulnerable phase of clinical recovery. In India, <strong className="font-bold text-accent">18–24% of surgical patients</strong> experience preventable complications in the 30-day telemetry void.
            </p>
            <p className="text-sm md:text-base text-mutedForeground leading-relaxed max-w-2xl">
              Nivaran.ai is an autonomous post-discharge operating system. Powered by zero-hardware multimodal computer vision, vernacular conversational voice triage, and on-chain tamper-proof telemetry, it secures home recovery without adding a single keystroke to doctor workload.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href="/doctor/dashboard">
                <Button variant="accent-solid" size="lg" className="text-sm">
                  <Stethoscope size={18} strokeWidth={1.5} className="mr-2" />
                  Launch Doctor Command Center
                </Button>
              </Link>

              <Link href="/patient/DEMO-701">
                <Button variant="secondary" size="lg" className="text-sm">
                  <UserCheck size={18} strokeWidth={1.5} className="mr-2" />
                  Open Patient Recovery PWA
                </Button>
              </Link>

              <Link href="#interactive-demo">
                <Button variant="primary" size="lg" className="text-sm">
                  Interactive Product Sandbox
                  <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column (4 cols): Telemetry Telemetry Stats */}
          <div className="lg:col-span-4 border-l-0 lg:border-l lg:border-border lg:pl-10 space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
                Telemetry Breakdown
              </span>
              <div className="text-5xl md:text-6xl font-black font-mono text-accent">
                24.2<span className="text-2xl">%</span>
              </div>
              <p className="text-xs text-mutedForeground">
                30-day post-op complication rate in Indian high-volume tertiary hospitals without active monitoring.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
                Clinician Burden Delta
              </span>
              <div className="text-5xl md:text-6xl font-black font-mono text-foreground">
                0.00
              </div>
              <p className="text-xs text-mutedForeground">
                Doctor keystrokes added. Autonomous agent filters 95% of routine calls and pushes SBAR briefs only.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
                Unit Economics Cost
              </span>
              <div className="text-4xl md:text-5xl font-black font-mono text-emerald-400">
                ₹1.80
              </div>
              <p className="text-xs text-mutedForeground">
                Cost to monitor 1 patient for 14 days post-op (92% SaaS gross margin).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
