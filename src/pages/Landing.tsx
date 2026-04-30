import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  Users, 
  MessageCircle,
  ChevronDown,
  Sparkles,
  Map,
  CreditCard,
  FileCheck
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";

export function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Basic scroll effect for hero
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const faqs = [
    { q: "Do I need an Emirates ID to open a bank account?", a: "Generally yes, but some digital banks like Liv. or Mashreq Neo allow you to start the process with your passport and visa. Landed shows you exactly which ones." },
    { q: "How long does the whole process take?", a: "Your core setup (Visa, ID, Bank, SIM) usually takes 15-20 days. Our roadmap optimizes the order so you don't waste time." },
    { q: "Is Landed officially affiliated with the government?", a: "No, we are an independent platform built by former international students to simplify the complex government and private processes in the UAE." },
    { q: "Does Landed cost anything?", a: "The core personalized roadmap and community are free. We may recommend verified third-party services that have their own fees." }
  ];

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-50 scroll-smooth selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#030712] to-[#030712]"></div>
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-[#0A0F1C]/70 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Logo light className="text-2xl" />
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">Workflow</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <Button asChild className="rounded-full bg-white text-black hover:bg-slate-200 font-bold px-6 h-10 transition-all">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Glow Effects (Optimized for 0 lag) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-blue-600/5 to-transparent rounded-full -z-10 pointer-events-none transform-gpu" />
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-purple-600/5 to-transparent rounded-full -z-10 pointer-events-none transform-gpu" />
        
        <div className="max-w-7xl mx-auto text-center space-y-10 z-10 w-full">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Your UAE Journey starts here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] text-white max-w-5xl mx-auto"
          >
            Don't just move to the UAE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Arrive Prepared.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Ditch the Reddit threads and confusing government portals. Get a personalized, step-by-step roadmap to set up your life in the Emirates.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
          >
             <Button asChild size="lg" className="h-14 px-8 text-base font-bold rounded-full bg-white text-black hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 group">
               <Link to="/auth">
                 Build My Free Roadmap 
                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-full border-white/20 hover:bg-white/5 text-white transition-all bg-transparent">
               <a href="#how-it-works">See how it works</a>
             </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Divider */}
      <section className="border-y border-white/5 bg-[#0A0F1C]/50 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/5">
          {[
            { metric: "12", label: "Universities Supported" },
            { metric: "30", label: "Days Roadmap" },
            { metric: "100%", label: "Free for Students" },
            { metric: "24/7", label: "AI Assistance" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <p className="text-3xl md:text-5xl font-black mb-2 text-white tracking-tight">{stat.metric}</p>
              <p className="text-slate-400 font-medium text-sm tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section (Colored Widgets) */}
      <section id="how-it-works" className="py-32 px-6 relative z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-widest mb-4 block">The Workflow</h2>
             <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">How it works</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
             {[
               { 
                 title: "1. Profile Sync", 
                 desc: "Tell us your university, arrival date, and nationality. Our engine processes the exact legal logic needed for your situation.", 
                 icon: Globe,
                 color: "from-blue-500 to-cyan-400",
                 bgGlow: "bg-blue-500/10",
                 borderColor: "border-blue-500/20"
               },
               { 
                 title: "2. Generate Roadmap", 
                 desc: "Instantly receive a strictly prioritized checklist—Visa, Emirates ID, SIM, Bank Account—in the exact order to prevent delays.", 
                 icon: ShieldCheck,
                 color: "from-purple-500 to-pink-500",
                 bgGlow: "bg-purple-500/10",
                 borderColor: "border-purple-500/20"
               },
               { 
                 title: "3. Execute & Chat", 
                 desc: "Check off items as you go. Stuck? Ask our AI assistant trained exclusively on UAE government procedures and student experiences.", 
                 icon: Zap,
                 color: "from-emerald-400 to-teal-500",
                 bgGlow: "bg-emerald-500/10",
                 borderColor: "border-emerald-500/20"
               }
             ].map((step, i) => (
               <div key={i} className={cn("relative p-8 rounded-3xl border bg-[#0A0F1C]/80 backdrop-blur-sm group hover:-translate-y-2 transition-transform duration-300", step.borderColor)}>
                  <div className={cn("absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10", step.bgGlow)} />
                  <div className={cn("inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-6 bg-gradient-to-br shadow-lg", step.color)}>
                     <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 bg-[#0A0F1C] relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">Everything you need.<br/>Nothing you don't.</h2>
            <p className="text-xl text-slate-400 max-w-2xl font-medium mx-auto md:mx-0">Built by former international students who navigated the exact same maze. Here is your arsenal.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Large Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] -translate-y-1/2 translate-x-1/4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-blue-500/5 to-transparent -z-10 rounded-full group-hover:from-blue-500/30 transition-colors transform-gpu pointer-events-none" />
              <Map className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Smart Logic Engine</h3>
              <p className="text-slate-400 text-lg max-w-lg">Our logic engine calculates prerequisites. You won't try to open a bank account before your residency is ready, saving you useless trips across Dubai.</p>
            </div>
            
            {/* Bento Small Card 1 */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] -translate-y-1/3 translate-x-1/3 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-purple-500/5 to-transparent -z-10 rounded-full group-hover:from-purple-500/30 transition-colors transform-gpu pointer-events-none" />
              <CreditCard className="w-10 h-10 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Budget Planner</h3>
              <p className="text-slate-400">Track upfront costs. Know exactly how much to bring for deposits, fees, and first-month rent.</p>
            </div>

            {/* Bento Small Card 2 */}
            <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] translate-y-1/3 translate-x-1/3 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-500/5 to-transparent -z-10 rounded-full group-hover:from-emerald-500/30 transition-colors transform-gpu pointer-events-none" />
              <FileCheck className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Doc Verifier</h3>
              <p className="text-slate-400">Learn the exact requirements for photos, attestations, and passport formats before submitting.</p>
            </div>
            
            {/* Bento Large Card Bottom */}
            <div className="md:col-span-2 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center group">
              <div className="flex-1">
                <Users className="w-10 h-10 text-pink-400 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">Finding your tribe</h3>
                <p className="text-slate-400 text-lg">You aren't doing this alone. Connect with other students landing the exact same week, at the exact same university. Swap tips and share taxis.</p>
              </div>
              <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-pink-500/5 to-transparent -z-10 group-hover:from-pink-500/20 transition-colors pointer-events-none transform-gpu" />
                <MessageCircle className="w-16 h-16 text-pink-400/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative z-10 bg-[#030712]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center tracking-tight">Got Questions?</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-6 md:p-8 flex justify-between items-center text-left"
                >
                  <span className="text-lg font-bold text-white pr-8">{faq.q}</span>
                  <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform shrink-0", activeFaq === i && "rotate-180")} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 md:px-8 pb-8 text-slate-400 font-medium leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/uae/1920/1080')] opacity-[0.04] grayscale mix-blend-overlay" />
           
           <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight relative z-10">
             Your UAE Journey <br/> Starts Here.
           </h2>
           <p className="text-xl text-blue-200/80 max-w-2xl mx-auto mb-12 relative z-10 font-medium">
             Join thousands of international students who used Landed to navigate their first 30 days hassle-free.
           </p>
           <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-full bg-white text-black hover:bg-slate-200 shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:scale-105 relative z-10">
             <Link to="/auth">Create Your Roadmap</Link>
           </Button>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10 bg-[#030712]">
         <div className="flex justify-center mb-6">
           <Logo light className="text-3xl" />
         </div>
         <p className="text-slate-500 font-medium text-sm">© 2026 Landed Tech. Developed for efficiency & performance.</p>
      </footer>
    </div>
  );
}
