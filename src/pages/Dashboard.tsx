import { useState, useMemo, useEffect } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { stepsData } from "@/data/steps";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Building,
  Landmark,
  Smartphone,
  GraduationCap,
  Stethoscope,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  X,
  AlertTriangle,
  Info,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { EmiratesIDForm } from "@/components/autofill/EmiratesIDForm";
import { BankMatchmaker } from "@/components/banking/BankMatchmaker";
import { getStudentConfig } from "@/utils/studentConfig";

const CATEGORIES = [
  { id: "pre_landing", title: "Before You Land", icon: MapPin, stepIds: [] },
  { id: "visa", title: "Arrival & Emirates ID", icon: FileText, stepIds: [1, 2] },
  { id: "housing", title: "Housing", icon: Building, stepIds: [6] },
  { id: "banking", title: "Banking", icon: Landmark, stepIds: [4] },
  { id: "telecom", title: "Telecom", icon: Smartphone, stepIds: [3] },
  { id: "uni", title: "University", icon: GraduationCap, stepIds: [9] },
  { id: "health", title: "Health", icon: Stethoscope, stepIds: [5] },
];

export function Dashboard() {
  const { state, toggleStep } = useOnboarding();
  const [expandedStep, setExpandedStep] = useState<number | string | null>(null);
  const [showEmiratesIDForm, setShowEmiratesIDForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["pre_landing", "visa"]);

  const studentConfig = useMemo(() => getStudentConfig(state.nationality || "", state.university || ""), [state.nationality, state.university]);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>(() => {
    const saved = localStorage.getItem("landed_dismissed_alerts");
    return saved ? JSON.parse(saved) : [];
  });

  const dismissAlert = (id: string) => {
    setDismissedAlerts(prev => {
      const next = [...prev, id];
      localStorage.setItem("landed_dismissed_alerts", JSON.stringify(next));
      return next;
    });
  };

  const completedCount = state.completedSteps.length;
  // Calculate total steps including personalized additional tasks and priority task
  const totalSteps = stepsData.length + studentConfig.additionalTasks.length + (studentConfig.priorityTask ? 1 : 0);
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  // Age calculation
  const age = useMemo(() => {
    if (!state.dateOfBirth) return 20;
    const [year, month, day] = state.dateOfBirth.split("-").map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  }, [state.dateOfBirth]);

  // Handle auto-completion for medical test and housing
  useEffect(() => {
    if (age < 18 && !state.completedSteps.includes(1)) {
       toggleStep(1);
    }
    if (state.hasAccommodation === 'Yes' && !state.completedSteps.includes(6)) {
       toggleStep(6);
    }
  }, [age, state.hasAccommodation, state.completedSteps, toggleStep]);

  const handleToggleStep = (id: number | string) => {
    const isCompleting = !state.completedSteps.includes(id);
    toggleStep(id);
    if (isCompleting) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563EB", "#16A34A", "#D97706"],
      });
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const daysUntilArrival = useMemo(() => {
    if (!state.arrivalDate) return null;
    const arrival = new Date(state.arrivalDate);
    const today = new Date();
    const diffTime = arrival.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [state.arrivalDate]);

  const urgentTasks = useMemo(() => {
    return stepsData.filter(s => 
      !state.completedSteps.includes(s.id) && 
      (s.priority === "URGENT" || s.id === 2 || s.id === 1)
    ).slice(0, 2);
  }, [state.completedSteps]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12 font-sans">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> {state.emirate || "UAE"} • {state.university || "Student"}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Hey {state.name.split(' ')[0] || "User"} 👋
              </h1>
              <p className="text-slate-500 text-lg mt-2">
                Your journey to {state.emirate} is {progressPercent}% complete.
              </p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 shadow-sm">
               <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-xl font-bold text-slate-900 leading-none">Ready to Land</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Check className="w-7 h-7" />
               </div>
            </div>
          </div>

          {/* Arriving Soon Banner */}
          {daysUntilArrival !== null && daysUntilArrival > 0 && daysUntilArrival < 30 && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white mb-10 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-200" />
                  <span className="font-bold text-blue-100 uppercase tracking-widest text-sm">Arriving Soon</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">You're landing in {daysUntilArrival} days! ✈️</h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Time to wrap up your top priorities. We recommend focusing on your 
                      <span className="font-bold text-white"> Emirates ID paperwork</span> this week.
                    </p>
                  </div>
                  <div className="flex gap-2">
                     {urgentTasks.map(t => (
                       <div key={t.id} className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/20 min-w-[120px]">
                          <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Priority</p>
                          <p className="text-sm font-bold truncate">{t.title}</p>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alerts Section */}
          <div className="space-y-4 mb-10">
            {studentConfig.primaryAlert && !dismissedAlerts.includes('primary_alert') && (
              <div className="relative bg-blue-50 border-l-4 border-blue-500 rounded-lg p-5 pr-12 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                <button
                  onClick={() => dismissAlert('primary_alert')}
                  className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    <Info className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-blue-900 font-bold mb-1">{studentConfig.primaryAlert.title}</h3>
                    <p className="text-blue-800 text-sm leading-relaxed">{studentConfig.primaryAlert.body}</p>
                  </div>
                </div>
              </div>
            )}

            {studentConfig.secondaryAlert && !dismissedAlerts.includes('secondary_alert') && (
              <div 
                className={cn(
                  "relative border-l-4 rounded-lg p-5 pr-12 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500",
                  studentConfig.secondaryAlert.type === 'warning' && "bg-amber-50 border-amber-500",
                  studentConfig.secondaryAlert.type === 'info' && "bg-blue-50 border-blue-500",
                  studentConfig.secondaryAlert.type === 'success' && "bg-emerald-50 border-emerald-500"
                )}
              >
                <button
                  onClick={() => dismissAlert('secondary_alert')}
                  className={cn(
                    "absolute top-4 right-4 transition-colors",
                    studentConfig.secondaryAlert.type === 'warning' && "text-amber-400 hover:text-amber-600",
                    studentConfig.secondaryAlert.type === 'info' && "text-blue-400 hover:text-blue-600",
                    studentConfig.secondaryAlert.type === 'success' && "text-emerald-400 hover:text-emerald-600"
                  )}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    {studentConfig.secondaryAlert.type === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-500" />}
                    {studentConfig.secondaryAlert.type === 'info' && <Info className="w-6 h-6 text-blue-500" />}
                    {studentConfig.secondaryAlert.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={cn(
                        "font-bold",
                        studentConfig.secondaryAlert.type === 'warning' && "text-amber-900",
                        studentConfig.secondaryAlert.type === 'info' && "text-blue-900",
                        studentConfig.secondaryAlert.type === 'success' && "text-emerald-900"
                      )}>
                        {studentConfig.secondaryAlert.title}
                      </h3>
                      {studentConfig.secondaryAlert.verifiedContent && (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      studentConfig.secondaryAlert.type === 'warning' && "text-amber-800",
                      studentConfig.secondaryAlert.type === 'info' && "text-blue-800",
                      studentConfig.secondaryAlert.type === 'success' && "text-emerald-800"
                    )}>
                      {studentConfig.secondaryAlert.body}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress Section */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Onboarding Progress</p>
                <p className="text-3xl font-black text-slate-900">
                  {completedCount} / {totalSteps} <span className="text-slate-300">tasks</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-blue-600 leading-none">{progressPercent}%</p>
                <p className="text-xs font-bold text-slate-400 mt-1">Completion</p>
              </div>
            </div>
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {CATEGORIES.map((category) => {
          let categorySteps = stepsData.filter((s) => category.stepIds.includes(s.id));

          if (category.id === "pre_landing") {
            const extraSteps: any[] = [];
            if (studentConfig.priorityTask) {
              extraSteps.push({
                ...studentConfig.priorityTask,
                shortDescription: studentConfig.priorityTask.description,
                timeEstimate: studentConfig.priorityTask.timeline || "Action Required",
                dependsOn: [],
                details: { documentsNeeded: [], process: [] }
              });
            }
            if (studentConfig.additionalTasks && studentConfig.additionalTasks.length > 0) {
              const mappedTasks = studentConfig.additionalTasks.map(task => ({
                ...task,
                shortDescription: task.description || "",
                timeEstimate: task.timeline || "Action Required",
                dependsOn: [],
                details: { documentsNeeded: [], process: [] }
              }));
              extraSteps.push(...mappedTasks);
            }
            categorySteps = [...extraSteps, ...categorySteps] as any;
          }

          if (categorySteps.length === 0) return null;

          const completedInCategory = categorySteps.filter((s) => state.completedSteps.includes(s.id));
          const totalInCategory = categorySteps.length;
          const isExpanded = expandedCategories.includes(category.id);

          // Grouping logic: Completed ABOVE incompleted (per Request 4)
          const sortedSteps = [...categorySteps].sort((a, b) => {
             const aComp = state.completedSteps.includes(a.id);
             const bComp = state.completedSteps.includes(b.id);
             if (aComp && !bComp) return -1;
             if (!aComp && bComp) return 1;
             return 0;
          });

          return (
            <div key={category.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-8 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                    <category.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{category.title}</h2>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm font-bold text-slate-500">
                        {completedInCategory.length} of {totalInCategory} done
                      </span>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${(completedInCategory.length / totalInCategory) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="h-7 w-7" /> : <ChevronDown className="h-7 w-7" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 divide-y divide-slate-50">
                  {sortedSteps.map((step: any) => {
                    const isCompleted = state.completedSteps.includes(step.id);
                    const isStepExpanded = expandedStep === step.id;
                    const depsMet = step.dependsOn ? step.dependsOn.every((depId: any) => state.completedSteps.includes(depId)) : true;
                    const isLocked = !depsMet && !isCompleted;
                    
                    // Specific logic for medical test & housing auto-complete labels
                    const autoCompletedLabel = 
                      (step.id === 1 && age < 18) ? "Exempt (Age < 18)" :
                      (step.id === 6 && state.hasAccommodation === 'Yes') ? "Housing Sorted" : null;

                    return (
                      <div key={step.id} className={cn("p-8 transition-all", isCompleted ? "bg-slate-50/40" : "bg-white")}>
                        <div className="flex items-start gap-6">
                           <div 
                              onClick={() => !autoCompletedLabel && handleToggleStep(step.id)}
                              className={cn(
                                "shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer mt-1",
                                isCompleted ? "bg-green-600 border-green-600 text-white" : "border-slate-200 hover:border-blue-400"
                              )}
                           >
                              {isCompleted && <Check className="w-4 h-4 stroke-[3px]" />}
                           </div>

                           <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                 <div>
                                    <h3 
                                      className={cn(
                                        "text-xl font-bold tracking-tight transition-all",
                                        isCompleted ? "text-slate-400 line-through" : "text-slate-900"
                                      )}
                                    >
                                      {step.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                      {step.badge && (
                                        <span className={cn(
                                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                          step.badgeColor === 'blue' ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-slate-50 text-slate-700 border-slate-200"
                                        )}>
                                          {step.badge}
                                        </span>
                                      )}
                                      {autoCompletedLabel && (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                          <Sparkles className="w-3 h-3" /> {autoCompletedLabel}
                                        </span>
                                      )}
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                                       <Clock className="w-3.5 h-3.5" /> {step.timeEstimate}
                                    </span>
                                    <button 
                                      onClick={() => setExpandedStep(isStepExpanded ? null : step.id)}
                                      className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                                    >
                                      {isStepExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </button>
                                 </div>
                              </div>

                              <p className="text-slate-600 leading-relaxed mb-4">
                                 {step.shortDescription}
                              </p>

                              {isStepExpanded && (
                                <div className="mt-8 pt-8 border-t border-slate-100 animate-in slide-in-from-top-4 fade-in duration-300">
                                  <div className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                                    <h4 className="font-black text-blue-900 text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                       <Sparkles className="w-4 h-4 text-blue-600" />
                                       Why it matters
                                    </h4>
                                    <p className="text-slate-700 leading-relaxed font-medium">
                                       {step.whyItMatters || "This is a critical part of your legal onboarding in the UAE."}
                                    </p>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                                     {step.details?.documentsNeeded?.length > 0 && (
                                       <div>
                                          <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                             <FileText className="w-4 h-4 text-slate-400" /> Documents Checklist
                                          </h4>
                                          <ul className="space-y-3">
                                            {step.details.documentsNeeded.map((doc: any, i: number) => (
                                              <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                                {doc}
                                              </li>
                                            ))}
                                          </ul>
                                       </div>
                                     )}
                                     {step.details?.process?.length > 0 && (
                                       <div>
                                          <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4">How to complete this</h4>
                                          <div className="space-y-4">
                                            {step.details.process.map((p: any, i: number) => (
                                              <div key={i} className="flex gap-4 items-start p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                                 <span className="text-blue-600 font-black text-lg">{i + 1}</span>
                                                 <p className="text-sm text-slate-700 leading-relaxed font-medium">{p.replace(/^\d+\.\s*/, '')}</p>
                                              </div>
                                            ))}
                                          </div>
                                       </div>
                                     )}
                                  </div>

                                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
                                     <button 
                                        className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                        onClick={() => handleToggleStep(step.id)}
                                      >
                                        {isCompleted ? "MARK INCOMPLETE" : "MARK AS DONE"}
                                        {!isCompleted && <ArrowRight className="w-5 h-5" />}
                                     </button>
                                     <button className="flex-1 h-14 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                        CHAT WITH AI ASSISTANT
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
    </div>
  );
}
