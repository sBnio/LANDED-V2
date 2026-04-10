import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/context/OnboardingContext";
import { GoogleGenAI } from "@google/genai";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state, updateState } = useOnboarding();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, state.chatHistory]);

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

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Replay history to chat (skip the last user message as we will send it)
      for (const msg of state.chatHistory) {
        // We can't easily replay history with the current SDK without sending messages,
        // so we'll just send the whole context as a single prompt for simplicity,
        // or we can format it.
      }

      // Let's format the history into the prompt for context
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
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50">
      {isOpen ? (
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl w-[calc(100vw-32px)] md:w-[400px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                LANDED AI Assistant 🤖
              </h3>
              <p className="text-blue-100 text-xs mt-1">
                Ask me anything about settling in the UAE
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700 hover:text-white rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {state.chatHistory.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-sm text-slate-700">
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {quickAsks.map((ask) => (
                    <button
                      key={ask}
                      onClick={() => handleSend(ask)}
                      className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-3 py-1.5 hover:bg-blue-100 transition-colors text-left"
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
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
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
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="e.g., What documents do I need for Emirates ID?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="rounded-full bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="rounded-full shrink-0 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center animate-in zoom-in duration-300"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
}
