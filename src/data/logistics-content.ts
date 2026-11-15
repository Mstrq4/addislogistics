export interface LocalizedText {
  ar: string;
  en: string;
}

export interface ServiceItem {
  id: "air" | "sea" | "road" | "project" | "warehousing" | "customs";
  category: "freight" | "specialized";
  iconName: "Plane" | "Ship" | "Truck" | "Container" | "Warehouse" | "FileCheck2";
  stageIndex: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  highlights: {
    ar: string[];
    en: string[];
  };
  sla: LocalizedText;
}

export interface BranchHub {
  id: "sanaa" | "aden" | "hodeidah" | "istanbul";
  code: string;
  city: LocalizedText;
  country: LocalizedText;
  role: LocalizedText;
  description: LocalizedText;
  capabilities: {
    ar: string[];
    en: string[];
  };
  coordinates: string;
}

export interface VerticalMarket {
  id: string;
  iconName: "HeartHandshake" | "Flame" | "Stethoscope" | "Factory" | "PackageCheck" | "Cog";
  title: LocalizedText;
  description: LocalizedText;
}

export interface FAQItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface FleetStage {
  id: number;
  key: "corridor" | "air" | "sea" | "port" | "road";
  title: LocalizedText;
  badge: LocalizedText;
  summary: LocalizedText;
  metrics: { label: LocalizedText; value: string }[];
}

export const COMPANY_INFO = {
  name: {
    ar: "أديس للخدمات اللوجستية وحلول سلاسل الإمداد",
    en: "ADDIS Logistics & Supply Chain Solutions",
  },
  shortName: {
    ar: "أديس لوجستكس",
    en: "ADDIS Logistics",
  },
  foundedYear: 2009,
  countriesCount: "150+",
  deliveriesCount: "1,000+",
  hubsCount: "4",
  supportHours: "24/7",
  phone: "+967 1317338",
  phoneHref: "tel:+9671317338",
  whatsappDisplay: "+967 772900086",
  whatsappNumber: "967772900086",
  whatsappHref: "https://wa.me/967772900086",
  email: "info@addislogistics-ye.com",
  emailHref: "mailto:info@addislogistics-ye.com",
  website: "https://addislogistics-ye.com",
  social: {
    facebook: "https://facebook.com/addislogistics",
    twitter: "https://twitter.com/addislogistics",
    instagram: "https://instagram.com/addislogistics",
  },
} as const;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "air",
    category: "freight",
    iconName: "Plane",
    stageIndex: 1,
    title: { ar: "الشحن الجوي", en: "Air Freight" },
    subtitle: {
      ar: "شحن سريع من الباب إلى الباب عبر المطارات الدولية",
      en: "Time-Critical Door-to-Door Global Air Cargo",
    },
    description: {
      ar: "حلول شحن جوي مرنة للشحنات العاجلة والخاصة والخطرة والمبردة عبر شبكة وكلاء وشراكات مباشرة مع شركات الطيران العالمية.",
      en: "Priority air capacity with direct airline partnerships for express, special cargo, IATA DGR, perishables, and high-value consignments.",
    },
    highlights: {
      ar: [
        "خدمة التوصيل من الباب إلى الباب",
        "مناولة الشحنات الخاصة والوثائق العاجلة",
        "شحن البضائع الخطرة (DGR) المعتمدة",
        "البضائع سريعة التلف والسلاسل المبردة",
        "الشحنات الثمينة وتأجير الطائرات",
      ],
      en: [
        "Door-to-Door Service",
        "Special Cargo Service",
        "IATA Dangerous Goods (DGR)",
        "Perishable & Cold-Chain Goods",
        "Valuable Goods & Air Charters",
      ],
    },
    sla: { ar: "تغطية +150 دولة", en: "150+ Country Airports" },
  },
  {
    id: "sea",
    category: "freight",
    iconName: "Ship",
    stageIndex: 2,
    title: { ar: "الشحن البحري", en: "Sea Freight" },
    subtitle: {
      ar: "حاويات كاملة ومجمعة ووساطة بحرية متكاملة",
      en: "FCL, LCL, Tank Containers & Ship Brokerage",
    },
    description: {
      ar: "عمليات شحن بحري منتظمة من وإلى كافة الموانئ العالمية وموانئ عدن والحديدة وإسطنبول بأسعار تنافسية وجداول إبحار موثوقة.",
      en: "Cost-efficient ocean forwarding linking global seaports with Aden, Hodeidah, and Istanbul via top-tier container lines and charter vessels.",
    },
    highlights: {
      ar: [
        "حاويات كاملة 20 و40 قدماً وعالية الارتفاع (FCL)",
        "تجميع الشحنات البحرية الجزئية (LCL)",
        "حاويات الصهاريج القياسية (ISO Tank)",
        "حاويات السوائل المرنة (Flexitank)",
        "الوساطة البحرية وتأجير السفن",
      ],
      en: [
        "FCL 20' & 40' / High-Cube",
        "LCL Consolidation",
        "ISO Tank Container",
        "Flexitank Container",
        "Ship Brokerage & Chartering",
      ],
    },
    sla: { ar: "ربط بحري مباشر", en: "Direct Port Calls" },
  },
  {
    id: "road",
    category: "freight",
    iconName: "Truck",
    stageIndex: 4,
    title: { ar: "الشحن البري", en: "Road Freight" },
    subtitle: {
      ar: "إدارة أسطول النقل البري الداخلي والإقليمي",
      en: "FTL/LTL Fleet, Transit Customs & Route Escorts",
    },
    description: {
      ar: "نقل بري آمن ومجدول للشحنات الكاملة والجزئية بين الموانئ والمستودعات والمدن وعبر الحدود مع تصاريح المرور والمرافقة.",
      en: "Managed domestic and cross-border trucking connecting seaports, warehouses, and inland cities with transit customs and route escorts.",
    },
    highlights: {
      ar: [
        "إدارة الحمولات الجزئية والكاملة (LTL & FTL)",
        "النقل الإقليمي والمسافات الطويلة",
        "معالجة جمارك الترانزيت البري",
        "استخراج تصاريح الطرق والحمولات",
        "خدمات المرافقة الأمنية والتتبع",
      ],
      en: [
        "LTL & FTL Management",
        "Regional & Long Distance",
        "Transit Customs Handling",
        "Heavy Route Permits",
        "Security Escorts & Tracking",
      ],
    },
    sla: { ar: "أسطول مرن وآمن", en: "Managed Corridor Fleet" },
  },
  {
    id: "project",
    category: "specialized",
    iconName: "Container",
    stageIndex: 3,
    title: { ar: "شحن المشاريع", en: "Project Cargo" },
    subtitle: {
      ar: "الحمولات الثقيلة وخارج القياس والعمليات الإغاثية",
      en: "Heavy Lift, OOG, Breakbulk & Charters",
    },
    description: {
      ar: "هندسة لوجستية متخصصة للمشاريع الكبرى والمعدات الثقيلة والشحنات العسكرية والإنسانية عبر استئجار السفن والطائرات.",
      en: "Engineered heavy-lift logistics for industrial plants, humanitarian NGOs, energy assets, and specialized institutional or military cargo.",
    },
    highlights: {
      ar: [
        "الشحنات اللوجستية والعسكرية الخاصة",
        "استئجار الطائرات والسفن الكاملة",
        "الحمولات خارج القياس (Out of Gauge)",
        "الشحنات السائبة والمفككة (Breakbulk)",
        "نقل المعدات الثقيلة والرافعات",
      ],
      en: [
        "Military & Institutional Cargo",
        "Air & Ship Charters",
        "Out of Gauge (OOG)",
        "Breakbulk Handling",
        "Heavy Freight Engineering",
      ],
    },
    sla: { ar: "+1000 عملية ناجحة", en: "1,000+ Major Deliveries" },
  },
  {
    id: "warehousing",
    category: "specialized",
    iconName: "Warehouse",
    stageIndex: 3,
    title: { ar: "التخزين والتوزيع", en: "Warehousing & Distribution" },
    subtitle: {
      ar: "مستودعات استراتيجية وإدارة مخزون وتوزيع شامل",
      en: "Bonded Storage, Inventory & Last-Mile Distribution",
    },
    description: {
      ar: "مرافق تخزين آمنة ومهيأة قرب الموانئ والمطارات مع خدمات الفرز والتعبئة والتجميع والتوزيع إلى جميع المحافظات والمواقع.",
      en: "Secure port-adjacent and inland warehousing with stock management, order fulfillment, consolidation, and nationwide distribution.",
    },
    highlights: {
      ar: [
        "مستودعات تخزين جمركية وعادية مؤمنة",
        "إدارة المخزون والتدقيق الدوري",
        "خدمات الفرز والتجهيز وإعادة التعبئة",
        "التجميع اللوجستي للشحنات المتعددة",
        "التوزيع النهائي لمواقع العملاء",
      ],
      en: [
        "Bonded & General Warehousing",
        "Real-Time Inventory Control",
        "Pick, Pack & Repackaging",
        "Multi-Vendor Consolidation",
        "Collection & Last-Mile Delivery",
      ],
    },
    sla: { ar: "حفظ وتوزيع 24/7", en: "24/7 Inventory Control" },
  },
  {
    id: "customs",
    category: "specialized",
    iconName: "FileCheck2",
    stageIndex: 3,
    title: { ar: "التخليص الجمركي", en: "Customs Clearance" },
    subtitle: {
      ar: "تخليص استيراد وتصدير سريع في اليمن وتركيا",
      en: "Import/Export Brokerage in Yemen & Turkey",
    },
    description: {
      ar: "إنجاز كافة المعاملات الجمركية والتصنيفات التعريفية وإعفاءات المشاريع والمنظمات بسرعة ودقة تامة في الموانئ والمطارات.",
      en: "Rapid import, export, and transit customs clearance across Sana'a, Aden, Hodeidah, and Istanbul with HS classification and regulatory compliance.",
    },
    highlights: {
      ar: [
        "التخليص الجمركي للاستيراد والتصدير",
        "تصنيف البنود الجمركية (HS Code)",
        "تخليص إعفاءات المنظمات والمشاريع",
        "مراجعة المستندات وشهادات المنشأ",
        "تخليص فوري في المطارات والموانئ",
      ],
      en: [
        "Import & Export Brokerage",
        "HS Tariff Classification",
        "NGO & Project Duty Exemptions",
        "Document & Origin Verification",
        "Rapid Port & Airport Release",
      ],
    },
    sla: { ar: "تخليص معتمد ودقيق", en: "Zero-Delay Compliance" },
  },
];

export const BRANCH_HUBS: BranchHub[] = [
  {
    id: "sanaa",
    code: "SAH",
    city: { ar: "صنعاء", en: "Sana'a" },
    country: { ar: "اليمن — المقر الرئيسي", en: "Yemen — Headquarters" },
    role: {
      ar: "مركز القيادة اللوجستية والعمليات المركزية",
      en: "Central Operations & Executive Dispatch Hub",
    },
    description: {
      ar: "نقطة التأسيس عام 2009 ومركز تنسيق الشحن الجوي والتوزيع الداخلي وإدارة حسابات المنظمات الدولية والشركات الكبرى.",
      en: "Founded in 2009 as our operational anchor, coordinating air cargo, diplomatic/NGO pipelines, customs documentation, and nationwide delivery.",
    },
    capabilities: {
      ar: ["تنسيق الشحن الجوي", "مكتب المنظمات والمشاريع", "التخليص والتوزيع المركزي"],
      en: ["Air Cargo Desk", "NGO & Project Coordination", "Central Dispatch & Brokerage"],
    },
    coordinates: "15.3694° N, 44.1910° E",
  },
  {
    id: "aden",
    code: "ADE",
    city: { ar: "عدن", en: "Aden" },
    country: { ar: "اليمن — الميناء والمنطقة الحرة", en: "Yemen — Seaport & Free Zone" },
    role: {
      ar: "بوابة الحاويات البحرية والمطار الدولي",
      en: "Southern Maritime Container & Airport Gateway",
    },
    description: {
      ar: "إدارة عمليات محطة حاويات عدن والمنطقة الحرة ومطار عدن الدولي مع ربط بري مباشر بمختلف المحافظات.",
      en: "Full stevedoring, FCL/LCL stripping, bonded warehousing, and customs release at Aden Container Terminal and Aden International Airport.",
    },
    capabilities: {
      ar: ["محطة حاويات عدن (ACT)", "مطار عدن الدولي", "التخزين الجمركي والمنطقة الحرة"],
      en: ["Aden Container Terminal", "Aden Intl Airport", "Free Zone Warehousing"],
    },
    coordinates: "12.7855° N, 45.0187° E",
  },
  {
    id: "hodeidah",
    code: "HOD",
    city: { ar: "الحديدة", en: "Hodeidah" },
    country: { ar: "اليمن — ميناء البحر الأحمر", en: "Yemen — Red Sea Port" },
    role: {
      ar: "مركز العمليات البحرية ومناولة السفن",
      en: "Red Sea Maritime Terminal & Breakbulk Hub",
    },
    description: {
      ar: "تخليص ومناولة الحاويات والشحنات السائبة ومعدات المشاريع الثقيلة عبر ميناء الحديدة على البحر الأحمر.",
      en: "Specialized Red Sea port operations handling containerized cargo, breakbulk machinery, bulk commodities, and heavy-lift vessel discharge.",
    },
    capabilities: {
      ar: ["مناولة السفن والحاويات", "شحن المشاريع والـ Breakbulk", "العبور والتخليص المينائي"],
      en: ["Vessel & Container Discharge", "Breakbulk & Heavy Lift", "Port Transit Clearance"],
    },
    coordinates: "14.7980° N, 42.9545° E",
  },
  {
    id: "istanbul",
    code: "IST",
    city: { ar: "إسطنبول", en: "Istanbul" },
    country: { ar: "تركيا — المركز الدولي للتجارة", en: "Turkey — International Forwarding Hub" },
    role: {
      ar: "محور التجميع الأوروبي الآسيوي للشحن الدولي",
      en: "Euro-Asian Consolidation & Global Trade Hub",
    },
    description: {
      ar: "ربط الصادرات والواردات جواً وبحراً بين تركيا وأوروبا وأكثر من 150 دولة والشرق الأوسط مع تجميع الشحنات وفحص الموردين.",
      en: "Strategic international forwarding center connecting Turkey, Europe, and 150+ global origins via air & sea consolidation and export brokerage.",
    },
    capabilities: {
      ar: ["تجميع الشحنات الجوي والبحري", "الاستيراد والتصدير لـ +150 دولة", "إعادة التعبئة والوثائق التركية"],
      en: ["Air & Sea Consolidation", "150+ Country Forwarding", "Export Brokerage & Packing"],
    },
    coordinates: "41.0082° N, 28.9784° E",
  },
];

export const VERTICAL_MARKETS: VerticalMarket[] = [
  {
    id: "humanitarian",
    iconName: "HeartHandshake",
    title: { ar: "الإغاثة والمنظمات الدولية", en: "Humanitarian & NGOs" },
    description: {
      ar: "إدارة سلاسل الإمداد الطبية والغذائية والإغاثية الطارئة مع تخليص الإعفاءات الجمركية.",
      en: "Rapid emergency air/sea corridors, cold-chain relief, and NGO customs exemption handling.",
    },
  },
  {
    id: "energy",
    iconName: "Flame",
    title: { ar: "الطاقة والنفط والغاز", en: "Energy, Oil & Gas" },
    description: {
      ar: "نقل المولدات والتوربينات وصهاريج ISO والمواد الخطرة وفق معايير السلامة الدولية.",
      en: "Oversized power turbines, ISO chemical tanks, and DGR-compliant oilfield logistics.",
    },
  },
  {
    id: "healthcare",
    iconName: "Stethoscope",
    title: { ar: "الرعاية الصحية والأدوية", en: "Healthcare & Pharma" },
    description: {
      ar: "شحن مبرد فائق الدقة للمستلزمات الطبية واللقاحات والأجهزة الحساسة.",
      en: "Temperature-monitored air freight and cold storage for medical devices and pharmaceuticals.",
    },
  },
  {
    id: "industrial",
    iconName: "Factory",
    title: { ar: "الصناعة والإنشاءات", en: "Industrial & Construction" },
    description: {
      ar: "استيراد خطوط الإنتاج ومعدات المصانع والحديد والمواد الإنشائية بحمولات ثقيلة.",
      en: "Breakbulk plant machinery, steel cargo, and OOG construction equipment routing.",
    },
  },
  {
    id: "fmcg",
    iconName: "PackageCheck",
    title: { ar: "السلع الاستهلاكية والغذاء", en: "FMCG & Foodstuff" },
    description: {
      ar: "تجميع وتوزيع السلع سريعة التداول والمواد الغذائية عبر حاويات مبردة وجافة.",
      en: "High-frequency FCL/LCL consolidation, reefer logistics, and nationwide distribution.",
    },
  },
  {
    id: "automotive",
    iconName: "Cog",
    title: { ar: "السيارات والآليات الثقيلة", en: "Automotive & Machinery" },
    description: {
      ar: "شحن المركبات وقطع الغيار والرافعات والآليات الهندسية من الموانئ للمواقع.",
      en: "Ro-Ro, flat-rack, and enclosed spare-parts forwarding from factory to site.",
    },
  },
];

export const FLEET_STAGES: FleetStage[] = [
  {
    id: 0,
    key: "corridor",
    title: {
      ar: "منظومة النقل المتكاملة (+150 دولة)",
      en: "Integrated Multimodal Corridor (150+ Countries)",
    },
    badge: { ar: "تغطية شاملة منذ 2009", en: "Unified Operations Since 2009" },
    summary: {
      ar: "ربط متزامن بين الشحن الجوي والبحري والبري وعمليات الموانئ من صنعاء وعدن والحديدة وإسطنبول.",
      en: "Synchronized air, sea, port gantry, and overland trucking linking Sana'a, Aden, Hodeidah, and Istanbul.",
    },
    metrics: [
      { label: { ar: "الدول المخدومة", en: "Countries" }, value: "150+" },
      { label: { ar: "الفروع الاستراتيجية", en: "Hubs" }, value: "4" },
    ],
  },
  {
    id: 1,
    key: "air",
    title: { ar: "أسطول الشحن الجوي السريع", en: "Widebody Air Freighter" },
    badge: { ar: "جوي / DGR / طارئ", en: "Air Cargo & Charters" },
    summary: {
      ar: "طائرات شحن عريضة البدن لشحن البضائع العاجلة والطبية والخطرة والقيّمة من الباب إلى الباب.",
      en: "Widebody freighter operations for door-to-door express, IATA DGR, perishables, and full aircraft charters.",
    },
    metrics: [
      { label: { ar: "المطارات المرتبطة", en: "Airports" }, value: "SAH / ADE / IST" },
      { label: { ar: "الدعم التشغيلي", en: "Desk" }, value: "24/7" },
    ],
  },
  {
    id: 2,
    key: "sea",
    title: { ar: "سفن الحاويات والشحن البحري", en: "Deep-Sea Container Vessel" },
    badge: { ar: "بحري / FCL / ISO Tank", en: "Ocean Freight & Brokerage" },
    summary: {
      ar: "ناقلات حاويات 20 و40 قدماً وحاويات الصهاريج وخطوط ملاحية تغطي البحر الأحمر والبحر المتوسط.",
      en: "20ft & 40ft FCL/LCL vessels, ISO Tanks, and Flexitank capacity serving Red Sea and Mediterranean corridors.",
    },
    metrics: [
      { label: { ar: "الموانئ الرئيسية", en: "Seaports" }, value: "Aden / Hodeidah / IST" },
      { label: { ar: "أنواع الحاويات", en: "Equipment" }, value: "FCL / LCL / OOG" },
    ],
  },
  {
    id: 3,
    key: "port",
    title: { ar: "رافعات الموانئ والتخليص الجمركي", en: "Ship-to-Shore Port Gantry Cranes" },
    badge: { ar: "موانئ / مشاريع / تخليص", en: "Port Terminal & Customs" },
    summary: {
      ar: "تفريغ دقيق عبر رافعات الموانئ ومناولة الحمولات الثقيلة والتخليص الجمركي الفوري.",
      en: "Precision Ship-to-Shore gantry discharge, breakbulk heavy-lift handling, bonded storage, and rapid customs release.",
    },
    metrics: [
      { label: { ar: "عمليات منجزة", en: "Deliveries" }, value: "1,000+" },
      { label: { ar: "الامتثال", en: "Clearance" }, value: "HS / NGO" },
    ],
  },
  {
    id: 4,
    key: "road",
    title: { ar: "شاحنات النقل البري والتوزيع", en: "Overland Heavy Truck Fleet" },
    badge: { ar: "بري / FTL / مرافقة", en: "Road Fleet & Escorts" },
    summary: {
      ar: "شاحنات نقل ثقيل لنقل الحاويات والشحنات المجمعة مع تصاريح المرور وجمارك الترانزيت.",
      en: "Articulated container haulers and LTL/FTL fleets delivering across regional highways with permits and escorts.",
    },
    metrics: [
      { label: { ar: "نطاق التشغيل", en: "Mode" }, value: "FTL / LTL" },
      { label: { ar: "التسليم", en: "Delivery" }, value: "Door-to-Door" },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "founded-hubs",
    question: {
      ar: "متى تأسست شركة أديس لوجستكس وأين تقع فروعها؟",
      en: "When was ADDIS Logistics founded and where are your branches located?",
    },
    answer: {
      ar: "تأسست شركة أديس للخدمات اللوجستية وحلول سلاسل الإمداد عام 2009 في اليمن، وتدير عملياتها عبر 4 مواقع استراتيجية في صنعاء وعدن والحديدة (اليمن) وإسطنبول (تركيا) لخدمة أكثر من 150 دولة.",
      en: "ADDIS Logistics & Supply Chain Solutions was founded in 2009 in Yemen and operates through 4 strategic hubs in Sana'a, Aden, Hodeidah (Yemen), and Istanbul (Turkey), serving 150+ countries.",
    },
  },
  {
    id: "services-scope",
    question: {
      ar: "ما هي الخدمات اللوجستية الرئيسية التي تقدمونها؟",
      en: "What core logistics and supply chain services do you provide?",
    },
    answer: {
      ar: "نقدم 6 خدمات متكاملة: الشحن الجوي، الشحن البحري (FCL/LCL/ISO Tank)، الشحن البري (FTL/LTL)، شحن المشاريع والحمولات الثقيلة، التخزين والتوزيع، والتخليص الجمركي للاستيراد والتصدير.",
      en: "We deliver 6 integrated services: Air Freight, Sea Freight (FCL/LCL/ISO Tank), Road Freight (FTL/LTL), Project Cargo & Heavy Lift, Warehousing & Distribution, and full Customs Clearance.",
    },
  },
  {
    id: "quote-channels",
    question: {
      ar: "كيف يمكنني الحصول على عرض سعر فوري أو التواصل مع فريق العمليات؟",
      en: "How can I request an instant freight quote or reach operations?",
    },
    answer: {
      ar: "فريقنا متاح على مدار الساعة 24/7 عبر الواتساب المباشر (+967 772900086) أو البريد الإلكتروني (info@addislogistics-ye.com) أو الهاتف الثابت (+967 1317338)، كما يمكنك إرسال تفاصيل الشحنة مباشرة من نموذج عروض الأسعار في الموقع.",
      en: "Our 24/7 operations desk is reachable directly via WhatsApp (+967 772900086), Email (info@addislogistics-ye.com), or Landline (+967 1317338), or via the instant RFQ builder below.",
    },
  },
  {
    id: "istanbul-yemen-corridor",
    question: {
      ar: "هل توفرون الشحن والتجميع من إسطنبول وأوروبا إلى اليمن؟",
      en: "Do you handle consolidation and shipping from Istanbul and Europe to Yemen?",
    },
    answer: {
      ar: "نعم، يختص مكتبنا في إسطنبول بتجميع الشحنات الجوية والبحرية وفحص وثائق التصدير وتوجيه الشحنات إلى مطارات وموانئ عدن والحديدة وصنعاء وكافة الوجهات العالمية.",
      en: "Yes. Our Istanbul hub manages air and sea consolidation, export documentation, and direct forwarding from Turkey and Europe into Aden, Hodeidah, Sana'a, and 150+ global ports.",
    },
  },
];
