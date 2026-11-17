/* ============================================================
   DARAK — بيانات العقارات التجريبية
   لإضافة عقار جديد: أضف كائناً جديداً بنفس البنية.
   ============================================================ */

const PROPERTIES = [
  {
    id: 1,
    title: "فيلا عصرية فاخرة",
    type: "villa",
    purpose: "sale",
    city: "جدة",
    district: "أبحر الشمالية",
    price: 2450000,
    beds: 4,
    baths: 5,
    area: 320,
    createdAt: "2025-02-14",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "فيلا عصرية بتصميم معماري مميز في حي أبحر الشمالية بجدة. تتميز بواجهات زجاجية واسعة وإضاءة طبيعية تملأ الفراغات الداخلية، مع مسبح خاص وحديقة منسقة. التشطيبات راقية والمواد مختارة بعناية لتمنح إحساساً بالدفء والفخامة الهادئة. قريبة من الخدمات الرئيسية والطرق السريعة.",
    features: [
      "مسبح خاص", "حديقة منسقة", "مطبخ مجهز بالكامل", "غرفة خادمة",
      "موقف سيارات مزدوج", "نظام تكييف مركزي", "أمن على مدار الساعة", "مجلس خارجي"
    ],
    agent: { name: "عبدالله الحربي", role: "مستشار عقاري", phone: "+966501234567", email: "abdullah@darak.sa" }
  },
  {
    id: 2,
    title: "شقة سكنية راقية",
    type: "apartment",
    purpose: "rent",
    city: "جدة",
    district: "السلامة",
    price: 85000,
    beds: 3,
    baths: 2,
    area: 145,
    createdAt: "2025-03-02",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "شقة سكنية راقية في حي السلامة بجدة، تصميم داخلي حديث ومساحات مريحة. تتكون من ثلاث غرف نوم وصالة واسعة ومطبخ مجهز. المبنى يحتوي على مصعد ومواقف خاصة وحراسة. موقعها الحيوي يجعلها قريبة من المراكز التجارية والمطاعم والخدمات.",
    features: [
      "مصعد", "موقف خاص", "حراسة أمنية", "تكييف مركزي",
      "صالة واسعة", "مطبخ مجهز", "غرفة غسيل", "قريبة من الخدمات"
    ],
    agent: { name: "سارة الزهراني", role: "مستشارة عقارية", phone: "+966502345678", email: "sara@darak.sa" }
  },
  {
    id: 3,
    title: "تاون هاوس حديث",
    type: "townhouse",
    purpose: "sale",
    city: "الرياض",
    district: "النرجس",
    price: 1650000,
    beds: 4,
    baths: 4,
    area: 260,
    createdAt: "2025-01-20",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "تاون هاوس حديث في حي النرجس بالرياض، يقدم توازناً بين المساحة والخصوصية. تصميم عصري بخطوط نظيفة ونوافذ كبيرة، مع حديقة صغيرة خلفية ومدخل مستقل. مناسب للعائلات التي تبحث عن منزل مستقل بموقع هادئ وقريب من المدارس والمرافق.",
    features: [
      "مدخل مستقل", "حديقة خلفية", "غرفة درج", "مجلس منفصل",
      "موقف سيارات", "تشطيب فاخر", "قريب من المدارس", "شبكة إنترنت جاهزة"
    ],
    agent: { name: "فهد العتيبي", role: "مستشار عقاري", phone: "+966503456789", email: "fahad@darak.sa" }
  },
  {
    id: 4,
    title: "فيلا مودرن بإطلالة بحرية",
    type: "villa",
    purpose: "sale",
    city: "جدة",
    district: "الشاطئ",
    price: 3900000,
    beds: 5,
    baths: 6,
    area: 420,
    createdAt: "2025-03-18",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "فيلا مودرن بإطلالة مباشرة على البحر في حي الشاطئ بجدة. واجهات زجاجية كاملة تفتح المشهد على الماء، مع تراس واسع ومسبح خارجي. التصميم الداخلي يعتمد على الألوان الهادئة والمواد الطبيعية، لتجربة سكن استثنائية.",
    features: [
      "إطلالة بحرية", "مسبح خارجي", "تراس واسع", "مصعد داخلي",
      "غرفة سينما", "مطبخ مفتوح", "نظام صوتي", "مواقف متعددة"
    ],
    agent: { name: "عبدالله الحربي", role: "مستشار عقاري", phone: "+966501234567", email: "abdullah@darak.sa" }
  },
  {
    id: 5,
    title: "شقة بانورامية",
    type: "apartment",
    purpose: "sale",
    city: "جدة",
    district: "الروضة",
    price: 1150000,
    beds: 3,
    baths: 3,
    area: 180,
    createdAt: "2025-02-27",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "شقة بانورامية في حي الروضة بجدة، تتميز بنوافذ واسعة تطل على المدينة. مساحة مدروسة وتوزيع داخلي مريح، مع غرفة رئيسية بحمام خاص. المبنى حديث ويضم خدمات مشتركة مثل صالة رياضية ومصاعد.",
    features: [
      "إطلالة بانورامية", "غرفة رئيسية بحمام خاص", "صالة رياضية مشتركة",
      "مصعد", "موقف خاص", "نظام أمني", "قريبة من الكورنيش", "تشطيب حديث"
    ],
    agent: { name: "سارة الزهراني", role: "مستشارة عقارية", phone: "+966502345678", email: "sara@darak.sa" }
  },
  {
    id: 6,
    title: "تاون هاوس أنيق",
    type: "townhouse",
    purpose: "rent",
    city: "جدة",
    district: "أبحر الجنوبية",
    price: 120000,
    beds: 3,
    baths: 3,
    area: 210,
    createdAt: "2025-03-09",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "تاون هاوس أنيق للإيجار في حي أبحر الجنوبية بجدة. تصميم داخلي هادئ ومساحات مضيئة، مع حديقة صغيرة ومدخل خاص. مناسب للعائلات الصغيرة الباحثة عن الهدوء والقرب من البحر.",
    features: [
      "مدخل خاص", "حديقة صغيرة", "مطبخ مجهز", "تكييف مركزي",
      "موقف سيارات", "قريب من البحر", "حي هادئ", "غرفة غسيل"
    ],
    agent: { name: "فهد العتيبي", role: "مستشار عقاري", phone: "+966503456789", email: "fahad@darak.sa" }
  },
  {
    id: 7,
    title: "أرض سكنية مميزة",
    type: "land",
    purpose: "sale",
    city: "جدة",
    district: "أبحر الشمالية",
    price: 1800000,
    beds: 0,
    baths: 0,
    area: 600,
    createdAt: "2025-01-11",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "أرض سكنية بمساحة 600 م² في حي أبحر الشمالية بجدة، بواجهة واسعة على شارع رئيسي. مناسبة لبناء فيلا مستقلة أو مشروع سكني صغير. الأرض مستوية وجاهزة للبناء مع توفر الخدمات الأساسية.",
    features: [
      "واجهة على شارع رئيسي", "أرض مستوية", "الخدمات متوفرة",
      "صك إلكتروني", "منطقة سكنية", "قريبة من الطرق السريعة"
    ],
    agent: { name: "عبدالله الحربي", role: "مستشار عقاري", phone: "+966501234567", email: "abdullah@darak.sa" }
  },
  {
    id: 8,
    title: "مكتب تجاري فاخر",
    type: "commercial",
    purpose: "rent",
    city: "جدة",
    district: "الكورنيش",
    price: 250000,
    beds: 0,
    baths: 2,
    area: 220,
    createdAt: "2025-03-21",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "مكتب تجاري فاخر على كورنيش جدة، بمساحة مفتوحة وإطلالة على البحر. جاهز للتشغيل مع أنظمة تكييف وإنارة حديثة، وقاعات اجتماعات وغرف إدارية. موقع حيوي يناسب الشركات والاستشارات والمكاتب الإبداعية.",
    features: [
      "إطلالة على البحر", "مساحة مفتوحة", "قاعة اجتماعات", "استقبال",
      "تكييف مركزي", "مصعد", "مواقف زوار", "أمن 24 ساعة"
    ],
    agent: { name: "سارة الزهراني", role: "مستشارة عقارية", phone: "+966502345678", email: "sara@darak.sa" }
  },
  {
    id: 9,
    title: "شقة عصرية مفروشة",
    type: "apartment",
    purpose: "rent",
    city: "الرياض",
    district: "حطين",
    price: 95000,
    beds: 2,
    baths: 2,
    area: 130,
    createdAt: "2025-03-25",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "شقة عصرية مفروشة للإيجار في حي حطين بالرياض. أثاث حديث وألوان هادئة، مع مطبخ مجهز بالكامل وغرفة معيشة مريحة. مناسبة للسكن الفردي أو للأزواج، وقريبة من المراكز التجارية.",
    features: [
      "مفروشة بالكامل", "مطبخ مجهز", "واي فاي", "تكييف مركزي",
      "موقف خاص", "مصعد", "قريبة من الخدمات", "حي راقٍ"
    ],
    agent: { name: "فهد العتيبي", role: "مستشار عقاري", phone: "+966503456789", email: "fahad@darak.sa" }
  },
  {
    id: 10,
    title: "فيلا كلاسيكية واسعة",
    type: "villa",
    purpose: "sale",
    city: "الرياض",
    district: "الملقا",
    price: 2850000,
    beds: 5,
    baths: 5,
    area: 380,
    createdAt: "2025-02-05",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "فيلا كلاسيكية واسعة في حي الملقا بالرياض، تجمع بين الفخامة التقليدية والراحة العصرية. تحتوي على مجلسين وصالة كبيرة ومطبخ واسع وحديقة داخلية. مناسبة للعائلات الكبيرة، وموقعها متميز وقريب من المدارس العالمية.",
    features: [
      "مجلسان", "حديقة داخلية", "غرفة خادمة", "غرفة سائق",
      "مطبخ واسع", "مواقف داخلية", "قريبة من المدارس العالمية", "خزان مياه مستقل"
    ],
    agent: { name: "فهد العتيبي", role: "مستشار عقاري", phone: "+966503456789", email: "fahad@darak.sa" }
  },
  {
    id: 11,
    title: "شقة عائلية هادئة",
    type: "apartment",
    purpose: "sale",
    city: "جدة",
    district: "الحمراء",
    price: 780000,
    beds: 3,
    baths: 2,
    area: 160,
    createdAt: "2025-01-29",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "شقة عائلية هادئة في حي الحمراء بجدة، بمساحة مريحة وتوزيع عملي. ثلاث غرف نوم وصالة واسعة ومطبخ مستقل. المبنى نظيف وهادئ، مع توفر مواقف ومصعد، وقريب من الأسواق والخدمات اليومية.",
    features: [
      "ثلاث غرف نوم", "مطبخ مستقل", "مصعد", "موقف خاص",
      "حي هادئ", "قريبة من الأسواق", "صالة واسعة", "خزان مستقل"
    ],
    agent: { name: "سارة الزهراني", role: "مستشارة عقارية", phone: "+966502345678", email: "sara@darak.sa" }
  },
  {
    id: 12,
    title: "معرض تجاري على طريق رئيسي",
    type: "commercial",
    purpose: "sale",
    city: "جدة",
    district: "صاري",
    price: 3200000,
    beds: 0,
    baths: 1,
    area: 300,
    createdAt: "2025-03-12",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
    ],
    description:
      "معرض تجاري على طريق رئيسي في حي صاري بجدة، بواجهة زجاجية عريضة ومساحة داخلية مرنة. مناسب للعلامات التجارية والمعارض والمكاتب. الموقع يشهد حركة مرورية عالية ويوفر ظهوراً ممتازاً للنشاط.",
    features: [
      "واجهة زجاجية عريضة", "طريق رئيسي", "مواقف أمامية",
      "مساحة مرنة", "تكييف مركزي", "حمام مستقل", "لوحة إعلانية", "حركة مرورية عالية"
    ],
    agent: { name: "عبدالله الحربي", role: "مستشار عقاري", phone: "+966501234567", email: "abdullah@darak.sa" }
  }
];

/* قوائم مساعدة مشتقة من البيانات */
const DARAK_CITIES = [...new Set(PROPERTIES.map(p => p.city))];
const DARAK_TYPES = ["villa", "apartment", "townhouse", "land", "commercial"];