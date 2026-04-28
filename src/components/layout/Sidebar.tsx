import { Link, useLocation } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import { stepsData } from "@/data/steps";
import { 
  Map, 
  FileText, 
  Briefcase, 
  Users, 
  Settings,
  Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Sidebar() {
  const { state } = useOnboarding();
  const location = useLocation();
  
  // Calculate progress
  const completed = state.completedSteps.length;
  const totalTasks = stepsData.length; 
  const percent = Math.round((completed / totalTasks) * 100) || 0;

  const navItems = [
    { name: "My Roadmap", path: "/dashboard", icon: Map },
    { name: "Budget Planner", path: "/budget", icon: Wallet },
    { name: "My Documents", path: "/documents", icon: FileText },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Community", path: "/community", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="hover:opacity-80 transition-opacity block">
          <Logo className="text-2xl" />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-slate-50 text-navy-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-amber-500" : "text-slate-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-100 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${percent}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-navy-900">{percent}%</span>
          </div>
          <div>
            <p className="text-sm font-bold text-navy-900">Keep going!</p>
            <p className="text-xs text-slate-500 mt-0.5">You're doing great</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
