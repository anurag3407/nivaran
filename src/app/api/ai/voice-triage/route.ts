import { NextRequest, NextResponse } from "next/server";
import { runVoiceTriage } from "@/lib/ai/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, language, dayNumber, customConfig } = body;

    if (!transcript) {
      return NextResponse.json(
        { error: "transcript is required" },
        { status: 400 }
      );
    }

    const triageResult = await runVoiceTriage(
      transcript,
      language || "Hindi/English",
      dayNumber || 3,
      customConfig
    );
    return NextResponse.json({ success: true, triageResult });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to process voice triage" },
      { status: 500 }
    );
  }
}
