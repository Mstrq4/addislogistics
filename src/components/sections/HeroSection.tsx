"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Anchor,
  ArrowDown,
  ArrowRight,
  Clock,
  Globe2,
  MapPin,
  MessageCircle,
  Plane,
  RotateCcw,
  Ship,
  Truck,
} from "lucide-react";
import { COMPANY_INFO, FLEET_STAGES } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

const STAGE_ICONS = [Globe2, Plane, Ship, Anchor, Truck];

export function HeroAndFleetSection() {
  const { locale, lockedStage, setLockedStage } = useLocale();

  const metrics = [
    {
      value: "2009",
      label: locale === "ar" ? "سنة التأسيس" : "Established",
    },
    {
      value: COMPANY_INFO.countriesCount,
      label: locale === "ar" ? "دولة حول العالم" : "Countries Served",
    },
    {
      value: COMPANY_INFO.hubsCount,
      label: locale === "ar" ? "فروع استراتيجية" : "Strategic Hubs",
    },
    {
      value: COMPANY_INFO.supportHours,
      label: locale === "ar" ? "عمليات ودعم متواصل" : "Operations Desk",
    },
  ];

  const activeStage = lockedStage ?? 0;

  return (
    <>
      {/* Open Spatial 3D Hero Section — Real GLB Fleet Moves Directly Behind & Beside Copy */}
      <section
        id="top"
        className="relative flex min-h-[92vh] flex-col justify-between pt-28 pb-10 sm:pt-32 lg:pb-16"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Inline-Start Glassmorphic Command Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-start gap-5 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-semibold text-[var(--accent)]">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {locale === "ar"
                    ? "تأسست 2009 • صنعاء، عدن، الحديدة، إسطنبول"
                    : "Est. 2009 • Sana'a, Aden, Hodeidah & Istanbul"}
                </span>
              </div>

              <h1 className="text-start text-3xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-5xl">
                {locale === "ar"
                  ? "حلول لوجستية وسلاسل إمداد عالمية متكاملة"
                  : "Global Logistics & Supply Chain Solutions"}
              </h1>

              <p className="text-start text-base leading-relaxed text-[var(--text-secondary)]">
                {locale === "ar"
                  ? "تقود شركة أديس للخدمات اللوجستية عمليات الشحن الجوي والبحري والبري وشحن المشاريع والتخزين والتخليص الجمركي في أكثر من 150 دولة منذ عام 2009، عبر أسطول متعدد الوسائط يتحرك بانسيابية كاملة."
                  : "Since 2009, ADDIS Logistics orchestrates air, sea, road, project cargo, warehousing, and customs clearance across 150+ countries from strategic hubs in Sana'a, Aden, Hodeidah, and Istanbul."}
              </p>

              {/* Primary Action Cluster */}
              <div className="flex w-full flex-wrap items-center gap-3 pt-1">
                <a
                  href="#quote"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 text-sm font-bold text-[var(--accent-contrast)] shadow-lg shadow-[var(--accent)]/25 transition-all hover:bg-[var(--accent-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] sm:flex-initial"
                >
                  <span>
                    {locale === "ar"
                      ? "اطلب عرض سعر الآن"
                      : "Request a Freight Quote"}
                  </span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>

                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)]/90 px-5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[#25D366] hover:text-[#25D366] sm:flex-initial"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>
                    {locale === "ar" ? "واتساب مباشر" : "WhatsApp Desk"}
                  </span>
                </a>
              </div>

              {/* Compact Verified Metrics Row */}
              <div className="grid w-full grid-cols-2 gap-3 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label} className="text-start">
                    <div
                      dir="ltr"
                      className="font-mono text-2xl font-extrabold text-[var(--accent)]"
                    >
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Inline-End Open 3D Stage Viewport & Quick Vehicle Camera Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex min-h-[260px] flex-col items-end justify-end gap-3 lg:col-span-6 lg:min-h-[420px]"
            >
              {/* Floating Interactive 3D Vehicle Focus Control (no opaque box covering the ships/aircraft!) */}
              <div className="w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-3.5 shadow-xl backdrop-blur-xl">
                <div className="mb-2.5 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
                    <span>
                      {locale === "ar"
                        ? "تحكم مباشر بنماذج الأسطول الثلاثية الأبعاد"
                        : "Live 3D GLB Fleet Camera Control"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--accent)]">
                    <MapPin className="h-3 w-3" />
                    <span>SAH • ADE • HOD • IST</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {FLEET_STAGES.map((stage, idx) => {
                    const Icon = STAGE_ICONS[idx] ?? Globe2;
                    const isSelected = activeStage === idx;
                    const label =
                      idx === 0
                        ? locale === "ar"
                          ? "الممر الكامل"
                          : "Full Corridor"
                        : idx === 1
                        ? locale === "ar"
                          ? "طائرة الشحن"
                          : "Aircraft 3D"
                        : idx === 2
                        ? locale === "ar"
                          ? "سفينة الحاويات"
                          : "Vessel 3D"
                        : idx === 3
                        ? locale === "ar"
                          ? "رافعات الميناء"
                          : "Cranes 3D"
                        : locale === "ar"
                        ? "أسطول الشاحنات"
                        : "Trucks 3D";
                    return (
                      <button
                        key={stage.key}
                        type="button"
                        onClick={() =>
                          setLockedStage(lockedStage === idx ? null : idx)
                        }
                        className={cn(
                          "inline-flex h-8 items-center gap-1.5 rounded-xl border px-2.5 text-xs font-semibold transition-all",
                          isSelected
                            ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm"
                            : "border-[var(--border-subtle)] bg-[var(--surface-elevated)]/85 text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{label}</span>
                      </button>
                    );
                  })}

                  {lockedStage !== null ? (
                    <button
                      type="button"
                      onClick={() => setLockedStage(null)}
                      className="inline-flex h-8 items-center gap-1 rounded-xl border border-[var(--border-strong)] bg-[var(--accent-soft)] px-2.5 text-xs font-semibold text-[var(--accent)]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>
                        {locale === "ar" ? "تتبع التمرير" : "Sync Scroll"}
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Choreography Prompt */}
        <div className="mx-auto mt-6 flex max-w-7xl justify-center px-4">
          <a
            href="#fleet-3d"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-glass)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] shadow-md backdrop-blur-xl transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>
              {locale === "ar"
                ? "مرّر لتتبع حركة الطائرة والسفينة والرافعات والشاحنات عبر الموقع"
                : "Scroll to follow Air, Ocean, Crane & Road 3D Models across the Site"}
            </span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-[var(--accent)]" />
          </a>
        </div>
      </section>

      {/* Scroll-Synchronized 3D Fleet Choreography Strip */}
      <section id="fleet-3d" className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 text-start backdrop-blur-xl md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
                {locale === "ar"
                  ? "تناغم حركة الأسطول مع التمرير"
                  : "Scroll-Synchronized 3D Choreography"}
              </span>
              <h2 className="mt-1.5 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                {locale === "ar"
                  ? "من المدار الجوي إلى سفن الحاويات والرافعات والأسطول البري"
                  : "Follow Every Multimodal Tier Live Across the Viewport"}
              </h2>
            </div>
            {lockedStage !== null ? (
              <button
                type="button"
                onClick={() => setLockedStage(null)}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--accent-soft)] px-4 text-xs font-bold text-[var(--accent)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>
                  {locale === "ar"
                    ? "إعادة المزامنة التلقائية مع التمرير"
                    : "Resume Automatic Scroll Tracking"}
                </span>
              </button>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {FLEET_STAGES.map((stage, idx) => {
              const Icon = STAGE_ICONS[idx] ?? Globe2;
              const isCurrent = lockedStage === idx;
              return (
                <button
                  key={stage.key}
                  type="button"
                  onClick={() =>
                    setLockedStage(lockedStage === idx ? null : idx)
                  }
                  className={cn(
                    "group flex flex-col justify-between gap-4 rounded-2xl border p-5 text-start backdrop-blur-xl transition-all",
                    isCurrent
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-xl"
                      : "border-[var(--border-default)] bg-[var(--surface-glass)] hover:border-[var(--border-strong)]"
                  )}
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                          isCurrent
                            ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                            : "bg-[var(--accent-soft)] text-[var(--accent)]"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {stage.title[locale]}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {stage.summary[locale]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-[var(--border-subtle)] pt-3">
                    {stage.metrics.map((metric) => (
                      <div key={metric.value}>
                        <div className="font-mono text-xs font-bold text-[var(--accent)]">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          {metric.label[locale]}
                        </div>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
