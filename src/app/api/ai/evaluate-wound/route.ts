import { NextRequest, NextResponse } from "next/server";
import { evaluateWoundImage } from "@/lib/ai/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64Image, patientHistory, customConfig } = body;

    if (!base64Image) {
      return NextResponse.json(
        { error: "base64Image is required" },
        { status: 400 }
      );
    }

    const evaluation = await evaluateWoundImage(base64Image, patientHistory, customConfig);
    return NextResponse.json({ success: true, evaluation });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to evaluate surgical wound image" },
      { status: 500 }
    );
  }
}
