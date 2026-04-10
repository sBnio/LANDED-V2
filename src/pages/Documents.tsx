import { useState } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { documentsList } from "@/data/documents";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, UploadCloud, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterType = "All" | "Ready" | "Needed" | "Submitted";

export function Documents() {
  const { state, toggleDocument, toggleSubmittedDocument } = useOnboarding();
  const [filter, setFilter] = useState<FilterType>("All");

  const completedCount = state.completedDocuments.length;
  const totalDocs = documentsList.length;

  const getDocStatus = (docId: string) => {
    if (state.submittedDocuments?.includes(docId)) return "Submitted";
    if (state.completedDocuments.includes(docId)) return "Ready";
    return "Needed";
  };

  const filteredDocs = documentsList.filter((doc) => {
    const status = getDocStatus(doc.id);
    if (filter === "All") return true;
    return status === filter;
  });

  const handleDownloadChecklist = () => {
    // In a real app, this would generate a PDF
    alert("Downloading checklist PDF...");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-navy-900 font-heading">Document Vault</h1>
            </div>
            <p className="text-slate-500">
              Manage all your essential documents in one secure place.
            </p>
          </div>
          <Button 
            onClick={handleDownloadChecklist}
            variant="outline" 
            className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Checklist
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-5xl mx-auto mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(["All", "Ready", "Needed", "Submitted"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                filter === f
                  ? "bg-navy-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const status = getDocStatus(doc.id);

            return (
              <Card
                key={doc.id}
                className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-slate-100 p-2.5 rounded-xl text-slate-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    {status === "Ready" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                      </span>
                    )}
                    {status === "Needed" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5" /> Needed
                      </span>
                    )}
                    {status === "Submitted" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                        <Send className="w-3.5 h-3.5" /> Submitted
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-navy-900 mb-2 leading-tight">{doc.label}</h3>
                  
                  <div className="mt-auto pt-4">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Where to use this</p>
                    <div className="flex flex-wrap gap-2">
                      {doc.steps.map((stepNum) => (
                        <span
                          key={stepNum}
                          className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium"
                        >
                          Step {stepNum}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  {status === "Needed" ? (
                    <div 
                      onClick={() => toggleDocument(doc.id)}
                      className="w-full py-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/50 flex flex-col items-center justify-center text-amber-700 cursor-pointer hover:bg-amber-50 transition-colors"
                    >
                      <UploadCloud className="w-5 h-5 mb-1" />
                      <span className="text-sm font-medium">Click to mark as Ready</span>
                    </div>
                  ) : status === "Ready" ? (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
                        onClick={() => toggleDocument(doc.id)}
                      >
                        Undo
                      </Button>
                      <Button 
                        className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => toggleSubmittedDocument(doc.id)}
                      >
                        Mark Submitted
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
                        onClick={() => toggleSubmittedDocument(doc.id)}
                      >
                        Undo Submit
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
