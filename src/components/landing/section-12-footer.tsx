"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-foreground text-background py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-background/20">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter block text-background">
              NIVARAN<span className="text-accent">.AI</span>
            </span>
            <p className="text-base md:text-lg text-background/80 max-w-md font-light leading-relaxed">
              Because surgical excellence must not end at the hospital exit door. Autonomous post-discharge closed-loop telemetry.
            </p>
            <div className="text-xs font-mono uppercase tracking-widest text-background/60">
              Enterprise Healthcare Telemetry Platform • Multi-Center Deployment
            </div>
          </div>

          {/* Quick Gateways */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs uppercase tracking-wider">
            <div className="font-bold text-background mb-2">Application Gateways</div>
            <div>
              <Link href="/doctor/dashboard" className="text-background/80 hover:text-accent flex items-center gap-1 transition-colors">
                Doctor Command Center <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <Link href="/patient/DEMO-701" className="text-background/80 hover:text-accent flex items-center gap-1 transition-colors">
                Patient Recovery PWA <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <Link href="/audit-trail" className="text-background/80 hover:text-accent flex items-center gap-1 transition-colors">
                On-Chain Audit Ledger <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <Link href="/settings" className="text-background/80 hover:text-accent flex items-center gap-1 transition-colors">
                Universal Model Switcher <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Enterprise Compliance & Governance */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <div className="font-bold text-background uppercase tracking-wider mb-2">Enterprise &amp; Compliance</div>
            <div className="text-background/70 space-y-1.5 leading-relaxed">
              <div>CDSCO Class B SaMD Compliant</div>
              <div>ABDM Milestones 1, 2 &amp; 3 Certified</div>
              <div>DPDP Act 2023 &amp; HIPAA Enforced</div>
              <div className="pt-2 text-background/90">Institutional Inquiries:</div>
              <a href="mailto:enterprise@nivaran.ai" className="text-accent hover:underline block">
                enterprise@nivaran.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-background/60">
          <div>
            © 2026 Nivaran Health Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Powered by Next.js 15, Multi-Agent AI &amp; Polygon Amoy Ledger</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
