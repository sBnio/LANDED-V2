import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/context/OnboardingContext";
import { Loader2, Check, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { Logo } from "@/components/ui/Logo";

const nationalities = [
  "India", "Pakistan", "Nigeria", "Egypt", "Philippines", 
  "Bangladesh", "Jordan", "Iran", "Kenya", "Sri Lanka", 
  "China", "Russia", "Other"
];

const universities = [
  "American University of Sharjah (AUS)",
  "University of Sharjah (UOS)",
  "Khalifa University",
  "NYU Abu Dhabi",
  "Sorbonne University Abu Dhabi",
  "Heriot-Watt University Dubai",
  "University of Birmingham Dubai",
  "University of Wollongong in Dubai",
  "Middlesex University Dubai",
  "Manipal Academy Dubai",
  "Amity University Dubai",
  "SP Jain School of Global Management",
  "Other",
];

const visaStatuses = [
  "I haven't arrived yet",
  "Just arrived (< 2 weeks)",
  "Been here 1–3 months",
];

const helpTopics = [
  { id: "visa", icon: "🛂", label: "Entry Visa / Tourist Visa" },
  { id: "emirates_id", icon: "🪪", label: "Emirates ID" },
  { id: "accommodation", icon: "🏠", label: "Housing" },
  { id: "bank", icon: "🏦", label: "Bank Account" },
  { id: "sim_card", icon: "📱", label: "SIM Card" },
  { id: "university", icon: "📚", label: "University Enrollment" },
  { id: "transport", icon: "🚗", label: "Transportation Card (Nol)" },
  { id: "insurance", icon: "💉", label: "Health Insurance" },
];

const commonDocuments = [
  { id: "passport", label: "Passport (+ copy)" },
  { id: "acceptance", label: "University Acceptance Letter" },
  { id: "photos", label: "Passport Photos (white background)" },
  { id: "medical", label: "Medical Certificate" },
  { id: "bank_statement", label: "Bank Statement / Sponsorship Letter" },
];

export function Onboarding() {
  const navigate = useNavigate();
  const { state, updateState } = useOnboarding();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [name, setName] = useState(state.name || "");
  const [nationality, setNationality] = useState(state.nationality || "");
  const [university, setUniversity] = useState(state.university || "");
  const [arrivalDate, setArrivalDate] = useState(state.arrivalDate || "");
  const [visaStatus, setVisaStatus] = useState(state.visaStatus || "");
  const [dateOfBirth, setDateOfBirth] = useState(state.dateOfBirth || "");
  const [hasHousing, setHasHousing] = useState<boolean | null>(state.hasHousing !== undefined ? state.hasHousing : null);
  const [helpNeeded, setHelpNeeded] = useState<string[]>(state.helpNeeded || []);
  const [documents, setDocuments] = useState<string[]>(state.completedDocuments || []);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      if (step + 1 === 5) {
        triggerConfetti();
      }
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
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const finishOnboarding = () => {
    setIsLoading(true);
    
    // Auto-detect Emirate based on university
    let detectedEmirate = "";
    if (university.includes("Dubai") || university.includes("UOWD") || university.includes("SP Jain")) {
      detectedEmirate = "Dubai";
    } else if (university.includes("Abu Dhabi") || university.includes("Khalifa")) {
      detectedEmirate = "Abu Dhabi";
    } else if (university.includes("Sharjah") || university.includes("AUS") || university.includes("UOS")) {
      detectedEmirate = "Sharjah";
    }

    // Save to autofill data as well
    const savedAutofill = localStorage.getItem("landed_autofill_data");
    const currentAutofill = savedAutofill ? JSON.parse(savedAutofill) : {};
    localStorage.setItem("landed_autofill_data", JSON.stringify({
      ...currentAutofill,
      emirate: detectedEmirate || currentAutofill.emirate || "",
      dateOfBirth: dateOfBirth || currentAutofill.dateOfBirth || "",
    }));

    // Calculate age robustly
    let calculatedAge = 18;
    if (dateOfBirth) {
      const [year, month, day] = dateOfBirth.split("-").map(Number);
      if (year && month && day) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
      }
    }

    let newCompletedSteps = [...state.completedSteps];
    if (calculatedAge < 18 && !newCompletedSteps.includes(1)) {
      newCompletedSteps.push(1);
    } else if (calculatedAge >= 18 && newCompletedSteps.includes(1)) {
      // Remove step 1 from completed if they are 18 or older
      newCompletedSteps = newCompletedSteps.filter(id => id !== 1);
    }
    
    if (hasHousing && !newCompletedSteps.includes(6)) {
      newCompletedSteps.push(6);
    } else if (!hasHousing && newCompletedSteps.includes(6)) {
      // Remove step 6 from completed if they no longer have housing
      newCompletedSteps = newCompletedSteps.filter(id => id !== 6);
    }

    updateState({
      name,
      nationality,
      university,
      arrivalDate,
      visaStatus,
      dateOfBirth,
      hasHousing,
      helpNeeded,
      completedSteps: newCompletedSteps,
      hasCompletedOnboarding: true,
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#F59E0B] mb-6" />
        <h2 className="text-2xl font-bold font-heading text-[#0A1628] mb-2">
          Building your personalized roadmap...
        </h2>
        <p className="text-slate-500">
          Analyzing your profile and organizing your steps.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col font-sans">
      <header className="w-full p-6 flex justify-center">
        <Logo className="text-2xl" />
      </header>
      
      <div className="w-full max-w-2xl mx-auto p-6 pt-4 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={handleBack} disabled={step === 1} className={cn("p-2 rounded-full hover:bg-slate-200 transition-colors", step === 1 && "opacity-0 pointer-events-none")}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <Progress value={progress} className="h-2 bg-slate-200 [&>div]:bg-[#F59E0B]" />
            </div>
            <span className="text-sm font-medium text-slate-500 w-12 text-right">{step} / {totalSteps}</span>
          </div>
        </div>

        <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 md:p-10 flex-1 flex flex-col">
          {step === 1 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              <h2 className="text-3xl font-bold font-heading text-[#0A1628]">
                Tell us about yourself
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">What's your name?</label>
                    <Input
                      type="text"
                      placeholder="e.g. Alex"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 px-4 rounded-xl border-slate-200 focus-visible:ring-[#F59E0B]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Date of Birth</label>
                    <Input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="h-12 px-4 rounded-xl border-slate-200 focus-visible:ring-[#F59E0B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">Which university are you attending?</label>
                    <select 
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    >
                      <option value="" disabled>Select your university</option>
                      {universities.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-700">What's your nationality?</label>
                    <select 
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none"
                    >
                      <option value="" disabled>Select nationality</option>
                      {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              <h2 className="text-3xl font-bold font-heading text-[#0A1628]">
                Your current status
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Where are you in the relocation process?</label>
                  <div className="grid gap-3">
                    {visaStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setVisaStatus(status)}
                        className={cn(
                          "w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between",
                          visaStatus === status
                            ? "border-[#F59E0B] bg-amber-50 text-[#D97706] ring-1 ring-[#F59E0B]"
                            : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                        )}
                      >
                        {status}
                        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", visaStatus === status ? "border-[#F59E0B] bg-[#F59E0B]" : "border-slate-300")}>
                          {visaStatus === status && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {visaStatus === "I haven't arrived yet" && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-sm font-bold text-slate-700">When do you arrive in UAE?</label>
                    <Input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="h-12 px-4 rounded-xl border-slate-200 focus-visible:ring-[#F59E0B]"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Do you already have housing sorted?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setHasHousing(true)}
                      className={cn(
                        "p-4 rounded-xl border text-center font-medium transition-all",
                        hasHousing === true
                          ? "border-[#F59E0B] bg-amber-50 text-[#D97706] ring-1 ring-[#F59E0B]"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      Yes, I do
                    </button>
                    <button
                      onClick={() => setHasHousing(false)}
                      className={cn(
                        "p-4 rounded-xl border text-center font-medium transition-all",
                        hasHousing === false
                          ? "border-[#F59E0B] bg-amber-50 text-[#D97706] ring-1 ring-[#F59E0B]"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      )}
                    >
                      No, I need help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-[#0A1628] mb-2">
                  What do you need?
                </h2>
                <p className="text-slate-500">Select all the tasks you need help with.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {helpTopics.map((topic) => {
                  const isSelected = helpNeeded.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setHelpNeeded((prev) =>
                          isSelected
                            ? prev.filter((id) => id !== topic.id)
                            : [...prev, topic.id],
                        );
                      }}
                      className={cn(
                        "p-4 rounded-xl border text-left font-medium transition-all flex items-center gap-3",
                        isSelected
                          ? "border-[#F59E0B] bg-amber-50 text-[#D97706] ring-1 ring-[#F59E0B]"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <span className="text-2xl">{topic.icon}</span>
                      <span>{topic.label}</span>
                      {isSelected && (
                        <Check className="h-5 w-5 text-[#F59E0B] ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300 space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-[#0A1628] mb-2">
                  Your Documents
                </h2>
                <p className="text-slate-500">Mark what you already have ready.</p>
              </div>
              
              <div className="space-y-3">
                {commonDocuments.map((doc) => {
                  const isSelected = documents.includes(doc.id);
                  return (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setDocuments((prev) =>
                          isSelected
                            ? prev.filter((id) => id !== doc.id)
                            : [...prev, doc.id],
                        );
                      }}
                      className={cn(
                        "w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center gap-4",
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-500"
                          : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                      )}
                    >
                      <div className={cn("w-6 h-6 rounded flex items-center justify-center border", isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white")}>
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>
                      <span>{doc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex-1 animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center text-center space-y-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                <Check className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-heading text-[#0A1628] mb-4">
                  🎉 Your personalized UAE checklist is ready!
                </h2>
                <p className="text-slate-600 text-lg max-w-md mx-auto">
                  We've organized {helpNeeded.length || 8} tasks in the exact order you need to complete them.
                </p>
              </div>
              
              <div className="w-full max-w-sm bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Up Next</p>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                  <span className="font-medium">Entry Visa</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">2</div>
                  <span className="font-medium">Medical Fitness Test</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">3</div>
                  <span className="font-medium">Emirates ID Biometrics</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!name || !dateOfBirth || !nationality || !university)) ||
                (step === 2 && (!visaStatus || (visaStatus === "I haven't arrived yet" && !arrivalDate) || hasHousing === null)) ||
                (step === 3 && helpNeeded.length === 0)
              }
              className="w-full bg-[#0A1628] hover:bg-slate-800 text-white h-14 text-lg rounded-xl"
            >
              {step === totalSteps ? "View Full Roadmap" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
