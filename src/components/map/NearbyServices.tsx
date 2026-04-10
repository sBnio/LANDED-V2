import { useState } from "react";
import { MapPin, Search, Navigation, Clock, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/context/OnboardingContext";
import { cn } from "@/lib/utils";

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  openNow: boolean;
  hours: string;
  phone: string;
  mapsUrl: string;
}

const MOCK_LOCATIONS: Record<string, Location[]> = {
  Dubai: [
    {
      id: "1",
      name: "Amer Center - Al Jafiliya",
      type: "typing",
      address: "Al Jafiliya Metro Station, Dubai",
      distance: "1.2 km",
      rating: 4.2,
      openNow: true,
      hours: "08:00 AM - 08:00 PM",
      phone: "+971 4 398 0000",
      mapsUrl: "https://maps.google.com/?q=Amer+Center+Al+Jafiliya"
    },
    {
      id: "2",
      name: "Smart Salem Medical Center",
      type: "medical",
      address: "City Walk, Dubai",
      distance: "2.5 km",
      rating: 4.8,
      openNow: true,
      hours: "07:00 AM - 09:30 PM",
      phone: "+971 4 222 2222",
      mapsUrl: "https://maps.google.com/?q=Smart+Salem+City+Walk"
    },
    {
      id: "3",
      name: "Emirates NBD Branch",
      type: "bank",
      address: "Dubai Mall, Financial Center Rd",
      distance: "3.1 km",
      rating: 4.0,
      openNow: true,
      hours: "10:00 AM - 10:00 PM",
      phone: "+971 600 540000",
      mapsUrl: "https://maps.google.com/?q=Emirates+NBD+Dubai+Mall"
    },
    {
      id: "4",
      name: "Etisalat Business Center",
      type: "telecom",
      address: "Al Wasl Road, Dubai",
      distance: "1.8 km",
      rating: 3.9,
      openNow: false,
      hours: "08:00 AM - 04:00 PM",
      phone: "101",
      mapsUrl: "https://maps.google.com/?q=Etisalat+Al+Wasl"
    }
  ],
  "Abu Dhabi": [
    {
      id: "5",
      name: "Tasheel Center",
      type: "typing",
      address: "Marina Mall, Abu Dhabi",
      distance: "4.2 km",
      rating: 4.1,
      openNow: true,
      hours: "08:00 AM - 08:00 PM",
      phone: "+971 2 681 1111",
      mapsUrl: "https://maps.google.com/?q=Tasheel+Marina+Mall"
    },
    {
      id: "6",
      name: "Capital Health Screening Centre",
      type: "medical",
      address: "Al Jazira Sports Club, Abu Dhabi",
      distance: "3.5 km",
      rating: 4.5,
      openNow: true,
      hours: "07:00 AM - 04:00 PM",
      phone: "+971 2 493 3333",
      mapsUrl: "https://maps.google.com/?q=Capital+Health+Screening+Centre"
    }
  ]
};

export function NearbyServices() {
  const { state } = useOnboarding();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const emirate = state.emirate === "Abu Dhabi" ? "Abu Dhabi" : "Dubai"; // Fallback to Dubai for demo
  const locations = MOCK_LOCATIONS[emirate] || MOCK_LOCATIONS["Dubai"];

  const filteredLocations = activeFilter === "all" 
    ? locations 
    : locations.filter(l => l.type === activeFilter);

  const filters = [
    { id: "all", label: "All" },
    { id: "typing", label: "Typing Centers" },
    { id: "medical", label: "Medical Centers" },
    { id: "bank", label: "Banks" },
    { id: "telecom", label: "Telecom (SIM)" }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-navy-900">Nearby Services</h3>
            <p className="text-xs text-slate-500">Essential locations in {emirate}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Search className="w-3 h-3" /> Search Area
        </Button>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-2 gap-2 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors",
              activeFilter === filter.id
                ? "bg-navy-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredLocations.length > 0 ? (
          filteredLocations.map(loc => (
            <div key={loc.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-navy-900 text-sm group-hover:text-amber-600 transition-colors">{loc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{loc.address}</p>
                </div>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-700">{loc.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Navigation className="w-3.5 h-3.5 text-slate-400" />
                  {loc.distance}
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className={loc.openNow ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
                    {loc.openNow ? "Open" : "Closed"}
                  </span>
                  <span className="text-slate-400">•</span>
                  {loc.hours}
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {loc.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs h-8"
                  onClick={() => window.open(loc.mapsUrl, "_blank")}
                >
                  <MapPin className="w-3 h-3 mr-1.5" /> Directions
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs h-8"
                  onClick={() => window.location.href = `tel:${loc.phone}`}
                >
                  <Phone className="w-3 h-3 mr-1.5" /> Call
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">No locations found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
