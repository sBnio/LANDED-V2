import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/context/OnboardingContext";
import { useLandedChat } from "@/hooks/useLandedChat";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function ChatMobile() {
  const [input, setInput] = useState("");
  const { state } = useOnboarding();
  const { chatHistory, isTyping, sendMessage, clearHistory } = useLandedChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  const quickAsks = [
    "Emirates ID timeline?",
    "SIM without ID?",
    "Best bank for me?",
    "Housing checklist"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-73px)] bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                <h1 className="font-black text-xl text-slate-900 tracking-tight uppercase">Landed Assistant</h1>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                    Verified UAE Student Guide
                </p>
                </div>
            </div>
            <button onClick={clearHistory} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {chatHistory.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-[32px] p-8 shadow-sm max-w-md mx-auto mt-4 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <MessageCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight uppercase leading-none">Welcome, {state.name.split(' ')[0]}</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              I'm specialized in {state.university} and the {state.emirate} area. Ask me anything about your move.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {quickAsks.map((ask) => (
                <button
                  key={ask}
                  onClick={() => sendMessage(ask)}
                  className="text-[10px] font-black uppercase tracking-widest bg-slate-50 text-slate-600 border border-slate-100 rounded-xl p-4 hover:border-blue-400 hover:text-blue-600 transition-all text-center leading-tight shadow-sm"
                >
                  {ask}
                </button>
              ))}
            </div>
          </div>
        )}

        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex animate-in fade-in slide-in-from-bottom-2 duration-300",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[90%] md:max-w-[70%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed font-medium shadow-sm",
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm markdown-body",
              )}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-6 py-5 shadow-sm flex gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      <div className="p-6 bg-white border-t border-slate-100 shrink-0 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <form
          onSubmit={handleSend}
          className="flex items-center gap-4 max-w-4xl mx-auto"
        >
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-16 rounded-2xl bg-slate-50 border-transparent focus-visible:ring-blue-500 text-base px-6 font-medium shadow-inner"
            disabled={isTyping}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
            className="h-16 w-16 rounded-2xl shrink-0 bg-slate-900 hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95"
          >
            <Send className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
