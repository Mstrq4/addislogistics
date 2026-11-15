"use client";

import React from "react";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { COMPANY_INFO, SERVICES_DATA } from "@/data/logistics-content";
import { useLocale } from "@/context/LocaleContext";

export function Footer() {
  const { locale } = useLocale();

  return (
    <footer className="border-t border-[var(--border-default)] bg-[#040b17] py-14 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-4 text-start">
            <Image
              src="/logo.png"
              alt={COMPANY_INFO.shortName[locale]}
              width={160}
              height={50}
              className="h-11 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-400">
              {locale === "ar"
                ? "تأسست عام 2009 — حلول متكاملة للشحن الجوي والبحري والبري وشحن المشاريع والتخزين والتخليص الجمركي في أكثر من 150 دولة."
                : "Established 2009 — Global air, sea, road, project cargo, warehousing, and customs clearance across 150+ countries."}
            </p>
          </div>

          {/* Services */}
          <div className="text-start">
            <h4 className="mb-4 text-sm font-bold uppercase text-white rtl:tracking-normal">
              {locale === "ar" ? "الخدمات الأساسية" : "Core Services"}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {SERVICES_DATA.map((svc) => (
                <li key={svc.id}>
                  <a href="#services" className="transition-colors hover:text-[#00a8f0]">
                    {svc.title[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Hubs */}
          <div className="text-start">
            <h4 className="mb-4 text-sm font-bold uppercase text-white rtl:tracking-normal">
              {locale === "ar" ? "الفروع الاستراتيجية" : "Strategic Hubs"}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>{locale === "ar" ? "صنعاء، اليمن (المقر الرئيسي)" : "Sana'a, Yemen (HQ)"}</li>
              <li>{locale === "ar" ? "عدن، اليمن (الميناء والمطار)" : "Aden, Yemen (Port & Airport)"}</li>
              <li>{locale === "ar" ? "الحديدة، اليمن (ميناء البحر الأحمر)" : "Hodeidah, Yemen (Red Sea Port)"}</li>
              <li>{locale === "ar" ? "إسطنبول، تركيا (المركز الدولي)" : "Istanbul, Turkey (Intl Hub)"}</li>
            </ul>
          </div>

          {/* Direct Contact & Machine Discovery */}
          <div className="text-start">
            <h4 className="mb-4 text-sm font-bold uppercase text-white rtl:tracking-normal">
              {locale === "ar" ? "التواصل والبيانات المهيكلة" : "Contact & AI Endpoints"}
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#00a8f0]"
                >
                  <Phone className="h-4 w-4 text-[#00a8f0]" />
                  <span dir="ltr" className="font-mono">
                    {COMPANY_INFO.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span dir="ltr" className="font-mono">
                    {COMPANY_INFO.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#00a8f0]"
                >
                  <Mail className="h-4 w-4 text-[#00a8f0]" />
                  <span dir="ltr" className="font-mono">
                    {COMPANY_INFO.email}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
              <a href="/llms.txt" className="hover:text-[#00a8f0]">
                llms.txt
              </a>
              <a href="/rag-knowledge-base.json" className="hover:text-[#00a8f0]">
                RAG JSON
              </a>
              <a href="/sitemap.xml" className="hover:text-[#00a8f0]">
                Sitemap
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            © 2009–{new Date().getFullYear()} {COMPANY_INFO.name[locale]}.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={COMPANY_INFO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00a8f0]"
            >
              Facebook
            </a>
            <a
              href={COMPANY_INFO.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00a8f0]"
            >
              X / Twitter
            </a>
            <a
              href={COMPANY_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00a8f0]"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

