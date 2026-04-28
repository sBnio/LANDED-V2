import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Users, 
  MessageCircle,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Do I need an Emirates ID to open a bank account?", a: "Generally yes, but some digital banks like Liv. or Mashreq Neo allow you to start the process with your passport and visa. Landed shows you exactly which ones." },
    { q: "How long does the whole process take?", a: "Your core setup (Visa, ID, Bank, SIM) usually takes 15-20 days. Our roadmap optimizes the order so you don't waste time." },
    { q: "Is Landed officially affiliated with the government?", a: "No, we are an independent platform built by former international students to simplify the complex government and private processes in the UAE." },
    { q: "Does Landed cost anything?", a: "The core personalized roadmap and community are free. We may recommend verified third-party services that have their own fees." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo className="text-2xl" />
          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest text-slate-500">
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black px-6 h-12 shadow-lg shadow-blue-200">
            <Link to="/auth">GET STARTED</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-slate-900 max-w-5xl mx-auto uppercase italic">
            LAND IN THE UAE <br /> <span className="text-blue-600">FULLY PREPARED.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
            Every year, thousands of international students arrive in the UAE overwhelmed and underprepared. Landed gives them a personalized, step-by-step onboarding plan — so they start studying, not stressing.
          </p>
          <div className="flex justify-center pt-4">
             <Button asChild size="lg" className="h-20 px-12 text-xl font-black rounded-[32px] bg-blue-600 hover:bg-blue-700 text-white shadow-2xl shadow-blue-300 transition-all hover:scale-105 uppercase tracking-widest">
               <Link to="/auth">Build My Plan Now</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-black mb-2 text-blue-400 italic uppercase">Your first 90 days,</p>
            <p className="text-blue-100/50 font-bold uppercase tracking-[0.2em] text-[10px]">fully mapped</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-black mb-2 text-blue-400 italic uppercase leading-tight">Avoid the most expensive</p>
            <p className="text-blue-100/50 font-bold uppercase tracking-[0.2em] text-[10px]">onboarding mistakes</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-5xl font-black mb-2 text-blue-400 italic">12</p>
            <p className="text-blue-100/50 font-bold uppercase tracking-[0.2em] text-xs">UAE Universities Supported</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-6 block">The Workflow</h2>
             <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase italic leading-none">HOW WE NAVIGATE THE UAE FOR YOU.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-16 relative">
             <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-100 -translate-y-1/2 hidden md:block" />
             {[
               { title: "PROFILE SYNC", desc: "Share your university and arrival date. We analyze your age and visa status to build your logic.", icon: Globe },
               { title: "ROADMAP BUILD", desc: "Instantly receive a prioritized checklist of every document, appointment, and fee you'll encounter.", icon: ShieldCheck },
               { title: "LIVE EXECUTION", desc: "Mark tasks as done, chat with our AI assistant for real-time help, and join our student community.", icon: Zap }
             ].map((step, i) => (
               <div key={i} className="relative z-10 bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl text-center group hover:-translate-y-4 transition-all duration-500">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-blue-200 group-hover:rotate-12 transition-transform">
                     <step.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 uppercase">{i+1}. {step.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-16 uppercase italic text-center">QUESTIONS?</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-2 border-slate-100 rounded-3xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl font-black text-slate-900 uppercase tracking-tight">{faq.q}</span>
                  <ChevronDown className={cn("w-6 h-6 transition-transform", activeFaq === i && "rotate-180")} />
                </button>
                {activeFaq === i && (
                  <div className="px-8 pb-8 text-slate-600 font-medium leading-relaxed animate-in slide-in-from-top-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 text-center bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/uae/1920/1080')] opacity-10 grayscale mix-blend-overlay" />
        <div className="max-w-4xl mx-auto relative z-10">
           <h2 className="text-5xl md:text-8xl font-black mb-12 uppercase italic leading-none">STOP WORRYING. <br /> START LANDING.</h2>
           <Button asChild size="lg" className="h-20 px-16 text-xl font-black rounded-full bg-white text-blue-600 hover:bg-white/90 shadow-2xl shadow-blue-900 transition-all hover:scale-105 uppercase tracking-widest">
             <Link to="/auth">CREATE MY ROADMAP <ArrowRight className="ml-2 w-6 h-6" /></Link>
           </Button>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-slate-100 text-center">
         <Logo className="text-2xl mb-6 mx-auto" />
         <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">© 2026 LANDED TECH. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
