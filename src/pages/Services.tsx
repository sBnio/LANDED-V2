import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Building2, 
  Smartphone, 
  Home, 
  MapPin, 
  ExternalLink, 
  ArrowRight,
  Info,
  BadgeCheck,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "enbd_liv",
    name: "Emirates NBD Liv.",
    category: "Banks",
    description: "The most popular digital bank for students. No minimum balance if you spend AED 500/mo.",
    cost: "Free to open",
    docs: ["Emirates ID (Physical)", "UAE Mobile Number"],
    cta: "Download App",
    isVerified: true
  },
  {
    id: "adcb_hayyak",
    name: "ADCB Hayyak",
    category: "Banks",
    description: "Instant account opening via app. Great customer rewards and student-friendly app.",
    cost: "No account fees",
    docs: ["Emirates ID", "Passport Copy"],
    cta: "Open Account",
    isVerified: true
  },
  {
    id: "du_student",
    name: "du Student Plans",
    category: "SIM Cards",
    description: "Special data-heavy plans for university students with ISIC card verification.",
    cost: "From AED 125/mo",
    docs: ["ISIC / Student ID", "Emirates ID"],
    cta: "View Plans",
    isVerified: true
  },
  {
    id: "e_and",
    name: "e& (Etisalat) Youth",
    category: "SIM Cards",
    description: "Freedom plans for youth. Large social data bonuses included.",
    cost: "From AED 100/mo",
    docs: ["Emirates ID", "Visa Copy"],
    cta: "Find Stores",
    isVerified: false
  },
  {
    id: "dubizzle",
    name: "Dubizzle Student",
    category: "Housing",
    description: "Search for shared rooms, partitions, or studio apartments near major universities.",
    cost: "Varies by location",
    docs: ["Passport Copy (to secure)", "Emirates ID (to sign)"],
    cta: "Search Rooms",
    isVerified: true
  },
  {
    id: "tasheel",
    name: "Tasheel Centers",
    category: "Typing Centers",
    description: "Authorized government centers for visa processing and Emirates ID typing.",
    cost: "AED 50-150 service fee",
    docs: ["All Originals", "Photo"],
    cta: "Center Map",
    isVerified: true
  }
];

const CATEGORIES = [
  { id: "Typing Centers", icon: Building2 },
  { id: "Banks", icon: Landmark },
  { id: "SIM Cards", icon: Smartphone },
  { id: "Housing", icon: Home },
];

import { Landmark } from "lucide-react";

export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = SERVICES.filter(s => {
    const matchesCat = activeCategory === "All" || s.category === activeCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6 italic">VERIFIED SERVICES</h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mb-12">
            We partner with and verify providers that specifically cater to international students in the UAE.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              <Input 
                placeholder="Search for banks, telecom, or housing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 pl-16 rounded-2xl border-slate-200 text-lg shadow-sm focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button 
                onClick={() => setActiveCategory("All")}
                className={cn(
                  "px-8 h-16 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
                  activeCategory === "All" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-8 h-16 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap",
                    activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <cat.icon className="w-5 h-5" />
                  {cat.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card key={service.id} className="bg-white border-slate-200 shadow-sm rounded-[32px] overflow-hidden flex flex-col group hover:shadow-xl hover:border-blue-200 transition-all duration-300">
               <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 shadow-inner group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                       {service.category === 'Banks' && <CreditCard className="w-7 h-7" />}
                       {service.category === 'SIM Cards' && <Smartphone className="w-7 h-7" />}
                       {service.category === 'Housing' && <Home className="w-7 h-7" />}
                       {service.category === 'Typing Centers' && <Building2 className="w-7 h-7" />}
                    </div>
                    {service.isVerified && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                         <BadgeCheck className="w-3.5 h-3.5" /> Verified
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3 uppercase group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-6 flex-1">{service.description}</p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Est. Cost</span>
                        <span className="text-sm font-bold text-slate-900">{service.cost}</span>
                     </div>
                     <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                           <Info className="w-3.5 h-3.5" /> Required Docs
                        </h4>
                        <ul className="space-y-2">
                           {service.docs.map((doc, idx) => (
                             <li key={idx} className="text-xs font-bold text-slate-700 flex items-center gap-2">
                               <div className="w-1 h-1 rounded-full bg-blue-400" />
                               {doc}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-slate-200">
                    {service.cta} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
               </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300">
             <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-6">
                <Search className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 uppercase">Nothing found</h3>
             <p className="text-slate-500 mt-2">Try searching for generic terms like "bank" or "visa".</p>
          </div>
        )}
      </div>
    </div>
  );
}
