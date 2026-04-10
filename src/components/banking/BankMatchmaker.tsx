import { useState } from "react";
import { Sparkles, Building, Check, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BankMatchmakerProps {
  onClose?: () => void;
}

export function BankMatchmaker({ onClose }: BankMatchmakerProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    income: "",
    age: "",
    needs: [] as string[],
  });

  const [matchedBank, setMatchedBank] = useState<any>(null);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Calculate match
      let bank = null;
      if (answers.income === "none" || answers.age === "under18") {
        bank = {
          name: "Liv. by Emirates NBD",
          description: "The best digital bank for students with zero minimum balance.",
          pros: ["Zero minimum balance", "100% digital onboarding", "Great app"],
          cons: ["Customer service is chat-only", "No physical branches"],
          link: "https://liv.me"
        };
      } else if (answers.needs.includes("international")) {
        bank = {
          name: "Mashreq Neo",
          description: "Excellent for international transfers and digital banking.",
          pros: ["Free international transfers", "Quick account opening", "Good rewards"],
          cons: ["Requires 3000 AED min balance if not salary transfer"],
          link: "https://www.mashreqneo.com"
        };
      } else {
        bank = {
          name: "ADCB Hayyak",
          description: "Solid traditional bank with a great digital onboarding app.",
          pros: ["Very stable", "Good branch network", "TouchPoints rewards"],
          cons: ["App UI is slightly dated"],
          link: "https://www.adcb.com"
        };
      }
      setMatchedBank(bank);
      setStep(3);
    }
  };

  const toggleNeed = (need: string) => {
    setAnswers(prev => ({
      ...prev,
      needs: prev.needs.includes(need) 
        ? prev.needs.filter(n => n !== need)
        : [...prev.needs, need]
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-navy-900 p-6 text-white relative">
        {onClose && (
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-300" />
          </button>
        )}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold font-heading text-lg">Bank Matchmaker</h3>
            <p className="text-sm text-slate-300">Find the right UAE bank for you</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h4 className="font-bold text-navy-900 mb-4">What is your expected monthly income/allowance?</h4>
              <div className="space-y-3">
                {["None (Student)", "Under 3,000 AED", "3,000 - 5,000 AED", "5,000+ AED"].map((opt, i) => {
                  const val = i === 0 ? "none" : i === 1 ? "under3k" : i === 2 ? "under5k" : "over5k";
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswers({...answers, income: val})}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all",
                        answers.income === val 
                          ? "border-amber-500 bg-amber-50 text-amber-900 font-medium ring-1 ring-amber-500" 
                          : "border-slate-200 hover:border-amber-300 text-slate-700"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button 
              onClick={handleNext} 
              disabled={!answers.income}
              className="w-full bg-navy-900 hover:bg-slate-800 text-white"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h4 className="font-bold text-navy-900 mb-4">How old are you?</h4>
              <div className="space-y-3">
                {["Under 18", "18 - 24", "25+"].map((opt, i) => {
                  const val = i === 0 ? "under18" : i === 1 ? "18to24" : "over25";
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswers({...answers, age: val})}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl border transition-all",
                        answers.age === val 
                          ? "border-amber-500 bg-amber-50 text-amber-900 font-medium ring-1 ring-amber-500" 
                          : "border-slate-200 hover:border-amber-300 text-slate-700"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button 
                onClick={handleNext} 
                disabled={!answers.age}
                className="flex-1 bg-navy-900 hover:bg-slate-800 text-white"
              >
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div>
              <h4 className="font-bold text-navy-900 mb-4">What's most important to you? (Select all that apply)</h4>
              <div className="space-y-3">
                {[
                  { id: "international", label: "Cheap international transfers" },
                  { id: "rewards", label: "Cashback & rewards" },
                  { id: "digital", label: "100% digital (no branches)" },
                  { id: "branches", label: "Physical branches nearby" }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleNeed(opt.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between",
                      answers.needs.includes(opt.id)
                        ? "border-amber-500 bg-amber-50 text-amber-900 font-medium ring-1 ring-amber-500" 
                        : "border-slate-200 hover:border-amber-300 text-slate-700"
                    )}
                  >
                    {opt.label}
                    {answers.needs.includes(opt.id) && <Check className="w-4 h-4 text-amber-600" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Find My Bank
              </Button>
            </div>
          </div>
        )}

        {step === 3 && matchedBank && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Your Best Match</h4>
              <h2 className="text-2xl font-bold text-navy-900 font-heading">{matchedBank.name}</h2>
              <p className="text-slate-600 mt-2">{matchedBank.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h5 className="font-bold text-emerald-900 mb-2 text-sm">Pros</h5>
                <ul className="space-y-1">
                  {matchedBank.pros.map((pro: string, i: number) => (
                    <li key={i} className="text-xs text-emerald-800 flex items-start gap-1.5">
                      <Check className="w-3 h-3 mt-0.5 shrink-0" /> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <h5 className="font-bold text-red-900 mb-2 text-sm">Cons</h5>
                <ul className="space-y-1">
                  {matchedBank.cons.map((con: string, i: number) => (
                    <li key={i} className="text-xs text-red-800 flex items-start gap-1.5">
                      <X className="w-3 h-3 mt-0.5 shrink-0" /> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" onClick={() => { setStep(0); setAnswers({ income: "", age: "", needs: [] }); }} className="flex-1">
                Retake Quiz
              </Button>
              <Button className="flex-1 bg-navy-900 hover:bg-slate-800 text-white" onClick={() => window.open(matchedBank.link, "_blank")}>
                Apply Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
