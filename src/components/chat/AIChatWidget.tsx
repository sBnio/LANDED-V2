import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useLandedChat } from "@/hooks/useLandedChat";
import ReactMarkdown from "react-markdown";

export function AIChatWidget() {
  const { state } = useOnboarding();
  const { chatHistory, isTyping, sendMessage, clearHistory } = useLandedChat();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  const suggestedQuestions = [
    "Emirates ID timeline?",
    "Student bank accounts?",
    "Visa medical test docs?",
    "SIM card without EID?"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all z-50 hover:scale-110",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="w-8 h-8 fill-white/20" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col transition-all origin-bottom-right z-50 overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest">Landed AI</h3>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Student Onboarding Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clearHistory} className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-widest px-2 py-1">
              Reset
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-2 shadow-inner">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 uppercase tracking-tight">Need a quick answer?</p>
                <p className="text-sm text-slate-500 font-medium max-w-[250px] mx-auto mt-2">
                  Hi {state.name.split(' ')[0] || "Student"}! I'm your specialized guide to the UAE.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full pt-4">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-600 p-3 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-center leading-tight shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-5 py-3 text-sm font-medium leading-relaxed shadow-sm",
                    msg.role === "user"
                      ? "bg-blue-600 text-white self-end rounded-tr-sm"
                      : "bg-white border border-slate-100 text-slate-700 self-start rounded-tl-sm markdown-body"
                  )}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
              {isTyping && (
                <div className="bg-white border border-slate-100 text-slate-700 self-start rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 h-14 px-5 text-sm bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 transition-all shrink-0 shadow-lg shadow-slate-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
