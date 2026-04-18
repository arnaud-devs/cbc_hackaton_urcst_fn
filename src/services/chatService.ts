const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-7";

// Stable system prompt — cached so repeated messages only pay ~0.1x on the prefix
const SYSTEM_PROMPT = `You are HuzaCare's friendly AI health assistant. You help patients and visitors with general health questions, wellness advice, understanding medical conditions, and navigating healthcare options in Rwanda.

Guidelines:
- Answer health questions clearly and compassionately in plain language.
- Provide evidence-based, general health information.
- For symptoms that could be serious, always advise the user to consult a licensed doctor or visit a clinic.
- Never diagnose, prescribe, or replace professional medical advice.
- If the user asks about booking a doctor, guide them to use the HuzaCare platform to find and book a doctor directly.
- Keep responses concise (2–4 short paragraphs max) unless the user asks for more detail.
- Be warm, empathetic, and culturally aware — many users are from Rwanda.
- If asked in Kinyarwanda, respond in Kinyarwanda.`;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function buildMessages(history: ChatMessage[]) {
  return history.map((m) => ({ role: m.role, content: m.content }));
}

export async function streamChatResponse(
  history: ChatMessage[],
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (err: string) => void
) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    onError("VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file.");
    return;
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        stream: true,
        // Prompt caching: ephemeral cache on the stable system prompt
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: buildMessages(history),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      onError(`API error ${response.status}: ${errorBody}`);
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
      onError("No response body.");
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (
            parsed.type === "content_block_delta" &&
            parsed.delta?.type === "text_delta"
          ) {
            onDelta(parsed.delta.text);
          }
        } catch {
          // Ignore malformed SSE lines
        }
      }
    }

    onDone();
  } catch (err) {
    onError(err instanceof Error ? err.message : "Unknown error");
  }
}
