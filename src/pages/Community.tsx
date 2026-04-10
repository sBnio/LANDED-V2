import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, ThumbsUp, MessageCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const threads = [
  {
    id: 1,
    author: "Sarah K.",
    university: "Middlesex University Dubai",
    avatar: "bg-purple-500",
    title: "Best affordable housing near Knowledge Park?",
    snippet: "Hi everyone! I'm arriving in September and looking for shared accommodation near Middlesex. Any recommendations for buildings or agents that are student-friendly?",
    tags: ["Housing", "Knowledge Park"],
    replies: 12,
    likes: 24,
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Ahmed M.",
    university: "University of Wollongong",
    avatar: "bg-blue-500",
    title: "Emirates ID biometrics appointment delay",
    snippet: "My visa is approved but I can't get a biometrics appointment for another 3 weeks. Will this affect my university registration?",
    tags: ["Emirates ID", "Visa"],
    replies: 5,
    likes: 8,
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Elena R.",
    university: "Heriot-Watt University",
    avatar: "bg-emerald-500",
    title: "Opening a bank account without Emirates ID?",
    snippet: "Is it possible to open a student bank account with just my passport and entry permit? I need to transfer funds for rent ASAP.",
    tags: ["Banking", "Urgent"],
    replies: 18,
    likes: 32,
    time: "1 day ago",
  },
];

export function Community() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-navy-900 font-heading">Community</h1>
            </div>
            <p className="text-slate-500">
              Connect with other students, ask questions, and share tips.
            </p>
          </div>
          <Button className="rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-md px-6 h-12">
            <MessageSquare className="w-4 h-4 mr-2" />
            Ask a Question
          </Button>
        </div>

        <div className="max-w-4xl mx-auto mt-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-blue-500"
            />
          </div>
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 text-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {threads.map((thread) => (
            <Card key={thread.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${thread.avatar}`}>
                  {thread.author.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-navy-900 text-lg">{thread.author}</h3>
                      <p className="text-xs text-slate-500">{thread.university} • {thread.time}</p>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-xl text-navy-900 mt-3 mb-2">{thread.title}</h4>
                  <p className="text-slate-600 mb-4 line-clamp-2">{thread.snippet}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {thread.tags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{thread.likes} Likes</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{thread.replies} Replies</span>
                    </button>
                    <Button variant="ghost" className="ml-auto text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold">
                      View Thread
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
