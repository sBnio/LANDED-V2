import { useOnboarding } from "@/context/OnboardingContext";

export const currencies = [
  { code: "AED", rate: 1 },
  { code: "USD", rate: 0.272 },
  { code: "GBP", rate: 0.216 },
  { code: "EUR", rate: 0.252 },
  { code: "INR", rate: 22.7 },
  { code: "PKR", rate: 75.8 },
];

export function useCurrency() {
  const { state } = useOnboarding();
  const currencyCode = state.preferredCurrency || "AED";
  const rate = currencies.find(c => c.code === currencyCode)?.rate || 1;

  const formatAmt = (amt: number) => {
    const converted = amt * rate;
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(converted);
  };

  return { formatAmt, currencyCode, rate };
}
