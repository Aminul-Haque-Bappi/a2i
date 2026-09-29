import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ATELIER_INFO, BESPOKE_STEPS, CRAFT_SERVICES } from '../data/content';

interface CraftScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: (serviceName?: string) => void;
  onShowToast: (message: string) => void;
}

export const CraftScreen: React.FC<CraftScreenProps> = ({
  onOpenBooking,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepLabels = ['01 Consultation', '02 3D & Manual', '03 Basting', '04 Hand Finish', '05 Delivery'];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Editorial Page Intro */}
      <section className="px-5 pt-6 pb-6 max-w-xl mx-auto w-full flex flex-col gap-2">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]" />
          <span className="text-[11px] font-bold text-[#775a19] uppercase tracking-widest">
            Sartorial Excellence
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c18] font-medium tracking-tight">
          Our Craft &amp; Services
        </h1>
        <p className="text-sm text-[#4a4640] max-w-md leading-relaxed">
          Designed for perfection, tailored to your exact body contours.
        </p>

        {/* Quick Stat Strip (Tactile Parchment Blocks) */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3] flex flex-col shadow-sm text-center">
            <span className="font-serif text-2xl text-[#775a19] font-medium">50+</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640] mt-0.5">
              Stitch Hours
            </span>
          </div>
          <div className="bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3] flex flex-col shadow-sm text-center">
            <span className="font-serif text-2xl text-[#775a19] font-medium">4,200</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640] mt-0.5">
              Cloth Archive
            </span>
          </div>
          <div className="bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3] flex flex-col shadow-sm text-center">
            <span className="font-serif text-2xl text-[#775a19] font-medium">100%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640] mt-0.5">
              Hand-Basted
            </span>
          </div>
        </div>
      </section>

      {/* Service Cards Stack */}
      <section className="px-5 max-w-xl mx-auto w-full flex flex-col gap-6">
        {CRAFT_SERVICES.map((service) => (
          <article
            key={service.id}
            className="bg-[#fdfbf7] rounded-2xl overflow-hidden shadow-md border border-[#e5dfd3] flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Header */}
            <div className="relative w-full h-56 bg-[#e5e2db] overflow-hidden">
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-[#fdfbf7]/90 backdrop-blur-sm px-3 py-1 rounded text-[#1c1c18] text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-[#e5dfd3]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#775a19]" />
                <span>{service.badge}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col gap-3.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
                    {service.commissionNumber}
                  </span>
                  <h2 className="font-serif text-2xl text-[#1c1c18] font-medium mt-0.5">
                    {service.title}
                  </h2>
                </div>
                <span className="material-symbols-outlined text-[#775a19] text-2xl">
                  {service.icon}
                </span>
              </div>

              <p className="text-xs text-[#4a4640] leading-relaxed">
                {service.description}
              </p>

              {/* Fabric Gauge for Commission 01 */}
              {service.fabricGauge && (
                <div className="bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3] flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[#1c1c18]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640]">
                      {service.fabricGauge.label}
                    </span>
                    <span className="text-xs font-bold text-[#775a19]">
                      {service.fabricGauge.grade}
                    </span>
                  </div>
                  <div className="w-full bg-[#e5e2db] h-1.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-[#775a19] h-full rounded-full"
                      style={{ width: `${service.fabricGauge.percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#4a4640]">
                    {service.fabricGauge.subtext}
                  </p>
                </div>
              )}

              {/* Spec Tags */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f1eee7] px-2.5 py-1 rounded text-[#1c1c18] text-[10px] font-medium tracking-wide border border-[#e5dfd3]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Booking CTA Button */}
              <button
                type="button"
                onClick={() => onOpenBooking(service.title)}
                className="mt-2 w-full py-3.5 px-4 bg-[#181716] text-white rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2c2a27] transition-colors shadow-sm active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[#ffdea5] text-lg">
                  calendar_add_on
                </span>
                <span>Book a Fitting for This Service</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Interactive Step-by-Step Bespoke Process */}
      <section className="mt-10 px-5 max-w-xl mx-auto w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#775a19] text-base">
              architecture
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              The Savile Row Methodology
            </span>
          </div>
          <h2 className="font-serif text-2xl text-[#1c1c18] font-medium">
            The Bespoke Journey
          </h2>
          <p className="text-xs text-[#4a4640]">
            Tap each milestone to review the exacting stages behind every StitchCraft creation.
          </p>
        </div>

        {/* Stepper Selector Carousel / Taps */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          {stepLabels.map((lbl, idx) => (
            <button
              type="button"
              key={lbl}
              onClick={() => setActiveStepIndex(idx)}
              className={`px-3.5 py-2.5 rounded-lg text-left shrink-0 transition-all flex items-center gap-2 text-xs uppercase tracking-wider font-semibold ${
                activeStepIndex === idx
                  ? 'bg-[#181716] text-white shadow-sm'
                  : 'bg-[#f1eee7] text-[#4a4640] hover:bg-[#ebe8e1] hover:text-[#1c1c18]'
              }`}
            >
              <span>{lbl}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Step Display Card */}
        <div className="bg-[#f6f3ec] p-6 rounded-2xl flex flex-col gap-4 shadow-sm border border-[#e5dfd3] transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="bg-[#fed488] text-[#785a1a] px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold">
              {BESPOKE_STEPS[activeStepIndex].stage}
            </span>
            <span className="material-symbols-outlined text-[#775a19] text-2xl">
              {BESPOKE_STEPS[activeStepIndex].icon}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#1c1c18] font-medium">
              {BESPOKE_STEPS[activeStepIndex].title}
            </h3>
            <p className="text-xs text-[#4a4640] mt-1.5 leading-relaxed">
              {BESPOKE_STEPS[activeStepIndex].description}
            </p>
          </div>

          <div className="bg-[#fdfbf7] p-3.5 rounded-xl border border-[#e5dfd3] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#775a19]">schedule</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4a4640]">
                Estimated Timeline
              </span>
              <span className="text-sm font-semibold text-[#1c1c18]">
                {BESPOKE_STEPS[activeStepIndex].duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Guaranteed Fit Protocol */}
      <section className="px-5 mt-6 max-w-xl mx-auto w-full">
        <div className="bg-[#fed488]/30 p-5 rounded-2xl flex flex-col gap-1.5 text-[#1c1c18] shadow-sm border border-[#775a19]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19]">verified</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Guaranteed Fit Protocol
            </span>
          </div>
          <p className="font-semibold text-sm">Complimentary Post-Finish Adjustments</p>
          <p className="text-xs text-[#4a4640] leading-relaxed">
            Every commission includes 60 days of complimentary minor adjustments to accommodate any physiological shifts.
          </p>
        </div>
      </section>

      {/* Footer Atelier Coordinates & Info */}
      <footer className="mt-12 bg-[#ebe8e1] px-5 py-10 flex flex-col gap-5 text-[#1c1c18] border-t border-[#ccc5bd]">
        <div className="max-w-xl mx-auto w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19] text-xl">
                location_city
              </span>
              <span className="font-serif text-2xl text-[#1c1c18] font-medium tracking-tight">
                StitchCraft Atelier
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Savile Row Heritage • Global Appointments
            </p>
          </div>

          {/* Address & Channels */}
          <div className="flex flex-col gap-2.5 text-xs text-[#4a4640]">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#775a19] text-base mt-0.5">
                pin_drop
              </span>
              <span>{ATELIER_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#775a19] text-base">call</span>
              <a href={`tel:${ATELIER_INFO.phoneLondon}`} className="hover:text-[#1c1c18]">
                {ATELIER_INFO.phoneLondon}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#775a19] text-base">mail</span>
              <a href={`mailto:${ATELIER_INFO.email}`} className="hover:text-[#1c1c18]">
                {ATELIER_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#775a19] text-base">schedule</span>
              <span>{ATELIER_INFO.hours}</span>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="w-full py-3.5 bg-[#181716] text-white rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2c2a27] transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-[#ffdea5] text-lg">
                event_seat
              </span>
              <span>Request Private Appointment</span>
            </button>
            <p className="text-center text-[10px] text-[#7c766f] mt-3 tracking-wider">
              &copy; StitchCraft Bespoke Clothiers Ltd. All master patterns reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
