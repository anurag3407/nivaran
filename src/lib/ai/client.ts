import OpenAI from "openai";
import { AIConfig } from "./types";

const DEFAULT_BASE_URL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
const DEFAULT_API_KEY = process.env.AI_API_KEY || "";
const DEFAULT_MODEL = process.env.AI_MODEL_NAME || "gpt-4o-mini";

export function getAIConfig(customConfig?: Partial<AIConfig>): AIConfig {
  return {
    baseURL: customConfig?.baseURL?.trim() || DEFAULT_BASE_URL,
    apiKey: customConfig?.apiKey?.trim() || DEFAULT_API_KEY,
    model: customConfig?.model?.trim() || DEFAULT_MODEL,
  };
}

export function getOpenAIClient(customConfig?: Partial<AIConfig>): OpenAI | null {
  const config = getAIConfig(customConfig);
  if (!config.apiKey) {
    return null;
  }
  return new OpenAI({
    baseURL: config.baseURL,
    apiKey: config.apiKey,
    dangerouslyAllowBrowser: false,
  });
}
