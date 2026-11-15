export type Locale = "ar" | "en";
export type Direction = "rtl" | "ltr";

export const LOCALE_STORAGE_KEY = "addis_locale";
export const THEME_STORAGE_KEY = "addis_theme";

export function isRtlLocale(locale: Locale): boolean {
  return locale === "ar";
}

export function getDirection(locale: Locale): Direction {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang")?.toLowerCase();
    if (urlLang === "ar" || urlLang === "en") {
      return urlLang;
    }

    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "ar" || stored === "en") {
      return stored;
    }

    const candidates =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];

    for (const lang of candidates) {
      if (lang && lang.toLowerCase().startsWith("ar")) {
        return "ar";
      }
      if (lang && lang.toLowerCase().startsWith("en")) {
        return "en";
      }
    }
  } catch {
    // Ignore storage/navigator access errors in restricted environments
  }

  return "en";
}

