import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, MapPin, Diamond, PlaneTakeoff, Activity, 
  MessageCircle, Phone, Globe, QrCode, Share2, 
  Copy, X, Check, UserPlus 
} from 'lucide-react';

// Кастомная иконка Instagram
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА (МЕНЯТЬ ТЕКСТ, ФОТО И ССЫЛКИ ЗДЕСЬ)
// ==========================================
const SHARED_LINKS = {
  bgImage: '/bg-dental.webp', 
  avatar: '/avatar-dental.webp',
  username: '@dr.grigoryan_aesthetics',
  waLink: 'https://wa.me/79990000000',
  tgLink: 'https://t.me/твой_юзернейм',
  instLink: 'https://instagram.com/твой_юзернейм',
  phoneLink: 'tel:+37400000000',
};

const CONTENT_DATA = {
  RU: {
    ...SHARED_LINKS,
    badge: 'Aesthetic Dentistry',
    name1: 'АРМЕН',
    name2: 'ГРИГОРЯН',
    role: 'DMD, Chief Surgeon',
    subUsername: 'Swiss Protocol & Digital Dentistry',
    location: 'Ереван • Медтуризм VIP',
    service1Title: 'Цифровая Эстетика',
    service1Text: '3D-моделирование и виниры за 1 день',
    service2Title: 'Медтуризм VIP',
    service2Text: 'Трансфер, премиум-отель и All-Inclusive',
    service3Title: 'Swiss Quality',
    service3Text: 'Гарантия на имплантаты и материалы',
    quote: 'Идеальная улыбка — это наука, точность и безупречный сервис.',
    actionText: 'План лечения',
    actionLink: 'https://wa.me/79990000000?text=Здравствуйте!%20Хочу%20обсудить%20план%20лечения',
    modalTitle: 'Поделиться визиткой',
    modalText: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
    btnCopy: 'Копировать',
    btnCopied: 'Скопировано!',
    btnShare: 'Отправить',
    shareTitle: 'Моя цифровая визитка',
    shareText: 'Привет! Вот моя визитка с контактами:',
  },
  AM: {
    ...SHARED_LINKS,
    badge: 'Էսթետիկ ստոմատոլոգիա',
    name1: 'ԱՐՄԵՆ',
    name2: 'ԳՐԻԳՈՐՅԱՆ',
    role: 'DMD, Գլխավոր վիրաբույժ',
    subUsername: 'Շվեյցարական պրոտոկոլ և թվային ստոմատոլոգիա',
    location: 'Երևան • VIP Բժշկական տուրիզմ',
    service1Title: 'Թվային Էսթետիկա',
    service1Text: '3D մոդելավորում և վինիրներ 1 օրում',
    service2Title: 'VIP Բժշկական տուրիզմ',
    service2Text: 'Տրանսֆեր, պրեմիում-հյուրանոց և All-Inclusive',
    service3Title: 'Շվեյցարական որակ',
    service3Text: 'Երաշխիք իմպլանտների և նյութերի համար',
    quote: 'Կատարյալ ժպիտը գիտություն է, ճշգրտություն և անթերի սպասարկում:',
    actionText: 'Բուժման պլան',
    actionLink: 'https://wa.me/79990000000?text=Բարև%20Ձեզ!%20Ցանկանում%20եմ%20քննարկել%20բուժման%20պլանը',
    modalTitle: 'Կիսվել այցեքարտով',
    modalText: 'Թույլ տվեք սկանավորել QR կոդը կամ ուղարկեք հղումը:',
    btnCopy: 'Պատճենել',
    btnCopied: 'Պատճենված է!',
    btnShare: 'Կիսվել',
    shareTitle: 'Իմ թվային այցեքարտը',
    shareText: 'Ողջույն։ Ահա իմ այցեքարտը կոնտակտներով՝',
  },
  EN: {
    ...SHARED_LINKS,
    badge: 'Aesthetic Dentistry',
    name1: 'ARMEN',
    name2: 'GRIGORYAN',
    role: 'DMD, Chief Surgeon',
    subUsername: 'Swiss Protocol & Digital Dentistry',
    location: 'Yerevan • VIP Medtourism',
    service1Title: 'Digital Aesthetics',
    service1Text: '3D modeling and veneers in 1 day',
    service2Title: 'VIP Medtourism',
    service2Text: 'Transfer, premium hotel & All-Inclusive',
    service3Title: 'Swiss Quality',
    service3Text: 'Guarantee on implants and materials',
    quote: 'A perfect smile is a blend of science, precision, and flawless service.',
    actionText: 'Treatment Plan',
    actionLink: 'https://wa.me/79990000000?text=Hello!%20I%20would%20like%20to%20discuss%20a%20treatment%20plan',
    modalTitle: 'Share Business Card',
    modalText: 'Let someone scan the QR code or send the link directly.',
    btnCopy: 'Copy',
    btnCopied: 'Copied!',
    btnShare: 'Share',
    shareTitle: 'My Digital Business Card',
    shareText: 'Hello! Here is my business card with contacts:',
  }
};

// ==========================================
// 🎨 ГЛОБАЛЬНЫЕ СТИЛИ (Только необходимое)
// ==========================================
const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Физика и 3D */
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  /* Искры */
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* Эффект сгорания бумаги */
  @keyframes simple-fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  
  @media (max-width: 639px) {
    .smooth-mask-wipe {
      animation: simple-fade-in 1.5s ease-in-out forwards;
    }
    .burn-fire-edge {
      display: none !important;
    }
  }
  
  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%;
      mask-size: 300% 300%;
      -webkit-mask-position: 100% 0%;
      mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: mask-position, -webkit-mask-position;
    }
    .burn-fire-edge {
      background: 
        linear-gradient(224deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        ),
        linear-gradient(226deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        );
      background-size: 300% 300%;
      background-position: 100% 0%;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 8px var(--burn-c2)) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: background-position, opacity;
    }
  }
`;

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ
// ==========================================
const BurnRevealImage = ({ src, className, style, imgClassName = "" }) => {
  // Цветовая тема огня для Стоматолога (Медицинский Cyan/Бирюзовый)
  const theme = { 
    c1: 'rgba(6, 182, 212, 0.9)', 
    c2: 'rgba(14, 165, 233, 1)', 
    c3: 'rgba(125, 211, 252, 0.8)' 
  };
  
  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': theme.c1,
          '--burn-c2': theme.c2,
          '--burn-c3': theme.c3,
        }}
      />
    </div>
  );
};

// ==========================================
// 🦷 КОМПОНЕНТ ВИЗИТКИ (СТОМАТОЛОГ)
// ==========================================
const DentalCard = ({ lang }) => {
  const CONTENT = CONTENT_DATA[lang] || CONTENT_DATA.RU;

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(6,182,212,0.2)] overflow-hidden bg-[#05050a] text-white flex flex-col p-[clamp(1rem,5cqw,1.5rem)] group-hover:shadow-[0_20px_80px_rgba(6,182,212,0.4)] transition-shadow duration-700 border border-slate-700/50">
        
        {/* Обертка для фона */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          {/* Медицинский градиент */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-[#05050a] to-cyan-900/30 opacity-80 mix-blend-normal sm:mix-blend-screen"></div>
          
          {/* Мягкое циановое свечение */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-cyan-500/10 blur-[80px] rounded-full z-0"></div>
        </div>

        {/* Сгорающий фон (Медицинский Cyan огонь) - Убраны серые фильтры для сочного цвета */}
        <BurnRevealImage src={CONTENT.bgImage} className="opacity-75 sm:opacity-90" />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-[#151515]/95 sm:bg-black/60 sm:backdrop-blur-md px-[clamp(0.75rem,4cqw,1rem)] py-[clamp(0.375rem,2cqw,0.5rem)] rounded-full border border-cyan-500/30 flex items-center gap-[clamp(0.375rem,2cqw,0.5rem)] shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-[clamp(0.25rem,1.5cqw,0.375rem)] h-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
              <span className="text-[clamp(0.5rem,2.5cqw,0.625rem)] font-bold tracking-widest uppercase text-cyan-50">{CONTENT.badge}</span>
            </div>
            <Shield className="w-[clamp(1.5rem,8cqw,2rem)] h-[clamp(1.5rem,8cqw,2rem)] text-cyan-200/50 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]" />
          </div>

          <div className="mb-[clamp(0.375rem,2cqw,0.5rem)]">
            <h2 className="text-[clamp(1.875rem,10cqw,2.25rem)] leading-tight font-light mb-[clamp(0.125rem,1cqw,0.25rem)] uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {CONTENT.name1}
              <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-400">{CONTENT.name2}</span>
            </h2>
            <div className="flex flex-col gap-[clamp(0.375rem,2cqw,0.5rem)] mt-[clamp(0.5rem,3cqw,0.75rem)]">
              <p className="text-slate-300 font-medium text-[clamp(0.5rem,2.5cqw,0.625rem)] uppercase tracking-[0.3em] border-l-2 border-cyan-500 pl-[clamp(0.5rem,3cqw,0.75rem)]">
                {CONTENT.role}
              </p>
              <div className="flex items-center gap-[clamp(0.25rem,1.5cqw,0.375rem)] mt-[clamp(0.125rem,1cqw,0.25rem)] bg-[#151515]/95 sm:bg-cyan-950/40 w-fit px-[clamp(0.5rem,3cqw,0.75rem)] py-[clamp(0.25rem,1.5cqw,0.375rem)] rounded-sm border border-cyan-500/20 sm:backdrop-blur-sm">
                <MapPin className="w-[clamp(0.5rem,2.5cqw,0.75rem)] h-[clamp(0.5rem,2.5cqw,0.75rem)] text-cyan-400" />
                <span className="text-[clamp(0.4rem,1.8cqw,0.5rem)] font-bold uppercase tracking-widest text-cyan-100">{CONTENT.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (Trust Grid & Service) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(6,182,212,0.2)] overflow-hidden bg-[#05050a] flex flex-col text-white border border-slate-700/50" style={{ transform: 'rotateY(180deg)' }}>
        {/* Микро-сетка хирургической точности */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

        {/* Платиновое / Сапфировое свечение */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col h-full p-[clamp(1rem,5cqw,1.5rem)]">
          {/* Шапка: Портрет и Юзернейм */}
          <div className="flex items-center gap-[clamp(0.75rem,4cqw,1rem)] mb-[clamp(1rem,5cqw,1.25rem)] relative z-20">
            <div className="w-[clamp(3rem,15cqw,4rem)] h-[clamp(3rem,15cqw,4rem)] shrink-0 rounded-full p-[clamp(1px,0.5cqw,2px)] bg-gradient-to-br from-slate-300 via-slate-500 to-slate-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <img src={CONTENT.avatar} alt={CONTENT.name1} className="w-full h-full object-cover rounded-full border-2 border-[#05050a]" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-[clamp(0.875rem,4cqw,1rem)] font-light tracking-[0.15em] text-white uppercase leading-none mb-[clamp(0.25rem,1.5cqw,0.375rem)] truncate">{CONTENT.username}</h3>
              <p className="text-cyan-400/80 text-[clamp(0.4rem,1.8cqw,0.5rem)] uppercase tracking-[0.2em] font-bold truncate">{CONTENT.subUsername}</p>
            </div>
          </div>

          {/* Блок доверия (Trust Grid) - Убрана блокировка клика, чтобы пустые места переворачивали визитку */}
          <div className="flex flex-col gap-[clamp(0.5rem,2.5cqw,0.625rem)] mb-[clamp(1rem,5cqw,1.25rem)] flex-1 justify-center relative z-20">
            {[
              { icon: Diamond, title: CONTENT.service1Title, text: CONTENT.service1Text },
              { icon: PlaneTakeoff, title: CONTENT.service2Title, text: CONTENT.service2Text },
              { icon: Shield, title: CONTENT.service3Title, text: CONTENT.service3Text },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#151515]/95 sm:bg-slate-900/60 sm:backdrop-blur-md border border-slate-700/50 rounded-xl p-[clamp(0.625rem,3.5cqw,0.875rem)] flex items-center gap-[clamp(0.625rem,3.5cqw,0.875rem)] shadow-inner transition-colors hover:bg-slate-800/60">
                <div className="w-[clamp(1.5rem,8cqw,2rem)] h-[clamp(1.5rem,8cqw,2rem)] rounded-full bg-cyan-950/50 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-inner">
                  <item.icon className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-cyan-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[clamp(0.5rem,2.5cqw,0.625rem)] tracking-wider uppercase text-slate-100 mb-[clamp(0.0625rem,0.5cqw,0.125rem)]">{item.title}</span>
                  <span className="text-[clamp(0.45rem,2.2cqw,0.5625rem)] text-slate-400 leading-tight pr-[clamp(0.25rem,2cqw,0.5rem)]">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Цитата - Убрана блокировка клика */}
          <div className="mt-auto mb-[clamp(0.75rem,4cqw,1rem)] relative z-20">
            <p className="text-[clamp(0.5rem,2.5cqw,0.625rem)] text-slate-400 uppercase tracking-widest font-light text-center px-[clamp(0.25rem,2cqw,0.5rem)]">
              "{CONTENT.quote}"
            </p>
          </div>

          {/* Главная кнопка действия (оставляем stopPropagation, чтобы клик открывал WhatsApp, а не вертел визитку) */}
          <a href={CONTENT.actionLink} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-100 text-slate-900 font-bold uppercase tracking-[0.15em] text-[clamp(0.5rem,2.5cqw,0.625rem)] py-[clamp(0.625rem,3.5cqw,0.875rem)] rounded-xl flex items-center justify-center gap-[clamp(0.5rem,2.5cqw,0.625rem)] transition-all hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] group relative overflow-hidden active:scale-95 mb-[clamp(0.5rem,3cqw,0.75rem)] z-20 no-tilt" onClick={e => e.stopPropagation()}>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-slate-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Activity className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-cyan-600" />
            {CONTENT.actionText}
          </a>
          
          {/* Сквозной бар быстрых контактов - Блокировка клика перенесена только на сами ссылки */}
          <div className="flex justify-between gap-[clamp(0.25rem,1.5cqw,0.5rem)] w-full pb-[clamp(0.125rem,1cqw,0.25rem)] z-20 no-tilt">
            <a href={CONTENT.waLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex-1 h-[clamp(2rem,10cqw,2.75rem)] bg-[#151515]/95 sm:bg-slate-900/80 sm:backdrop-blur-md border border-slate-700/50 rounded-xl flex items-center justify-center shadow-md hover:bg-cyan-950/60 hover:border-cyan-500/50 transition-all active:scale-95 group">
               <MessageCircle className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>
            <a href={CONTENT.phoneLink} onClick={e => e.stopPropagation()} className="flex-1 h-[clamp(2rem,10cqw,2.75rem)] bg-[#151515]/95 sm:bg-slate-900/80 sm:backdrop-blur-md border border-slate-700/50 rounded-xl flex items-center justify-center shadow-md hover:bg-cyan-950/60 hover:border-cyan-500/50 transition-all active:scale-95 group">
               <Phone className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-slate-300 group-hover:scale-110 transition-transform" />
            </a>
            <a href={CONTENT.tgLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex-1 h-[clamp(2rem,10cqw,2.75rem)] bg-[#151515]/95 sm:bg-slate-900/80 sm:backdrop-blur-md border border-slate-700/50 rounded-xl flex items-center justify-center shadow-md hover:bg-cyan-950/60 hover:border-cyan-500/50 transition-all active:scale-95 group">
               <Globe className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-blue-400 group-hover:scale-110 transition-transform" />
            </a>
            <a href={CONTENT.instLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex-1 h-[clamp(2rem,10cqw,2.75rem)] bg-[#151515]/95 sm:bg-slate-900/80 sm:backdrop-blur-md border border-slate-700/50 rounded-xl flex items-center justify-center shadow-md hover:bg-cyan-950/60 hover:border-cyan-500/50 transition-all active:scale-95 group">
               <InstagramIcon className="w-[clamp(0.75rem,3.5cqw,1rem)] h-[clamp(0.75rem,3.5cqw,1rem)] text-pink-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// 🚀 ОСНОВНОЕ ПРИЛОЖЕНИЕ
// ==========================================
const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('RU');
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isFlippingRef = useRef(false);

  // Настройки цвета темы под стоматологию (Cyan/Slate)
  const glowColor = 'rgba(6,182,212,0.6)'; 
  const modalTheme = { bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.3)', icon: 'text-cyan-400' };

  // Параллакс фона
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // 3D наклон
  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current || isFlipped) return;
    
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  // Звук переворота
  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Игнорируем ошибки автоплея
    }
  };

  const handleFlip = () => {
    playFlipSound();
    
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's',
          size: Math.random() * 2.5 + 1.5 + 'px',
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: CONTENT_DATA[lang].shareTitle,
          text: CONTENT_DATA[lang].shareText,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const downloadVCard = () => {
    let phoneStr = '';
    if (CONTENT_DATA[lang].waLink) {
      const match = CONTENT_DATA[lang].waLink.match(/\d+/);
      if (match) phoneStr = `+${match[0]}`;
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${CONTENT_DATA[lang].name1} ${CONTENT_DATA[lang].name2}`,
      `TITLE:${CONTENT_DATA[lang].role}`,
      phoneStr ? `TEL;TYPE=CELL,VOICE:${phoneStr}` : '',
      phoneStr ? `URL;TYPE=WhatsApp:https://wa.me/${phoneStr.replace('+', '')}` : '',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none relative overflow-hidden justify-center items-center p-4 sm:p-8">
      <style>{globalStyles}</style>

      {/* Параллакс (Тематические цвета: Cyan и Slate) */}
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out hidden sm:block"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out hidden sm:block"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* Основной контейнер (отцентрирован идеально) */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 relative z-40">
        
        {/* Карточка */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full @container aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none"
          style={{ perspective: '1500px', maxWidth: 'min(26rem, 94vw, 52dvh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ boxShadow: `0 0 60px ${glowColor}` }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px ${glowColor}` }} 
              />

              <DentalCard lang={lang} />

              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  zIndex: 50,
                }}
              />
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden mix-blend-normal sm:mix-blend-overlay"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  zIndex: 50,
                }}
              />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ КНОПОК ПОД ВИЗИТКОЙ */}
        <div className="fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 bg-[#181818]/95 sm:bg-white/5 sm:backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-0.5 px-1">
            {['RU', 'AM', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest transition-all duration-500 ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                {lang === l && (
                  <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] pointer-events-none"></span>
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-white/20 mx-0.5"></div>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowShare(true);
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              downloadVCard();
            }}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#151515]/95 sm:bg-black/40 sm:backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="bg-[#151515] sm:bg-[rgba(6,182,212,0.15)] sm:backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ borderColor: modalTheme.border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${modalTheme.icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${modalTheme.icon}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{CONTENT_DATA[lang].modalTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{CONTENT_DATA[lang].modalText}</p>
            
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? CONTENT_DATA[lang].btnCopied : CONTENT_DATA[lang].btnCopy}
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                {CONTENT_DATA[lang].btnShare}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
