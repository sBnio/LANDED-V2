import { useState, useMemo } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  AlertTriangle,
  ChevronRight,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const DOCUMENTS = [
  { id: "passport", label: "Original Passport", status: "essential", where: "Bring from home", requiredFor: ["Medical Test", "Visa Stamping", "Emirates ID"] },
  { id: "visa_permit", label: "Entry Permit / Visa Copy", status: "essential", where: "Email from University Admissions", requiredFor: ["Airport Entry", "Medical Test"] },
  { id: "uni_letter", label: "University Enrollment Letter", status: "essential", where: "Student Portal / Registrar Office", requiredFor: ["Emirates ID", "Bank Account"] },
  { id: "photos", label: "Passport Photos (White BG)", status: "essential", where: "Any photography studio (Typing Center)", requiredFor: ["Medical Test", "Emirates ID"] },
  { id: "attested_transcripts", label: "Attested Original Transcripts", status: "essential", where: "Ministry of Education (Home Country)", requiredFor: ["Uni Final Registration"] },
  { id: "eid_receipt", label: "Emirates ID Application Receipt", status: "pending", where: "Typing Center (after Step 2)", requiredFor: ["Uni Registration", "Bank Account"] },
  { id: "insurance_card", label: "Health Insurance Card", status: "pending", where: "University Health Office", requiredFor: ["Medical Care"] },
];

export function Documents() {
  const { state, toggleDocument } = useOnboarding();

  const day1Checklist = [
    "Original Passport",
    "Entry Permit (Printed)",
    "University Admission Letter",
    "Evidence of Tuition Payment",
    "Local Currency (AED 500-1000 cash)"
  ];

  const groupedDocs = useMemo(() => {
    const ready = DOCUMENTS.filter(d => state.completedDocuments.includes(d.id));
    const missing = DOCUMENTS.filter(d => !state.completedDocuments.includes(d.id));
    return { ready, missing };
  }, [state.completedDocuments]);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-slate-200 pt-12 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">DOCUMENT VAULT</h1>
              <p className="text-slate-500 text-lg">Your master checklist for required paperwork in the UAE.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-2xl border-slate-200 h-14 px-6 font-bold text-slate-600">
                <Download className="w-5 h-5 mr-2" /> PDF EXPORT
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Day 1 Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-navy-900 rounded-[32px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
                <Printer className="w-3.5 h-3.5" /> High Priority
              </div>
              <h2 className="text-4xl font-black mb-4">Carry-on Day 1</h2>
              <p className="text-blue-100/70 text-lg mb-8 max-w-sm">Items you MUST keep in your hand luggage for airport immigration and university check-in.</p>
              <Button className="rounded-full bg-white text-navy-900 hover:bg-white/90 font-black px-8 h-14">
                PRINT CARD
              </Button>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="font-bold text-blue-200 uppercase tracking-widest text-xs mb-6">Physical Checklist</h3>
              <ul className="space-y-4">
                {day1Checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Smart Document Groups */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Missing Items
              </h2>
              <div className="grid gap-4">
                {groupedDocs.missing.map((doc) => (
                  <Card key={doc.id} className="p-6 bg-white border-slate-200 shadow-sm rounded-2xl hover:border-blue-300 transition-all group overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-black text-slate-900 text-xl tracking-tight">{doc.label}</h3>
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-black uppercase border border-amber-100">Needed</span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm font-medium">
                           <div className="flex items-center gap-2 text-slate-500">
                             <Info className="w-4 h-4" /> 
                             <span className="text-slate-400">Get it:</span> {doc.where}
                           </div>
                           <div className="flex items-center gap-2 text-slate-500">
                             <ChevronRight className="w-4 h-4" /> 
                             <span className="text-slate-400">Required for:</span> {doc.requiredFor.join(", ")}
                           </div>
                        </div>
                      </div>
                      <button 
                         onClick={() => toggleDocument(doc.id)}
                         className="h-14 px-8 rounded-2xl bg-slate-50 text-slate-900 font-black shadow-sm hover:bg-slate-100 transition-all shrink-0 border border-slate-100"
                      >
                         MARK READY
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Ready Vault
              </h2>
              <div className="grid gap-4 opacity-70">
                {groupedDocs.ready.map((doc) => (
                  <Card key={doc.id} className="p-6 bg-slate-50 border-slate-100 shadow-none rounded-2xl flex flex-col md:flex-row gap-6 md:items-center">
                    <div className="flex-1">
                       <h3 className="font-black text-slate-400 text-xl line-through">{doc.label}</h3>
                    </div>
                    <button 
                       onClick={() => toggleDocument(doc.id)}
                       className="h-12 px-6 rounded-xl bg-white text-slate-400 font-bold border border-slate-200 hover:text-slate-900"
                    >
                       UNDO
                    </button>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Smart Reminder</h3>
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-amber-900 leading-tight">Next task needs your ID copy</h4>
                </div>
                <p className="text-sm text-amber-800 font-medium leading-relaxed">
                  You have "Emirates ID Application" next. Make sure your University Enrollment Letter is ready!
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl">
               <h3 className="font-black text-white mb-4 uppercase tracking-widest text-xs">Typing Center Pro-Tip</h3>
               <p className="text-slate-400 text-sm leading-relaxed font-medium mb-6">
                 "Most centers charge AED 5 to AED 10 per scan if you don't have digital copies of your passport. Scan everything at home for free!"
               </p>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800" />
                  <span className="text-xs font-bold text-slate-300">Mohammed, Student at AUS</span>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
