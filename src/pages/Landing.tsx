import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Zap, 
  ChevronDown
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    { q: "Do I need an Emirates ID to open a bank account?", a: "Generally yes, but some digital banks like Liv. or Mashreq Neo allow you to start the process with your passport and visa. Landed shows you exactly which ones." },
    { q: "How long does the whole process take?", a: "Your core setup (Visa, ID, Bank, SIM) usually takes 15-20 days. Our roadmap optimizes the order so you don't waste time." },
    { q: "Is Landed officially affiliated with the government?", a: "No, we are an independent platform built by former international students to simplify the complex government and private processes in the UAE." },
    { q: "Does Landed cost anything?", a: "The core personalized roadmap and community are free. We may recommend verified third-party services that have their own fees." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-amber-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Logo className="text-2xl text-white" />
          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <Button asChild className="rounded-full bg-white hover:bg-slate-200 text-slate-900 font-black px-6 h-12 shadow-lg shadow-white/10 transition-transform hover:scale-105 active:scale-95">
            <Link to="/auth">GET STARTED</Link>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative z-10 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block relative overflow-hidden group mb-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-30 group-hover:opacity-60 blur transition-opacity duration-500" />
            <div className="relative border border-blue-500/30 bg-blue-500/10 backdrop-blur-md px-6 py-2 rounded-full text-blue-300 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Your UAE Journey Starts Here
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 uppercase pb-4"
          >
            Land in the UAE <br /> <span className="text-blue-500 italic mix-blend-lighten">Fully Prepared.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Every year, thousands of international students arrive overwhelmed. Landed gives you a personalized, step-by-step onboarding plan — so you start studying, not stressing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center pt-8"
          >
             <Button asChild size="lg" className="h-20 px-12 text-xl font-black rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 uppercase tracking-widest group border border-blue-400/50">
               <Link to="/auth">
                 Build My Plan Now
                 <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </Link>
             </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="py-24 relative z-10 border-y border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          {[
            { value: "30 DAYS", label: "fully mapped" },
            { value: "AVOID", label: "onboarding mistakes" },
            { value: "12+", label: "UAE Universities Supported" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-2 group"
            >
              <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-200 italic uppercase group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">{stat.value}</p>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tight leading-tight">Everything you need to <br/><span className="text-blue-500">land confidently</span></h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">Built specifically for international students arriving in the UAE.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🗺", title: "Personalized Roadmap", desc: "A step-by-step checklist built around your nationality, university, and arrival date.", glow: "bg-blue-500/20 group-hover:bg-blue-400/30" },
              { emoji: "💰", title: "Budget Planner", desc: "Know exactly how much money to bring before you land. Adjust for what you've already paid.", glow: "bg-emerald-500/20 group-hover:bg-emerald-400/30" },
              { emoji: "📋", title: "Document Checklists", desc: "Every service tells you exactly what to bring and the most common reason students get turned away.", glow: "bg-amber-500/20 group-hover:bg-amber-400/30" },
              { emoji: "🏢", title: "Services Directory", desc: "Student-relevant services near your campus. Banks, SIM cards, housing, medical centres.", glow: "bg-purple-500/20 group-hover:bg-purple-400/30" },
              { emoji: "👥", title: "Community", desc: "Connect with students at your university arriving the same semester.", glow: "bg-rose-500/20 group-hover:bg-rose-400/30" },
              { emoji: "🤖", title: "AI Assistant", desc: "Ask anything in plain language — visa steps, bank requirements. Get a clear answer instantly.", glow: "bg-indigo-500/20 group-hover:bg-indigo-400/30" }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 backdrop-blur-md overflow-hidden relative"
              >
                <div className={cn("absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full transition-colors duration-500", feature.glow)} />
                <div className="text-4xl mb-6 relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  {feature.emoji}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm relative z-10">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
             <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.3em] mb-4">The Workflow</h2>
             <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">HOW WE NAVIGATE <br/>THE UAE FOR YOU.</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 relative">
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2 hidden md:block" />
             {[
               { title: "PROFILE SYNC", desc: "We analyze your university, age and visa status to build your logic.", icon: Globe, color: "from-blue-500 to-blue-700", shadow: "shadow-blue-900/50" },
               { title: "ROADMAP BUILD", desc: "Instantly receive a prioritized checklist of every document & fee.", icon: ShieldCheck, color: "from-amber-400 to-orange-600", shadow: "shadow-amber-900/50" },
               { title: "LIVE EXECUTION", desc: "Mark tasks as done, chat with AI, and join our student community.", icon: Zap, color: "from-emerald-400 to-teal-600", shadow: "shadow-emerald-900/50" }
             ].map((step, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2, duration: 0.6 }}
                 className="relative z-10 bg-slate-900/80 border border-white/10 p-10 rounded-[2rem] text-center group hover:bg-slate-800 transition-colors backdrop-blur-md"
               >
                  <div className={cn("w-20 h-20 bg-gradient-to-br text-white rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-2xl group-hover:rotate-12 transition-transform duration-500 group-hover:scale-110", step.color, step.shadow)}>
                     <step.icon className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-black text-white mb-4 uppercase">{i+1}. {step.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-16 uppercase italic text-center drop-shadow-xl"
          >
            QUESTIONS?
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg md:text-xl font-bold text-white uppercase tracking-tight pr-8">{faq.q}</span>
                  <ChevronDown className={cn("w-6 h-6 text-blue-500 transition-transform flex-shrink-0", activeFaq === i && "rotate-180")} />
                </button>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-8 pb-8 text-slate-400 font-medium leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 px-6 text-center relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 rounded-[3rem] mx-6 md:mx-12 overflow-hidden shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/uae2/1920/1080')] opacity-20 mix-blend-overlay grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto relative z-20 py-20 px-6">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl lg:text-9xl font-black mb-12 uppercase italic leading-[0.85] text-white"
           >
             STOP WORRYING. <br /> START LANDING.
           </motion.h2>
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
           >
             <Button asChild size="lg" className="h-20 px-12 md:px-16 text-xl font-black rounded-full bg-white text-blue-900 hover:bg-slate-100 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95 uppercase tracking-widest group">
               <Link to="/auth">
                 CREATE MY ROADMAP 
                 <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
               </Link>
             </Button>
           </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10 bg-slate-950">
         <Logo className="text-2xl mb-6 mx-auto text-white opacity-50 hover:opacity-100 transition-opacity" />
         <p className="text-slate-600 font-bold text-xs uppercase tracking-[0.2em]">© 2026 LANDED. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

