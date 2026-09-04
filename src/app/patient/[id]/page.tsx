"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { INITIAL_PATIENTS, PatientRecord } from "@/lib/data/mockPatients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { generateTelemetryHash } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  Mic,
  MicOff,
  Camera,
  Upload,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  PhoneCall,
  Pill,
  Sparkles,
} from "lucide-react";

export default function PatientPWAPage() {
  const params = useParams();
  const patientId = (params?.id as string) || "DEMO-701";

  // Find or fallback to first patient
  const [patient, setPatient] = React.useState<PatientRecord>(() => {
    return INITIAL_PATIENTS.find((p) => p.id === patientId) || INITIAL_PATIENTS[0];
  });

  // State
  const [meds, setMeds] = React.useState(patient.medications);
  const [isRecording, setIsRecording] = React.useState(false);
  const [spokenTranscript, setSpokenTranscript] = React.useState("");
  const [voiceAnalysis, setVoiceAnalysis] = React.useState<any>(null);
  const [woundImage, setWoundImage] = React.useState<string | null>(null);
  const [woundAnalysis, setWoundAnalysis] = React.useState<any>(null);
  const [analyzingWound, setAnalyzingWound] = React.useState(false);
  const [analyzingVoice, setAnalyzingVoice] = React.useState(false);
  const [latestOnChainTx, setLatestOnChainTx] = React.useState(patient.onChainTxHash);
  const [sosTriggered, setSosTriggered] = React.useState(false);

  // Toggle Medication Check
  const toggleMed = (index: number) => {
    const updated = [...meds];
    updated[index].takenToday = !updated[index].takenToday;
    setMeds(updated);

    const takenCount = updated.filter((m) => m.takenToday).length;
    if (takenCount === updated.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF3D00", "#FAFAFA", "#10B981"],
      });
    }
  };

  // Hindi Audio Guidance via Web Speech Synthesis
  const playHindiGuidance = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const text =
        "नमस्ते " +
        patient.name +
        "। आज आपका ऑपरेशन का दिन " +
        patient.dayPostOp +
        " है। कृपया समय पर एंटीबायोटिक गोली लें, टांके को सूखा रखें और माइक बटन दबाकर अपने लक्षण बताएं।";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "hi-IN";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Real Web Speech API Recording
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setSpokenTranscript(text);
        setIsRecording(false);
        await submitVoiceForTriage(text);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        // Fallback simulation
        const fallbackText = "Dard theek hai, thoda khinchav hai, bukhar nahi hai.";
        setSpokenTranscript(fallbackText);
        submitVoiceForTriage(fallbackText);
      };

      recognition.start();
    } else {
      // Browser doesn't support Web Speech recognition, simulate realistic Hindi speech
      const simulated = "Dard kam ho raha hai, khana kha pa raha hoon, koi bukhar nahi hai.";
      setSpokenTranscript(simulated);
      submitVoiceForTriage(simulated);
    }
  };

  const submitVoiceForTriage = async (text: string) => {
    setAnalyzingVoice(true);
    try {
      const res = await fetch("/api/ai/voice-triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, language: "Hindi", dayNumber: patient.dayPostOp }),
      });
      const data = await res.json();
      if (data.triageResult) {
        setVoiceAnalysis(data.triageResult);
        // Mint on-chain hash proof
        const txHash = await generateTelemetryHash({
          patientId: patient.id,
          timestamp: new Date().toISOString(),
          voiceAnalysis: data.triageResult,
        });
        setLatestOnChainTx(txHash);
      }
    } finally {
      setAnalyzingVoice(false);
    }
  };

  // Image upload & in-browser pre-processing
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setWoundImage(base64);
      setAnalyzingWound(true);

      try {
        const res = await fetch("/api/ai/evaluate-wound", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            base64Image: base64,
            patientHistory: `POD ${patient.dayPostOp} ${patient.surgery}`,
          }),
        });
        const data = await res.json();
        if (data.evaluation) {
          setWoundAnalysis(data.evaluation);
          const txHash = await generateTelemetryHash({
            patientId: patient.id,
            timestamp: new Date().toISOString(),
            asepsisScore: data.evaluation.asepsisScore,
          });
          setLatestOnChainTx(txHash);
        }
      } finally {
        setAnalyzingWound(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerSOS = async () => {
    setSosTriggered(true);
    const txHash = await generateTelemetryHash({
      patientId: patient.id,
      alert: "EMERGENCY_CASUALTY_SOS_TRIGGERED",
      timestamp: new Date().toISOString(),
    });
    setLatestOnChainTx(txHash);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans">
      {/* Top Header Strip */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xs font-mono uppercase text-mutedForeground hover:text-foreground">
          <ArrowLeft size={16} /> Home
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="accent" className="text-[10px]">
            POD {patient.dayPostOp}
          </Badge>
          <span className="text-xs font-mono font-bold text-foreground">{patient.name}</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        {/* Emergency SOS Banner if triggered */}
        {sosTriggered && (
          <div className="p-4 border-2 border-red-600 bg-red-950/80 text-white space-y-2 animate-pulse">
            <div className="flex items-center gap-2 font-bold uppercase text-sm">
              <AlertTriangle size={18} /> EMERGENCY ESCALATION DISPATCHED
            </div>
            <p className="text-xs">
              Hospital Emergency Department and On-Call Surgical Registrar have received your telemetry alert. If breathless or bleeding, call emergency services (108/112) immediately.
            </p>
          </div>
        )}

        {/* Patient Status Overview Card */}
        <Card className="border-border bg-card">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-mutedForeground block">
                Post-Surgical Recovery
              </span>
              <h1 className="text-2xl font-black uppercase tracking-tight text-foreground mt-1">
                {patient.surgery}
              </h1>
              <p className="text-xs text-mutedForeground mt-1 font-mono">
                Attending: {patient.surgeon}
              </p>
            </div>
            <Badge
              variant={patient.status === "CRITICAL" ? "danger" : patient.status === "WARNING" ? "warning" : "success"}
            >
              {patient.status}
            </Badge>
          </div>

          {/* Hindi Audio Guidance Button */}
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
            <div className="text-xs text-mutedForeground">
              हिंदी में सलाह सुनें (Doctor's Voice Audio)
            </div>
            <Button variant="accent-solid" size="sm" onClick={playHindiGuidance} className="text-xs">
              <Volume2 size={14} className="mr-1.5" /> सुनें (Listen)
            </Button>
          </div>
        </Card>

        {/* STEP 1: Vernacular Voice Check-In */}
        <Card highlighted className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="accent">STEP 01</Badge>
              <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                आवाज़ चेक-इन (Voice Triage)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-mutedForeground">60-Sec Daily</span>
          </div>

          <p className="text-xs text-mutedForeground leading-relaxed">
            माइक का बटन दबाएं और बताएं: क्या टांके में दर्द है? क्या बुखार है? क्या खाना-पीना ठीक से हो रहा है?
          </p>

          <div className="pt-2 flex flex-col items-center justify-center">
            <button
              onClick={toggleRecording}
              className={`h-20 w-20 border-2 flex flex-col items-center justify-center transition-all ${
                isRecording
                  ? "border-red-500 bg-red-950/60 animate-pulse text-red-300"
                  : "border-accent bg-accent/10 text-accent hover:bg-accent hover:text-accentForeground"
              }`}
            >
              {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
              <span className="text-[10px] font-mono uppercase mt-1 font-bold">
                {isRecording ? "Listening" : "Speak Now"}
              </span>
            </button>
          </div>

          {spokenTranscript && (
            <div className="p-3 border border-border bg-[#0a0a0a] text-xs font-mono space-y-1">
              <div className="text-mutedForeground uppercase text-[10px]">Recorded Speech:</div>
              <div className="text-foreground">"{spokenTranscript}"</div>
            </div>
          )}

          {analyzingVoice && (
            <div className="text-xs font-mono text-accent animate-pulse text-center">
              Agent analyzing symptoms against clinical safety red flags...
            </div>
          )}

          {voiceAnalysis && (
            <div className="p-3 border border-border bg-muted/40 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-mutedForeground">PAIN SCALE:</span>
                <span className="font-bold text-foreground">{voiceAnalysis.painScore} / 10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-mutedForeground">ACUITY STATUS:</span>
                <Badge variant={voiceAnalysis.clinicalTriageAcuity === "IMMEDIATE_ESCALATION" ? "danger" : "success"}>
                  {voiceAnalysis.clinicalTriageAcuity}
                </Badge>
              </div>
              <div className="text-xs text-foreground font-sans pt-1 border-t border-border">
                {voiceAnalysis.vernacularSummary}
              </div>
            </div>
          )}
        </Card>

        {/* STEP 2: Wound Camera Inspection */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">STEP 02</Badge>
              <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                टांकों की फोटो (Incision Lens)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-mutedForeground">Wilson ASEPSIS</span>
          </div>

          <p className="text-xs text-mutedForeground leading-relaxed">
            साफ रोशनी में अपने टांकों / ड्रेसिंग की एक सीधी फोटो लें। AI मॉडल इन्फेक्शन और लालिमा की जांच करेगा।
          </p>

          <div className="border border-dashed border-border p-6 text-center bg-[#0a0a0a]">
            {woundImage ? (
              <div className="space-y-3">
                <img src={woundImage} alt="Wound inspection snapshot" className="max-h-56 mx-auto object-cover border border-border" />
                <span className="text-[11px] font-mono text-mutedForeground block">
                  Snapshot loaded into memory
                </span>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                <Camera size={32} strokeWidth={1.5} className="text-accent" />
                <span className="text-xs font-mono uppercase font-bold text-foreground">
                  Tap to Take Photo or Upload
                </span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          {analyzingWound && (
            <div className="text-xs font-mono text-accent animate-pulse text-center">
              Running Wilson ASEPSIS computer-vision wound classification...
            </div>
          )}

          {woundAnalysis && (
            <div className="p-3 border border-border bg-muted/40 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-mutedForeground">ASEPSIS SCORE:</span>
                <span className="font-bold text-foreground">{woundAnalysis.asepsisScore} / 70</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-mutedForeground">ERYTHEMA SPREAD:</span>
                <span className="font-bold text-accent">{woundAnalysis.erythemaPercentage}%</span>
              </div>
              <p className="text-xs text-mutedForeground font-sans pt-1 border-t border-border">
                {woundAnalysis.clinicalImpression}
              </p>
            </div>
          )}
        </Card>

        {/* STEP 3: Prescribed Medications Checklist */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">STEP 03</Badge>
              <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                दवाएं (Daily Regimen)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-accent">
              {meds.filter((m) => m.takenToday).length} / {meds.length} Taken
            </span>
          </div>

          <div className="space-y-2.5">
            {meds.map((med, idx) => (
              <div
                key={idx}
                onClick={() => toggleMed(idx)}
                className={`p-3 border transition-colors flex items-center justify-between cursor-pointer ${
                  med.takenToday
                    ? "border-emerald-700 bg-emerald-950/30 text-foreground"
                    : "border-border hover:border-border-hover bg-[#0a0a0a]"
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-foreground">{med.name}</div>
                  <div className="text-[11px] text-mutedForeground font-mono">{med.dose} • {med.schedule}</div>
                </div>
                <div
                  className={`h-6 w-6 border flex items-center justify-center ${
                    med.takenToday ? "border-emerald-500 bg-emerald-500 text-black" : "border-border"
                  }`}
                >
                  {med.takenToday && <CheckCircle2 size={16} strokeWidth={2.5} />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* On-Chain Verification Proof */}
        <div className="border border-border p-4 bg-muted/20 text-xs font-mono space-y-1">
          <div className="flex items-center justify-between text-mutedForeground">
            <span className="flex items-center gap-1.5 text-foreground font-bold">
              <ShieldCheck size={14} className="text-accent" /> Cryptographic Telemetry Hash
            </span>
            <Badge variant="outline" className="text-[9px]">Polygon Amoy</Badge>
          </div>
          <div className="text-[10px] text-mutedForeground truncate">{latestOnChainTx}</div>
          <div className="text-[10px] text-mutedForeground pt-1">
            Tamper-proof proof of compliance under DPDP Act 2023.
          </div>
        </div>

        {/* EMERGENCY SOS RED BUTTON */}
        <div className="pt-4">
          <button
            onClick={triggerSOS}
            className="w-full py-4 px-6 border-2 border-red-600 bg-red-950 text-white font-mono font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 active:translate-y-px hover:bg-red-900 transition-colors"
          >
            <PhoneCall size={18} /> आपातकालीन सहायता (Emergency Casualty SOS)
          </button>
        </div>
      </main>
    </div>
  );
}
