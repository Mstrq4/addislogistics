"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  detectBrowserLocale,
  Direction,
  getDirection,
  Locale,
  LOCALE_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "@/lib/i18n";

export type ThemeMode = "dark" | "light";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

interface LocaleContextValue {
  locale: Locale;
  dir: Direction;
  theme: ThemeMode;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  setTheme: (next: ThemeMode) => void;
  toggleTheme: () => void;
  selectedQuoteService: string;
  setSelectedQuoteService: (serviceId: string) => void;
  cargoDetails: string;
  setCargoDetails: React.Dispatch<React.SetStateAction<string>>;
  lockedStage: number | null;
  setLockedStage: (stage: number | null) => void;
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);
const STORE_EVENT = "addis-preferences-changed";

function subscribePreferences(callback: () => void) {
  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getLocaleSnapshot(): Locale {
  return detectBrowserLocale();
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  } catch {
    // Ignore storage restriction
  }
  return "dark";
}

function getThemeServerSnapshot(): ThemeMode {
  return "dark";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribePreferences,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );
  const theme = useSyncExternalStore(
    subscribePreferences,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const [selectedQuoteService, setSelectedQuoteService] = useState("sea");
  const [cargoDetails, setCargoDetails] = useState("");
  const [lockedStage, setLockedStage] = useState<number | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = getDirection(locale);
    html.classList.toggle("dark", theme === "dark");
    html.classList.toggle("light", theme === "light");
    document.title =
      locale === "ar"
        ? "أديس للخدمات اللوجستية وحلول سلاسل الإمداد | ADDIS Logistics"
        : "ADDIS Logistics & Supply Chain Solutions | Global Freight Since 2009";
  }, [locale, theme]);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      const url = new URL(window.location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", next);
        window.history.replaceState({}, "", url.toString());
      }
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event(STORE_EVENT));
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const setTheme = useCallback((next: ThemeMode) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event(STORE_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [{ ...toast, id }, ...prev].slice(0, 3));
      window.setTimeout(() => {
        dismissToast(id);
      }, 4500);
    },
    [dismissToast]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: getDirection(locale),
      theme,
      setLocale,
      toggleLocale,
      setTheme,
      toggleTheme,
      selectedQuoteService,
      setSelectedQuoteService,
      cargoDetails,
      setCargoDetails,
      lockedStage,
      setLockedStage,
      toasts,
      pushToast,
      dismissToast,
    }),
    [
      locale,
      theme,
      setLocale,
      toggleLocale,
      setTheme,
      toggleTheme,
      selectedQuoteService,
      cargoDetails,
      lockedStage,
      toasts,
      pushToast,
      dismissToast,
    ]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-24 end-4 z-[90] flex w-full max-w-sm flex-col gap-2 sm:end-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-start justify-between gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] shadow-2xl backdrop-blur-xl"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              {t.description ? (
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label={locale === "ar" ? "إغلاق الإشعار" : "Dismiss notification"}
              className="rounded-lg px-2 py-1 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-glass)] hover:text-[var(--text-primary)]"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
