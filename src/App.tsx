import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import { Loader2 } from "lucide-react";

const Landing = lazy(() => import("@/pages/Landing").then(m => ({ default: m.Landing })));
const Onboarding = lazy(() => import("@/pages/Onboarding").then(m => ({ default: m.Onboarding })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Documents = lazy(() => import("@/pages/Documents").then(m => ({ default: m.Documents })));
const Services = lazy(() => import("@/pages/Services").then(m => ({ default: m.Services })));
const Community = lazy(() => import("@/pages/Community").then(m => ({ default: m.Community })));
const ChatMobile = lazy(() => import("@/pages/ChatMobile").then(m => ({ default: m.ChatMobile })));

import { BottomNav } from "@/components/layout/BottomNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { AIChatWidget } from "@/components/chat/AIChatWidget";

function PageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useOnboarding();
  if (!state.hasCompletedOnboarding) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLandingOrOnboarding =
    location.pathname === "/" || location.pathname === "/onboarding";
  const isChatMobile = location.pathname === "/chat";

  // Create refs to target the exact scrollable content areas defensively
  const landingRef = React.useRef<HTMLElement>(null);
  const mainRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    // 1. Force the global window to scroll to the absolute top immediately on every route transition.
    // Using 'smooth' behavior gives a fast, un-janky scroll transition (native PWA best practice).
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // 2. Select the currently active ref based on the current layout in view
    const activeRef = isLandingOrOnboarding ? landingRef.current : mainRef.current;

    // 3. Defensive container scroll + Premium subtle entrance animation using the Web Animations API
    if (activeRef) {
      // Force internal container to top as a fallback for specific mobile PWA CSS environments
      // where the body might be fixed and the scrolling happens inside the `main` tag.
      activeRef.scrollTop = 0;
      
      // Hardware-accelerated fade-in + slight upward shift (opacity & transform ONLY).
      // Doing this via native DOM completely bypasses React's render lifecycle, ensuring 60fps
      // performance and zero layout shift, even with heavy dynamic content.
      activeRef.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 400, // Balanced duration: fast enough to not block, slow enough to feel luxurious
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", // Modern decelerating curve for organic feel
          fill: "forwards" // Keep the final frame states after the animation completes
        }
      );
    }
  }, [location.pathname, isLandingOrOnboarding]); // Only re-run when the section path explicitly changes

  if (isLandingOrOnboarding) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
        <main ref={landingRef} className="flex-1 w-full">
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main ref={mainRef} className="flex-1 w-full pb-16 md:pb-0">
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </main>
      </div>

      <BottomNav />

      <div className={isChatMobile ? "hidden md:block" : "block"}>
        <AIChatWidget />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OnboardingProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatMobile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </OnboardingProvider>
  );
}
