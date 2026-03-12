import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "GBP" | "EUR";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** Convert a GBP numeric amount to the selected currency */
  convert: (gbpAmount: number) => number;
  /** Format a GBP numeric amount as a display string in the selected currency */
  format: (gbpAmount: number) => string;
  /** Format a raw price string like "£1,599" or "£60" into the selected currency */
  formatPrice: (gbpPriceStr: string) => string;
  symbol: string;
}

// Fixed exchange rate: 1 GBP = 1.18 EUR (update as needed)
const GBP_TO_EUR = 1.18;

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      return (localStorage.getItem("ace-currency") as Currency) || "GBP";
    } catch {
      return "GBP";
    }
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("ace-currency", c);
    } catch {}
  };

  const symbol = currency === "GBP" ? "£" : "€";

  const convert = (gbpAmount: number): number => {
    if (currency === "GBP") return gbpAmount;
    return Math.round(gbpAmount * GBP_TO_EUR);
  };

  const format = (gbpAmount: number): string => {
    const amount = convert(gbpAmount);
    // Format with commas for thousands
    return `${symbol}${amount.toLocaleString("en-GB")}`;
  };

  /**
   * Takes a string like "£1,599" or "£60" or "£1,799" and returns the
   * equivalent in the selected currency. Non-price strings are returned as-is.
   */
  const formatPrice = (gbpPriceStr: string): string => {
    if (!gbpPriceStr) return gbpPriceStr;
    // Match strings like £1,599 or £60 or £1199
    const match = gbpPriceStr.match(/^£([\d,]+)/);
    if (!match) return gbpPriceStr;
    const numericStr = match[1].replace(/,/g, "");
    const numeric = parseInt(numericStr, 10);
    if (isNaN(numeric)) return gbpPriceStr;
    // Replace the £NNN part with the converted amount, keep any suffix
    const suffix = gbpPriceStr.slice(match[0].length);
    return `${format(numeric)}${suffix}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert, format, formatPrice, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
