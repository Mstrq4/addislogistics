"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export function QuoteAndContactSection() {
  const {
    locale,
    selectedQuoteService,
    setSelectedQuoteService,
    cargoDetails,
    setCargoDetails,
    pushToast,
  } = useLocale();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("Istanbul, Turkey");
  const [destination, setDestination] = useState("Aden, Yemen");
  const [mode, setMode] = useState("FCL 40' / HC");
  const [copied, setCopied] = useState(false);

  const selectedServiceObj =
    SERVICES_DATA.find((s) => s.id === selectedQuoteService) ?? SERVICES_DATA[1];

  const buildFormattedMessage = () => {
    const serviceLabel = selectedServiceObj.title[locale];
    if (locale === "ar") {
      return [
        "طلب عرض سعر — أديس للخدمات اللوجستية (ADDIS Logistics)",
        `الخدمة المطلوبة: ${serviceLabel}`,
        `نوع الشحن / الحاوية: ${mode}`,
        `بلد/ميناء الانطلاق: ${origin || "غير محدد"}`,
        `الوجهة النهائية: ${destination || "غير محدد"}`,
        `الاسم: ${fullName || "غير محدد"}`,
        `الشركة: ${company || "—"}`,
        `البريد الإلكتروني: ${email || "—"}`,
        `رقم الهاتف / واتساب: ${phone || "—"}`,
        `تفاصيل البضاعة والوزن: ${cargoDetails || "يرجى التواصل للتفاصيل"}`,
      ].join("\n");
    }
    return [
      "Freight Quote Request — ADDIS Logistics & Supply Chain Solutions",
      `Service: ${serviceLabel}`,
      `Mode / Equipment: ${mode}`,
      `Origin: ${origin || "Unspecified"}`,
      `Destination: ${destination || "Unspecified"}`,
      `Contact Name: ${fullName || "Unspecified"}`,
      `Company: ${company || "-"}`,
      `Email: ${email || "-"}`,
      `Phone / WhatsApp: ${phone || "-"}`,
      `Cargo Details & Dimensions: ${cargoDetails || "Please advise"}`,
    ].join("\n");
  };

  const handleSendWhatsApp = () => {
    const msg = buildFormattedMessage();
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      msg
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    pushToast({
      title:
        locale === "ar"
          ? "تم تجهيز طلب العرض عبر واتساب"
          : "WhatsApp Quote Draft Ready",
      description:
        locale === "ar"
          ? `جاري فتح المحادثة المباشرة مع ${COMPANY_INFO.whatsappDisplay}`
          : `Opening direct chat with ${COMPANY_INFO.whatsappDisplay}`,
    });
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = buildFormattedMessage();
    const subject =
      locale === "ar"
        ? `طلب عرض سعر: ${selectedServiceObj.title.ar} (${origin} -> ${destination})`
        : `Quote Request: ${selectedServiceObj.title.en} (${origin} -> ${destination})`;

    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      // Clipboard optional
    }

    const mailtoUrl = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    pushToast({
      title:
        locale === "ar"
          ? "تم فتح البريد ونسخ تفاصيل الطلب"
          : "Email Client Opened & Quote Copied",
      description: COMPANY_INFO.email,
    });
  };

  const routePresets = [
    {
      ar: "إسطنبول ← عدن",
      en: "Istanbul -> Aden",
      from: "Istanbul, Turkey",
      to: "Aden, Yemen",
    },
    {
      ar: "الصين ← الحديدة",
      en: "China -> Hodeidah",
      from: "Shanghai / Ningbo, China",
      to: "Hodeidah, Yemen",
    },
    {
      ar: "دبي ← صنعاء (جوي)",
      en: "Dubai -> Sana'a (Air)",
      from: "Dubai (DXB), UAE",
      to: "Sana'a (SAH), Yemen",
    },
  ];

  return (
    <section id="quote" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-glass)] p-6 text-start backdrop-blur-xl">
          <span className="text-xs font-bold uppercase text-[var(--accent)] rtl:tracking-normal">
            {locale === "ar"
              ? "عروض الأسعار والتواصل المباشر"
              : "Direct RFQ & 24/7 Client Desk"}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)] sm:text-4xl">
            {locale === "ar"
              ? "اطلب عرض سعر فوري عبر البريد أو واتساب"
              : "Request a Freight Quote via Email or Direct WhatsApp"}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
            {locale === "ar"
              ? "اختر نوع الخدمة والمسار وسيتم تجهيز رسالتك لإرسالها مباشرة إلى البريد الرسمي أو رقم الواتساب المباشر لعمليات أديس."
              : "Configure your cargo lane and send your RFQ directly to info@addislogistics-ye.com or our 24/7 WhatsApp desk (+967 772900086)."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive RFQ Form */}
          <form
            onSubmit={handleSendEmail}
            className="flex flex-col gap-5 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 text-start shadow-2xl backdrop-blur-xl lg:col-span-7 lg:p-8"
          >
            {/* Service Pills */}
            <div>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">
                {locale === "ar" ? "الخدمة المطلوبة" : "Select Service"}
              </span>
              <div className="flex flex-wrap gap-2">
                {SERVICES_DATA.map((svc) => {
                  const active = selectedQuoteService === svc.id;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setSelectedQuoteService(svc.id)}
                      className={cn(
                        "h-10 rounded-xl border px-3.5 text-xs font-semibold transition-all",
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]"
                          : "border-[var(--border-default)] bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
                      )}
                    >
                      {svc.title[locale]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Lane Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {locale === "ar" ? "مسارات سريعة:" : "Popular Lanes:"}
              </span>
              {routePresets.map((p) => (
                <button
                  key={p.en}
                  type="button"
                  onClick={() => {
                    setOrigin(p.from);
                    setDestination(p.to);
                  }}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                >
                  {locale === "ar" ? p.ar : p.en}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "الاسم الكامل *" : "Full Name *"}
                </span>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={locale === "ar" ? "الاسم الكامل" : "Your name"}
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "الشركة / المنظمة" : "Company / Organization"}
                </span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={locale === "ar" ? "اسم الشركة (اختياري)" : "Company name"}
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "البريد الإلكتروني *" : "Email Address *"}
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                </span>
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+967 7XX XXX XXX"
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-start text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "بلد / ميناء الانطلاق" : "Origin City / Port"}
                </span>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[var(--text-secondary)]">
                  {locale === "ar" ? "الوجهة النهائية" : "Destination City / Port"}
                </span>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {locale === "ar" ? "نوع الحاوية / نمط الشحن" : "Container / Freight Mode"}
              </span>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="h-11 rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] px-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              >
                <option value="FCL 20'">FCL 20&apos; Standard</option>
                <option value="FCL 40' / HC">FCL 40&apos; / High-Cube</option>
                <option value="LCL Consolidation">LCL Consolidation</option>
                <option value="ISO Tank / Flexitank">ISO Tank / Flexitank</option>
                <option value="Air Freight Door-to-Door">Air Freight Door-to-Door</option>
                <option value="Air / Vessel Charter">Air / Vessel Charter</option>
                <option value="FTL / LTL Road Freight">FTL / LTL Road Freight</option>
                <option value="Out of Gauge / Breakbulk">Out of Gauge / Breakbulk</option>
                <option value="Customs & Warehousing">Customs Clearance &amp; Warehousing</option>
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {locale === "ar"
                  ? "وصف البضاعة والوزن والأبعاد"
                  : "Cargo Description, Weight & Dimensions"}
              </span>
              <textarea
                rows={4}
                value={cargoDetails}
                onChange={(e) => setCargoDetails(e.target.value)}
                placeholder={
                  locale === "ar"
                    ? "اذكر نوع البضاعة، الوزن التقريبي، الحجم أو رمز HS..."
                    : "Describe commodity, gross weight, CBM, HS code or special handling (DGR/Reefer)..."
                }
                className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-elevated)] p-3.5 text-sm text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]"
              />
            </label>

            {/* Dual Action Submit Buttons */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 text-sm font-bold text-[#052e16] shadow-md transition-opacity hover:opacity-95"
              >
                <MessageCircle className="h-4 w-4" />
                <span>
                  {locale === "ar" ? "إرسال عبر واتساب مباشر" : "Send via WhatsApp"}
                </span>
              </button>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 text-sm font-bold text-[var(--accent-contrast)] shadow-md transition-colors hover:bg-[var(--accent-strong)]"
              >
                <Send className="h-4 w-4 rtl:rotate-180" />
                <span>
                  {locale === "ar" ? "إرسال عبر البريد الإلكتروني" : "Send via Email"}
                </span>
              </button>
            </div>

            {copied ? (
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--success)]">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {locale === "ar"
                    ? "تم نسخ نص طلب العرض تلقائياً إلى الحافظة."
                    : "Quote summary copied to clipboard."}
                </span>
              </div>
            ) : null}
          </form>

          {/* Direct Contact Channels Column */}
          <div className="flex flex-col gap-5 text-start lg:col-span-5">
            <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {locale === "ar" ? "قنوات التواصل الفوري" : "Direct Dispatch Channels"}
              </h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {locale === "ar"
                  ? "تواصل مباشر مع فريق العمليات في صنعاء وعدن والحديدة وإسطنبول على مدار الساعة."
                  : "Reach our 24/7 logistics desk directly across Yemen & Istanbul."}
              </p>

              <div className="mt-5 space-y-3">
                {/* WhatsApp */}
                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-colors hover:border-[#25D366]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                      <MessageCircle className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-medium text-[var(--text-muted)]">
                        {locale === "ar" ? "واتساب مباشر (عروض الأسعار)" : "Direct WhatsApp Quotes"}
                      </div>
                      <div dir="ltr" className="font-mono text-base font-bold text-[var(--text-primary)]">
                        {COMPANY_INFO.whatsappDisplay}
                      </div>
                    </div>
                  </div>
                </a>

                {/* Official Email */}
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4">
                  <a
                    href={COMPANY_INFO.emailHref}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[var(--text-muted)]">
                        {locale === "ar" ? "البريد الإلكتروني الرسمي" : "Official RFQ Email"}
                      </div>
                      <div
                        dir="ltr"
                        className="truncate font-mono text-sm font-bold text-[var(--text-primary)] sm:text-base"
                      >
                        {COMPANY_INFO.email}
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    aria-label={locale === "ar" ? "نسخ البريد الإلكتروني" : "Copy email address"}
                    onClick={() => {
                      navigator.clipboard?.writeText(COMPANY_INFO.email);
                      pushToast({
                        title: locale === "ar" ? "تم نسخ البريد الإلكتروني" : "Email Copied",
                        description: COMPANY_INFO.email,
                      });
                    }}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>

                {/* Landline */}
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--border-strong)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium text-[var(--text-muted)]">
                      {locale === "ar" ? "هاتف المكتب الرئيسي" : "Headquarters Telephone"}
                    </div>
                    <div dir="ltr" className="font-mono text-base font-bold text-[var(--text-primary)]">
                      {COMPANY_INFO.phone}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-glass)] p-6 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <MapPin className="h-4 w-4 text-[var(--accent)]" />
                <span>
                  {locale === "ar"
                    ? "نطاق التشغيل والتواجد الميداني"
                    : "Active Operations Coverage"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {locale === "ar"
                  ? "صنعاء (المقر الرئيسي) • عدن (الميناء والمطار والمنطقة الحرة) • الحديدة (ميناء البحر الأحمر) • إسطنبول (مركز التجميع الدولي لـ +150 دولة)."
                  : "Sana'a (HQ) • Aden (Container Port & Airport) • Hodeidah (Red Sea Port) • Istanbul (Euro-Asian Hub serving 150+ countries)."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

