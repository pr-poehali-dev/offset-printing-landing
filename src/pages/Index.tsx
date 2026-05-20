import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PRESS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/d2909581-bfe0-4dcf-8557-8f140c57a6e8.jpg";
const MATERIALS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/0ca40e45-c634-4c66-a954-ea438f94f18f.jpg";
const CATALOGS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg";
const LOGO_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/bucket/c3e463db-8377-41e7-ab87-ed9c7fe0713f.png";

const GALLERY_IMGS = [
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/e03f7d83-e6f5-404f-b62a-66598e7263d7.jpg", label: "Каталог" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/7c832436-6b37-4a2f-a01e-1517d72b08fd.jpg", label: "Брошюра" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8983bdf0-dabf-4df3-91ba-208d3ad277b9.jpg", label: "Буклет" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8c0d5418-a0c0-4b5b-8f9c-e3df5fa6130e.jpg", label: "Каталог А4" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/ab9199c2-2ff9-4418-9a62-0e04cdbd22fb.jpg", label: "Каталог premium" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/3dc6c535-1fc3-429f-84c2-9c5e65c2c7f1.jpg", label: "Буклет сложение" },
  { url: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg", label: "Каталог продукции" },
];

const PORTFOLIO_TABS = ["Каталоги", "Брошюры", "Буклеты"];
const PORTFOLIO_ITEMS = [
  { tab: "Каталоги", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/e03f7d83-e6f5-404f-b62a-66598e7263d7.jpg", format: "200×270 мм", pages: "120 полос + обложка", paper: "Мелованная матовая 90 г/м²", cover: "Мелованная 200 г/м² + матовый лак", color: "4+4 (CMYK)" },
  { tab: "Каталоги", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/ab9199c2-2ff9-4418-9a62-0e04cdbd22fb.jpg", format: "210×297 мм (А4)", pages: "64 полосы + обложка", paper: "Мелованная глянцевая 115 г/м²", cover: "Мелованная 300 г/м² + УФ-лак", color: "4+4 (CMYK)" },
  { tab: "Каталоги", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8c0d5418-a0c0-4b5b-8f9c-e3df5fa6130e.jpg", format: "210×148 мм (А5)", pages: "48 полос + обложка", paper: "Мелованная матовая 115 г/м²", cover: "Мелованная 250 г/м² + глянцевая ламинация", color: "4+4 (CMYK)" },
  { tab: "Каталоги", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg", format: "210×297 мм, premium", pages: "88 полос + обложка", paper: "Мелованная глянцевая 130 г/м²", cover: "Дизайнерская 350 г/м² + тиснение", color: "4+4 (CMYK)" },
  { tab: "Брошюры", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/7c832436-6b37-4a2f-a01e-1517d72b08fd.jpg", format: "148×210 мм (А5)", pages: "32 страницы", paper: "Офсетная 80 г/м²", cover: "Мелованная 250 г/м² + матовая ламинация", color: "4+0" },
  { tab: "Брошюры", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/d2909581-bfe0-4dcf-8557-8f140c57a6e8.jpg", format: "210×297 мм (А4)", pages: "48 страниц, КБС", paper: "Мелованная 130 г/м²", cover: "Дизайнерская 300 г/м² + тиснение фольгой", color: "4+4 (CMYK)" },
  { tab: "Брошюры", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/0ca40e45-c634-4c66-a954-ea438f94f18f.jpg", format: "100×210 мм (Евро)", pages: "16 страниц, скоба", paper: "Мелованная матовая 100 г/м²", cover: "Мелованная 250 г/м² + матовый лак", color: "4+4 (CMYK)" },
  { tab: "Брошюры", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/e03f7d83-e6f5-404f-b62a-66598e7263d7.jpg", format: "148×210 мм (А5)", pages: "64 страницы, КБС", paper: "Офсетная 90 г/м²", cover: "Мелованная 300 г/м² + soft-touch ламинация", color: "4+0" },
  { tab: "Буклеты", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8983bdf0-dabf-4df3-91ba-208d3ad277b9.jpg", format: "210×297 мм, евро-сложение", pages: "6 полос", paper: "Мелованная глянцевая 150 г/м²", cover: "–", color: "4+4 (CMYK)" },
  { tab: "Буклеты", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/3dc6c535-1fc3-429f-84c2-9c5e65c2c7f1.jpg", format: "210×297 мм, книжное сложение", pages: "8 полос", paper: "Мелованная матовая 170 г/м²", cover: "–", color: "4+4 (CMYK)" },
  { tab: "Буклеты", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/ab9199c2-2ff9-4418-9a62-0e04cdbd22fb.jpg", format: "100×210 мм, гармошка", pages: "6 полос", paper: "Мелованная глянцевая 135 г/м²", cover: "–", color: "4+4 (CMYK)" },
  { tab: "Буклеты", img: "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg", format: "297×210 мм, двойное сложение", pages: "8 полос", paper: "Мелованная матовая 200 г/м²", cover: "–", color: "4+4 (CMYK)" },
];

const TICKER_ITEMS = [
  "ОФСЕТНАЯ ПЕЧАТЬ ОТ 500 ШТ",
  "СОБСТВЕННОЕ ПРОИЗВОДСТВО",
  "ДОСТАВКА ПО МОСКВЕ И МО",
  "28 ЛЕТ НА РЫНКЕ B2B",
  "ТЕСТОВЫЙ ТИРАЖ БЕСПЛАТНО",
  "СРОК ОТ 5 ДНЕЙ",
  "КОНТРОЛЬ КАЧЕСТВА НА КАЖДОМ ЭТАПЕ",
];

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Оборудование", href: "#equipment" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const FAQ_ITEMS = [
  {
    q: "Как вы гарантируете точность цвета?",
    a: "Делаем цветопробу бесплатно, вы подписываете эталонный лист. Работаем со спектрофотометром — отклонение по шкале CMYK не превышает 2 единиц Delta E.",
  },
  {
    q: "Что, если я ошибся в макете после старта печати?",
    a: "Останавливаем тираж, пересчитываем стоимость по факту. В 90% случаев успеваем исправить без потери сроков. Технолог заранее проверяет макет и предупреждает об ошибках.",
  },
  {
    q: "Можно ли приехать посмотреть производство до заказа?",
    a: "Да, это наш главный аргумент. Приезжайте — покажем цех, оборудование, образцы бумаги и отделок. Метро Кунцевская, 5 минут пешком. Звоните — договоримся о времени.",
  },
  {
    q: "Какой минимальный тираж для офсетной печати?",
    a: "Минимальный офсетный тираж — 500 штук. При таком тираже офсет уже дешевле цифровой печати по качеству изображения и стоимости экземпляра.",
  },
  {
    q: "Как быстро вы делаете тираж?",
    a: "Стандарт — 5–7 рабочих дней. Срочные тиражи принимаем при наличии свободной машины: звоните, скажем честно. Макет до 12:00 — тираж на следующий день в работе.",
  },
];

const QUIZ_STEPS = [
  {
    title: "Что хотите напечатать?", icon: "BookOpen",
    options: [
      { label: "Буклет", icon: "FileText", desc: "2–8 полос, сложение" },
      { label: "Брошюра", icon: "Book", desc: "8–96 страниц, скоба/КБС" },
      { label: "Каталог", icon: "BookOpen", desc: "48–300+ страниц" },
      { label: "Другое", icon: "MoreHorizontal", desc: "Журнал, листовка, постер" },
    ]
  },
  {
    title: "Какой примерный тираж?", icon: "Layers",
    options: [
      { label: "до 500 шт.", icon: "Package", desc: "Малый тираж" },
      { label: "500–1 000 шт.", icon: "Layers", desc: "Стандарт" },
      { label: "1 000–3 000 шт.", icon: "BarChart2", desc: "Средний тираж" },
      { label: "3 000–10 000 шт.", icon: "TrendingUp", desc: "Большой тираж" },
      { label: "от 10 000 шт.", icon: "Factory", desc: "Промышленный" },
    ]
  },
  {
    title: "Есть ли у вас готовый макет?", icon: "FileImage",
    options: [
      { label: "Да, всё готово", icon: "CheckCircle", desc: "PDF или AI/InDesign" },
      { label: "Нужна проверка технолога", icon: "Eye", desc: "Проверим вылеты и цвет" },
      { label: "Нет, нужна помощь с дизайном", icon: "Pencil", desc: "Поможем с разработкой" },
    ]
  },
  {
    title: "Какой срок сдачи?", icon: "Clock",
    options: [
      { label: "Срочно (1–2 дня)", icon: "Zap", desc: "Срочный тираж" },
      { label: "3–5 дней", icon: "Timer", desc: "Стандартный срок" },
      { label: "5–10 дней", icon: "Calendar", desc: "Без спешки" },
      { label: "Нужна лучшая цена", icon: "Tag", desc: "Срок не горит" },
    ]
  },
];

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);
  return result;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [portfolioTab, setPortfolioTab] = useState("Каталоги");

  const [cbOpen, setCbOpen] = useState(false);
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("");
  const [cbComment, setCbComment] = useState("");
  const [cbFile, setCbFile] = useState<File | null>(null);
  const [cbErrors, setCbErrors] = useState<{ name?: string; phone?: string }>({});
  const [cbDone, setCbDone] = useState(false);
  const cbFileRef = useRef<HTMLInputElement>(null);

  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>(["", "", "", ""]);
  const [quizContacts, setQuizContacts] = useState({ name: "", phone: "", email: "", comment: "" });
  const [quizErrors, setQuizErrors] = useState<{ name?: string; phone?: string }>({});
  const [quizDone, setQuizDone] = useState(false);
  const [quizContactStep, setQuizContactStep] = useState(false);

  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultComment, setConsultComment] = useState("");
  const [consultFile, setConsultFile] = useState<File | null>(null);
  const consultFileRef = useRef<HTMLInputElement>(null);
  const [consultErrors, setConsultErrors] = useState<{ name?: string; phone?: string }>({});
  const [consultDone, setConsultDone] = useState(false);
  const [consultAgree, setConsultAgree] = useState(false);

  const [cbAgree, setCbAgree] = useState(false);
  const [quizAgree, setQuizAgree] = useState(false);

  const [cardGallery, setCardGallery] = useState<{ title: string; imgs: string[] } | null>(null);
  const [cardGalleryIdx, setCardGalleryIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll2 = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll2);
    return () => window.removeEventListener("scroll", onScroll2);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    galleryTimer.current = setInterval(() => setGalleryIdx(i => (i + 1) % GALLERY_IMGS.length), 3500);
    return () => { if (galleryTimer.current) clearInterval(galleryTimer.current); };
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const openCb = () => {
    setCbName(""); setCbPhone(""); setCbComment(""); setCbFile(null);
    setCbErrors({}); setCbDone(false); setCbAgree(false); setCbOpen(true);
  };

  const openQuiz = (preselect?: string) => {
    const newA = ["", "", "", ""];
    if (preselect) newA[0] = preselect;
    setQuizAnswers(newA);
    setQuizStep(preselect ? 1 : 0);
    setQuizContactStep(false);
    setQuizDone(false);
    setQuizErrors({});
    setQuizOpen(true);
  };

  const quizNext = () => {
    if (quizStep < QUIZ_STEPS.length - 1) setQuizStep(s => s + 1);
    else setQuizContactStep(true);
  };

  const validateCb = () => {
    const e: { name?: string; phone?: string } = {};
    if (!cbName.trim()) e.name = "Введите имя";
    if (cbPhone.replace(/\D/g, "").length < 11) e.phone = "Введите корректный номер";
    setCbErrors(e);
    return !Object.keys(e).length;
  };

  const validateQuiz = () => {
    const e: { name?: string; phone?: string } = {};
    if (!quizContacts.name.trim()) e.name = "Введите имя";
    if (quizContacts.phone.replace(/\D/g, "").length < 11) e.phone = "Введите корректный номер";
    setQuizErrors(e);
    return !Object.keys(e).length;
  };

  const validateConsult = () => {
    const e: { name?: string; phone?: string } = {};
    if (!consultName.trim()) e.name = "Введите имя";
    if (consultPhone.replace(/\D/g, "").length < 11) e.phone = "Введите корректный номер";
    setConsultErrors(e);
    return !Object.keys(e).length;
  };

  const getEstimate = () => {
    const ranges: Record<string, Record<string, string>> = {
      "Буклет": { "до 500 шт.": "12 000–18 000 ₽", "500–1 000 шт.": "18 000–28 000 ₽", "1 000–3 000 шт.": "28 000–55 000 ₽", "3 000–10 000 шт.": "55 000–130 000 ₽", "от 10 000 шт.": "по запросу" },
      "Брошюра": { "до 500 шт.": "20 000–30 000 ₽", "500–1 000 шт.": "28 000–42 000 ₽", "1 000–3 000 шт.": "42 000–80 000 ₽", "3 000–10 000 шт.": "80 000–200 000 ₽", "от 10 000 шт.": "по запросу" },
      "Каталог": { "до 500 шт.": "от 80 000 ₽", "500–1 000 шт.": "от 120 000 ₽", "1 000–3 000 шт.": "от 200 000 ₽", "3 000–10 000 шт.": "индивидуально", "от 10 000 шт.": "индивидуально" },
    };
    return ranges[quizAnswers[0]]?.[quizAnswers[1]] ?? null;
  };

  const filteredPortfolio = PORTFOLIO_ITEMS.filter(p => p.tab === portfolioTab);

  const resetGalleryTimer = () => {
    if (galleryTimer.current) clearInterval(galleryTimer.current);
    galleryTimer.current = setInterval(() => setGalleryIdx(i => (i + 1) % GALLERY_IMGS.length), 3500);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--c-bg)", color: "var(--c-ink)" }}>

      {/* ========== HEADER ========== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={{ background: "#fff", borderBottom: "2px solid var(--c-green)" }}>

        {/* Top bar */}
        <div className="hidden md:block" style={{ background: "#1a3a6e", borderBottom: "none" }}>
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-1.5 flex items-center justify-between text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Icon name="MapPin" size={12} style={{ color: "var(--c-green)" }} /> г. Москва, ул. Горбунова, 2</span>
              <span className="flex items-center gap-1"><Icon name="Clock" size={12} style={{ color: "var(--c-green)" }} /> 9:00 – 18:00 МСК</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="mailto:info@pkzapad.ru" className="flex items-center gap-1 hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.75)" }}>
                <Icon name="Mail" size={12} style={{ color: "var(--c-green)" }} /> info@pkzapad.ru
              </a>
              <a href="tel:+74952521206" className="flex items-center gap-1 font-bold text-white">
                <Icon name="Phone" size={12} style={{ color: "var(--c-green)" }} /> 8 (495) 521-42-06
              </a>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: "var(--c-green)" }}></span>
                Звоните, мы работаем
              </span>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-3 lg:px-6 h-14 flex items-center gap-2">
          {/* Бургер — крайний левый на мобиле */}
          <button className="xl:hidden p-1.5 flex-shrink-0" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} style={{ color: "var(--c-ink)" }} />
          </button>

          {/* Logo + descriptor — по центру на мобиле */}
          <div className="flex items-center gap-2 flex-1 justify-center xl:justify-start xl:flex-none min-w-0">
            <img src={LOGO_IMG} alt="ПК Запад" className="h-9 w-auto object-contain flex-shrink-0" />
            <div className="hidden lg:block text-xs leading-snug" style={{ color: "var(--c-ink3)", maxWidth: 200 }}>
              Надёжная офсетная типография полного цикла в Москве.<br />
              <span style={{ color: "var(--c-blue)" }}>Работаем по всей России</span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-4 flex-1 justify-center">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-medium hover:text-blue-600 transition-colors whitespace-nowrap"
                style={{ color: "var(--c-ink2)" }}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Телефон — по центру на мобиле показываем отдельно, здесь только на средних экранах */}
            <a href="tel:+74952521206" className="hidden md:flex xl:hidden flex-col items-end">
              <span className="font-bold leading-tight" style={{ fontSize: "0.8rem", color: "var(--c-blue)" }}>8 (495) 521-42-06</span>
            </a>
            <button onClick={openCb} className="btn-green px-3 py-2 text-xs hidden md:block">Перезвоните мне</button>
          </div>
        </div>
        {/* Телефон по центру только на мобиле (< md) */}
        <div className="md:hidden flex justify-center pb-1.5" style={{ borderTop: "1px solid var(--c-bg2)" }}>
          <a href="tel:+74952521206" className="font-bold text-sm" style={{ color: "var(--c-blue)" }}>8 (495) 521-42-06</a>
        </div>

        {menuOpen && (
          <div className="xl:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: "var(--c-border)", background: "#fff" }}>
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left py-2.5 text-sm font-medium border-b" style={{ color: "var(--c-ink2)", borderColor: "var(--c-bg2)" }}>
                {l.label}
              </button>
            ))}
            <a href="tel:+74952521206" className="font-bold text-lg display-font pt-2" style={{ color: "var(--c-blue)" }}>8 (495) 521-42-06</a>
            <a href="mailto:info@pkzapad.ru" className="text-sm mb-2" style={{ color: "var(--c-ink2)" }}>info@pkzapad.ru</a>
            <button onClick={() => { setMenuOpen(false); openCb(); }} className="btn-green py-3 text-sm">Перезвоните мне</button>
          </div>
        )}
      </header>

      {/* TICKER */}
      <div className="overflow-hidden ticker-spacer" style={{ background: "#1a3a6e" }} id="ticker">
        <div className="flex py-2" style={{ width: "max-content", animation: "marquee 25s linear infinite" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-xs font-semibold mx-6 tracking-widest display-font whitespace-nowrap">
              {item} <span className="opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ========== HERO ========== */}
      <section id="hero" className="relative overflow-hidden" style={{ background: "var(--c-bg2)" }}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src={PRESS_IMG} alt="" className="w-full h-full object-cover opacity-[0.06]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,247,250,0.99) 55%, rgba(245,247,250,0.5))" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12 grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Left */}
          <div>
            <h1 className="display-font font-bold leading-tight mb-5" style={{ color: "var(--c-ink)" }}>
              <span className="block" style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)" }}>Напечатаем рекламную полиграфию</span>
              <span className="block" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}>
                от <span style={{ color: "var(--c-blue)" }}>500 шт.</span> с гарантией качества и сроков
              </span>
              <span className="block" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}>
                на <span style={{ color: "var(--c-blue)" }}>15%</span> ниже рынка за <span style={{ color: "var(--c-blue)" }}>5 дней</span>
              </span>
            </h1>

            <ul className="mb-5 flex flex-col gap-2">
              {[
                { text: <>Цветопроба <strong style={{ color: "var(--c-green-dark)" }}>бесплатно</strong></> },
                { text: <><strong style={{ color: "var(--c-green-dark)" }}>Доставка в день готовности</strong> собственной службой</> },
                { text: <>Стоимость печати <strong style={{ color: "var(--c-green-dark)" }}>ниже за счет своего производства</strong></> },
                { text: <>Во избежании брака <strong style={{ color: "var(--c-green-dark)" }}>печатаем на 2% выше</strong> требуемого тиража</> },
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--c-ink2)" }}>
                  <Icon name="CheckCircle" size={16} style={{ color: "var(--c-green)", marginTop: 1, flexShrink: 0 }} />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 px-4 py-2.5 mb-5 w-fit" style={{ background: "#fff0f0", border: "1px solid #ffb3b5", borderLeft: "3px solid var(--c-green)" }}>
              <Icon name="Gift" size={16} style={{ color: "var(--c-green)" }} />
              <span className="text-sm"><strong style={{ color: "var(--c-green)" }}>Скидка 10%</strong> на первый заказ для новых клиентов</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => openQuiz()} className="btn-green px-5 py-3.5 text-sm">
                Рассчитать стоимость за 2 минуты
              </button>
              <button onClick={openCb} className="btn-outline px-5 py-3.5 text-sm">
                Получить консультацию технолога
              </button>
            </div>
          </div>

          {/* Right — Gallery */}
          <div>
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
              {GALLERY_IMGS.map((g, i) => (
                <img key={i} src={g.url} alt={g.label}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === galleryIdx ? 1 : 0 }} />
              ))}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(to top, rgba(26,31,46,0.7) 0%, transparent 100%)" }}>
                <span className="text-white font-semibold display-font text-lg">{GALLERY_IMGS[galleryIdx].label}</span>
              </div>
              <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={() => { setGalleryIdx(i => (i - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length); resetGalleryTimer(); }}>
                <Icon name="ChevronLeft" size={16} style={{ color: "var(--c-ink)" }} />
              </button>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={() => { setGalleryIdx(i => (i + 1) % GALLERY_IMGS.length); resetGalleryTimer(); }}>
                <Icon name="ChevronRight" size={16} style={{ color: "var(--c-ink)" }} />
              </button>
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
              {GALLERY_IMGS.map((g, i) => (
                <button key={i} onClick={() => { setGalleryIdx(i); resetGalleryTimer(); }}
                  className="flex-shrink-0 rounded-lg overflow-hidden transition-all"
                  style={{ width: 52, height: 38, outline: i === galleryIdx ? "2.5px solid var(--c-blue)" : "2px solid transparent", outlineOffset: 1 }}>
                  <img src={g.url} alt={g.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 2: JTBD ========== */}
      <section id="jtbd" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Мы решаем ваши задачи</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Понимаем задачи бизнеса лучше, чем кто-либо
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "Zap", pain: "Нужно срочно к выставке, а предыдущий подрядчик подвёл", solution: "Перепечатаем тираж за 2–3 дня. Принимаем макет до 12:00 — на следующий день в работе. Своя доставка по Москве.", color: "#fff0f0", accent: "#dc2026" },
              { icon: "ShieldCheck", pain: "Боюсь получить брак, а тираж нужен точно ровный", solution: "Закладываем +2% к тиражу автоматически. Вы получаете заказанное количество или больше — без доплат.", color: "#f5f5f5", accent: "#111111" },
              { icon: "Eye", pain: "Хочу увидеть качество до оплаты всего тиража", solution: "Приезжайте к нам на производство — посмотрите образцы и утвердите тестовый тираж. Для новых клиентов бесплатно.", color: "#fff0f0", accent: "#dc2026" },
            ].map((c, i) => (
              <div key={i} className="card-light p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: c.color }}>
                  <Icon name={c.icon} size={20} style={{ color: c.accent }} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: c.accent }}>Задача клиента</div>
                <p className="font-semibold mb-3 italic" style={{ color: "var(--c-ink)", fontSize: 15 }}>«{c.pain}»</p>
                <div className="h-px mb-3" style={{ background: "var(--c-border)" }} />
                <div className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: "var(--c-blue)" }}>Решение</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{c.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCK 3: УТП ========== */}
      <section id="advantages" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="section-tag mb-3">Почему нам доверяют 28 лет</div>
            <h2 className="display-font font-bold mb-7" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Клиенты возвращаются,<br />потому что мы не подводим
            </h2>
            <div className="flex flex-col gap-5 mb-8">
              {[
                { icon: "TrendingDown", title: "Цена ниже рынка", desc: "Экономия до 20% за счёт своего производства без посредников.", highlight: "−20% к цене" },
                { icon: "Eye", title: "Живой контроль", desc: "Приезжайте в любой момент — смотрите, как режется, фальцуется и ламинируется ваш тираж.", highlight: "Видите всё сами" },
                { icon: "Truck", title: "Своя доставка", desc: "Грузовики типографии, а не курьерские службы. Ответственность за сохранность — наша.", highlight: "Без посредников" },
                { icon: "ShieldCheck", title: "Брак — наша проблема", desc: "Печатаем на 2% больше. Перерасход по бумаге вам не выставляем.", highlight: "+2% бесплатно" },
              ].map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                    <Icon name={a.icon} size={18} style={{ color: "var(--c-blue)" }} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{a.title}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#f0fdf4", color: "var(--c-green-dark)" }}>{a.highlight}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6" style={{ background: "var(--c-blue)" }}>
              <h3 className="display-font font-bold text-xl text-white mb-1">Консультация технолога</h3>
              <p className="text-sm mb-4 text-white opacity-90">Опишите задачу — подберём бумагу, отделку и сэкономим до 20% на материалах.</p>
              <button onClick={openCb} className="btn-green px-6 py-3 text-sm">Получить консультацию →</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <img src={PRESS_IMG} alt="Производство" className="rounded-2xl col-span-2 w-full object-cover" style={{ height: 210 }} />
            <img src={MATERIALS_IMG} alt="Материалы" className="rounded-2xl w-full object-cover" style={{ height: 155 }} />
            <img src={CATALOGS_IMG} alt="Готовые изделия" className="rounded-2xl w-full object-cover" style={{ height: 155 }} />
            <div className="col-span-2 grid grid-cols-4 gap-2">
              {[{ val: "28", sub: "лет на рынке" }, { val: "500+", sub: "клиентов" }, { val: "5 000+", sub: "тиражей" }, { val: "94%", sub: "возвращаются" }].map((s, i) => (
                <div key={i} className="text-center rounded-xl py-3" style={{ background: "#fff", border: "1px solid var(--c-border)" }}>
                  <div className="display-font font-bold text-base" style={{ color: "var(--c-blue)" }}>{s.val}</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 4: УСЛУГИ ========== */}
      <section id="services" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Продукция</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Работаем с тиражами от 500 штук
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                img: MATERIALS_IMG, title: "Буклеты",
                specs: ["Форматы: A4, A5, Евро", "Бумага: 130–350 г/м²", "Сложение: книжка, гармошка"],
                type: "Буклет",
                galleryImgs: [
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8983bdf0-dabf-4df3-91ba-208d3ad277b9.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/3dc6c535-1fc3-429f-84c2-9c5e65c2c7f1.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/0ca40e45-c634-4c66-a954-ea438f94f18f.jpg",
                ]
              },
              {
                img: CATALOGS_IMG, title: "Брошюры",
                specs: ["Скрепка или КБС", "8–96 страниц", "Обложка 300 г/м²"],
                type: "Брошюра",
                galleryImgs: [
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/7c832436-6b37-4a2f-a01e-1517d72b08fd.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/8c0d5418-a0c0-4b5b-8f9c-e3df5fa6130e.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg",
                ]
              },
              {
                img: PRESS_IMG, title: "Каталоги",
                specs: ["Твёрдая и мягкая обложка", "До 300+ страниц", "Лак, ламинация, тиснение"],
                type: "Каталог",
                galleryImgs: [
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/e03f7d83-e6f5-404f-b62a-66598e7263d7.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/ab9199c2-2ff9-4418-9a62-0e04cdbd22fb.jpg",
                  "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/d2909581-bfe0-4dcf-8557-8f140c57a6e8.jpg",
                ]
              },
            ].map((s, i) => (
              <div key={i} className="card-light overflow-hidden">
                <div className="relative overflow-hidden cursor-pointer" style={{ height: 180 }}
                  onClick={() => { setCardGallery({ title: s.title, imgs: s.galleryImgs }); setCardGalleryIdx(0); }}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,31,46,0.65) 0%, transparent 60%)" }} />
                  <span className="absolute bottom-3 left-4 display-font font-bold text-xl text-white">{s.title}</span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full" style={{ background: "rgba(220,32,38,0.88)" }}>
                    <Icon name="Images" size={12} /> Примеры
                  </span>
                </div>
                <div className="p-5">
                  <ul className="mb-4 space-y-1">
                    {s.specs.map((sp, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "var(--c-ink2)" }}>
                        <Icon name="Check" size={12} style={{ color: "var(--c-green)" }} /> {sp}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => openQuiz(s.type)} className="btn-blue w-full py-3 text-sm">
                    Рассчитать точную стоимость
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCK 5: КЕЙС ========== */}
      <section id="case" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Кейс</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Как мы спасли выставку федерального бренда
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="card-light p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name="Trophy" size={18} style={{ color: "var(--c-blue)" }} />
                </div>
                <span className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>Федеральная сеть общепита · 2023 год</span>
              </div>
              <blockquote className="text-sm leading-relaxed mb-5 italic" style={{ color: "var(--c-ink2)", borderLeft: "3px solid var(--c-blue)", paddingLeft: 14 }}>
                «Федеральный клиент обратился к нам за 4 дня до старта промо-кампании. Нужно было 15 000 буклетов
                и 5 000 каталогов. Мы за 1 день исправили ошибки в макете, за 2 дня напечатали тираж и доставили
                своим транспортом до каждого ресторана. Итог: акция запущена без задержек.»
              </blockquote>
              <div className="grid grid-cols-3 gap-2">
                {[{ val: "4 дня", sub: "до дедлайна" }, { val: "20 000", sub: "экземпляров" }, { val: "0 ₽", sub: "штрафов" }].map((s, i) => (
                  <div key={i} className="text-center rounded-xl py-3" style={{ background: "var(--c-bg2)" }}>
                    <div className="display-font font-bold text-base" style={{ color: "var(--c-blue)" }}>{s.val}</div>
                    <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <img src={MATERIALS_IMG} alt="Печать тиража" className="rounded-2xl w-full object-cover" style={{ height: 185 }} />
              <div className="card-light p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#fef3c7" }}>
                  <Icon name="Star" size={18} style={{ color: "#d97706" }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>Грамота «Лучший подрядчик»</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>За соблюдение сроков и качество печати</div>
                </div>
              </div>
              <button onClick={openCb} className="btn-blue py-3.5 text-sm">Обсудить мою задачу →</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ПАРТНЁРЫ ========== */}
      <section className="py-6 overflow-hidden" style={{ background: "#fff", borderTop: "1px solid var(--c-border)", borderBottom: "1px solid var(--c-border)" }}>
        <div className="text-center mb-4">
          <div className="section-tag">Нам доверяют</div>
        </div>
        <div className="relative">
          <div className="flex items-center" style={{ width: "max-content", animation: "marquee 35s linear infinite" }}>
            {[...Array(2)].map((_, rep) => (
              [
                { name: "АШАН", color: "#111" },
                { name: "СБЕР", color: "#111" },
                { name: "М.ВИДЕО", color: "#dc2026" },
                { name: "ЛЕНТА", color: "#dc2026" },
                { name: "РОСТЕЛЕКОМ", color: "#111" },
                { name: "ЭВАЛАР", color: "#111" },
                { name: "РЖД", color: "#dc2026" },
                { name: "АЭРОФЛОТ", color: "#111" },
                { name: "ГАЗПРОМ", color: "#111" },
                { name: "ВТБ", color: "#dc2026" },
              ].map((p, i) => (
                <div key={`${rep}-${i}`} className="flex-shrink-0 mx-7 flex items-center justify-center"
                  style={{ height: 44 }}>
                  <span className="font-bold tracking-widest" style={{ fontSize: "1.05rem", color: p.color, opacity: 0.7 }}>{p.name}</span>
                </div>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* ========== ПОРТФОЛИО ========== */}
      <section id="portfolio" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-7 text-center">
            <div className="section-tag mb-3">Портфолио</div>
            <h2 className="display-font font-bold mb-2" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Примеры нашей <span style={{ color: "var(--c-blue)" }}>печатной продукции</span>
            </h2>
            <p className="text-sm mb-5" style={{ color: "var(--c-ink3)" }}>Реальные работы с указанием технических характеристик</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {PORTFOLIO_TABS.map(tab => (
                <button key={tab} onClick={() => setPortfolioTab(tab)}
                  className={`px-5 py-2.5 text-sm rounded-lg font-semibold transition-all ${portfolioTab === tab ? "btn-blue" : "btn-outline"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filteredPortfolio.map((item, i) => (
              <div key={i} className="card-light overflow-hidden">
                <div className="overflow-hidden" style={{ height: 250 }}>
                  <img src={item.img} alt={item.tab} className="w-full h-full object-cover" />
                </div>
                <div className="p-5" style={{ background: "var(--c-blue)" }}>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                    {[["Формат", item.format], ["Объём", item.pages], ["Бумага", item.paper], ["Цветность", item.color], ...(item.cover !== "–" ? [["Обложка", item.cover]] : [])].map(([label, val], j) => (
                      <div key={j} className="text-xs">
                        <span style={{ color: "rgba(255,255,255,0.55)" }}>{label}: </span>
                        <span className="text-white font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ========== ПРОЦЕСС ========== */}
      <section id="process" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Как мы работаем</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              4 шага до готового тиража
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", icon: "FileText", title: "Заявка", desc: "Оставляете заявку — менеджер связывается в течение 1 часа." },
              { num: "02", icon: "Pencil", title: "Макет и проверка", desc: "Технолог проверяет вылеты, поля, цветовую модель. Если нет макета — поможем." },
              { num: "03", icon: "Eye", title: "Тестовый тираж", desc: "Для первых заказов — бесплатно. Приедем или доставим курьером." },
              { num: "04", icon: "Truck", title: "Печать и доставка", desc: "Получаете тираж +2% к заказанному количеству. Доставка в день готовности собственной службой." },
            ].map((s, i) => (
              <div key={i} className="card-light p-5 relative">
                <div className="display-font font-bold text-4xl mb-3" style={{ color: "var(--c-bg3)", lineHeight: 1 }}>{s.num}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={s.icon} size={16} style={{ color: "var(--c-blue)" }} />
                </div>
                <h3 className="display-font font-bold text-base mb-1.5" style={{ color: "var(--c-ink)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{s.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10"><Icon name="ChevronRight" size={18} style={{ color: "var(--c-blue)" }} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ОБОРУДОВАНИЕ ========== */}
      <section id="equipment" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="section-tag mb-3">Производство</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Оборудование, которым мы гордимся
            </h2>
          </div>

          {/* Video placeholder */}
          <div className="rounded-2xl overflow-hidden mb-8 relative w-full" style={{ aspectRatio: "16/7", background: "#1a1f2e" }}>
            <img src={PRESS_IMG} alt="Видео производства" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                style={{ background: "rgba(255,255,255,0.95)", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                <Icon name="Play" size={26} style={{ color: "var(--c-blue)", marginLeft: 3 }} />
              </button>
              <span className="text-white font-semibold display-font tracking-wide text-sm md:text-base">Экскурсия по производству · 3 мин</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: "Printer", title: "Heidelberg", desc: "Флагманские офсетные машины. Скорость 15 000 листов/час. Есть резервный станок." },
              { icon: "BookOpen", title: "КБС и скоба", desc: "Полная линия для клеевого и скобяного переплёта. Брошюры от 8 до 96 страниц." },
              { icon: "Scissors", title: "Резка и фальцовка", desc: "Программируемые резаки до 0.1 мм точности. Автоматическая фальцовка." },
              { icon: "Gauge", title: "Контроль цвета", desc: "Спектрофотометр Delta E. Цветопроба перед каждым тиражом — бесплатно." },
            ].map((e, i) => (
              <div key={i} className="card-light p-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={e.icon} size={18} style={{ color: "var(--c-blue)" }} />
                </div>
                <h3 className="display-font font-bold text-base mb-1.5" style={{ color: "var(--c-ink)" }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{e.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-5 flex flex-col sm:flex-row items-center gap-4" style={{ background: "#1a3a6e" }}>
            <Icon name="Shield" size={28} style={{ color: "rgba(255,255,255,0.8)", flexShrink: 0 }} />
            <div>
              <div className="font-bold text-white text-sm mb-0.5">Резервное оборудование</div>
              <p className="text-white text-sm opacity-90">В случае поломки основного станка — сроки не сдвинутся ни на день. Это наша ответственность.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ОТЗЫВЫ ========== */}
      <section id="reviews" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Отзывы клиентов</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Что говорят наши клиенты
            </h2>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-xl" style={{ color: "#f59e0b" }}>★</span>)}
              </div>
              <span className="font-bold text-lg display-font" style={{ color: "var(--c-ink)" }}>4.9</span>
              <span className="text-sm" style={{ color: "var(--c-ink3)" }}>· 47 отзывов на Яндекс Картах</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Алексей М.", role: "Маркетинг-директор, FMCG", date: "март 2025", rating: 5, text: "Заказывали каталоги срочно — за 3 дня до выставки. Сделали без вопросов, качество идеальное. Теперь работаем только с ними." },
              { name: "Светлана К.", role: "Дизайнер, агентство", date: "февраль 2025", rating: 5, text: "Технолог сам нашёл ошибку в макете и предупредил. Сэкономили нас от брака. Вот это сервис! Рекомендую всем коллегам." },
              { name: "Дмитрий Ф.", role: "Генеральный директор, сеть ресторанов", date: "январь 2025", rating: 5, text: "Печатают меню для всех наших точек уже 2 года. Стабильное качество, привозят день в день. Ни разу не подводили." },
              { name: "Ольга Н.", role: "Менеджер по закупкам", date: "декабрь 2024", rating: 5, text: "Цена реально ниже рынка. Сравнивала 5 типографий — выбрала их. Буклеты получились отличные, клиенты хвалят." },
              { name: "Иван П.", role: "Владелец бизнеса", date: "ноябрь 2024", rating: 5, text: "Тестовый тираж бесплатно — это решило все сомнения. Цвет точный, бумага плотная. Однозначно продолжим сотрудничество." },
              { name: "Екатерина Л.", role: "PR-менеджер", date: "октябрь 2024", rating: 4, text: "Хорошая типография. Сделали годовой отчёт для акционеров. Небольшая задержка с согласованием цвета, но итог превзошёл ожидания." },
            ].map((r, i) => (
              <div key={i} className="card-light p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center display-font font-bold text-base text-white flex-shrink-0"
                      style={{ background: "#1a3a6e" }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{r.name}</div>
                      <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{r.role}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-xs" style={{ color: "var(--c-ink3)" }}>{r.date}</div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= r.rating ? "#f59e0b" : "#e2e8f0", fontSize: 14 }}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>«{r.text}»</p>
                <div className="mt-auto pt-2 border-t flex items-center gap-1.5" style={{ borderColor: "var(--c-border)" }}>
                  <span className="text-xs font-semibold" style={{ color: "var(--c-blue)" }}>Яндекс Карты</span>
                  <span className="text-xs" style={{ color: "var(--c-ink3)" }}>· проверенный отзыв</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">FAQ</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.45rem, 3vw, 2.3rem)", color: "var(--c-ink)" }}>
              Ответы на ключевые вопросы клиентов
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
                <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  style={{ background: openFaq === i ? "var(--c-blue-light)" : "#fff" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "var(--c-blue)", flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 pt-3 text-sm leading-relaxed" style={{ color: "var(--c-ink2)", borderTop: "1px solid var(--c-border)" }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== КОНТАКТЫ ========== */}
      <section id="contacts" className="py-10 lg:py-14 px-4 lg:px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="section-tag mb-3">Консультация</div>
            <h2 className="display-font font-bold mb-3" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", color: "var(--c-ink)" }}>
              Получите консультацию технолога
            </h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>
              Поможем сэкономить до 20% на бумаге — подберём аналог, который не уступает по плотности и белизне.
            </p>
            {consultDone ? (
              <div className="card-light p-8 text-center">
                <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3" style={{ background: "#fff0f0" }}>
                  <Icon name="CheckCircle" size={32} style={{ color: "var(--c-green)" }} />
                </div>
                <h3 className="display-font font-bold text-xl mb-1.5" style={{ color: "var(--c-ink)" }}>Спасибо за заявку!</h3>
                <p className="text-sm" style={{ color: "var(--c-ink2)" }}>Менеджер перезвонит в рабочее время (9–18 будни) в течение 1 часа.</p>
              </div>
            ) : (
              <div className="card-light p-6">
                <div className="flex flex-col gap-3">
                  <div>
                    <input className={`inp${consultErrors.name ? " border-red-400" : ""}`} placeholder="Ваше имя, например Иван"
                      value={consultName} onChange={e => { setConsultName(e.target.value); setConsultErrors(er => ({...er, name: undefined})); }} />
                    {consultErrors.name && <p className="text-xs text-red-500 mt-1">{consultErrors.name}</p>}
                  </div>
                  <div>
                    <input className={`inp${consultErrors.phone ? " border-red-400" : ""}`} placeholder="+7 (___) ___-__-__"
                      value={consultPhone} onChange={e => { setConsultPhone(formatPhone(e.target.value)); setConsultErrors(er => ({...er, phone: undefined})); }} />
                    {consultErrors.phone && <p className="text-xs text-red-500 mt-1">{consultErrors.phone}</p>}
                  </div>
                  <textarea className="inp" rows={2} placeholder="Комментарий (необязательно)"
                    value={consultComment} onChange={e => setConsultComment(e.target.value)} />
                  <div>
                    <button type="button" onClick={() => consultFileRef.current?.click()}
                      className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border transition-colors"
                      style={{ borderColor: consultFile ? "var(--c-blue)" : "var(--c-border)", color: consultFile ? "var(--c-blue)" : "var(--c-ink3)", background: consultFile ? "var(--c-blue-light)" : "#fafafa" }}>
                      <Icon name="Paperclip" size={14} />
                      {consultFile ? consultFile.name : "Прикрепить файл (макет, ТЗ)"}
                    </button>
                    <input ref={consultFileRef} type="file" className="hidden" onChange={e => setConsultFile(e.target.files?.[0] || null)} />
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={consultAgree} onChange={e => setConsultAgree(e.target.checked)}
                      className="mt-0.5 flex-shrink-0 accent-blue-600" />
                    <span className="text-xs" style={{ color: "var(--c-ink3)" }}>
                      Соглашаюсь с{" "}
                      <span className="underline cursor-pointer" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
                    </span>
                  </label>
                  <button className="btn-green py-3.5 text-sm" style={{ opacity: consultAgree ? 1 : 0.5 }}
                    onClick={() => { if (consultAgree && validateConsult()) setConsultDone(true); }}>
                    Перезвонить в рабочее время →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: "Phone", title: "Телефон", val: "8 (495) 521-42-06", sub: "Пн–Пт 9:00–18:00", href: "tel:+74952521206" },
              { icon: "Mail", title: "Email", val: "info@pkzapad.ru", sub: "Ответим в течение 2 часов", href: "mailto:info@pkzapad.ru" },
              { icon: "MapPin", title: "Адрес производства", val: "г. Москва, ул. Горбунова, 2", sub: "Метро Кунцевская, 5 мин пешком", href: "#" },
              { icon: "Clock", title: "Режим работы", val: "Пн–Пт: 9:00–18:00", sub: "Суббота: по договорённости", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="card-light flex gap-3 p-4 items-start" style={{ textDecoration: "none" }}>
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={c.icon} size={16} style={{ color: "var(--c-blue)" }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--c-ink3)" }}>{c.title}</div>
                  <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{c.val}</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{c.sub}</div>
                </div>
              </a>
            ))}
            <div className="card-light p-4 flex items-center gap-3" style={{ borderColor: "var(--c-green)", borderWidth: "1.5px" }}>
              <Icon name="Eye" size={18} style={{ color: "var(--c-green)" }} />
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>Можно приехать и посмотреть</div>
                <div className="text-xs" style={{ color: "var(--c-ink3)" }}>Образцы бумаги, отделок, цветопробы — всё на месте. Бесплатно.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ВИДЖЕТ: КОНСУЛЬТАЦИЯ + НАВЕРХ ========== */}
      <div className="fixed right-4 bottom-6 z-[100] flex flex-col gap-2 items-end">
        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:-translate-y-1"
            style={{ background: "var(--c-blue)", color: "#fff" }}>
            <Icon name="ChevronUp" size={20} />
          </button>
        )}
        <button onClick={openCb}
          className="flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-semibold text-sm transition-all hover:-translate-y-1"
          style={{ background: "var(--c-green)", color: "#fff", boxShadow: "0 6px 24px rgba(45,189,78,0.4)" }}>
          <Icon name="MessageCircle" size={16} />
          <span className="hidden sm:inline">Получить консультацию</span>
        </button>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="py-4 px-4 lg:px-6" style={{ background: "#1a3a6e", borderTop: "4px solid var(--c-green)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026 ПК Запад · Все права защищены</div>
        </div>
      </footer>

      {/* ========== MODAL: ОБРАТНАЯ СВЯЗЬ ========== */}
      {cbOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={e => { if (e.target === e.currentTarget) { setCbOpen(false); setCbDone(false); } }}>
          <div className="card-light w-full max-w-md relative" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.22)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--c-border)" }}>
              <span className="display-font font-bold text-lg" style={{ color: "var(--c-ink)" }}>
                {cbDone ? "Заявка принята" : "Обратная связь"}
              </span>
              <button onClick={() => { setCbOpen(false); setCbDone(false); }}>
                <Icon name="X" size={18} style={{ color: "var(--c-ink3)" }} />
              </button>
            </div>
            <div className="px-6 py-5">
              {cbDone ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3" style={{ background: "#fff0f0" }}>
                    <Icon name="CheckCircle" size={32} style={{ color: "var(--c-green)" }} />
                  </div>
                  <h3 className="display-font font-bold text-xl mb-2" style={{ color: "var(--c-ink)" }}>Спасибо за заявку!</h3>
                  <p className="text-sm" style={{ color: "var(--c-ink2)" }}>Ваша заявка принята. Менеджер свяжется в течение 1 часа (9–18 будни).</p>
                </div>
              ) : (
                <>
                  <p className="text-sm mb-4" style={{ color: "var(--c-ink2)" }}>
                    Оставьте контакты — ответим на любой вопрос о тираже.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <input className={`inp${cbErrors.name ? " border-red-400" : ""}`}
                        placeholder="Ваше имя, например Иван" value={cbName}
                        onChange={e => { setCbName(e.target.value); setCbErrors(er => ({...er, name: undefined})); }} />
                      {cbErrors.name && <p className="text-xs text-red-500 mt-1">{cbErrors.name}</p>}
                    </div>
                    <div>
                      <input className={`inp${cbErrors.phone ? " border-red-400" : ""}`}
                        placeholder="+7 (___) ___-__-__" value={cbPhone}
                        onChange={e => { setCbPhone(formatPhone(e.target.value)); setCbErrors(er => ({...er, phone: undefined})); }} />
                      {cbErrors.phone && <p className="text-xs text-red-500 mt-1">{cbErrors.phone}</p>}
                    </div>
                    <textarea className="inp" rows={2} placeholder="Комментарий (необязательно)"
                      value={cbComment} onChange={e => setCbComment(e.target.value)} />
                    <div>
                      <button type="button" onClick={() => cbFileRef.current?.click()}
                        className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg border transition-colors"
                        style={{ borderColor: cbFile ? "var(--c-blue)" : "var(--c-border)", color: cbFile ? "var(--c-blue)" : "var(--c-ink3)", background: cbFile ? "var(--c-blue-light)" : "#fafafa" }}>
                        <Icon name="Paperclip" size={14} />
                        {cbFile ? cbFile.name : "Прикрепить файл (макет, ТЗ)"}
                      </button>
                      <input ref={cbFileRef} type="file" className="hidden" onChange={e => setCbFile(e.target.files?.[0] || null)} />
                    </div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={cbAgree} onChange={e => setCbAgree(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 accent-blue-600" />
                      <span className="text-xs" style={{ color: "var(--c-ink3)" }}>
                        Соглашаюсь с{" "}
                        <span className="underline cursor-pointer" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
                      </span>
                    </label>
                    <button className="btn-green py-3.5 text-sm" style={{ opacity: cbAgree ? 1 : 0.5 }}
                      onClick={() => { if (cbAgree && validateCb()) setCbDone(true); }}>
                      Отправить заявку →
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: КВИЗ ========== */}
      {quizOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={e => { if (e.target === e.currentTarget) setQuizOpen(false); }}>
          <div className="card-light w-full max-w-lg relative" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.22)", maxHeight: "92vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--c-border)" }}>
              <span className="display-font font-bold text-base" style={{ color: "var(--c-ink)" }}>
                {quizDone ? "Заявка принята" : quizContactStep ? "Ваши контакты" : `Шаг ${quizStep + 1} из ${QUIZ_STEPS.length}`}
              </span>
              <button onClick={() => setQuizOpen(false)}><Icon name="X" size={18} style={{ color: "var(--c-ink3)" }} /></button>
            </div>
            <div className="px-6 py-5">
              {quizDone ? (
                <div className="py-2">
                  <div className="text-center mb-5">
                    <div className="w-14 h-14 flex items-center justify-center mx-auto mb-3" style={{ background: "#fff0f0" }}>
                      <Icon name="CheckCircle" size={32} style={{ color: "var(--c-green)" }} />
                    </div>
                    <h3 className="display-font font-bold text-xl mb-2" style={{ color: "var(--c-ink)" }}>Спасибо за заявку!</h3>
                    <p className="text-sm" style={{ color: "var(--c-ink2)" }}>
                      Ваша заявка на печать принята. Менеджер свяжется с вами в течение <strong>1 рабочего часа</strong> (с 9 до 18 в будни).
                    </p>
                  </div>
                  <div className="rounded-xl p-4 mb-4" style={{ background: "var(--c-bg2)" }}>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--c-blue)" }}>Что вы получите:</div>
                    <ul className="flex flex-col gap-2">
                      {[
                        "Точный расчёт в таблице с разбивкой по бумаге, краске и послепечатке",
                        "Контрольные листы для подписи (опционально)",
                        "Предложение о бесплатном тестовом тираже (для новых клиентов)",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--c-ink2)" }}>
                          <Icon name="Check" size={14} style={{ color: "var(--c-green)", marginTop: 2, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-center mb-4" style={{ color: "var(--c-ink3)" }}>
                    А пока посмотрите, как работает наше оборудование —{" "}
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--c-blue)" }}>
                      короткое видео до 30 сек
                    </a>
                  </p>
                  <div className="flex gap-3">
                    <button className="btn-blue flex-1 py-3 text-sm" onClick={() => setQuizOpen(false)}>Закрыть</button>
                    <a href="tel:+74952521206" className="btn-green flex-1 py-3 text-sm flex items-center justify-center gap-1.5">
                      <Icon name="Phone" size={13} /> Позвонить
                    </a>
                  </div>
                </div>
              ) : quizContactStep ? (
                <div>
                  <p className="text-sm mb-4" style={{ color: "var(--c-ink2)" }}>
                    Почти готово! Оставьте контакты и мы пришлём точный расчёт + закрепим скидку 10% за вашим первым заказом.
                  </p>
                  <div className="flex flex-col gap-3">
                    <div>
                      <input className={`inp${quizErrors.name ? " border-red-400" : ""}`}
                        placeholder="Ваше имя, например Иван *"
                        value={quizContacts.name} onChange={e => { setQuizContacts({...quizContacts, name: e.target.value}); setQuizErrors(er => ({...er, name: undefined})); }} />
                      {quizErrors.name && <p className="text-xs text-red-500 mt-1">{quizErrors.name}</p>}
                    </div>
                    <div>
                      <input className={`inp${quizErrors.phone ? " border-red-400" : ""}`}
                        placeholder="+7 (___) ___-__-__ *"
                        value={quizContacts.phone} onChange={e => { setQuizContacts({...quizContacts, phone: formatPhone(e.target.value)}); setQuizErrors(er => ({...er, phone: undefined})); }} />
                      {quizErrors.phone && <p className="text-xs text-red-500 mt-1">{quizErrors.phone}</p>}
                    </div>
                    <input className="inp" placeholder="Email (необязательно)" value={quizContacts.email} onChange={e => setQuizContacts({...quizContacts, email: e.target.value})} />
                    <textarea className="inp" rows={2} placeholder="Комментарий (необязательно)" value={quizContacts.comment} onChange={e => setQuizContacts({...quizContacts, comment: e.target.value})} />
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" checked={quizAgree} onChange={e => setQuizAgree(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 accent-blue-600" />
                      <span className="text-xs" style={{ color: "var(--c-ink3)" }}>
                        Соглашаюсь с{" "}
                        <span className="underline" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
                      </span>
                    </label>
                    <button className="btn-green py-3.5 text-sm" style={{ opacity: quizAgree ? 1 : 0.5 }}
                      onClick={() => { if (quizAgree && validateQuiz()) setQuizDone(true); }}>
                      Получить расчёт + скидку 10% →
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Шкала прогресса */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: "var(--c-blue)" }}>
                        Шаг {quizStep + 1} из {QUIZ_STEPS.length}
                      </span>
                      <span className="text-xs font-bold" style={{ color: "var(--c-blue)" }}>
                        {Math.round(((quizStep) / QUIZ_STEPS.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--c-bg3)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${((quizStep) / QUIZ_STEPS.length) * 100}%`, background: "var(--c-blue)" }} />
                    </div>
                  </div>
                  {/* Иконки шагов */}
                  <div className="flex gap-2 mb-4 justify-center">
                    {QUIZ_STEPS.map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                          style={{ background: i < quizStep ? "var(--c-green)" : i === quizStep ? "var(--c-blue)" : "var(--c-bg3)" }}>
                          <Icon name={step.icon} size={14} style={{ color: i <= quizStep ? "#fff" : "var(--c-ink3)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <h3 className="font-bold text-base mb-3" style={{ color: "var(--c-ink)" }}>{QUIZ_STEPS[quizStep].title}</h3>
                  <div className="flex flex-col gap-2 mb-5">
                    {QUIZ_STEPS[quizStep].options.map(opt => (
                      <button key={opt.label}
                        className={`quiz-option${quizAnswers[quizStep] === opt.label ? " selected" : ""}`}
                        onClick={() => { const a = [...quizAnswers]; a[quizStep] = opt.label; setQuizAnswers(a); }}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                            style={{ background: quizAnswers[quizStep] === opt.label ? "var(--c-blue)" : "var(--c-bg2)" }}>
                            <Icon name={opt.icon} size={15} style={{ color: quizAnswers[quizStep] === opt.label ? "#fff" : "var(--c-ink3)" }} />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-sm" style={{ color: "var(--c-ink)" }}>{opt.label}</div>
                            <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{opt.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {quizStep > 0 && <button className="btn-outline px-4 py-2.5 text-sm" onClick={() => setQuizStep(s => s - 1)}>← Назад</button>}
                    <button className="btn-blue px-6 py-2.5 text-sm ml-auto"
                      disabled={!quizAnswers[quizStep]} style={{ opacity: quizAnswers[quizStep] ? 1 : 0.4 }}
                      onClick={quizNext}>
                      {quizStep < QUIZ_STEPS.length - 1 ? "Далее →" : "Узнать стоимость →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== MODAL: ГАЛЕРЕЯ КАРТОЧЕК ========== */}
      {cardGallery && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={e => { if (e.target === e.currentTarget) setCardGallery(null); }}>
          <div className="relative w-full max-w-xl rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "var(--c-border)" }}>
              <span className="display-font font-bold text-lg" style={{ color: "var(--c-ink)" }}>Примеры: {cardGallery.title}</span>
              <button onClick={() => setCardGallery(null)}><Icon name="X" size={18} style={{ color: "var(--c-ink3)" }} /></button>
            </div>
            <div className="relative" style={{ aspectRatio: "4/3" }}>
              {cardGallery.imgs.map((url, i) => (
                <img key={i} src={url} alt="" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: i === cardGalleryIdx ? 1 : 0 }} />
              ))}
              <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={() => setCardGalleryIdx(i => (i - 1 + cardGallery.imgs.length) % cardGallery.imgs.length)}>
                <Icon name="ChevronLeft" size={18} style={{ color: "var(--c-ink)" }} />
              </button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={() => setCardGalleryIdx(i => (i + 1) % cardGallery.imgs.length)}>
                <Icon name="ChevronRight" size={18} style={{ color: "var(--c-ink)" }} />
              </button>
            </div>
            <div className="flex gap-2 justify-center p-3">
              {cardGallery.imgs.map((url, i) => (
                <button key={i} onClick={() => setCardGalleryIdx(i)}
                  className="rounded-lg overflow-hidden flex-shrink-0"
                  style={{ width: 58, height: 42, outline: i === cardGalleryIdx ? "2.5px solid var(--c-blue)" : "2px solid transparent" }}>
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="px-5 pb-4">
              <button onClick={() => { setCardGallery(null); openQuiz(cardGallery.title.slice(0, -1)); }}
                className="btn-blue w-full py-3 text-sm">
                Рассчитать стоимость {cardGallery.title.toLowerCase()} →
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}