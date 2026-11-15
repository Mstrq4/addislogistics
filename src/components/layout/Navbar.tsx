"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Globe,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, theme, toggleLocale, toggleTheme } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    {
      href: "#fleet-3d",
      label: locale === "ar" ? "الأسطول التفاعلي" : "3D Fleet",
    },
    {
      href: "#services",
      label: locale === "ar" ? "الخدمات" : "Services",
    },
    {
      href: "#branches",
      label: locale === "ar" ? "الفروع والشبكة" : "Hubs",
    },
    {
      href: "#markets",
      label: locale === "ar" ? "القطاعات" : "Markets",
    },
    {
      href: "#tools",
      label: locale === "ar" ? "الحاسبة والذكاء" : "Tools & AI",
    },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-[var(--border-subtle)] bg-[var(--surface-glass)] shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          aria-label={COMPANY_INFO.name[locale]}
        >
          <Image
            src="/logo.png"
            alt={COMPANY_INFO.shortName[locale]}
            width={156}
            height={48}
            priority
            className="h-10 w-auto object-contain sm:h-11"
          />
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}
          className="hidden items-center gap-6 lg:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus-ring)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={
              locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
            }
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-glass)] px-3 text-xs font-semibold text-[var(--text-primary)] backdrop-blur-md transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            <Globe className="h-4 w-4 text-[var(--accent)]" />
            <span>{locale === "ar" ? "EN" : "العربية"}</span>
          </button>

          {/* Theme Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              locale === "ar"
                ? theme === "dark"
                  ? "تفعيل الوضع النهاري"
                  : "تفعيل الوضع الليلي"
                : theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-glass)] text-[var(--text-primary)] backdrop-blur-md transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Landline Quick Link (Desktop) */}
          <a
            href={COMPANY_INFO.phoneHref}
            className="hidden h-10 items-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-glass)] px-3.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-md transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span dir="ltr" className="font-mono">
              {COMPANY_INFO.phone}
            </span>
          </a>

          {/* Primary Quote CTA */}
          <a
            href="#quote"
            className="hidden h-10 items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)] shadow-sm transition-all hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:inline-flex"
          >
            {locale === "ar" ? "اطلب عرض سعر" : "Request Quote"}
          </a>

          {/* Mobile Drawer Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={locale === "ar" ? "القائمة" : "Toggle menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-glass)] text-[var(--text-primary)] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen ? (
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-elevated)]/95 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex h-11 items-center rounded-xl px-3 text-base font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href={COMPANY_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--text-primary)]"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span dir="ltr">{COMPANY_INFO.whatsappDisplay}</span>
              </a>
              <a
                href="#quote"
                onClick={handleLinkClick}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
              >
                {locale === "ar" ? "طلب عرض سعر فوري" : "Get Instant Quote"}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

