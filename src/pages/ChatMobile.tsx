import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/context/OnboardingContext";
import { GoogleGenAI } from "@google/genai";
import { cn } from "@/lib/utils";

export function ChatMobile() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state, updateState } = useOnboarding();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage = { role: "user" as const, content: text };
    const newHistory = [...state.chatHistory, userMessage];
    updateState({ chatHistory: newHistory });
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const systemInstruction = `
You are LANDED's AI assistant — a friendly, knowledgeable guide for international students arriving in the UAE for university.

YOUR KNOWLEDGE AREAS:
- Emirates ID application process, documents, costs, timelines, and common issues
- UAE student visa process and requirements
- SIM card options (Du and e&/Etisalat) — prepaid vs postpaid, costs, what you need
- Bank account opening (Emirates NBD, ADCB, Mashreq, Liv) — requirements, student accounts
- Medical fitness test — locations, process, costs
- Health insurance — university-provided vs private options
- Accommodation — university housing, Dubizzle, Property Finder, typical costs, areas
- Transportation — NOL card, metro, buses, Careem/Uber
- Essential apps — UAE Pass, ICP Smart, Al Hosn
- General life in UAE — culture tips, weather, costs, safety

YOUR PERSONALITY:
- Friendly, clear, concise
- Give specific actionable answers, not vague generalities
- Use bullet points and numbered steps for clarity
- Include specific costs in AED when relevant
- Mention common mistakes students make
- If you're not sure about something specific (like exact current prices or processing times), say "this may vary — I'd recommend verifying the latest info with [specific source]"
- Keep answers focused. Don't write essays. Students want quick, clear answers.
- You can use emojis sparingly for readability

IMPORTANT RULES:
- Never give legal advice. For visa/legal issues, direct them to their university's international student office or ICP directly.
- Never make up specific phone numbers, addresses, or URLs you're not sure about
- Always be encouraging — moving to a new country is stressful. Be the reassuring friend who's been through it.
- If asked about things outside UAE student life, politely redirect: "I'm specialized in helping students settle in the UAE! For that question, I'd recommend [alternative resource]."
`;

      const contextPrompt = newHistory
        .map(
          (m) => `${m.role === "user" ? "Student" : "Assistant"}: ${m.content}`,
        )
        .join("\n\n");

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Here is the conversation history:\n${contextPrompt}\n\nAssistant:`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const assistantMessage = {
        role: "assistant" as const,
        content: response.text || "I'm sorry, I couldn't process that.",
      };
      updateState({ chatHistory: [...newHistory, assistantMessage] });
    } catch (error) {
      console.error("Chat error:", error);
      updateState({
        chatHistory: [
          ...newHistory,
          {
            role: "assistant",
            content:
              "I'm having trouble connecting. Try again in a moment, or check our step-by-step guides on the main dashboard.",
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickAsks = [
    "Emirates ID timeline?",
    "SIM card without Emirates ID?",
    "Best student bank account?",
    "How to check visa status?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-73px)] bg-slate-50">
      <div className="bg-blue-600 text-white p-4 flex items-center gap-3 shrink-0 shadow-sm z-10">
        <div className="bg-white/20 p-2 rounded-full">
          <MessageCircle className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg">LANDED AI Assistant 🤖</h1>
          <p className="text-blue-100 text-sm">
            Ask me anything about settling in the UAE
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.chatHistory.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm max-w-md mx-auto mt-4">
            <p className="text-slate-700 leading-relaxed">
              Hi! 👋 I'm LANDED's AI assistant. I can help you with:
              <br />
              <br />
              • Emirates ID questions
              <br />
              • Visa process
              <br />
              • SIM card options
              <br />
              • Banking
              <br />
              • Accommodation tips
              <br />
              • Or anything else about living in UAE!
              <br />
              <br />
              What would you like to know?
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {quickAsks.map((ask) => (
                <button
                  key={ask}
                  onClick={() => handleSend(ask)}
                  className="text-sm bg-blue-50 text-blue-700 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 transition-colors text-left font-medium"
                >
                  {ask}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.chatHistory.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 text-[15px] leading-relaxed",
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm shadow-sm"
                  : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm",
              )}
            >
              {msg.content.split("\n").map((line, j) => (
                <span key={j}>
                  {line}
                  {j !== msg.content.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-4 bg-white border-t border-slate-200 shrink-0 pb-safe">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex items-center gap-3 max-w-4xl mx-auto"
        >
          <Input
            placeholder="e.g., What documents do I need for Emirates ID?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-12 rounded-full bg-slate-50 border-slate-200 focus-visible:ring-blue-500 text-base px-5"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-12 w-12 rounded-full shrink-0 bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
