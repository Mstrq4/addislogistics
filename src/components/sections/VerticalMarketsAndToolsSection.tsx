"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bot,
  Calculator,
  ChevronDown,
  Cog,
  Factory,
  Flame,
  HeartHandshake,
  PackageCheck,
  Search,
  Stethoscope,
} from "lucide-react";
import {
  FAQ_ITEMS,
  VERTICAL_MARKETS,
  VerticalMarket,
} from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

const MARKET_ICONS: Record<
  VerticalMarket["iconName"],
  React.ComponentType<{ className?: string }>
> = {
  HeartHandshake,
  Flame,
  Stethoscope,
  Factory,
  PackageCheck,
  Cog,
};

interface RagChunk {
  id: string;
  category: string;
  keywords: string[];
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
}

export function VerticalMarketsAndToolsSection() {
  const { locale, setCargoDetails, setSelectedQuoteService, pushToast } =
    useLocale();

  // Freight Calculator State
  const [lengthCm, setLengthCm] = useState("120");
  const [widthCm, setWidthCm] = useState("100");
  const [heightCm, setHeightCm] = useState("100");
  const [pieces, setPieces] = useState("4");
  const [grossWeightKg, setGrossWeightKg] = useState("850");

  // RAG Assistant State
  const [ragChunks, setRagChunks] = useState<RagChunk[]>([]);
  const [ragQuery, setRagQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  useEffect(() => {
    fetch("/rag-knowledge-base.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.chunks)) {
          setRagChunks(data.chunks as RagChunk[]);
        }
      })
      .catch(() => {
        // Fallback smoothly if fetch is interrupted
      });
  }, []);

  const calcResult = useMemo(() => {
    const l = Math.max(0, Number(lengthCm) || 0);
    const w = Math.max(0, Number(widthCm) || 0);
    const h = Math.max(0, Number(heightCm) || 0);
    const qty = Math.max(1, Number(pieces) || 1);
    const gross = Math.max(0, Number(grossWeightKg) || 0);

    const cbmPerPiece = (l * w * h) / 1_000_000;
    const totalCbm = cbmPerPiece * qty;
    const airVolumetricKg = totalCbm * 166.67;
    const airChargeableKg = Math.max(gross, airVolumetricKg);

    let containerAdvice =
      locale === "ar" ? "شحن جزئي LCL أو جوي" : "LCL Consolidation or Air Freight";
    if (totalCbm > 55) {
      containerAdvice =
        locale === "ar" ? "حاوية 40 قدم عالية (40' HC)" : "40' High-Cube Container (FCL)";
    } else if (totalCbm > 26) {
      containerAdvice =
        locale === "ar" ? "حاوية 40 قدم قياسية (40' FCL)" : "40' Standard Container (FCL)";
    } else if (totalCbm > 14) {
      containerAdvice =
        locale === "ar" ? "حاوية 20 قدم قياسية (20' FCL)" : "20' Standard Container (FCL)";
    }

    return {
      totalCbm: totalCbm.toFixed(2),
      airVolumetricKg: airVolumetricKg.toFixed(1),
      airChargeableKg: airChargeableKg.toFixed(1),
      containerAdvice,
      recommendedMode: totalCbm > 14 ? "sea" : "air",
    };
  }, [lengthCm, widthCm, heightCm, pieces, grossWeightKg, locale]);

  const ragMatches = useMemo(() => {
    const q = ragQuery.trim().toLowerCase();
    if (!q) return ragChunks.slice(0, 3);
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = ragChunks
      .map((chunk) => {
        const haystack = [
          chunk.title_en,
          chunk.title_ar,
          chunk.text_en,
          chunk.text_ar,
          ...chunk.keywords,
        ]
          .join(" ")
          .toLowerCase();
        const score = tokens.reduce(
          (acc, tok) => (haystack.includes(tok) ? acc + 1 : acc),
          0
        );
        return { chunk, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 3).map((s) => s.chunk);
  }, [ragChunks, ragQuery]);

  const handleApplyCalculationToQuote = () => {
    const summary =
      locale === "ar"
        ? `الكمية: ${pieces} طرود (${lengthCm}×${widthCm}×${heightCm} سم) | الحجم: ${calcResult.totalCbm} م³ | الوزن الفعلي: ${grossWeightKg} كجم | الوزن الخاضع للشحن الجوي: ${calcResult.airChargeableKg} كجم | التوصية: ${calcResult.containerAdvice}`
        : `Qty: ${pieces} pcs (${lengthCm}x${widthCm}x${heightCm} cm) | Volume: ${calcResult.totalCbm} CBM | Gross: ${grossWeightKg} kg | Air Chargeable: ${calcResult.airChargeableKg} kg | Recommended: ${calcResult.containerAdvice}`;

    setCargoDetails((prev) => (prev ? `${summary}\n${prev}` : summary));
    setSelectedQuoteService(calcResult.recommendedMode);
    pushToast({
      title:
        locale === "ar"
          ? "تم نقل بيانات الحاسبة لنموذج التسعير"
          : "Cargo metrics attached to Quote Form",
      description: calcResult.containerAdvice,
    });
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const quickQueries =
    locale === "ar"
      ? ["إسطنبول", "تخليص جمركي", "حاويات 40", "شحن المشاريع"]
      : ["Istanbul", "Customs Clearance", "FCL 40", "Project Cargo"];

  return (
    <>
      {/* Vertical Markets Section */}
      <section id="markets" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 text-start backdrop-blur-xl">
            <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
              {locale === "ar" ? "القطاعات الصناعية المخدومة" : "Vertical Markets"}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
              {locale === "ar"
                ? "حلول مخصصة للقطاعات الحيوية والمشاريع الكبرى"
                : "Tailored Supply Chains for High-Consequence Industries"}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICAL_MARKETS.map((market) => {
              const Icon = MARKET_ICONS[market.iconName];
              return (
                <div
                  key={market.id}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-lg backdrop-blur-xl transition-colors hover:border-[var(--border-strong)]"
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {market.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {market.description[locale]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Calculator + RAG Knowledge Explorer + FAQ */}
      <section
        id="tools"
        className="py-16 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* CBM & Chargeable Weight Calculator */}
            <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-xl backdrop-blur-xl lg:col-span-6 lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Calculator className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    {locale === "ar"
                      ? "حاسبة الحجم (CBM) والوزن الحجمي"
                      : "CBM & Air Chargeable Weight Calculator"}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {locale === "ar"
                      ? "احسب الحجم والمقاس المناسب للحاويات ثم أرسله لطلب التسعير"
                      : "Estimate shipment volume, air volumetric weight (1:167), and FCL fit"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  {
                    id: "calc-len",
                    label: locale === "ar" ? "الطول (سم)" : "Length (cm)",
                    val: lengthCm,
                    set: setLengthCm,
                  },
                  {
                    id: "calc-wid",
                    label: locale === "ar" ? "العرض (سم)" : "Width (cm)",
                    val: widthCm,
                    set: setWidthCm,
                  },
                  {
                    id: "calc-hei",
                    label: locale === "ar" ? "الارتفاع (سم)" : "Height (cm)",
                    val: heightCm,
                    set: setHeightCm,
                  },
                  {
                    id: "calc-qty",
                    label: locale === "ar" ? "عدد الطرود" : "Pieces",
                    val: pieces,
                    set: setPieces,
                  },
                  {
                    id: "calc-wt",
                    label: locale === "ar" ? "الوزن الفعلي (كجم)" : "Gross Weight (kg)",
                    val: grossWeightKg,
                    set: setGrossWeightKg,
                  },
                ].map((field) => (
                  <label key={field.id} className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {field.label}
                    </span>
                    <input
                      id={field.id}
                      type="number"
                      min="0"
                      value={field.val}
                      onChange={(e) => field.set(e.target.value)}
                      className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface)] px-3 font-mono text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 sm:grid-cols-3">
                <div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {locale === "ar" ? "إجمالي الحجم" : "Total Volume"}
                  </span>
                  <div dir="ltr" className="mt-1 font-mono text-lg font-bold text-[var(--accent)]">
                    {calcResult.totalCbm} m³
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {locale === "ar" ? "الوزن الخاضع (جوي)" : "Air Chargeable"}
                  </span>
                  <div dir="ltr" className="mt-1 font-mono text-lg font-bold text-[var(--text-primary)]">
                    {calcResult.airChargeableKg} kg
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {locale === "ar" ? "التوصية المقترحة" : "Equipment Fit"}
                  </span>
                  <div className="mt-1 text-xs font-bold text-[var(--text-primary)]">
                    {calcResult.containerAdvice}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyCalculationToQuote}
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-strong)]"
              >
                <span>
                  {locale === "ar"
                    ? "إرفاق النتائج بطلب عرض السعر"
                    : "Attach Metrics to Quote Request"}
                </span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>

            {/* RAG Instant Knowledge Assistant */}
            <div className="flex flex-col justify-between rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-xl backdrop-blur-xl lg:col-span-6 lg:p-8">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {locale === "ar"
                        ? "مستكشف المعرفة الفوري (RAG)"
                        : "ADDIS Instant Knowledge Retrieval (RAG)"}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      {locale === "ar"
                        ? "ابحث مباشرة في قاعدة معرفة أديس للفروع والجمارك والحاويات"
                        : "Query structured bilingual operational knowledge (/rag-knowledge-base.json)"}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="pointer-events-none absolute top-3.5 start-3.5 h-4 w-4 text-[var(--text-muted)]" />
                  <input
                    type="search"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    placeholder={
                      locale === "ar"
                        ? "ابحث عن: إسطنبول، عدن، DGR، ISO Tank، التخليص..."
                        : "Ask about: Istanbul hub, Aden port, DGR air, ISO tank, customs..."
                    }
                    className="h-11 w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface)] pe-4 ps-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {quickQueries.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setRagQuery(q)}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  {ragMatches.length > 0 ? (
                    ragMatches.map((chunk) => (
                      <div
                        key={chunk.id}
                        className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4"
                      >
                        <p className="text-xs font-bold text-[var(--accent)]">
                          {locale === "ar" ? chunk.title_ar : chunk.title_en}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {locale === "ar" ? chunk.text_ar : chunk.text_en}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)]">
                      {locale === "ar"
                        ? "لا توجد نتائج مطابقة. جرب كلمات مثل: صنعاء، عدن، الحديدة، إسطنبول، شحن بحري، تخليص."
                        : "No matching knowledge chunk found. Try: Sana'a, Aden, Istanbul, FCL, Air, Customs."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-14">
            <h3 className="mb-6 inline-block rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] px-5 py-2.5 text-start text-2xl font-bold text-[var(--text-primary)] backdrop-blur-xl">
              {locale === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-glass)] backdrop-blur-xl"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between gap-3 p-5 text-start text-sm font-bold text-[var(--text-primary)] sm:text-base"
                    >
                      <span>{faq.question[locale]}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-[var(--accent)] transition-transform",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>
                    {isOpen ? (
                      <div className="border-t border-[var(--border-subtle)] px-5 pb-5 pt-3 text-start text-sm leading-relaxed text-[var(--text-secondary)]">
                        {faq.answer[locale]}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

