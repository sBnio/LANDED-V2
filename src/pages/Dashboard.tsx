import { useState, useMemo } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { stepsData } from "@/data/steps";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  AlertCircle,
  FileText,
  CreditCard,
  Home,
  Sparkles,
  MessageSquare,
  Plane,
  IdCard,
  Building,
  Landmark,
  Smartphone,
  GraduationCap,
  Car,
  Stethoscope,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { EmiratesIDForm } from "@/components/autofill/EmiratesIDForm";
import { BankMatchmaker } from "@/components/banking/BankMatchmaker";
import { CostEstimator } from "@/components/cost/CostEstimator";
import { AppointmentPDF } from "@/components/pdf/AppointmentPDF";
import { DocumentChecker } from "@/components/documents/DocumentChecker";
import { SlotFinder } from "@/components/appointments/SlotFinder";

const CATEGORIES = [
  {
    id: "visa",
    title: "Visa & Entry",
    icon: Plane,
    stepIds: [1],
  },
  {
    id: "eid",
    title: "Emirates ID",
    icon: IdCard,
    stepIds: [2],
  },
  {
    id: "housing",
    title: "Housing",
    icon: Building,
    stepIds: [6],
  },
  {
    id: "banking",
    title: "Banking",
    icon: Landmark,
    stepIds: [4],
  },
  {
    id: "sim",
    title: "SIM Card",
    icon: Smartphone,
    stepIds: [3],
  },
  {
    id: "uni",
    title: "University Admin",
    icon: GraduationCap,
    stepIds: [9],
  },
  {
    id: "transport",
    title: "Getting Around",
    icon: Car,
    stepIds: [7],
  },
  {
    id: "health",
    title: "Health & Insurance",
    icon: Stethoscope,
    stepIds: [5],
  },
];

export function Dashboard() {
  const { state, toggleStep } = useOnboarding();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [showEmiratesIDForm, setShowEmiratesIDForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "visa",
    "eid",
  ]);

  const completedCount = state.completedSteps.length;
  
  // Calculate age to determine if medical test is needed
  const age = useMemo(() => {
    if (!state.dateOfBirth) return 18; // Default to adult if not provided
    
    // Parse YYYY-MM-DD manually to avoid timezone issues
    const [year, month, day] = state.dateOfBirth.split("-").map(Number);
    if (!year || !month || !day) return 18;
    
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  }, [state.dateOfBirth]);

  // Filter steps based on age
  const filteredStepsData = useMemo(() => {
    if (age < 18) {
      return stepsData.filter(step => step.id !== 1);
    }
    return stepsData;
  }, [age]);

  const totalSteps = stepsData.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  const handleToggleStep = (id: number) => {
    const isCompleting = !state.completedSteps.includes(id);
    toggleStep(id);

    if (isCompleting) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#0A1628", "#10B981", "#F59E0B"],
      });
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-10 pb-12 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-900 mb-2 font-heading tracking-tight">
            Welcome back, {state.name || "Student"} 👋
          </h1>
          <p className="text-slate-500 text-lg mb-8">
            You're {progressPercent}% through your UAE setup. Here's what's next.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Tasks Done</p>
              <p className="text-2xl font-bold text-navy-900">{completedCount}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">In Progress</p>
              <p className="text-2xl font-bold text-amber-600">{totalSteps - completedCount}</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {state.visaStatus === "I haven't arrived yet" ? "Days Until" : "Days Since"}
              </p>
              <p className="text-2xl font-bold text-blue-600">14</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Streak</p>
              <p className="text-2xl font-bold text-emerald-600 flex items-center gap-1">
                3 <span className="text-sm">🔥</span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Overall Progress
                </p>
                <p className="text-2xl font-bold text-navy-900">
                  {completedCount} of {totalSteps} tasks done
                </p>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Est. time remaining: 12 days
                </p>
              </div>
              <p className="text-amber-500 font-bold text-2xl">
                {progressPercent}%
              </p>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Categories */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-8">
        <div className="mb-8">
          <CostEstimator />
        </div>

        {CATEGORIES.map((category) => {
          const categorySteps = stepsData.filter((s) =>
            category.stepIds.includes(s.id)
          );
          const categoryCompleted = categorySteps.filter((s) =>
            state.completedSteps.includes(s.id)
          ).length;
          const categoryTotal = categorySteps.length;
          if (categoryTotal === 0) return null; // Hide category if no steps
          const categoryPercent = Math.round(
            (categoryCompleted / categoryTotal) * 100
          );
          const isExpanded = expandedCategories.includes(category.id);

          return (
            <div key={category.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-navy-900">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-navy-900 font-heading">
                      {category.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-medium text-slate-500">
                        {categoryCompleted}/{categoryTotal} done
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${categoryPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </div>
              </button>

              {/* Category Tasks */}
              {isExpanded && (
                <div className="border-t border-slate-100 divide-y divide-slate-100">
                  {[...categorySteps]
                    .sort((a, b) => {
                      const aCompleted = state.completedSteps.includes(a.id);
                      const bCompleted = state.completedSteps.includes(b.id);
                      if (aCompleted && !bCompleted) return 1;
                      if (!aCompleted && bCompleted) return -1;
                      return 0;
                    })
                    .map((step) => {
                      const isCompleted = state.completedSteps.includes(step.id);
                    const isStepExpanded = expandedStep === step.id;
                    const depsMet = step.dependsOn.every((depId) =>
                      state.completedSteps.includes(depId)
                    );
                    const isLocked = !depsMet && !isCompleted;

                    return (
                      <div
                        key={step.id}
                        className={cn(
                          "p-6 transition-colors",
                          isCompleted ? "bg-slate-50/50" : "bg-white",
                          isLocked ? "opacity-75" : ""
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div className="pt-1.5">
                            <div className={cn(
                              "w-3 h-3 rounded-full mt-1",
                              isCompleted ? "bg-emerald-500" : isStepExpanded ? "bg-amber-500" : "bg-slate-300"
                            )} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div
                              className="cursor-pointer group"
                              onClick={() =>
                                setExpandedStep(isStepExpanded ? null : step.id)
                              }
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <h3
                                    className={cn(
                                      "text-lg font-bold transition-colors",
                                      isCompleted
                                        ? "text-slate-400 line-through decoration-slate-300"
                                        : "text-navy-900 group-hover:text-amber-600"
                                    )}
                                  >
                                    {step.title}
                                  </h3>
                                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                                    {step.id === 1 && age < 18 ? (
                                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                                        <Sparkles className="w-3.5 h-3.5" /> Not required (Under 18). Auto-completed.
                                      </span>
                                    ) : step.id === 6 && state.hasHousing ? (
                                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" /> Housing already sorted. Auto-completed.
                                      </span>
                                    ) : (
                                      step.shortDescription
                                    )}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2 mt-3">
                                    {step.priority === "URGENT" && !isCompleted && (
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 uppercase tracking-wider">
                                        URGENT
                                      </span>
                                    )}
                                    {step.priority === "This week" && !isCompleted && (
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                                        This week
                                      </span>
                                    )}
                                    {step.priority === "Optional" && !isCompleted && (
                                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                                        Optional
                                      </span>
                                    )}
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                                      <Clock className="h-3 w-3" />
                                      {step.timeEstimate}
                                    </span>
                                    {isLocked && (
                                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                                        <AlertCircle className="h-3 w-3" />
                                        Locked
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="shrink-0">
                                  <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors">
                                    {isStepExpanded ? "Close" : "Start Task"}
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Step Details */}
                            {isStepExpanded && (
                              <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-200">
                                {step.id === 1 && age < 18 && (
                                  <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                                    <div className="mt-0.5 bg-emerald-100 p-1.5 rounded-full text-emerald-600 shrink-0">
                                      <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-emerald-900 text-sm">Automatically Completed</h4>
                                      <p className="text-sm text-emerald-800 mt-1">
                                        Because you are under 18, the UAE government does not require you to take a medical fitness test for your Emirates ID. We've marked this step as complete for you!
                                      </p>
                                    </div>
                                  </div>
                                )}
                                {step.id === 6 && state.hasHousing && (
                                  <div className="mb-6 bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
                                    <div className="mt-0.5 bg-emerald-100 p-1.5 rounded-full text-emerald-600 shrink-0">
                                      <Check className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-emerald-900 text-sm">Housing Sorted</h4>
                                      <p className="text-sm text-emerald-800 mt-1">
                                        You mentioned during onboarding that you already have your accommodation sorted. Great job! You can still review the resources below if needed.
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-line">
                                  {step.details.what}
                                </p>

                                {step.details.documentsNeeded.length > 0 && (
                                  <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <h4 className="font-semibold text-navy-900 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                                      <FileText className="w-4 h-4 text-slate-400" />
                                      What you'll need
                                    </h4>
                                    <ul className="space-y-2">
                                      {step.details.documentsNeeded.map((doc, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                          {doc}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {step.details.where && (
                                  <div className="mb-6">
                                    <h4 className="font-semibold text-navy-900 mb-2 text-sm uppercase tracking-wider">
                                      Where to go
                                    </h4>
                                    <p className="text-sm text-slate-600 whitespace-pre-line">{step.details.where}</p>
                                  </div>
                                )}

                                {step.details.process && step.details.process.length > 0 && (
                                  <div className="mb-6">
                                    <h4 className="font-semibold text-navy-900 mb-3 text-sm uppercase tracking-wider">
                                      The Process
                                    </h4>
                                    <div className="space-y-3">
                                      {step.details.process.map((p, i) => (
                                        <div key={i} className="flex gap-3 text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                                          <Checkbox className="mt-0.5 h-4 w-4 rounded data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
                                          <span className="flex-1">{p.replace(/^\d+\.\s*/, '')}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {step.details.proTips && step.details.proTips.length > 0 && (
                                  <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                                    <h4 className="font-semibold text-amber-900 mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
                                      <Sparkles className="w-4 h-4" />
                                      Helpful Tip
                                    </h4>
                                    <p className="text-sm text-amber-800">{step.details.proTips[0]}</p>
                                  </div>
                                )}

                                {step.id === 1 && (
                                  <div className="mb-6">
                                    <DocumentChecker docType="passport_photo" onSuccess={() => {
                                      if (!isCompleted) handleToggleStep(step.id);
                                    }} />
                                  </div>
                                )}

                                {step.id === 2 && (
                                  <div className="mb-6 space-y-6">
                                    <SlotFinder />
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center justify-between">
                                      <div>
                                        <h4 className="font-semibold text-blue-900 mb-1 text-sm flex items-center gap-2">
                                          <Sparkles className="w-4 h-4 text-amber-500" />
                                          Autofill Available
                                        </h4>
                                        <p className="text-xs text-blue-800">We can pre-fill the ICA form using your saved details.</p>
                                      </div>
                                      <button 
                                        onClick={() => setShowEmiratesIDForm(true)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
                                      >
                                        Autofill Form
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {step.id === 4 && (
                                  <div className="mb-6">
                                    <BankMatchmaker />
                                  </div>
                                )}

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                                  {/* Show PDF button for tasks requiring in-person visits */}
                                  {[2, 3, 9].includes(step.id) ? (
                                    <AppointmentPDF taskTitle={step.title} taskDetails={step.details} />
                                  ) : (
                                    <div />
                                  )}
                                  <button 
                                    onClick={() => handleToggleStep(step.id)}
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-colors shadow-sm"
                                  >
                                    {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showEmiratesIDForm && (
        <EmiratesIDForm onClose={() => setShowEmiratesIDForm(false)} />
      )}
    </div>
  );
}
