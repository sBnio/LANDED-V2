import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Lock, Sliders, Shield, Download, RotateCcw, 
  Trash2, AlertTriangle, Check, Loader2, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const universities = [
  "UAEU", "AUS", "AUD", "NYU Abu Dhabi", "Heriot-Watt Dubai", 
  "Khalifa University", "Zayed University", "BITS Pilani Dubai",
  "CUD (Canadian University Dubai)", "UOWD (University of Wollongong Dubai)",
  "UoBD (University of Birmingham Dubai)", "UE (University of Europe Dubai)"
];

const nationalities = [
  "Indian", "Pakistani", "Egyptian", "Jordanian", "Syrian", 
  "Nigerian", "Kenyan", "Filipino", "Bangladeshi", "British", 
  "American", "Other"
];

export const currencies = [
  { code: "AED", rate: 1 },
  { code: "USD", rate: 0.27 },
  { code: "GBP", rate: 0.21 },
  { code: "EUR", rate: 0.25 },
  { code: "INR", rate: 22.5 },
  { code: "PKR", rate: 75 },
];

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200 z-[101]">
        {title && <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>}
        {children}
      </div>
    </div>,
    document.body
  );
}

// Toggle Component for Connected Accounts
function Toggle({ checked, onChange, disabled = false }: { checked: boolean, onChange: (v: boolean) => void, disabled?: boolean }) {
  return (
    <button 
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
        checked ? "bg-blue-600" : "bg-slate-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span className={cn(
        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        checked ? "translate-x-5" : "translate-x-0"
      )} />
    </button>
  );
}

export default function Settings() {
  const { state: globalState, updateState, resetState } = useOnboarding();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: globalState.name || "",
    nationality: globalState.nationality || "",
    university: globalState.university || "",
    arrivalDate: globalState.arrivalDate || "",
  });

  const [showProfileConfirm, setShowProfileConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Privacy State
  const [isExporting, setIsExporting] = useState(false);
  const [showResetRoadmap, setShowResetRoadmap] = useState(false);
  const [resetRoadmapConfirm, setResetRoadmapConfirm] = useState("");
  const [showSignout, setShowSignout] = useState(false);
  
  // Delete Flow state
  const [deleteStep, setDeleteStep] = useState(0); 
  const [deleteEmailConfirm, setDeleteEmailConfirm] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return;
      const sections = ["profile", "account", "preferences", "privacy"];
      let currentSection = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (window.innerWidth >= 768) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Actions
  const handleProfileSaveClick = () => {
    if (profile.nationality !== globalState.nationality || profile.university !== globalState.university) {
      setShowProfileConfirm(true);
    } else {
      executeProfileSave();
    }
  };

  const executeProfileSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateState({
        name: profile.name,
        nationality: profile.nationality,
        university: profile.university,
        arrivalDate: profile.arrivalDate,
      });
      setIsSaving(false);
      setShowProfileConfirm(false);
      showToast("Profile updated ✓");
    }, 600);
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataToExport = {
        profileData: {
          name: globalState.name,
          nationality: globalState.nationality,
          university: globalState.university,
          arrivalDate: globalState.arrivalDate
        },
        checklistCompleted: globalState.completedSteps,
        budgetPlannerSelections: localStorage.getItem("landed_budget_state") || {},
        accountCreated: new Date().toISOString()
      };
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `landed-my-data-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setIsExporting(false);
      showToast("Your data is downloading ✓");
    }, 1000);
  };

  const executeResetRoadmap = () => {
    updateState({ completedSteps: [] });
    setShowResetRoadmap(false);
    setResetRoadmapConfirm("");
    showToast("Roadmap reset ✓");
  };

  const executeDeleteAccount = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto px-4 py-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-1">
            {[
              { id: "profile", title: "My Profile", icon: User },
              { id: "account", title: "Account & Security", icon: Lock },
              { id: "preferences", title: "Preferences", icon: Sliders },
              { id: "privacy", title: "My Data", icon: Shield },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-bold",
                  activeSection === section.id 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-500 hover:bg-white hover:text-slate-900"
                )}
              >
                <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-blue-600" : "text-slate-400")} />
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-8 md:space-y-12 pb-20 max-w-2xl">
          
          <h1 className="text-3xl font-black text-slate-900 hidden md:block mb-8">Settings</h1>

          {/* Section 1: My Profile */}
          <div id="profile" className="block">
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                   <User className="w-5 h-5 text-blue-600" />
                 </div>
                 <h2 className="text-xl font-bold tracking-tight text-slate-900">My Profile</h2>
               </div>

               <div className="space-y-6">
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <Label>Full Name</Label>
                     <Input 
                       value={profile.name} 
                       onChange={e => setProfile({...profile, name: e.target.value})} 
                       placeholder="Enter your full name" 
                     />
                   </div>
                   <div className="space-y-2">
                     <Label>Nationality</Label>
                     <select 
                       className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                       value={profile.nationality}
                       onChange={e => setProfile({...profile, nationality: e.target.value})}
                     >
                       <option value="" disabled>Select Nationality</option>
                       {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <Label>University</Label>
                     <select 
                       className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                       value={profile.university}
                       onChange={e => setProfile({...profile, university: e.target.value})}
                     >
                       <option value="" disabled>Select University</option>
                       {universities.map(u => <option key={u} value={u}>{u}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <Label>Arrival Date</Label>
                     <Input 
                       type="date"
                       value={profile.arrivalDate} 
                       onChange={e => setProfile({...profile, arrivalDate: e.target.value})} 
                     />
                   </div>
                 </div>

                 <div className="flex justify-end pt-2">
                   <Button 
                     onClick={handleProfileSaveClick} 
                     disabled={isSaving}
                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full md:w-auto min-w-[140px]"
                   >
                     {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                     {isSaving ? "Saving..." : "Save Changes"}
                   </Button>
                 </div>
               </div>
             </div>
          </div>

          {/* Section 2: Account & Security */}
          <div id="account" className="block">
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                   <Lock className="w-5 h-5 text-blue-600" />
                 </div>
                 <h2 className="text-xl font-bold tracking-tight text-slate-900">Account & Security</h2>
               </div>

               <div className="space-y-6">
                 
                 <div className="space-y-4">
                   <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                     <div>
                       <p className="text-sm font-bold text-slate-900">Email Address</p>
                       <p className="text-sm text-slate-500 mt-1">student@university.ac.ae</p>
                     </div>
                   </div>
                   
                   {globalState.authMethod !== "google" && (
                   <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl bg-white gap-4">
                     <div>
                       <p className="text-sm font-bold text-slate-900">Password</p>
                       <p className="text-sm text-slate-500 mt-1">Last changed 3 months ago</p>
                     </div>
                     <Button variant="outline">Change Password</Button>
                   </div>
                   )}
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Connected Accounts</h3>
                   <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl bg-white gap-4">
                     <div className="flex items-center gap-3">
                       <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                       </svg>
                       <div>
                         <p className="text-sm font-bold text-slate-900">Google</p>
                         <p className="text-xs text-slate-500">Connected</p>
                       </div>
                     </div>
                     <Toggle checked={true} onChange={() => {}} />
                   </div>
                 </div>

                 <div className="pt-4 border-t border-slate-100">
                   <Button variant="outline" onClick={() => setShowSignout(true)} className="w-full">Sign out of all devices</Button>
                 </div>
               </div>
             </div>
          </div>

          {/* Section 3: Preferences */}
          <div id="preferences" className="block">
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                   <Sliders className="w-5 h-5 text-blue-600" />
                 </div>
                 <h2 className="text-xl font-bold tracking-tight text-slate-900">Preferences</h2>
               </div>

               <div className="space-y-6">
                 <div className="space-y-2">
                   <Label>Currency display</Label>
                   <select 
                     className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                     value={globalState.preferredCurrency}
                     onChange={e => updateState({ preferredCurrency: e.target.value })}
                   >
                     {currencies.map(c => (
                       <option key={c.code} value={c.code}>{c.code}</option>
                     ))}
                   </select>
                   <p className="text-xs text-slate-500">Updates cost displays in Budget Planner. Rates are approximate.</p>
                 </div>

                 <div className="space-y-2 pt-4">
                   <Label>Language</Label>
                   <div className="grid grid-cols-2 gap-3">
                     <div className="flex items-center justify-center py-3 border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold rounded-xl">
                       English
                     </div>
                     <div className="flex items-center justify-center py-3 border border-slate-200 bg-slate-50 text-slate-400 font-medium rounded-xl cursor-not-allowed opacity-70 relative">
                       Arabic
                       <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">Coming Soon</span>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Section 4: My Data */}
          <div id="privacy" className="block">
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                   <Shield className="w-5 h-5 text-blue-600" />
                 </div>
                 <h2 className="text-xl font-bold tracking-tight text-slate-900">My Data</h2>
               </div>

               <div className="space-y-4">
                 
                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl gap-4 bg-white">
                   <div>
                     <p className="font-bold text-slate-900">Export My Data</p>
                   </div>
                   <Button variant="outline" onClick={handleExportData} disabled={isExporting} className="bg-white whitespace-nowrap min-w-[150px]">
                     {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                     {isExporting ? "Generating..." : "Export My Data"}
                   </Button>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-amber-100 bg-amber-50/50 rounded-xl gap-4">
                   <div>
                     <p className="font-bold text-amber-900">Reset checklist progress</p>
                   </div>
                   <Button variant="outline" onClick={() => setShowResetRoadmap(true)} className="border-amber-200 text-amber-700 hover:bg-amber-100 whitespace-nowrap">
                     Reset progress
                   </Button>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-red-100 bg-red-50/50 rounded-xl gap-4">
                   <div>
                     <p className="font-bold text-red-900">Delete Account</p>
                   </div>
                   <Button variant="destructive" onClick={() => setDeleteStep(1)} className="bg-red-600 hover:bg-red-700 whitespace-nowrap">
                     Delete account
                   </Button>
                 </div>

                 <div className="pt-6 mt-6 border-t border-slate-100">
                   <p className="text-xs text-slate-400">
                     Landed handles your data in accordance with UAE Federal Decree-Law No. 45 of 2021. Questions: privacy@landed.ae
                   </p>
                 </div>

               </div>
             </div>
          </div>

          {/* Settings Footer */}
          <div className="pt-8 text-center pb-24 md:pb-12">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-bold text-slate-500 mb-4">
              <a href="#" className="hover:text-blue-600">Help Center</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600">Contact Support</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600">Privacy</a>
            </div>
            <p className="text-xs text-slate-400">
              Landed &middot; Beta v0.1
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-medium">
            <Check className="w-5 h-5 text-green-400" />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Profile Modification Confirm Modal */}
      <Modal isOpen={showProfileConfirm} onClose={() => setShowProfileConfirm(false)} title="Update Profile?">
        <div className="space-y-4">
          <p className="text-slate-600">
            Changing this will update your roadmap. Continue?
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowProfileConfirm(false)}>Cancel</Button>
            <Button onClick={executeProfileSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold min-w-[100px]">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Signout All Devices Modal */}
      <Modal isOpen={showSignout} onClose={() => setShowSignout(false)} title="Sign out everywhere?">
        <div className="space-y-4">
          <p className="text-slate-600">
            This will sign you out everywhere. Continue?
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowSignout(false)}>Cancel</Button>
            <Button onClick={() => setShowSignout(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
               Continue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Roadmap Modal */}
      <Modal isOpen={showResetRoadmap} onClose={() => setShowResetRoadmap(false)} title="Reset checklist progress?">
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 text-amber-900 rounded-xl border border-amber-100">
            <p className="text-sm font-medium">This will mark all tasks as incomplete. Your profile and Budget Planner will not change. This cannot be undone.</p>
          </div>
          <div>
            <Label className="text-slate-700">Type <strong className="text-slate-900">RESET</strong> to confirm:</Label>
            <Input 
              value={resetRoadmapConfirm} 
              onChange={(e) => setResetRoadmapConfirm(e.target.value)} 
              placeholder="RESET"
              className="mt-2 text-center text-lg font-bold tracking-widest"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => { setShowResetRoadmap(false); setResetRoadmapConfirm(""); }}>Cancel</Button>
            <Button 
              onClick={executeResetRoadmap} 
              disabled={resetRoadmapConfirm !== "RESET"}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
            >
              Reset progress
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal Step 1 */}
      <Modal isOpen={deleteStep === 1} onClose={() => setDeleteStep(0)} title="Delete account?">
        <div className="space-y-4">
          <p className="text-slate-600">
            This will permanently delete your profile, roadmap, and all activity. Cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setDeleteStep(0)}>Cancel</Button>
            <Button onClick={() => setDeleteStep(2)} className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Continue
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modal Step 2 */}
      <Modal isOpen={deleteStep === 2} onClose={() => setDeleteStep(0)} title="Final confirmation">
        <div className="space-y-4">
          <div>
            <Label className="text-slate-700">Type your email address (<strong className="text-slate-900">student@university.ac.ae</strong>) to confirm:</Label>
            <Input 
              value={deleteEmailConfirm} 
              onChange={(e) => setDeleteEmailConfirm(e.target.value)} 
              placeholder="student@university.ac.ae"
              className="mt-2"
              autoComplete="off"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => { setDeleteStep(0); setDeleteEmailConfirm(""); }}>Cancel</Button>
            <Button 
              onClick={executeDeleteAccount} 
              disabled={deleteEmailConfirm !== "student@university.ac.ae"}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Delete account
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
