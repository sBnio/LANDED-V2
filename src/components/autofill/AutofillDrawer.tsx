import { useState, useEffect } from "react";
import { X, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AutofillDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function AutofillDrawer({ isOpen, onClose, onSave }: AutofillDrawerProps) {
  const [formData, setFormData] = useState({
    passportNumber: "",
    program: "",
    emirate: "",
    currentAddress: "",
    emergencyContact: "",
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("landed_autofill_data");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("landed_autofill_data", JSON.stringify(formData));
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    localStorage.removeItem("landed_autofill_data");
    setFormData({
      passportNumber: "",
      program: "",
      emirate: "",
      currentAddress: "",
      emergencyContact: "",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAFAF7] shadow-2xl z-[70] flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-amber-600">
            <Lock className="w-5 h-5" />
            <span className="font-semibold text-sm">Your details are stored only on this device — we never see them.</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors shrink-0">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#0A1628] font-heading mb-2">Autofill Details</h2>
            <p className="text-slate-500 text-sm">Fill these once to quickly complete government and university forms.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Passport Number</label>
              <Input 
                value={formData.passportNumber}
                onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                className="h-12 bg-white border-slate-200 focus-visible:ring-[#F59E0B]"
                placeholder="e.g. A1234567"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Program / Degree</label>
              <Input 
                value={formData.program}
                onChange={(e) => setFormData({...formData, program: e.target.value})}
                className="h-12 bg-white border-slate-200 focus-visible:ring-[#F59E0B]"
                placeholder="e.g. BSc Computer Science"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Emirate</label>
              <select 
                value={formData.emirate}
                onChange={(e) => setFormData({...formData, emirate: e.target.value})}
                className="w-full h-12 px-4 rounded-md border border-slate-200 bg-white focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent outline-none text-sm"
              >
                <option value="" disabled>Select Emirate</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Ajman">Ajman</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Current Address in UAE</label>
              <Input 
                value={formData.currentAddress}
                onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                className="h-12 bg-white border-slate-200 focus-visible:ring-[#F59E0B]"
                placeholder="e.g. Dubai Marina"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Emergency Contact (Name & Phone)</label>
              <Input 
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                className="h-12 bg-white border-slate-200 focus-visible:ring-[#F59E0B]"
                placeholder="e.g. Jane Doe +971 50 123 4567"
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-white space-y-4">
          <Button 
            onClick={handleSave} 
            className="w-full h-12 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-lg rounded-xl"
          >
            Save & Autofill
          </Button>
          <div className="text-center">
            <button 
              onClick={handleDelete}
              className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center justify-center gap-1 w-full"
            >
              <Trash2 className="w-4 h-4" />
              Delete my saved data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
