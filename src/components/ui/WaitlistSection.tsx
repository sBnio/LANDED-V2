import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage("You're on the list! We'll be in touch.");
    setEmail('');
  };

  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-[#050505] overflow-hidden flex items-center justify-center min-h-[800px]">
      {/* Background Starry Sky */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
        {/* Crisp CSS Stars */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 10% 20%, white, transparent),
                              radial-gradient(1px 1px at 40% 60%, white, transparent),
                              radial-gradient(1px 1px at 70% 30%, white, transparent),
                              radial-gradient(1.5px 1.5px at 90% 80%, rgba(255,255,255,0.8), transparent),
                              radial-gradient(2px 2px at 30% 90%, rgba(255,255,255,0.6), transparent),
                              radial-gradient(1.5px 1.5px at 80% 10%, rgba(255,255,255,0.7), transparent),
                              radial-gradient(1px 1px at 50% 50%, white, transparent),
                              radial-gradient(2px 2px at 15% 75%, rgba(255,255,255,0.5), transparent),
                              radial-gradient(1.5px 1.5px at 60% 80%, white, transparent),
                              radial-gradient(1px 1px at 85% 55%, white, transparent)`,
            backgroundSize: '400px 400px',
            opacity: 0.4
          }}
        />
        {/* Twinkling particles overlay */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Realistic Planet */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] rounded-full z-0 pointer-events-none transform-gpu flex items-start justify-center">
        {/* Core shadow and gradient of the planet */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,#1a1111_0%,#000_60%)] shadow-[inset_0_20px_50px_rgba(255,255,255,0.02),0_-30px_150px_rgba(220,38,38,0.15)] overflow-hidden">
             {/* Subtle surface texture/glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[30%] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.2),transparent_70%)] blur-[40px] rounded-full mix-blend-screen" />
        </div>
        
        {/* Outer glowing atmosphere and rim lights */}
        <div className="absolute top-[-5px] left-1/2 -translate-x-1/2 w-[102%] h-[102%] rounded-full border-t-[3px] border-red-500/10 blur-[8px]" />
        <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[100%] h-[100%] rounded-full border-t-[2px] border-red-400/20 blur-[2px]" />
        <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[99%] h-[100%] rounded-full border-t border-white/60 box-border" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="max-w-3xl w-full flex flex-col items-center text-center relative z-10 bg-[#0a0a0a]/30 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-20 shadow-[0_0_100px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] flex-col items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-neutral-300 mb-8 backdrop-blur-md relative shadow-[0_0_20px_rgba(255,255,255,0.02)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="tracking-widest uppercase text-[10px]">Launching Soon</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-6xl font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight leading-[1.1] relative"
        >
          Be the first to land smoothly
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-neutral-400 max-w-lg mx-auto mb-12 font-normal leading-relaxed relative"
        >
          Landed is launching soon. Join the waitlist and get early access before
          everyone else — plus updates, tips, and a head start on your UAE
          onboarding.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative"
          onSubmit={handleSubmit}
        >
          <div className="flex-1 relative w-full text-left">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                 setEmail(e.target.value);
                 if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your email address"
              className={`w-full h-12 md:h-14 px-6 rounded-full bg-[#050505]/60 border text-white placeholder:text-neutral-500 focus:outline-none transition-all font-medium text-sm md:text-base backdrop-blur-md ${
                status === 'error'
                  ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50'
                  : status === 'success'
                  ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
                  : 'border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/30'
              }`}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 md:h-14 px-8 text-sm md:text-base font-medium rounded-full bg-white text-black hover:bg-neutral-200 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0 w-full sm:w-auto"
          >
            Join Waitlist
          </Button>
        </motion.form>
        
        {/* Status Message */}
        <div className="h-6 mt-4 relative w-full flex justify-center">
            {status !== 'idle' && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm font-medium ${
                  status === 'error' ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {message}
              </motion.p>
            )}
        </div>
      </motion.div>
    </section>
  );
}
