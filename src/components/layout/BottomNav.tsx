import { Link, useLocation } from "react-router-dom";
import { Map, FileText, Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: "Roadmap", path: "/dashboard", icon: Map },
    { name: "Docs", path: "/documents", icon: FileText },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Community", path: "/community", icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-amber-500" : "text-slate-500",
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive ? "text-amber-500" : "")}
              />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
