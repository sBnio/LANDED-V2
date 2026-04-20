import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Users, 
  ChevronRight, 
  Heart,
  Share2,
  Bookmark,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const FORUM_POSTS = [
  {
    id: 1,
    author: "Fatima Ahmed",
    university: "UAEU",
    title: "How long is the medical test taking right now in Al Ain?",
    content: "I have my appointment scheduled for tomorrow. Just wondering if I should arrive early or if the 9 AM slot is fine.",
    tags: ["Medical Test", "Al Ain"],
    likes: 12,
    replies: 4,
    avatar: "https://picsum.photos/seed/fatima/100/100"
  },
  {
    id: 2,
    author: "Rahul Sharma",
    university: "Heriot-Watt Dubai",
    title: "Best data plans for students on a budget?",
    content: "du just increased prices. Is Etisalat better or should I stick with the student du plan? Need at least 20GB.",
    tags: ["SIM Card", "Telecom"],
    likes: 24,
    replies: 15,
    avatar: "https://picsum.photos/seed/rahul/100/100"
  },
  {
    id: 3,
    author: "Ziad Al-Fayed",
    university: "AUD",
    title: "Can I open a bank account with just my passport?",
    content: "My Emirates ID is still in process but I need to pay my first month rent deposit. Any banks doing this currently?",
    tags: ["Banking", "Documents"],
    likes: 45,
    replies: 12,
    avatar: "https://picsum.photos/seed/ziad/100/100"
  }
];

const STUDY_BUDDIES = [
  { id: 1, name: "Chloe", major: "Computer Science", uni: "NYU Abu Dhabi", interest: "AI Ethics", avatar: "https://picsum.photos/seed/chloe/100/100" },
  { id: 2, name: "Omar", major: "Mechanical Engineering", uni: "Khalifa University", interest: "Robotics", avatar: "https://picsum.photos/seed/omar/100/100" },
  { id: 3, name: "Sara", major: "Business Admin", uni: "AUS", interest: "Entrepreneurship", avatar: "https://picsum.photos/seed/sara/100/100" },
];

export function Community() {
  const [activeTab, setActiveTab] = useState<"Forum" | "Study Buddy">("Forum");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-[#0A1628] text-white pt-16 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">STUDENT HUB</h1>
              <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed">
                Connect with thousands of international students already navigating life in the Emirates.
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="rounded-2xl h-16 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-900/50"
              >
                <Plus className="w-5 h-5 mr-2" /> Ask Question
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mt-12 overflow-x-auto pb-4 scrollbar-hide">
            {(["Forum", "Study Buddy"] as const).map(tab => (
               <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-8 h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                    activeTab === tab ? "bg-white text-navy-900" : "bg-white/10 text-white/60 hover:bg-white/20"
                  )}
               >
                  {tab}
               </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "Forum" ? (
               <div className="space-y-6">
                  {FORUM_POSTS.map(post => (
                    <Card key={post.id} className="bg-white border-slate-200 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all group border-l-[6px] border-l-blue-600">
                       <div className="flex items-center gap-4 mb-6">
                          <img src={post.avatar} className="w-12 h-12 rounded-full border-2 border-slate-100" />
                          <div>
                            <p className="font-black text-slate-900 text-sm">{post.author}</p>
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                               <GraduationCap className="w-3 h-3" /> {post.university}
                            </span>
                          </div>
                          <span className="ml-auto text-xs font-bold text-slate-400">2h ago</span>
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                          {post.title}
                       </h3>
                       <p className="text-slate-600 font-medium leading-relaxed mb-6">
                          {post.content}
                       </p>
                       <div className="flex flex-wrap gap-2 mb-8">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 rounded-lg">
                               {tag}
                            </span>
                          ))}
                       </div>
                       <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
                          <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-bold text-sm">
                             <Heart className="w-5 h-5" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm">
                             <MessageSquare className="w-5 h-5" /> {post.replies}
                          </button>
                          <div className="ml-auto flex gap-4">
                             <button className="text-slate-300 hover:text-slate-600 transition-colors"><Bookmark className="w-5 h-5" /></button>
                             <button className="text-slate-300 hover:text-slate-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            ) : (
               <div className="grid sm:grid-cols-2 gap-6">
                  {STUDY_BUDDIES.map(buddy => (
                    <Card key={buddy.id} className="bg-white border-slate-200 rounded-[32px] p-8 text-center hover:border-blue-300 transition-all shadow-sm">
                       <img src={buddy.avatar} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-slate-50" />
                       <h3 className="text-2xl font-black text-slate-900 mb-1">{buddy.name}</h3>
                       <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-4">{buddy.uni}</p>
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Studying</p>
                          <p className="text-sm font-bold text-slate-900">{buddy.major}</p>
                       </div>
                       <Button className="w-full h-12 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-black tracking-widest uppercase text-xs">
                          CONNECT
                       </Button>
                    </Card>
                  ))}
               </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
               <h3 className="text-xs font-black text-slate-900 mb-6 uppercase tracking-widest">Trending Tags</h3>
               <div className="flex flex-wrap gap-2">
                  {["Visa Process", "Abu Dhabi", "Rental Agreements", "Grocery Hacks", "Metro Tips", "Study Spaces"].map(tag => (
                    <button key={tag} className="px-4 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 transition-all">
                       {tag}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-xl">
               <h3 className="font-black text-white mb-4 uppercase tracking-widest text-xs">Join Uni WhatsApp</h3>
               <p className="text-blue-100 text-sm leading-relaxed font-medium mb-8">
                 Verified university groups are open! Connect with Batch 2026 students immediately.
               </p>
               <Button className="w-full h-14 bg-white text-navy-900 hover:bg-blue-50 font-black rounded-2xl flex items-center justify-center gap-2 tracking-widest text-xs uppercase">
                 BROWSE GROUPS <ArrowRight className="w-4 h-4" />
               </Button>
            </div>
          </aside>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy-900/40 backdrop-blur-sm animate-in fade-in duration-300">
           <Card className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Plus className="w-8 h-8 rotate-45" />
              </button>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Ask a Question</h2>
              <p className="text-slate-500 mb-8 font-medium">Your question will be visible to students from your university first.</p>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Topic</label>
                    <div className="grid grid-cols-2 gap-3">
                       {["Visa/ID", "Banking", "Housing", "Social"].map(t => (
                         <button key={t} className="h-12 border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:border-blue-600 hover:text-blue-600 transition-all">{t}</button>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Your Question</label>
                    <textarea 
                      placeholder="e.g. Where is the best place to get a student ID in Dubai?"
                      className="w-full h-32 p-4 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none font-medium text-slate-700"
                    />
                 </div>
                 <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl tracking-widest uppercase">
                    POST QUESTION
                 </Button>
              </div>
           </Card>
        </div>
      )}
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
