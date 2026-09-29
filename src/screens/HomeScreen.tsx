import React, { useState } from 'react';
import { ScreenType } from '../../src/types';
import { ATELIER_INFO, CRAFT_SERVICES, TESTIMONIALS } from '../data/content';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: (serviceName?: string) => void;
  onShowToast: (message: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenBooking,
  onShowToast,
}) => {
  // Interactive Tape Measure Ruler state
  const [rulerPos, setRulerPos] = useState(45); // percentage
  const [activeJourneyStage, setActiveJourneyStage] = useState(2); // 0-indexed, stage 3 is index 2

  const chestInches = (36 + (rulerPos / 100) * 8).toFixed(1);
  const chestCm = (parseFloat(chestInches) * 2.54).toFixed(1);

  const journeyStages = [
    {
      stageNumber: 1,
      tag: 'Stage 1 of 4',
      badge: 'Initial Consultation',
      title: 'Silhouette & Cloth Selection',
      description:
        'A comprehensive discussion exploring fabric weight, lapel architecture, canvas stiffness, and garment utility over artisan espresso in our private studio.',
    },
    {
      stageNumber: 2,
      tag: 'Stage 2 of 4',
      badge: 'Pattern Drafting',
      title: '32-Point Anatomical Mapping',
      description:
        'Master cutters draft a 2D bespoke paper pattern entirely unique to your posture, shoulder slope, and natural stance, ensuring seamless proportional balance.',
    },
    {
      stageNumber: 3,
      tag: 'Stage 3 of 4',
      badge: 'The Baste Fitting',
      title: 'Sculpting on Pure Muslin Canvas',
      description:
        'Your garment is temporarily assembled with white basting thread. During this private consultation, shoulder balance and lapel curvature are adjusted directly on your silhouette.',
    },
    {
      stageNumber: 4,
      tag: 'Stage 4 of 4',
      badge: 'Final Precision Finish',
      title: 'Hand-Milled Stitches & Delivery',
      description:
        'Artisans meticulously set horn buttons, hand-sew Milanese lapel buttonholes, and hand-press the chest canvas before white-glove packaging in cedar-lined cases.',
    },
  ];

  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (clickX / rect.width) * 100));
    setRulerPos(pct);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Interactive Measuring Tape Ribbon / Delight Ticker */}
      <div className="w-full bg-[#f1eee7] py-2 overflow-x-auto no-scrollbar border-b border-[#e5dfd3]/60 select-none">
        <div className="flex items-center space-x-6 text-[#4a4640] text-[11px] font-bold tracking-widest uppercase whitespace-nowrap px-4">
          <span className="flex items-center gap-1.5 text-[#775a19]">
            <span className="material-symbols-outlined text-sm">straighten</span>
            SAVILE ROW HERITAGE
          </span>
          <span className="text-[#ccc5bd]">•</span>
          <span>HAND-STITCHED CANVAS</span>
          <span className="text-[#ccc5bd]">•</span>
          <span className="flex items-center gap-1.5 text-[#775a19]">
            <span className="material-symbols-outlined text-sm">verified</span>
            GUILD CERTIFIED
          </span>
          <span className="text-[#ccc5bd]">•</span>
          <span>WHITE-GLOVE AT-HOME FITTINGS</span>
          <span className="text-[#ccc5bd]">•</span>
          <span>MILAN &amp; YORKSHIRE MILLS</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-5 pt-8 pb-10 flex flex-col items-start max-w-xl mx-auto w-full overflow-hidden">
        {/* Editorial Watermark / Chalk Art Line Overlay */}
        <div className="absolute right-0 top-4 -mr-10 opacity-5 pointer-events-none select-none text-[#181716]">
          <svg
            fill="none"
            height="220"
            stroke="currentColor"
            strokeWidth="1.2"
            viewBox="0 0 100 100"
            width="220"
          >
            <path d="M10,20 L90,20 L60,85 L40,85 Z" />
            <path d="M50,20 L50,85" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="30" />
          </svg>
        </div>

        {/* Craftsmanship Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fed488]/80 text-[#785a1a] shadow-sm mb-5 border border-[#775a19]/20">
          <span className="material-symbols-outlined text-xs">verified</span>
          <span className="text-[10px] uppercase tracking-wider font-bold">
            Handcrafted Excellence Since 2012
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1c1c18] tracking-tight leading-[1.15] mb-4">
          Perfect Fit.<br />
          <span className="italic font-normal text-[#775a19]">Timeless Style.</span><br />
          Your Bespoke Wardrobe.
        </h1>

        {/* Subtitle Description */}
        <p className="text-[15px] leading-relaxed text-[#4a4640] mb-6">
          Experience master tailoring from the comfort of your home. From sharp custom suits and bridal gowns to precision alterations, we bring haute couture craftsmanship to your everyday wear.
        </p>

        {/* CTAs */}
        <div className="w-full flex flex-col gap-3 mb-8">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="w-full py-4 px-6 bg-[#181716] text-white rounded-md flex items-center justify-between shadow-md active:scale-[0.99] transition-transform hover:bg-[#2c2a27] group"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffdea5] text-xl">
                event_seat
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold">
                Book a Fitting Session
              </span>
            </div>
            <span className="material-symbols-outlined text-[#ffdea5] text-lg transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('lookbook')}
            className="w-full py-3.5 px-6 bg-[#ebe8e1] text-[#1c1c18] rounded-md flex items-center justify-center gap-2 active:bg-[#e5e2db] hover:bg-[#e5e2db] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">auto_stories</span>
            <span className="text-xs uppercase tracking-wider font-semibold">
              Explore Lookbook
            </span>
          </button>
        </div>

        {/* Interactive Measurement Ruler Delight */}
        <div className="w-full bg-[#f6f3ec] rounded-xl p-4 mb-8 shadow-sm border border-[#e5dfd3]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-widest text-[#4a4640] flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs text-[#775a19]">tune</span>
              Digital Tape Measure
            </span>
            <span className="text-xs text-[#775a19] font-bold tabular-nums">
              Chest: {chestInches} IN / {chestCm} CM
            </span>
          </div>

          {/* Tactile Slider Scale */}
          <div
            onClick={handleRulerClick}
            className="relative w-full h-10 bg-[#e5e2db] rounded-md flex items-center px-2 cursor-pointer select-none overflow-hidden border border-[#ccc5bd]/50"
            role="slider"
            aria-valuenow={parseFloat(chestInches)}
            aria-valuemin={36}
            aria-valuemax={44}
            tabIndex={0}
          >
            <div className="absolute inset-0 flex justify-between items-end px-3 pb-1 opacity-50 pointer-events-none">
              <div className="h-4 w-0.5 bg-[#1c1c18]" />
              <div className="h-2 w-0.5 bg-[#1c1c18]" />
              <div className="h-2 w-0.5 bg-[#1c1c18]" />
              <div className="h-3 w-0.5 bg-[#1c1c18]" />
              <div className="h-5 w-0.5 bg-[#775a19]" />
              <div className="h-3 w-0.5 bg-[#1c1c18]" />
              <div className="h-2 w-0.5 bg-[#1c1c18]" />
              <div className="h-2 w-0.5 bg-[#1c1c18]" />
              <div className="h-4 w-0.5 bg-[#1c1c18]" />
              <div className="h-2 w-0.5 bg-[#1c1c18]" />
              <div className="h-3 w-0.5 bg-[#1c1c18]" />
              <div className="h-6 w-0.5 bg-[#181716]" />
            </div>

            {/* Draggable thumb */}
            <div
              className="absolute w-3.5 h-7 bg-[#775a19] rounded-sm shadow-md transition-all -ml-1.5"
              style={{ left: `${rulerPos}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px] text-[#4a4640]">
            <span>36.0 IN (Slim)</span>
            <span className="italic">Tap anywhere to test precision tolerance</span>
            <span>44.0 IN (Athletic)</span>
          </div>
        </div>

        {/* Trust Badges Bento List */}
        <div className="w-full grid grid-cols-1 gap-2.5">
          <div className="flex items-center gap-3.5 p-3.5 bg-[#f6f3ec] rounded-xl shadow-sm border border-[#e5dfd3]/80">
            <div className="w-10 h-10 rounded-full bg-[#fed488] flex items-center justify-center text-[#785a1a] shrink-0">
              <span className="material-symbols-outlined text-xl">star</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#1c1c18]">4.9/5 Rating</p>
              <p className="text-xs text-[#4a4640] truncate">From 1,200+ Discerning Clients</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 bg-[#f6f3ec] rounded-xl shadow-sm border border-[#e5dfd3]/80">
            <div className="w-10 h-10 rounded-full bg-[#e5e2db] flex items-center justify-center text-[#181716] shrink-0">
              <span className="material-symbols-outlined text-xl">content_cut</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#1c1c18]">100% Measurement Guarantee</p>
              <p className="text-xs text-[#4a4640] truncate">Zero-cost remakes until sublime</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 bg-[#f6f3ec] rounded-xl shadow-sm border border-[#e5dfd3]/80">
            <div className="w-10 h-10 rounded-full bg-[#e5e2db] flex items-center justify-center text-[#775a19] shrink-0">
              <span className="material-symbols-outlined text-xl">local_shipping</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#1c1c18]">Free Pickup &amp; Delivery</p>
              <p className="text-xs text-[#4a4640] truncate">White-glove concierge on orders $150+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Master Tailor Note & Atelier Highlights */}
      <section className="px-5 py-10 bg-[#f6f3ec] border-y border-[#e5dfd3]">
        <div className="max-w-xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#775a19] text-base">
              workspace_premium
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
              The Atelier Note
            </span>
          </div>

          <h2 className="font-serif text-2xl text-[#1c1c18] mb-5 font-medium">
            Master Craftsmanship, Intimately Delivered
          </h2>

          {/* Tailor Card Profile Mosaic */}
          <div className="bg-[#fdfbf7] rounded-xl overflow-hidden shadow-md border border-[#e5dfd3]">
            <div className="relative w-full h-80 overflow-hidden bg-[#e5e2db]">
              <img
                alt="Julian Thorne master tailor portrait draped with measuring tape"
                className="w-full h-full object-cover object-top"
                src={ATELIER_INFO.tailorAvatar}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181716]/90 via-[#181716]/20 to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#775a19] text-white px-2 py-0.5 rounded">
                    Head of Cutting
                  </span>
                  <p className="font-serif text-2xl mt-1 text-white font-medium">Julian Thorne</p>
                  <p className="text-xs text-white/90">
                    Savile Row Guild Member • 24 Years Master Cut
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <blockquote className="font-serif italic text-[#1c1c18] text-base mb-3 leading-relaxed">
                &ldquo;A great suit does not disguise the body; it celebrates the posture of the wearer with unwavering architectural grace.&rdquo;
              </blockquote>

              <p className="text-sm text-[#4a4640] mb-5 leading-relaxed">
                Every garment sculpted under StitchCraft undergoes a rigorous 42-point anatomical assessment. Whether commissioning a black-tie dinner jacket or precision taper on heirloom wool, Julian and his guild members oversee each basting stitch by hand.
              </p>

              {/* Highlights Metric Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#e5dfd3]">
                <div className="bg-[#f1eee7] p-3 rounded-lg text-center">
                  <p className="font-serif text-2xl text-[#181716] font-medium">5,400+</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640]">
                    Hand Stitches / Coat
                  </p>
                </div>
                <div className="bg-[#f1eee7] p-3 rounded-lg text-center">
                  <p className="font-serif text-2xl text-[#775a19] font-medium">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640]">
                    Natural Canvassing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Services Preview Summary */}
      <section className="px-5 py-10 max-w-xl mx-auto w-full">
        <div className="flex flex-col mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
              Our Repertoire
            </span>
            <button
              type="button"
              onClick={() => onNavigate('craft')}
              className="text-xs uppercase tracking-wider text-[#181716] flex items-center gap-1 font-bold hover:text-[#775a19] transition-colors"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <h2 className="font-serif text-2xl text-[#1c1c18] font-medium">
            Curated Tailoring Services
          </h2>
          <p className="text-xs text-[#4a4640] mt-0.5">From first sketch to the final fitting brush.</p>
        </div>

        {/* Service Cards Grid */}
        <div className="flex flex-col gap-4">
          {CRAFT_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#fdfbf7] rounded-xl p-5 shadow-sm border border-[#e5dfd3] flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-lg bg-[#f1eee7] flex items-center justify-center text-[#181716]">
                    <span className="material-symbols-outlined text-2xl">{srv.icon}</span>
                  </div>
                  {srv.startingPrice && (
                    <span className="text-[11px] font-semibold bg-[#ebe8e1] text-[#1c1c18] px-2.5 py-1 rounded uppercase tracking-wider">
                      {srv.startingPrice}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl text-[#1c1c18] font-medium mb-1.5">
                  {srv.title}
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed mb-4">
                  {srv.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f1eee7]">
                <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold">
                  {srv.turnaround || srv.badge}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenBooking(srv.title)}
                  className="w-9 h-9 rounded-full bg-[#f1eee7] flex items-center justify-center text-[#1c1c18] hover:bg-[#181716] hover:text-white transition-colors"
                  aria-label={`Book fitting for ${srv.title}`}
                >
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Bespoke Fitting Stage Tracker */}
      <section className="px-5 py-8 bg-[#ebe8e1] border-y border-[#ccc5bd]/50">
        <div className="max-w-xl mx-auto w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
                The Journey
              </span>
              <h3 className="font-serif text-xl text-[#1c1c18] font-medium">
                How Bespoke Unfolds
              </h3>
            </div>
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              verified_user
            </span>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between relative my-5 px-2">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#ccc5bd] -z-0" />
            {journeyStages.map((stg, idx) => (
              <button
                type="button"
                key={stg.stageNumber}
                onClick={() => setActiveJourneyStage(idx)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  activeJourneyStage === idx
                    ? 'bg-[#fed488] text-[#785a1a] ring-4 ring-[#775a19]/20 scale-110 shadow-sm'
                    : idx < activeJourneyStage
                    ? 'bg-[#181716] text-white'
                    : 'bg-[#e5e2db] text-[#4a4640] hover:bg-[#f1eee7]'
                }`}
              >
                {stg.stageNumber}
              </button>
            ))}
          </div>

          {/* Dynamic Stage Details Card */}
          <div className="bg-[#fdfbf7] p-5 rounded-xl shadow-sm border border-[#e5dfd3]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] uppercase text-[#775a19] tracking-wider font-bold">
                {journeyStages[activeJourneyStage].tag}
              </span>
              <span className="text-[10px] uppercase font-semibold bg-[#f1eee7] px-2 py-0.5 rounded text-[#4a4640]">
                {journeyStages[activeJourneyStage].badge}
              </span>
            </div>
            <p className="font-semibold text-base text-[#1c1c18] mb-1">
              {journeyStages[activeJourneyStage].title}
            </p>
            <p className="text-xs text-[#4a4640] leading-relaxed">
              {journeyStages[activeJourneyStage].description}
            </p>
          </div>
        </div>
      </section>

      {/* Client Endorsements */}
      <section className="px-5 py-10 max-w-xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-[#775a19] text-base">hotel_class</span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
            Client Endorsements
          </span>
        </div>
        <h2 className="font-serif text-2xl text-[#1c1c18] font-medium mb-6">
          Words From Our Patrons
        </h2>

        <div className="flex flex-col gap-4">
          {TESTIMONIALS.slice(0, 2).map((t) => (
            <div
              key={t.id}
              className="bg-[#f6f3ec] p-5 rounded-xl shadow-sm border border-[#e5dfd3] flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#775a19] mb-3 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-base">
                      star
                    </span>
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#1c1c18] leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#e5dfd3]/60">
                <div className="w-10 h-10 rounded-full bg-[#e5e2db] flex items-center justify-center text-sm text-[#181716] font-serif font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#1c1c18]">{t.author}</p>
                  <p className="text-[10px] uppercase text-[#4a4640] tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Review CTA */}
        <div className="mt-4 p-4 bg-[#f1eee7] rounded-xl flex items-center justify-between border border-[#e5dfd3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19] text-lg">rate_review</span>
            <span className="text-xs text-[#1c1c18]">Read all 1,200+ verified patron notes</span>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Showing verified Savile Row guild archives.')}
            className="text-[11px] uppercase tracking-wider text-[#181716] font-bold hover:text-[#775a19] transition-colors"
          >
            Explore
          </button>
        </div>
      </section>

      {/* Fitting Invitation Action Banner */}
      <section className="px-5 pb-10 max-w-xl mx-auto w-full">
        <div className="bg-[#181716] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-[#775a19]/30">
          <div className="absolute -right-8 -bottom-8 opacity-10 text-white pointer-events-none select-none">
            <span className="material-symbols-outlined" style={{ fontSize: '150px' }}>
              design_services
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffdea5]">
            Bespoke Concierge
          </span>
          <h3 className="font-serif text-2xl text-white mt-1 mb-2 font-medium">
            Ready for a Tailored Wardrobe?
          </h3>
          <p className="text-xs text-white/80 mb-6 leading-relaxed max-w-sm">
            Reserve an at-home measurement appointment or schedule an atelier session with Julian Thorne today.
          </p>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#775a19] text-white rounded-md text-xs font-semibold uppercase tracking-widest hover:bg-[#8f6e21] transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-sm text-[#ffdea5]">
              calendar_month
            </span>
            <span>Reserve Your Appointment</span>
          </button>
        </div>
      </section>

      {/* Comprehensive Atelier Footer */}
      <footer className="bg-[#e5e2db] px-5 pt-8 pb-12 text-[#1c1c18] border-t border-[#ccc5bd]">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          {/* Brand Statement */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl text-[#1c1c18] font-medium tracking-tight">
                StitchCraft
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#775a19] text-white px-2 py-0.5 rounded">
                Atelier
              </span>
            </div>
            <p className="text-xs text-[#4a4640] leading-relaxed">
              Redefining custom tailoring through modern convenience and timeless artisan quality.
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] mb-2.5">
                Atelier Nav
              </p>
              <ul className="flex flex-col gap-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('craft')}
                    className="text-[#1c1c18] hover:text-[#775a19] transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('lookbook')}
                    className="text-[#1c1c18] hover:text-[#775a19] transition-colors"
                  >
                    Lookbook
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('sizing')}
                    className="text-[#1c1c18] hover:text-[#775a19] transition-colors"
                  >
                    Sizing Guide
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#775a19] mb-2.5">
                Private Client
              </p>
              <ul className="flex flex-col gap-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('craft')}
                    className="text-[#1c1c18] hover:text-[#775a19] transition-colors"
                  >
                    Pricing &amp; Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onShowToast('Client Reviews archive loaded')}
                    className="text-[#1c1c18] hover:text-[#775a19] transition-colors"
                  >
                    Client Reviews
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onShowToast('Privacy Policy: All client measurements and patterns remain confidential under Savile Row Guild standards.')}
                    className="text-[#4a4640] hover:text-[#775a19] transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info Block */}
          <div className="bg-[#f1eee7] rounded-xl p-4 flex flex-col gap-3 border border-[#e5dfd3]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Studio &amp; Inquiries
            </p>
            <div className="flex items-start gap-2.5 text-xs text-[#1c1c18]">
              <span className="material-symbols-outlined text-[#775a19] text-base shrink-0 mt-0.5">
                location_on
              </span>
              <span>{ATELIER_INFO.nyAddress}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#1c1c18]">
              <span className="material-symbols-outlined text-[#775a19] text-base shrink-0">
                call
              </span>
              <a href={`tel:${ATELIER_INFO.phoneUS}`} className="hover:text-[#775a19]">
                {ATELIER_INFO.phoneUS}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#1c1c18]">
              <span className="material-symbols-outlined text-[#775a19] text-base shrink-0">
                mail
              </span>
              <a href={`mailto:${ATELIER_INFO.email}`} className="hover:text-[#775a19] truncate">
                {ATELIER_INFO.email}
              </a>
            </div>
          </div>

          {/* Guarantee Seal & Copyright */}
          <div className="pt-2 flex flex-col items-center justify-center text-center gap-1.5 text-xs text-[#4a4640]">
            <div className="flex items-center justify-center gap-1 text-[#775a19]">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-[10px] font-bold tracking-wider uppercase">
                Savile Row Bespoke Code Compliant
              </span>
            </div>
            <p className="text-[11px]">
              &copy; 2026 StitchCraft Atelier. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
