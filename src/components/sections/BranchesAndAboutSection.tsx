"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Anchor,
  Building2,
  Check,
  Compass,
  Globe2,
  MapPin,
  Plane,
  ShieldCheck,
  Ship,
  Truck,
} from "lucide-react";
import { BRANCH_HUBS, COMPANY_INFO } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export function BranchesAndAboutSection() {
  const { locale, setLockedStage } = useLocale();
  const [selectedHubId, setSelectedHubId] = useState<string>(
    BRANCH_HUBS[0]?.id ?? "sanaa"
  );

  const selectedHub =
    BRANCH_HUBS.find((h) => h.id === selectedHubId) ?? BRANCH_HUBS[0];

  const fleetModes = [
    {
      stageIndex: 1,
      icon: Plane,
      ar: "الربط الجوي — صنعاء / إسطنبول",
      en: "Air Freight — Sana'a / Istanbul",
    },
    {
      stageIndex: 2,
      icon: Ship,
      ar: "الخطوط الملاحية — عدن / الحديدة",
      en: "Ocean Lanes — Aden / Hodeidah",
    },
    {
      stageIndex: 3,
      icon: Anchor,
      ar: "محطات الحاويات والرافعات",
      en: "Container Port & Cranes",
    },
    {
      stageIndex: 4,
      icon: Truck,
      ar: "أسطول النقل البري الإقليمي",
      en: "Overland Road Fleet",
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* About + 3D Interactive Hub Telemetry Block (Zero 2D legacy photos) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 shadow-2xl backdrop-blur-xl">
              {/* Top Telemetry Header */}
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                  <Compass className="h-4 w-4" />
                  <span>
                    {locale === "ar"
                      ? "مراقبة شبكة الفروع الثلاثية الأبعاد"
                      : "3D Corridor Branch Telemetry"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--accent)]">
                  2009 — {COMPANY_INFO.countriesCount}
                </span>
              </div>

              {/* Interactive Branch Switcher Pills */}
              <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BRANCH_HUBS.map((hub) => {
                  const isActive = hub.id === selectedHub.id;
                  return (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => {
                        setSelectedHubId(hub.id);
                        setLockedStage(
                          hub.id === "istanbul" ? 1 : hub.id === "sanaa" ? 4 : 2
                        );
                      }}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-start transition-all",
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm"
                          : "border-[var(--border-subtle)] bg-[var(--surface-elevated)]/85 text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                      )}
                    >
                      <div className="font-mono text-xs font-extrabold">
                        {hub.code}
                      </div>
                      <div className="truncate text-[11px] opacity-90">
                        {hub.city[locale]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Hub Detailed Telemetry Card */}
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/80 p-4 text-start">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {selectedHub.city[locale]} — {selectedHub.country[locale]}
                  </h3>
                  <span
                    dir="ltr"
                    className="font-mono text-[11px] font-semibold text-[var(--accent)]"
                  >
                    {selectedHub.coordinates}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {selectedHub.description[locale]}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {fleetModes.map((fm) => {
                    const Icon = fm.icon;
                    return (
                      <button
                        key={fm.stageIndex}
                        type="button"
                        onClick={() => setLockedStage(fm.stageIndex)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)]/80 px-2.5 py-2 text-start text-[11px] font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                        <span className="truncate">
                          {locale === "ar" ? fm.ar : fm.en}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Highlights Strip */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/85 p-3">
                  <div className="font-mono text-lg font-extrabold text-[var(--accent)]">
                    2009
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">
                    {locale === "ar" ? "سنة التأسيس" : "Founded"}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/85 p-3">
                  <div
                    dir="ltr"
                    className="font-mono text-lg font-extrabold text-[var(--accent)]"
                  >
                    1,000+
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">
                    {locale === "ar" ? "مشروع منجز" : "Deliveries"}
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)]/85 p-3">
                  <div
                    dir="ltr"
                    className="font-mono text-lg font-extrabold text-[var(--accent)]"
                  >
                    150+
                  </div>
                  <div className="text-[11px] font-medium text-[var(--text-muted)]">
                    {locale === "ar" ? "دولة متصلة" : "Countries"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="flex flex-col gap-5 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-xl backdrop-blur-xl sm:p-8 lg:col-span-7"
          >
            <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
              {locale === "ar"
                ? "عن أديس للخدمات اللوجستية"
                : "About ADDIS Logistics"}
            </span>
            <h2 className="text-2xl font-bold leading-snug text-[var(--text-primary)] sm:text-4xl">
              {locale === "ar"
                ? "إدارة شاملة ومبتكرة لسلاسل الإمداد منذ عام 2009"
                : "Global Experience. Regional Precision. Proven Since 2009."}
            </h2>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {locale === "ar"
                ? "أديس للخدمات اللوجستية وحلول سلاسل الإمداد (ADDIS) هي شركة دولية رائدة في مجال الشحن الجوي والبحري والبري وتأمين البضائع والتخليص الجمركي. نفخر بشبكتنا اللوجستية التي تربط أكثر من 150 دولة عبر العالم، مدعومة بفريق عمل محترف ومتخصص وشبكة وكلاء وناقلين من النخبة العالمية."
                : "ADDIS Logistics & Supply Chain Solutions is a premier international freight forwarder offering comprehensive air, sea, and inland transportation, cargo insurance, and customs clearance across 150+ countries. Our specialists engineer seamless logistics tailored to the exact operational schedule and compliance requirements of every shipment."}
            </p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {locale === "ar"
                ? "سواء كانت شحنتك من اليمن أو تركيا أو الصين أو أوروبا إلى أي وجهة أخرى، نوفر أسعاراً تنافسية في شحن الحاويات والبضائع الخاصة ونعمل على تحسين كفاءة التكلفة والالتزام الصارم بمواعيد التسليم."
                : "Backed by direct contracts with global airlines and container lines, we safeguard fragile, oversized, diplomatic, humanitarian, and industrial cargo from point of origin to final inland delivery."}
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  ar: "التزام صارم بالجودة والامتثال الجمركي",
                  en: "Strict quality assurance & HS customs compliance",
                },
                {
                  icon: Globe2,
                  ar: "ربط مباشر مع أكثر من 150 دولة وميناء",
                  en: "Direct import & export lanes across 150+ countries",
                },
              ].map((pill) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pill.en}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/85 p-4"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {locale === "ar" ? pill.ar : pill.en}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* 4 Strategic Hubs Grid */}
        <div id="branches" className="mt-16 lg:mt-20">
          <div className="mb-8 flex flex-col gap-2 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 text-start backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
                {locale === "ar" ? "شبكة الفروع الأربعة" : "4 Strategic Hubs"}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                {locale === "ar"
                  ? "مراكز عملياتنا في صنعاء وعدن والحديدة وإسطنبول"
                  : "Operational Hubs: Sana'a, Aden, Hodeidah & Istanbul"}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {BRANCH_HUBS.map((hub, idx) => (
              <motion.div
                key={hub.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-lg backdrop-blur-xl transition-all hover:border-[var(--border-strong)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--accent)]">
                      <Building2 className="h-3.5 w-3.5" />
                      {hub.code}
                    </span>
                    <span
                      dir="ltr"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--text-muted)]"
                    >
                      <MapPin className="h-3 w-3 text-[var(--accent)]" />
                      {hub.coordinates}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-[var(--text-primary)]">
                    {hub.city[locale]}
                  </h4>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--accent)]">
                    {hub.country[locale]}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {hub.description[locale]}
                  </p>
                </div>

                <ul className="mt-5 space-y-2 border-t border-[var(--border-subtle)] pt-4">
                  {hub.capabilities[locale].map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)]"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
