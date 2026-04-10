import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Zap, Bot, CheckCircle2, ArrowRight, Star, ChevronRight, Home, CreditCard, GraduationCap, FileText } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Landing() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [hoursCount, setHoursCount] = useState(0);
  const [uniCount, setUniCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStudentsCount(Math.floor((1250 / steps) * currentStep));
      setHoursCount(Math.floor((40 / steps) * currentStep));
      setUniCount(Math.floor((15 / steps) * currentStep));

      if (currentStep >= steps) {
        clearInterval(timer);
        setStudentsCount(1250);
        setHoursCount(40);
        setUniCount(15);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex flex-col font-sans text-[#111827] overflow-x-hidden">
      {/* Navbar for Landing */}
      <header className="absolute top-0 w-full z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <Logo className="text-3xl text-white [&>span:first-child]:text-white" />
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white hidden sm:flex">Log In</Button>
          <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-full px-6">
            <Link to="/onboarding">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0A1628] text-white overflow-hidden">
        {/* Gradient Blob & Noise */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F59E0B]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md flex items-center gap-2">
                🏛️ Used by students
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md flex items-center gap-2">
                ⏱️ Saves {hoursCount}+ hours
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md flex items-center gap-2">
                🌍 {uniCount}+ universities covered
              </span>
            </div>
            
            <h1 className="text-5xl md:text-[56px] font-bold tracking-tight leading-[1.1] font-heading">
              Your UAE journey, sorted before you land.
            </h1>
            
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              LANDED guides international students through every step — visa, housing, 
              bank account, SIM card — so you can focus on what matters: your degree.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-1">
                <Link to="/onboarding">Start My Checklist</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white transition-all">
                See How It Works
              </Button>
            </div>
          </div>
          
          {/* Hero Mockup */}
          <div className="relative hidden lg:block animate-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
            <div className="relative mx-auto w-[320px] h-[650px] bg-white rounded-[40px] shadow-2xl border-[8px] border-slate-800 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              {/* Mockup Header */}
              <div className="bg-[#0A1628] text-white p-6 pb-8 rounded-b-3xl">
                <div className="flex justify-between items-center mb-6">
                  <Logo className="text-xl [&>span:first-child]:text-white" />
                  <div className="w-8 h-8 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2">Welcome, Alex 👋</h3>
                <p className="text-sm text-slate-300">You're 35% through your setup.</p>
                <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F59E0B] w-[35%]" />
                </div>
              </div>
              {/* Mockup Content */}
              <div className="p-4 space-y-4 bg-slate-50 h-full">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Entry Visa</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full"><div className="h-full bg-emerald-500 w-full rounded-full" /></div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-[#F59E0B]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Target className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Emirates ID</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full"><div className="h-full bg-[#F59E0B] w-[20%] rounded-full" /></div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 opacity-60">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">Bank Account</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-10 bg-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-500 mb-6 uppercase tracking-widest">Trusted by students from</p>
          <div className="flex gap-8 md:gap-16 items-center justify-center flex-wrap opacity-60 grayscale">
            {["UAEU", "AUS", "AUD", "Khalifa Uni", "NYUAD", "Heriot-Watt", "UOWD"].map((uni) => (
              <div key={uni} className="text-xl font-bold font-heading text-slate-800">{uni}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Everything you need to land smoothly.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            We've mapped out the exact processes for every major milestone of your UAE move.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {[
            {
              title: "Visas & Emirates ID",
              desc: "Step-by-step guidance on medical tests, biometrics, and typing centers. Never get rejected for a missing document.",
              icon: Target,
            },
            {
              title: "Housing & Utilities",
              desc: "From finding student-friendly areas to setting up DEWA (electricity/water) and understanding your tenancy contract.",
              icon: Home,
            },
            {
              title: "Banking & SIM",
              desc: "Know which banks accept students without an Emirates ID, and how to get connected the moment you land.",
              icon: CreditCard,
            },
            {
              title: "University Enrollment",
              desc: "Track your university-specific requirements, from attested transcripts to health insurance waivers.",
              icon: GraduationCap,
            }
          ].map((feature, i) => (
            <Card key={i} className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#F59E0B]/50 transition-all duration-300 rounded-2xl overflow-hidden group">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-navy-900 mb-4 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-heading text-navy-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 text-lg leading-relaxed">
                {feature.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading mb-12">How LANDED Works</h2>
              <div className="space-y-12 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100" />
                
                {[
                  { title: "Tell us your situation", desc: "Share your university, nationality, and arrival date. We don't need sensitive data." },
                  { title: "Get your personalized roadmap", desc: "We generate a step-by-step task list in the exact right order for your specific profile." },
                  { title: "Complete tasks with guided help", desc: "Access document checklists, maps, contact info, and deadlines for every single step." }
                ].map((step, i) => (
                  <div key={i} className="relative flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-[#0A1628] text-white flex items-center justify-center font-bold text-lg shrink-0 relative z-10 shadow-lg">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl font-bold font-heading mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-lg">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-inner">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><FileText className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold">Medical Test</h4>
                      <p className="text-sm text-slate-500">Required for Emirates ID</p>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full">View Details</Button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border-2 border-[#F59E0B]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Target className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold">Emirates ID Biometrics</h4>
                      <p className="text-sm text-slate-500">Book appointment now</p>
                    </div>
                  </div>
                  <Button className="rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white">Start Step</Button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><Bot className="w-6 h-6" /></div>
                    <div>
                      <h4 className="font-bold">Open Bank Account</h4>
                      <p className="text-sm text-slate-500">Locked: Needs Emirates ID</p>
                    </div>
                  </div>
                  <Button variant="outline" disabled className="rounded-full">Locked</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0A1628] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8">Ready to land stress-free?</h2>
          <Button asChild size="lg" className="h-16 px-10 text-xl font-semibold rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-1 mb-6">
            <Link to="/onboarding">Create My Free Account <ArrowRight className="ml-2 w-6 h-6" /></Link>
          </Button>
          <p className="text-slate-400 text-lg">No credit card. No fluff. Just clarity.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A1628] text-slate-400 py-12 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo className="text-2xl [&>span:first-child]:text-white" />
          <p>Made with ❤️ for international students in the UAE</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
