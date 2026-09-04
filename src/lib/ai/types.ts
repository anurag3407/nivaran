export interface AIConfig {
  baseURL: string;
  apiKey: string;
  model: string;
}

export interface CarePlanMedication {
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  purposeHindi: string;
}

export interface CarePlan {
  patientName: string;
  diagnosis: string;
  surgeryProcedure: string;
  dischargeDate: string;
  medications: CarePlanMedication[];
  redFlags: string[];
  vernacularSummaryHindi: string;
  dietaryRestrictions: string[];
  nextFollowUpDate: string;
}

export interface WoundEvaluation {
  asepsisScore: number; // 0 to 70
  erythemaPercentage: number; // e.g. 15%
  serousExudate: boolean;
  purulentExudate: boolean;
  dehiscenceDetected: boolean;
  riskTier: "LOW" | "MODERATE" | "CRITICAL";
  clinicalImpression: string;
  actionRequired: string;
  confidenceScore: number;
}

export interface VoiceTriageResult {
  transcript: string;
  languageDetected: string;
  painScore: number; // 1-10
  feverPresent: boolean;
  shortnessOfBreath: boolean;
  woundDrainagePresent: boolean;
  medicationAdherence: "FULL" | "PARTIAL" | "MISSED";
  redFlagsCount: number;
  clinicalTriageAcuity: "STABLE" | "WATCHLIST" | "IMMEDIATE_ESCALATION";
  vernacularSummary: string;
}

export interface SBARReport {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  priority: "ROUTINE" | "URGENT" | "CRITICAL";
  deteriorationVelocity: number; // e.g. +2.4/day
  timestamp: string;
}
