import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserState {
  name: string;
  nationality: string;
  university: string;
  arrivalDate: string;
  visaStatus: string;
  dateOfBirth: string;
  emirate: string;
  hasAccommodation: 'Yes' | 'No' | 'Still looking' | null;
  hasSIMCard: boolean;
  hasEmiratesID: 'applied' | 'not yet';
  hasBankAccount: boolean;
  visaType: string;
  sponsoringStay: string;
  languagePreference: string;
  helpNeeded: string[];
  completedSteps: (number | string)[];
  completedDocuments: string[];
  submittedDocuments: string[];
  zayedCampus: string;
  chatHistory: { role: "user" | "assistant"; content: string }[];
  hasCompletedOnboarding: boolean;
  authMethod?: "google" | "email";
  preferredCurrency: string;
  preferredLanguage: string;
}

const defaultState: UserState = {
  name: "",
  nationality: "",
  university: "",
  arrivalDate: "",
  visaStatus: "",
  dateOfBirth: "",
  emirate: "",
  hasAccommodation: null,
  hasSIMCard: false,
  hasEmiratesID: 'not yet',
  hasBankAccount: false,
  visaType: "",
  sponsoringStay: "",
  languagePreference: "English",
  helpNeeded: [],
  completedSteps: [],
  completedDocuments: [],
  submittedDocuments: [],
  zayedCampus: "",
  chatHistory: [],
  hasCompletedOnboarding: false,
  preferredCurrency: "AED",
  preferredLanguage: "English",
};

interface OnboardingContextType {
  state: UserState;
  updateState: (updates: Partial<UserState>) => void;
  toggleStep: (stepId: number | string) => void;
  toggleDocument: (docId: string) => void;
  toggleSubmittedDocument: (docId: string) => void;
  resetState: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<UserState>(() => {
    const saved = localStorage.getItem("landed_user_state");
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem("landed_user_state", JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<UserState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const toggleStep = (stepId: number | string) => {
    setState((prev) => {
      const isCompleted = prev.completedSteps.includes(stepId);
      return {
        ...prev,
        completedSteps: isCompleted
          ? prev.completedSteps.filter((id) => id !== stepId)
          : [...prev.completedSteps, stepId],
      };
    });
  };

  const toggleDocument = (docId: string) => {
    setState((prev) => {
      const isCompleted = prev.completedDocuments.includes(docId);
      return {
        ...prev,
        completedDocuments: isCompleted
          ? prev.completedDocuments.filter((id) => id !== docId)
          : [...prev.completedDocuments, docId],
      };
    });
  };

  const toggleSubmittedDocument = (docId: string) => {
    setState((prev) => {
      const isSubmitted = prev.submittedDocuments?.includes(docId);
      return {
        ...prev,
        submittedDocuments: isSubmitted
          ? prev.submittedDocuments.filter((id) => id !== docId)
          : [...(prev.submittedDocuments || []), docId],
      };
    });
  };

  const resetState = () => {
    setState(defaultState);
  };

  return (
    <OnboardingContext.Provider
      value={{ state, updateState, toggleStep, toggleDocument, toggleSubmittedDocument, resetState }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
