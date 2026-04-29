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
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "@/context/OnboardingContext";

const SERVICES = [
  {
    id: "mashreq_neo",
    name: "Mashreq Neo",
    category: "Banks",
    description: "Digital bank popular with international students — app-based account opening",
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
  
  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingServiceId, setReviewingServiceId] = useState<string | null>(null);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [localReviews, setLocalReviews] = useState<Record<string, { rating: number, reviews: number }>>({});

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openReviewModal = (id: string) => {
    setReviewingServiceId(id);
    setReviewStars(0);
    setReviewText("");
    setShowReviewModal(true);
  };

  const submitReview = () => {
    if (!reviewingServiceId || reviewStars === 0) return;
    
    setLocalReviews(prev => {
      const current = prev[reviewingServiceId] || { 
        rating: SERVICES.find(s => s.id === reviewingServiceId)?.rating || 0, 
        reviews: SERVICES.find(s => s.id === reviewingServiceId)?.reviews || 0 
      };
      
      const newReviews = current.reviews + 1;
      const newRating = ((current.rating * current.reviews) + reviewStars) / newReviews;
      
      return {
        ...prev,
        [reviewingServiceId]: {
          rating: Number(newRating.toFixed(1)),
          reviews: newReviews
        }
      };
    });
    
    setShowReviewModal(false);
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
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const Icon = CATEGORIES.find(c => c.id === service.category)?.icon || Info;
            const isExpanded = expandedCards[service.id];
            
            const displayRating = localReviews[service.id]?.rating || service.rating;
            const displayReviews = localReviews[service.id]?.reviews || service.reviews;
            
            return (
              <Card key={service.id} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col">
                 <div className="p-5 md:p-6 flex-1 flex flex-col">
                    
                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                           <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-900 leading-tight">{service.name}</h3>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                         {service.category}
                      </div>
                    </div>
  
                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {service.description}
                    </p>
                    
                    {/* Status Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.tags.map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-[12px] px-2.5 py-1 rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Rating Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto border-t border-slate-100 pt-5 mb-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center text-amber-400">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} className={cn("w-4 h-4", star <= Math.round(displayRating) ? "fill-amber-400" : "fill-slate-200 text-slate-200")} />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{displayRating.toFixed(1)}</span>
                          <span className="text-xs text-slate-500">· {displayReviews} student reviews</span>
                        </div>
                        <button 
                          onClick={() => openReviewModal(service.id)}
                          className="text-xs text-blue-600 hover:text-blue-700 hover:underline text-left font-medium w-fit"
                        >
                          Leave a review
                        </button>
                      </div>
                    </div>
  
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Button 
                        variant="ghost" 
                        onClick={() => toggleExpand(service.id)}
                        className="flex-1 justify-between sm:justify-center border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold"
                      >
                        How to use {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                      </Button>
                      <Button 
                        variant="default"
                        asChild
                        className="flex-1 bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50 font-bold transition-colors"
                      >
                        <a href={service.website} target="_blank" rel="noopener noreferrer">
                          Visit website <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>

                    {/* How to use Content */}
                    <div 
                      className={cn(
                        "mt-4 bg-slate-50 rounded-xl overflow-hidden transition-all duration-300",
                        isExpanded ? "max-h-[500px] border border-slate-100 p-4" : "max-h-0 border-transparent p-0"
                      )}
                    >
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowReviewModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Rate this service</h3>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setReviewStars(star)}
                  className="hover:scale-110 transition-transform"
                >
                  <Star 
                    className={cn(
                      "w-8 h-8", 
                      star <= reviewStars ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"
                    )} 
                  />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Share your experience (optional)
              </label>
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={200}
                placeholder="What went well? What didn't?"
                className="w-full h-24 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-right text-xs text-slate-400 mt-1">{reviewText.length}/200</p>
            </div>

            <div className="flex gap-3 mb-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowReviewModal(false)}>Cancel</Button>
              <Button 
                className="flex-1 bg-slate-900 text-white hover:bg-slate-800" 
                onClick={submitReview}
                disabled={reviewStars === 0}
              >
                Submit
              </Button>
            </div>

            <p className="text-[11px] text-center text-slate-400 leading-snug">
              Reviews are from Landed users. We don't verify or moderate reviews — use your own judgment.
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-6 border-t border-slate-200 mt-12">
        <p className="text-[12px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto">
          Service listings are for informational purposes only. Landed has no commercial relationship with any listed provider. Information accurate as of 2025 — verify directly with providers before making decisions. Landed is not responsible for third-party services.
        </p>
      </div>
    </div>
  );
}

