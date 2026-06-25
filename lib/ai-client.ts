type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export type AiCompletionResult = {
  content: string | null;
  error?: string;
  hasKey: boolean;
};

export async function generateAiCompletion(prompt: string): Promise<AiCompletionResult> {
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://psychologydemo-ten.vercel.app");

  const messages: ChatMessage[] = [
    { role: "system", content: "Ты помощник института ИЖСИЗ. Отвечай на русском языке." },
    { role: "user", content: prompt },
  ];

  const model = (process.env.AI_MODEL?.trim() ||
    (openRouterKey ? "meta-llama/llama-3.3-70b-instruct:free" : "gpt-4o-mini")) as string;

  const body = {
    model,
    messages,
    max_tokens: 2500,
    temperature: 0.7,
  };

  const hasKey = Boolean(openRouterKey || openAiKey);
  if (!hasKey) {
    return { content: null, error: "no_key", hasKey: false };
  }

  try {
    if (openRouterKey) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": siteUrl,
          "X-Title": "IZHSIZ",
        },
        body: JSON.stringify(body),
      });
      const raw = await res.text();
      if (!res.ok) {
        console.error("[ai] OpenRouter error", res.status, raw);
        let message = `openrouter_${res.status}`;
        try {
          const parsed = JSON.parse(raw) as { error?: { message?: string } };
          if (parsed.error?.message) message = parsed.error.message;
        } catch {
          // keep status-based message
        }
        return { content: null, error: message, hasKey: true };
      }
      const data = JSON.parse(raw) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      return {
        content: data.choices?.[0]?.message?.content || null,
        hasKey: true,
        error: data.choices?.[0]?.message?.content ? undefined : "empty_response",
      };
    }

    if (openAiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const raw = await res.text();
      if (!res.ok) {
        console.error("[ai] OpenAI error", res.status, raw);
        return { content: null, error: `openai_${res.status}`, hasKey: true };
      }
      const data = JSON.parse(raw) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      return {
        content: data.choices?.[0]?.message?.content || null,
        hasKey: true,
        error: data.choices?.[0]?.message?.content ? undefined : "empty_response",
      };
    }
  } catch (error) {
    console.error("[ai] request failed", error);
    return { content: null, error: "network_error", hasKey: true };
  }

  return { content: null, error: "unknown", hasKey };
}
