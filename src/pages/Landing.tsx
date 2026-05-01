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
  ChevronRight,
  Building2,
  Lock,
  MapPin,
  SlidersHorizontal
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { DubaiSkyline } from "@/components/ui/DubaiSkyline";
import { WaitlistSection } from "@/components/ui/WaitlistSection";
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
    <div ref={containerRef} className="min-h-screen bg-[#020202] font-sans text-neutral-300 scroll-smooth selection:bg-neutral-800 selection:text-white">
      {/* Immersive background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_60%)] blur-[80px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)] blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06),transparent_60%)] blur-[100px] mix-blend-screen" />

        {/* 3D Tech Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%)',
            transform: 'perspective(100vh) rotateX(60deg) scale(2.5) translateY(-10%)',
            transformOrigin: 'top center'
          }}
        />

        {/* Dense dots pattern top */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)',
          }}
        />
        
        {/* Grain overlay for premium startup feel */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
      
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
        {/* Dubai Landscape Background */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] z-0 pointer-events-none opacity-100 mix-blend-screen overflow-hidden">
           <DubaiSkyline />
           {/* Fade out bottom of skyline to blend into the dark background */}
           <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-10" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 z-10 w-full relative">

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs md:text-sm font-medium text-orange-200 backdrop-blur-md shadow-[0_0_30px_rgba(234,88,12,0.15)] mx-auto"
          >
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
            <span className="tracking-wide">The intelligent OS for your onboarding</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-medium tracking-tighter leading-[1.0] text-white max-w-4xl mx-auto drop-shadow-2xl"
          >
            Intelligent setup for<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300"> modern students.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md"
          >
            Ditch the Reddit threads and confusing government portals. Get a personalized, step-by-step roadmap to automate your arrival in the Emirates.
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
          >
             <Button asChild size="lg" className="h-14 px-8 text-base font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-[0.98] group shadow-[0_0_40px_rgba(255,255,255,0.15)] relative overflow-hidden">
               <Link to="/auth">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shine_1.5s_ease-out]" />
                 <span className="relative z-10 flex items-center">
                   Deploy Roadmap 
                   <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </span>
               </Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-medium rounded-full border border-white/20 hover:border-white/40 hover:bg-white/[0.05] text-white transition-all bg-white/[0.02] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
               <a href="#how-it-works">See how it works</a>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.03),transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col items-center text-center mb-24">
             <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
               Process
             </div>
             <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight max-w-2xl">
               Our simple, smart, and scalable process.
             </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 relative mt-12">
             {/* Connection Line (Desktop) */}
             <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent -z-10" />
             <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-red-500/10 to-transparent blur-[4px] -z-10" />

             {[
               { 
                 title: "Connect Data", 
                 desc: "Input your university, arrival date, and nationality. Our engine maps your legal path instantly.", 
                 icon: Globe,
                 color: "text-blue-400",
                 bgColor: "group-hover:bg-blue-500/10",
                 borderColor: "group-hover:border-blue-500/30"
               },
               { 
                 title: "Generate Roadmap", 
                 desc: "Receive a prioritized checklist (Visa, ID, SIM, Bank) ordered perfectly for minimum delays.", 
                 icon: Zap,
                 color: "text-amber-400",
                 bgColor: "group-hover:bg-amber-500/10",
                 borderColor: "group-hover:border-amber-500/30"
               },
               { 
                 title: "Automate Execution", 
                 desc: "Action items as you go and use our AI to handle document verification and fast-tracking.", 
                 icon: CheckCircle2,
                 color: "text-emerald-400",
                 bgColor: "group-hover:bg-emerald-500/10",
                 borderColor: "group-hover:border-emerald-500/30"
               }
             ].map((step, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ delay: i * 0.2, duration: 0.8, type: "spring", bounce: 0.4 }}
                 whileHover={{ y: -8, scale: 1.02 }}
                 key={i} 
                 className={`relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl group transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden ${step.borderColor}`}
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${step.color.replace('text-', 'bg-')}`} />
                  
                  <div className={`w-14 h-14 rounded-full border border-white/10 bg-[#0f0f0f] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.03)] group-hover:scale-110 transition-all duration-300 relative z-10 ${step.bgColor}`}>
                     <step.icon className={`w-6 h-6 text-white transition-colors duration-300 ${step.color.replace('text-', 'group-hover:text-')}`} />
                  </div>
                  <h4 className="text-2xl font-medium text-white mb-4 relative z-10">{step.title}</h4>
                  <p className="text-neutral-400 font-normal leading-relaxed text-sm md:text-base relative z-10">{step.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Section (Bento Grid) */}
      <section id="features" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start mb-20 text-center md:text-left">
             <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
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
              className="md:col-span-4 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent)] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <Map className="w-10 h-10 text-white mb-8 opacity-80 group-hover:text-red-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_20px_rgba(248,113,113,0.4)]" />
              <h3 className="text-3xl font-medium text-white mb-4">Smart Logic Engine</h3>
              <p className="text-neutral-400 text-base md:text-lg max-w-lg leading-relaxed">
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
              className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <CreditCard className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-amber-400 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <h3 className="text-2xl font-medium text-white mb-3">Budget Planner</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
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
              className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <FileCheck className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-emerald-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <h3 className="text-2xl font-medium text-white mb-3">Doc Verifier</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Check exact dimensions, formats, and attestations required before entering any center.
              </p>
            </motion.div>

            {/* Secure Vault */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <Lock className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-blue-400 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <h3 className="text-2xl font-medium text-white mb-3">Secure Vault</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Store and access your attested documents anytime, anywhere without compromises.
              </p>
            </motion.div>

            {/* Networking (Shrunk to md:col-span-2) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="md:col-span-2 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <Users className="w-8 h-8 text-white mb-8 opacity-80 group-hover:text-pink-400 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
              <h3 className="text-2xl font-medium text-white mb-3">Networking</h3>
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                Connect with peers arriving the same week. Share rides & minimize friction.
              </p>
            </motion.div>

            {/* Local Services (Wide md:col-span-6) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="md:col-span-6 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center group hover:border-white/10 transition-all duration-500 cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl"
            >
              <div className="flex-1 z-10 w-full md:pr-10">
                <Building2 className="w-10 h-10 text-white mb-8 opacity-80 group-hover:text-cyan-400 group-hover:-translate-y-2 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                <h3 className="text-3xl font-medium text-white mb-4">Local Services Discovery</h3>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  Find the best student-friendly services—banks, clinics, telecom—filtered by proximity to your university and sorted by processing speed and cost.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-sm text-neutral-300 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Near University
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-sm text-neutral-300 font-medium">
                    <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                    Sort by Setup Time
                  </div>
                </div>
              </div>
              <div className="w-full md:w-96 rounded-[2rem] bg-[#080808] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent)] opacity-100" />
                
                {/* Mock UI of banks list */}
                <div className="w-full space-y-4 relative z-10">
                   <div className="w-full bg-white/[0.06] border border-white/10 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                         <Building2 className="w-6 h-6 text-cyan-400" />
                       </div>
                       <div>
                         <div className="text-white text-base font-medium">Emirates NBD</div>
                         <div className="text-neutral-400 text-xs mt-0.5">0.5 km away</div>
                       </div>
                     </div>
                     <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                       Fast setup
                     </div>
                   </div>

                   <div className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md transform group-hover:scale-105 transition-all duration-500 delay-100">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                         <Building2 className="w-6 h-6 text-neutral-400" />
                       </div>
                       <div>
                         <div className="text-neutral-300 text-base font-medium">ADCB Zero</div>
                         <div className="text-neutral-500 text-xs mt-0.5">1.2 km away</div>
                       </div>
                     </div>
                     <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-neutral-400 text-xs font-semibold">
                       Standard
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">Got Questions?</h2>
          <p className="text-neutral-400 text-lg">Everything you need to know about the platform and how it works.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5, type: "spring", bounce: 0.3 }}
              key={i} 
              className={`bg-white/[0.02] border ${activeFaq === i ? 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'border-white/5'} rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]`}
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-6 px-8 flex justify-between items-center text-left group"
              >
                <span className={`text-lg font-medium pr-8 transition-colors duration-300 ${activeFaq === i ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${activeFaq === i ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-white/[0.02] border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.05] text-neutral-500 group-hover:text-white'}`}>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-500", activeFaq === i ? "rotate-180" : "rotate-0")} />
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-8 pb-8 text-neutral-400 font-normal leading-relaxed text-base">
                      <div className="h-[1px] w-full bg-white/10 mb-6" />
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Connect / Waitlist Section */}
      <WaitlistSection />

      <footer className="py-12 px-6 border-t border-white/5 text-center relative z-10 bg-[#050505]">
         <div className="flex justify-center mb-6">
           <Logo light className="text-2xl" />
         </div>
         <p className="text-neutral-500 font-normal text-sm tracking-wide">© 2026 Landed Tech. Built for the modern ecosystem.</p>
      </footer>
    </div>
  );
}
