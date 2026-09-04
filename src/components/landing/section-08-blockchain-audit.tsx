"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, ExternalLink, FileCheck, Layers } from "lucide-react";

export function BlockchainAuditSection() {
  const auditEntries = [
    {
      txHash: "0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
      patientAnon: "ANON-CABG-8812",
      event: "Critical Sternal Dehiscence Alert Minted",
      timestamp: "2026-09-04 11:42:18 IST",
      blockNumber: "1849201",
      gasUsed: "21,048 Gwei",
    },
    {
      txHash: "0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
      patientAnon: "ANON-FEMUR-3319",
      event: "Daily ASEPSIS Score 24 Logged (Superficial)",
      timestamp: "2026-09-04 08:30:05 IST",
      blockNumber: "1848934",
      gasUsed: "21,048 Gwei",
    },
    {
      txHash: "0x7f9a2b8e4c1d6a3f9e8d7c6b5a4e3f2d1c0b9a8e7d6c5b4a3f2e1d0c9b8a7f6e",
      patientAnon: "ANON-CHOL-7741",
      event: "Routine Day 3 Telemetry Baseline Anchored",
      timestamp: "2026-09-04 09:15:33 IST",
      blockNumber: "1849012",
      gasUsed: "21,048 Gwei",
    },
  ];

  return (
    <section id="blockchain" className="py-20 md:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="accent">07 / THE TRUST LAYER</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            On-Chain Cryptographic Telemetry
          </span>
        </div>

        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            TAMPER-PROOF <br />
            <span className="text-accent">MEDICO-LEGAL</span> AUDIT.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Why blockchain? When home recovery goes wrong, litigation begins. Nivaran anchors cryptographic telemetry hashes on-chain, proving exactly what was reported, when it was analyzed, and when clinicians were notified.
          </p>
        </div>

        {/* 3 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border border-border p-6 bg-card">
            <ShieldCheck size={24} strokeWidth={1.5} className="text-accent mb-3" />
            <h3 className="text-base font-bold text-foreground mb-1">DPDP Act 2023 Compliance</h3>
            <p className="text-xs text-mutedForeground leading-relaxed">
              Zero Protected Health Information (PHI) is placed on-chain. Only one-way SHA-256 mathematical hashes of daily check-ins are anchored to the distributed ledger.
            </p>
          </div>

          <div className="border border-border p-6 bg-card">
            <Lock size={24} strokeWidth={1.5} className="text-accent mb-3" />
            <h3 className="text-base font-bold text-foreground mb-1">Non-Repudiation Security</h3>
            <p className="text-xs text-mutedForeground leading-relaxed">
              Neither patient nor hospital can fabricate or delete records after an adverse outcome. Eliminates medical malpractice ambiguity with cryptographic finality.
            </p>
          </div>

          <div className="border border-border p-6 bg-card">
            <Layers size={24} strokeWidth={1.5} className="text-accent mb-3" />
            <h3 className="text-base font-bold text-foreground mb-1">Automated Insurance Escrow</h3>
            <p className="text-xs text-mutedForeground leading-relaxed">
              Under IRDAI cashless guidelines, insurers automatically disburse post-discharge rehabilitation pre-authorizations upon smart contract verification of recovery milestones.
            </p>
          </div>
        </div>

        {/* Live Transaction Ledger Table */}
        <div className="border border-border p-6 bg-muted/20">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-400 rounded-none animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                Polygon Amoy Ledger Feed
              </span>
            </div>
            <Link href="/audit-trail">
              <Button variant="ghost" size="sm" className="text-xs">
                View Full Explorer <ExternalLink size={12} className="ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {auditEntries.map((entry, idx) => (
              <div
                key={idx}
                className="p-4 border border-border bg-[#0a0a0a] flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">{entry.patientAnon}</span>
                    <span className="text-mutedForeground">•</span>
                    <span className="text-foreground">{entry.event}</span>
                  </div>
                  <div className="text-[11px] text-mutedForeground truncate max-w-md">
                    TX: {entry.txHash}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right text-[11px] text-mutedForeground">
                  <div>
                    <div>BLOCK #{entry.blockNumber}</div>
                    <div>{entry.timestamp}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
                    CONFIRMED
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
