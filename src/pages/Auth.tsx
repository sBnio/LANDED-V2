import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Auth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"choose" | "email" | "verify">("choose");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleGoogleAuth = () => {
    // For now, prepared logic, just skips to onboarding
    navigate("/onboarding");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep("verify");
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      // Mock successful verification
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-6 sm:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-8">
          <Logo className="text-3xl" />
        </div>
        
        <div className="bg-white py-12 px-8 shadow-xl shadow-slate-200/50 rounded-[32px] sm:px-12 border border-slate-100">
          {step === "choose" && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Welcome Back</h2>
                <p className="text-slate-500 font-medium">Log in or sign up to continue</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 px-4 py-4 rounded-2xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium">
                    <span className="px-3 bg-white text-slate-500 uppercase tracking-widest text-[10px]">Or</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center gap-3 bg-blue-50 border border-blue-100 px-4 py-4 rounded-2xl text-blue-700 font-bold hover:bg-blue-100 transition-all shadow-sm"
                >
                  <Mail className="w-5 h-5" />
                  Continue with Email
                </button>
              </div>
            </div>
          )}

          {step === "email" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div>
                <button 
                  onClick={() => setStep("choose")}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">What's your email?</h2>
                <p className="text-slate-500 font-medium">We'll send you a verification code.</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.ac.ae"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>
                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all">
                  Send Code
                </Button>
              </form>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div>
                <button 
                  onClick={() => setStep("email")}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 mb-6 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Check your email</h2>
                <p className="text-slate-500 font-medium">We sent a 6-digit code to <span className="text-slate-900 font-bold">{email}</span></p>
              </div>

              <form onSubmit={handleVerifySubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    required
                    pattern="[0-9]*"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="w-full px-5 py-4 text-center tracking-[0.5em] text-2xl bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 font-black placeholder:text-slate-300"
                  />
                </div>
                <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-blue-200 transition-all">
                  Verify & Continue
                </Button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
