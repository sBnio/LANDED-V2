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
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const handleBack = () => {
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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Building your personalized roadmap...
        </h2>
        <p className="text-slate-500">
          Analyzing your profile and organizing your steps.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="w-full p-6 flex justify-center bg-white border-b border-slate-100 mb-8">
        <Logo className="text-2xl" />
      </header>
      
      <div className="w-full max-w-xl mx-auto p-6 flex-1 flex flex-col">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step} of {totalSteps}</span>
             <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-slate-200" />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
                <p className="text-slate-500">We'll use this to customize your legal and official tasks.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <Input
                    type="text"
                    placeholder="e.g. Alex Graham"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    className="h-14 px-4 rounded-xl border-slate-200 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
                      className="h-14 px-4 rounded-xl border-slate-200 cursor-text"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Nationality</label>
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
                      className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
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
                         className="h-14 px-4 rounded-xl border-slate-200 focus:ring-blue-500 mt-2"
                         autoFocus
                       />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">University</label>
                  <select 
                    value={formData.university}
                    onChange={(e) => updateFormData({ university: e.target.value, zayedCampus: "" })}
                    className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" disabled>Select your university</option>
                    {universities.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>

                {formData.university === "Zayed University" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-sm font-bold text-slate-700">Which Zayed University campus are you attending?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Abu Dhabi", "Dubai"].map(campus => (
                        <button
                          key={campus}
                          onClick={() => updateFormData({ zayedCampus: campus })}
                          className={cn(
                            "h-14 rounded-xl border font-bold transition-all",
                            formData.zayedCampus === campus
                              ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          )}
                        >
                          {campus}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Location & Visa</h2>
                <p className="text-slate-500">Each Emirate has slightly different rules.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Which Emirate are you moving to?</label>
                  <select 
                    value={formData.emirate}
                    onChange={(e) => updateFormData({ emirate: e.target.value })}
                    className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="" disabled>Select Emirate</option>
                    {emirates.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">When do you arrive / did you arrive?</label>
                  <Input
                    type="date"
                    value={formData.arrivalDate}
                    onChange={(e) => updateFormData({ arrivalDate: e.target.value })}
                    className="h-14 px-4 rounded-xl border-slate-200"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">1. What is your current immigration status?</label>
                  <div className="grid gap-3">
                    {visaTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFormData({ visaType: type })}
                        className={cn(
                          "w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between",
                          formData.visaType === type
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                      >
                        <span className="max-w-[90%]">{type}</span>
                        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", formData.visaType === type ? "border-blue-600 bg-blue-600" : "border-slate-300")}>
                          {formData.visaType === type && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">2. Who is sponsoring your stay?</label>
                  <div className="grid gap-3">
                    {sponsors.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateFormData({ sponsoringStay: type })}
                        className={cn(
                          "w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between",
                          formData.sponsoringStay === type
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                      >
                        {type}
                        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.sponsoringStay === type ? "border-blue-600 bg-blue-600" : "border-slate-300")}>
                          {formData.sponsoringStay === type && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Status</h2>
                <p className="text-slate-500">We'll skip tasks you've already completed.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Do you have accommodation sorted?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Yes', 'No', 'Still looking'] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => updateFormData({ hasAccommodation: opt })}
                        className={cn(
                          "p-3 rounded-xl border text-center text-sm font-semibold transition-all",
                          formData.hasAccommodation === opt
                            ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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
                      "p-5 rounded-2xl border text-left transition-all flex flex-col gap-2",
                      formData.hasSIMCard ? "border-green-600 bg-green-50" : "border-slate-200"
                    )}
                  >
                    <div className="flex justify-between">
                      <span className="text-2xl">📱</span>
                      {formData.hasSIMCard && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                    <span className="font-bold text-slate-900">UAE SIM Card</span>
                    <span className="text-xs text-slate-500">{formData.hasSIMCard ? "Active" : "Not yet"}</span>
                  </button>

                  <button
                    onClick={() => updateFormData({ hasBankAccount: !formData.hasBankAccount })}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all flex flex-col gap-2",
                      formData.hasBankAccount ? "border-green-600 bg-green-50" : "border-slate-200"
                    )}
                  >
                    <div className="flex justify-between">
                      <span className="text-2xl">🏦</span>
                      {formData.hasBankAccount && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                    <span className="font-bold text-slate-900">Bank Account</span>
                    <span className="text-xs text-slate-500">{formData.hasBankAccount ? "Open" : "Not yet"}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Emirates ID Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateFormData({ hasEmiratesID: 'applied' })}
                      className={cn(
                        "p-4 rounded-xl border text-center font-medium transition-all",
                        formData.hasEmiratesID === 'applied'
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      Applied
                    </button>
                    <button
                      onClick={() => updateFormData({ hasEmiratesID: 'not yet' })}
                      className={cn(
                        "p-4 rounded-xl border text-center font-medium transition-all",
                        formData.hasEmiratesID === 'not yet'
                          ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      Not Yet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}



          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-16 rounded-2xl border-slate-200 font-bold text-slate-600"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={cn(
                "h-16 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all",
                step === 1 ? "w-full" : "flex-[2]",
                "bg-blue-600 hover:bg-blue-700 text-white"
              )}
            >
              {step === totalSteps ? "Build My Plan →" : (
                <span className="flex items-center gap-2">
                  Continue <ChevronRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
