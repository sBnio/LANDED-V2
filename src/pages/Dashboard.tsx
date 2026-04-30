import { useState, useMemo, useEffect, useRef } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { stepsData } from "@/data/steps";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "motion/react";
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
import { CompletionScreen } from "./CompletionScreen";

const CATEGORIES = [
  { id: "pre_landing", title: "Before You Land", icon: MapPin, stepIds: [], color: "bg-indigo-50 text-indigo-600 border-indigo-100", highlight: "bg-indigo-600" },
  { id: "housing", title: "Housing", icon: Building, stepIds: [6], color: "bg-amber-50 text-amber-600 border-amber-100", highlight: "bg-amber-500" },
  { id: "telecom", title: "Telecom", icon: Smartphone, stepIds: [3], color: "bg-purple-50 text-purple-600 border-purple-100", highlight: "bg-purple-500" },
  { id: "uni", title: "University", icon: GraduationCap, stepIds: [9], color: "bg-rose-50 text-rose-600 border-rose-100", highlight: "bg-rose-500" },
  { id: "visa", title: "Emirates ID", icon: FileText, stepIds: [1, 2], color: "bg-blue-50 text-blue-600 border-blue-100", highlight: "bg-blue-600" },
  { id: "health", title: "Health", icon: Stethoscope, stepIds: [5], color: "bg-emerald-50 text-emerald-600 border-emerald-100", highlight: "bg-emerald-500" },
  { id: "banking", title: "Banking", icon: Landmark, stepIds: [4], color: "bg-cyan-50 text-cyan-600 border-cyan-100", highlight: "bg-cyan-500" },
];

export function Dashboard() {
  const { state, toggleStep } = useOnboarding();
  const [expandedStep, setExpandedStep] = useState<number | string | null>(null);
  const [showEmiratesIDForm, setShowEmiratesIDForm] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["pre_landing", "visa"]);
  const [showCompletion, setShowCompletion] = useState(false);

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
  const progressPercent = Math.min(100, Math.round((completedCount / totalSteps) * 100));
  const prevCompletedCount = useRef(completedCount);

  useEffect(() => {
    if (completedCount === totalSteps && totalSteps > 0 && prevCompletedCount.current !== totalSteps) {
      setShowCompletion(true);
    }
    prevCompletedCount.current = completedCount;
  }, [completedCount, totalSteps]);

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

  if (showCompletion) {
    return <CompletionScreen onBack={() => setShowCompletion(false)} totalTasks={totalSteps} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pb-24 md:pb-12 font-sans selection:bg-blue-500/30">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-200/60 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6 py-8 md:py-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> {state.emirate || "UAE"} <span className="opacity-50">•</span> {state.university || "Student"}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
                Hey {state.name.split(' ')[0] || "User"} 👋
              </h1>
              <p className="text-slate-500 text-lg mt-3 font-medium">
                Your journey to {state.emirate} is {progressPercent}% complete.
              </p>
            </div>
            
            <div className="bg-slate-50/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-100 flex items-center gap-5 shadow-sm transform hover:scale-105 transition-transform cursor-default">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">Status</p>
                  <p className="text-lg font-black text-slate-900 leading-none">Ready to Land</p>
               </div>
               <div className="w-12 h-12 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-600 ring-4 ring-white">
                  <Check className="w-6 h-6 stroke-[3px]" />
               </div>
            </div>
          </div>

          {/* Arriving Soon Banner */}
          <AnimatePresence>
            {daysUntilArrival !== null && daysUntilArrival > 0 && daysUntilArrival < 30 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-600 rounded-[2rem] p-6 md:p-8 text-white mb-8 shadow-2xl shadow-blue-600/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/flight/800/200')] opacity-10 mix-blend-overlay grayscale group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-blue-300" />
                    <span className="font-bold text-blue-200 uppercase tracking-widest text-xs">Arriving Soon</span>
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">You're landing in {daysUntilArrival} days! ✈️</h2>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                      <p className="text-blue-100/90 text-lg leading-relaxed font-medium">
                        Time to wrap up your top priorities. We recommend focusing on your 
                        <span className="font-bold text-white underline decoration-blue-400 decoration-2 underline-offset-4 ml-1">Emirates ID paperwork</span> this week.
                      </p>
                    </div>
                    <div className="flex gap-3">
                       {urgentTasks.map(t => (
                         <div key={t.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[140px] hover:bg-white/20 transition-colors">
                            <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Priority
                            </p>
                            <p className="text-sm font-bold leading-tight">{t.title}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Alerts Section */}
          <div className="space-y-4 mb-10">
            <AnimatePresence>
              {studentConfig.primaryAlert && !dismissedAlerts.includes('primary_alert') && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-blue-50/50 border border-blue-200 rounded-2xl p-5 pr-12 shadow-sm backdrop-blur-sm"
                >
                  <button
                    onClick={() => dismissAlert('primary_alert')}
                    className="absolute top-5 right-5 text-blue-400 hover:text-blue-600 transition-colors bg-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Info className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-blue-950 font-bold mb-1 tracking-tight">{studentConfig.primaryAlert.title}</h3>
                      <p className="text-blue-800 text-sm leading-relaxed font-medium">{studentConfig.primaryAlert.body}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {studentConfig.secondaryAlert && !dismissedAlerts.includes('secondary_alert') && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "relative border rounded-2xl p-5 pr-12 shadow-sm backdrop-blur-sm",
                    studentConfig.secondaryAlert.type === 'warning' && "bg-amber-50/50 border-amber-200",
                    studentConfig.secondaryAlert.type === 'info' && "bg-slate-50 border-slate-200",
                    studentConfig.secondaryAlert.type === 'success' && "bg-emerald-50/50 border-emerald-200"
                  )}
                >
                  <button
                    onClick={() => dismissAlert('secondary_alert')}
                    className={cn(
                      "absolute top-5 right-5 bg-white rounded-full p-1 transition-colors",
                      studentConfig.secondaryAlert.type === 'warning' && "text-amber-400 hover:text-amber-600",
                      studentConfig.secondaryAlert.type === 'info' && "text-slate-400 hover:text-slate-600",
                      studentConfig.secondaryAlert.type === 'success' && "text-emerald-400 hover:text-emerald-600"
                    )}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex gap-4">
                    <div className={cn(
                      "mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      studentConfig.secondaryAlert.type === 'warning' && "bg-amber-100",
                      studentConfig.secondaryAlert.type === 'info' && "bg-slate-100",
                      studentConfig.secondaryAlert.type === 'success' && "bg-emerald-100"
                    )}>
                      {studentConfig.secondaryAlert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {studentConfig.secondaryAlert.type === 'info' && <Info className="w-4 h-4 text-slate-600" />}
                      {studentConfig.secondaryAlert.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={cn(
                          "font-bold tracking-tight",
                          studentConfig.secondaryAlert.type === 'warning' && "text-amber-950",
                          studentConfig.secondaryAlert.type === 'info' && "text-slate-900",
                          studentConfig.secondaryAlert.type === 'success' && "text-emerald-950"
                        )}>
                          {studentConfig.secondaryAlert.title}
                        </h3>
                        {studentConfig.secondaryAlert.verifiedContent && (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-[9px] uppercase font-black px-2 py-0.5 rounded-full tracking-widest border border-green-200">
                            <Check className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-sm leading-relaxed font-medium",
                        studentConfig.secondaryAlert.type === 'warning' && "text-amber-800",
                        studentConfig.secondaryAlert.type === 'info' && "text-slate-600",
                        studentConfig.secondaryAlert.type === 'success' && "text-emerald-800"
                      )}>
                        {studentConfig.secondaryAlert.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress Section */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700" />
            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Onboarding Progress
                </p>
                <p className="text-4xl font-black text-slate-900 tracking-tight">
                  {completedCount} <span className="text-slate-300 font-medium">/ {totalSteps}</span> <span className="text-xl text-slate-400 tracking-normal ml-1">tasks</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-black text-blue-600 leading-none tracking-tighter">{progressPercent}%</p>
              </div>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative z-10 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              />
            </div>
            {completedCount === totalSteps && totalSteps > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => setShowCompletion(true)}
                  className="bg-slate-900 text-white hover:bg-slate-800 font-bold py-3.5 px-8 rounded-full transition-all text-sm flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" /> 
                  VIEW YOUR COMPLETION SUMMARY
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
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

          // Grouping logic: Completed ABOVE incompleted
          const sortedSteps = [...categorySteps].sort((a, b) => {
             const aComp = state.completedSteps.includes(a.id);
             const bComp = state.completedSteps.includes(b.id);
             if (aComp && !bComp) return -1;
             if (!aComp && bComp) return 1;
             return 0;
          });

          return (
            <motion.div 
              key={category.id} 
              layout
              className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 bg-white hover:bg-slate-50/50 transition-colors text-left"
              >
                <div className="flex items-center gap-5">
                  <div className={cn("w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm mix-blend-multiply", category.color)}>
                    <category.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{category.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        {completedInCategory.length} of {totalInCategory} done
                      </span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={false}
                          animate={{ width: `${(completedInCategory.length / totalInCategory) * 100}%` }}
                          className={cn("h-full transition-all duration-500", category.highlight)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-slate-400 bg-slate-50 p-2 rounded-full border border-slate-100">
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 divide-y divide-slate-100/60"
                  >
                    {sortedSteps.map((step: any) => {
                      const isCompleted = state.completedSteps.includes(step.id);
                      const isStepExpanded = expandedStep === step.id;
                      const depsMet = step.dependsOn ? step.dependsOn.every((depId: any) => state.completedSteps.includes(depId)) : true;
                      
                      const autoCompletedLabel = 
                        (step.id === 1 && age < 18) ? "Exempt (Age < 18)" :
                        (step.id === 6 && state.hasAccommodation === 'Yes') ? "Housing Sorted" : null;

                      return (
                        <div key={step.id} className={cn("p-6 md:p-8 transition-colors", isCompleted ? "bg-slate-50/50" : "bg-white hover:bg-slate-50/30")}>
                          <div className="flex items-start gap-5">
                             <button 
                                onClick={() => !autoCompletedLabel && handleToggleStep(step.id)}
                                disabled={!!autoCompletedLabel}
                                className={cn(
                                  "shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all mt-1",
                                  isCompleted ? "bg-slate-900 border-slate-900 text-white" : "border-slate-300 hover:border-blue-500 bg-white"
                                )}
                             >
                                <motion.div
                                  initial={false}
                                  animate={{ scale: isCompleted ? 1 : 0 }}
                                  transition={{ type: "spring", bounce: 0.5 }}
                                >
                                  <Check className="w-5 h-5 stroke-[3px]" />
                                </motion.div>
                             </button>

                             <div className="flex-1 min-w-0">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                   <div>
                                      <h3 
                                        onClick={() => setExpandedStep(isStepExpanded ? null : step.id)}
                                        className={cn(
                                          "text-xl font-bold tracking-tight transition-all cursor-pointer hover:text-blue-600",
                                          isCompleted ? "text-slate-400 line-through" : "text-slate-900"
                                        )}
                                      >
                                        {step.title}
                                      </h3>
                                      <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {step.badge && (
                                          <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border",
                                            step.badgeColor === 'blue' ? "bg-blue-50/50 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-600 border-slate-200"
                                          )}>
                                            {step.badge}
                                          </span>
                                        )}
                                        {autoCompletedLabel && (
                                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                                            <Sparkles className="w-3 h-3 text-emerald-500" /> {autoCompletedLabel}
                                          </span>
                                        )}
                                      </div>
                                   </div>
                                   <div className="flex items-center gap-3">
                                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                         <Clock className="w-3.5 h-3.5" /> {step.timeEstimate}
                                      </span>
                                      <button 
                                        onClick={() => setExpandedStep(isStepExpanded ? null : step.id)}
                                        className="p-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-900"
                                      >
                                        <motion.div animate={{ rotate: isStepExpanded ? 180 : 0 }}>
                                          <ChevronDown className="w-4 h-4" />
                                        </motion.div>
                                      </button>
                                   </div>
                                </div>

                                <p className="text-slate-500 leading-relaxed font-medium mb-3">
                                   {step.shortDescription}
                                </p>

                                <AnimatePresence>
                                  {isStepExpanded && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-8 pt-8 border-t border-slate-100">
                                        <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                          <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                             <Info className="w-4 h-4 text-blue-500" />
                                             Why it matters
                                          </h4>
                                          <p className="text-slate-600 leading-relaxed font-medium text-sm">
                                             {step.whyItMatters || "This is a critical part of your legal onboarding in the UAE."}
                                          </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                                           {step.details?.documentsNeeded?.length > 0 && (
                                             <div>
                                                <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                                   <FileText className="w-3.5 h-3.5 text-slate-400" /> Documents Checklist
                                                </h4>
                                                <ul className="space-y-3">
                                                  {step.details.documentsNeeded.map((doc: any, i: number) => (
                                                    <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium">
                                                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                                                      {doc}
                                                    </li>
                                                  ))}
                                                </ul>
                                             </div>
                                           )}
                                           {step.details?.process?.length > 0 && (
                                             <div>
                                                <h4 className="font-black text-slate-900 text-[10px] uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">How to complete this</h4>
                                                <div className="space-y-4">
                                                  {step.details.process.map((p: any, i: number) => (
                                                    <div key={i} className="flex gap-4 items-start">
                                                       <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                                       <p className="text-sm text-slate-600 leading-relaxed font-medium">{p.replace(/^\d+\.\s*/, '')}</p>
                                                    </div>
                                                  ))}
                                                </div>
                                             </div>
                                           )}
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                                           {!autoCompletedLabel && (
                                             <button 
                                                className={cn(
                                                  "flex-1 h-14 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-sm tracking-widest uppercase",
                                                  isCompleted 
                                                    ? "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200" 
                                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                                                )}
                                                onClick={() => handleToggleStep(step.id)}
                                              >
                                                {isCompleted ? "MARK INCOMPLETE" : "MARK AS DONE"}
                                                {!isCompleted && <ArrowRight className="w-4 h-4 text-white/50" />}
                                              </button>
                                           )}
                                           <button className="flex-1 h-14 bg-white border border-slate-200 text-slate-700 font-black rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-sm tracking-widest uppercase shadow-sm">
                                              <Sparkles className="w-4 h-4 text-amber-500" /> CHAT WITH AI
                                           </button>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
