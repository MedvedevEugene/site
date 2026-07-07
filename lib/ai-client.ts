type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiCompletionResult = {
  content: string | null;
  error?: string;
  hasKey: boolean;
  modelUsed?: string;
};

import { isValidAiReport, normalizeAiReport } from "@/lib/ai-report";

const FREE_MODEL_FALLBACKS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "openrouter/free",
] as const;

const AI_MAX_TOKENS = 4000;

const CJK_PATTERN = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]+/g;

/** Qwen и другие азиатские модели иногда вставляют иероглифы — убираем их из текста. */
export function sanitizeRussianAiText(text: string) {
  return text
    .replace(CJK_PATTERN, "")
    .replace(/(\*\*[^*]+\*\*)\s{2,}/g, "$1 ")
    .replace(/  +/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function hasCjkCharacters(text: string) {
  return CJK_PATTERN.test(text);
}

function uniqueModels(models: string[]) {
  return [...new Set(models.filter(Boolean))];
}

async function callOpenRouter(
  apiKey: string,
  siteUrl: string,
  model: string,
  messages: ChatMessage[]
): Promise<{ content: string | null; error?: string }> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "IZHSIZ",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: AI_MAX_TOKENS,
      temperature: 0.7,
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    console.error("[ai] OpenRouter error", model, res.status, raw);
    let message = `openrouter_${res.status}`;
    try {
      const parsed = JSON.parse(raw) as { error?: { message?: string } };
      if (parsed.error?.message) message = parsed.error.message;
    } catch {
      // keep status-based message
    }
    return { content: null, error: message };
  }

  const data = JSON.parse(raw) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content || null;
  if (!content) return { content: null, error: "empty_response" };

  const normalized = normalizeAiReport(sanitizeRussianAiText(content));
  if (!isValidAiReport(normalized)) {
    return { content: null, error: "invalid_report" };
  }

  return { content: normalized };
}

export async function generateAiCompletion(prompt: string): Promise<AiCompletionResult> {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://psychologydemo-ten.vercel.app");

  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "Ты помощник института ИЖСИЗ. Отвечай строго на русском языке. Никогда не используй китайские иероглифы, английский или другие языки.",
    },
    { role: "user", content: prompt },
  ];

  const hasKey = Boolean(openRouterKey || openAiKey);
  if (!hasKey) {
    return { content: null, error: "no_key", hasKey: false };
  }

  try {
    if (openRouterKey) {
      const preferred = process.env.AI_MODEL?.trim();
      const models = uniqueModels([preferred || "", ...FREE_MODEL_FALLBACKS]);
      let lastError = "unknown";

      for (const model of models) {
        const result = await callOpenRouter(openRouterKey, siteUrl, model, messages);
        if (result.content) {
          return { content: result.content, hasKey: true, modelUsed: model };
        }
        lastError = result.error || "unknown";
        const retryable =
          lastError.includes("Provider returned error") ||
          lastError.includes("rate") ||
          lastError.includes("429") ||
          lastError.includes("503") ||
          lastError.includes("empty_response") ||
          lastError.includes("invalid_report");
        if (!retryable) break;
      }

      return { content: null, error: lastError, hasKey: true };
    }

    if (openAiKey) {
      const model = process.env.AI_MODEL?.trim() || "gpt-4o-mini";
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: AI_MAX_TOKENS,
          temperature: 0.7,
        }),
      });
      const responseText = await res.text();
      if (!res.ok) {
        console.error("[ai] OpenAI error", res.status, responseText);
        return { content: null, error: `openai_${res.status}`, hasKey: true };
      }
      const data = JSON.parse(responseText) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const messageContent = data.choices?.[0]?.message?.content;
      const normalized = messageContent ? normalizeAiReport(sanitizeRussianAiText(messageContent)) : null;
      return {
        content: normalized && isValidAiReport(normalized) ? normalized : null,
        hasKey: true,
        error: normalized && isValidAiReport(normalized) ? undefined : "invalid_report",
        modelUsed: model,
      };
    }
  } catch (error) {
    console.error("[ai] request failed", error);
    return { content: null, error: "network_error", hasKey: true };
  }

  return { content: null, error: "unknown", hasKey };
}
