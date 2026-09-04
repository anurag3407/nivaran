"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Sliders, ArrowLeft, CheckCircle2, AlertTriangle, Zap, Server, Key, Cpu } from "lucide-react";

export default function SettingsPage() {
  const [baseURL, setBaseURL] = React.useState("https://api.openai.com/v1");
  const [apiKey, setApiKey] = React.useState("");
  const [model, setModel] = React.useState("gpt-4o-mini");
  const [testing, setTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState<any>(null);
  const [saved, setSaved] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBaseURL = localStorage.getItem("NIVARAN_AI_BASE_URL");
      const savedApiKey = localStorage.getItem("NIVARAN_AI_API_KEY");
      const savedModel = localStorage.getItem("NIVARAN_AI_MODEL");
      if (savedBaseURL) setBaseURL(savedBaseURL);
      if (savedApiKey) setApiKey(savedApiKey);
      if (savedModel) setModel(savedModel);
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("NIVARAN_AI_BASE_URL", baseURL);
      localStorage.setItem("NIVARAN_AI_API_KEY", apiKey);
      localStorage.setItem("NIVARAN_AI_MODEL", model);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/ai/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseURL, apiKey, model }),
      });
      const data = await res.json();
      setTestResult(data);
    } catch (err: any) {
      setTestResult({ success: false, error: err.message || "Network error" });
    } finally {
      setTesting(false);
    }
  };

  const presetGroq = () => {
    setBaseURL("https://api.groq.com/openai/v1");
    setModel("llama-3.3-70b-versatile");
  };

  const presetGemini = () => {
    setBaseURL("https://generativelanguage.googleapis.com/v1beta/openai/");
    setModel("gemini-1.5-flash");
  };

  const presetOllama = () => {
    setBaseURL("http://localhost:11434/v1");
    setModel("llama3.2");
  };

  const presetOpenAI = () => {
    setBaseURL("https://api.openai.com/v1");
    setModel("gpt-4o-mini");
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs font-mono uppercase text-mutedForeground hover:text-foreground">
            <ArrowLeft size={16} /> Home
          </Link>
          <div className="h-4 w-[1px] bg-border" />
          <div className="flex items-center gap-2">
            <Sliders size={18} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-tight text-foreground">
              UNIVERSAL AI MODEL CONFIGURATION
            </span>
          </div>
        </div>

        <Badge variant="accent" className="text-xs">
          OPENAI-COMPATIBLE ROUTING
        </Badge>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-10 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
            PLUG IN <span className="text-accent">ANY</span> MODEL.
          </h1>
          <p className="mt-3 text-sm text-mutedForeground font-light leading-relaxed">
            Configure any OpenAI-compatible serverless inference endpoint (Groq, Gemini, DeepSeek, Local Ollama, or OpenAI). If left blank, Nivaran runs on its built-in clinical fallback engine.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase text-mutedForeground mr-2">Quick Presets:</span>
          <button
            onClick={presetGroq}
            className="px-3 py-1.5 text-xs font-mono uppercase border border-border hover:border-accent text-foreground transition-colors"
          >
            Groq LPU (Ultra-Fast)
          </button>
          <button
            onClick={presetGemini}
            className="px-3 py-1.5 text-xs font-mono uppercase border border-border hover:border-accent text-foreground transition-colors"
          >
            Google Gemini (Free Tier)
          </button>
          <button
            onClick={presetOllama}
            className="px-3 py-1.5 text-xs font-mono uppercase border border-border hover:border-accent text-foreground transition-colors"
          >
            Local Ollama (Offline)
          </button>
          <button
            onClick={presetOpenAI}
            className="px-3 py-1.5 text-xs font-mono uppercase border border-border hover:border-accent text-foreground transition-colors"
          >
            OpenAI (GPT-4o mini)
          </button>
        </div>

        {/* Configuration Card */}
        <Card className="border-border space-y-6">
          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-mutedForeground uppercase block mb-1.5 flex items-center gap-2">
                <Server size={14} className="text-accent" /> Base URL (OpenAI-Compatible Endpoint)
              </label>
              <input
                type="text"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
                placeholder="https://api.openai.com/v1"
                className="w-full h-12 bg-input px-4 border border-border focus:border-accent focus:outline-none text-foreground font-mono text-xs"
              />
              <span className="text-[11px] text-mutedForeground mt-1 block">
                Examples: https://api.groq.com/openai/v1 | https://generativelanguage.googleapis.com/v1beta/openai/ | http://localhost:11434/v1
              </span>
            </div>

            <div>
              <label className="text-mutedForeground uppercase block mb-1.5 flex items-center gap-2">
                <Key size={14} className="text-accent" /> API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_... or sk-proj-... or AIzaSy..."
                className="w-full h-12 bg-input px-4 border border-border focus:border-accent focus:outline-none text-foreground font-mono text-xs"
              />
              <span className="text-[11px] text-mutedForeground mt-1 block">
                Never shared. Stored securely in your local browser session storage.
              </span>
            </div>

            <div>
              <label className="text-mutedForeground uppercase block mb-1.5 flex items-center gap-2">
                <Cpu size={14} className="text-accent" /> Model Name
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="llama-3.3-70b-versatile or gpt-4o-mini or gemini-1.5-flash"
                className="w-full h-12 bg-input px-4 border border-border focus:border-accent focus:outline-none text-foreground font-mono text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="accent-solid"
                size="default"
                onClick={testConnection}
                disabled={testing}
                className="text-xs"
              >
                <Zap size={14} className="mr-1.5" />
                {testing ? "Pinging Endpoint..." : "Test Endpoint Connection"}
              </Button>

              <Button variant="outline" size="default" onClick={handleSave} className="text-xs">
                Save Configuration
              </Button>
            </div>

            {saved && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} /> Configuration saved to browser storage!
              </span>
            )}
          </div>

          {/* Test Results Output */}
          {testResult && (
            <div
              className={`p-4 border text-xs font-mono space-y-2 ${
                testResult.success
                  ? "border-emerald-700 bg-emerald-950/20 text-emerald-300"
                  : "border-red-700 bg-red-950/20 text-red-300"
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>{testResult.success ? "CONNECTION SUCCESSFUL" : "CONNECTION FAILED"}</span>
                {testResult.latencyMs && <span>LATENCY: {testResult.latencyMs} ms</span>}
              </div>

              {testResult.success ? (
                <div className="space-y-1 pt-1 text-foreground">
                  <div>PROVIDER: {testResult.provider}</div>
                  <div>MODEL: {testResult.modelUsed}</div>
                  <div className="text-mutedForeground pt-1">
                    RESPONSE: "{testResult.reply}"
                  </div>
                </div>
              ) : (
                <div className="pt-1 text-red-400">
                  {testResult.error}
                </div>
              )}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
