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
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12 text-slate-900">
      <div className="bg-[#0A1628] text-white pt-16 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic leading-[0.8] drop-shadow-sm">STUDENT <span className="text-blue-500">HUB</span></h1>
              <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                The unofficial network of 12,000+ international students in the UAE.
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="rounded-2xl h-16 px-10 bg-white text-[#0A1628] hover:bg-blue-50 font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
              >
                <Plus className="w-5 h-5 mr-3 stroke-[3px]" /> Ask a Question
              </Button>
            </div>
          </div>

          <div className="flex justify-start md:justify-center">
            <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl rounded-[28px] mt-16 border border-white/10 shadow-2xl">
              {(["Forum", "Study Buddy"] as const).map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-10 h-14 rounded-[22px] font-black text-xs uppercase tracking-[0.15em] transition-all duration-500 relative overflow-hidden group",
                      activeTab === tab 
                        ? "bg-white text-[#0A1628] shadow-white/10 translate-y-0" 
                        : "text-white/40 hover:text-white/90"
                    )}
                 >
                    <span className="relative z-10">{tab}</span>
                    {activeTab !== tab && (
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                    )}
                 </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 mb-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "Forum" ? (
               <div className="space-y-6">
                  {FORUM_POSTS.map(post => (
                    <Card key={post.id} className="bg-white border-slate-100 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all group overflow-hidden border-t-2 border-t-transparent hover:border-t-blue-500/30">
                       <div className="flex items-center gap-4 mb-6">
                          <img src={post.avatar} className="w-12 h-12 rounded-2xl border-2 border-slate-50 object-cover shadow-sm" />
                          <div className="flex-1">
                            <h4 className="font-black text-slate-900 text-sm tracking-tight">{post.author}</h4>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest border border-blue-100">
                                   <GraduationCap className="w-3 h-3" /> {post.university}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">• 2h ago</span>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Bookmark className="w-4.5 h-4.5" /></button>
                             <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"><Share2 className="w-4.5 h-4.5" /></button>
                          </div>
                       </div>
                       
                       <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                          {post.title}
                       </h3>
                       <p className="text-slate-500 font-medium text-base leading-relaxed mb-6">
                          {post.content}
                       </p>
                       
                       <div className="flex flex-wrap gap-2 mb-8">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 rounded-xl">
                               #{tag}
                            </span>
                          ))}
                       </div>
                       
                       <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black text-xs uppercase tracking-widest">
                             <Heart className="w-4 h-4" /> {post.likes}
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all font-black text-xs uppercase tracking-widest">
                             <MessageSquare className="w-4 h-4" /> {post.replies}
                          </button>
                          <div className="ml-auto flex -space-x-2">
                             {[1, 2, 3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                  <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="" />
                               </div>
                             ))}
                             <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">+9</div>
                          </div>
                       </div>
                    </Card>
                  ))}
               </div>
            ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                  {STUDY_BUDDIES.map(buddy => (
                    <Card key={buddy.id} className="bg-white border-slate-100 rounded-[32px] p-8 text-center hover:shadow-xl hover:scale-[1.02] transition-all shadow-sm group">
                       <div className="relative inline-block mb-6">
                          <img src={buddy.avatar} className="w-20 h-20 rounded-3xl mx-auto border-4 border-slate-50 object-cover shadow-md" />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </div>
                       </div>
                       <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">{buddy.name}</h3>
                       <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-6">{buddy.uni}</p>
                       
                       <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6">
                          <div className="flex items-center justify-center gap-2 mb-2">
                             <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Majoring in</p>
                          </div>
                          <p className="text-sm font-bold text-slate-800">{buddy.major}</p>
                       </div>
                       
                       <Button className="w-full h-14 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-black tracking-widest uppercase text-xs transition-all shadow-lg shadow-slate-200">
                          SEND INVITE
                       </Button>
                    </Card>
                  ))}
               </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100/50 transition-colors" />
               <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Trending Topics
               </h3>
               <div className="flex flex-wrap gap-2 relative z-10">
                  {["Visa Process", "Abu Dhabi", "Rental Agreements", "Grocery Hacks", "Metro Tips", "Study Spaces"].map(tag => (
                    <button key={tag} className="px-4 py-2 bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-500/30 rounded-xl text-[11px] font-bold text-slate-600 hover:text-blue-600 shadow-sm hover:shadow-md transition-all">
                       {tag}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
               <div className="relative z-10">
                  <h3 className="font-black text-white/90 mb-4 uppercase tracking-[0.2em] text-[11px]">University Connect</h3>
                  <h4 className="text-3xl font-black mb-4 leading-tight">Join Your Uni WhatsApp Group</h4>
                  <p className="text-white/70 text-sm leading-relaxed font-medium mb-8">
                    Don't start your journey alone. Get expert tips from seniors and coordinate move-ins.
                  </p>
                  <Button className="w-full h-16 bg-white text-blue-900 hover:bg-blue-50 font-black rounded-2xl flex items-center justify-center gap-3 tracking-widest text-[11px] uppercase shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">
                    FIND MY BATCH <ArrowRight className="w-5 h-5" />
                  </Button>
               </div>
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
