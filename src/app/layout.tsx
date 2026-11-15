import type { Metadata, Viewport } from "next";
import { Cairo, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { COMPANY_INFO, FAQ_ITEMS, SERVICES_DATA } from "@/data/logistics-content";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050e1d" },
    { media: "(prefers-color-scheme: light)", color: "#009fe3" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://addislogistics-ye.com"),
  title: {
    default:
      "ADDIS Logistics & Supply Chain Solutions | Global Freight Since 2009",
    template: "%s | ADDIS Logistics",
  },
  description:
    "Founded in 2009, ADDIS Logistics & Supply Chain Solutions provides air, sea, road freight, project cargo, warehousing, and customs clearance across 150+ countries from hubs in Sana'a, Aden, Hodeidah, and Istanbul.",
  keywords: [
    "ADDIS Logistics",
    "Supply Chain Solutions",
    "Yemen Logistics",
    "Istanbul Freight Forwarder",
    "Sanaa Aden Hodeidah Shipping",
    "Air Freight Yemen",
    "Sea Freight FCL LCL",
    "Project Cargo",
    "Customs Clearance",
    "أديس للخدمات اللوجستية",
    "الشحن الجوي",
    "الشحن البحري",
    "الشحن البري",
    "شحن المشاريع",
    "التخزين والتوزيع",
    "التخليص الجمركي",
  ],
  authors: [{ name: "ADDIS Logistics & Supply Chain Solutions" }],
  creator: "ADDIS Logistics",
  publisher: "ADDIS Logistics",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://addislogistics-ye.com/",
    languages: {
      en: "https://addislogistics-ye.com/?lang=en",
      ar: "https://addislogistics-ye.com/?lang=ar",
      "x-default": "https://addislogistics-ye.com/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://addislogistics-ye.com",
    siteName: "ADDIS Logistics & Supply Chain Solutions",
    title: "ADDIS Logistics & Supply Chain Solutions | 150+ Countries Since 2009",
    description:
      "Global air, sea, road, project cargo, warehousing & customs clearance from Sana'a, Aden, Hodeidah & Istanbul.",
    locale: "en_US",
    alternateLocale: ["ar_YE", "ar_SA"],
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 128,
        alt: "ADDIS Logistics & Supply Chain Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADDIS Logistics & Supply Chain Solutions",
    description:
      "Air, Sea, Road, Project Cargo, Warehousing & Customs Clearance across 150+ countries since 2009.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://addislogistics-ye.com/#organization",
      name: COMPANY_INFO.name.en,
      alternateName: COMPANY_INFO.name.ar,
      url: "https://addislogistics-ye.com",
      logo: "https://addislogistics-ye.com/logo.png",
      image: "https://addislogistics-ye.com/logo.png",
      foundingDate: "2009",
      email: COMPANY_INFO.email,
      telephone: COMPANY_INFO.phone,
      sameAs: [
        COMPANY_INFO.social.facebook,
        COMPANY_INFO.social.twitter,
        COMPANY_INFO.social.instagram,
        COMPANY_INFO.whatsappHref,
      ],
      areaServed: {
        "@type": "Place",
        name: "Worldwide (150+ Countries)",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+967-772900086",
          contactType: "sales",
          availableLanguage: ["Arabic", "English"],
          url: COMPANY_INFO.whatsappHref,
        },
        {
          "@type": "ContactPoint",
          telephone: "+967-1317338",
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
      ],
      location: [
        {
          "@type": "Place",
          name: "ADDIS Logistics — Sana'a Headquarters",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Sana'a",
            addressCountry: "YE",
          },
        },
        {
          "@type": "Place",
          name: "ADDIS Logistics — Aden Seaport & Airport Hub",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Aden",
            addressCountry: "YE",
          },
        },
        {
          "@type": "Place",
          name: "ADDIS Logistics — Hodeidah Red Sea Port Hub",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hodeidah",
            addressCountry: "YE",
          },
        },
        {
          "@type": "Place",
          name: "ADDIS Logistics — Istanbul International Hub",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Istanbul",
            addressCountry: "TR",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://addislogistics-ye.com/#website",
      url: "https://addislogistics-ye.com",
      name: COMPANY_INFO.name.en,
      inLanguage: ["en", "ar"],
      publisher: {
        "@id": "https://addislogistics-ye.com/#organization",
      },
    },
    ...SERVICES_DATA.map((svc) => ({
      "@type": "Service",
      "@id": `https://addislogistics-ye.com/#service-${svc.id}`,
      name: `${svc.title.en} | ${svc.title.ar}`,
      description: svc.description.en,
      serviceType: svc.title.en,
      provider: {
        "@id": "https://addislogistics-ye.com/#organization",
      },
      areaServed: "Worldwide (150+ Countries)",
    })),
    {
      "@type": "FAQPage",
      "@id": "https://addislogistics-ye.com/#faq",
      mainEntity: FAQ_ITEMS.map((faq) => ({
        "@type": "Question",
        name: faq.question.en,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer.en,
        },
      })),
    },
  ],
};

const preHydrationScript = `
(function() {
  try {
    var params = new URLSearchParams(window.location.search);
    var urlLang = (params.get('lang') || '').toLowerCase();
    var savedLocale = window.localStorage.getItem('addis_locale');
    var navLang = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    var locale = (urlLang === 'ar' || urlLang === 'en')
      ? urlLang
      : (savedLocale === 'ar' || savedLocale === 'en')
        ? savedLocale
        : (navLang.indexOf('ar') === 0 ? 'ar' : 'en');
    var html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'ar' ? 'rtl' : 'ltr';
    var savedTheme = window.localStorage.getItem('addis_theme');
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : (prefersLight ? 'light' : 'dark');
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${cairo.variable} ${geistMono.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preHydrationScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--accent)] selection:text-[var(--accent-contrast)]">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
