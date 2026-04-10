import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, ExternalLink, Plus, Building2, Smartphone, Home, Stethoscope, Car } from "lucide-react";
import { cn } from "@/lib/utils";
import { NearbyServices } from "@/components/map/NearbyServices";

const categories = [
  { id: "All", label: "All" },
  { id: "Banking", label: "Banking", icon: Building2 },
  { id: "Telecom", label: "Telecom", icon: Smartphone },
  { id: "Housing", label: "Housing", icon: Home },
  { id: "Healthcare", label: "Healthcare", icon: Stethoscope },
  { id: "Transport", label: "Transport", icon: Car },
];

const services = [
  {
    id: "enbd",
    name: "Emirates NBD",
    category: "Banking",
    rating: 4.8,
    color: "bg-blue-600",
    info: "Minimum balance: AED 0 | Student account available",
    requirements: ["University ID or Letter", "Passport & Visa Copy", "Emirates ID (or receipt)"],
  },
  {
    id: "mashreq",
    name: "Mashreq Neo",
    category: "Banking",
    rating: 4.9,
    color: "bg-orange-500",
    info: "100% Digital | Open in 5 mins",
    requirements: ["Emirates ID", "UAE Phone Number"],
  },
  {
    id: "etisalat",
    name: "Etisalat",
    category: "Telecom",
    rating: 4.5,
    color: "bg-green-600",
    info: "Youth Plan: 50GB for AED 99/mo",
    requirements: ["Passport", "Visa Copy", "University ID"],
  },
  {
    id: "du",
    name: "du",
    category: "Telecom",
    rating: 4.3,
    color: "bg-cyan-500",
    info: "Prepaid student plans available",
    requirements: ["Passport", "Visa Copy"],
  },
  {
    id: "dubizzle",
    name: "dubizzle",
    category: "Housing",
    rating: 4.6,
    color: "bg-red-500",
    info: "Largest portal for shared rooms & apartments",
    requirements: ["Passport Copy", "Emirates ID (for contract)"],
  },
  {
    id: "aster",
    name: "Aster Clinics",
    category: "Healthcare",
    rating: 4.7,
    color: "bg-teal-600",
    info: "Affordable consultations | Accepts most insurance",
    requirements: ["Emirates ID", "Health Insurance Card"],
  },
];

export function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.info.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-navy-900 font-heading mb-2">Services Directory</h1>
          <p className="text-slate-500 mb-6">
            Curated, student-friendly providers to help you settle in.
          </p>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              type="text"
              placeholder="Find a bank, clinic, telecom provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50 focus-visible:ring-[#F59E0B] text-lg"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2",
                  activeCategory === cat.id
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <NearbyServices />

        <div className="grid md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner", service.color)}>
                      {service.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-navy-900">{service.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-600 mt-1">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span className="text-sm font-bold text-amber-700">{service.rating}</span>
                  </div>
                </div>

                <p className="text-slate-700 font-medium mb-4">{service.info}</p>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What you need</p>
                  <ul className="space-y-1.5">
                    {service.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 h-12">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
                <Button className="flex-1 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white h-12 shadow-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to My Tasks
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
