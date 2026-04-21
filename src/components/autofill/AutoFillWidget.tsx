import { useState, useEffect } from "react";
import { Wand2, X, Lock, Copy, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";

export function AutoFillWidget() {
  const { state } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsChatOpen(true);
    const handleClose = () => setIsChatOpen(false);
    window.addEventListener("chat-open", handleOpen);
    window.addEventListener("chat-close", handleClose);
    return () => {
      window.removeEventListener("chat-open", handleOpen);
      window.removeEventListener("chat-close", handleClose);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event("autofill-open"));
    } else {
      window.dispatchEvent(new Event("autofill-close"));
    }
  }, [isOpen]);

  const handleCopy = (text: string, fieldName: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const profileData = [
    { label: "Full Name", value: state.name || "Not provided" },
    { label: "Nationality", value: state.nationality || "Not provided" },
    { label: "Date of Birth", value: state.dateOfBirth || "Not provided" },
    { label: "University", value: state.university || "Not provided" },
    { label: "Emirate", value: state.emirate || "Not provided" },
    { label: "Arrival Date", value: state.arrivalDate || "Not provided" },
    { label: "Visa Status", value: state.visaType || "Not provided" },
  ];

  const supportedForms = [
    "ICP Emirates ID Application",
    "MOHAP Medical Fitness",
    "University Registration",
    "Tenancy Contract (Ejari)",
    "UAE SIM Card Form"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-32 right-8 w-20 h-20 bg-gradient-to-br from-[#064E3B] via-[#059669] to-[#10B981] text-white rounded-full flex items-center justify-center transition-all z-50 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(5,150,105,0.6)] group border border-white/20",
          (isOpen || isChatOpen) ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 animate-in zoom-in-50 duration-500"
        )}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity animate-pulse" />
        <Wand2 className="w-10 h-10 fill-emerald-100 relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]" />
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 w-[380px] max-h-[80vh] bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col transition-all origin-bottom-right z-50 overflow-hidden",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-emerald-900 text-white p-6 flex flex-col shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-700 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="flex items-center justify-between z-10">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-emerald-700/50 backdrop-blur-md rounded-xl flex items-center justify-center border border-emerald-500/30">
                 <Wand2 className="w-5 h-5 text-emerald-100" />
               </div>
               <div>
                 <h3 className="font-black text-sm uppercase tracking-widest text-emerald-50">Smart Auto-Fill</h3>
               </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-emerald-800 rounded-xl transition-colors">
               <X className="w-6 h-6 text-emerald-200 hover:text-white" />
             </button>
          </div>
          
          <div className="mt-4 z-10 flex items-center gap-2 text-xs font-medium text-emerald-200/80 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/50">
             <Lock className="w-4 h-4 shrink-0" />
             <p>Data stored completely encrypted locally. <span className="font-bold text-emerald-100">100% UAE PDPL Compliant.</span></p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-6">
          
          {/* Action Button */}
          <button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-95 group">
             <Zap className="w-5 h-5 group-hover:fill-emerald-400 transition-all" />
             AUTO-FILL THIS PAGE
          </button>

          {/* Supported Forms */}
          <div>
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Currently Supported Portals
             </h4>
             <div className="flex flex-wrap gap-2">
                {supportedForms.map((form, i) => (
                  <span key={i} className="text-[10px] bg-slate-200/50 text-slate-600 px-2.5 py-1 rounded-full font-bold border border-slate-200">
                    {form}
                  </span>
                ))}
             </div>
          </div>

          <div className="w-full h-px bg-slate-200" />

          {/* Smart Copy Profile Data */}
          <div>
            <div className="mb-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  Your Profile Data
              </h4>
              <p className="text-[10px] font-bold text-slate-500 leading-relaxed max-w-[280px]">
                For external government sites (ICA, MOHAP), we do not inject into their domain. Use Smart Copy below.
              </p>
            </div>
            
            <div className="space-y-2">
              {profileData.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl hover:border-emerald-300 transition-colors group">
                   <div className="min-w-0 pr-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{item.value}</p>
                   </div>
                   <button 
                     onClick={() => handleCopy(item.value, item.label)}
                     className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all",
                        copiedField === item.label 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                     )}
                     title="Copy to clipboard"
                   >
                     {copiedField === item.label ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   </button>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
