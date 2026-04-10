import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { OnboardingProvider, useOnboarding } from "@/context/OnboardingContext";
import { Landing } from "@/pages/Landing";
import { Onboarding } from "@/pages/Onboarding";
import { Dashboard } from "@/pages/Dashboard";
import { Documents } from "@/pages/Documents";
import { Services } from "@/pages/Services";
import { Community } from "@/pages/Community";
import { ChatMobile } from "@/pages/ChatMobile";
import { BottomNav } from "@/components/layout/BottomNav";

import { Sidebar } from "@/components/layout/Sidebar";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useOnboarding();
  if (!state.hasCompletedOnboarding) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

import { AIChatWidget } from "@/components/chat/AIChatWidget";

function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLandingOrOnboarding =
    location.pathname === "/" || location.pathname === "/onboarding";
  const isChatMobile = location.pathname === "/chat";

  if (isLandingOrOnboarding) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <main className="flex-1 w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
      </div>

      <BottomNav />

      {/* Hide widget on mobile chat page, but show on desktop or other pages */}
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
