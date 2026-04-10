import { useState } from "react";
import { Download, Copy, X, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/context/OnboardingContext";
import { AutofillDrawer } from "./AutofillDrawer";

interface EmiratesIDFormProps {
  onClose: () => void;
}

export function EmiratesIDForm({ onClose }: EmiratesIDFormProps) {
  const { state } = useOnboarding();
  const [isFilled, setIsFilled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    passportNumber: "",
    dateOfBirth: "",
    nationality: "",
    universityName: "",
    program: "",
    emirate: "",
    address: "",
    emergencyContact: "",
  });

  const handleAutofillSave = (savedData: any) => {
    setFormData({
      fullName: state.name || "",
      passportNumber: savedData.passportNumber || "",
      dateOfBirth: state.dateOfBirth || "",
      nationality: state.nationality || "",
      universityName: state.university || "",
      program: savedData.program || "",
      emirate: savedData.emirate || "",
      address: savedData.currentAddress || "",
      emergencyContact: savedData.emergencyContact || "",
    });
    setIsFilled(true);
  };

  const handleCopy = () => {
    const text = `Full Name: ${formData.fullName}
Passport Number: ${formData.passportNumber}
Date of Birth: ${formData.dateOfBirth}
Nationality: ${formData.nationality}
University: ${formData.universityName}
Program: ${formData.program}
Emirate: ${formData.emirate}
Address: ${formData.address}
Emergency Contact: ${formData.emergencyContact}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFieldClass = (key: string) => {
    if (!isFilled) return "border-slate-200";
    return (formData as any)[key] ? "border-emerald-500 bg-emerald-50 focus-visible:ring-emerald-500" : "border-amber-500 bg-amber-50 focus-visible:ring-amber-500";
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-navy-900 font-heading flex items-center gap-3">
              Emirates ID Application
              <Button size="sm" onClick={() => setIsDrawerOpen(true)} className="bg-[#F59E0B] hover:bg-[#D97706] text-white gap-2 rounded-full h-8 px-3">
                <Zap className="w-3.5 h-3.5" />
                Autofill
              </Button>
            </h2>
            <p className="text-sm text-slate-500">ICA Smart Services Form Replica</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Legal Name</label>
                  <Input 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className={getFieldClass("fullName")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Passport Number</label>
                  <Input 
                    value={formData.passportNumber} 
                    onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                    className={getFieldClass("passportNumber")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Date of Birth</label>
                  <Input 
                    type="date"
                    value={formData.dateOfBirth} 
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className={getFieldClass("dateOfBirth")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nationality</label>
                  <Input 
                    value={formData.nationality} 
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    className={getFieldClass("nationality")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">University Name</label>
                  <Input 
                    value={formData.universityName} 
                    onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                    className={getFieldClass("universityName")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Program / Degree</label>
                  <Input 
                    value={formData.program} 
                    onChange={(e) => setFormData({...formData, program: e.target.value})}
                    className={getFieldClass("program")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Emirate</label>
                  <Input 
                    value={formData.emirate} 
                    onChange={(e) => setFormData({...formData, emirate: e.target.value})}
                    className={getFieldClass("emirate")}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Emergency Contact</label>
                  <Input 
                    value={formData.emergencyContact} 
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    className={getFieldClass("emergencyContact")}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Address in UAE</label>
                  <Input 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className={getFieldClass("address")}
                  />
                </div>
              </div>

              {isFilled && (
                <div className="flex items-center gap-2 text-sm mt-4">
                  <div className="flex items-center gap-1 text-emerald-600">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" /> Auto-filled
                  </div>
                  <div className="flex items-center gap-1 text-amber-600 ml-4">
                    <div className="w-3 h-3 rounded-full bg-amber-500" /> Needs manual input
                  </div>
                </div>
              )}
            </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-between items-center">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleCopy} className="gap-2" disabled={!isFilled}>
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy All Fields"}
            </Button>
            <Button className="bg-navy-900 hover:bg-slate-800 text-white gap-2" disabled={!isFilled}>
              <Download className="w-4 h-4" />
              Download Pre-filled PDF
            </Button>
          </div>
        </div>
      </div>

      <AutofillDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onSave={handleAutofillSave} 
      />
    </div>
  );
}
