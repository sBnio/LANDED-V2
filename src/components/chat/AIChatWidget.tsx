import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { streamAI } from "@/lib/ai";
import { useOnboarding } from "@/context/OnboardingContext";

export function AIChatWidget() {
  const { state, updateState } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = state.chatHistory || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: "user" as const, content: text }];
    updateState({ chatHistory: newMessages });
    setInput("");
    setIsTyping(true);

    const systemPrompt = `You are LANDED Assistant, an expert guide for international students arriving in the UAE for university studies. You have deep knowledge of:
- UAE visa processes (student visa, entry permit, status change, residency)
- Emirates ID registration and biometrics
- UAE banking for students (which banks, required docs, student accounts)
- Housing (Ejari, DEWA, rental process)
- SIM cards (Etisalat/du student plans)
- University admin processes for major UAE universities
- Common fees, timelines, and pitfalls

Always give specific, actionable answers. Mention exact document names, fees in AED, typical waiting times, and official portal names. If you're unsure of something, say so clearly. Keep answers concise — 3-5 sentences max unless a detailed list is needed. Never give legal or visa advice that could harm the student — always recommend confirming with their university PRO office for complex cases.`;

    let assistantResponse = "";
    
    // Add a placeholder for the assistant message
    updateState({ chatHistory: [...newMessages, { role: "assistant", content: "" }] });

    try {
      await streamAI(systemPrompt, newMessages, (chunk) => {
        assistantResponse += chunk;
        updateState({ 
          chatHistory: [
            ...newMessages, 
            { role: "assistant", content: assistantResponse }
          ] 
        });
      });
    } catch (error) {
      updateState({ 
        chatHistory: [
          ...newMessages, 
          { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again later." }
        ] 
      });
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    updateState({ chatHistory: [] });
  };

  const suggestedQuestions = [
    "What docs do I need for Emirates ID?",
    "Which bank is easiest to open as a student?",
    "How long does residency visa take?",
    "What's Ejari and do I need it?"
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-50",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[340px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col transition-all origin-bottom-right z-50 overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-navy-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Ask LANDED</h3>
              <p className="text-xs text-slate-300">AI Student Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clearChat} className="text-xs text-slate-300 hover:text-white px-2 py-1">
              Clear
            </button>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-500 max-w-[250px]">
                Hi {state.name || "there"}! I'm your AI guide to the UAE. Ask me anything about visas, housing, banking, or student life.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-amber-400 hover:text-amber-600 transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.role === "user"
                      ? "bg-amber-100 text-amber-900 self-end rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-700 self-start rounded-tl-sm shadow-sm"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-white border border-slate-200 text-slate-700 self-start rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 h-10 px-3 text-sm bg-slate-100 border-transparent rounded-xl focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-navy-900 text-white rounded-xl flex items-center justify-center disabled:opacity-50 hover:bg-slate-800 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
