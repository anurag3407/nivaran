"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic, Upload, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Volume2 } from "lucide-react";
import { analyzeDischargeSummary, evaluateWoundImage, runVoiceTriage } from "@/lib/ai/engine";
import { CarePlan, WoundEvaluation, VoiceTriageResult } from "@/lib/ai/types";

export function InteractiveDemoSection() {
  const [activeTab, setActiveTab] = React.useState<"discharge" | "voice" | "wound">("discharge");
  const [loading, setLoading] = React.useState(false);

  // States
  const [carePlan, setCarePlan] = React.useState<CarePlan | null>(null);
  const [voiceResult, setVoiceResult] = React.useState<VoiceTriageResult | null>(null);
  const [woundResult, setWoundResult] = React.useState<WoundEvaluation | null>(null);

  // Sample Discharge Text
  const sampleDischarge = `Pt Rajesh Kumar, 48M, UHID: NVR-2026-8921.
Post-Op Day 1, Elective Laparoscopic Cholecystectomy for gallstone disease.
Discharge Vitals: BP 122/78, HR 74, Afebrile, Port sites dry.
Rx:
1. Tab Cefuroxime 500mg BD x 5 days
2. Tab Pantocid 40mg OD AC x 7 days
3. Tab Ultracet SOS for severe pain
Adv: High protein low fat diet. Keep umbilicus dry. SOS if fever > 101F or bilious vomiting. Follow up in Room 204 next Tuesday.`;

  // Sample Audio Transcripts
  const [selectedTranscript, setSelectedTranscript] = React.useState(
    "Namaste doctor sahab, taanke ke paas halka dard hai lekin bukhar nahi hai, khana kha pa raha hoon."
  );

  const runDischargeTest = async () => {
    setLoading(true);
    try {
      const res = await analyzeDischargeSummary(sampleDischarge);
      setCarePlan(res);
    } finally {
      setLoading(false);
    }
  };

  const runVoiceTest = async () => {
    setLoading(true);
    try {
      const res = await runVoiceTriage(selectedTranscript, "Hindi", 3);
      setVoiceResult(res);
    } finally {
      setLoading(false);
    }
  };

  const runWoundTest = async () => {
    setLoading(true);
    try {
      // Mock base64 image call to trigger analysis
      const res = await evaluateWoundImage("data:image/jpeg;base64,mock-wound-image", "Day 4 Laparoscopic Cholecystectomy");
      setWoundResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="interactive-demo" className="py-20 md:py-32 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="accent">03 / LIVE INTERACTIVE PLAYGROUND</Badge>
          <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground">
            Real In-Browser Execution
          </span>
        </div>

        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-foreground">
            TEST THE <span className="text-accent">AGENTIC</span> ENGINE.
          </h2>
          <p className="mt-4 text-base md:text-lg text-mutedForeground font-light">
            Interact directly with our autonomous post-discharge micro-agents. No registration or credit card required.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          <button
            onClick={() => setActiveTab("discharge")}
            className={`px-5 py-2.5 text-xs md:text-sm font-mono uppercase tracking-wider transition-all ${
              activeTab === "discharge"
                ? "bg-accent text-accentForeground font-bold"
                : "border border-border text-mutedForeground hover:text-foreground"
            }`}
          >
            Agent 1: Care-Plan Converter
          </button>
          <button
            onClick={() => setActiveTab("voice")}
            className={`px-5 py-2.5 text-xs md:text-sm font-mono uppercase tracking-wider transition-all ${
              activeTab === "voice"
                ? "bg-accent text-accentForeground font-bold"
                : "border border-border text-mutedForeground hover:text-foreground"
            }`}
          >
            Agent 2: Vernacular Voice Triage
          </button>
          <button
            onClick={() => setActiveTab("wound")}
            className={`px-5 py-2.5 text-xs md:text-sm font-mono uppercase tracking-wider transition-all ${
              activeTab === "wound"
                ? "bg-accent text-accentForeground font-bold"
                : "border border-border text-mutedForeground hover:text-foreground"
            }`}
          >
            Agent 3: ASEPSIS Wound Vision
          </button>
        </div>

        {/* TAB 1: Care-Plan Converter */}
        {activeTab === "discharge" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="border border-border p-5 bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-mutedForeground">
                    Hospital Clinical Discharge Summary
                  </span>
                  <Badge variant="outline" className="text-[10px]">Unstructured Clinical Text</Badge>
                </div>
                <pre className="text-xs font-mono text-mutedForeground whitespace-pre-wrap leading-relaxed bg-[#0a0a0a] p-4 border border-border">
                  {sampleDischarge}
                </pre>
              </div>

              <Button
                variant="accent-solid"
                size="default"
                onClick={runDischargeTest}
                disabled={loading}
                className="w-full"
              >
                <Sparkles size={16} className="mr-2" />
                {loading ? "Agent Synthesizing Plan..." : "Run Care-Plan Deconstructor Agent"}
              </Button>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-border p-6 bg-card min-h-[380px]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                    Structured Bilingual Output
                  </span>
                  {carePlan && <Badge variant="success">Validated 200 OK</Badge>}
                </div>

                {carePlan ? (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="p-3 bg-muted/40 border border-border">
                      <div className="text-mutedForeground uppercase">Patient / Procedure</div>
                      <div className="text-sm font-bold text-foreground mt-0.5">
                        {carePlan.patientName} — {carePlan.surgeryProcedure}
                      </div>
                    </div>

                    <div className="p-3 bg-muted/40 border border-border">
                      <div className="text-accent uppercase font-bold flex items-center gap-1.5 mb-1">
                        <Volume2 size={14} /> Vernacular Audio Script (Hindi)
                      </div>
                      <p className="text-xs text-foreground leading-relaxed font-sans">
                        "{carePlan.vernacularSummaryHindi}"
                      </p>
                    </div>

                    <div>
                      <div className="text-mutedForeground uppercase mb-2">Prescribed Regimen ({carePlan.medications.length} Meds)</div>
                      <div className="space-y-2">
                        {carePlan.medications.slice(0, 2).map((m, i) => (
                          <div key={i} className="p-2 border border-border flex justify-between items-center bg-[#0a0a0a]">
                            <div>
                              <div className="font-bold text-foreground">{m.name}</div>
                              <div className="text-[11px] text-mutedForeground">{m.timing}</div>
                            </div>
                            <Badge variant="outline" className="text-[10px]">{m.frequency}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-mutedForeground">
                    <Sparkles size={32} strokeWidth={1} className="mb-3 text-border" />
                    <p className="text-xs font-mono">
                      Click the button on the left to watch the agent parse, translate, and schedule the raw clinical discharge text.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Voice Triage */}
        {activeTab === "voice" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="border border-border p-5 bg-muted/20 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-mutedForeground block">
                  Simulate Patient Speech Input
                </span>
                <div className="space-y-2">
                  <button
                    onClick={() =>
                      setSelectedTranscript("Namaste doctor sahab, taanke ke paas halka dard hai lekin bukhar nahi hai, khana kha pa raha hoon.")
                    }
                    className={`w-full text-left p-3 text-xs font-mono border transition-colors ${
                      selectedTranscript.includes("halka dard")
                        ? "border-accent text-foreground bg-[#0a0a0a]"
                        : "border-border text-mutedForeground hover:text-foreground"
                    }`}
                  >
                    Scenario A (Normal): "Halka dard hai, bukhar nahi hai..."
                  </button>

                  <button
                    onClick={() =>
                      setSelectedTranscript("Doctor sahab seene mein bahut tezz dard ho raha hai aur patti pe peela paani aa gaya hai, bukhar 101 hai.")
                    }
                    className={`w-full text-left p-3 text-xs font-mono border transition-colors ${
                      selectedTranscript.includes("peela paani")
                        ? "border-accent text-foreground bg-[#0a0a0a]"
                        : "border-border text-mutedForeground hover:text-foreground"
                    }`}
                  >
                    Scenario B (Red Flag): "Seene mein tezz dard, patti pe peela paani, bukhar 101..."
                  </button>
                </div>
              </div>

              <Button
                variant="accent-solid"
                size="default"
                onClick={runVoiceTest}
                disabled={loading}
                className="w-full"
              >
                <Mic size={16} className="mr-2" />
                {loading ? "Transcribing & Triaging..." : "Run Vernacular Voice Triage Agent"}
              </Button>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-border p-6 bg-card min-h-[380px]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                    Clinical Voice Triage Matrix
                  </span>
                  {voiceResult && (
                    <Badge
                      variant={
                        voiceResult.clinicalTriageAcuity === "IMMEDIATE_ESCALATION"
                          ? "danger"
                          : voiceResult.clinicalTriageAcuity === "WATCHLIST"
                          ? "warning"
                          : "success"
                      }
                    >
                      {voiceResult.clinicalTriageAcuity}
                    </Badge>
                  )}
                </div>

                {voiceResult ? (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 border border-border bg-muted/40">
                        <div className="text-mutedForeground">PAIN SCALE</div>
                        <div className="text-2xl font-bold text-foreground mt-1">{voiceResult.painScore} / 10</div>
                      </div>
                      <div className="p-3 border border-border bg-muted/40">
                        <div className="text-mutedForeground">FEVER DETECTED</div>
                        <div className={`text-2xl font-bold mt-1 ${voiceResult.feverPresent ? "text-red-400" : "text-emerald-400"}`}>
                          {voiceResult.feverPresent ? "YES" : "NO"}
                        </div>
                      </div>
                      <div className="p-3 border border-border bg-muted/40">
                        <div className="text-mutedForeground">EXUDATE FLUID</div>
                        <div className={`text-2xl font-bold mt-1 ${voiceResult.woundDrainagePresent ? "text-red-400" : "text-emerald-400"}`}>
                          {voiceResult.woundDrainagePresent ? "PRESENT" : "DRY"}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border border-border bg-[#0a0a0a]">
                      <div className="text-mutedForeground uppercase mb-1">Feedback To Patient</div>
                      <p className="font-sans text-xs text-foreground">{voiceResult.vernacularSummary}</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-mutedForeground">
                    <Mic size={32} strokeWidth={1} className="mb-3 text-border" />
                    <p className="text-xs font-mono">
                      Select a speech scenario on the left and run the voice triage agent.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Wound Vision */}
        {activeTab === "wound" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-4">
              <div className="border border-border p-6 bg-muted/20 text-center">
                <div className="h-44 border-2 border-dashed border-border flex flex-col items-center justify-center p-4 bg-[#0a0a0a]">
                  <Upload size={28} strokeWidth={1.5} className="text-accent mb-2" />
                  <span className="text-xs font-mono text-foreground font-bold">
                    POST-OP INCISION SNAPSHOT
                  </span>
                  <span className="text-[11px] text-mutedForeground mt-1 font-mono">
                    High-resolution camera capture with edge normalization
                  </span>
                </div>
              </div>

              <Button
                variant="accent-solid"
                size="default"
                onClick={runWoundTest}
                disabled={loading}
                className="w-full"
              >
                <Sparkles size={16} className="mr-2" />
                {loading ? "Calculating ASEPSIS..." : "Inspect Wound via Computer Vision"}
              </Button>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-border p-6 bg-card min-h-[380px]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                    Wilson ASEPSIS Wound Grading
                  </span>
                  {woundResult && (
                    <Badge variant={woundResult.riskTier === "CRITICAL" ? "danger" : "success"}>
                      {woundResult.riskTier} RISK
                    </Badge>
                  )}
                </div>

                {woundResult ? (
                  <div className="space-y-4 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 border border-border bg-muted/40">
                        <div className="text-mutedForeground">TOTAL ASEPSIS SCORE</div>
                        <div className="text-3xl font-bold font-mono text-foreground mt-1">
                          {woundResult.asepsisScore} <span className="text-xs text-mutedForeground font-normal">/ 70</span>
                        </div>
                      </div>
                      <div className="p-3 border border-border bg-muted/40">
                        <div className="text-mutedForeground">ERYTHEMA MARGIN</div>
                        <div className="text-3xl font-bold font-mono text-accent mt-1">
                          {woundResult.erythemaPercentage}%
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border border-border bg-[#0a0a0a]">
                      <div className="text-mutedForeground uppercase mb-1">Clinical Impression</div>
                      <p className="font-sans text-xs text-foreground leading-relaxed">
                        {woundResult.clinicalImpression}
                      </p>
                    </div>

                    <div className="p-3 border border-border bg-[#0a0a0a]">
                      <div className="text-mutedForeground uppercase mb-1">Recommended Action</div>
                      <p className="font-sans text-xs text-mutedForeground">
                        {woundResult.actionRequired}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-mutedForeground">
                    <Upload size={32} strokeWidth={1} className="mb-3 text-border" />
                    <p className="text-xs font-mono">
                      Click the button to test Wilson ASEPSIS computer-vision wound classification.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
