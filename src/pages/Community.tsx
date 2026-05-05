import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
import { useOnboarding } from "@/context/OnboardingContext";

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const INITIAL_TIME = Date.now();

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
    avatar: "https://picsum.photos/seed/fatima/100/100",
    timestamp: INITIAL_TIME - 2 * 60 * 60 * 1000, // 2h ago
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
    avatar: "https://picsum.photos/seed/rahul/100/100",
    timestamp: INITIAL_TIME - 5 * 60 * 60 * 1000, // 5h ago
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
    avatar: "https://picsum.photos/seed/ziad/100/100",
    timestamp: INITIAL_TIME - 24 * 60 * 60 * 1000, // 1d ago
  }
];

const STUDY_BUDDIES = [
  { id: 1, name: "Chloe", major: "Computer Science", uni: "NYU Abu Dhabi", interest: "AI Ethics", avatar: "https://picsum.photos/seed/chloe/100/100", lookingFor: "Hackathon Teammate", languages: ["English", "French"] },
  { id: 2, name: "Omar", major: "Mechanical Engineering", uni: "Khalifa University", interest: "Robotics", avatar: "https://picsum.photos/seed/omar/100/100", lookingFor: "Study Partner", languages: ["Arabic", "English"] },
  { id: 3, name: "Sara", major: "Business Admin", uni: "AUS", interest: "Entrepreneurship", avatar: "https://picsum.photos/seed/sara/100/100", lookingFor: "Startup Co-founder", languages: ["English"] },
  { id: 4, name: "James", major: "Design", uni: "Zayed University", interest: "UI/UX", avatar: "https://picsum.photos/seed/james/100/100", lookingFor: "Mock Interviews", languages: ["English"] },
  { id: 5, name: "Aisha", major: "Medicine", uni: "UAEU", interest: "Neuroscience", avatar: "https://picsum.photos/seed/aisha/100/100", lookingFor: "Study Partner", languages: ["Arabic", "English", "Urdu"] },
  { id: 6, name: "Liam", major: "Finance", uni: "Heriot-Watt", interest: "Fintech", avatar: "https://picsum.photos/seed/liam/100/100", lookingFor: "Networking", languages: ["English", "German"] },
];

export function Community() {
  const { state: globalState } = useOnboarding();
  const [activeTab, setActiveTab] = useState<"Forum" | "Study Buddy">("Forum");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(FORUM_POSTS.map(p => ({
    ...p,
    isLiked: false,
    isBookmarked: false,
    comments: [] as {id: number, author: string, content: string, timestamp: number}[],
    showComments: false,
    newComment: ""
  })));
  const [newQuestionTopic, setNewQuestionTopic] = useState("Housing");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const [buddies, setBuddies] = useState(STUDY_BUDDIES.map(b => ({ ...b, inviteSent: false })));
  const [buddySearch, setBuddySearch] = useState("");
  const [buddyMajorFilter, setBuddyMajorFilter] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handlePostQuestion = () => {
    if (!newQuestionText.trim()) return;
    
    const newPost = {
      id: Date.now(),
      author: globalState.name || "New Student",
      university: globalState.university || "My University",
      title: newQuestionText,
      content: "Waiting for responses...",
      tags: [newQuestionTopic],
      likes: 0,
      replies: 0,
      avatar: `https://picsum.photos/seed/${globalState.name || Date.now()}/100/100`,
      timestamp: Date.now(),
      isLiked: false,
      isBookmarked: false,
      comments: [],
      showComments: false,
      newComment: ""
    };

    setPosts([newPost, ...posts]);
    setNewQuestionText("");
    setIsModalOpen(false);
  };

  const filteredPosts = showBookmarks 
    ? posts.filter(post => post.isBookmarked) 
    : (selectedTopic ? posts.filter(post => post.tags.includes(selectedTopic)) : posts);

  const handleLike = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return p.isLiked 
          ? { ...p, isLiked: false, likes: p.likes - 1 }
          : { ...p, isLiked: true, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  const handleBookmark = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p));
  };

  const handleShare = (id: number) => {
    navigator.clipboard.writeText(`${window.location.origin}/community#post-${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleComments = (id: number) => {
    setPosts(posts.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  };

  const handleCommentSubmit = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id && p.newComment?.trim()) {
        const comment = { id: Date.now(), author: globalState.name || "Student", content: p.newComment, timestamp: Date.now() };
        return { ...p, comments: [...(p.comments || []), comment], replies: p.replies + 1, newComment: "" };
      }
      return p;
    }));
  };

  const handleInvite = (id: number) => {
    setBuddies(buddies.map(b => b.id === id ? { ...b, inviteSent: true } : b));
  };

  const filteredBuddies = buddies
    .filter(b => b.name.toLowerCase().includes(buddySearch.toLowerCase()) || b.uni.toLowerCase().includes(buddySearch.toLowerCase()))
    .filter(b => buddyMajorFilter ? b.major.toLowerCase().includes(buddyMajorFilter.toLowerCase()) : true);



  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12 text-slate-900">
      <div className="bg-[#0A1628] text-white pt-16 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 uppercase italic leading-[0.8] drop-shadow-sm">STUDENT <span className="text-amber-500">HUB</span></h1>
              <p className="text-amber-100/70 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                The unofficial network of international students in the UAE.
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="rounded-2xl h-16 px-10 bg-white text-[#0A1628] hover:bg-amber-50 font-black uppercase tracking-widest text-xs shadow-2xl transition-all hover:-translate-y-1 active:translate-y-0"
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
                    onClick={() => { setActiveTab(tab); setShowBookmarks(false); }}
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
               <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700 ease-out">
                  {showBookmarks && filteredPosts.length === 0 && (
                     <div className="text-center py-20 px-6 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50/50">
                        <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No bookmarks yet</h3>
                        <p className="text-slate-500 font-medium">Save helpful posts by clicking the bookmark icon so you can easily find them later.</p>
                     </div>
                  )}
                  {filteredPosts.map(post => (
                    <Card id={`post-${post.id}`} key={post.id} className="bg-white border-slate-100 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.08)] transition-all group overflow-hidden border-2 border-transparent hover:border-amber-500/20">
                       <div className="flex items-center gap-4 mb-6">
                          <img src={post.avatar} className="w-12 h-12 rounded-2xl border-2 border-slate-50 object-cover shadow-sm" />
                          <div className="flex-1">
                            <h4 className="font-black text-slate-900 text-sm tracking-tight">{post.author}</h4>
                             <div className="flex items-center gap-2 mt-1">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600 text-[9px] font-black uppercase tracking-widest border border-amber-100">
                                   <GraduationCap className="w-3 h-3" /> {post.university}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">• {getTimeAgo(post.timestamp)}</span>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button 
                               onClick={() => handleBookmark(post.id)}
                               className={cn(
                                 "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                 post.isBookmarked ? "bg-amber-100 text-amber-600 shadow-inner" : "bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                               )}
                             >
                                <Bookmark className={cn("w-4.5 h-4.5", post.isBookmarked && "fill-current")} />
                             </button>
                             <button 
                               onClick={() => handleShare(post.id)}
                               className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-all font-black text-[10px]"
                             >
                                {copiedId === post.id ? <span className="text-[9px] text-amber-600">COPIED</span> : <Share2 className="w-4.5 h-4.5" />}
                             </button>
                          </div>
                       </div>
                       
                       <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-amber-600 transition-colors">
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
                          <button 
                            onClick={() => handleLike(post.id)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-xs uppercase tracking-widest",
                              post.isLiked ? "bg-red-50 text-red-500 ring-2 ring-red-100" : "bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50"
                            )}>
                             <Heart className={cn("w-4 h-4", post.isLiked && "fill-current")} /> {post.likes}
                          </button>
                          <button 
                            onClick={() => toggleComments(post.id)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-xs uppercase tracking-widest",
                              post.showComments ? "bg-amber-50 text-amber-600 ring-2 ring-amber-100" : "bg-slate-50 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                            )}>
                             <MessageSquare className={cn("w-4 h-4", post.showComments && "fill-current")} /> {post.replies}
                          </button>
                          <div className="ml-auto flex -space-x-2">
                             {[1, 2, 3].map(i => (
                               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                  <img src={`https://picsum.photos/seed/user${i + post.id}/50/50`} alt="" />
                               </div>
                             ))}
                             <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">+9</div>
                          </div>
                       </div>
                       {post.showComments && (
                         <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-4 duration-300">
                           {post.comments && post.comments.length > 0 ? (
                             <div className="space-y-4 mb-6">
                               {post.comments.map(comment => (
                                 <div key={comment.id} className="flex gap-4">
                                   <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-amber-700 uppercase shadow-sm">
                                     {comment.author.substring(0,2)}
                                   </div>
                                   <div className="flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100/50">
                                     <div className="flex items-baseline justify-between mb-1">
                                       <span className="font-bold text-slate-900 text-xs">{comment.author}</span>
                                       <span className="text-[10px] font-bold text-slate-400">{getTimeAgo(comment.timestamp)}</span>
                                     </div>
                                     <p className="text-slate-600 text-sm font-medium">{comment.content}</p>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           ) : (
                             <div className="text-center py-6 text-slate-400 font-medium text-sm">
                               No comments yet. Be the first to start the discussion!
                             </div>
                           )}
                           <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
                             <img src={`https://picsum.photos/seed/${globalState.name || "Current"}/100/100`} className="w-10 h-10 rounded-xl" />
                             <input 
                               type="text" 
                               placeholder="Add a comment..." 
                               value={post.newComment}
                               onChange={(e) => setPosts(posts.map(p => p.id === post.id ? { ...p, newComment: e.target.value } : p))}
                               onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                               className="flex-1 bg-transparent border-none px-3 py-2 text-sm font-medium focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
                             />
                             <Button 
                               onClick={() => handleCommentSubmit(post.id)}
                               disabled={!post.newComment?.trim()}
                               className="rounded-xl px-6 bg-slate-900 text-white hover:bg-amber-600 font-bold tracking-widest text-[10px] uppercase h-10 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-300 disabled:text-slate-500"
                             >
                               Post
                             </Button>
                           </div>
                         </div>
                       )}
                    </Card>
                  ))}
               </div>
            ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 ease-out">
                  
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                       <input 
                         type="text" 
                         value={buddySearch}
                         onChange={(e) => setBuddySearch(e.target.value)}
                         placeholder="Search by name or university..." 
                         className="w-full pl-12 pr-4 h-14 rounded-2xl bg-slate-50 border-none outline-none font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/20"
                       />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                       {["Computer Science", "Engineering", "Business", "Design", "Requirements"].map(major => (
                         <button 
                           key={major}
                           onClick={() => setBuddyMajorFilter(buddyMajorFilter === major ? null : major)}
                           className={cn(
                             "whitespace-nowrap px-6 py-3 rounded-xl text-xs font-bold transition-all flex-shrink-0",
                             buddyMajorFilter === major ? "bg-amber-100 text-amber-700 shadow-inner" : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                           )}
                         >
                           {major}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {filteredBuddies.map(buddy => (
                      <Card key={buddy.id} className="bg-white border-slate-100 rounded-[32px] p-8 text-center hover:shadow-xl hover:scale-[1.02] transition-all shadow-sm group overflow-hidden relative">
                         <div className="relative inline-block mb-4 mt-2">
                            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full translate-y-2 scale-110 group-hover:bg-amber-500/30 transition-colors" />
                            <img src={buddy.avatar} className="relative w-24 h-24 rounded-3xl mx-auto border-[6px] border-white object-cover shadow-lg" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                               <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                            </div>
                         </div>
                         <h3 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">{buddy.name}</h3>
                         <p className="text-amber-600 font-black text-[10px] uppercase tracking-[0.2em] mb-6">{buddy.uni}</p>
                         
                         <div className="grid grid-cols-2 gap-3 mb-6 content-baseline">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                               <div className="flex items-center gap-1.5 mb-1 text-slate-400">
                                  <Briefcase className="w-3.5 h-3.5" />
                                  <p className="text-[9px] font-black uppercase tracking-widest">Major</p>
                               </div>
                               <p className="text-xs font-bold text-slate-800 line-clamp-1" title={buddy.major}>{buddy.major}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-left relative overflow-hidden">
                               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                               <div className="relative z-10">
                                 <div className="flex items-center gap-1.5 mb-1 text-blue-400">
                                    <Search className="w-3.5 h-3.5" />
                                    <p className="text-[9px] font-black uppercase tracking-widest">Looking For</p>
                                 </div>
                                 <p className="text-xs font-bold text-slate-800 line-clamp-1" title={buddy.lookingFor}>{buddy.lookingFor}</p>
                               </div>
                            </div>
                         </div>
                         
                         <div className="flex flex-wrap gap-1.5 justify-center mb-8">
                            {buddy.languages.map(lang => (
                               <span key={lang} className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                                 {lang}
                               </span>
                            ))}
                         </div>
                         
                         <Button 
                           onClick={() => handleInvite(buddy.id)}
                           disabled={buddy.inviteSent}
                           className={cn(
                             "w-full h-14 rounded-2xl font-black tracking-widest uppercase text-xs transition-all shadow-lg",
                             buddy.inviteSent 
                               ? "bg-green-50 text-green-600 shadow-none hover:bg-green-50" 
                               : "bg-slate-900 hover:bg-amber-600 text-white shadow-slate-200"
                           )}
                         >
                            {buddy.inviteSent ? "INVITE SENT ✓" : "SEND INVITE"}
                         </Button>
                      </Card>
                    ))}
                  </div>
                  {filteredBuddies.length === 0 && (
                    <div className="text-center py-20 px-6 border-2 border-dashed border-slate-200 rounded-[32px] bg-white">
                      <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">No buddies found</h3>
                      <p className="text-slate-500 font-medium">Try adjusting your search criteria</p>
                    </div>
                  )}
               </div>
            )}
          </div>

          <aside className="space-y-8">
            {activeTab === "Forum" && (
              <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md">
                 <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
                    <Bookmark className="w-4 h-4" /> Your Library
                 </h3>
                 <button 
                   onClick={() => setShowBookmarks(!showBookmarks)}
                   className={cn(
                     "w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all font-bold group",
                     showBookmarks 
                       ? "bg-amber-50 border-amber-500/30 text-amber-700 shadow-sm" 
                       : "bg-slate-50 border-transparent hover:border-slate-200 text-slate-700 hover:bg-slate-100"
                   )}
                 >
                   <span className="flex items-center gap-2">
                     <Bookmark className={cn("w-4.5 h-4.5 transition-colors", showBookmarks ? "fill-current" : "text-slate-400 group-hover:text-amber-500")} />
                     Saved Posts
                   </span>
                   <span className={cn(
                     "px-3 py-1 rounded-xl text-xs font-black shadow-sm transition-all",
                     showBookmarks ? "bg-amber-500 text-white" : "bg-white text-slate-500 border border-slate-100 group-hover:border-amber-200 group-hover:text-amber-600"
                   )}>
                     {posts.filter(p => p.isBookmarked).length}
                   </span>
                 </button>
              </div>
            )}

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm overflow-hidden relative group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-100/50 transition-colors" />
               <h3 className="text-[11px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em] relative z-10 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Filter Topics
               </h3>
               <div className="flex flex-wrap gap-2 relative z-10">
                  {["Visa/ID", "Banking", "Housing", "Social", "Medical Test", "SIM Card"].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => setSelectedTopic(selectedTopic === tag ? null : tag)}
                      className={cn(
                        "px-4 py-2 hover:bg-white border hover:border-amber-500/30 rounded-xl text-[11px] font-bold shadow-sm hover:shadow-md transition-all",
                        selectedTopic === tag ? "bg-amber-50 border-amber-500/30 text-amber-600" : "bg-slate-50 border-slate-100 text-slate-600 hover:text-amber-600"
                      )}
                    >
                       {tag}
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-amber-700 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
               <div className="relative z-10">
                  <h3 className="font-black text-white/90 mb-4 uppercase tracking-[0.2em] text-[11px]">University Connect</h3>
                  <h4 className="text-3xl font-black mb-4 leading-tight">Join Your Uni WhatsApp Group</h4>
                  <p className="text-white/70 text-sm leading-relaxed font-medium mb-8">
                    Don't start your journey alone. Get expert tips from seniors and coordinate move-ins.
                  </p>
                  <Button className="w-full h-16 bg-white text-amber-900 hover:bg-amber-50 font-black rounded-2xl flex items-center justify-center gap-3 tracking-widest text-[11px] uppercase shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">
                    FIND MY BATCH <ArrowRight className="w-5 h-5" />
                  </Button>
               </div>
            </div>
          </aside>
        </div>
      </div>

      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <Card className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-[40px] shadow-2xl p-6 sm:p-10 relative scrollbar-hide" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Plus className="w-8 h-8 rotate-45" />
              </button>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic pr-12">Ask a Question</h2>
              <p className="text-slate-500 text-sm sm:text-base mb-8 font-medium">Your question will be visible to students from your university first.</p>
              
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Topic</label>
                    <div className="grid grid-cols-2 gap-3">
                       {["Visa/ID", "Banking", "Housing", "Social"].map(t => (
                         <button key={t} onClick={() => setNewQuestionTopic(t)} className={cn("h-12 border-2 rounded-xl font-bold transition-all", newQuestionTopic === t ? "border-amber-600 text-amber-600" : "border-slate-100 text-slate-600 hover:border-amber-600 hover:text-amber-600")}>{t}</button>
                       ))}
                    </div>
                 </div>
                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 block">Your Question</label>
                    <textarea 
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="e.g. Where is the best place to get a student ID in Dubai?"
                      className="w-full h-32 p-4 border-2 border-slate-100 rounded-2xl focus:border-amber-600 outline-none font-medium text-slate-700"
                    />
                 </div>
                 <Button 
                   onClick={handlePostQuestion}
                   disabled={!newQuestionText.trim()}
                   className="w-full h-16 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black rounded-2xl tracking-widest uppercase"
                 >
                    POST QUESTION
                 </Button>
              </div>
           </Card>
        </div>,
        document.body
      )}
    </div>
  );
}

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={cn("w-5 h-5", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
