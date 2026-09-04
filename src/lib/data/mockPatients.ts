export interface PatientRecord {
  id: string;
  uhid: string;
  name: string;
  age: number;
  gender: "M" | "F" | "Other";
  phone: string;
  ward: "General Surgery" | "Orthopedics" | "CTVS" | "OB-GYN" | "Gastroenterology";
  surgery: string;
  surgeryDate: string;
  dischargeDate: string;
  dayPostOp: number;
  surgeon: string;
  status: "STABLE" | "WARNING" | "CRITICAL";
  riskVelocity: number; // rate of change in deterioration
  asepsisScore: number;
  painScore: number;
  fever: boolean;
  medicationAdherencePct: number;
  lastCheckinTime: string;
  onChainTxHash: string;
  sbar: {
    situation: string;
    background: string;
    assessment: string;
    recommendation: string;
  };
  medications: {
    name: string;
    dose: string;
    schedule: string;
    takenToday: boolean;
  }[];
  checkinHistory: {
    day: number;
    date: string;
    pain: number;
    fever: boolean;
    asepsis: number;
    transcript: string;
    onChainHash: string;
  }[];
}

export const INITIAL_PATIENTS: PatientRecord[] = [
  {
    id: "DEMO-701",
    uhid: "NVR-2026-8921",
    name: "Rajesh Kumar",
    age: 48,
    gender: "M",
    phone: "+91 98112 34567",
    ward: "General Surgery",
    surgery: "Laparoscopic Cholecystectomy",
    surgeryDate: "2026-09-01",
    dischargeDate: "2026-09-02",
    dayPostOp: 3,
    surgeon: "Dr. Anupam Sachdev (Prof. Surgery)",
    status: "STABLE",
    riskVelocity: 0.3,
    asepsisScore: 12,
    painScore: 3,
    fever: false,
    medicationAdherencePct: 100,
    lastCheckinTime: "2026-09-04 09:15 AM",
    onChainTxHash: "0x7f9a2b8e4c1d6a3f9e8d7c6b5a4e3f2d1c0b9a8e7d6c5b4a3f2e1d0c9b8a7f6e",
    sbar: {
      situation: "Patient reports minimal umbilical pain (3/10) with complete oral tolerance.",
      background: "Elective 4-port laparoscopic cholecystectomy for gallstone pancreatitis.",
      assessment: "Uncomplicated normal convalescence. Port sites dry, no signs of biliary leak.",
      recommendation: "Continue oral antibiotics for 2 more days. Suture removal scheduled Day 7.",
    },
    medications: [
      { name: "Tab Cefuroxime Axetil 500mg", dose: "1 tab BD", schedule: "09:00 AM & 09:00 PM", takenToday: true },
      { name: "Tab Pantoprazole 40mg", dose: "1 tab OD", schedule: "07:30 AM (Empty Stomach)", takenToday: true },
      { name: "Tab Tramadol + Paracetamol", dose: "1 tab SOS", schedule: "As needed for pain > 4", takenToday: false },
    ],
    checkinHistory: [
      { day: 1, date: "2026-09-02", pain: 6, fever: false, asepsis: 18, transcript: "Mild nausea and soreness at navel.", onChainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b" },
      { day: 2, date: "2026-09-03", pain: 4, fever: false, asepsis: 14, transcript: "Walked in the park, pain is much less.", onChainHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c" },
      { day: 3, date: "2026-09-04", pain: 3, fever: false, asepsis: 12, transcript: "Sab theek hai, khana kha pa raha hoon.", onChainHash: "0x7f9a2b8e4c1d6a3f9e8d7c6b5a4e3f2d1c0b9a8e7d6c5b4a3f2e1d0c9b8a7f6e" },
    ],
  },
  {
    id: "DEMO-702",
    uhid: "NVR-2026-4412",
    name: "Mohammed Farooq",
    age: 62,
    gender: "M",
    phone: "+91 98765 43210",
    ward: "CTVS",
    surgery: "Coronary Artery Bypass Graft (CABG x3)",
    surgeryDate: "2026-08-31",
    dischargeDate: "2026-09-03",
    dayPostOp: 4,
    surgeon: "Dr. Shivani Koul (CTVS Unit Head)",
    status: "CRITICAL",
    riskVelocity: 4.8,
    asepsisScore: 38,
    painScore: 8,
    fever: true,
    medicationAdherencePct: 66,
    lastCheckinTime: "2026-09-04 11:42 AM",
    onChainTxHash: "0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    sbar: {
      situation: "CRITICAL ALERT: Patient reports high fever (101.8°F), sternal clicking sensation, and purulent exudate.",
      background: "Day 4 post-CABG triple bypass; patient has known history of Type 2 Diabetes (HbA1c 8.4%).",
      assessment: "High risk of deep sternal wound infection (mediastinitis) and early sternal dehiscence.",
      recommendation: "STAT casualty return. Immediate cardiothoracic surgical reassessment, wound culture swab, and urgent blood culture.",
    },
    medications: [
      { name: "Tab Aspirin 75mg + Atorvastatin 20mg", dose: "1 tab OD", schedule: "08:00 PM", takenToday: true },
      { name: "Tab Metoprolol Succinate 25mg", dose: "1 tab OD", schedule: "09:00 AM", takenToday: true },
      { name: "Tab Linezolid 600mg", dose: "1 tab BD", schedule: "09:00 AM & 09:00 PM", takenToday: false },
    ],
    checkinHistory: [
      { day: 2, date: "2026-09-02", pain: 5, fever: false, asepsis: 16, transcript: "Chest feels heavy, using incentive spirometer.", onChainHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d" },
      { day: 3, date: "2026-09-03", pain: 6, fever: false, asepsis: 22, transcript: "Thoda dard badh gaya hai seene ke beech mein.", onChainHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e" },
      { day: 4, date: "2026-09-04", pain: 8, fever: true, asepsis: 38, transcript: "Seene mein bahut tezz dard hai aur dressing pe peela paani aa gaya hai, bukhar 101.8 hai.", onChainHash: "0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b" },
    ],
  },
  {
    id: "DEMO-703",
    uhid: "NVR-2026-3199",
    name: "Sunita Devi",
    age: 54,
    gender: "F",
    phone: "+91 97110 99887",
    ward: "Orthopedics",
    surgery: "Open Reduction Internal Fixation (Right Femur)",
    surgeryDate: "2026-08-30",
    dischargeDate: "2026-09-02",
    dayPostOp: 5,
    surgeon: "Dr. R. K. Meena (Assoc. Prof. Ortho)",
    status: "WARNING",
    riskVelocity: 2.1,
    asepsisScore: 24,
    painScore: 6,
    fever: false,
    medicationAdherencePct: 80,
    lastCheckinTime: "2026-09-04 08:30 AM",
    onChainTxHash: "0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b",
    sbar: {
      situation: "Patient reports spreading erythema (approx 1.8cm margin) around distal staple line.",
      background: "Femoral shaft fracture fixation with intramedullary interlocking nail.",
      assessment: "Superficial surgical site disturbance of healing with localized reactive inflammation.",
      recommendation: "Direct video consult within 6 hours. Consider stepping up oral Augmentin coverage and limb elevation.",
    },
    medications: [
      { name: "Tab Amoxicillin-Clavulanate 625mg", dose: "1 tab BD", schedule: "08:00 AM & 08:00 PM", takenToday: true },
      { name: "Tab Etoricoxib 90mg", dose: "1 tab OD", schedule: "After lunch", takenToday: false },
      { name: "Cap Calcium + Vitamin D3", dose: "1 cap OD", schedule: "Bedtime", takenToday: true },
    ],
    checkinHistory: [
      { day: 3, date: "2026-09-02", pain: 4, fever: false, asepsis: 15, transcript: "Walker ke sath chalne ki koshish ki.", onChainHash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f" },
      { day: 4, date: "2026-09-03", pain: 5, fever: false, asepsis: 19, transcript: "Pairo mein halki sujan aur laal-pan dikh raha hai.", onChainHash: "0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a" },
      { day: 5, date: "2026-09-04", pain: 6, fever: false, asepsis: 24, transcript: "Dard pehle se zyada hai aur taanke ke paas laal daayra badh gaya hai.", onChainHash: "0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b" },
    ],
  },
  {
    id: "DEMO-704",
    uhid: "NVR-2026-5561",
    name: "Ananya Sharma",
    age: 29,
    gender: "F",
    phone: "+91 99990 12345",
    ward: "OB-GYN",
    surgery: "Emergency Lower Segment Cesarean Section (LSCS)",
    surgeryDate: "2026-09-02",
    dischargeDate: "2026-09-03",
    dayPostOp: 2,
    surgeon: "Dr. Pratima Sen (Consultant OB-GYN)",
    status: "STABLE",
    riskVelocity: 0.1,
    asepsisScore: 8,
    painScore: 2,
    fever: false,
    medicationAdherencePct: 100,
    lastCheckinTime: "2026-09-04 10:05 AM",
    onChainTxHash: "0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b",
    sbar: {
      situation: "Mother and baby doing well post-LSCS. Transverse Pfannenstiel incision clean and dry.",
      background: "Emergency LSCS for fetal distress at 39 weeks. Discharged POD 1 with healthy male infant.",
      assessment: "Normal physiologic recovery. Lochia within normal limits. Lactation well established.",
      recommendation: "Routine outpatient stitch removal at 8 days. Continue iron & calcium supplementation.",
    },
    medications: [
      { name: "Tab Iron & Folic Acid", dose: "1 tab OD", schedule: "After dinner", takenToday: true },
      { name: "Tab Calcium Carbonate 500mg", dose: "1 tab BD", schedule: "Morning & Night", takenToday: true },
      { name: "Tab Paracetamol 650mg", dose: "1 tab SOS", schedule: "As needed for pain", takenToday: false },
    ],
    checkinHistory: [
      { day: 1, date: "2026-09-03", pain: 4, fever: false, asepsis: 10, transcript: "Bacche ko doodh pila pa rahi hoon, taanka theek hai.", onChainHash: "0x4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c" },
      { day: 2, date: "2026-09-04", pain: 2, fever: false, asepsis: 8, transcript: "Sab theek chal raha hai, koi dikkat nahi hai.", onChainHash: "0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b" },
    ],
  },
];
