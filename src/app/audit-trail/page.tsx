"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { generateTelemetryHash } from "@/lib/utils";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  ExternalLink,
  Search,
  CheckCircle,
  Copy,
  Layers,
  Terminal,
} from "lucide-react";

interface BlockEntry {
  blockNumber: number;
  txHash: string;
  patientAnon: string;
  event: string;
  timestamp: string;
  gasFee: string;
  status: "CONFIRMED" | "FINALIZED";
}

const INITIAL_BLOCKS: BlockEntry[] = [
  {
    blockNumber: 1849215,
    txHash: "0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    patientAnon: "ANON-CABG-8812",
    event: "CRITICAL ALERT: Sternal Dehiscence SBAR Dispatched",
    timestamp: "2026-09-04 11:42:18 IST",
    gasFee: "0.00042 POL",
    status: "FINALIZED",
  },
  {
    blockNumber: 1849080,
    txHash: "0x7f9a2b8e4c1d6a3f9e8d7c6b5a4e3f2d1c0b9a8e7d6c5b4a3f2e1d0c9b8a7f6e",
    patientAnon: "ANON-CHOL-7741",
    event: "ROUTINE TELEMETRY: Day 3 Voice & Medication Check-In",
    timestamp: "2026-09-04 09:15:33 IST",
    gasFee: "0.00038 POL",
    status: "FINALIZED",
  },
  {
    blockNumber: 1848934,
    txHash: "0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
    patientAnon: "ANON-FEMUR-3319",
    event: "ASEPSIS SCORE: Superficial Hyperemia 1.8cm Logged",
    timestamp: "2026-09-04 08:30:05 IST",
    gasFee: "0.00041 POL",
    status: "FINALIZED",
  },
  {
    blockNumber: 1848612,
    txHash: "0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b",
    patientAnon: "ANON-LSCS-5561",
    event: "DISCHARGE ENROLLMENT: Post-LSCS Telemetry Initialized",
    timestamp: "2026-09-04 07:10:49 IST",
    gasFee: "0.00055 POL",
    status: "FINALIZED",
  },
];

export default function AuditTrailPage() {
  const [blocks] = React.useState<BlockEntry[]>(INITIAL_BLOCKS);
  const [search, setSearch] = React.useState("");
  const [testPayload, setTestPayload] = React.useState(
    '{"patientId":"NVR-8921","painScore":4,"fever":false,"asepsis":12}'
  );
  const [verifiedHash, setVerifiedHash] = React.useState("");

  const handleComputeHash = async () => {
    try {
      const parsed = JSON.parse(testPayload);
      const hash = await generateTelemetryHash(parsed);
      setVerifiedHash(hash);
    } catch {
      const hash = await generateTelemetryHash({ raw: testPayload });
      setVerifiedHash(hash);
    }
  };

  const filteredBlocks = blocks.filter(
    (b) =>
      b.txHash.toLowerCase().includes(search.toLowerCase()) ||
      b.patientAnon.toLowerCase().includes(search.toLowerCase()) ||
      b.event.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono uppercase text-mutedForeground hover:text-foreground">
            <ArrowLeft size={16} /> Home
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-tight text-foreground">
              POLYGON AMOY CRYPTOGRAPHIC TELEMETRY LEDGER
            </span>
          </div>
        </div>

        <Badge variant="accent" className="text-xs">
          NETWORK: POLYGON TESTNET
        </Badge>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8 space-y-8">
        {/* Ledger Explainer */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
            THE MEDICO-LEGAL <br />
            <span className="text-accent">IMMUTABILITY</span> ENGINE.
          </h1>
          <p className="text-xs md:text-sm text-mutedForeground font-light leading-relaxed">
            Under India's Digital Personal Data Protection (DPDP) Act 2023, patient clinical data must be private yet non-repudiable. Nivaran stores zero PHI on-chain; only SHA-256 state vectors are cryptographically anchored to prove clinical timeline integrity.
          </p>
        </div>

        {/* Live Hash Verifier Sandbox */}
        <Card className="border-border bg-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                Live SHA-256 Telemetry Hash Generator
              </span>
            </div>
            <span className="text-[11px] font-mono text-mutedForeground">Client-Side WebCrypto Engine</span>
          </div>

          <p className="text-xs text-mutedForeground font-mono">
            Enter any JSON clinical telemetry payload to generate its tamper-proof hash:
          </p>

          <div className="space-y-3">
            <textarea
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              className="w-full h-24 bg-input p-3 text-xs font-mono border border-border focus:border-accent focus:outline-none text-foreground"
            />

            <Button variant="accent-solid" size="sm" onClick={handleComputeHash}>
              Generate Cryptographic Hash
            </Button>
          </div>

          {verifiedHash && (
            <div className="p-3 border border-emerald-800 bg-emerald-950/30 text-xs font-mono space-y-1">
              <div className="text-emerald-400 font-bold uppercase text-[10px]">
                Computed State Root Hash:
              </div>
              <div className="text-foreground break-all">{verifiedHash}</div>
            </div>
          )}
        </Card>

        {/* Ledger Search */}
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedForeground" />
          <input
            type="text"
            placeholder="Search TX Hash, Patient Anon ID, Event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 bg-input pl-10 pr-4 text-xs font-mono border border-border focus:border-accent focus:outline-none"
          />
        </div>

        {/* Blockchain Transaction List */}
        <div className="border border-border bg-card">
          <div className="p-4 border-b border-border flex items-center justify-between font-mono text-xs text-mutedForeground">
            <span>TRANSACTION BLOCKS ({filteredBlocks.length})</span>
            <span>SMART CONTRACT: 0x8921...c7f4</span>
          </div>

          <div className="divide-y divide-border font-mono text-xs">
            {filteredBlocks.map((b) => (
              <div key={b.txHash} className="p-4 md:p-6 hover:bg-muted/20 transition-colors space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold">{b.patientAnon}</span>
                    <span className="text-mutedForeground">•</span>
                    <span className="text-foreground font-bold">{b.event}</span>
                  </div>
                  <Badge variant="success" className="text-[10px] w-fit">
                    {b.status}
                  </Badge>
                </div>

                <div className="text-mutedForeground break-all text-[11px]">
                  TX HASH: <span className="text-foreground">{b.txHash}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-mutedForeground pt-2 border-t border-border/60">
                  <div>BLOCK #{b.blockNumber} • GAS: {b.gasFee}</div>
                  <div>TIMESTAMP: {b.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
