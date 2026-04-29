import React, { useState, useEffect, useRef } from "react";
import { useOnboarding } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Lock, Bell, Shield, Palette, ChevronDown, 
  Download, RotateCcw, Trash2, AlertTriangle, Check, Loader2, Info
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

const livingSituations = [
  "University accommodation",
  "Private apartment",
  "Shared apartment",
  "With family"
];

const currencies = [
  { code: "AED", exchangeRate: 1 },
  { code: "USD", exchangeRate: 0.27 },
  { code: "GBP", exchangeRate: 0.21 },
  { code: "EUR", exchangeRate: 0.25 },
  { code: "INR", exchangeRate: 22.5 },
  { code: "PKR", exchangeRate: 75 },
];

// Toggle Component
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

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title?: string, children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
        {title && <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

// Accordion Section Wrapper
function SettingsSection({ id, title, icon: Icon, children, open, onToggle }: any) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden md:border-none md:bg-transparent md:overflow-visible">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 md:hidden bg-white hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-slate-900">{title}</span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", open && "rotate-180")} />
      </button>
      
      <div className="hidden md:flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
      </div>

      <div className={cn("p-4 md:p-0 md:block bg-white", open ? "block" : "hidden")}>
        <div className="md:bg-white md:p-8 md:rounded-3xl md:shadow-sm md:border md:border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Settings() {
  const { state: globalState, updateState, resetState } = useOnboarding();
  const [activeSection, setActiveSection] = useState("profile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Notifications State
  const [notify, setNotify] = useState(() => {
    const saved = localStorage.getItem("landed_notifs");
    return saved ? JSON.parse(saved) : {
      pushChecklist: true,
      pushTimeline: true,
      pushCommunity: true,
      pushBuddy: true,
      pushOffers: false,
      emailWeekly: true,
      emailDeadline: true,
      emailUpdates: false,
      emailOffers: false,
      frequency: "weekly"
    };
  });

  useEffect(() => {
    localStorage.setItem("landed_notifs", JSON.stringify(notify));
  }, [notify]);

  // App Preferences State
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("landed_prefs");
    return saved ? JSON.parse(saved) : {
      language: "en",
      currency: "AED",
      theme: "light",
      compactView: false,
      largerText: false
    };
  });

  useEffect(() => {
    localStorage.setItem("landed_prefs", JSON.stringify(prefs));
    // Apply Larger Text
    if (prefs.largerText) {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }
  }, [prefs]);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: globalState.name || "",
    dateOfBirth: globalState.dateOfBirth || "",
    nationality: globalState.nationality || "",
    university: globalState.university || "",
    program: "",
    arrivalDate: globalState.arrivalDate || "",
    livingSituation: globalState.hasAccommodation === "Yes" ? "Private apartment" : "University accommodation"
  });

  // Privacy State
  const [isExporting, setIsExporting] = useState(false);
  const [showResetRoadmap, setShowResetRoadmap] = useState(false);
  const [resetRoadmapConfirm, setResetRoadmapConfirm] = useState("");
  const [showResetBudget, setShowResetBudget] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0); // 0=closed, 1=warning, 2=reason, 3=final
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteEmailConfirm, setDeleteEmailConfirm] = useState("");

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globalState, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `landed-my-data-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      setIsExporting(false);
      showToast("Your data export is downloading ✓");
    }, 1500);
  };

  const executeResetRoadmap = () => {
    updateState({ completedSteps: [] });
    setShowResetRoadmap(false);
    setResetRoadmapConfirm("");
    showToast("Roadmap progress reset ✓");
  };

  const executeResetBudget = () => {
    localStorage.removeItem("landed_budget_state"); // Assume budget uses this or similar
    setShowResetBudget(false);
    showToast("Budget Planner reset to defaults ✓");
  };

  const executeDeleteAccount = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const [pendingProfileSave, setPendingProfileSave] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileSaveClick = () => {
    // Check if nationality or university changed
    if (
      profile.nationality !== globalState.nationality ||
      profile.university !== globalState.university
    ) {
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
        dateOfBirth: profile.dateOfBirth,
        nationality: profile.nationality,
        university: profile.university,
        arrivalDate: profile.arrivalDate,
        hasAccommodation: profile.livingSituation === "University accommodation" ? null : "Yes",
      });
      setIsSaving(false);
      setShowProfileConfirm(false);
      showToast("Profile updated ✓");
    }, 600);
  };

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const sections = [
    { id: "profile", title: "My Profile", icon: User },
    { id: "account", title: "Account & Security", icon: Lock },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "privacy", title: "Privacy & My Data", icon: Shield },
    { id: "preferences", title: "App Preferences", icon: Palette },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (window.innerWidth >= 768) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4 py-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 space-y-1">
            {sections.map(section => (
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
        <div className="flex-1 space-y-4 md:space-y-16 pb-20">
          
          <SettingsSection id="profile" title="My Profile" icon={User} open={activeSection === "profile"} onToggle={() => setActiveSection("profile")}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={profile.name} 
                    onChange={e => setProfile({...profile, name: e.target.value})} 
                    placeholder="Enter your full name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input 
                    type="date"
                    value={profile.dateOfBirth} 
                    onChange={e => setProfile({...profile, dateOfBirth: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nationality</Label>
                  <select 
                    title="Nationality"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    title="University"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profile.university}
                    onChange={e => setProfile({...profile, university: e.target.value})}
                  >
                    <option value="" disabled>Select University</option>
                    {universities.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Program / Course (Optional)</Label>
                  <Input 
                    value={profile.program} 
                    onChange={e => setProfile({...profile, program: e.target.value})} 
                    placeholder="e.g. BSc Computer Science" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Arrival Date</Label>
                  <Input 
                    type="date"
                    value={profile.arrivalDate} 
                    onChange={e => setProfile({...profile, arrivalDate: e.target.value})} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Living Situation</Label>
                  <select 
                    title="Living Situation"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profile.livingSituation}
                    onChange={e => setProfile({...profile, livingSituation: e.target.value})}
                  >
                    {livingSituations.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleProfileSaveClick} 
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-full md:w-auto min-w-[140px]"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </Button>
              </div>

              <div className="mt-8 bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-4 text-sm text-slate-500 leading-relaxed">
                <Shield className="w-5 h-5 text-slate-400 shrink-0" />
                <p>
                  Your profile data is stored securely and used only to personalize your Landed experience. We never sell your data.
                </p>
              </div>
            </div>
          </SettingsSection>

          <SettingsSection id="account" title="Account & Security" icon={Lock} open={activeSection === "account"} onToggle={() => setActiveSection("account")}>
             <div className="space-y-8">
               
               {/* Email & Password */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Login Credentials</h3>
                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                   <div>
                     <p className="text-sm font-bold text-slate-900">Email Address</p>
                     <p className="text-sm text-slate-500 mt-1">student@university.ac.ae</p>
                   </div>
                   <Button variant="outline" className="bg-white" onClick={() => showToast("Verification sent to email.")}>Change Email</Button>
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4">
                   <div>
                     <p className="text-sm font-bold text-slate-900">Password</p>
                     <p className="text-sm text-slate-500 mt-1">Last changed 3 months ago</p>
                   </div>
                   <Button variant="outline" className="bg-white">Change Password</Button>
                 </div>
               </div>

               {/* Connected Accounts */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Connected Accounts</h3>
                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl gap-4">
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
                   <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">Disconnect</Button>
                 </div>
               </div>

               {/* Active Sessions */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Active Sessions</h3>
                 <div className="p-4 border border-slate-100 rounded-xl space-y-4">
                   <p className="text-sm text-slate-600">You are currently signed in on <span className="font-bold text-slate-900">2</span> device(s)</p>
                   <Button variant="outline" className="w-full md:w-auto">Sign out all other sessions</Button>
                 </div>
               </div>

               {/* Two-Factor Authentication */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Two-Factor Authentication</h3>
                 <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-slate-50 opacity-70">
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-slate-200 rounded-lg text-slate-500">
                       <Lock className="w-4 h-4" />
                     </div>
                     <div>
                       <div className="flex items-center gap-2">
                         <p className="text-sm font-bold text-slate-900">2FA Protection</p>
                         <span className="text-[10px] uppercase font-bold tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Coming Soon</span>
                       </div>
                       <p className="text-xs text-slate-500 mt-1">Extra security for your account</p>
                     </div>
                   </div>
                   <Toggle checked={false} onChange={() => {}} disabled />
                 </div>
               </div>

             </div>
          </SettingsSection>

          <SettingsSection id="notifications" title="Notifications" icon={Bell} open={activeSection === "notifications"} onToggle={() => setActiveSection("notifications")}>
             <div className="space-y-10">
               
               {/* Push Notifications */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Push Notifications</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Remind me when tasks are due</p>
                     </div>
                     <Toggle checked={notify.pushChecklist} onChange={v => setNotify({...notify, pushChecklist: v})} />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Alert me if I'm falling behind my timeline</p>
                     </div>
                     <Toggle checked={notify.pushTimeline} onChange={v => setNotify({...notify, pushTimeline: v})} />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Notify me when someone replies to my posts</p>
                     </div>
                     <Toggle checked={notify.pushCommunity} onChange={v => setNotify({...notify, pushCommunity: v})} />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Notify me of new direct messages</p>
                     </div>
                     <Toggle checked={notify.pushBuddy} onChange={v => setNotify({...notify, pushBuddy: v})} />
                   </div>
                   <div className="flex justify-between items-start pt-4 border-t border-slate-100">
                     <div className="pr-4">
                       <p className="font-bold text-slate-900">Receive relevant offers from Landed partners</p>
                       <p className="text-sm text-slate-500 mt-1">Banks, SIM providers, insurance — we only show offers relevant to your stage</p>
                     </div>
                     <Toggle checked={notify.pushOffers} onChange={v => setNotify({...notify, pushOffers: v})} />
                   </div>
                 </div>
               </div>

               {/* Email Notifications */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Email Notifications</h3>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Weekly progress summary</p>
                     </div>
                     <Toggle checked={notify.emailWeekly} onChange={v => setNotify({...notify, emailWeekly: v})} />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Important deadline reminders</p>
                       <p className="text-sm text-slate-500 mt-1">Recommended — critical timeline alerts</p>
                     </div>
                     <Toggle checked={notify.emailDeadline} onChange={v => setNotify({...notify, emailDeadline: v})} />
                   </div>
                   <div className="flex items-center justify-between">
                     <div>
                       <p className="font-bold text-slate-900">Landed product updates</p>
                     </div>
                     <Toggle checked={notify.emailUpdates} onChange={v => setNotify({...notify, emailUpdates: v})} />
                   </div>
                   <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                     <div>
                       <p className="font-bold text-slate-900">Partner offers by email</p>
                     </div>
                     <Toggle checked={notify.emailOffers} onChange={v => setNotify({...notify, emailOffers: v})} />
                   </div>
                 </div>
               </div>

               {/* Frequency Selector */}
               <div className="space-y-4">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Notification Frequency</h3>
                 <div className="space-y-3">
                   {[
                     { id: "immediately", label: "Immediately", subtext: "Receive notifications as soon as events happen" },
                     { id: "daily", label: "Daily digest", subtext: "Receive one email per day with all updates" },
                     { id: "weekly", label: "Weekly digest", subtext: "Receive one email per week with all updates" },
                   ].map((item) => (
                     <label key={item.id} className={cn(
                       "flex items-start p-4 border rounded-xl cursor-pointer transition-colors",
                       notify.frequency === item.id ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                     )}>
                       <div className="flex items-center h-5">
                         <input
                           type="radio"
                           name="frequency"
                           value={item.id}
                           checked={notify.frequency === item.id}
                           onChange={() => setNotify({...notify, frequency: item.id})}
                           className="w-4 h-4 text-blue-600 focus:ring-blue-600 border-slate-300"
                         />
                       </div>
                       <div className="ml-3">
                         <p className={cn("text-sm font-bold", notify.frequency === item.id ? "text-blue-900" : "text-slate-900")}>{item.label}</p>
                         <p className={cn("text-xs mt-0.5", notify.frequency === item.id ? "text-blue-700" : "text-slate-500")}>
                           {item.subtext}
                         </p>
                       </div>
                     </label>
                   ))}
                   <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">Frequency only applies to non-critical notifications. Deadlines will always be sent immediately.</p>
                 </div>
               </div>

             </div>
          </SettingsSection>

          <SettingsSection id="privacy" title="Privacy & My Data" icon={Shield} open={activeSection === "privacy"} onToggle={() => setActiveSection("privacy")}>
             <div className="space-y-8">
               
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4">
                 <Shield className="w-6 h-6 text-blue-600 shrink-0" />
                 <p className="text-sm text-blue-900 leading-relaxed font-medium">
                   <strong className="block mb-1">Landed stores:</strong>
                   Your profile information, roadmap progress, Budget Planner settings, and community activity. We do not store copies of your documents. We do not sell your data to third parties.
                 </p>
               </div>

               <div className="space-y-4">
                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-slate-100 rounded-xl gap-4 hover:border-slate-200 transition-colors">
                   <div>
                     <p className="font-bold text-slate-900">Export My Data</p>
                     <p className="text-sm text-slate-500 mt-1">Download a copy of all your Landed data</p>
                   </div>
                   <Button variant="outline" onClick={handleExportData} disabled={isExporting} className="bg-white">
                     {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                     {isExporting ? "Generating..." : "Export My Data"}
                   </Button>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-amber-100 bg-amber-50/30 rounded-xl gap-4">
                   <div>
                     <p className="font-bold text-amber-900">Reset Checklist Progress</p>
                     <p className="text-sm text-amber-700/80 mt-1">Start over from task 1</p>
                   </div>
                   <Button variant="outline" onClick={() => setShowResetRoadmap(true)} className="border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800">
                     Reset Progress
                   </Button>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-amber-100 bg-amber-50/30 rounded-xl gap-4">
                   <div>
                     <p className="font-bold text-amber-900">Reset Budget Planner</p>
                     <p className="text-sm text-amber-700/80 mt-1">Clear all manual adjustments</p>
                   </div>
                   <Button variant="outline" onClick={() => setShowResetBudget(true)} className="border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800">
                     Reset Budget
                   </Button>
                 </div>

                 <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-red-100 bg-red-50/50 rounded-xl gap-4">
                   <div>
                     <p className="font-bold text-red-900">Delete Account</p>
                     <p className="text-sm text-red-700/80 mt-1">Permanently remove all your data</p>
                   </div>
                   <Button variant="destructive" onClick={() => setDeleteStep(1)} className="bg-red-600 hover:bg-red-700">
                     Delete Account
                   </Button>
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-100">
                 <p className="text-xs text-slate-400 leading-relaxed">
                   Landed processes your data in accordance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection. For data requests: <a href="mailto:privacy@landed.ae" className="underline hover:text-slate-600">privacy@landed.ae</a>
                 </p>
               </div>

             </div>
          </SettingsSection>

          <SettingsSection id="preferences" title="App Preferences" icon={Palette} open={activeSection === "preferences"} onToggle={() => setActiveSection("preferences")}>
             <div className="space-y-8">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 
                 {/* Language */}
                 <div className="space-y-2">
                   <Label>Language</Label>
                   <select 
                     title="Language"
                     className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                     value={prefs.language}
                     onChange={e => setPrefs({...prefs, language: e.target.value})}
                   >
                     <option value="en">English</option>
                     <option value="ar" disabled>Arabic (Coming Soon)</option>
                   </select>
                 </div>

                 {/* Currency */}
                 <div className="space-y-2">
                   <Label>Currency Display</Label>
                   <select 
                     title="Currency Display"
                     className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                     value={prefs.currency}
                     onChange={e => setPrefs({...prefs, currency: e.target.value})}
                   >
                     {currencies.map(c => (
                       <option key={c.code} value={c.code}>{c.code}</option>
                     ))}
                   </select>
                   <p className="text-xs text-slate-500">Updates all cost displays in Budget Planner. Exchange rates are approximate.</p>
                 </div>

                 {/* Theme */}
                 <div className="space-y-3 md:col-span-2">
                   <Label>Appearance</Label>
                   <div className="grid grid-cols-3 gap-3">
                     {[
                       { id: "light", label: "Light" },
                       { id: "dark", label: "Dark" },
                       { id: "system", label: "System" }
                     ].map((item) => (
                       <label key={item.id} className={cn(
                         "flex flex-col items-center justify-center py-4 border rounded-xl cursor-pointer transition-all",
                         prefs.theme === item.id ? "border-blue-600 bg-blue-50 text-blue-700 font-bold ring-1 ring-blue-600" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                       )}>
                         <input
                           type="radio"
                           name="theme"
                           value={item.id}
                           checked={prefs.theme === item.id}
                           onChange={() => setPrefs({...prefs, theme: item.id})}
                           className="sr-only"
                         />
                         {item.label}
                       </label>
                     ))}
                   </div>
                 </div>

               </div>

               <div className="space-y-4 pt-6 border-t border-slate-100">
                 <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase">View Options</h3>
                 
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="font-bold text-slate-900">Compact View</p>
                     <p className="text-sm text-slate-500 mt-1">Show condensed checklist (less whitespace)</p>
                   </div>
                   <Toggle checked={prefs.compactView} onChange={v => setPrefs({...prefs, compactView: v})} />
                 </div>

                 <div className="flex items-center justify-between">
                   <div>
                     <p className="font-bold text-slate-900">Larger Text</p>
                     <p className="text-sm text-slate-500 mt-1">Increase text size for readability</p>
                   </div>
                   <Toggle checked={prefs.largerText} onChange={v => setPrefs({...prefs, largerText: v})} />
                 </div>

               </div>

             </div>
          </SettingsSection>

          {/* Settings Footer */}
          <div className="pt-8 border-t border-slate-200 text-center space-y-4 pb-12">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Report a Bug</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            </div>
            <p className="text-xs text-slate-400">
              Landed &middot; Beta v0.1 &middot; Built for international students in the UAE 🇦🇪
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
      <Modal isOpen={showProfileConfirm} onClose={() => setShowProfileConfirm(false)} title="Update Roadmap?">
        <div className="space-y-4">
          <p className="text-slate-500">
            Changing this will update your roadmap. Some completed tasks may be affected. Continue?
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowProfileConfirm(false)}>Cancel</Button>
            <Button onClick={executeProfileSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-24">
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Roadmap Modal */}
      <Modal isOpen={showResetRoadmap} onClose={() => setShowResetRoadmap(false)} title="Reset Checklist?">
        <div className="space-y-4">
          <div className="flex gap-3 p-4 bg-amber-50 text-amber-900 rounded-xl">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">This will mark all tasks as incomplete and restart your onboarding progress. Your profile and Budget Planner will not be affected. This cannot be undone.</p>
          </div>
          <div>
            <Label className="text-slate-700">Type <strong className="text-slate-900">RESET</strong> to confirm:</Label>
            <Input 
              value={resetRoadmapConfirm} 
              onChange={(e) => setResetRoadmapConfirm(e.target.value)} 
              placeholder="RESET"
              className="mt-2"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={() => { setShowResetRoadmap(false); setResetRoadmapConfirm(""); }}>Cancel</Button>
            <Button 
              onClick={executeResetRoadmap} 
              disabled={resetRoadmapConfirm.toUpperCase() !== "RESET"}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
            >
              Reset Roadmap
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reset Budget Modal */}
      <Modal isOpen={showResetBudget} onClose={() => setShowResetBudget(false)} title="Reset Budget Planner?">
        <div className="space-y-4">
          <p className="text-slate-500">
            This will clear all your Budget Planner selections and return to default estimates.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setShowResetBudget(false)}>Cancel</Button>
            <Button onClick={executeResetBudget} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              Confirm Reset
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Account Modals (Step 1-3) */}
      <Modal isOpen={deleteStep === 1} onClose={() => setDeleteStep(0)} title="Permanently Delete Account?">
        <div className="space-y-4">
          <p className="text-slate-500">
            This will remove your profile, roadmap progress, budget planner data, and all community activity. This cannot be undone.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setDeleteStep(0)}>Cancel</Button>
            <Button onClick={() => setDeleteStep(2)} className="bg-red-600 hover:bg-red-700 text-white font-bold">
              Continue &rarr;
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={deleteStep === 2} onClose={() => setDeleteStep(0)} title="Before you go...">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>What's your reason? (optional)</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={deleteReason}
              onChange={e => setDeleteReason(e.target.value)}
            >
              <option value="" disabled>Select a reason...</option>
              <option value="completed">Completed my UAE onboarding</option>
              <option value="switching">Switching to a different tool</option>
              <option value="privacy">Privacy concerns</option>
              <option value="technical">Technical issues</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="ghost" onClick={() => setDeleteStep(3)}>Skip</Button>
            <Button onClick={() => setDeleteStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
              Continue &rarr;
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={deleteStep === 3} onClose={() => { setDeleteStep(0); setDeleteEmailConfirm(""); }} title="Final Confirmation">
        <div className="space-y-4">
          <div>
            <Label className="text-slate-700">Type your email address (<strong className="text-slate-900">student@university.ac.ae</strong>) to confirm deletion:</Label>
            <Input 
              value={deleteEmailConfirm} 
              onChange={(e) => setDeleteEmailConfirm(e.target.value)} 
              placeholder="student@university.ac.ae"
              className="mt-2"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => { setDeleteStep(0); setDeleteEmailConfirm(""); }}>Cancel</Button>
            <Button 
              onClick={executeDeleteAccount} 
              disabled={deleteEmailConfirm.toLowerCase() !== "student@university.ac.ae"}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Permanently Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
