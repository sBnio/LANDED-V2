import { useState, useRef } from "react";
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
  FileCheck,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BiologicalHeart } from "@/components/ui/BiologicalHeart";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

export function Landing() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const faqs = [
    { q: "Do I need an Emirates ID to open a bank account?", a: "Generally yes, but some digital banks like Liv. or Mashreq Neo allow you to start the process with your passport and visa. Landed shows you exactly which ones." },
    { q: "How long does the whole process take?", a: "Your core setup (Visa, ID, Bank, SIM) usually takes 15-20 days. Our roadmap optimizes the order so you don't waste time." },
    { q: "Is Landed officially affiliated with the government?", a: "No, we are an independent platform built by former international students to simplify the complex government and private processes in the UAE." },
    { q: "Does Landed cost anything?", a: "The core personalized roadmap and community are free. We may recommend verified third-party services that have their own fees." }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] font-sans text-neutral-300 scroll-smooth selection:bg-neutral-800 selection:text-white">
      {/* Background grain & grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,206,0.1),rgba(255,255,255,0))]" />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 h-16 flex justify-between items-center"
      >
        <Logo light className="text-xl" />
        <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">Workflow</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="hidden md:block text-sm font-medium hover:text-white transition-colors text-neutral-400">Log in</Link>
          <Button asChild className="rounded-full bg-white text-black hover:bg-neutral-200 font-semibold px-6 h-10 transition-all text-sm">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-5xl mx-auto text-center space-y-8 z-10 w-full relative">
          
          {/* Biological Beating Heart Background */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] -z-10 pointer-events-none flex items-center justify-center opacity-80 mix-blend-screen">
             <BiologicalHeart className="w-full h-full" />
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-medium text-red-200 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>The heart of your onboarding</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-medium tracking-tighter leading-[1.0] text-white max-w-4xl mx-auto"
          >
            Intelligent setup for<br className="hidden md:block" />
            <span className="text-neutral-500"> modern students.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Ditch the Reddit threads and confusing government portals. Get a personalized, step-by-step roadmap to automate your arrival in the Emirates.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
             <Button asChild size="lg" className="h-14 px-8 text-base font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
               <Link to="/auth">
                 Start Free Trial 
                 <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-medium rounded-full border-white/10 hover:bg-white/[0.03] text-white transition-all bg-transparent backdrop-blur-sm">
               <a href="#how-it-works">Explore the platform</a>
             </Button>
          </motion.div>
        </div>
      </section>

      {/* Universities Ticker Section */}
      <section className="py-16 relative z-10 border-y border-white/5 bg-[#0A0A0A]/80 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
           <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest">Supporting students from 12+ top institutions</p>
        </div>
        
        {/* Marquee container */}
        <div className="relative flex overflow-hidden group">
          {/* Fading edges to make it look seamless */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 md:gap-24 items-center whitespace-nowrap pl-16 md:pl-24"
          >
            {/* Duplicated list to create the seamless loop */}
            {[
              { name: "UOW Dubai", logo: "https://logo.clearbit.com/uowdubai.ac.ae" },
              { name: "AUD", logo: "https://logo.clearbit.com/aud.edu" },
              { name: "Heriot-Watt", logo: "https://logo.clearbit.com/hw.ac.uk" },
              { name: "Birmingham", logo: "https://logo.clearbit.com/birmingham.ac.ae" },
              { name: "BITS Pilani", logo: "https://logo.clearbit.com/bits-pilani.ac.in" },
              { name: "Middlesex", logo: "https://logo.clearbit.com/mdx.ac.ae" },
              { name: "CUD", logo: "https://logo.clearbit.com/cud.ac.ae" },
              { name: "NYUAD", logo: "https://logo.clearbit.com/nyuad.nyu.edu" },
              { name: "Khalifa", logo: "https://logo.clearbit.com/ku.ac.ae" },
              { name: "UAEU", logo: "https://logo.clearbit.com/uaeu.ac.ae" },
              { name: "AUS", logo: "https://logo.clearbit.com/aus.edu" },
              { name: "Zayed", logo: "https://logo.clearbit.com/zu.ac.ae" },
              // Repeated for loop (first copy)
              { name: "UOW Dubai", logo: "https://logo.clearbit.com/uowdubai.ac.ae" },
              { name: "AUD", logo: "https://logo.clearbit.com/aud.edu" },
              { name: "Heriot-Watt", logo: "https://logo.clearbit.com/hw.ac.uk" },
              { name: "Birmingham", logo: "https://logo.clearbit.com/birmingham.ac.ae" },
              { name: "BITS Pilani", logo: "https://logo.clearbit.com/bits-pilani.ac.in" },
              { name: "Middlesex", logo: "https://logo.clearbit.com/mdx.ac.ae" },
              { name: "CUD", logo: "https://logo.clearbit.com/cud.ac.ae" },
              { name: "NYUAD", logo: "https://logo.clearbit.com/nyuad.nyu.edu" },
              { name: "Khalifa", logo: "https://logo.clearbit.com/ku.ac.ae" },
              { name: "UAEU", logo: "https://logo.clearbit.com/uaeu.ac.ae" },
              { name: "AUS", logo: "https://logo.clearbit.com/aus.edu" },
              { name: "Zayed", logo: "https://logo.clearbit.com/zu.ac.ae" }
            ].map((uni, i) => (
              <div key={i} className="flex items-center justify-center opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 hover:scale-110 cursor-default">
                <img 
                  src={uni.logo} 
                  alt={uni.name} 
                  className="h-10 w-auto object-contain max-w-[140px]"
                  title={uni.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-xl font-bold tracking-tight text-white">{uni.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="how-it-works" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-24">
             <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8 backdrop-blur-md">
               Process
             </div>
             <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight max-w-2xl">
               Our simple, smart, and scalable process.
             </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 relative">
             {/* Connection Line (Desktop) */}
             <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

             {[
               { 
                 title: "Connect Data", 
                 desc: "Input your university, arrival date, and nationality. Our engine maps your legal path instantly.", 
                 icon: Globe,
               },
               { 
                 title: "Generate Roadmap", 
                 desc: "Receive a prioritized checklist (Visa, ID, SIM, Bank) ordered perfectly for minimum delays.", 
                 icon: Zap,
               },
               { 
                 title: "Automate Execution", 
                 desc: "Action items as you go and use our AI to handle document verification and fast-tracking.", 
                 icon: CheckCircle2,
               }
             ].map((step, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: i * 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
                 whileHover={{ y: -8, scale: 1.02 }}
                 key={i} 
                 className="relative p-8 rounded-[2rem] border border-white/5 bg-[#0a0a0a] group hover:border-white/10 transition-colors cursor-default"
               >
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-[#0f0f0f] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] group-hover:scale-110 transition-all duration-300">
                     <step.icon className="w-5 h-5 text-white group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3">{step.title}</h4>
                  <p className="text-neutral-400 font-normal leading-relaxed text-sm">{step.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section id="features" className="py-32 px-6 relative z-10 border-y border-white/5 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start mb-20 text-center md:text-left">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 backdrop-blur-md">
               Features
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight max-w-3xl">
              Everything you need.<br />
              <span className="text-neutral-600">Nothing you don't.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Bento Large Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <Map className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-indigo-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-2xl font-medium text-white mb-3">Smart Logic Engine</h3>
              <p className="text-neutral-400 text-base max-w-md leading-relaxed">
                Our inference engine pre-calculates prerequisites. You'll never attempt to open a bank account before your Emirates ID is actively being processed.
              </p>
            </motion.div>
            
            {/* Bento Small Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="md:col-span-2 bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <CreditCard className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-amber-400 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-xl font-medium text-white mb-3">Budget Planner</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Predict mandatory upfront costs like deposits, processing fees, and utility setups instantly.
              </p>
            </motion.div>

            {/* Bento Small Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="md:col-span-2 bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <FileCheck className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-emerald-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-xl font-medium text-white mb-3">Doc Verifier</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Check exact dimensions, formats, and attestations required before entering any center.
              </p>
            </motion.div>
            
            {/* Bento Large Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-4 bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center group hover:border-white/10 transition-all duration-300 cursor-default"
            >
              <div className="flex-1">
                <Users className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-pink-400 group-hover:-translate-y-2 transition-all duration-300" />
                <h3 className="text-2xl font-medium text-white mb-3">High-value Networking</h3>
                <p className="text-neutral-400 text-base leading-relaxed max-w-sm">
                  Connect precisely with peers arriving the same week at your university. Compound knowledge, share rides, minimize friction.
                </p>
              </div>
              <div className="w-full md:w-48 aspect-square rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-white/[0.04] transition-colors duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-150" />
                <MessageCircle className="w-10 h-10 text-white/50 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Got Questions?</h2>
          <p className="text-neutral-400">Everything you need to know about the platform and how it works.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
              key={i} 
              className="border-b border-white/10 overflow-hidden"
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-6 flex justify-between items-center text-left group"
              >
                <span className="text-lg font-medium pr-8 text-neutral-300 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{faq.q}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.02] group-hover:bg-white/[0.08] transition-colors duration-300 shrink-0">
                  <ChevronRight className={cn("w-4 h-4 text-neutral-500 group-hover:text-white transition-transform duration-300", activeFaq === i && "rotate-90")} />
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, width: "95%" }}
                    animate={{ height: "auto", opacity: 1, width: "100%" }}
                    exit={{ height: 0, opacity: 0, width: "95%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-neutral-400 font-normal leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative"
        >
           <h2 className="text-5xl md:text-7xl font-medium mb-6 text-white tracking-tight">
             Ready to scale?
           </h2>
           <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10 font-normal">
             Don't leave your arrival to chance. Join the ecosystem and handle the bureaucracy efficiently.
           </p>
           <Button asChild size="lg" className="h-14 px-10 text-base font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
             <Link to="/auth">Create Your Roadmap</Link>
           </Button>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10 bg-[#050505]">
         <div className="flex justify-center mb-6">
           <Logo light className="text-2xl" />
         </div>
         <p className="text-neutral-500 font-normal text-sm tracking-wide">© 2026 Landed Tech. Built for the modern ecosystem.</p>
      </footer>
    </div>
  );
}
