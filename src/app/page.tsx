import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/section-01-hero";
import { ProblemSection } from "@/components/landing/section-02-problem";
import { TelemetryFailureSection } from "@/components/landing/section-03-telemetry-failure";
import { InteractiveDemoSection } from "@/components/landing/section-04-interactive-demo";
import { AgentLoopSection } from "@/components/landing/section-05-agent-loop";
import { AsepsisProtocolSection } from "@/components/landing/section-06-asepsis-protocol";
import { LiveTriageBoardSection } from "@/components/landing/section-07-live-triage-board";
import { BlockchainAuditSection } from "@/components/landing/section-08-blockchain-audit";
import { UnitEconomicsSection } from "@/components/landing/section-09-unit-economics";
import { FeasibilityRoadmapSection } from "@/components/landing/section-10-feasibility-roadmap";
import { EnterprisePlatformMatrixSection } from "@/components/landing/section-11-enterprise-matrix";
import { FooterSection } from "@/components/landing/section-12-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <TelemetryFailureSection />
      <InteractiveDemoSection />
      <AgentLoopSection />
      <AsepsisProtocolSection />
      <LiveTriageBoardSection />
      <BlockchainAuditSection />
      <UnitEconomicsSection />
      <FeasibilityRoadmapSection />
      <EnterprisePlatformMatrixSection />
      <FooterSection />
    </main>
  );
}
