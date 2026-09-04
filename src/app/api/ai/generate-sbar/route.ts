import { NextRequest, NextResponse } from "next/server";
import { generateSBARReport } from "@/lib/ai/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientData, clinicalData, customConfig } = body;

    if (!patientData || !clinicalData) {
      return NextResponse.json(
        { error: "patientData and clinicalData are required" },
        { status: 400 }
      );
    }

    const sbar = await generateSBARReport(patientData, clinicalData, customConfig);
    return NextResponse.json({ success: true, sbar });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to generate clinical SBAR alert" },
      { status: 500 }
    );
  }
}
