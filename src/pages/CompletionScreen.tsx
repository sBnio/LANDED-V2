import React, { useState, useEffect, useRef } from "react";
import { useOnboarding } from "@/context/OnboardingContext";

declare global {
  interface Window {
    confetti: any;
    html2canvas: any;
  }
}

export function CompletionScreen({ 
  onBack, 
  totalTasks 
}: { 
  onBack: () => void;
  totalTasks: number;
}) {
  const { state } = useOnboarding();
  const [visibleStep, setVisibleStep] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load scripts dynamically
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript("https://cdn.jsdelivr.net/npm/canvas-confetti"),
      loadScript("https://cdn.jsdelivr.net/npm/html2canvas")
    ]).catch(err => console.error("Failed to load CDNs", err));

    // Determine and save completion date if not present
    let completionDate = localStorage.getItem("landed_completion_date");
    if (!completionDate) {
      completionDate = new Date().toISOString();
      localStorage.setItem("landed_completion_date", completionDate);
    }
  }, []);

  const completionDateString = localStorage.getItem("landed_completion_date") || new Date().toISOString();
  const completionDateObj = new Date(completionDateString);
  const formattedCompletionDate = completionDateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // Calculate days passed since account creation to completion
  // We'll assume account created = today (as we don't have explicit date in state).
  // Actually, state.arrivalDate could be used? No, the prompt says "account creation to today". 
  // Let's check when the user was created or just use a fallback if not available.
  // We'll mimic this by checking "landed_account_created" or default to 14 days for MVP if not trackable.
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

  const rawBudget = localStorage.getItem("landed_budget_total") || "2245";
  const navigatedAed = parseFloat(rawBudget).toLocaleString();

  useEffect(() => {
    // Fade in text elements one by one
    const timers = [
      setTimeout(() => setVisibleStep(1), 300),
      setTimeout(() => setVisibleStep(2), 600),
      setTimeout(() => setVisibleStep(3), 900),
      setTimeout(() => setVisibleStep(4), 1200),
    ];

    // Fire confetti for 3 seconds
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const colors = ["#F59E0B", "#ffffff", "#1E3A5F"];

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      if (window.confetti) {
        window.confetti({
          ...defaults, particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors
        });
      }
    }, 250);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  const scrollToPart2 = () => {
    part2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPart3 = () => {
    part3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveImage = async () => {
    if (!cardRef.current || !window.html2canvas) return;
    setIsSaving(true);
    try {
      const canvas = await window.html2canvas(cardRef.current, { backgroundColor: null });
      const link = document.createElement("a");
      link.download = "landed-fully-landed.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      showToast("Image saved ✓");
    } catch (err) {
      console.error(err);
      showToast("Failed to save image");
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = async () => {
    const textToCopy = `I'm Fully Landed 🇦🇪 Just completed my UAE student onboarding with Landed — landed-v2.vercel.app`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast("Copied! Ready to share ✓");
    } catch (err) {
      showToast("Failed to copy link");
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
        >
          Back to dashboard
        </button>
      </div>

      <div className="flex flex-col items-center">
        {/* PART 1 */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 w-full">
          <div className="space-y-6 flex flex-col items-center">
            <div 
              className={`text-[48px] transition-opacity duration-700 ${visibleStep >= 1 ? "opacity-100" : "opacity-0"}`}
            >
              🇦🇪
            </div>
            
            <h1 
              className={`text-3xl md:text-[32px] font-bold text-[#1E3A5F] transition-opacity duration-700 ${visibleStep >= 2 ? "opacity-100" : "opacity-0"}`}
            >
              You're Fully Landed.
            </h1>
            
            <p 
              className={`text-lg text-slate-500 transition-opacity duration-700 ${visibleStep >= 3 ? "opacity-100" : "opacity-0"}`}
            >
              Welcome to the UAE, {firstName}.
            </p>
            
            <div className={`pt-8 transition-opacity duration-700 ${visibleStep >= 4 ? "opacity-100" : "opacity-0"}`}>
              <button 
                onClick={scrollToPart2}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                See my journey →
              </button>
            </div>
          </div>
        </div>

        {/* PART 2 */}
        <div ref={part2Ref} className="min-h-screen flex flex-col items-center justify-center text-center p-6 w-full">
          <div className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 max-w-[480px] w-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">{state.name}</h2>
              <p className="text-sm text-slate-500 mb-1">{nationality} student at {university}</p>
              <p className="text-sm text-slate-500">Arrived: {formattedArrivalDate}</p>
            </div>

            <hr className="border-slate-100 mb-6" />

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div className="text-left flex flex-col items-start">
                <span className="text-base font-bold text-[#1E3A5F] leading-tight">{daysPassed} days</span>
                <span className="text-xs text-slate-500 mt-1">✓ Completed in</span>
              </div>
              <div className="text-left flex flex-col items-start">
                <span className="text-base font-bold text-[#1E3A5F] leading-tight">{totalTasks} tasks</span>
                <span className="text-xs text-slate-500 mt-1">✓ Completed</span>
              </div>
              <div className="text-left flex flex-col items-start">
                <span className="text-base font-bold text-[#1E3A5F] leading-tight">{navigatedAed} AED</span>
                <span className="text-xs text-slate-500 mt-1">✓ Navigated</span>
              </div>
              <div className="text-left flex flex-col items-start">
                <span className="text-base font-bold text-[#1E3A5F] leading-tight">Fully Landed 🇦🇪</span>
                <span className="text-xs text-slate-500 mt-1">✓ Status</span>
              </div>
            </div>

            <hr className="border-slate-100 mb-6" />

            <p className="text-sm text-slate-500 italic mb-8 leading-relaxed">
              "You navigated your student visa, Emirates ID, medical fitness test, bank account, SIM card, and health insurance — in a country you'd never lived in before."
            </p>

            <p className="text-lg font-bold text-blue-600 mb-4">
              That's not nothing. That's everything.
            </p>

            <p className="text-xs text-slate-400 mb-8">
              Fully Landed on {formattedCompletionDate}
            </p>

            <button 
              onClick={scrollToPart3}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              See my shareable card →
            </button>
          </div>
        </div>

        {/* PART 3 */}
        <div ref={part3Ref} className="min-h-screen flex flex-col items-center justify-center text-center p-6 w-full">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Share your achievement</h3>
            <p className="text-sm text-slate-500">Let your friends and family back home know you made it 🎓</p>
          </div>

          <div 
            ref={cardRef}
            className="w-[320px] sm:w-[360px] h-[480px] sm:h-[520px] bg-[#1E3A5F] rounded-2xl p-10 flex flex-col mb-10 relative overflow-hidden"
          >
            <div className="text-white font-bold text-lg text-left tracking-tight">
              landed.
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center">
              <div className="text-[40px] mb-6 mt-6">🇦🇪</div>
              
              <h4 className="text-white font-bold text-[26px] mb-3 leading-tight">
                Fully Landed
              </h4>
              
              <p className="text-white text-base mb-1">
                {state.name}
              </p>
              
              <p className="text-[#F59E0B] text-[13px] mb-2 font-medium">
                {university}
              </p>
              
              <p className="text-white text-[13px]">
                Completed in {daysPassed} days
              </p>
              
              <div className="w-[60px] h-[1px] bg-[#F59E0B] mx-auto my-6" />
            </div>

            <div className="text-[#94A3B8] text-[11px] text-center mt-auto pb-2">
              landed-v2.vercel.app
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[360px] mb-6">
            <button 
              onClick={saveImage}
              disabled={isSaving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              📸 {isSaving ? "Saving..." : "Save as Image"}
            </button>
            <button 
              onClick={copyLink}
              className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              🔗 Copy Link
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Share on Instagram, WhatsApp, or LinkedIn
          </p>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-bold py-3 px-6 rounded-full shadow-lg z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
