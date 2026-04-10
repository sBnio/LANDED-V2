import { useState } from "react";
import { Calendar, MapPin, Clock, Search, Loader2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/context/OnboardingContext";
import { callAI } from "@/lib/ai";

export function SlotFinder() {
  const { state } = useOnboarding();
  const [isSearching, setIsSearching] = useState(false);
  const [slots, setSlots] = useState<any[] | null>(null);
  const [selectedService, setSelectedService] = useState("medical");
  const [selectedEmirate, setSelectedEmirate] = useState(state.emirate || "Dubai");

  const handleSearch = async () => {
    setIsSearching(true);
    setSlots(null);

    const systemPrompt = `You are a UAE appointment slot finder.
Generate 3 realistic available appointment slots for the requested service in the requested emirate.
Return a JSON object with an array of 'slots', each containing:
- centerName (string)
- address (string)
- date (string, e.g. "Tomorrow, Oct 24")
- time (string, e.g. "09:30 AM")
- distance (string, e.g. "2.4 km away")`;

    const schema = {
      type: "OBJECT",
      properties: {
        slots: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              centerName: { type: "STRING" },
              address: { type: "STRING" },
              date: { type: "STRING" },
              time: { type: "STRING" },
              distance: { type: "STRING" }
            }
          }
        }
      }
    };

    try {
      const response = await callAI(
        systemPrompt,
        `Find slots for ${selectedService} in ${selectedEmirate}`,
        null,
        schema
      );
      
      const data = JSON.parse(response);
      setSlots(data.slots);
    } catch (error) {
      console.error("Failed to find slots", error);
      // Fallback data
      setSlots([
        {
          centerName: "Smart Salem Medical Center",
          address: "City Walk, Dubai",
          date: "Tomorrow, Oct 24",
          time: "09:30 AM",
          distance: "2.4 km away"
        },
        {
          centerName: "Al Karama Medical Center",
          address: "Karama, Dubai",
          date: "Tomorrow, Oct 24",
          time: "11:15 AM",
          distance: "5.1 km away"
        },
        {
          centerName: "Al Quoz Mall Medical Center",
          address: "Al Quoz, Dubai",
          date: "Friday, Oct 25",
          time: "08:00 AM",
          distance: "8.3 km away"
        }
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-navy-900">Appointment Finder</h3>
          <p className="text-xs text-slate-500">Find the earliest available slots</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Service</label>
            <select 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="medical">Medical Fitness Test</option>
              <option value="emirates_id">Emirates ID Biometrics</option>
              <option value="driving">Driving License Open File</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Emirate</label>
            <select 
              value={selectedEmirate}
              onChange={(e) => setSelectedEmirate(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
            </select>
          </div>
        </div>

        <Button 
          onClick={handleSearch} 
          disabled={isSearching}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Search className="w-4 h-4 mr-2" />
          )}
          {isSearching ? "Searching..." : "Find Earliest Slots"}
        </Button>
      </div>

      {slots && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            AI Found {slots.length} Slots
          </h4>
          {slots.map((slot, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer group">
              <div>
                <p className="font-bold text-navy-900 text-sm">{slot.centerName}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {slot.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {slot.date}, {slot.time}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
          {/* TODO: Integrate with actual booking API or web scraper */}
          <p className="text-[10px] text-center text-slate-400 mt-2">
            *This is a demo feature. Real implementation requires integration with ICA/DHA booking systems.
          </p>
        </div>
      )}
    </div>
  );
}
