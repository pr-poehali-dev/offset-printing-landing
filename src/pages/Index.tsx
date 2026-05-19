import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PRESS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/d2909581-bfe0-4dcf-8557-8f140c57a6e8.jpg";
const MATERIALS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/0ca40e45-c634-4c66-a954-ea438f94f18f.jpg";
const CATALOGS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg";
const LOGO_IMG = "https://pkzapad.ru/wp-content/themes/pkzapad/img/logo.png";

const TICKER_ITEMS = [
  "ОФСЕТНАЯ ПЕЧАТЬ ОТ 500 ШТ",
  "СОБСТВЕННОЕ ПРОИЗВОДСТВО",
  "ДОСТАВКА ПО МОСКВЕ И МО",
  "28 ЛЕТ НА РЫНКЕ B2B",
  "ТЕСТОВЫЙ ТИРАЖ БЕСПЛАТНО",
  "БРАК +2% В ПОДАРОК",
  "СРОК ОТ 2 ДНЕЙ",
  "КОНТРОЛЬ КАЧЕСТВА НА КАЖДОМ ЛИСТЕ",
];

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Оборудование", href: "#equipment" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const PRICE_TABLE = [
  { product: "Буклет А4, 4+4, меловка 150 г/м²", p500: "12 500 ₽", p1000: "18 900 ₽", p5000: "54 000 ₽", days: "от 3 дн" },
  { product: "Брошюра А5, 20 стр., скоба", p500: "21 000 ₽", p1000: "29 500 ₽", p5000: "86 000 ₽", days: "от 5 дн" },
  { product: "Каталог А4, 50 стр., КБС", p500: "от 89 000 ₽", p1000: "от 125 000 ₽", p5000: "индивидуально", days: "от 7 дн" },
];

const FAQ_ITEMS = [
  {
    q: "У вас минимальный тираж от 500 — а сделаете 100 экземпляров для теста?",
    a: "Да, цифровая печать для малых тиражей тоже есть. Цена на малый тираж будет выше в пересчёте на экземпляр, но мы об этом честно предупредим и подберём оптимальный вариант.",
  },
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
    a: "Стандарт — 3–7 рабочих дней. Срочные тиражи принимаем при наличии свободной машины: звоните, скажем честно. Макет до 12:00 — тираж на следующий день в работе.",
  },
];

const QUIZ_STEPS = [
  {
    title: "Что хотите напечатать?",
    type: "single",
    options: ["Буклет", "Брошюра", "Каталог", "Другое (журнал, листовка)"],
  },
  {
    title: "Какой примерный тираж?",
    type: "single",
    options: ["до 500 шт.", "500–1 000 шт.", "1 000–3 000 шт.", "3 000–10 000 шт.", "от 10 000 шт."],
  },
  {
    title: "Есть ли у вас готовый макет?",
    type: "single",
    options: ["Да, всё готово", "Да, но нужна проверка технолога", "Нет, нужна помощь с дизайном"],
  },
  {
    title: "Какой срок сдачи?",
    type: "single",
    options: ["Срочно (1–2 дня)", "3–5 дней", "5–10 дней", "Не горит — нужна лучшая цена"],
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

  // Callback modal
  const [cbOpen, setCbOpen] = useState(false);
  const [cbPhone, setCbPhone] = useState("");
  const [cbDone, setCbDone] = useState(false);

  // Quiz modal
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>(["", "", "", ""]);
  const [quizContacts, setQuizContacts] = useState({ name: "", phone: "", email: "", comment: "" });
  const [quizDone, setQuizDone] = useState(false);
  const [quizContactStep, setQuizContactStep] = useState(false);

  // Consult form
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");
  const [consultDone, setConsultDone] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openQuiz = (preselect?: string) => {
    if (preselect) {
      const newA = [...quizAnswers];
      const idx = QUIZ_STEPS[0].options.indexOf(preselect);
      if (idx >= 0) newA[0] = preselect;
      setQuizAnswers(newA);
    }
    setQuizStep(preselect ? 1 : 0);
    setQuizContactStep(false);
    setQuizDone(false);
    setQuizOpen(true);
  };

  const quizNext = () => {
    if (quizStep < QUIZ_STEPS.length - 1) setQuizStep(s => s + 1);
    else setQuizContactStep(true);
  };

  const quizSubmit = () => {
    setQuizDone(true);
  };

  const getQuizEstimate = () => {
    const type = quizAnswers[0];
    const vol = quizAnswers[1];
    if (!type || !vol) return null;
    const ranges: Record<string, Record<string, string>> = {
      "Буклет": { "до 500 шт.": "12 000–18 000 ₽", "500–1 000 шт.": "18 000–28 000 ₽", "1 000–3 000 шт.": "28 000–55 000 ₽", "3 000–10 000 шт.": "55 000–130 000 ₽", "от 10 000 шт.": "по запросу" },
      "Брошюра": { "до 500 шт.": "20 000–30 000 ₽", "500–1 000 шт.": "28 000–42 000 ₽", "1 000–3 000 шт.": "42 000–80 000 ₽", "3 000–10 000 шт.": "80 000–200 000 ₽", "от 10 000 шт.": "по запросу" },
      "Каталог": { "до 500 шт.": "от 80 000 ₽", "500–1 000 шт.": "от 120 000 ₽", "1 000–3 000 шт.": "от 200 000 ₽", "3 000–10 000 шт.": "индивидуально", "от 10 000 шт.": "индивидуально" },
    };
    return ranges[type]?.[vol] ?? "Уточним при расчёте";
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--c-bg)", color: "var(--c-ink)" }}>

      {/* ========== HEADER ========== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
        style={{ background: "#fff", borderBottom: "1px solid var(--c-border)" }}>

        {/* Top bar */}
        <div className="hidden md:block border-b" style={{ borderColor: "var(--c-border)", background: "var(--c-bg2)" }}>
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm" style={{ color: "var(--c-ink2)" }}>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Icon name="MapPin" size={13} style={{ color: "var(--c-blue)" }} />
                г. Москва, ул. Горбунова, 2
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Clock" size={13} style={{ color: "var(--c-blue)" }} />
                9:00 – 18:00 МСК (по будням)
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="mailto:info@pkzapad.ru" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Icon name="Mail" size={13} style={{ color: "var(--c-blue)" }} />
                info@pkzapad.ru
              </a>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span style={{ color: "var(--c-ink2)" }}>Звоним, мы работаем</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 flex-shrink-0">
            <img src={LOGO_IMG} alt="ПК Запад" className="h-10 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
            <div className="hidden lg:block text-xs leading-tight" style={{ color: "var(--c-ink3)", maxWidth: 160 }}>
              Надёжная офсетная типография<br />полного цикла в Москве.<br />
              <span style={{ color: "var(--c-blue)" }}>Работаем по всей России</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-medium transition-colors hover:text-blue-600"
                style={{ color: "var(--c-ink2)" }}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="tel:+74951234567" className="hidden md:flex flex-col items-end">
              <span className="font-bold text-lg leading-tight display-font" style={{ color: "var(--c-blue)" }}>
                +7 (495) 000-00-00
              </span>
              <span className="text-xs" style={{ color: "var(--c-ink3)" }}>Перезвоним за 1 час</span>
            </a>
            <button onClick={() => setCbOpen(true)}
              className="btn-green px-4 py-2.5 text-sm hidden md:block">
              Перезвоните мне
            </button>
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} style={{ color: "var(--c-ink)" }} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t px-6 py-4 flex flex-col gap-3" style={{ borderColor: "var(--c-border)", background: "#fff" }}>
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left py-2 font-medium" style={{ color: "var(--c-ink2)" }}>
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="font-bold text-xl display-font" style={{ color: "var(--c-blue)" }}>
              +7 (495) 000-00-00
            </a>
            <button onClick={() => { setMenuOpen(false); setCbOpen(true); }} className="btn-green py-3 text-base">
              Перезвоните мне
            </button>
          </div>
        )}
      </header>

      {/* ========== TICKER ========== */}
      <div className="overflow-hidden border-b pt-[129px] md:pt-[105px]" style={{ background: "var(--c-blue)", borderColor: "var(--c-border)" }}>
        <div className="flex py-2.5" style={{ width: "max-content", animation: "marquee 25s linear infinite" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-white text-xs font-semibold mx-8 tracking-widest display-font whitespace-nowrap">
              {item} <span className="opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ========== HERO ========== */}
      <section id="hero" className="relative overflow-hidden" style={{ background: "var(--c-bg2)" }}>
        <div className="absolute inset-0 z-0">
          <img src={PRESS_IMG} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(245,247,250,0.98) 50%, rgba(245,247,250,0.7))" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              {["28 лет на рынке B2B", "Своё производство и доставка", "Одобрено «Доширак»"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "#fff", border: "1px solid var(--c-border)", color: "var(--c-ink2)" }}>
                  <Icon name="CheckCircle" size={12} style={{ color: "var(--c-green)" }} />
                  {t}
                </span>
              ))}
            </div>

            <h1 className="display-font font-bold leading-tight mb-5 animate-fade-up" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", opacity: 0, color: "var(--c-ink)" }}>
              Печать каталогов, брошюр и буклетов<br />
              <span style={{ color: "var(--c-blue)" }}>в Москве: от 500 шт. за 2 дня</span><br />
              — с контролем качества на каждом листе
            </h1>

            <p className="text-base mb-8 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0, color: "var(--c-ink2)", maxWidth: 560 }}>
              Не теряйте клиентов на выставке из-за сорванных сроков или плохой печати.
              Напечатаем тираж с запасом <strong style={{ color: "var(--c-ink)" }}>+2% «на брак»</strong> — вы получите
              ровно столько, сколько заказали, или чуть больше.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-fade-up delay-300" style={{ opacity: 0 }}>
              <button onClick={() => openQuiz()} className="btn-green px-8 py-4 text-base">
                Рассчитать стоимость за 2 минуты
              </button>
              <button onClick={() => scrollTo("#contacts")} className="btn-outline px-8 py-4 text-base">
                Консультация технолога
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 animate-fade-up delay-400" style={{ opacity: 0 }}>
              {[
                { icon: "Award", val: "28 лет", sub: "на рынке" },
                { icon: "Truck", val: "Своя", sub: "доставка" },
                { icon: "ShieldCheck", val: "+2%", sub: "к тиражу" },
              ].map((s, i) => (
                <div key={i} className="text-center rounded-xl py-4 px-2" style={{ background: "#fff", border: "1px solid var(--c-border)" }}>
                  <Icon name={s.icon} size={22} className="mx-auto mb-1" style={{ color: "var(--c-blue)" }} />
                  <div className="display-font font-bold text-lg" style={{ color: "var(--c-ink)" }}>{s.val}</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mini Quiz */}
          <div className="card-light p-7 rounded-2xl" style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
            <div className="text-center mb-5">
              <h2 className="display-font font-bold text-xl mb-1" style={{ color: "var(--c-ink)" }}>Рассчитайте стоимость за 2 минуты</h2>
              <p className="text-sm" style={{ color: "var(--c-ink3)" }}>+ узнайте условия для агентств и корпоративных клиентов</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Укажите тип продукции:</p>
              <div className="grid grid-cols-2 gap-2">
                {["Каталоги", "Брошюры", "Буклеты", "Листовки", "Журналы", "Другое"].map(opt => (
                  <button key={opt}
                    className={`quiz-option text-sm${quizAnswers[0] === opt ? " selected" : ""}`}
                    onClick={() => { const a = [...quizAnswers]; a[0] = opt; setQuizAnswers(a); }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Тираж (шт.)</p>
                <input className="inp" placeholder="Например: 1000" type="number" />
              </div>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Формат</p>
                <select className="inp" style={{ cursor: "pointer" }}>
                  <option>А4</option><option>А5</option><option>А6</option><option>Евро</option><option>Другой</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Тип бумаги</p>
                <select className="inp" style={{ cursor: "pointer" }}>
                  <option>Мелованная</option><option>Офсетная</option><option>Дизайнерская</option>
                </select>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Страниц в блоке</p>
                <input className="inp" placeholder="Например: 8, 16, 32" />
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--c-ink2)" }}>Отделка (можно несколько)</p>
              <div className="flex flex-wrap gap-2">
                {["УФ-лак", "Ламинация", "Тиснение", "Без отделки"].map(opt => (
                  <label key={opt} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: "var(--c-ink2)" }}>
                    <input type="checkbox" className="rounded" /> {opt}
                  </label>
                ))}
              </div>
            </div>

            <textarea className="inp mb-4" rows={2} placeholder="Комментарий (необязательно)" />

            <div className="grid grid-cols-2 gap-3 mb-4">
              <input className="inp" placeholder="Ваше имя" />
              <input className="inp" placeholder="+7 (___) ___-__-__" />
            </div>

            <button onClick={() => openQuiz()} className="btn-green w-full py-4 text-base mb-2">
              Получить расчёт бесплатно →
            </button>
            <p className="text-center text-xs" style={{ color: "var(--c-ink3)" }}>
              Нажимая кнопку, вы соглашаетесь с{" "}
              <span className="underline cursor-pointer" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
            </p>

            <div className="mt-4 rounded-xl p-3 flex items-center gap-3" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <Icon name="Gift" size={20} style={{ color: "var(--c-green)" }} />
              <span className="text-sm"><strong style={{ color: "var(--c-green-dark)" }}>Скидка 10%</strong> на первый заказ для новых клиентов</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 2: JTBD ========== */}
      <section id="jtbd" className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mb-3">Мы решаем ваши задачи</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Понимаем B2B-задачи лучше, чем кто-либо
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "Zap",
                pain: "Нужно срочно к выставке, а предыдущий подрядчик подвёл",
                solution: "Перепечатаем тираж за 2–3 дня. Принимаем макет до 12:00 — на следующий день в работе. Своя доставка по Москве.",
                color: "#fef3c7",
                accent: "#d97706",
              },
              {
                icon: "ShieldCheck",
                pain: "Боюсь получить брак, а тираж нужен точно ровный",
                solution: "Закладываем +2% к тиражу автоматически. Вы получаете заказанное количество или больше — без доплат и доказательств.",
                color: "#f0fdf4",
                accent: "#16a34a",
              },
              {
                icon: "Eye",
                pain: "Хочу увидеть качество до оплаты всего тиража",
                solution: "Приезжайте к нам на производство — посмотрите образцы и утвердите тестовый тираж. Для новых клиентов это бесплатно.",
                color: "#eff6ff",
                accent: "#2563eb",
              },
            ].map((c, i) => (
              <div key={i} className="card-light p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: c.color }}>
                  <Icon name={c.icon} size={22} style={{ color: c.accent }} />
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: c.accent }}>Задача клиента</div>
                <p className="font-semibold mb-4 text-base italic" style={{ color: "var(--c-ink)" }}>«{c.pain}»</p>
                <div className="h-px mb-4" style={{ background: "var(--c-border)" }} />
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--c-blue)" }}>Решение типографии</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{c.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCK 3: УТП ========== */}
      <section id="advantages" className="py-20 px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-tag mb-3">Почему нам доверяют 28 лет</div>
            <h2 className="display-font font-bold mb-8" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              B2B-клиенты возвращаются,<br />потому что мы не подводим
            </h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: "TrendingDown", title: "Цена ниже рынка", desc: "Экономия до 20% за счёт своего производства без посредников. Подтверждаем сметой.", highlight: "−20% к цене" },
                { icon: "Eye", title: "Живой контроль", desc: "Приезжайте в любой момент — смотрите, как режется, фальцуется и ламинируется ваш тираж.", highlight: "Видите всё сами" },
                { icon: "Truck", title: "Своя доставка", desc: "Грузовики типографии, а не курьерские службы. Ответственность за сохранность — наша.", highlight: "Без посредников" },
                { icon: "ShieldCheck", title: "Брак — наша проблема", desc: "Печатаем на 2% больше. Перерасход по бумаге вам не выставляем.", highlight: "+2% бесплатно" },
              ].map((a, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                    <Icon name={a.icon} size={20} style={{ color: "var(--c-blue)" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold" style={{ color: "var(--c-ink)" }}>{a.title}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#f0fdf4", color: "var(--c-green-dark)" }}>{a.highlight}</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl p-6" style={{ background: "var(--c-blue)", color: "#fff" }}>
              <h3 className="display-font font-bold text-xl mb-2">Тест-драйв тиража</h3>
              <p className="text-sm mb-4 opacity-90">Закажите тестовый тираж до 100 экземпляров. Если качество не устроит — вернём деньги. Мы уверены в себе.</p>
              <button onClick={() => openQuiz()} className="btn-green px-6 py-3 text-sm">
                Заказать тестовый тираж →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src={PRESS_IMG} alt="Производство" className="rounded-2xl col-span-2 w-full object-cover" style={{ height: 240 }} />
            <img src={MATERIALS_IMG} alt="Материалы" className="rounded-2xl w-full object-cover" style={{ height: 180 }} />
            <img src={CATALOGS_IMG} alt="Готовые изделия" className="rounded-2xl w-full object-cover" style={{ height: 180 }} />
            <div className="col-span-2 grid grid-cols-4 gap-3">
              {[
                { val: "28", sub: "лет на рынке" },
                { val: "500+", sub: "клиентов B2B" },
                { val: "5 000+", sub: "тиражей" },
                { val: "94%", sub: "возвращаются" },
              ].map((s, i) => (
                <div key={i} className="text-center rounded-xl py-3" style={{ background: "#fff", border: "1px solid var(--c-border)" }}>
                  <div className="display-font font-bold text-xl" style={{ color: "var(--c-blue)" }}>{s.val}</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 4: УСЛУГИ + ЦЕНЫ ========== */}
      <section id="services" className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mb-3">Продукция</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Работаем с тиражами от 500 штук
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { img: MATERIALS_IMG, title: "Буклеты", specs: ["Форматы: A4, A5, Евро", "Бумага: 130–350 г/м²", "Сложение: книжка, гармошка"], price: "от 12 500 ₽", days: "от 3 дней", type: "Буклет" },
              { img: CATALOGS_IMG, title: "Брошюры", specs: ["Скрепка или КБС", "8–96 страниц", "Обложка 300 г/м²"], price: "от 21 000 ₽", days: "от 5 дней", type: "Брошюра" },
              { img: PRESS_IMG, title: "Каталоги", specs: ["Твёрдая и мягкая обложка", "До 300+ страниц", "Лак, ламинация, тиснение"], price: "от 89 000 ₽", days: "от 7 дней", type: "Каталог" },
            ].map((s, i) => (
              <div key={i} className="card-light overflow-hidden">
                <div className="relative overflow-hidden" style={{ height: 200 }}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,31,46,0.6) 0%, transparent 60%)" }} />
                  <span className="absolute bottom-3 left-4 display-font font-bold text-2xl text-white">{s.title}</span>
                </div>
                <div className="p-5">
                  <ul className="mb-4 space-y-1">
                    {s.specs.map((sp, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "var(--c-ink2)" }}>
                        <Icon name="Check" size={13} style={{ color: "var(--c-green)" }} /> {sp}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="display-font font-bold text-xl" style={{ color: "var(--c-blue)" }}>{s.price}</div>
                      <div className="text-xs" style={{ color: "var(--c-ink3)" }}>тираж 500 шт. / {s.days}</div>
                    </div>
                  </div>
                  <button onClick={() => openQuiz(s.type)} className="btn-blue w-full py-3 text-sm">
                    Рассчитать точную стоимость
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price table */}
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "var(--c-bg2)" }}>
              <h3 className="display-font font-bold text-lg" style={{ color: "var(--c-ink)" }}>Ориентировочные цены</h3>
              <span className="text-xs" style={{ color: "var(--c-ink3)" }}>Точный расчёт — за 1 час</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--c-bg3)" }}>
                    <th className="text-left px-5 py-3 font-semibold" style={{ color: "var(--c-ink2)" }}>Продукция</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--c-ink2)" }}>500 шт.</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--c-ink2)" }}>1 000 шт.</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--c-ink2)" }}>5 000 шт.</th>
                    <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--c-ink2)" }}>Срок</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((row, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--c-border)", background: i % 2 === 0 ? "#fff" : "var(--c-bg2)" }}>
                      <td className="px-5 py-4" style={{ color: "var(--c-ink)" }}>{row.product}</td>
                      <td className="text-center px-4 py-4 font-medium" style={{ color: "var(--c-blue)" }}>{row.p500}</td>
                      <td className="text-center px-4 py-4 font-medium" style={{ color: "var(--c-blue)" }}>{row.p1000}</td>
                      <td className="text-center px-4 py-4 font-medium" style={{ color: "var(--c-blue)" }}>{row.p5000}</td>
                      <td className="text-center px-4 py-4" style={{ color: "var(--c-green-dark)", fontWeight: 600 }}>{row.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 text-xs" style={{ background: "var(--c-bg2)", color: "var(--c-ink3)" }}>
              * Цены ориентировочные, зависят от бумаги и отделки. Точный расчёт — менеджер пришлёт КП за 1 час.
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 5: КЕЙС ========== */}
      <section id="case" className="py-20 px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-tag mb-3">Кейс</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Как мы спасли выставку федерального бренда
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="card-light p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name="Trophy" size={20} style={{ color: "var(--c-blue)" }} />
                </div>
                <span className="font-semibold" style={{ color: "var(--c-ink)" }}>Федеральная сеть общепита · 2023 год</span>
              </div>
              <blockquote className="text-base leading-relaxed mb-6 italic" style={{ color: "var(--c-ink2)", borderLeft: "3px solid var(--c-blue)", paddingLeft: 16 }}>
                «Федеральный клиент обратился к нам за 4 дня до старта промо-кампании. Нужно было 15 000 буклетов
                и 5 000 каталогов с оригинал-макетом, который был свёрстан с техническими ошибками.
                Мы за 1 день исправили макет, за 2 дня напечатали тираж и доставили своим транспортом
                до каждого ресторана. Итог: акция запущена без задержек, клиент получил грамоту "Лучший подрядчик".»
              </blockquote>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "4 дня", sub: "до дедлайна" },
                  { val: "20 000", sub: "экземпляров" },
                  { val: "0 ₽", sub: "штрафов" },
                ].map((s, i) => (
                  <div key={i} className="text-center rounded-xl py-3 px-2" style={{ background: "var(--c-bg2)" }}>
                    <div className="display-font font-bold text-lg" style={{ color: "var(--c-blue)" }}>{s.val}</div>
                    <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <img src={MATERIALS_IMG} alt="Печать тиража" className="rounded-2xl w-full object-cover" style={{ height: 200 }} />
              <div className="card-light p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#fef3c7" }}>
                  <Icon name="Star" size={22} style={{ color: "#d97706" }} />
                </div>
                <div>
                  <div className="font-semibold mb-1" style={{ color: "var(--c-ink)" }}>Грамота «Лучший подрядчик»</div>
                  <div className="text-sm" style={{ color: "var(--c-ink3)" }}>Выдана одним из крупнейших клиентов за соблюдение сроков и качество печати</div>
                </div>
              </div>
              <button onClick={() => openQuiz()} className="btn-blue py-4 text-base">
                Обсудить мою задачу →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 6: ПРОЦЕСС ========== */}
      <section id="process" className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mb-3">Как мы работаем</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              4 шага до готового тиража
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { num: "01", icon: "FileText", title: "Заявка", desc: "Оставляете заявку или проходите квиз → менеджер связывается в течение 1 часа (9–18 будни)." },
              { num: "02", icon: "Pencil", title: "Макет и проверка", desc: "Присылаете макет или мы доделываем за вас. Технолог проверяет вылеты, поля, цветовую модель." },
              { num: "03", icon: "Eye", title: "Тестовый тираж", desc: "Для первых заказов — бесплатно. Приезжайте в цех или получите курьером." },
              { num: "04", icon: "Truck", title: "Печать и доставка", desc: "Получаете тираж +2% к заказанному. Даже если что-то пошло не так — за наш счёт." },
            ].map((s, i) => (
              <div key={i} className="card-light p-6 relative">
                <div className="display-font font-bold text-5xl mb-3" style={{ color: "var(--c-bg3)", lineHeight: 1 }}>{s.num}</div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={s.icon} size={18} style={{ color: "var(--c-blue)" }} />
                </div>
                <h3 className="display-font font-bold text-lg mb-2" style={{ color: "var(--c-ink)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <Icon name="ChevronRight" size={20} style={{ color: "var(--c-blue)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCK 7: ОБОРУДОВАНИЕ ========== */}
      <section id="equipment" className="py-20 px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mb-3">Производство</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Оборудование, которым мы гордимся
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: "Printer", title: "Heidelberg", desc: "Флагманские офсетные машины. Скорость 15 000 листов/час. Резервный станок — сроки не сдвинутся." },
              { icon: "BookOpen", title: "КБС и скоба", desc: "Полная линия для клеевого и скобяного переплёта. Брошюры от 8 до 96 страниц." },
              { icon: "Scissors", title: "Резка и фальцовка", desc: "Программируемые резаки до 0.1 мм точности. Автоматическая фальцовка любых форматов." },
              { icon: "Gauge", title: "Контроль цвета", desc: "Спектрофотометр для измерения Delta E. Цветопроба перед каждым тиражом — бесплатно." },
            ].map((e, i) => (
              <div key={i} className="card-light p-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={e.icon} size={22} style={{ color: "var(--c-blue)" }} />
                </div>
                <h3 className="display-font font-bold text-lg mb-2" style={{ color: "var(--c-ink)" }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--c-ink2)" }}>{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5" style={{ background: "var(--c-blue)", color: "#fff" }}>
            <Icon name="Shield" size={36} className="flex-shrink-0 opacity-80" />
            <div>
              <div className="font-bold text-lg mb-1">Резервное оборудование</div>
              <p className="opacity-90 text-sm">В случае поломки основного станка — у нас есть резервный. Сроки не сдвинутся ни на день. Это наша личная ответственность перед вами.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== BLOCK 8: FAQ ========== */}
      <section id="faq" className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mb-3">FAQ</div>
            <h2 className="display-font font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Ответы на вопросы B2B-клиентов
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--c-border)" }}>
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  style={{ background: openFaq === i ? "var(--c-blue-light)" : "#fff" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-base" style={{ color: "var(--c-ink)" }}>{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: "var(--c-blue)", flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--c-ink2)", borderTop: "1px solid var(--c-border)", paddingTop: 16 }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCK 9: КВИЗ (standalone) ========== */}
      <section id="quiz" className="py-20 px-6" style={{ background: "var(--c-bg2)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="section-tag mb-3">Быстрый расчёт</div>
          <h2 className="display-font font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
            Узнайте точную стоимость за 2 минуты
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--c-ink2)" }}>Пройдите 4-шаговый квиз — менеджер пришлёт точный расчёт в течение 30 минут</p>
          <button onClick={() => openQuiz()} className="btn-green px-10 py-5 text-lg">
            Рассчитать стоимость тиража →
          </button>
        </div>
      </section>

      {/* ========== BLOCK 10: ФОРМА КОНСУЛЬТАЦИИ ========== */}
      <section id="contacts" className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="section-tag mb-3">Консультация</div>
            <h2 className="display-font font-bold mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "var(--c-ink)" }}>
              Получите консультацию технолога
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--c-ink2)" }}>
              Поможем сэкономить до 20% на бумаге — подберём аналог, который не уступает по плотности и белизне.
            </p>

            {consultDone ? (
              <div className="card-light p-8 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f0fdf4" }}>
                  <Icon name="CheckCircle" size={36} style={{ color: "var(--c-green)" }} />
                </div>
                <h3 className="display-font font-bold text-xl mb-2" style={{ color: "var(--c-ink)" }}>Спасибо!</h3>
                <p className="text-sm" style={{ color: "var(--c-ink2)" }}>Менеджер перезвонит вам в рабочее время (9–18 будни) в течение 1 часа.</p>
              </div>
            ) : (
              <div className="card-light p-7">
                <div className="flex flex-col gap-4">
                  <input className="inp" placeholder="Ваше имя"
                    value={consultName} onChange={e => setConsultName(e.target.value)} />
                  <input className="inp" placeholder="+7 (___) ___-__-__"
                    value={consultPhone}
                    onChange={e => setConsultPhone(formatPhone(e.target.value))} />
                  <button className="btn-green py-4 text-base" onClick={() => setConsultDone(true)}>
                    Перезвонить в рабочее время →
                  </button>
                  <p className="text-xs text-center" style={{ color: "var(--c-ink3)" }}>
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <span className="underline cursor-pointer" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "Phone", title: "Телефон", val: "+7 (495) 000-00-00", sub: "Пн–Пт 9:00–18:00", href: "tel:+74950000000" },
              { icon: "Mail", title: "Email", val: "info@pkzapad.ru", sub: "Ответим в течение 2 часов", href: "mailto:info@pkzapad.ru" },
              { icon: "MapPin", title: "Адрес производства", val: "г. Москва, ул. Горбунова, 2", sub: "Метро Кунцевская, 5 мин пешком", href: "#" },
              { icon: "Clock", title: "Режим работы", val: "Пн–Пт: 9:00–18:00", sub: "Суббота: по договорённости", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="card-light flex gap-4 p-5 items-start no-underline">
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--c-blue-light)" }}>
                  <Icon name={c.icon} size={18} style={{ color: "var(--c-blue)" }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--c-ink3)" }}>{c.title}</div>
                  <div className="font-semibold" style={{ color: "var(--c-ink)" }}>{c.val}</div>
                  <div className="text-xs" style={{ color: "var(--c-ink3)" }}>{c.sub}</div>
                </div>
              </a>
            ))}

            <div className="card-light p-5 flex items-center gap-4" style={{ borderColor: "var(--c-green)", borderWidth: 1.5 }}>
              <Icon name="Eye" size={22} style={{ color: "var(--c-green)" }} />
              <div>
                <div className="font-semibold" style={{ color: "var(--c-ink)" }}>Можно приехать и посмотреть</div>
                <div className="text-sm" style={{ color: "var(--c-ink3)" }}>Образцы бумаги, отделок, цветопробы — всё на месте. Это бесплатно.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 px-6" style={{ background: "var(--c-ink)", color: "#fff" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_IMG} alt="ПК Запад" className="h-8 object-contain brightness-200" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
            <span className="display-font font-semibold text-lg">ПК ЗАПАД</span>
          </div>
          <div className="text-sm text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
            © 2024 ПК Запад · Офсетная типография полного цикла · Москва · С 1996 года
          </div>
          <a href="tel:+74950000000" className="font-bold display-font text-lg" style={{ color: "var(--c-green)" }}>
            +7 (495) 000-00-00
          </a>
        </div>
      </footer>

      {/* ========== MODAL: CALLBACK ========== */}
      {cbOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="card-light p-8 w-full max-w-sm relative" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <button onClick={() => { setCbOpen(false); setCbDone(false); }} className="absolute top-4 right-4">
              <Icon name="X" size={20} style={{ color: "var(--c-ink3)" }} />
            </button>
            {cbDone ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f0fdf4" }}>
                  <Icon name="CheckCircle" size={36} style={{ color: "var(--c-green)" }} />
                </div>
                <h3 className="display-font font-bold text-xl mb-2" style={{ color: "var(--c-ink)" }}>Жду звонка!</h3>
                <p className="text-sm" style={{ color: "var(--c-ink2)" }}>Перезвоним вам в течение 1 рабочего часа (9–18 будни).</p>
              </div>
            ) : (
              <>
                <h3 className="display-font font-bold text-xl mb-2" style={{ color: "var(--c-ink)" }}>Перезвоните мне</h3>
                <p className="text-sm mb-6" style={{ color: "var(--c-ink2)" }}>
                  Оставьте номер телефона — наш специалист перезвонит для согласования времени
                </p>
                <input
                  className="inp mb-4"
                  placeholder="+7 (___) ___-__-__"
                  value={cbPhone}
                  onChange={e => setCbPhone(formatPhone(e.target.value))}
                />
                <button className="btn-green w-full py-4 text-base mb-3" onClick={() => setCbDone(true)}>
                  Жду звонка!
                </button>
                <p className="text-xs text-center" style={{ color: "var(--c-ink3)" }}>
                  Нажимая кнопку, вы даёте согласие на обработку персональных данных и соглашаетесь с{" "}
                  <span className="underline cursor-pointer" style={{ color: "var(--c-blue)" }}>Политикой конфиденциальности</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========== MODAL: QUIZ ========== */}
      {quizOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }}>
          <div className="card-light w-full max-w-lg relative" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="flex items-center justify-between px-7 py-5 border-b" style={{ borderColor: "var(--c-border)" }}>
              <span className="display-font font-bold text-lg" style={{ color: "var(--c-ink)" }}>
                {quizDone ? "Заявка принята" : quizContactStep ? "Ваши контакты" : `Шаг ${quizStep + 1} из ${QUIZ_STEPS.length}`}
              </span>
              <button onClick={() => setQuizOpen(false)}>
                <Icon name="X" size={20} style={{ color: "var(--c-ink3)" }} />
              </button>
            </div>

            <div className="px-7 py-6">
              {quizDone ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#f0fdf4" }}>
                    <Icon name="CheckCircle" size={36} style={{ color: "var(--c-green)" }} />
                  </div>
                  <h3 className="display-font font-bold text-2xl mb-2" style={{ color: "var(--c-ink)" }}>
                    Спасибо, {quizContacts.name || "друг"}!
                  </h3>
                  <p className="text-sm mb-5" style={{ color: "var(--c-ink2)" }}>
                    Ваша заявка на печать <strong>{quizAnswers[0] || "продукции"}</strong> принята.
                    Менеджер свяжется в течение 1 рабочего часа (9–18 будни).
                  </p>
                  {getQuizEstimate() && (
                    <div className="rounded-xl p-4 mb-5 text-left" style={{ background: "var(--c-bg2)" }}>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--c-blue)" }}>Примерная стоимость</div>
                      <div className="display-font font-bold text-2xl" style={{ color: "var(--c-ink)" }}>{getQuizEstimate()}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--c-ink3)" }}>Точный расчёт придёт в течение 30 минут</div>
                    </div>
                  )}
                  <div className="text-left mb-5">
                    <div className="font-semibold mb-3" style={{ color: "var(--c-ink)" }}>Что вы получите:</div>
                    <ul className="space-y-2">
                      {["Точный расчёт в таблице с разбивкой по бумаге, краске и послепечатке",
                        "Контрольные листы для подписи (опционально)",
                        "Предложение о бесплатном тестовом тираже (для новых клиентов)"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--c-ink2)" }}>
                          <Icon name="Check" size={14} style={{ color: "var(--c-green)", marginTop: 2, flexShrink: 0 }} /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <button className="btn-blue flex-1 py-3 text-sm" onClick={() => setQuizOpen(false)}>
                      Закрыть
                    </button>
                    <a href="tel:+74950000000" className="btn-green flex-1 py-3 text-sm flex items-center justify-center gap-2">
                      <Icon name="Phone" size={14} /> Позвонить
                    </a>
                  </div>
                </div>
              ) : quizContactStep ? (
                <div>
                  <p className="text-sm mb-5" style={{ color: "var(--c-ink2)" }}>
                    Почти готово! Оставьте контакты и мы пришлём точный расчёт.
                  </p>
                  {!quizDone && (
                    <div className="flex flex-col gap-3">
                      <input className="inp" placeholder="Ваше имя *" value={quizContacts.name} onChange={e => setQuizContacts({...quizContacts, name: e.target.value})} />
                      <input className="inp" placeholder="+7 (___) ___-__-__ *"
                        value={quizContacts.phone}
                        onChange={e => setQuizContacts({...quizContacts, phone: formatPhone(e.target.value)})} />
                      <input className="inp" placeholder="Email (необязательно)" value={quizContacts.email} onChange={e => setQuizContacts({...quizContacts, email: e.target.value})} />
                      <textarea className="inp" rows={2} placeholder="Комментарий (необязательно)"
                        value={quizContacts.comment} onChange={e => setQuizContacts({...quizContacts, comment: e.target.value})} />
                      <button className="btn-green py-4 text-base" onClick={quizSubmit}>
                        Получить расчёт →
                      </button>
                      <p className="text-xs text-center" style={{ color: "var(--c-ink3)" }}>
                        Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {/* Progress */}
                  <div className="flex gap-1.5 mb-6">
                    {QUIZ_STEPS.map((_, i) => (
                      <div key={i} className="h-1.5 rounded-full flex-1 transition-all"
                        style={{ background: i <= quizStep ? "var(--c-blue)" : "var(--c-border)" }} />
                    ))}
                  </div>

                  <h3 className="font-bold text-lg mb-4" style={{ color: "var(--c-ink)" }}>
                    {QUIZ_STEPS[quizStep].title}
                  </h3>

                  <div className="flex flex-col gap-2 mb-6">
                    {QUIZ_STEPS[quizStep].options.map(opt => (
                      <button key={opt}
                        className={`quiz-option${quizAnswers[quizStep] === opt ? " selected" : ""}`}
                        onClick={() => {
                          const a = [...quizAnswers];
                          a[quizStep] = opt;
                          setQuizAnswers(a);
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    {quizStep > 0 && (
                      <button className="btn-outline px-5 py-3 text-sm" onClick={() => setQuizStep(s => s - 1)}>
                        ← Назад
                      </button>
                    )}
                    <button
                      className="btn-blue px-8 py-3 text-sm ml-auto"
                      disabled={!quizAnswers[quizStep]}
                      style={{ opacity: quizAnswers[quizStep] ? 1 : 0.4 }}
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

    </div>
  );
}
