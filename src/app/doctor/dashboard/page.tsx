"use client";

import * as React from "react";
import Link from "next/link";
import { INITIAL_PATIENTS, PatientRecord } from "@/lib/data/mockPatients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Stethoscope,
  Search,
  Filter,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Phone,
  MessageSquare,
  ArrowLeft,
  Plus,
  Layers,
  Activity,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function DoctorDashboardPage() {
  const [patients, setPatients] = React.useState<PatientRecord[]>(INITIAL_PATIENTS);
  const [search, setSearch] = React.useState("");
  const [wardFilter, setWardFilter] = React.useState<string>("All");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");
  const [activePatient, setActivePatient] = React.useState<PatientRecord | null>(INITIAL_PATIENTS[1]); // Default Mohammed Farooq
  const [isDischargeModalOpen, setIsDischargeModalOpen] = React.useState(false);

  // New Patient Form State
  const [newPatient, setNewPatient] = React.useState({
    name: "",
    age: "",
    gender: "M",
    phone: "",
    ward: "General Surgery",
    surgery: "",
    surgeon: "Dr. Anupam Sachdev",
  });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.uhid.toLowerCase().includes(search.toLowerCase()) ||
      p.surgery.toLowerCase().includes(search.toLowerCase());
    const matchesWard = wardFilter === "All" || p.ward === wardFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesWard && matchesStatus;
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.surgery) return;

    const created: PatientRecord = {
      id: `DEMO-${Math.floor(100 + Math.random() * 900)}`,
      uhid: `NVR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newPatient.name,
      age: Number(newPatient.age) || 45,
      gender: newPatient.gender as "M" | "F",
      phone: newPatient.phone || "+91 98111 00000",
      ward: newPatient.ward as any,
      surgery: newPatient.surgery,
      surgeryDate: new Date().toISOString().split("T")[0],
      dischargeDate: new Date().toISOString().split("T")[0],
      dayPostOp: 1,
      surgeon: newPatient.surgeon,
      status: "STABLE",
      riskVelocity: 0.1,
      asepsisScore: 10,
      painScore: 3,
      fever: false,
      medicationAdherencePct: 100,
      lastCheckinTime: "Just now",
      onChainTxHash: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      sbar: {
        situation: `Patient ${newPatient.name} enrolled in post-discharge telemetry following ${newPatient.surgery}.`,
        background: `Baseline post-operative day 1 telemetry initialized. Discharged in stable condition.`,
        assessment: "Normal physiologic baseline. Incision site clean and dry.",
        recommendation: "Maintain routine daily voice check-in and camera surveillance.",
      },
      medications: [
        { name: "Tab Cefuroxime Axetil 500mg", dose: "1 tab BD", schedule: "09:00 AM & 09:00 PM", takenToday: true },
        { name: "Tab Paracetamol 650mg", dose: "1 tab TDS", schedule: "After meals", takenToday: true },
      ],
      checkinHistory: [],
    };

    setPatients([created, ...patients]);
    setActivePatient(created);
    setIsDischargeModalOpen(false);
  };

  const criticalCount = patients.filter((p) => p.status === "CRITICAL").length;
  const warningCount = patients.filter((p) => p.status === "WARNING").length;
  const stableCount = patients.filter((p) => p.status === "STABLE").length;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono uppercase text-mutedForeground hover:text-foreground">
            <ArrowLeft size={16} /> Exit
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <Stethoscope size={18} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-tight text-foreground">
              ENTERPRISE SURGICAL COMMAND CENTER
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="accent-solid" size="sm" onClick={() => setIsDischargeModalOpen(true)} className="text-xs">
            <Plus size={14} className="mr-1.5" /> Discharge New Patient
          </Button>
          <Link href="/audit-trail">
            <Button variant="outline" size="sm" className="text-xs">
              <ShieldCheck size={14} className="mr-1.5" /> Audit Ledger
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-border p-4 bg-card flex justify-between items-center">
            <div>
              <span className="text-xs font-mono uppercase text-mutedForeground">Active Telemetry</span>
              <div className="text-2xl font-mono font-bold text-foreground mt-1">{patients.length} Patients</div>
            </div>
            <Activity size={24} className="text-mutedForeground" />
          </div>

          <div className="border border-red-900/60 p-4 bg-red-950/20 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono uppercase text-red-400">Critical Red Flags</span>
              <div className="text-2xl font-mono font-bold text-red-400 mt-1">{criticalCount} Urgent</div>
            </div>
            <AlertCircle size={24} className="text-red-500" />
          </div>

          <div className="border border-amber-900/60 p-4 bg-amber-950/20 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400">Watchlist Alerts</span>
              <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{warningCount} Pending</div>
            </div>
            <AlertTriangle size={24} className="text-amber-500" />
          </div>

          <div className="border border-emerald-900/60 p-4 bg-emerald-950/20 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400">Stable Convalescence</span>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{stableCount} Normal</div>
            </div>
            <CheckCircle size={24} className="text-emerald-500" />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border pb-6">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedForeground" />
            <input
              type="text"
              placeholder="Search UHID, Patient, Surgery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 bg-input pl-10 pr-4 text-xs font-mono border border-border focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-mutedForeground uppercase mr-2">Ward:</span>
            {["All", "General Surgery", "Orthopedics", "CTVS", "OB-GYN"].map((w) => (
              <button
                key={w}
                onClick={() => setWardFilter(w)}
                className={`px-3 py-1.5 text-xs font-mono uppercase border transition-colors ${
                  wardFilter === w ? "border-accent bg-accent text-accentForeground font-bold" : "border-border text-mutedForeground hover:text-foreground"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Patient Queue (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono uppercase text-mutedForeground flex justify-between pb-2 border-b border-border">
              <span>Patient Roster ({filteredPatients.length})</span>
              <span>Sorted by Deterioration Velocity</span>
            </div>

            {filteredPatients.map((p) => {
              const isSelected = activePatient?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setActivePatient(p)}
                  className={`p-4 border transition-all cursor-pointer ${
                    isSelected ? "border-accent bg-muted/60" : "border-border hover:border-border-hover bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">{p.name}</span>
                        <span className="text-xs font-mono text-mutedForeground">({p.age}{p.gender})</span>
                      </div>
                      <div className="text-xs text-mutedForeground mt-0.5 font-mono">
                        {p.surgery} • POD {p.dayPostOp}
                      </div>
                      <div className="text-[11px] text-mutedForeground font-mono">
                        UHID: {p.uhid} • {p.ward}
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

                  <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-border/60 text-[11px] font-mono text-mutedForeground">
                    <div>
                      VELOCITY: <span className="text-foreground font-bold">{p.riskVelocity > 0 ? `+${p.riskVelocity}` : p.riskVelocity}/d</span>
                    </div>
                    <div>
                      PAIN: <span className="text-foreground font-bold">{p.painScore}/10</span>
                    </div>
                    <div>
                      ASEPSIS: <span className="text-foreground font-bold">{p.asepsisScore}</span>
                    </div>
                    <div>
                      FEVER: <span className={`font-bold ${p.fever ? "text-red-400" : "text-emerald-400"}`}>{p.fever ? "YES" : "NO"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SBAR Clinical Workspace (6 cols) */}
          <div className="lg:col-span-6 sticky top-24">
            {activePatient ? (
              <Card highlighted={activePatient.status === "CRITICAL"} className="border-border space-y-6">
                <div className="flex items-start justify-between pb-4 border-b border-border">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                      Clinical SBAR Telemetry Brief
                    </span>
                    <h2 className="text-xl font-black uppercase text-foreground mt-1">
                      {activePatient.name}
                    </h2>
                    <div className="text-xs font-mono text-mutedForeground mt-0.5">
                      {activePatient.surgery} • POD {activePatient.dayPostOp} • {activePatient.uhid}
                    </div>
                  </div>

                  <Link href={`/patient/${activePatient.id}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Patient View <ExternalLink size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>

                {/* SBAR Sections */}
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 border border-border bg-[#0a0a0a]">
                    <div className="text-accent font-bold mb-1">[S] SITUATION</div>
                    <p className="font-sans text-xs text-foreground leading-relaxed">
                      {activePatient.sbar.situation}
                    </p>
                  </div>

                  <div className="p-3 border border-border bg-[#0a0a0a]">
                    <div className="text-mutedForeground font-bold mb-1">[B] BACKGROUND</div>
                    <p className="font-sans text-xs text-foreground leading-relaxed">
                      {activePatient.sbar.background}
                    </p>
                  </div>

                  <div className="p-3 border border-border bg-[#0a0a0a]">
                    <div className="text-amber-400 font-bold mb-1">[A] ASSESSMENT</div>
                    <p className="font-sans text-xs text-foreground leading-relaxed">
                      {activePatient.sbar.assessment}
                    </p>
                  </div>

                  <div className="p-3 border border-border bg-[#0a0a0a]">
                    <div className="text-emerald-400 font-bold mb-1">[R] RECOMMENDATION</div>
                    <p className="font-sans text-xs text-foreground leading-relaxed">
                      {activePatient.sbar.recommendation}
                    </p>
                  </div>
                </div>

                {/* Patient Contact & Escalation Actions */}
                <div className="pt-4 border-t border-border flex items-center gap-3">
                  <a
                    href={`tel:${activePatient.phone}`}
                    className="flex-1 text-center py-3 px-4 text-xs font-mono uppercase tracking-wider border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={14} /> Call Patient ({activePatient.phone})
                  </a>
                  <a
                    href={`https://wa.me/${activePatient.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                      activePatient.name
                    )},%20this%20is%20your%20Surgical%20Care%20Team%20at%20Nivaran%20regarding%20your%20post-discharge%20recovery.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-3 px-4 text-xs font-mono uppercase tracking-wider bg-accent text-accentForeground font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={14} /> Tele-Escalate via WhatsApp
                  </a>
                </div>

                {/* Cryptographic Ledger Link */}
                <div className="text-[10px] font-mono text-mutedForeground pt-2 flex items-center justify-between border-t border-border">
                  <span className="truncate max-w-xs">TX: {activePatient.onChainTxHash}</span>
                  <Badge variant="outline" className="text-[9px]">Polygon Amoy</Badge>
                </div>
              </Card>
            ) : (
              <div className="border border-border p-12 text-center text-mutedForeground text-xs font-mono">
                Select a patient from the queue to view real-time SBAR triage telemetry.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Discharge New Patient Modal */}
      {isDischargeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-border bg-card w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-sm font-bold uppercase tracking-tight text-foreground">
                Enroll Patient Into Telemetry Queue
              </span>
              <button
                onClick={() => setIsDischargeModalOpen(false)}
                className="text-xs font-mono text-mutedForeground hover:text-foreground"
              >
                ✕ CLOSE
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-mutedForeground uppercase block mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Verma"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full h-11 bg-input px-3 border border-border focus:border-accent focus:outline-none text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-mutedForeground uppercase block mb-1">Age &amp; Gender</label>
                  <input
                    type="text"
                    placeholder="e.g. 52"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="w-full h-11 bg-input px-3 border border-border focus:border-accent focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="text-mutedForeground uppercase block mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98..."
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full h-11 bg-input px-3 border border-border focus:border-accent focus:outline-none text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-mutedForeground uppercase block mb-1">Surgical Procedure</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laparoscopic Appendectomy / Hemicolectomy"
                  value={newPatient.surgery}
                  onChange={(e) => setNewPatient({ ...newPatient, surgery: e.target.value })}
                  className="w-full h-11 bg-input px-3 border border-border focus:border-accent focus:outline-none text-foreground"
                />
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDischargeModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="accent-solid" size="sm">
                  Initialize Telemetry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
