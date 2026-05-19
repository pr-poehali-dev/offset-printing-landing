import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRESS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/d2909581-bfe0-4dcf-8557-8f140c57a6e8.jpg";
const MATERIALS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/0ca40e45-c634-4c66-a954-ea438f94f18f.jpg";
const CATALOGS_IMG = "https://cdn.poehali.dev/projects/d46d0bb4-7e8b-4140-8b12-a727ae7be6b4/files/21bd82c3-cb6e-402f-a981-41aada75e978.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  {
    icon: "BookOpen",
    title: "Буклеты",
    desc: "От 500 шт. Форматы A4, A5, евро. Складывание: книжка, гармошка, дельта. Мелованная бумага 130–350 г/м².",
    price: "от 4 990 ₽",
    tag: "Хит заказов",
  },
  {
    icon: "BookMarked",
    title: "Брошюры",
    desc: "Скрепка или клей. От 8 до 96 страниц. Обложка 300 г/м², внутренние листы 130 г/м². Полноцветная печать.",
    price: "от 12 900 ₽",
    tag: "Популярное",
  },
  {
    icon: "Layers",
    title: "Каталоги",
    desc: "Твёрдая и мягкая обложка. От 20 до 300+ страниц. Офсет, лак, ламинация, тиснение — на выбор.",
    price: "от 34 900 ₽",
    tag: "B2B-фаворит",
  },
];

const ADVANTAGES = [
  {
    icon: "Factory",
    title: "Своё производство",
    desc: "Печать, резка, фальцовка, скрепление — всё на одном заводе. Без посредников = без наценки и задержек.",
    highlight: "−25% к цене",
  },
  {
    icon: "MapPin",
    title: "Офис и завод — одно место",
    desc: "Приезжайте, потрогайте образцы, согласуйте цвет вживую. Производство прямо за стеной от переговорной.",
    highlight: "Видите всё сами",
  },
  {
    icon: "FlaskConical",
    title: "Тестовый тираж",
    desc: "Перед основным заказом печатаем пробник. Убедитесь в качестве цвета и бумаги до запуска тиража.",
    highlight: "Риск = 0",
  },
  {
    icon: "ShieldCheck",
    title: "Брак закладывается в тираж",
    desc: "Печатаем на 2% больше заявленного тиража. Брак заменяется автоматически — вы получаете ровно столько, сколько заказали.",
    highlight: "+2% к тиражу",
  },
  {
    icon: "Truck",
    title: "Доставка по Москве и МО",
    desc: "Курьер до двери или самовывоз. Срочная доставка в день готовности тиража.",
    highlight: "Курьер в день готовности",
  },
  {
    icon: "Award",
    title: "28 лет на рынке",
    desc: "С 1996 года. Сотни корпоративных клиентов, тысячи тиражей. Знаем все подводные камни полиграфии.",
    highlight: "С 1996 года",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Заявка", desc: "Позвоните или заполните форму. Менеджер перезвонит за 15 минут и уточнит детали." },
  { num: "02", title: "Расчёт", desc: "Считаем стоимость за 1 час. Пришлём КП с ценами, сроками и вариантами материалов." },
  { num: "03", title: "Тестовый тираж", desc: "При необходимости — печатаем пробник. Вы согласовываете цвет и качество вживую." },
  { num: "04", title: "Печать", desc: "Запускаем в производство. Срок — от 3 рабочих дней. Держим вас в курсе." },
  { num: "05", title: "Доставка", desc: "Курьер привозит тираж в удобное время. Или забираете сами — производство рядом." },
];

const FAQ = [
  {
    q: "Какой минимальный тираж?",
    a: "Минимальный тираж для офсетной печати — 500 штук. Для меньших тиражей можем предложить цифровую печать.",
  },
  {
    q: "Сколько стоит печать 1 000 буклетов A5?",
    a: "Буклет A5 (книжка, мелованная бумага 130 г/м²) тираж 1 000 шт — от 7 900 ₽. Точная цена зависит от бумаги и отделки.",
  },
  {
    q: "Можно ли приехать и посмотреть образцы?",
    a: "Да, приезжайте! Офис и производство в одном месте. Покажем образцы бумаги, покрытий, цветопробы. Будем рады вас принять.",
  },
  {
    q: "Как долго делается тираж?",
    a: "Стандартный срок — 3–7 рабочих дней с момента согласования макета. Возможно срочное производство — уточняйте у менеджера.",
  },
  {
    q: "Что значит «закладываем брак»?",
    a: "Мы печатаем на 2% больше заказанного тиража. Это покрывает возможный технологический брак — вы гарантированно получаете ровно столько экземпляров, сколько заказали.",
  },
  {
    q: "Вы помогаете с дизайном?",
    a: "Да, у нас есть дизайн-бюро. Разработаем макет с нуля или адаптируем ваши материалы под печать.",
  },
];

const TICKER_ITEMS = [
  "БУКЛЕТЫ ОТ 500 ШТ",
  "БРОШЮРЫ И КАТАЛОГИ",
  "СОБСТВЕННОЕ ПРОИЗВОДСТВО",
  "ДОСТАВКА ПО МОСКВЕ И МО",
  "28 ЛЕТ НА РЫНКЕ",
  "ТЕСТОВЫЙ ТИРАЖ",
  "ЦЕНЫ НИЖЕ РЫНКА",
  "БРАК +2% В ПОДАРОК",
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10" style={{ background: "rgba(13,13,13,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded" style={{ background: "var(--neon)" }}>
              <span className="display-font font-bold text-black text-sm">ПЛ</span>
            </div>
            <span className="display-font font-semibold text-white text-lg tracking-wide">ПОЛИГРАФ<span style={{ color: "var(--neon)" }}>ЛАБ</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors tracking-wide">
                {l.label}
              </button>
            ))}
          </div>

          <a href="tel:+74951234567" className="hidden md:flex items-center gap-2 btn-neon px-5 py-2.5 text-sm rounded">
            <Icon name="Phone" size={14} />
            +7 (495) 000-00-00
          </a>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0d0d0d] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left text-white/80 hover:text-white py-1">
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="btn-neon px-5 py-3 text-sm rounded text-center">
              +7 (495) 000-00-00
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg noise-overlay">
        <div className="absolute inset-0 z-0">
          <img src={PRESS_IMG} alt="Офсетная печать" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0d0d0d 40%, rgba(13,13,13,0.6) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-tag mb-6 animate-fade-up" style={{ opacity: 0 }}>
              Офсетная типография · Москва · С 1996 года
            </div>

            <h1 className="display-font font-bold leading-none mb-8 animate-fade-up delay-100" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", opacity: 0 }}>
              ПЕЧАТАЕМ<br />
              <span style={{ color: "var(--neon)" }}>БУКЛЕТЫ,</span><br />
              БРОШЮРЫ,<br />
              КАТАЛОГИ
            </h1>

            <p className="text-white/60 text-lg mb-4 leading-relaxed animate-fade-up delay-200" style={{ opacity: 0 }}>
              <strong className="text-white">От 500 штук</strong> — офсетная печать на собственном производстве.
              Цены ниже рынка. Тестовый тираж перед запуском. Доставка по Москве и МО.
            </p>

            <div className="flex items-center gap-3 mb-10 animate-fade-up delay-300" style={{ opacity: 0 }}>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-white/50 text-sm">Принимаем заказы прямо сейчас · Расчёт за 1 час</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-400" style={{ opacity: 0 }}>
              <button onClick={() => scrollTo("#contacts")} className="btn-neon px-8 py-4 text-base rounded neon-pulse">
                Получить расчёт бесплатно
              </button>
              <button onClick={() => scrollTo("#portfolio")} className="btn-outline-neon px-8 py-4 text-base rounded">
                Смотреть портфолио
              </button>
            </div>
          </div>

          <div className="hidden lg:block animate-scale-in delay-300" style={{ opacity: 0 }}>
            <div className="relative">
              <img src={CATALOGS_IMG} alt="Образцы печати" className="rounded-2xl w-full object-cover shadow-2xl" style={{ maxHeight: 480 }} />
              <div className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-white/10 rounded-xl p-5 shadow-xl">
                <div className="display-font text-4xl font-bold" style={{ color: "var(--neon)" }}>28</div>
                <div className="text-white/60 text-sm mt-1">лет на рынке</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-xl">
                <div className="display-font text-3xl font-bold text-white">+2%</div>
                <div className="text-white/60 text-xs mt-1">брак в подарок</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-white/10 py-3" style={{ background: "var(--neon)" }}>
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="display-font font-semibold text-black text-sm mx-8 tracking-widest">
              {item} <span className="opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="section-tag mb-4">Наши услуги</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              ОФСЕТНАЯ ПЕЧАТЬ<br />
              <span style={{ color: "var(--neon)" }}>ОТ 500 ШТУК</span>
            </h2>
            <div className="accent-line w-32 mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="group relative bg-[#141414] border border-white/10 rounded-2xl p-8 hover:border-[#e8ff00]/40 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-5 right-5">
                  <span className="text-xs display-font font-semibold px-3 py-1 rounded-full border" style={{ borderColor: "var(--neon)", color: "var(--neon)" }}>
                    {s.tag}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(232,255,0,0.1)" }}>
                  <Icon name={s.icon} size={24} style={{ color: "var(--neon)" }} />
                </div>
                <h3 className="display-font font-bold text-white text-2xl mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="border-t border-white/10 pt-5 flex items-center justify-between">
                  <span className="display-font font-bold text-xl" style={{ color: "var(--neon)" }}>{s.price}</span>
                  <button onClick={() => scrollTo("#contacts")} className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                    Заказать <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-28 px-6" style={{ background: "#141414" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="section-tag mb-4">Почему выбирают нас</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              6 ПРИЧИН РАБОТАТЬ<br />
              <span style={{ color: "var(--neon)" }}>С НАМИ</span>
            </h2>
            <div className="accent-line w-32 mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-7 hover:border-[#e8ff00]/30 transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(232,255,0,0.12)" }}>
                    <Icon name={a.icon} size={18} style={{ color: "var(--neon)" }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block" style={{ background: "rgba(232,255,0,0.15)", color: "var(--neon)" }}>
                      {a.highlight}
                    </div>
                    <h3 className="display-font font-bold text-white text-lg leading-tight">{a.title}</h3>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed pl-14">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="py-16 px-6 border-y border-white/10 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "28", unit: "лет", label: "на рынке" },
            { val: "5 000+", unit: "", label: "выполненных тиражей" },
            { val: "180K", unit: "₽", label: "средний чек B2B" },
            { val: "3", unit: "дня", label: "минимальный срок" },
          ].map((s, i) => (
            <div key={i}>
              <div className="display-font font-bold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--neon)" }}>
                {s.val}<span className="text-2xl">{s.unit}</span>
              </div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-28 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="section-tag mb-4">Портфолио</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              ПРИМЕРЫ<br />
              <span style={{ color: "var(--neon)" }}>НАШИХ РАБОТ</span>
            </h2>
            <div className="accent-line w-32 mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: 380 }}>
              <img src={MATERIALS_IMG} alt="Буклеты и брошюры" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6">
                <span className="section-tag text-xs mb-1 block">Маркетинговые материалы</span>
                <h3 className="display-font font-bold text-white text-2xl">Буклеты и брошюры</h3>
                <p className="text-white/60 text-sm mt-1">Полноцветная офсетная печать</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: 380 }}>
              <img src={CATALOGS_IMG} alt="Каталоги" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 60%)" }} />
              <div className="absolute bottom-6 left-6">
                <span className="section-tag text-xs mb-1 block">B2B-полиграфия</span>
                <h3 className="display-font font-bold text-white text-2xl">Каталоги продукции</h3>
                <p className="text-white/60 text-sm mt-1">Твёрдая и мягкая обложка</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="display-font font-bold text-white text-xl mb-2">Хотите увидеть образцы вживую?</h3>
              <p className="text-white/50 text-sm">Приезжайте на производство — покажем весь ассортимент бумаги, отделок и форматов.</p>
            </div>
            <button onClick={() => scrollTo("#contacts")} className="btn-neon px-8 py-4 text-sm rounded whitespace-nowrap">
              Записаться на встречу
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 px-6" style={{ background: "#141414" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="section-tag mb-4">Как мы работаем</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              5 ШАГОВ<br />
              <span style={{ color: "var(--neon)" }}>ДО ГОТОВОГО ТИРАЖА</span>
            </h2>
            <div className="accent-line w-32 mt-6" />
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-[60px] top-8 bottom-8 w-px" style={{ background: "linear-gradient(to bottom, var(--neon), transparent)" }} />
            <div className="flex flex-col gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="relative flex-shrink-0 w-[120px] flex justify-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center border-2 bg-[#141414] z-10"
                      style={{ borderColor: "var(--neon)" }}>
                      <span className="display-font font-bold text-sm" style={{ color: "var(--neon)" }}>{step.num}</span>
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-6 flex-1 hover:border-[#e8ff00]/30 transition-colors">
                    <h3 className="display-font font-bold text-white text-xl mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6 relative overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 opacity-10">
          <img src={PRESS_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.98), rgba(13,13,13,0.85))" }} />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-tag mb-4">Наш опыт</div>
            <h2 className="display-font font-bold text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              28 ЛЕТ ПЕЧАТАЕМ<br />
              <span style={{ color: "var(--neon)" }}>БЕЗ КОМПРОМИССОВ</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              С 1996 года типография работает с крупнейшими корпорациями, агентствами и государственными структурами Москвы.
              За это время мы напечатали тысячи тиражей и знаем: клиент возвращается, когда получает именно то, что ожидал.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Корпоративных клиентов", val: "500+" },
                { label: "Тиражей выполнено", val: "5 000+" },
                { label: "Среднее время звонка", val: "< 15 мин" },
                { label: "NPS клиентов", val: "94%" },
              ].map((s, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
                  <div className="display-font font-bold text-xl mb-1" style={{ color: "var(--neon)" }}>{s.val}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <img src={PRESS_IMG} alt="Производство" className="rounded-2xl w-full object-cover shadow-2xl" style={{ maxHeight: 420 }} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6" style={{ background: "#141414" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="section-tag mb-4">FAQ</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              ЧАСТЫЕ ВОПРОСЫ
            </h2>
            <div className="accent-line w-32 mt-6 mx-auto" />
          </div>

          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden hover:border-[#e8ff00]/20 transition-colors">
                <button
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="display-font font-semibold text-white text-base">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="flex-shrink-0" style={{ color: "var(--neon)" }} />
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 relative overflow-hidden bg-[#0d0d0d]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="section-tag mb-4">Свяжитесь с нами</div>
            <h2 className="display-font font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              ПОЛУЧИТЕ РАСЧЁТ<br />
              <span style={{ color: "var(--neon)" }}>БЕСПЛАТНО ЗА 1 ЧАС</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Оставьте заявку — менеджер перезвонит за 15 минут, уточнит задачу и пришлёт коммерческое предложение.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
              <h3 className="display-font font-bold text-white text-xl mb-6">Заявка на расчёт</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя и компания"
                  className="w-full bg-[#1a1a1a] border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full bg-[#1a1a1a] border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-[#1a1a1a] border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
                />
                <textarea
                  placeholder="Опишите задачу: вид продукции, тираж, формат, сроки"
                  rows={4}
                  className="w-full bg-[#1a1a1a] border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e8ff00]/50 transition-colors resize-none"
                />
                <button className="btn-neon w-full py-4 rounded-xl text-base neon-pulse">
                  Отправить заявку →
                </button>
                <p className="text-white/20 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { icon: "Phone", title: "Телефон", val: "+7 (495) 000-00-00", sub: "Пн–Пт 9:00–18:00" },
                { icon: "Mail", title: "Email", val: "zakaz@tipografiya.ru", sub: "Отвечаем в течение 2 часов" },
                { icon: "MapPin", title: "Адрес", val: "Москва, ул. Примерная, 1", sub: "Офис и производство в одном здании" },
                { icon: "Clock", title: "Режим работы", val: "Пн–Пт: 9:00–18:00", sub: "Сб: 10:00–15:00" },
              ].map((c, i) => (
                <div key={i} className="flex gap-5 items-start bg-[#141414] border border-white/10 rounded-xl p-5 hover:border-[#e8ff00]/20 transition-colors">
                  <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(232,255,0,0.1)" }}>
                    <Icon name={c.icon} size={18} style={{ color: "var(--neon)" }} />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs mb-1">{c.title}</div>
                    <div className="text-white font-medium">{c.val}</div>
                    <div className="text-white/40 text-xs mt-0.5">{c.sub}</div>
                  </div>
                </div>
              ))}

              <div className="bg-[#1a1a1a] border rounded-xl p-5 flex items-center gap-4" style={{ borderColor: "rgba(232,255,0,0.3)" }}>
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(232,255,0,0.1)" }}>
                  <Icon name="Eye" size={18} style={{ color: "var(--neon)" }} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Можно приехать и посмотреть</div>
                  <div className="text-white/40 text-xs mt-0.5">Образцы бумаги, отделок, цветопробы — всё на месте</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6" style={{ background: "#080808" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center rounded" style={{ background: "var(--neon)" }}>
              <span className="display-font font-bold text-black text-xs">ПЛ</span>
            </div>
            <span className="display-font font-semibold text-white tracking-wide">ПОЛИГРАФ<span style={{ color: "var(--neon)" }}>ЛАБ</span></span>
          </div>
          <div className="text-white/30 text-sm text-center">
            © 2024 ПолиграфЛаб · Офсетная типография · Москва · С 1996 года
          </div>
          <a href="tel:+74951234567" className="text-white/30 text-sm hover:text-white transition-colors">
            +7 (495) 000-00-00
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Index;