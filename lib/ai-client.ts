type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function generateAiCompletion(prompt: string): Promise<string | null> {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;
const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://psychologydemo-ten.vercel.app");

  const messages: ChatMessage[] = [
    { role: "system", content: "Ты помощник института ИЖСИЗ. Отвечай на русском языке." },
    { role: "user", content: prompt },
  ];

  const body = {
    model: process.env.AI_MODEL || (openRouterKey ? "openai/gpt-4o-mini" : "gpt-4o-mini"),
    messages,
    max_tokens: 2500,
    temperature: 0.7,
  };

  if (openRouterKey) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "ИЖСИЗ",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[ai] OpenRouter error", res.status, await res.text().catch(() => ""));
      return null;
    }
    const data = await res.json();
    return (data.choices?.[0]?.message?.content as string) || null;
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
    if (!res.ok) {
      console.error("[ai] OpenAI error", res.status, await res.text().catch(() => ""));
      return null;
    }
    const data = await res.json();
    return (data.choices?.[0]?.message?.content as string) || null;
  }

  return null;
}
