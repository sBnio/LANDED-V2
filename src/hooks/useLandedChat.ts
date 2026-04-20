import { useState, useMemo } from "react";
import { useOnboarding, UserState } from "@/context/OnboardingContext";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are Landed Assistant — an expert guide for international students arriving in the UAE. You know everything about:
- Emirates ID application process (ICA website, typing centers, fees, timelines)
- UAE student bank accounts (Emirates NBD Liv., ADCB, FAB — which ones accept students, required documents)
- UAE SIM cards (du vs Etisalat/e& — student plans, registration process with passport + visa)
- Student visa and residence visa processes
- University registration at UAEU, AUS, AUD, NYU Abu Dhabi, Heriot-Watt, Khalifa University, Zayed University
- Finding accommodation near universities in Dubai, Abu Dhabi, Sharjah
- Driving license conversion for international students
- Opening WhatsApp, setting up UAE banking apps
- What to do when things go wrong (visa delays, Emirates ID rejection, bank account rejection)

Always give specific, actionable answers. Never say "consult a professional" for standard bureaucratic processes. Give step-by-step answers. When you don't know something specific, say so clearly but provide the best available guidance. Keep responses concise and mobile-friendly — use short paragraphs and bullet points. Start every first message by acknowledging the user's university and emirate if you know it.
`;

export function useLandedChat() {
  const { state, updateState } = useOnboarding();
  const [isTyping, setIsTyping] = useState(false);

  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }), []);

  const userContextString = useMemo(() => {
    return `User context: University: ${state.university || "Not specified"}, Emirate: ${state.emirate || "Not specified"}, Nationality: ${state.nationality || "Not specified"}, Immigration Status: ${state.visaType || "Not specified"}, Sponsorship: ${state.sponsoringStay || "Not specified"}, Has Emirates ID: ${state.hasEmiratesID}, Has Bank Account: ${state.hasBankAccount ? "Yes" : "No"}`;
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
