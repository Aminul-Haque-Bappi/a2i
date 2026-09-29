import React, { useState } from 'react';
import { LookCategory, LookbookItem, ScreenType } from '../types';
import { ATELIER_INFO, LOOKBOOK_ITEMS, TESTIMONIALS } from '../data/content';

interface LookbookScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: (serviceName?: string) => void;
  onShowToast: (message: string) => void;
}

export const LookbookScreen: React.FC<LookbookScreenProps> = ({
  onOpenBooking,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<LookCategory>('all');
  const [inspectLook, setInspectLook] = useState<LookbookItem | null>(null);
  const [inquireLook, setInquireLook] = useState<LookbookItem | null>(null);

  // Inquire form state
  const [inquireName, setInquireName] = useState('');
  const [inquireContact, setInquireContact] = useState('');
  const [inquireNotes, setInquireNotes] = useState('');
  const [inquireSuccess, setInquireSuccess] = useState(false);

  const categories: { label: string; value: LookCategory }[] = [
    { label: 'All Creations', value: 'all' },
    { label: 'Suits', value: 'suits' },
    { label: 'Bridal', value: 'bridal' },
    { label: 'Traditional', value: 'traditional' },
    { label: 'Casual', value: 'casual' },
  ];

  const filteredItems = LOOKBOOK_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquireName || !inquireContact) {
      alert('Please provide your name and contact details.');
      return;
    }
    setInquireSuccess(true);
    onShowToast(`Inquiry dispatched for ${inquireLook?.title || 'bespoke look'}.`);
    setTimeout(() => {
      setInquireSuccess(false);
      setInquireLook(null);
      setInquireName('');
      setInquireContact('');
      setInquireNotes('');
    }, 2800);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Editorial Header Section */}
      <section className="px-5 pt-6 pb-4 max-w-xl mx-auto w-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
            Savile Row Archives
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ebe8e1] text-[#4a4640] text-[10px] font-bold uppercase rounded-full shadow-sm">
            <span className="material-symbols-outlined text-xs text-[#775a19]">verified</span>
            <span>Vol. XXIV Portfolio</span>
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c18] font-medium tracking-tight">
          The Lookbook
        </h1>
        <p className="text-sm text-[#4a4640] mt-1">A glimpse of our finest bespoke creations.</p>
      </section>

      {/* Sticky Visual Filter Ribbon */}
      <section className="sticky top-16 z-30 px-5 py-2.5 bg-[#fcf9f2]/95 backdrop-blur-md border-b border-[#e5dfd3]/60">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-xl mx-auto py-0.5">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`whitespace-nowrap px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all duration-200 ${
                selectedCategory === cat.value
                  ? 'bg-[#181716] text-white shadow-sm'
                  : 'bg-[#ebe8e1] text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#e5e2db]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Showcase Stream */}
      <section className="px-5 py-6 max-w-xl mx-auto w-full flex flex-col gap-6">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-[#fdfbf7] rounded-2xl shadow-md border border-[#e5dfd3] overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Container with Editorial Scrim & Overlays */}
            <div className="relative w-full aspect-[4/5] bg-[#e5e2db] overflow-hidden group">
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181716]/85 via-[#181716]/15 to-transparent pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 bg-[#fdfbf7]/90 backdrop-blur-sm text-[#1c1c18] text-[10px] font-bold uppercase tracking-wider rounded">
                  {item.badgeCategory}
                </span>
                <span className="px-2.5 py-1 bg-[#775a19] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  {item.badgeStyle}
                </span>
              </div>

              {/* Zoom / Inspect Trigger */}
              <button
                type="button"
                aria-label={`Inspect ${item.title}`}
                onClick={() => setInspectLook(item)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#fdfbf7]/90 backdrop-blur-sm text-[#1c1c18] flex items-center justify-center shadow-md active:scale-95 hover:bg-[#fdfbf7] transition-all"
              >
                <span className="material-symbols-outlined text-xl">zoom_in</span>
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#ffdea5] font-bold">
                    {item.tagline}
                  </p>
                  <h2 className="font-serif text-xl sm:text-2xl text-white font-medium">
                    {item.title}
                  </h2>
                </div>
                <span className="text-sm font-semibold text-[#ffdea5]">{item.number}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col gap-3">
              <p className="text-xs text-[#4a4640] leading-relaxed">{item.subtitle}</p>

              {/* Cloth & Mill Box */}
              <div className="p-3 bg-[#f6f3ec] rounded-lg border border-[#e5dfd3]/80 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                  <span className="material-symbols-outlined text-sm">texture</span>
                  <span>Cloth &amp; Mill Details</span>
                </div>
                <p className="text-xs text-[#1c1c18] font-semibold">{item.clothAndMill}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setInspectLook(item)}
                  className="w-full py-2.5 px-3 bg-[#f1eee7] text-[#1c1c18] hover:bg-[#ebe8e1] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">pageview</span>
                  <span>Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInquireLook(item)}
                  className="w-full py-2.5 px-3 bg-[#181716] text-white hover:bg-[#2c2a27] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[#ffdea5] text-base">mail</span>
                  <span>Inquire</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Editorial Quote & Client Delights Badge */}
      <section className="px-5 my-6 max-w-xl mx-auto w-full">
        <div className="p-5 bg-[#f1eee7] rounded-2xl shadow-sm border border-[#e5dfd3] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[#775a19]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-base">
                  star
                </span>
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Patron Review
            </span>
          </div>
          <blockquote className="font-serif text-base text-[#1c1c18] italic mt-1 leading-relaxed">
            &ldquo;{TESTIMONIALS[2].quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3 pt-2 border-t border-[#e5dfd3]/60">
            <div className="w-10 h-10 rounded-full bg-[#fed488] flex items-center justify-center text-[#785a1a] font-serif font-bold text-sm">
              AR
            </div>
            <div>
              <p className="font-semibold text-sm text-[#1c1c18]">{TESTIMONIALS[2].author}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#4a4640]">
                {TESTIMONIALS[2].role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Sizing & Consultation Banner */}
      <section className="px-5 pb-8 max-w-xl mx-auto w-full">
        <div className="p-6 bg-[#181716] text-white rounded-2xl flex flex-col gap-2 shadow-lg border border-[#775a19]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffdea5] text-xl">straighten</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffdea5]">
              Private Fitting Appointments
            </span>
          </div>
          <h3 className="font-serif text-2xl text-white font-medium">
            Drawn directly to your unique anatomy.
          </h3>
          <p className="text-xs text-[#e5e2db] leading-relaxed">
            Every silhouette shown in this lookbook begins with over 32 precise body measurements and a custom hand-drafted pattern.
          </p>
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => onOpenBooking('Lookbook Commission')}
              className="w-full py-3.5 px-4 bg-[#775a19] text-white hover:bg-[#8f6e21] rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-md text-center"
            >
              Book Personal Fitting
            </button>
          </div>
        </div>
      </section>

      {/* Comprehensive Atelier Footer */}
      <footer className="mt-4 pt-8 pb-12 px-5 bg-[#ebe8e1] text-[#1c1c18] border-t border-[#ccc5bd]">
        <div className="max-w-xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img
              alt="StitchCraft Logo"
              className="h-8 w-auto object-contain"
              src={ATELIER_INFO.logoUrl}
            />
            <div>
              <p className="font-serif text-xl font-medium leading-tight text-[#1c1c18]">
                StitchCraft
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
                Savile Row Bespoke Masters
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-xs text-[#4a4640]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#775a19]">
              The London Atelier
            </p>
            <p className="leading-relaxed">{ATELIER_INFO.address}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-sm text-[#775a19]">call</span>
              <a href={`tel:${ATELIER_INFO.phoneLondon}`} className="hover:text-[#1c1c18] underline">
                {ATELIER_INFO.phoneLondon}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#775a19]">schedule</span>
              <span>{ATELIER_INFO.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#775a19]">alternate_email</span>
              <a href={`mailto:${ATELIER_INFO.email}`} className="hover:text-[#1c1c18] underline">
                {ATELIER_INFO.email}
              </a>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-1.5 bg-[#e5e2db] p-4 rounded-xl border border-[#ccc5bd]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
              Fabric Mill Affiliates
            </span>
            <p className="text-xs text-[#4a4640]">
              Loro Piana • Scabal • Dormeuil • Holland &amp; Sherry • Fox Brothers • Zegna Cloth
            </p>
          </div>

          <div className="flex flex-col gap-1 pt-2 text-[#7c766f] text-[11px]">
            <p>&copy; 2026 StitchCraft Bespoke Atelier Ltd. All rights reserved.</p>
            <p>Hand-cut and assembled in Savile Row with timeless British integrity.</p>
          </div>
        </div>
      </footer>

      {/* Modal 1: Inspection & Details Sheet */}
      {inspectLook && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#181716]/60 backdrop-blur-md transition-opacity"
            onClick={() => setInspectLook(null)}
            aria-hidden="true"
          />
          <div className="relative min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg bg-[#fdfbf7] text-[#1c1c18] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-[#e5dfd3] max-h-[85vh] overflow-y-auto">
              <div className="w-12 h-1 bg-[#ccc5bd] rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
                <span className="px-2.5 py-0.5 bg-[#fed488] text-[#785a1a] text-[10px] font-bold uppercase tracking-widest rounded">
                  Atelier Specimen {inspectLook.number}
                </span>
                <button
                  type="button"
                  onClick={() => setInspectLook(null)}
                  className="w-9 h-9 rounded-full bg-[#f1eee7] flex items-center justify-center text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <h3 className="font-serif text-2xl text-[#1c1c18] font-medium">
                  {inspectLook.title}
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed">
                  {inspectLook.subtitle}
                </p>

                {/* Spec details card */}
                <div className="my-3 p-4 bg-[#f6f3ec] rounded-xl flex flex-col gap-3.5 border border-[#e5dfd3]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#775a19] text-xl mt-0.5">
                      texture
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                        Cloth &amp; Mill Origin
                      </p>
                      <p className="text-xs text-[#1c1c18] font-medium mt-0.5">
                        {inspectLook.clothAndMill}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#775a19] text-xl mt-0.5">
                      architecture
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                        Bespoke Architectural Cut
                      </p>
                      <p className="text-xs text-[#1c1c18] font-medium mt-0.5">
                        {inspectLook.architecturalCut}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#775a19] text-xl mt-0.5">
                      timer
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                        Hand-Crafted Construction
                      </p>
                      <p className="text-xs text-[#1c1c18] font-medium mt-0.5">
                        {inspectLook.craftTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const lk = inspectLook;
                      setInspectLook(null);
                      setInquireLook(lk);
                    }}
                    className="w-full py-3.5 px-4 bg-[#181716] text-white hover:bg-[#2c2a27] rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[#ffdea5] text-base">
                      forward_to_inbox
                    </span>
                    <span>Inquire About This Look</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectLook(null)}
                    className="w-full py-2.5 px-4 bg-[#ebe8e1] text-[#4a4640] hover:text-[#1c1c18] rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Inquire Micro-Form Sheet */}
      {inquireLook && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#181716]/60 backdrop-blur-md transition-opacity"
            onClick={() => setInquireLook(null)}
            aria-hidden="true"
          />
          <div className="relative min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="relative w-full max-w-lg bg-[#fdfbf7] text-[#1c1c18] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-[#e5dfd3] max-h-[85vh] overflow-y-auto">
              <div className="w-12 h-1 bg-[#ccc5bd] rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
                  Atelier Concierge
                </span>
                <button
                  type="button"
                  onClick={() => setInquireLook(null)}
                  className="w-9 h-9 rounded-full bg-[#f1eee7] flex items-center justify-center text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="mt-3">
                <h3 className="font-serif text-2xl text-[#1c1c18] font-medium">Bespoke Inquiry</h3>
                <p className="text-xs text-[#4a4640] mt-0.5">
                  Regarding:{' '}
                  <span className="font-semibold text-[#1c1c18]">{inquireLook.title}</span>
                </p>
              </div>

              {inquireSuccess ? (
                <div className="my-6 p-4 bg-[#fed488]/40 border border-[#775a19]/30 rounded-xl text-center flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#775a19] text-3xl">
                    check_circle
                  </span>
                  <p className="text-xs font-semibold text-[#1c1c18]">
                    Your inquiry has been relayed to our head cutter. We will reach out within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquireSubmit} className="mt-4 flex flex-col gap-3.5">
                  <div>
                    <label
                      htmlFor="clientNameLook"
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="clientNameLook"
                      type="text"
                      placeholder="e.g. Lord Alistair Wright"
                      value={inquireName}
                      onChange={(e) => setInquireName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#f6f3ec] border border-[#e5dfd3] text-[#1c1c18] rounded text-sm focus:outline-none focus:border-[#775a19]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="clientContactLook"
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1"
                    >
                      Preferred Contact (Email or Telephone)
                    </label>
                    <input
                      id="clientContactLook"
                      type="text"
                      placeholder="e.g. a.wright@mayfair.co.uk or +44 20 7946 0912"
                      value={inquireContact}
                      onChange={(e) => setInquireContact(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#f6f3ec] border border-[#e5dfd3] text-[#1c1c18] rounded text-sm focus:outline-none focus:border-[#775a19]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="clientNotesLook"
                      className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1"
                    >
                      Occasion Date &amp; Notes
                    </label>
                    <textarea
                      id="clientNotesLook"
                      rows={3}
                      placeholder="Target event date, cloth preferences, or specific styling adjustments..."
                      value={inquireNotes}
                      onChange={(e) => setInquireNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#f6f3ec] border border-[#e5dfd3] text-[#1c1c18] rounded text-sm focus:outline-none focus:border-[#775a19] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-4 bg-[#181716] text-white hover:bg-[#2c2a27] rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#ffdea5] text-lg">
                      send
                    </span>
                    <span>Dispatch Atelier Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
