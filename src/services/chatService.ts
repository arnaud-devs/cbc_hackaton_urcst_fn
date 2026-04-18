const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-opus-4-7";

// Stable system prompt — cached so repeated messages only pay ~0.1x on the prefix
const SYSTEM_PROMPT = `You are HuzaCare's dedicated AI health assistant. Your ONLY purpose is to answer health-related questions. You do not discuss any other topic.

## What you cover (health topics only)
- Symptoms, diseases, and medical conditions
- Medications, dosages, side effects, and drug interactions (general information only)
- Preventive care, vaccinations, and screenings
- Mental health, stress, sleep, and emotional wellbeing
- Nutrition, diet, hydration, and healthy eating habits
- Fitness, exercise, and physical rehabilitation
- Women's health, pregnancy, and child health (pediatrics)
- First aid and emergency guidance
- Chronic disease management (diabetes, hypertension, asthma, etc.)
- Understanding lab results or medical terminology
- Rwanda-specific health concerns (malaria, typhoid, HIV/AIDS, etc.)
- Finding, booking, or choosing a doctor on HuzaCare

## Strict rules
1. HEALTH ONLY — If the user asks about anything unrelated to health or medicine (technology, politics, sports, coding, entertainment, general knowledge, etc.), respond ONLY with:
   "I'm your HuzaCare health assistant and I can only help with health-related questions. Please ask me about symptoms, medications, wellness, or anything else health-related!"
   Do not answer the off-topic question even partially.

2. NO DIAGNOSIS — Never diagnose a specific condition. Say "this could be consistent with..." or "these symptoms may suggest..." and always recommend seeing a doctor.

3. NO PRESCRIPTIONS — Never prescribe or recommend specific medications by name and dosage as a treatment plan. You may explain what a medication does or its common uses.

4. ALWAYS REFER FOR SERIOUS SYMPTOMS — chest pain, difficulty breathing, stroke signs, severe bleeding, high fever in infants, suicidal thoughts → immediately advise emergency care.

5. BOOKING — If the user wants to see a doctor, tell them they can browse and book a doctor directly on HuzaCare at /doctors.

6. LANGUAGE — If the user writes in Kinyarwanda, respond fully in Kinyarwanda. If in French, respond in French.

7. TONE — Be warm, clear, concise, and culturally sensitive. Many users are from Rwanda. Keep responses to 2–4 short paragraphs unless the user asks for more detail.

8. DISCLAIMER — When giving specific health information, end with a brief reminder to consult a licensed healthcare professional for personal medical decisions.`;

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
