"use client";

import React from "react";
import { ArrowUp, Mail, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";

export function FloatingContactDock() {
  const { locale } = useLocale();

  return (
    <div className="fixed bottom-5 end-4 z-40 flex items-center gap-2 sm:end-6">
      <a
        href={COMPANY_INFO.emailHref}
        aria-label={locale === "ar" ? "إرسال بريد إلكتروني" : "Email ADDIS Logistics"}
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] text-[var(--accent)] shadow-lg backdrop-blur-xl transition-transform hover:-translate-y-0.5"
      >
        <Mail className="h-5 w-5" />
      </a>

      <a
        href={COMPANY_INFO.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "ar" ? "واتساب مباشر" : "WhatsApp ADDIS Logistics"}
        className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#25D366] px-4 text-sm font-bold text-[#052e16] shadow-xl transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">
          {locale === "ar" ? "واتساب" : "WhatsApp"}
        </span>
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={locale === "ar" ? "العودة للأعلى" : "Back to top"}
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] text-[var(--text-primary)] shadow-lg backdrop-blur-xl transition-transform hover:-translate-y-0.5"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}

