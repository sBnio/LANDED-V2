import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useOnboarding, UserState } from "@/context/OnboardingContext";
import { Loader2, Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "motion/react";

const universities = [
  "UAEU",
  "AUS",
  "AUD",
  "NYU Abu Dhabi",
  "Heriot-Watt Dubai",
  "Khalifa University",
  "Zayed University",
  "BITS Pilani Dubai",
  "CUD (Canadian University Dubai)",
  "UOWD (University of Wollongong Dubai)",
  "UoBD (University of Birmingham Dubai)",
  "UE (University of Europe Dubai)",
];

const nationalities = [
  "Indian", "Pakistani", "Egyptian", "Jordanian", "Syrian", 
  "Nigerian", "Kenyan", "Filipino", "Bangladeshi", "British", 
  "American", "Other"
];

const emirates = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Other"
];

const visaTypes = [
  "I have not applied yet",
  "I have a student visa (entry approved)",
  "I have arrived and am applying for a residence permit",
  "I have a valid residence permit"
];

const sponsors = [
  "University",
  "Self-sponsored",
  "Other"
];


const universityEmirateMap: Record<string, string> = {
  "UAEU": "Abu Dhabi",
  "AUS": "Sharjah",
  "AUD": "Dubai",
  "NYU Abu Dhabi": "Abu Dhabi",
  "Heriot-Watt Dubai": "Dubai",
  "Khalifa University": "Abu Dhabi",
  "BITS Pilani Dubai": "Dubai",
  "CUD (Canadian University Dubai)": "Dubai",
  "UOWD (University of Wollongong Dubai)": "Dubai",
  "UoBD (University of Birmingham Dubai)": "Dubai",
  "UE (University of Europe Dubai)": "Dubai",
};

export function Onboarding() {
  const navigate = useNavigate();
  const { state, updateState } = useOnboarding();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomNationality, setShowCustomNationality] = useState(
    !!state.nationality && !nationalities.includes(state.nationality) && state.nationality !== "Other"
  );

  // Form State initialized from context or defaults
  const [formData, setFormData] = useState<Partial<UserState>>({
    name: state.name || "",
    university: state.university || "",
    nationality: state.nationality || "",
    dateOfBirth: state.dateOfBirth || "",
    emirate: state.emirate || "",
    arrivalDate: state.arrivalDate || "",
    visaType: state.visaType || "",
    sponsoringStay: state.sponsoringStay || "",
    hasAccommodation: state.hasAccommodation || null,
    hasSIMCard: state.hasSIMCard || false,
    hasEmiratesID: state.hasEmiratesID || 'not yet',
    hasBankAccount: state.hasBankAccount || false,
    languagePreference: state.languagePreference || "English",
    zayedCampus: state.zayedCampus || "",
  });

  // Auto-select emirate based on university
  useEffect(() => {
    if (formData.university && universityEmirateMap[formData.university]) {
      setFormData(prev => ({ ...prev, emirate: universityEmirateMap[formData.university!] }));
    } else if (formData.university === "Zayed University" && formData.zayedCampus) {
      setFormData(prev => ({ ...prev, emirate: formData.zayedCampus! }));
    }
  }, [formData.university, formData.zayedCampus]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const updateFormData = (updates: Partial<UserState>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    window.scrollTo(0,0);
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
    window.scrollTo(0,0);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563EB", "#16A34A", "#D97706"]
    });
  };

  const finishOnboarding = () => {
    setIsLoading(true);
    triggerConfetti();
    
    setTimeout(() => {
      updateState({
        ...formData,
        hasCompletedOnboarding: true,
      } as Partial<UserState>);
      navigate("/dashboard");
    }, 1500);
  };

  const isStepValid = () => {
    if (step === 1) {
      const basicInfo = !!(formData.name && formData.dateOfBirth && formData.nationality && formData.university);
      if (formData.university === "Zayed University") {
        return basicInfo && !!formData.zayedCampus;
      }
      return basicInfo;
    }
    if (step === 2) return !!(formData.emirate && formData.arrivalDate && formData.visaType && formData.sponsoringStay);
    if (step === 3) return formData.hasAccommodation !== null;
    return true;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-16 w-16 animate-spin text-blue-500 mb-8" />
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-white mb-4 tracking-tight"
        >
          Building your personalized roadmap...
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 font-medium"
        >
          Analyzing your profile and organizing your steps.
        </motion.p>
      </div>
    );
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans selection:bg-blue-500/30">
      <header className="w-full p-6 flex justify-center bg-white border-b border-slate-200/60 mb-8 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <Logo className="text-2xl text-slate-900" />
      </header>
      
      <div className="w-full max-w-xl mx-auto p-6 flex-1 flex flex-col">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-blue-600"
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5, ease: "easeOut" }}
             />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/80 p-8 md:p-12 flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div
              key={step}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="flex-1 flex flex-col"
            >
          
          {step === 1 && (
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Tell us about yourself</h2>
                <p className="text-slate-500 font-medium">We'll use this to customize your legal and official tasks.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. Alex Graham"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    className="h-16 px-5 rounded-2xl border-slate-200 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors font-medium text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                      className="h-16 px-5 rounded-2xl border-slate-200 cursor-text bg-slate-50 focus:bg-white transition-colors font-medium text-lg block"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nationality</label>
                    <select 
                      value={showCustomNationality ? "Other" : (formData.nationality || "")}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "Other") {
                          setShowCustomNationality(true);
                          updateFormData({ nationality: "" });
                        } else {
                          setShowCustomNationality(false);
                          updateFormData({ nationality: val });
                        }
                      }}
                      className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors font-medium text-lg appearance-none"
                    >
                      <option value="" disabled>Select nationality</option>
                      {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    {showCustomNationality && (
                       <Input
                         type="text"
                         placeholder="Please specify your nationality"
                         value={nationalities.includes(formData.nationality || "") ? "" : formData.nationality}
                         onChange={(e) => updateFormData({ nationality: e.target.value })}
                         className="h-16 px-5 rounded-2xl border-slate-200 focus:ring-blue-500 mt-3 bg-slate-50 focus:bg-white transition-colors font-medium text-lg"
                         autoFocus
                       />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">University</label>
                  <select 
                    value={formData.university}
                    onChange={(e) => updateFormData({ university: e.target.value, zayedCampus: "" })}
                    className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors font-medium text-lg appearance-none"
                  >
                    <option value="" disabled>Select your university</option>
                    {universities.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                {formData.university === "Zayed University" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-3"
                  >
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Which Zayed University campus are you attending?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Abu Dhabi", "Dubai"].map(campus => (
                        <button
                          key={campus}
                          onClick={() => updateFormData({ zayedCampus: campus })}
                          className={cn(
                            "h-16 rounded-2xl border font-bold transition-all text-lg",
                            formData.zayedCampus === campus
                              ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                              : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                          )}
                        >
                          {campus}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Location & Visa</h2>
                <p className="text-slate-500 font-medium">Each Emirate has slightly different rules.</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Which Emirate are you moving to?</label>
                  <select 
                    value={formData.emirate}
                    onChange={(e) => updateFormData({ emirate: e.target.value })}
                    className="w-full h-16 px-5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors font-medium text-lg appearance-none"
                  >
                    <option value="" disabled>Select Emirate</option>
                    {emirates.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">When do you arrive / did you arrive?</label>
                  <Input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => updateFormData({ arrivalDate: e.target.value })}
                    className="h-16 px-5 rounded-2xl border-slate-200 bg-slate-50 focus:bg-white transition-colors font-medium text-lg block"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">1. What is your current immigration status?</label>
                  <div className="grid gap-3">
                    {visaTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFormData({ visaType: type })}
                        className={cn(
                          "w-full p-5 rounded-2xl border text-left font-bold transition-all flex items-center justify-between text-[15px] leading-tight",
                          formData.visaType === type
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                            : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100",
                        )}
                      >
                        <span className="max-w-[85%]">{type}</span>
                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", formData.visaType === type ? "border-blue-600 bg-blue-600" : "border-slate-300")}>
                          {formData.visaType === type && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">2. Who is sponsoring your stay?</label>
                  <div className="grid gap-3">
                    {sponsors.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFormData({ sponsoringStay: type })}
                        className={cn(
                          "w-full p-5 rounded-2xl border text-left font-bold transition-all flex items-center justify-between text-lg",
                          formData.sponsoringStay === type
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                            : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100",
                        )}
                      >
                        {type}
                        <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors", formData.sponsoringStay === type ? "border-blue-600 bg-blue-600" : "border-slate-300")}>
                          {formData.sponsoringStay === type && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Setup Status</h2>
                <p className="text-slate-500 font-medium">We'll skip tasks you've already completed.</p>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Do you have accommodation sorted?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Yes', 'No', 'Still looking'] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateFormData({ hasAccommodation: opt })}
                        className={cn(
                          "p-4 rounded-2xl border text-center text-sm font-bold transition-all",
                          formData.hasAccommodation === opt
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                            : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => updateFormData({ hasSIMCard: !formData.hasSIMCard })}
                    className={cn(
                      "p-6 rounded-3xl border text-left transition-all flex flex-col gap-2 relative overflow-hidden",
                      formData.hasSIMCard ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex justify-between relative z-10 w-full">
                      <span className="text-3xl mt-1">📱</span>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                         formData.hasSIMCard ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                      )}>
                        {formData.hasSIMCard && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <div className="relative z-10 mt-2">
                       <span className="font-black text-slate-900 text-lg block">UAE SIM Card</span>
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{formData.hasSIMCard ? "Active" : "Not yet"}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => updateFormData({ hasBankAccount: !formData.hasBankAccount })}
                    className={cn(
                      "p-6 rounded-3xl border text-left transition-all flex flex-col gap-2 relative overflow-hidden",
                      formData.hasBankAccount ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex justify-between relative z-10 w-full">
                      <span className="text-3xl mt-1">🏦</span>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                         formData.hasBankAccount ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                      )}>
                        {formData.hasBankAccount && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                    <div className="relative z-10 mt-2">
                      <span className="font-black text-slate-900 text-lg block">Bank Account</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{formData.hasBankAccount ? "Open" : "Not yet"}</span>
                    </div>
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Emirates ID Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateFormData({ hasEmiratesID: 'applied' })}
                      className={cn(
                        "p-4 rounded-xl border text-center font-bold transition-all text-lg",
                        formData.hasEmiratesID === 'applied'
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                          : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                      )}
                    >
                      Applied
                    </button>
                    <button
                      onClick={() => updateFormData({ hasEmiratesID: 'not yet' })}
                      className={cn(
                        "p-4 rounded-xl border text-center font-bold transition-all text-lg",
                        formData.hasEmiratesID === 'not yet'
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-600 outline-none"
                          : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                      )}
                    >
                      Not Yet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

            </motion.div>
          </AnimatePresence>


          <div className="mt-12 flex gap-4 pt-6 border-t border-slate-100">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-14 rounded-2xl border-slate-200 font-black text-slate-600 bg-white hover:bg-slate-50 text-xs tracking-widest uppercase"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={cn(
                "h-14 rounded-2xl font-black transition-all text-xs tracking-widest uppercase",
                step === 1 ? "w-full" : "flex-[2]",
                step === totalSteps 
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-600/30 active:scale-95 border-0" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 active:scale-95 disabled:hover:scale-100"
              )}
            >
              {step === totalSteps ? "Build My Plan" : (
                <span className="flex items-center gap-2">
                  Continue <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
