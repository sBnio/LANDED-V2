import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Smartphone,
  Home,
  Activity,
  FileText,
  Car,
  Shield,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  MapPin,
  Star,
  CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";

const SERVICES = [
  {
    id: "mashreq_neo",
    name: "Mashreq Neo",
    category: "Banks",
    description: "Digital bank popular with international students — app-based account opening",
    docs: [
      "Passport — original + copy",
      "Emirates ID or application receipt",
      "University enrollment letter (official letterhead)",
      "Passport-size photo (white background)",
      "Proof of address (tenancy contract or university address confirmation letter)"
    ],
    issue: "Most applications stall on proof of address — if you don't have a tenancy contract yet, ask your university for an official address confirmation letter before applying.",
    tags: ["Accepts student visa holders", "Online application", "Arabic + English support"],
    rating: 4.1,
    reviews: 52,
    howTo: [
      "Download the Mashreq Neo app before visiting",
      "Bring: Passport, Emirates ID (or receipt), university enrollment letter",
      "Account opening is largely app-based — no branch visit required for most nationalities",
      "Minimum balance requirements are lower than traditional banks",
      "Call 04-424-4444 to confirm requirements for your specific nationality before applying"
    ],
    website: "https://www.mashreqneo.com"
  },
  {
    id: "emirates_islamic",
    name: "Emirates Islamic",
    category: "Banks",
    description: "Islamic banking option with student-accessible account requirements",
    docs: [
      "Passport — original + copy",
      "Emirates ID or application receipt",
      "University enrollment letter (official letterhead)",
      "Passport-size photo (white background)",
      "Proof of address"
    ],
    issue: "Arriving without the enrollment letter on official university letterhead is the most common reason for same-day rejection — a printed email from admissions is not accepted.",
    tags: ["Accepts student visa holders", "Walk-in available", "Arabic + English support"],
    rating: 3.8,
    reviews: 29,
    howTo: [
      "Visit any branch with: Passport, Emirates ID, university enrollment letter, passport-size photo",
      "Shariah-compliant banking — no interest charged",
      "Ask specifically for the \"basic banking account\" which has lower minimum balance requirements",
      "Processing time: typically 3–5 working days"
    ],
    website: "https://www.emiratesislamic.ae"
  },
  {
    id: "adcb",
    name: "ADCB (Abu Dhabi Commercial Bank)",
    category: "Banks",
    description: "Full-service bank with branches across Dubai and Abu Dhabi",
    docs: [
      "Passport — original + copy",
      "Emirates ID or application receipt",
      "University enrollment letter (official letterhead)",
      "Passport-size photo (white background)",
      "Proof of address (tenancy contract or utility bill)"
    ],
    issue: "ADCB frequently updates minimum balance requirements for student accounts — call 600-502-030 to confirm the current amount before your visit to avoid a wasted trip.",
    tags: ["Accepts student visa holders", "Walk-in available", "Online application"],
    rating: 3.6,
    reviews: 18,
    howTo: [
      "Bring: Passport, Emirates ID, enrollment letter, proof of address (tenancy contract or utility bill)",
      "Proof of address requirement can be a barrier for new arrivals — check current requirements first",
      "Online pre-application available at adcb.com",
      "Call 600-502-030 to confirm student requirements"
    ],
    website: "https://www.adcb.com"
  },
  {
    id: "du_student",
    name: "du (Student Plan)",
    category: "SIM Cards",
    description: "Student SIM plans starting from 55 AED — available at airport on arrival",
    docs: [
      "Passport — original (Emirates ID not required for SIM registration — passport is sufficient)"
    ],
    issue: "Attempting to register with a photo of your passport instead of the original will be rejected — always carry your physical passport on arrival day.",
    tags: ["Walk-in available", "Online application", "Arabic + English support"],
    rating: 4.3,
    reviews: 87,
    howTo: [
      "Available at DXB Airport Terminal arrivals — get it the moment you land",
      "Bring your passport for SIM registration (legally required in UAE)",
      "Ask specifically for student plan — better data allowance at same price",
      "du stores also at Mall of the Emirates, Dubai Mall, and most community malls",
      "Port your number later if needed — no penalty for switching plans"
    ],
    website: "https://www.du.ae"
  },
  {
    id: "etisalat_student",
    name: "e& (Etisalat) Student Plan",
    category: "SIM Cards",
    description: "UAE's largest telecom — wide coverage and student data packages",
    docs: [
      "Passport — original"
    ],
    issue: "Same as du — original passport required by UAE telecom law for SIM registration. No exceptions.",
    tags: ["Walk-in available", "Online application", "Arabic + English support"],
    rating: 4.1,
    reviews: 64,
    howTo: [
      "Available at DXB Airport and all e& stores",
      "Bring passport for registration",
      "Compare e& and du plans on arrival — both have airport counters, take 5 minutes to compare",
      "e& tends to have slightly better coverage in Abu Dhabi and northern emirates"
    ],
    website: "https://www.etisalat.ae"
  },
  {
    id: "al_barsha_typing",
    name: "Al Barsha Typing Centre",
    category: "Typing Centres",
    description: "Conveniently located for students near Knowledge Park and Media City",
    docs: [
      "Passport — original + copy",
      "Emirates ID receipt (if applying for Emirates ID)",
      "Passport-size photos — white background, bring at least 4 copies",
      "Any documents for submission — originals only"
    ],
    issue: "Bringing photocopies only without originals is the single most common mistake — typing centres cannot process submissions without original documents present.",
    tags: ["Walk-in available", "Arabic + English support", "Near Knowledge Park"],
    rating: 4.0,
    reviews: 33,
    howTo: [
      "No appointment needed — walk in",
      "Bring originals AND copies of all documents",
      "Services: Emirates ID application, visa status change, document attestation submission",
      "Typical wait time: 20–40 minutes",
      "Cost: 100–200 AED depending on service",
      "Open Saturday–Thursday, 8am–8pm"
    ],
    website: "https://www.google.com/maps/search/Al+Barsha+Typing+Centre"
  },
  {
    id: "diac_typing",
    name: "DIAC Typing Centre",
    category: "Typing Centres",
    description: "On-site at Dubai International Academic City — convenient for DIAC campus students",
    docs: [
      "Passport — original + copy",
      "Emirates ID receipt",
      "Passport-size photos — white background, 4 copies",
      "University enrollment letter",
      "Originals of any documents being submitted"
    ],
    issue: "Students from DIAC universities often forget their enrollment letter — this is required for student visa processing at this centre specifically.",
    tags: ["Walk-in available", "Near Academic City", "Arabic + English support"],
    rating: 4.2,
    reviews: 41,
    howTo: [
      "Located inside DIAC — walk from your campus",
      "Specializes in student visa and Emirates ID processing for DIAC universities",
      "Bring complete document set — they will tell you exactly what is missing",
      "Fastest option if you study at Heriot-Watt, Middlesex, or other DIAC universities"
    ],
    website: "https://www.google.com/maps/search/DIAC+Typing+Centre"
  },
  {
    id: "aster_clinic",
    name: "Aster Clinic — Al Barsha",
    category: "Medical",
    description: "Medical fitness test centre commonly used by students near Knowledge Park",
    docs: [
      "Passport — original",
      "Emirates ID application receipt",
      "Passport-size photos — white background, 2 copies"
    ],
    issue: "Photos with cream or off-white backgrounds are rejected — background must be pure white. Many phone photo apps add warmth automatically, so check before printing.",
    tags: ["Walk-in available", "Online application", "Arabic + English support"],
    rating: 4.2,
    reviews: 56,
    howTo: [
      "Medical fitness test required before Emirates ID",
      "Bring: Passport, Emirates ID application receipt, passport-size photos (white background)",
      "Results ready in 1–2 working days",
      "Cost: approximately 320 AED (confirm current price on arrival)",
      "Book online at asterpharmacy.ae or walk in — both work"
    ],
    website: "https://www.asterpharmacy.ae"
  },
  {
    id: "nmc_medical",
    name: "NMC Medical Centre",
    category: "Medical",
    description: "Approved medical fitness test centre with multiple Dubai locations",
    docs: [
      "Passport — original",
      "Emirates ID application receipt",
      "Passport-size photos — white background, 2 copies"
    ],
    issue: "Same photo background rule applies — pure white only. Budget an extra 10 AED for on-site photo printing if unsure.",
    tags: ["Walk-in available", "Arabic + English support"],
    rating: 3.9,
    reviews: 28,
    howTo: [
      "MOHAP-approved fitness test centre",
      "Locations in Al Nahda, Deira, Al Barsha",
      "Same process as Aster — bring passport, ID receipt, photos",
      "Results in 1–2 days"
    ],
    website: "https://www.nmc.ae"
  },
  {
    id: "dubizzle",
    name: "Dubizzle",
    category: "Housing",
    description: "UAE's largest property listings platform — rooms, studios and apartments",
    docs: [
      "Passport copy",
      "Emirates ID copy",
      "Proof of funds — bank statement or sponsor/university financial guarantee letter",
      "Post-dated cheques — most Dubai landlords require 1–4 cheques per year"
    ],
    issue: "Most international students are shocked by the cheque requirement — UAE landlords almost universally require post-dated cheques, not bank transfers or cash. Open your bank account before signing any tenancy agreement.",
    tags: ["Online application"],
    rating: 4.0,
    reviews: 44,
    howTo: [
      "Filter by area near your university for shortest commute",
      "Search \"bed space\" or \"room in shared apartment\" for budget-friendly options",
      "Always verify listings are current before contacting",
      "Never pay a deposit before viewing in person",
      "Typical student budget areas: Al Barsha, JLT, Discovery Gardens, Al Nahda"
    ],
    website: "https://www.dubizzle.com"
  },
  {
    id: "bayut",
    name: "Bayut",
    category: "Housing",
    description: "Property search platform with verified listings and price history",
    docs: [
      "Passport copy",
      "Emirates ID copy",
      "Proof of funds",
      "Post-dated cheques"
    ],
    issue: "Same as Dubizzle — arrange your UAE bank account before apartment hunting, otherwise you cannot sign a tenancy contract in Dubai.",
    tags: ["Online application"],
    rating: 3.8,
    reviews: 19,
    howTo: [
      "Good for comparing market rates before negotiating",
      "Use the price history feature to check if a listed price is fair",
      "Verified agent badges help identify legitimate listings",
      "Contact multiple agents for same area — prices are often negotiable"
    ],
    website: "https://www.bayut.com"
  },
  {
    id: "careem",
    name: "Careem",
    category: "Transport",
    description: "UAE's most popular ride-hailing app — reliable airport and daily transport",
    docs: [
      "No documents needed",
      "Requires a phone number and payment method only"
    ],
    issue: "International cards occasionally fail on first use — add a backup payment method in the app before your first ride.",
    tags: ["Online application"],
    rating: 4.4,
    reviews: 102,
    howTo: [
      "Download before you arrive in Dubai",
      "Add your payment method in advance",
      "Use Careem for airport pickup on arrival — cheaper and more reliable than airport taxis",
      "Student tip: Careem Bus is available in some areas at a fraction of car cost"
    ],
    website: "https://www.careem.com"
  },
  {
    id: "rta_metro",
    name: "RTA Dubai Metro",
    category: "Transport",
    description: "Dubai's metro system — cheapest way to travel across the city",
    docs: [
      "No documents needed for Nol Card purchase",
      "Pay by cash or card at any station"
    ],
    issue: "Nol Cards purchased at the airport are sometimes set to the wrong zone — ask the station attendant to confirm your card covers all zones before loading a large balance.",
    tags: ["Walk-in available"],
    rating: 4.5,
    reviews: 78,
    howTo: [
      "Get a Nol Card at any metro station — works on metro, bus, tram and water bus",
      "Red Line connects Airport (Terminal 1 & 3) to most of the city",
      "Monthly passes available for regular commuters",
      "Google Maps shows live metro routes and times"
    ],
    website: "https://www.rta.ae"
  },
  {
    id: "daman_insurance",
    name: "Daman Health Insurance",
    category: "Insurance",
    description: "Leading UAE health insurer — offers student plans where university doesn't provide coverage",
    docs: [
      "Passport copy",
      "Emirates ID copy (or visa page)",
      "University enrollment letter",
      "Existing insurance documents if transferring"
    ],
    issue: "Many students purchase insurance unnecessarily — check with your university Student Affairs office first, as most UAE universities include basic health coverage in tuition fees.",
    tags: ["Online application", "Arabic + English support"],
    rating: 3.7,
    reviews: 22,
    howTo: [
      "Check with your university FIRST — many UAE universities include basic health insurance in tuition. Do not pay twice.",
      "If you need to purchase separately, basic plans start around 800 AED/year",
      "Health insurance is mandatory for UAE residency",
      "Compare plans at compareit4me.com before purchasing"
    ],
    website: "https://www.damanhealth.ae"
  }
];

const CATEGORIES = [
  { id: "Banks", icon: Wallet },
  { id: "SIM Cards", icon: Smartphone },
  { id: "Housing", icon: Home },
  { id: "Medical", icon: Activity },
  { id: "Typing Centres", icon: FileText },
  { id: "Transport", icon: Car },
  { id: "Insurance", icon: Shield }
];

export function Services() {
  const { state } = useOnboarding();
  const [activeCategory, setActiveCategory] = useState("All");
  const [nearMe, setNearMe] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  
  const getCategoryColorStyles = (category: string) => {
    switch (category) {
      case 'Banks': return 'bg-blue-100 text-blue-700';
      case 'SIM Cards': return 'bg-emerald-100 text-emerald-700';
      case 'Medical': return 'bg-rose-100 text-rose-700';
      case 'Housing': return 'bg-amber-100 text-amber-700';
      case 'Typing Centres': return 'bg-purple-100 text-purple-700';
      case 'Transport': return 'bg-teal-100 text-teal-700';
      case 'Insurance': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTagColor = (tag: string) => {
    if (tag === 'Accepts student visa holders') return 'bg-green-50 text-green-700';
    if (tag === 'Walk-in available') return 'bg-blue-50 text-blue-700';
    if (tag === 'Online application') return 'bg-purple-50 text-purple-700';
    if (tag === 'Arabic + English support') return 'bg-amber-50 text-amber-700';
    if (tag.startsWith('Near')) return 'bg-teal-50 text-teal-700';
    return 'bg-slate-50 text-slate-700';
  };

  const getTagDotColor = (tag: string) => {
    if (tag === 'Accepts student visa holders') return 'bg-green-500';
    if (tag === 'Walk-in available') return 'bg-blue-500';
    if (tag === 'Online application') return 'bg-purple-500';
    if (tag === 'Arabic + English support') return 'bg-amber-500';
    if (tag.startsWith('Near')) return 'bg-teal-500';
    return 'bg-slate-400';
  };

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => prev[id] ? {} : { [id]: true });
  };

  const isNearUniversity = (service: typeof SERVICES[0]) => {
    if (!state.zayedCampus) return true; // Default to true if no campus selected
    
    const isDIAC = state.zayedCampus === "diac_campus";
    const isKnowledgePark = state.zayedCampus === "knowledge_park";
    
    // Simple mock logic for "near me" based on tags since we lack actual geodata
    if (service.tags.includes("Near Knowledge Park") && isKnowledgePark) return true;
    if (service.tags.includes("Near Academic City") && isDIAC) return true;
    
    // Some services are city-wide or online, these match anywhere
    if (service.tags.includes("Online application") || service.category === "Transport" || service.category === "SIM Cards") return true;
    
    return false;
  };

  const filteredServices = SERVICES.filter(s => {
    const matchesCat = activeCategory === "All" || s.category === activeCategory;
    const matchesNearMe = nearMe ? isNearUniversity(s) : true;
    return matchesCat && matchesNearMe;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      {/* HEADER & DISCLAIMER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">Services</h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mb-8">
            Student-relevant services in Dubai — verified information, no sponsored listings
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 md:p-6 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-blue-900 leading-relaxed font-medium">
              Landed provides this directory for informational purposes only. We have no commercial agreements with any listed service. Information is based on publicly available data and student community feedback. Always verify details directly with the provider before making decisions.
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            <button 
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-6 h-10 rounded-full font-bold text-sm whitespace-nowrap transition-colors",
                activeCategory === "All" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 h-10 rounded-full font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2",
                  activeCategory === cat.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.id}
              </button>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div 
                className={cn(
                  "w-10 h-6 rounded-full p-1 transition-colors relative",
                  nearMe ? "bg-blue-600" : "bg-slate-300"
                )}
                onClick={() => setNearMe(!nearMe)}
              >
                <div 
                  className={cn(
                    "w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300",
                    nearMe ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </div>
              <span className="text-sm font-bold text-slate-700 select-none group-hover:text-slate-900 transition-colors">
                Near my university
              </span>
            </label>
            {state.zayedCampus && (
              <div className="hidden md:flex text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {state.zayedCampus === "diac_campus" ? "Academic City" : "Knowledge Park"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SERVICE CARDS */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {filteredServices.map((service) => {
            const Icon = CATEGORIES.find(c => c.id === service.category)?.icon || Info;
            const isExpanded = expandedCards[service.id];
            
            const displayRating = service.rating;
            const displayReviews = service.reviews;
            const categoryColors = getCategoryColorStyles(service.category);
            
            return (
              <Card key={service.id} className="bg-white border-y border-r border-slate-200 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 rounded-[28px] overflow-hidden flex flex-col">
                 <div className="p-6 md:p-7 flex-1 flex flex-col">
                    
                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", categoryColors)}>
                           <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-[16px] font-bold text-slate-900 leading-tight">{service.name}</h3>
                      </div>
                      <div className={cn("px-3 py-1 rounded-full text-[11px] font-bold shrink-0 mt-1", categoryColors)}>
                         {service.category}
                      </div>
                    </div>
  
                    {/* Description */}
                    <p className="text-[15px] text-slate-800 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    {/* Status Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.tags.map((tag, idx) => (
                        <span key={idx} className={cn("text-[12px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 w-fit", getTagColor(tag))}>
                          <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", getTagDotColor(tag))} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Rating Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-5 mb-5">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={cn("w-4 h-4", star <= Math.round(displayRating) ? "fill-amber-400" : "fill-slate-200 text-slate-200")} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{displayRating.toFixed(1)}</span>
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium ml-1">{displayReviews} reviews</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold text-slate-600 rounded-full">
                        Leave a review
                      </Button>
                    </div>
  
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Button 
                        variant="secondary" 
                        onClick={() => toggleExpand(service.id)}
                        className="flex-1 justify-between bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold h-11 px-4"
                      >
                        <span className="text-left w-full">How to use</span>
                        <ChevronDown className={cn("w-4 h-4 ml-2 shrink-0 transition-transform duration-200", isExpanded && "rotate-180")} />
                      </Button>
                      <Button 
                        variant="default"
                        asChild
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 font-bold h-11 transition-colors"
                      >
                        <a href={service.website} target="_blank" rel="noopener noreferrer">
                          Visit website <ExternalLink className="w-4 h-4 ml-2 shrink-0" />
                        </a>
                      </Button>
                    </div>

                    {/* How to use Content */}
                    <div 
                      className={cn(
                        "mt-4 bg-slate-50 rounded-xl overflow-hidden transition-all duration-300",
                        isExpanded ? "max-h-[1000px] border border-slate-100 p-5" : "max-h-0 border-transparent p-0"
                      )}
                    >
                      {/* Documents */}
                      {service.docs && service.docs.length > 0 && (
                        <div className="mb-5">
                          <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">Required Documents</h4>
                          <ul className="space-y-2.5">
                            {service.docs.map((doc, idx) => (
                              <li key={idx} className="text-[13px] text-slate-600 flex items-start gap-2.5">
                                <CheckSquare className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                                <span className="leading-snug">{doc}</span>
                              </li>
                            ))}
                          </ul>
                          {service.issue && (
                            <div className="mt-4 border-l-2 border-amber-400 pl-3">
                              <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-1 mt-1">Common issue</p>
                              <p className="text-[13px] text-slate-600 leading-snug">{service.issue}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 pt-5 border-t border-slate-200">How to use</h4>
                      <ul className="space-y-2">
                        {service.howTo.map((step, idx) => (
                          <li key={idx} className="text-[13px] text-slate-700 flex items-start gap-2">
                            <span className="text-slate-400 font-bold mt-0.5">•</span>
                            <span className="flex-1 leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                 </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 mt-6">
             <h3 className="text-xl font-bold text-slate-900 mb-2">No services found for this filter.</h3>
             <p className="text-slate-500 text-sm">Try selecting a different category or disabling "Near my university".</p>
             <Button 
               variant="outline" 
               className="mt-6 font-bold"
               onClick={() => { setActiveCategory("All"); setNearMe(false); }}
             >
               Reset filters
             </Button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 border-t border-slate-200 mt-12">
        <p className="text-[12px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto">
          Service listings are for informational purposes only. Landed has no commercial relationship with any listed provider. Information accurate as of 2025 — verify directly with providers before making decisions. Landed is not responsible for third-party services.
        </p>
      </div>
    </div>
  );
}

