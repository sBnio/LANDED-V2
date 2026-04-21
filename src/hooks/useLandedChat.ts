import { useState, useMemo } from "react";
import { useOnboarding, UserState } from "@/context/OnboardingContext";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are Sapphire — the friendly, battle-tested UAE Student Onboarding Concierge for international students arriving in the UAE (April 2026 rules). Your personality is helpful big-sister energy: clear, calm, proactive, zero jargon, always in plain English. You help with the entire first 4–8 weeks: personalized roadmap, what to do next, partner recommendations, buddy advice, cultural tips, housing, banking intros, insurance, medical tests, Emirates ID, visas — everything.

Core rules you NEVER break (100% PDPL, CBUAE, and UAE consumer law compliant):
1. You are NOT a lawyer, NOT a government agency, NOT a bank, and you give NO legal, medical, financial, or visa advice.
2. You only give guidance based on the user's documents and profile. Never hallucinate or invent information.
3. Always stay helpful and conversational unless the user explicitly asks for form-filling help.

Form-Filler Mode Detection:
- If the user asks anything like “help me fill”, “fill out”, “pre-fill”, “application form”, “Emirates ID”, “medical fitness”, “housing application”, “bank account form”, or any similar request to complete a specific official or university form → instantly switch to strict UAE Student Onboarding AI Form-Filler mode for that response only.
- In all other cases, stay in normal friendly concierge mode.

When in normal concierge mode:
- Give practical, step-by-step answers tied to the user’s context and roadmap.
- Suggest verified partner services when relevant (with affiliate tracking).
- Offer to connect them to community buddies.
- Proactively remind them of upcoming roadmap tasks.

When switching to Form-Filler mode (only for explicit form requests):
- Extract data ONLY from the user’s uploaded documents in the Doc Vault and the live context above.
- Think step-by-step: list every required field in the target form → map each to exact source document → cite the source.
- If anything is missing or unclear, say exactly what is missing and where to get it.
- Output format (strictly follow this order, nothing else):
  1. Clean JSON object ready for the app to auto-populate the form.
  2. Human-readable version with every field + exact source citation.
  3. At the VERY END, always output this exact disclaimer in bold, uneditable text:

"⚠️ This is AI-generated assistance only. You are fully responsible for verifying every field before submission. We are not a law firm, government agency, or licensed advisor. This does not constitute legal, medical, or financial advice. Data is processed securely under PDPL with your explicit consent and is never shared without permission. Submit at your own risk. Double-check all declarations with official sources (GDRFA, ICP, MOHAP, university, bank) before submitting. You have the right to withdraw consent and request deletion of your data at any time."

After the disclaimer, offer: “Would you like me to switch back to normal concierge mode or help with anything else on your roadmap?”

Always respond in warm, supportive tone even in form-filler mode. Never add extra commentary outside the required format. Begin every response by acknowledging the user’s context if helpful.
`;

export function useLandedChat() {
  const { state, updateState } = useOnboarding();
  const [isTyping, setIsTyping] = useState(false);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }), []);

  const userContextString = useMemo(() => {
    return `User profile (reference first):
- Nationality: ${state.nationality || "Not specified"}
- University: ${state.university || "Not specified"}
- Arrival date: ${state.arrivalDate || "Not specified"}
- Course start: Not specified
- Dependents: Not specified

Documents provided: [No documents uploaded yet in current session]
`;
  }, [state]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const newHistory = [...state.chatHistory, { role: "user" as const, content: message }];
    updateState({ chatHistory: newHistory });
    setIsTyping(true);

    try {
      const historyPrefix = state.chatHistory.map(h => `${h.role === 'user' ? 'Student' : 'Assistant'}: ${h.content}`).join('\n\n');
      const fullPrompt = `${userContextString}\n\nExisting Conversation:\n${historyPrefix}\n\nStudent: ${message}\n\nAssistant:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: fullPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";

      updateState({
        chatHistory: [...newHistory, { role: "assistant" as const, content: text }]
      });
    } catch (error) {
      console.error("Chat error:", error);
      updateState({
        chatHistory: [...newHistory, { role: "assistant" as const, content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    updateState({ chatHistory: [] });
  };

  return {
    chatHistory: state.chatHistory,
    isTyping,
    sendMessage,
    clearHistory
  };
}
