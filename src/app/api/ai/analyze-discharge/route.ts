import { NextRequest, NextResponse } from "next/server";
import { analyzeDischargeSummary } from "@/lib/ai/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawText, customConfig } = body;

    if (!rawText || typeof rawText !== "string") {
      return NextResponse.json(
        { error: "rawText string is required" },
        { status: 400 }
      );
    }

    const carePlan = await analyzeDischargeSummary(rawText, customConfig);
    return NextResponse.json({ success: true, carePlan });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to analyze discharge summary" },
      { status: 500 }
    );
  }
}
