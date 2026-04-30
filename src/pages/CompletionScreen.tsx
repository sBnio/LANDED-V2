import React, { useState, useEffect, useRef } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Download, Link as LinkIcon, Award, Calendar, CheckCircle2, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import { Logo } from "@/components/ui/Logo";

export function CompletionScreen({ 
  onBack, 
  totalTasks 
}: { 
  onBack: () => void;
  totalTasks: number;
}) {
  const { state } = useOnboarding();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Determine and save completion date if not present
    let completionDate = localStorage.getItem("landed_completion_date");
    if (!completionDate) {
      completionDate = new Date().toISOString();
      localStorage.setItem("landed_completion_date", completionDate);
    }
    
    // Fire confetti sequence
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const colors = ["#F59E0B", "#D97706", "#2563EB", "#FFFFFF"];

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: colors
      });
    }, 250);

    const handleScroll = () => {
      if (window.scrollY > 50) setHasScrolled(true);
      else setHasScrolled(false);
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const completionDateString = localStorage.getItem("landed_completion_date") || new Date().toISOString();
  const completionDateObj = new Date(completionDateString);
  const formattedCompletionDate = completionDateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const createdAtString = localStorage.getItem("landed_account_created") || new Date().toISOString();
  localStorage.setItem("landed_account_created", createdAtString); // Ensure it's set
  const createdDateObj = new Date(createdAtString);
  const msPassed = completionDateObj.getTime() - createdDateObj.getTime();
  const daysPassed = Math.max(1, Math.ceil(msPassed / (1000 * 60 * 60 * 24)));

  const firstName = state.name.split(" ")[0] || "Student";
  const university = state.university || "University";
  const nationality = state.nationality || "International";

  const arrivalDateObj = state.arrivalDate ? new Date(state.arrivalDate) : new Date();
  const formattedArrivalDate = arrivalDateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const saveImage = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, { 
        backgroundColor: null,
        scale: 2, // High quality
        useCORS: true
      });
      const link = document.createElement("a");
      link.download = "landed-fully-landed.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Image saved!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save image");
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = async () => {
    const textToCopy = `I'm Fully Landed 🇦🇪 Just completed my UAE student onboarding with Landed!`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Copied! Ready to share");
    } catch (err) {
      showToast("Failed to copy link");
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToStats = () => {
    document.getElementById("stats-section")?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-amber-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Dashboard
          </button>
          <Logo className="text-xl text-white" />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 w-full max-w-5xl mx-auto relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="mb-8 filter drop-shadow-2xl flex justify-center"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" alt="UAE Flag" className="w-24 md:w-32 h-auto rounded-sm shadow-md" crossOrigin="anonymous" />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-amber-400 font-bold tracking-widest uppercase text-sm mb-4">
              <Award className="w-4 h-4" /> Mission Accomplished
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-slate-400 tracking-tight leading-tight">
              You're Fully Landed.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mt-4 leading-relaxed">
              Welcome to the UAE, <span className="text-white">{firstName}</span>. Your journey has just begun.
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={scrollToStats}
            className="absolute bottom-12 animate-bounce flex flex-col items-center gap-2 text-slate-500 hover:text-white transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">See your stats</span>
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </section>

        {/* STATS SECTION */}
        <section id="stats-section" className="min-h-screen flex flex-col items-center justify-center py-24 px-6 w-full max-w-5xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 w-full items-center">
            
            {/* Story text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Journey</h2>
                <p className="text-blue-400 font-medium text-lg">From arrival to fully settled.</p>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed">
                  You navigated your student visa, Emirates ID, medical fitness test, bank account, SIM card, and health insurance — in a country you'd never lived in before.
                </p>
                <div className="pl-4 border-l-2 border-blue-600/50">
                  <p className="text-xl font-medium text-white italic">
                    "That's not nothing. That's everything."
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-amber-400 mb-2"><CheckCircle2 className="w-6 h-6" /></div>
                  <div className="text-2xl font-bold text-white mb-1">{totalTasks}</div>
                  <div className="text-sm text-slate-400 font-medium">Tasks Conquered</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-blue-400 mb-2"><Calendar className="w-6 h-6" /></div>
                  <div className="text-2xl font-bold text-white mb-1">{daysPassed}</div>
                  <div className="text-sm text-slate-400 font-medium">Days Taken</div>
                </div>
              </div>
            </motion.div>

            {/* The Ticket / Shareable Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", bounce: 0.4, duration: 1 }}
              className="flex flex-col items-center"
            >
              <div 
                ref={cardRef}
                className="w-full max-w-[380px] bg-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden ring-1 ring-black/5 text-slate-900"
              >
                {/* Graphics */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <Logo className="text-2xl text-blue-600" />
                    <div className="filter drop-shadow hover:scale-110 transition-transform flex-shrink-0 ml-4">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_United_Arab_Emirates.svg" alt="UAE Flag" className="w-10 h-auto rounded-[2px] shadow-sm" crossOrigin="anonymous" />
                    </div>
                  </div>
                  
                  <h4 className="font-black text-3xl mb-8 leading-tight tracking-tight text-slate-900">
                    Fully Landed
                  </h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Student</div>
                      <div className="text-lg font-bold text-slate-900 leading-tight">{state.name}</div>
                      <div className="text-sm font-medium text-slate-500">{nationality}</div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">University</div>
                      <div className="text-lg font-bold text-slate-900 leading-tight">{university}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Arrived</div>
                        <div className="font-semibold text-slate-700">{formattedArrivalDate}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Completed</div>
                        <div className="font-semibold text-slate-700">{formattedCompletionDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-slate-200 border-dashed flex justify-between items-center text-xs text-slate-400 font-medium">
                    <span>landed-v2.vercel.app</span>
                    <span className="font-bold text-blue-600">#LandedUAE</span>
                  </div>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[380px] mt-8">
                <button 
                  onClick={saveImage}
                  disabled={isSaving}
                  className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-5 h-5" /> 
                  {isSaving ? "Saving..." : "Save Image"}
                </button>
                <button 
                  onClick={copyLink}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
                >
                  <LinkIcon className="w-5 h-5" /> 
                  Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-sm font-bold py-3 px-6 rounded-full shadow-2xl shadow-black/20 z-50 flex items-center gap-2 border border-slate-200"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
