export type Lang = "en" | "ar";

type Dict = {
  nav: { home: string; menu: string; wholesale: string; about: string; contact: string; call: string };
  hero: { kicker: string; title: string; subtitle: string; cta1: string; cta2: string };
  menu: {
    title: string; subtitle: string; search: string; special: string; empty: string;
    cats: { all: string; manakish: string; bread: string; viennoiserie: string; desserts: string };
  };
  wholesale: {
    title: string; subtitle: string; bullets: string[];
    form: {
      name: string; business: string; email: string; phone: string;
      type: string; message: string; submit: string; sending: string;
      success: string; error: string;
      options: { bread: string; pastry: string; catering: string; other: string };
    };
  };
  about: { title: string; p1: string; p2: string; p3: string };
  reviews: { title: string; items: { name: string; text: string }[] };
  footer: {
    hours: string; hoursValue: string; location: string; locationValue: string;
    contact: string; socials: string; rights: string;
  };
  order: { title: string; subtitle: string; call: string; whatsapp: string; close: string };
  floating: string;
};

export const translations: Record<Lang, Dict> = {
  en: {
    nav: { home: "Home", menu: "Menu", wholesale: "Wholesale", about: "About", contact: "Contact", call: "Call to Order" },
    hero: {
      kicker: "Since the heart of Beirut",
      title: "The Heart of Lebanese Baking in Jisr El Basha",
      subtitle: "Serving fresh, artisanal bread, traditional manakish, and premium pastries daily from 7:00 AM to 11:00 PM.",
      cta1: "Explore Our Menu",
      cta2: "Wholesale Inquiries",
    },
    menu: {
      title: "From Our Oven",
      subtitle: "Baked fresh every morning, all day long.",
      search: "Search the menu…",
      special: "Special",
      cats: { all: "All", manakish: "Manakish & Saj", bread: "Fresh Breads & Kaak", viennoiserie: "Viennoiserie", desserts: "Cakes & Desserts" },
      empty: "No items match your search.",
    },
    wholesale: {
      title: "Wholesale & B2B",
      subtitle: "Supplying restaurants, supermarkets, and businesses across Lebanon with fresh daily baked goods.",
      bullets: ["Daily early-morning delivery", "Custom volumes & private labeling", "Consistent quality, family recipes"],
      form: {
        name: "Full Name", business: "Business Name", email: "Email", phone: "Phone Number",
        type: "Inquiry Type", message: "Message",
        options: { bread: "Daily Bread Supply", pastry: "Pastry Wholesale", catering: "Catering", other: "Other" },
        submit: "Send Inquiry", sending: "Sending…",
        success: "Thank you — we'll be in touch within 24 hours.",
        error: "Please fill in all required fields correctly.",
      },
    },
    about: {
      title: "Three Generations of Lebanese Baking",
      p1: "Keyrouz Bakery has been a fixture of Jisr El Basha for decades — turning out trays of golden manakish, kaak, and crusty bread before the city wakes up.",
      p2: "We still mix our dough by hand, fire stone ovens at dawn, and source our zaatar, oil, and flour from trusted local producers. It is the way our family has always done it.",
      p3: "Step in any morning and you'll find neighbors, students, and taxi drivers leaning against the counter — the same way they have for generations.",
    },
    reviews: {
      title: "Loved by the Neighborhood",
      items: [
        { name: "Rami H.", text: "Best zaatar manakish in Beirut. I drive across the city for it every Sunday morning." },
        { name: "Layal K.", text: "My kids refuse to eat any other kaak. Warm, fluffy, and that crust — perfect every time." },
        { name: "Marc S.", text: "We've supplied our restaurant from Keyrouz for 4 years. Reliable, fresh, and always on time." },
        { name: "Nour A.", text: "The lahm bi ajeen tastes exactly like my grandmother's. That says everything." },
        { name: "Tarek M.", text: "Stopped by at 10pm and the bread was still coming out hot. This place never sleeps." },
        { name: "Joelle B.", text: "Their knafeh is dangerous. I've stopped pretending I'm only buying one piece." },
      ],
    },
    footer: {
      hours: "Open Daily", hoursValue: "7:00 AM – 11:00 PM",
      location: "Location", locationValue: "Main Road, Jisr El Basha, Beirut",
      contact: "Contact", socials: "Follow Us",
      rights: "All rights reserved.",
    },
    order: { title: "Order Now", subtitle: "Reach us directly — we'll prepare your order.", call: "Call Bakery", whatsapp: "WhatsApp", close: "Close" },
    floating: "Order Now",
  },
  ar: {
    nav: { home: "الرئيسية", menu: "القائمة", wholesale: "الجملة", about: "من نحن", contact: "تواصل", call: "اتصل للطلب" },
    hero: {
      kicker: "من قلب بيروت",
      title: "قلب الخبز اللبناني في جسر الباشا",
      subtitle: "نقدّم لكم يومياً خبزاً طازجاً ومناقيش تقليدية ومعجنات فاخرة من السابعة صباحاً حتى الحادية عشرة ليلاً.",
      cta1: "تصفّح القائمة",
      cta2: "طلبات الجملة",
    },
    menu: {
      title: "من فرننا إليكم",
      subtitle: "نخبز طازجاً كل صباح، طوال النهار.",
      search: "ابحث في القائمة…",
      special: "مميّز",
      cats: { all: "الكل", manakish: "مناقيش وصاج", bread: "خبز وكعك", viennoiserie: "معجنات فرنسية", desserts: "حلويات وكاتو" },
      empty: "لا توجد نتائج.",
    },
    wholesale: {
      title: "الجملة والشركات",
      subtitle: "نزوّد المطاعم والسوبرماركت والشركات في كل لبنان بمخبوزات طازجة يومياً.",
      bullets: ["توصيل يومي باكراً", "كميات حسب الطلب", "جودة ثابتة ووصفات عائلية"],
      form: {
        name: "الاسم الكامل", business: "اسم المؤسسة", email: "البريد الإلكتروني", phone: "رقم الهاتف",
        type: "نوع الطلب", message: "الرسالة",
        options: { bread: "خبز يومي", pastry: "معجنات بالجملة", catering: "تموين", other: "أخرى" },
        submit: "إرسال الطلب", sending: "جاري الإرسال…",
        success: "شكراً لكم — سنتواصل معكم خلال 24 ساعة.",
        error: "يرجى تعبئة الحقول المطلوبة.",
      },
    },
    about: {
      title: "ثلاثة أجيال من الخبز اللبناني",
      p1: "كيروز فرنٌ من معالم جسر الباشا منذ عقود — نُخرج صواني المناقيش الذهبية والكعك والخبز الطازج قبل أن تستيقظ المدينة.",
      p2: "لا نزال نعجن باليد، ونوقد أفران الحجر مع الفجر، ونختار الزعتر والزيت والطحين من منتجين محليين موثوقين.",
      p3: "ادخل في أي صباح وستجد الجيران والطلاب وسائقي الأجرة يتّكئون على الكاونتر — كما هي الحال منذ أجيال.",
    },
    reviews: {
      title: "محبوبون في الحيّ",
      items: [
        { name: "رامي ح.", text: "أفضل مناقيش زعتر في بيروت. أقطع المدينة كل أحد للحصول عليها." },
        { name: "ليال ك.", text: "أولادي لا يأكلون كعكاً غير كعككم. ساخن، طري، والقشرة مثالية." },
        { name: "مارك س.", text: "نزوّد مطعمنا من كيروز منذ أربع سنوات. موثوق، طازج ودائماً في الوقت." },
        { name: "نور ع.", text: "اللحم بعجين عندكم بطعم لحم بعجين تيتا. هيدا يكفي." },
        { name: "طارق م.", text: "مررت الساعة العاشرة ليلاً والخبز لا يزال يخرج ساخناً. هذا المكان لا ينام." },
        { name: "جويل ب.", text: "كنافتكم خطيرة. توقفت عن التظاهر بأنني أشتري قطعة واحدة." },
      ],
    },
    footer: {
      hours: "مفتوح يومياً", hoursValue: "٧:٠٠ صباحاً – ١١:٠٠ ليلاً",
      location: "الموقع", locationValue: "الطريق العام، جسر الباشا، بيروت",
      contact: "تواصل", socials: "تابعونا",
      rights: "جميع الحقوق محفوظة.",
    },
    order: { title: "اطلب الآن", subtitle: "تواصل معنا مباشرة — سنحضّر طلبك.", call: "اتصل بالفرن", whatsapp: "واتساب", close: "إغلاق" },
    floating: "اطلب الآن",
  },
};

export type Translations = Dict;
