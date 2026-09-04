import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, getAIConfig } from "@/lib/ai/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { baseURL, apiKey, model } = body;

    const config = getAIConfig({ baseURL, apiKey, model });
    const client = getOpenAIClient(config);

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error: "API Key is required to test live connection. Fallback engine is currently active.",
          config,
        },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    const response = await client.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "user",
          content: "Respond with exactly 5 words confirming Nivaran clinical telemetry connection.",
        },
      ],
      max_tokens: 20,
    });
    const latency = Date.now() - startTime;

    const reply = response.choices[0]?.message?.content || "Connection verified successfully.";

    return NextResponse.json({
      success: true,
      latencyMs: latency,
      reply,
      modelUsed: response.model || config.model,
      provider: config.baseURL.includes("groq")
        ? "Groq LPU Inference"
        : config.baseURL.includes("google")
        ? "Google Gemini OpenAI Gateway"
        : config.baseURL.includes("localhost")
        ? "Local Ollama Instance"
        : "OpenAI-Compatible Provider",
    });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to reach specified model endpoint.",
      },
      { status: 500 }
    );
  }
}
