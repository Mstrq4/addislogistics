"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Container,
  FileCheck2,
  Plane,
  Ship,
  Truck,
  Warehouse,
} from "lucide-react";
import { SERVICES_DATA, ServiceItem } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

const SERVICE_ICONS: Record<
  ServiceItem["iconName"],
  React.ComponentType<{ className?: string }>
> = {
  Plane,
  Ship,
  Truck,
  Container,
  Warehouse,
  FileCheck2,
};

export function ServicesSection() {
  const { locale, setSelectedQuoteService, setLockedStage } = useLocale();
  const [filter, setFilter] = useState<"all" | "freight" | "specialized">("all");

  const visibleServices = SERVICES_DATA.filter((svc) =>
    filter === "all" ? true : svc.category === filter
  );

  const handleSelectForQuote = (serviceId: string) => {
    setSelectedQuoteService(serviceId);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl text-start">
            <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
              {locale === "ar"
                ? "محفظة الخدمات اللوجستية المتكاملة"
                : "Comprehensive Logistics Portfolio"}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
              {locale === "ar"
                ? "6 حلول متكاملة للشحن وإدارة سلاسل الإمداد"
                : "Six Core Freight, Project & Customs Pillars"}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
              {locale === "ar"
                ? "شراكاتنا المتينة مع شركات الطيران وملاك السفن والخطوط الملاحية تضمن أسعاراً تنافسية وأولوية في المساحات الشحنية عبر أكثر من 150 دولة."
                : "Direct partnerships with global airlines, shipowners, and maritime carriers guarantee priority capacity and competitive tariffs across 150+ countries."}
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label={locale === "ar" ? "تصفية الخدمات" : "Filter services"}
            className="inline-flex w-fit rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-1"
          >
            {[
              { id: "all", ar: "جميع الخدمات (6)", en: "All Services (6)" },
              { id: "freight", ar: "الشحن الدولي", en: "Core Freight" },
              {
                id: "specialized",
                ar: "المشاريع والتخليص",
                en: "Projects & Clearance",
              },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() =>
                    setFilter(tab.id as "all" | "freight" | "specialized")
                  }
                  className={cn(
                    "h-9 rounded-lg px-3.5 text-xs font-semibold transition-all sm:text-sm",
                    active
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {locale === "ar" ? tab.ar : tab.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((svc, idx) => {
            const Icon = SERVICE_ICONS[svc.iconName];
            return (
              <motion.article
                key={svc.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 shadow-xl backdrop-blur-xl transition-all hover:border-[var(--border-strong)]"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setLockedStage(svc.stageIndex)}
                      title={
                        locale === "ar"
                          ? "عرض النموذج ثلاثي الأبعاد"
                          : "Focus 3D Model"
                      }
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                    >
                      <Icon className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLockedStage(svc.stageIndex)}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-elevated)]/85 px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {svc.sla[locale]}
                    </button>
                  </div>

                  <h3 className="text-start text-xl font-bold text-[var(--text-primary)]">
                    {svc.title[locale]}
                  </h3>
                  <p className="mt-1 text-start text-xs font-semibold text-[var(--accent)]">
                    {svc.subtitle[locale]}
                  </p>
                  <p className="mt-3 text-start text-sm leading-relaxed text-[var(--text-secondary)]">
                    {svc.description[locale]}
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-[var(--border-subtle)] pt-4">
                    {svc.highlights[locale].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-start text-sm text-[var(--text-secondary)]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectForQuote(svc.id)}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-4 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)]"
                >
                  <span>
                    {locale === "ar"
                      ? `طلب عرض سعر — ${svc.title.ar}`
                      : `Quote ${svc.title.en}`}
                  </span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

