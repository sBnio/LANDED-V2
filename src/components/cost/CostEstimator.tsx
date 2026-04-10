import { useState, useMemo } from "react";
import { Calculator, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";

export function CostEstimator() {
  const { state } = useOnboarding();
  const [isExpanded, setIsExpanded] = useState(false);

  const costs = useMemo(() => {
    const isDubai = state.emirate === "Dubai";
    
    return [
      {
        category: "Visa & Identity",
        items: [
          { name: "Student Visa (1 Year)", amount: isDubai ? 1500 : 1200, required: true },
          { name: "Emirates ID", amount: 370, required: true },
          { name: "Medical Fitness Test", amount: 320, required: true },
          { name: "Typing Center Fees", amount: 150, required: false },
        ]
      },
      {
        category: "Housing & Setup",
        items: [
          { name: "Ejari Registration", amount: 220, required: false },
          { name: "DEWA Activation", amount: 2130, required: false }, // 2000 deposit + 130 activation
          { name: "SIM Card (Student)", amount: 55, required: true },
        ]
      }
    ];
  }, [state.emirate]);

  const totalRequired = useMemo(() => {
    return costs.reduce((acc, cat) => 
      acc + cat.items.filter(i => i.required).reduce((sum, item) => sum + item.amount, 0)
    , 0);
  }, [costs]);

  const totalOptional = useMemo(() => {
    return costs.reduce((acc, cat) => 
      acc + cat.items.filter(i => !i.required).reduce((sum, item) => sum + item.amount, 0)
    , 0);
  }, [costs]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div 
        className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <Calculator className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-navy-900">Cost Estimator</h3>
            <p className="text-xs text-slate-500">Estimated setup costs</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-bold text-navy-900">{totalRequired.toLocaleString()} AED</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Required</p>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              Prices are estimates based on standard {state.emirate || "UAE"} rates. Actual costs may vary slightly depending on your university and specific typing center.
            </p>
          </div>

          {costs.map((category, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-sm text-slate-700 mb-3 border-b border-slate-100 pb-2">
                {category.category}
              </h4>
              <div className="space-y-2">
                {category.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.required ? "bg-red-400" : "bg-slate-300"
                      )} />
                      <span className={item.required ? "text-slate-700" : "text-slate-500"}>
                        {item.name}
                      </span>
                    </div>
                    <span className="font-medium text-slate-700">{item.amount.toLocaleString()} AED</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-slate-500">Total Required</span>
              <span className="font-bold text-navy-900">{totalRequired.toLocaleString()} AED</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-slate-500">Total Optional/Deposits</span>
              <span className="font-medium text-slate-500">{totalOptional.toLocaleString()} AED</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-navy-900">Estimated Total</span>
              <span className="font-bold text-emerald-600 text-lg">{(totalRequired + totalOptional).toLocaleString()} AED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
