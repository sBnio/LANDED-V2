import { useState, useMemo } from "react";
import { 
  Calculator, 
  Info, 
  CheckCircle2, 
  Copy,
  Printer,
  ChevronDown,
  ChevronUp,
  Landmark,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { useCurrency } from "@/hooks/useCurrency";

// LANDED BUDGET PLANNER — Costs last verified: 2025
// Update this object when UAE government fees change
// Sources: GDRFA Dubai, ICA, DEWA official fee schedules
const COSTS = {
  VISA: 1500,
  EID: 370,
  MEDICAL: 320,
  TYPING_MIN: 100,
  TYPING_MAX: 200,
  TYPING_MID: 150,
  EJARI: 220,
  DEWA: 2130,
  SIM: 55,
  HEALTH_MIN: 800,
  HEALTH_MAX: 1200,
  HEALTH_MID: 1000,
  AIRPORT_MIN: 80,
  AIRPORT_MAX: 150,
  AIRPORT_MID: 115,
  GROCERIES_MIN: 300,
  GROCERIES_MAX: 600,
  GROCERIES_MID: 450,
  TEXTBOOKS_MIN: 200,
  TEXTBOOKS_MAX: 600,
  TEXTBOOKS_MID: 400,
  EMERGENCY: 500,
  LAPTOP_MIN: 2000,
  LAPTOP_MAX: 5000,
  LAPTOP_MID: 3500,
};

export function BudgetPlanner() {
  const { state } = useOnboarding();
  const { formatAmt, currencyCode } = useCurrency();
  const [showToast, setShowToast] = useState(false);
  
  // Section 1: Visa & Identity
  const [paidVisa, setPaidVisa] = useState(false);
  const [paidEid, setPaidEid] = useState(false);
  
  // Medical Fitness Logic
  const getAge = (dob: string | null) => {
    if (!dob) return 20; // Default assuming adult
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  const age = getAge(state.dateOfBirth);
  const isUnder18 = age < 18;
  const [medicalStatus, setMedicalStatus] = useState<"need" | "done" | "exempt">(isUnder18 ? "exempt" : "need");
  const [paidTyping, setPaidTyping] = useState(false);

  // Section 2: Housing & Setup
  type LivingSituation = "uni" | "private" | "shared" | "family" | "";
  const [livingSituation, setLivingSituation] = useState<LivingSituation>("");
  
  const [paidEjari, setPaidEjari] = useState(false);
  const [paidDewa, setPaidDewa] = useState(false);
  const [paidSim, setPaidSim] = useState(false);

  // Section 3: Optional & Personal Costs
  const [showOptionals, setShowOptionals] = useState(false);
  const [incHealth, setIncHealth] = useState(false);
  const [incAirport, setIncAirport] = useState(false);
  const [incGroceries, setIncGroceries] = useState(false);
  const [incTextbooks, setIncTextbooks] = useState(false);
  const [incEmergency, setIncEmergency] = useState(false);
  const [incLaptop, setIncLaptop] = useState(false);

  // Calculations
  const { stillToPay, alreadySorted, fullEstimate, breakdown } = useMemo(() => {
    let toPay = 0;
    let sorted = 0;
    let optionalsAmount = 0;

    const bd = {
      visa: 0,
      housing: 0,
      optional: 0,
    };

    // --- Section 1: Visa & Identity ---
    if (paidVisa) sorted += COSTS.VISA; else toPay += COSTS.VISA;
    bd.visa += COSTS.VISA;
    
    if (paidEid) sorted += COSTS.EID; else toPay += COSTS.EID;
    bd.visa += COSTS.EID;
    
    if (medicalStatus === "done" || medicalStatus === "exempt") sorted += COSTS.MEDICAL; else toPay += COSTS.MEDICAL;
    bd.visa += COSTS.MEDICAL;

    if (paidTyping) sorted += COSTS.TYPING_MID; else toPay += COSTS.TYPING_MID;
    bd.visa += COSTS.TYPING_MID;

    // --- Section 2: Housing & Setup ---
    let showEjari = livingSituation === "private" || livingSituation === "shared";
    let showDewa = livingSituation === "private";

    if (showEjari) {
      if (paidEjari) sorted += COSTS.EJARI; else toPay += COSTS.EJARI;
      bd.housing += COSTS.EJARI;
    }
    
    if (showDewa) {
      if (paidDewa) sorted += COSTS.DEWA; else toPay += COSTS.DEWA;
      bd.housing += COSTS.DEWA;
    }

    if (paidSim) sorted += COSTS.SIM; else toPay += COSTS.SIM;
    bd.housing += COSTS.SIM;

    // --- Section 3: Optional ---
    if (incHealth) optionalsAmount += COSTS.HEALTH_MID;
    if (incAirport) optionalsAmount += COSTS.AIRPORT_MID;
    if (incGroceries) optionalsAmount += COSTS.GROCERIES_MID;
    if (incTextbooks) optionalsAmount += COSTS.TEXTBOOKS_MID;
    if (incEmergency) optionalsAmount += COSTS.EMERGENCY;
    if (incLaptop) optionalsAmount += COSTS.LAPTOP_MID;
    
    bd.optional = optionalsAmount;

    return {
      stillToPay: toPay,
      alreadySorted: sorted,
      fullEstimate: toPay + optionalsAmount,
      breakdown: bd,
    };
  }, [
    paidVisa, paidEid, medicalStatus, paidTyping,
    livingSituation, paidEjari, paidDewa, paidSim,
    incHealth, incAirport, incGroceries, incTextbooks, incEmergency, incLaptop
  ]);

  const handleCopy = () => {
    const uni = state.university || "UAE";
    const nat = state.nationality || "Student";
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    
    const situationMap: Record<string, string> = {
      "uni": "University accommodation / dormitory",
      "private": "Private apartment — renting alone",
      "shared": "Shared apartment with other students",
      "family": "With family or relatives",
      "": "Not specified"
    };

    const text = `My Dubai Setup Budget — ${nat} student at ${uni}
Generated by Landed on ${date}

─────────────────────────
STILL TO PAY: ${formatAmt(stillToPay)} ${currencyCode}
ALREADY SORTED: ${formatAmt(alreadySorted)} ${currencyCode}  
FULL ESTIMATE (with optionals): ${formatAmt(fullEstimate)} ${currencyCode}
─────────────────────────

Visa & Identity: ${formatAmt(breakdown.visa)} ${currencyCode}
Housing & Setup: ${formatAmt(breakdown.housing)} ${currencyCode}
Optional Costs: ${formatAmt(breakdown.optional)} ${currencyCode}

Living situation: ${situationMap[livingSituation]}
─────────────────────────
Landed — UAE Student Onboarding Platform
landed-v2.vercel.app

Note: These are estimates based on standard Dubai rates (2025). 
Always verify with official sources before paying.`;

    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper for university health check
  const uniName = state.university || "";
  const includesHealth = ["UOWD", "AUS", "AUD", "University of Wollongong Dubai"].some(u => uniName.includes(u));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-32">
      {/* Add print styles inline or handled by global CSS, but we can do a print: wrapper trick if needed. 
          Usually we just rely on index.css print block. We will add specific print classes. */}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Budget Planner</h1>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-3xl">
          Your personalized cost breakdown for Dubai — based on your profile as an <span className="font-bold text-slate-700">{state.nationality || "International"}</span> student at <span className="font-bold text-slate-700">{state.university || "your university"}</span>.
        </p>
      </div>

      {/* Summary Banner */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-600 rounded-2xl p-5 sm:p-6 text-white shadow-xl shadow-blue-600/20 flex flex-col justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-blue-200 mb-1">Still To Pay</span>
            <span className="text-3xl sm:text-4xl font-black">{formatAmt(stillToPay)} <span className="text-base sm:text-lg font-bold text-blue-300">{currencyCode}</span></span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-center shadow-lg shadow-emerald-100/50">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Already Sorted</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-700">{formatAmt(alreadySorted)} <span className="text-sm font-bold text-emerald-500">{currencyCode}</span></span>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-center shadow-md">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Your Full Estimate</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{formatAmt(fullEstimate)} <span className="text-sm font-bold text-slate-400">{currencyCode}</span></span>
          </div>
        </div>
        
        <div className="mt-4 bg-sky-50 border border-sky-100 p-4 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
          <p className="text-xs sm:text-sm text-sky-800 leading-relaxed font-medium">
            These figures are based on real UAE government fees and standard Dubai market rates (2025). Your actual costs depend on your choices and situation. Always confirm fees with your university, GDRFA, and service providers before paying. Landed provides this for planning purposes only.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section 1: Visa & Identity */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Visa & Identity</h2>
            <p className="text-sm text-slate-500 font-medium">Official government fees — these are fixed rates</p>
          </div>
          
          <div className="p-5 sm:p-6 divide-y divide-slate-100">
            {/* Visa */}
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">Student Visa (1 Year)</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">Required</span>
                  <div className="group relative hidden sm:inline-block">
                    <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Sponsorship fee paid to GDRFA Dubai. Amount may vary slightly by university and visa type.
                    </div>
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidVisa} onChange={(e) => setPaidVisa(e.target.checked)} />
                    {paidVisa && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">Already paid by my university or sponsor</span>
                </label>
              </div>
              <div className="sm:text-right shrink-0">
                <span className={cn("font-black text-lg transition-colors", paidVisa ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                  {formatAmt(COSTS.VISA)} {currencyCode}
                </span>
              </div>
            </div>

            {/* Emirates ID */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">Emirates ID</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">Required</span>
                  <div className="group relative hidden sm:inline-block">
                    <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Federal Identity Authority fee. Required for all UAE residents including students.
                    </div>
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidEid} onChange={(e) => setPaidEid(e.target.checked)} />
                    {paidEid && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">Already paid</span>
                </label>
              </div>
              <div className="sm:text-right shrink-0">
                <span className={cn("font-black text-lg transition-colors", paidEid ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                  {formatAmt(COSTS.EID)} {currencyCode}
                </span>
              </div>
            </div>

            {/* Medical Fitness */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">Medical Fitness Test</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">Required</span>
                  <div className="group relative hidden sm:inline-block">
                    <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Required before Emirates ID issuance. Some universities have on-campus testing.
                    </div>
                  </div>
                </div>
                
                {isUnder18 && medicalStatus === "exempt" && (
                  <div className="mt-2 mb-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-md text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Auto-detected: Exempt based on your age
                  </div>
                )}

                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group w-max">
                    <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors", medicalStatus === "need" ? "border-blue-600" : "border-slate-300")}>
                      {medicalStatus === "need" && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700">I still need to do this</span>
                    <input type="radio" className="hidden" name="medical" checked={medicalStatus === "need"} onChange={() => setMedicalStatus("need")} />
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group w-max">
                    <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors", medicalStatus === "done" ? "border-blue-600" : "border-slate-300")}>
                      {medicalStatus === "done" && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Already completed</span>
                    <input type="radio" className="hidden" name="medical" checked={medicalStatus === "done"} onChange={() => setMedicalStatus("done")} />
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group w-max">
                    <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors", medicalStatus === "exempt" ? "border-blue-600" : "border-slate-300")}>
                      {medicalStatus === "exempt" && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                    </div>
                    <span className="text-sm font-medium text-slate-700">Exempt — I am under 18</span>
                    <input type="radio" className="hidden" name="medical" checked={medicalStatus === "exempt"} onChange={() => setMedicalStatus("exempt")} disabled={isUnder18} />
                  </label>
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <span className={cn("font-black text-lg transition-colors", (medicalStatus === "done" || medicalStatus === "exempt") ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                  {formatAmt(COSTS.MEDICAL)} {currencyCode}
                </span>
              </div>
            </div>

            {/* Typing Center */}
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">Typing Center Fees</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">Required</span>
                  <div className="group relative hidden sm:inline-block">
                    <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Fees for document typing and submission services. Varies by typing center location.
                    </div>
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 mt-2 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                    <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidTyping} onChange={(e) => setPaidTyping(e.target.checked)} />
                    {paidTyping && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <span className="text-sm text-slate-600 font-medium">Already paid</span>
                </label>
              </div>
              <div className="sm:text-right shrink-0">
                <span className={cn("font-black text-lg transition-colors", paidTyping ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                  ~{formatAmt(COSTS.TYPING_MIN)}–{formatAmt(COSTS.TYPING_MAX)} {currencyCode}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Housing & Setup */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50">
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Housing & Setup</h2>
            <p className="text-sm text-slate-500 font-medium">Depends on your living situation — tell us below</p>
          </div>

          <div className="p-5 sm:p-6 border-b border-slate-100 bg-blue-50/30">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Where will you be living in Dubai?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "uni", label: "University accommodation / dormitory" },
                { id: "private", label: "Private apartment — renting alone" },
                { id: "shared", label: "Shared apartment with other students" },
                { id: "family", label: "With family or relatives" },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setLivingSituation(opt.id as LivingSituation)}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all",
                    livingSituation === opt.id 
                      ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" 
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6 divide-y divide-slate-100">
            
            {livingSituation === "" && (
               <div className="text-center py-4 text-slate-500 font-medium text-sm">
                 Please select your living situation above to see housing setup costs.
               </div>
            )}

            {livingSituation === "uni" && (
              <div className="py-4 bg-emerald-50 rounded-xl px-4 border border-emerald-100 mb-4">
                <p className="text-sm font-bold text-emerald-800">
                 Great — Ejari and DEWA are not required for university housing. We've removed them from your estimate.
                </p>
              </div>
            )}

            {livingSituation === "family" && (
              <div className="py-4 bg-emerald-50 rounded-xl px-4 border border-emerald-100 mb-4">
                <p className="text-sm font-bold text-emerald-800">
                 Living with family — housing setup costs removed from your estimate.
                </p>
              </div>
            )}

            {(livingSituation === "private" || livingSituation === "shared") && (
              <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">Ejari Registration</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-sm">Conditional</span>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Mandatory rental contract registration in Dubai. Required if you sign your own tenancy agreement.
                      </div>
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 mt-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidEjari} onChange={(e) => setPaidEjari(e.target.checked)} />
                      {paidEjari && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Already registered / not applicable</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-lg transition-colors", paidEjari ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                    {formatAmt(COSTS.EJARI)} {currencyCode}
                  </span>
                </div>
              </div>
            )}

            {livingSituation === "private" && (
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">DEWA Activation <span className="text-slate-500 font-medium">(Electricity & Water Deposit)</span></h3>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm flex items-center gap-1">
                      ♻ Refundable
                    </span>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Security deposit to activate Dubai Electricity and Water Authority services. Fully refundable when you leave the UAE. This is not a fee — you get it back.
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-teal-700 font-bold mb-3 mt-1 underline decoration-teal-200 underline-offset-2">This is a refundable deposit, not a fee. You will get this money back when you leave the UAE.</p>
                  
                  <label className="inline-flex items-center gap-2 mt-1 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidDewa} onChange={(e) => setPaidDewa(e.target.checked)} />
                      {paidDewa && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Not applicable to my situation</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-lg transition-colors", paidDewa ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                    {formatAmt(COSTS.DEWA)} {currencyCode}
                  </span>
                </div>
              </div>
            )}
            
            {livingSituation === "shared" && (
              <div className="py-2">
                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 inline-block">
                   <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-slate-700 text-sm">DEWA Activation</span>
                     <div className="group relative hidden sm:inline-block">
                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          In shared apartments, DEWA is usually split or handled by the main tenant.
                        </div>
                      </div>
                   </div>
                   <p className="text-xs text-slate-500 font-medium">Check with your landlord or flatmates — usually split or handled by main tenant.</p>
                 </div>
              </div>
            )}

            {livingSituation !== "" && (
              <div className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">SIM Card (Student Plan)</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-red-100 text-red-700 px-2 py-0.5 rounded-sm">Required</span>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Basic prepaid SIM from du or e&. Student plans available from both providers.
                      </div>
                    </div>
                  </div>
                  <label className="inline-flex items-center gap-2 mt-2 cursor-pointer group">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={paidSim} onChange={(e) => setPaidSim(e.target.checked)} />
                      {paidSim && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Already have a UAE SIM</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-lg transition-colors", paidSim ? "text-slate-300 line-through decoration-2" : "text-slate-900")}>
                    {formatAmt(COSTS.SIM)} {currencyCode}
                  </span>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Section 3: Optional & Personal Costs */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div 
            className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50 cursor-pointer flex items-center justify-between group select-none"
            onClick={() => setShowOptionals(!showOptionals)}
          >
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Optional & Personal Costs</h2>
              <p className="text-sm text-slate-500 font-medium">Add what applies to you — these are real costs many students don't plan for</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
              {showOptionals ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5 text-slate-600" />}
            </div>
          </div>

          {!showOptionals ? (
            <div className="p-6 text-center bg-white">
               <button 
                 onClick={() => setShowOptionals(true)}
                 className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors"
               >
                 ＋ Add more costs to my estimate
               </button>
            </div>
          ) : (
            <div className="p-5 sm:p-6 divide-y divide-slate-100 text-sm">
              
              {/* Health Insurance */}
              <div className={cn("py-4 first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incHealth ? "bg-blue-50/50" : "")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incHealth ? "text-blue-900" : "text-slate-900")}>Health Insurance</h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Many UAE universities include basic health insurance. Check with your Student Affairs office before purchasing separately. Required for visa compliance.
                      </div>
                    </div>
                  </div>
                  {includesHealth && (
                    <p className="text-[11px] text-amber-600 font-bold mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded-md border border-amber-100 mb-2">
                       Your university may include this — check before adding
                    </p>
                  )}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incHealth} onChange={(e) => setIncHealth(e.target.checked)} />
                      {incHealth && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Include in my estimate</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incHealth ? "text-blue-900" : "text-slate-700")}>
                    ~{formatAmt(COSTS.HEALTH_MIN)}–{formatAmt(COSTS.HEALTH_MAX)} {currencyCode}/yr
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block">adds ~{formatAmt(COSTS.HEALTH_MID)} {currencyCode}</span>
                </div>
              </div>

              {/* Airport Transfer */}
              <div className={cn("py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incAirport ? "bg-blue-50/50" : "")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incAirport ? "text-blue-900" : "text-slate-900")}>Airport Transfer (Arrival)</h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Standard taxi or Careem from DXB to Dubai Knowledge Park area. Metro option available ~{formatAmt(15)} {currencyCode}.
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incAirport} onChange={(e) => setIncAirport(e.target.checked)} />
                      {incAirport && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Include in my estimate</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incAirport ? "text-blue-900" : "text-slate-700")}>
                    ~{formatAmt(COSTS.AIRPORT_MIN)}–{formatAmt(COSTS.AIRPORT_MAX)} {currencyCode}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block">adds ~{formatAmt(COSTS.AIRPORT_MID)} {currencyCode}</span>
                </div>
              </div>

              {/* Groceries */}
              <div className={cn("py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incGroceries ? "bg-blue-50/50" : "")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incGroceries ? "text-blue-900" : "text-slate-900")}>Initial Groceries & Home Setup</h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        First week essentials — food, cleaning supplies, basic household items.
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incGroceries} onChange={(e) => setIncGroceries(e.target.checked)} />
                      {incGroceries && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Include in my estimate</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incGroceries ? "text-blue-900" : "text-slate-700")}>
                    ~{formatAmt(COSTS.GROCERIES_MIN)}–{formatAmt(COSTS.GROCERIES_MAX)} {currencyCode}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block">adds ~{formatAmt(COSTS.GROCERIES_MID)} {currencyCode}</span>
                </div>
              </div>

              {/* Textbooks */}
              <div className={cn("py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incTextbooks ? "bg-blue-50/50" : "")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incTextbooks ? "text-blue-900" : "text-slate-900")}>Textbooks & Stationery <span className="font-medium text-slate-500">(First Semester)</span></h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Varies significantly by course. Check if your university library has copies first.
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incTextbooks} onChange={(e) => setIncTextbooks(e.target.checked)} />
                      {incTextbooks && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">Include in my estimate</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incTextbooks ? "text-blue-900" : "text-slate-700")}>
                    ~{formatAmt(COSTS.TEXTBOOKS_MIN)}–{formatAmt(COSTS.TEXTBOOKS_MAX)} {currencyCode}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block">adds ~{formatAmt(COSTS.TEXTBOOKS_MID)} {currencyCode}</span>
                </div>
              </div>

              {/* Emergency Buffer */}
              <div className={cn("py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incEmergency ? "bg-amber-100 border-amber-200" : "bg-yellow-50 bg-opacity-50")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incEmergency ? "text-amber-900" : "text-amber-800")}>Emergency Buffer</h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-amber-500 cursor-help opacity-70 hover:opacity-100 hover:text-amber-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        We strongly recommend keeping a buffer for unexpected delays, document reprints, or additional government fees.
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-amber-300 flex items-center justify-center shrink-0 group-hover:border-amber-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incEmergency} onChange={(e) => setIncEmergency(e.target.checked)} />
                      {incEmergency && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </div>
                    <span className="text-sm text-amber-800 font-bold">Include emergency buffer</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incEmergency ? "text-amber-900" : "text-amber-800")}>
                    {formatAmt(COSTS.EMERGENCY)} {currencyCode}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700/60 mt-1 block">fixed recommendation</span>
                </div>
              </div>

              {/* Laptop */}
              <div className={cn("py-4 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors rounded-xl p-3", incLaptop ? "bg-blue-50/50" : "")}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("font-bold", incLaptop ? "text-blue-900" : "text-slate-900")}>Laptop / Study Equipment</h3>
                    <div className="group relative hidden sm:inline-block">
                      <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Only if you still need to purchase. UAE has good options at Dubai Mall, Sharaf DG, Carrefour.
                      </div>
                    </div>
                  </div>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer group w-max">
                    <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors bg-white">
                      <input type="checkbox" className="opacity-0 absolute w-0 h-0" checked={incLaptop} onChange={(e) => setIncLaptop(e.target.checked)} />
                      {incLaptop && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                    <span className="text-sm text-slate-600 font-medium">I still need to buy a laptop</span>
                  </label>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className={cn("font-black text-base transition-colors block", incLaptop ? "text-blue-900" : "text-slate-700")}>
                    ~{formatAmt(COSTS.LAPTOP_MIN)}–{formatAmt(COSTS.LAPTOP_MAX)} {currencyCode}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1 block">adds ~{formatAmt(COSTS.LAPTOP_MID)} {currencyCode}</span>
                </div>
              </div>

            </div>
          )}
        </section>

        {/* Section 4: Savings Tips */}
        <section className="bg-emerald-50 rounded-2xl border border-emerald-100 overflow-hidden shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-black text-emerald-900 tracking-tight flex items-center gap-2 mb-6">
            <span className="text-2xl text-emerald-600">💡</span> How To Reduce Your Costs
          </h2>
          <div className="space-y-4">
            <p className="text-sm font-bold text-emerald-800 flex items-start gap-3">
               <span className="text-emerald-500 font-black mt-0.5">✓</span>
               Ask your university if the Student Visa fee is included in your tuition — many universities cover this.
            </p>
            <p className="text-sm font-bold text-emerald-800 flex items-start gap-3">
               <span className="text-emerald-500 font-black mt-0.5">✓</span>
               Some universities have on-campus medical testing centers that are faster and sometimes cheaper than external clinics.
            </p>
            <p className="text-sm font-bold text-emerald-800 flex items-start gap-3">
               <span className="text-emerald-500 font-black mt-0.5">✓</span>
               Get your SIM card from du or e& at the airport on arrival — student plans start from {formatAmt(55)} {currencyCode} with good data allowances.
            </p>
            <p className="text-sm font-bold text-emerald-800 flex items-start gap-3">
               <span className="text-emerald-500 font-black mt-0.5">✓</span>
               If sharing an apartment, negotiate with your flatmates on who registers for DEWA — the deposit is per apartment, not per person.
            </p>
            <p className="text-sm font-bold text-emerald-800 flex items-start gap-3">
               <span className="text-emerald-500 font-black mt-0.5">✓</span>
               Check your university library before buying textbooks — many have digital copies or lending programs.
            </p>
          </div>
        </section>
      </div>

      {/* Section 5: Export & Share */}
      <div className="mt-12 mb-8 print:hidden">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm h-14 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
          >
            <Copy className="w-5 h-5" /> 📋 Copy Budget Summary
          </button>
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex-1 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-sm h-14 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Printer className="w-5 h-5" /> 🖨 Print / Save as PDF
          </button>
        </div>
        
        {/* Toast Notification */}
        {showToast && (
          <div className="flex items-center justify-center mt-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm border border-emerald-200">
               <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Copied! Share with your family or save for reference.
            </div>
          </div>
        )}
      </div>

      {/* Legal Disclaimer */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <p className="text-[10px] text-slate-400 font-medium leading-loose max-w-4xl mx-auto">
          Landed Setup Budget Planner — For planning purposes only. All figures are estimates based on publicly available UAE government fee schedules and standard Dubai market rates as of 2026. Actual costs may vary based on your university, visa type, nationality, chosen service providers, and individual circumstances. Landed does not guarantee the accuracy of these figures and is not liable for any discrepancy between estimates and actual charges. Always verify fees directly with GDRFA, ICA, your university's Student Affairs office, and relevant service providers before making any payment.
        </p>
      </div>

    </div>
  );
}
