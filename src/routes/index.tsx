import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Phone, MessageCircle, MapPin, Clock, Instagram, Facebook,
  Search, Star, Wheat, X, Menu as MenuIcon, Languages,
} from "lucide-react";

import { translations, type Lang } from "@/lib/i18n";
import heroImg from "@/assets/hero-bakery.jpg";
import aboutImg from "@/assets/about-baker.jpg";
import imgZaatar from "@/assets/menu-zaatar.jpg";
import imgCheese from "@/assets/menu-cheese.jpg";
import imgKaak from "@/assets/menu-kaak.jpg";
import imgLahm from "@/assets/menu-lahm.jpg";
import imgCroissant from "@/assets/menu-croissant.jpg";
import imgBaklava from "@/assets/menu-baklava.jpg";
import imgPita from "@/assets/menu-pita.jpg";
import imgKnafeh from "@/assets/menu-knafeh.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keyrouz Bakery — Authentic Lebanese Bakery in Jisr El Basha, Beirut" },
      { name: "description", content: "Fresh manakish, traditional breads, and premium pastries baked daily 7AM–11PM. Walk in or call +961 1 500 003." },
      { property: "og:title", content: "Keyrouz Bakery — Authentic Lebanese Bakery" },
      { property: "og:description", content: "Fresh manakish, breads & pastries in Jisr El Basha, Beirut. Open daily 7AM–11PM." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const PHONE = "+9611500003";
const PHONE_DISPLAY = "+961 1 500 003";
const WHATSAPP = "https://wa.me/9611500003";

type CategoryKey = "manakish" | "bread" | "viennoiserie" | "desserts";
type MenuItem = {
  id: string;
  cat: CategoryKey;
  img: string;
  special?: boolean;
  en: { name: string; desc: string };
  ar: { name: string; desc: string };
};

const MENU: MenuItem[] = [
  { id: "zaatar", cat: "manakish", img: imgZaatar, special: true,
    en: { name: "Zaatar Manoushe", desc: "Wild thyme, sumac, sesame & cold-pressed olive oil." },
    ar: { name: "منقوشة زعتر", desc: "زعتر بري، سمّاق، سمسم وزيت زيتون بكر." } },
  { id: "cheese", cat: "manakish", img: imgCheese,
    en: { name: "Jibneh Manoushe", desc: "Melted akkawi & kashkaval on saj dough." },
    ar: { name: "منقوشة جبنة", desc: "عكاوي وقشقوان مذابان على عجينة الصاج." } },
  { id: "lahm", cat: "manakish", img: imgLahm, special: true,
    en: { name: "Lahm bi Ajeen", desc: "Spiced minced lamb, tomato, pomegranate molasses." },
    ar: { name: "لحم بعجين", desc: "لحمة مفرومة، بندورة ودبس رمان." } },
  { id: "kaak", cat: "bread", img: imgKaak, special: true,
    en: { name: "Kaak Beiruti", desc: "Sesame-crusted street bread — soft inside, crisp outside." },
    ar: { name: "كعك بيروتي", desc: "كعك بالسمسم — قشرة هشّة وداخل طري." } },
  { id: "pita", cat: "bread", img: imgPita,
    en: { name: "Khobz Arabi", desc: "Pillowy stone-oven pita, baked every hour." },
    ar: { name: "خبز عربي", desc: "خبز عربي من فرن الحجر، كل ساعة طازج." } },
  { id: "croissant", cat: "viennoiserie", img: imgCroissant,
    en: { name: "Butter Croissant", desc: "72-hour laminated dough, French butter, golden flake." },
    ar: { name: "كرواسون بالزبدة", desc: "عجينة مطوية ٧٢ ساعة بزبدة فرنسية." } },
  { id: "baklava", cat: "desserts", img: imgBaklava, special: true,
    en: { name: "Pistachio Baklava", desc: "Layered phyllo, Aleppo pistachios, orange-blossom syrup." },
    ar: { name: "بقلاوة فستق", desc: "ورق فيلو، فستق حلبي وقطر ماء زهر." } },
  { id: "knafeh", cat: "desserts", img: imgKnafeh,
    en: { name: "Knafeh Nabulsieh", desc: "Stretchy akkawi cheese, semolina shred, hot syrup." },
    ar: { name: "كنافة نابلسية", desc: "جبنة عكاوي، شعيرية وقطر ساخن." } },
];

function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  // scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  return (
    <div dir={dir} className="min-h-screen bg-background text-foreground">
      <Nav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <MenuSection t={t} lang={lang} />
      <Wholesale t={t} />
      <About t={t} />
      <Reviews t={t} />
      <Footer t={t} />
      <FloatingOrder label={t.floating} order={t.order} />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ t, lang, setLang }: { t: typeof translations["en"]; lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#menu", label: t.nav.menu },
    { href: "#wholesale", label: t.nav.wholesale },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-cream/85 border-b border-border shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-warm text-cream shadow-warm">
            <Wheat className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-charcoal">
            Keyrouz <span className="text-terracotta">Bakery</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-charcoal/80 transition-colors hover:text-terracotta">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-charcoal transition-colors hover:bg-accent"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "AR" : "EN"}
          </button>
          <a
            href={`tel:${PHONE}`}
            className="hidden items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-cream shadow-warm transition-all hover:scale-105 hover:bg-terracotta/90 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {t.nav.call}
          </a>
          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border bg-cream/95 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-charcoal hover:bg-accent">
                {l.label}
              </a>
            ))}
            <a href={`tel:${PHONE}`} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-cream">
              <Phone className="h-4 w-4" /> {t.nav.call}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ t }: { t: typeof translations["en"] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = Math.min(window.scrollY * 0.25, 120);
      ref.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden">
      <div ref={ref} className="absolute inset-0 -z-20 will-change-transform">
        <img src={heroImg} alt="Lebanese bread fresh from a stone oven" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-hero" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32">
        <div className="max-w-3xl reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-wheat animate-float" />
            {t.hero.kicker}
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-cream text-balance sm:text-6xl lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-warm transition-all hover:scale-105 hover:bg-terracotta/90">
              {t.hero.cta1}
            </a>
            <a href="#wholesale" className="inline-flex items-center justify-center rounded-full border border-cream/40 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream backdrop-blur transition-all hover:scale-105 hover:bg-cream hover:text-charcoal">
              {t.hero.cta2}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/80">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 7:00 AM – 11:00 PM</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Jisr El Basha, Beirut</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MENU ---------------- */
function MenuSection({ t, lang }: { t: typeof translations["en"]; lang: Lang }) {
  const [cat, setCat] = useState<"all" | CategoryKey>("all");
  const [q, setQ] = useState("");

  const cats: ("all" | CategoryKey)[] = ["all", "manakish", "bread", "viennoiserie", "desserts"];
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return MENU.filter((m) => {
      if (cat !== "all" && m.cat !== cat) return false;
      if (!query) return true;
      const loc = m[lang];
      return loc.name.toLowerCase().includes(query) || loc.desc.toLowerCase().includes(query);
    });
  }, [cat, q, lang]);

  return (
    <section id="menu" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">{t.menu.title}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-charcoal sm:text-5xl">
            {t.menu.subtitle}
          </h2>
        </div>

        <div className="reveal mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => {
              const label = c === "all" ? t.menu.cats.all : t.menu.cats[c];
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-terracotta text-cream shadow-warm"
                      : "border border-border bg-card text-charcoal hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.menu.search}
              className="w-full rounded-full border border-border bg-card py-2.5 ps-10 pe-4 text-sm outline-none transition-colors focus:border-terracotta"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">{t.menu.empty}</p>
        ) : (
          <div className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item, i) => {
              // Bento variation: every 5th & 6th card spans
              const span = i % 7 === 0 ? "lg:col-span-2 lg:row-span-2 row-span-2" : "";
              return <MenuCard key={item.id} item={item} lang={lang} t={t} className={span} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item, lang, t, className = "" }: { item: MenuItem; lang: Lang; t: typeof translations["en"]; className?: string }) {
  const loc = item[lang];
  return (
    <article className={`group reveal relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-warm ${className}`}>
      <div className="absolute inset-0">
        <img src={item.img} alt={loc.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />
      </div>
      {item.special && (
        <span className="absolute top-3 end-3 rounded-full bg-wheat px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal shadow-soft">
          ★ {t.menu.special}
        </span>
      )}
      <div className="relative flex h-full flex-col justify-end p-5">
        <h3 className="font-display text-2xl font-semibold text-cream">{loc.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-cream/85">{loc.desc}</p>
      </div>
    </article>
  );
}

/* ---------------- WHOLESALE ---------------- */
const wholesaleSchema = z.object({
  name: z.string().trim().min(2).max(100),
  business: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  type: z.enum(["bread", "pastry", "catering", "other"]),
  message: z.string().trim().max(1000).optional(),
});

function Wholesale({ t }: { t: typeof translations["en"] }) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = wholesaleSchema.safeParse({
      name: fd.get("name"),
      business: fd.get("business"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      type: fd.get("type"),
      message: fd.get("message") || "",
    });
    if (!parsed.success) {
      toast.error(t.wholesale.form.error);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    toast.success(t.wholesale.form.success);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="wholesale" className="bg-charcoal py-24 text-cream sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat">B2B</p>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{t.wholesale.title}</h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80">{t.wholesale.subtitle}</p>
          <ul className="mt-8 space-y-3">
            {t.wholesale.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-cream/90">
                <span className="mt-1.5 grid h-1.5 w-1.5 shrink-0 rounded-full bg-wheat" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-cream/60">Direct line</p>
              <p className="mt-1 font-display text-2xl">{PHONE_DISPLAY}</p>
            </div>
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-wheat px-5 py-2.5 text-sm font-semibold text-charcoal transition-transform hover:scale-105">
              <Phone className="h-4 w-4" /> {t.nav.call}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="reveal grid gap-4 rounded-3xl bg-cream p-6 text-charcoal shadow-warm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t.wholesale.form.name} name="name" required />
            <Field label={t.wholesale.form.business} name="business" required />
            <Field label={t.wholesale.form.email} name="email" type="email" required />
            <Field label={t.wholesale.form.phone} name="phone" type="tel" required />
          </div>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium">{t.wholesale.form.type}</span>
            <select name="type" required defaultValue="bread" className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-terracotta">
              <option value="bread">{t.wholesale.form.options.bread}</option>
              <option value="pastry">{t.wholesale.form.options.pastry}</option>
              <option value="catering">{t.wholesale.form.options.catering}</option>
              <option value="other">{t.wholesale.form.options.other}</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            <span className="font-medium">{t.wholesale.form.message}</span>
            <textarea name="message" rows={4} maxLength={1000} className="resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-terracotta" />
          </label>
          <button
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-warm transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? t.wholesale.form.sending : t.wholesale.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">{label}{required && <span className="text-terracotta"> *</span>}</span>
      <input name={name} type={type} required={required} maxLength={255}
        className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-terracotta" />
    </label>
  );
}

/* ---------------- ABOUT ---------------- */
function About({ t }: { t: typeof translations["en"] }) {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="reveal relative">
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-warm opacity-30 blur-2xl" />
          <img src={aboutImg} alt="Lebanese baker kneading dough" loading="lazy" width={1024} height={1024}
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-warm" />
        </div>
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Our Story</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-charcoal sm:text-5xl">{t.about.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal/80">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "40+", v: "Years" },
              { k: "16h", v: "Daily" },
              { k: "100%", v: "Local" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-card p-4 text-center">
                <div className="font-display text-3xl font-semibold text-terracotta">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- REVIEWS ---------------- */
function Reviews({ t }: { t: typeof translations["en"] }) {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Reviews</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-charcoal sm:text-5xl">{t.reviews.title}</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.reviews.items.map((r) => (
            <figure key={r.name} className="reveal flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <div className="flex gap-0.5 text-wheat">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 grow text-sm leading-relaxed text-charcoal/85">"{r.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-warm font-display text-base font-semibold text-cream">
                  {r.name[0]}
                </span>
                <span className="text-sm font-semibold text-charcoal">{r.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ t }: { t: typeof translations["en"] }) {
  return (
    <footer id="contact" className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-warm text-cream">
              <Wheat className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold">Keyrouz Bakery</span>
          </div>
          <p className="mt-4 text-sm text-cream/70">{t.hero.kicker}.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat">{t.footer.hours}</h4>
          <p className="mt-3 inline-flex items-center gap-2 text-sm"><Clock className="h-4 w-4" /> {t.footer.hoursValue}</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-cream/15">
            <iframe
              title="Keyrouz Bakery Location"
              src="https://www.google.com/maps?q=Jisr+El+Basha,+Beirut&output=embed"
              className="block h-32 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat">{t.footer.location}</h4>
          <p className="mt-3 inline-flex items-start gap-2 text-sm text-cream/85">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {t.footer.locationValue}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat">{t.footer.contact}</h4>
          <a href={`tel:${PHONE}`} className="mt-3 inline-flex items-center gap-2 text-sm hover:text-wheat">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-2 text-sm hover:text-wheat">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-wheat">{t.footer.socials}</h4>
          <div className="mt-3 flex gap-2">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-colors hover:bg-wheat hover:text-charcoal">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-cream/20 transition-colors hover:bg-wheat hover:text-charcoal">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5">
        <p className="mx-auto max-w-7xl px-4 text-center text-xs text-cream/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Keyrouz Bakery. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

/* ---------------- FLOATING ORDER ---------------- */
function FloatingOrder({ label, order }: { label: string; order: typeof translations["en"]["order"] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-3.5 text-sm font-semibold text-cream shadow-warm transition-transform hover:scale-105 active:scale-95 lg:hidden"
      >
        <Phone className="h-4 w-4" /> {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-charcoal/60 backdrop-blur-sm sm:place-items-center" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-t-3xl bg-cream p-6 shadow-warm sm:rounded-3xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-semibold text-charcoal">{order.title}</h3>
                <p className="mt-1 text-sm text-charcoal/70">{order.subtitle}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label={order.close} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-accent">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 grid gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-cream">
                <Phone className="h-4 w-4" /> {order.call}
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[oklch(0.72_0.18_150)] px-5 py-3 text-sm font-semibold text-cream">
                <MessageCircle className="h-4 w-4" /> {order.whatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
