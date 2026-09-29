import React, { useState } from 'react';
import { FitDossier, ScreenType } from '../types';

interface SizingGuideScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenBooking: (serviceName?: string) => void;
  onShowToast: (message: string) => void;
}

export const SizingGuideScreen: React.FC<SizingGuideScreenProps> = ({
  onOpenBooking,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'self' | 'pro'>('self');

  // Measurement input values
  const [chestInput, setChestInput] = useState('40.5');
  const [waistInput, setWaistInput] = useState('33.0');
  const [hipsInput, setHipsInput] = useState('39.2');
  const [shoulderInput, setShoulderInput] = useState('18.5');

  // Dossier committed values
  const [dossier, setDossier] = useState<FitDossier>({
    chest: '40.5',
    waist: '33.0',
    hips: '39.2',
    shoulder: '18.5',
  });

  const loggedCount = [dossier.chest, dossier.waist, dossier.hips, dossier.shoulder].filter(
    (val) => val && val.trim() !== ''
  ).length;

  const progressPercent = (loggedCount / 4) * 100;

  const handleLogMetric = (key: keyof FitDossier, value: string, label: string) => {
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      onShowToast(`Please enter a valid numeric value for ${label}.`);
      return;
    }
    setDossier((prev) => ({ ...prev, [key]: value }));
    onShowToast(`${label} measurement logged (${value}").`);
  };

  const handleSaveDossier = () => {
    onShowToast('Fit Dossier secured and synchronized with Savile Row master cutters.');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Introductory Framing Header */}
      <section className="px-5 pt-6 pb-3 max-w-xl mx-auto w-full flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="w-6 h-px bg-[#775a19]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
            Savile Row Precision Standard
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1c18] font-medium tracking-tight">
          How We Get Your Perfect Fit
        </h1>
        <p className="text-sm text-[#4a4640]">Two easy ways to get measured.</p>
      </section>

      {/* Interactive Path Selector Segmented Control */}
      <section className="px-5 py-2 max-w-xl mx-auto w-full">
        <div className="bg-[#ebe8e1] p-1 rounded-xl flex shadow-sm border border-[#ccc5bd]/50">
          <button
            type="button"
            onClick={() => setActiveTab('self')}
            className={`flex-1 py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-xs font-semibold uppercase tracking-wider ${
              activeTab === 'self'
                ? 'bg-[#181716] text-white shadow-sm'
                : 'text-[#4a4640] hover:text-[#1c1c18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">straighten</span>
            <span>At-Home Guide</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pro')}
            className={`flex-1 py-3 px-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-xs font-semibold uppercase tracking-wider ${
              activeTab === 'pro'
                ? 'bg-[#181716] text-white shadow-sm'
                : 'text-[#4a4640] hover:text-[#1c1c18]'
            }`}
          >
            <span className="material-symbols-outlined text-base">handyman</span>
            <span>Tailor Visit</span>
          </button>
        </div>
      </section>

      {/* PATH A: Self-Measure Guide Container */}
      {activeTab === 'self' && (
        <div className="flex flex-col w-full max-w-xl mx-auto">
          {/* Visual Step Stepper Preview */}
          <div className="px-5 py-3">
            <div className="bg-[#f6f3ec] rounded-xl p-4 shadow-sm border border-[#e5dfd3] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                  Step Progress
                </span>
                <span className="text-xs font-semibold text-[#4a4640]">
                  {loggedCount} of 4 Recorded
                </span>
              </div>
              {/* Tailor's Tape Measuring Ruler Stepper */}
              <div className="relative w-full h-3.5 bg-[#e5e2db] rounded-full overflow-hidden flex items-center px-0.5">
                <div
                  className="h-2 bg-[#775a19] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#4a4640] leading-relaxed">
                Follow the illustrated guides below. Record values directly into your digital atelier notebook.
              </p>
            </div>
          </div>

          {/* Step-by-Step Illustrated Cards */}
          <section className="px-5 flex flex-col gap-5 py-2">
            {/* Card 1: Chest & Bust */}
            <article className="bg-[#fdfbf7] rounded-xl shadow-sm border border-[#e5dfd3] overflow-hidden flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#e5e2db]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFO9h48uSJnAovARdPScNXNmd1S2WkfC5y2JxM2C7khr-Ok0UkpXugDE1lvDR3xNB4QxL9kxRsPI97ImdGMBwR6MuLkUWL9ZTc2blW0GwiphmgP4btxNywOETKflHQFzgMxuDXN17EFB4kEKwi--pBvN_75MmPV_iQjO_pchzdruJzwEopCRLnWB6h9v8-VyQ5fozpnrejfxhJkBbQoOhaPhBy-0cP0Df7-c7T1VUiJadb54CsS9n"
                  alt="Measuring chest circumference horizontally with soft measuring tape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#fdfbf7]/90 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-[#e5dfd3]/80">
                  <span className="text-[10px] font-bold text-[#1c1c18] uppercase tracking-wider">
                    01 / Chest &amp; Bust
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-serif text-lg text-[#1c1c18] font-medium">
                  Fullest Chest Circumference
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed">
                  Measure around the fullest part of the chest, keeping the tape strictly horizontal across your shoulder blades.
                </p>
                <div className="mt-2 pt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="40.5"
                      value={chestInput}
                      onChange={(e) => setChestInput(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7c766f]">
                      IN
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLogMetric('chest', chestInput, 'Chest')}
                    className="bg-[#ebe8e1] text-[#1c1c18] hover:bg-[#e5e2db] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider active:scale-95 transition-all"
                  >
                    Log
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2: Waistline */}
            <article className="bg-[#fdfbf7] rounded-xl shadow-sm border border-[#e5dfd3] overflow-hidden flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#e5e2db]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9fUjP7k9TtW69MCG8Nc_h-vRPN6Axe6S5Zbi2loe9hWGCdTWiozCPuz-HrfadUwejaTjVebTPhnSerzq3x7jtyg_y00NWyLPzRMWZmfI-BrALsKG-Lx1WDJl4vbYwR2QImAEtD0MBBvRi8hcZPQKAzpljfLY-TpagBmvzLTwefwfHSiPiPBlpYGfxQorv_4BpDSlNFqnYK2Dv2lrTQPau2Yv9XJpEhzihhDtNn4OrCkQ3gx9mEKMn"
                  alt="Measuring natural waistline with tailor tape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#fdfbf7]/90 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-[#e5dfd3]/80">
                  <span className="text-[10px] font-bold text-[#1c1c18] uppercase tracking-wider">
                    02 / Waistline
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-serif text-lg text-[#1c1c18] font-medium">
                  Natural Waistline
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed">
                  Measure around the natural waistline, keeping the tape comfortably loose with room for one finger beneath.
                </p>
                <div className="mt-2 pt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="33.0"
                      value={waistInput}
                      onChange={(e) => setWaistInput(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7c766f]">
                      IN
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLogMetric('waist', waistInput, 'Waist')}
                    className="bg-[#ebe8e1] text-[#1c1c18] hover:bg-[#e5e2db] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider active:scale-95 transition-all"
                  >
                    Log
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3: Seat & Hips */}
            <article className="bg-[#fdfbf7] rounded-xl shadow-sm border border-[#e5dfd3] overflow-hidden flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#e5e2db]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy5GZAgmt2MRSp3DZlB5VJ5AXGtKyyYjtimbMMx_PUn3hholEi4nNEglZ8x8zMt0KNSWeMIdP3wkxnqvX9iG9r8mbpHKKtuBBjKIcGKP8jDx7llJ99HY8A1kFYgwfXQ-nFWHHqZ5_GKw_N9FO1YKQxwSS-wAXnxOR1LVVqJtCyAvAsn9muyhKveI4-EMabmEKlb29ZYviRgBetiwFKsVOjkdC4TdgUvGtTzFm_dZiIewfbAlhgbuHc"
                  alt="Measuring widest hip stance with heels together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#fdfbf7]/90 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-[#e5dfd3]/80">
                  <span className="text-[10px] font-bold text-[#1c1c18] uppercase tracking-wider">
                    03 / Seat &amp; Hips
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-serif text-lg text-[#1c1c18] font-medium">
                  Widest Hip Stance
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed">
                  Stand with heels together and measure around the fullest part of your hips and seat contour.
                </p>
                <div className="mt-2 pt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="39.2"
                      value={hipsInput}
                      onChange={(e) => setHipsInput(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7c766f]">
                      IN
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLogMetric('hips', hipsInput, 'Hips')}
                    className="bg-[#ebe8e1] text-[#1c1c18] hover:bg-[#e5e2db] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider active:scale-95 transition-all"
                  >
                    Log
                  </button>
                </div>
              </div>
            </article>

            {/* Card 4: Shoulder Span */}
            <article className="bg-[#fdfbf7] rounded-xl shadow-sm border border-[#e5dfd3] overflow-hidden flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#e5e2db]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKhu3GCkC5O2k7Hv5FOyHXnnSzuaH1EB2dDsmxOkAitHwMDeqiorroPL7uR4qQv_lL_IPeG66rHFQj8AabmYVFfL1UVHGOp16Irb_xNYCZOt_dgqipTXijtbpi6GOY9XMRdbXqT0RaWx9PETwjNv4huNKN04Q7m_CWW1Ok7kr3vwQMoyoq3w3tgrV99UbX6nne34eTGSDWa4JUJw5cwJuRWWusMWc3qPpkUjymFbE1x5gag71dQq8X"
                  alt="Measuring across-back shoulder width from bone to bone"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#fdfbf7]/90 backdrop-blur-md px-2.5 py-1 rounded shadow-sm border border-[#e5dfd3]/80">
                  <span className="text-[10px] font-bold text-[#1c1c18] uppercase tracking-wider">
                    04 / Shoulder Span
                  </span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-serif text-lg text-[#1c1c18] font-medium">
                  Across-Back Shoulder Width
                </h3>
                <p className="text-xs text-[#4a4640] leading-relaxed">
                  Measure from the edge of one shoulder bone across the gentle curvature of your upper back to the opposite bone.
                </p>
                <div className="mt-2 pt-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      step="0.1"
                      placeholder="18.5"
                      value={shoulderInput}
                      onChange={(e) => setShoulderInput(e.target.value)}
                      className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-lg text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7c766f]">
                      IN
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLogMetric('shoulder', shoulderInput, 'Shoulder')}
                    className="bg-[#ebe8e1] text-[#1c1c18] hover:bg-[#e5e2db] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider active:scale-95 transition-all"
                  >
                    Log
                  </button>
                </div>
              </div>
            </article>
          </section>

          {/* Master Tailor Guidelines */}
          <section className="px-5 py-4">
            <div className="bg-[#ebe8e1] rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-[#ccc5bd]/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#775a19] text-xl">
                  tips_and_updates
                </span>
                <h4 className="font-serif text-base text-[#1c1c18] font-medium">
                  Master Tailor Guidelines
                </h4>
              </div>
              <ul className="flex flex-col gap-2.5 text-xs text-[#4a4640]">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#775a19] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Relax your stance:</strong> Stand tall but naturally. Do not suck in your stomach or puff out your chest.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#775a19] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Tension check:</strong> Keep the tape flush against the skin without digging into flesh or sagging.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm text-[#775a19] mt-0.5">
                    check_circle
                  </span>
                  <span>
                    <strong>Foundation layer:</strong> Wear lightweight fitted undergarments or base layers for unhindered precision.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Interactive Quick-Save Measurement Notebook (Your Fit Dossier) */}
          <section className="px-5 pb-6">
            <div className="bg-[#fdfbf7] rounded-2xl p-5 shadow-md border border-[#e5dfd3] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#181716] text-xl">
                    menu_book
                  </span>
                  <h4 className="font-serif text-lg text-[#1c1c18] font-medium">
                    Your Fit Dossier
                  </h4>
                </div>
                <span className="bg-[#fed488] text-[#785a1a] px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  DRAFT SPEC
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#f6f3ec] p-3 rounded-xl border border-[#e5dfd3] flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766f]">
                    CHEST
                  </span>
                  <span className="font-serif text-xl text-[#1c1c18] font-medium mt-0.5">
                    {dossier.chest ? `${dossier.chest}"` : '—'}
                  </span>
                </div>
                <div className="bg-[#f6f3ec] p-3 rounded-xl border border-[#e5dfd3] flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766f]">
                    WAIST
                  </span>
                  <span className="font-serif text-xl text-[#1c1c18] font-medium mt-0.5">
                    {dossier.waist ? `${dossier.waist}"` : '—'}
                  </span>
                </div>
                <div className="bg-[#f6f3ec] p-3 rounded-xl border border-[#e5dfd3] flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766f]">
                    HIPS
                  </span>
                  <span className="font-serif text-xl text-[#1c1c18] font-medium mt-0.5">
                    {dossier.hips ? `${dossier.hips}"` : '—'}
                  </span>
                </div>
                <div className="bg-[#f6f3ec] p-3 rounded-xl border border-[#e5dfd3] flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7c766f]">
                    SHOULDERS
                  </span>
                  <span className="font-serif text-xl text-[#1c1c18] font-medium mt-0.5">
                    {dossier.shoulder ? `${dossier.shoulder}"` : '—'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveDossier}
                className="w-full py-3.5 bg-[#181716] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-[#2c2a27] active:scale-[0.99] transition-all"
              >
                <span className="material-symbols-outlined text-lg text-[#ffdea5]">save</span>
                <span>Save Measurements to Profile</span>
              </button>
            </div>
          </section>
        </div>
      )}

      {/* PATH B: Master Tailor Home / Studio Visit */}
      {activeTab === 'pro' && (
        <div className="flex flex-col w-full max-w-xl mx-auto px-5 py-3">
          <div className="bg-[#fdfbf7] rounded-2xl overflow-hidden shadow-md border border-[#e5dfd3] flex flex-col">
            <div className="relative h-60 w-full bg-[#e5e2db]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSdB-RxgjwB8EjOBuhSfv7GK1FreuLVtAZpquRuaTnt5AyE85-ukC-yae265IpnaZPczqYWFZcjljgaO6cZe-57VgBjckHbA_mLF-83mJUE3nXrRa3-60BOk_VCajtssddiYvwQn7IZb-QJkty7b67GQTu0z2d0SQjmiqZ2lub3cnxQ4dXMj3jATEVzXKLYCtOsxcYgHDEqMhnH50SL9MJ8MoyNqnfDEeG2fmyBZR2iFL3Of74VmJY"
                alt="Master tailor performing 3D assisted body measurement in private home"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181716]/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-serif text-xl font-medium">At-Your-Door Concierge</span>
                <span className="bg-[#775a19] text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  VIP SERVICE
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs text-[#4a4640] leading-relaxed">
                Book a master tailor to visit your home or office for professional 3D-assisted body contour measurement, posture calibration, and personal wardrobe consultation.
              </p>

              <div className="flex flex-col gap-2.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
                  The Tailored Experience
                </span>

                <div className="flex items-start gap-3 bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3]">
                  <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                    view_in_ar
                  </span>
                  <div className="flex flex-col">
                    <h4 className="font-serif text-sm font-medium text-[#1c1c18]">
                      Millimeter Accuracy
                    </h4>
                    <p className="text-[11px] text-[#4a4640] leading-relaxed">
                      Laser-level sensor contours guarantee seam allowance perfection across 38 bespoke anatomy metrics.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3]">
                  <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                    accessibility_new
                  </span>
                  <div className="flex flex-col">
                    <h4 className="font-serif text-sm font-medium text-[#1c1c18]">
                      Posture Compensation
                    </h4>
                    <p className="text-[11px] text-[#4a4640] leading-relaxed">
                      Real-time analysis of head tilt, shoulder slope, and natural stance to eliminate unwanted fabric pulling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#f6f3ec] p-3.5 rounded-xl border border-[#e5dfd3]">
                  <span className="material-symbols-outlined text-[#775a19] text-2xl mt-0.5">
                    texture
                  </span>
                  <div className="flex flex-col">
                    <h4 className="font-serif text-sm font-medium text-[#1c1c18]">
                      Tactile Drape Evaluation
                    </h4>
                    <p className="text-[11px] text-[#4a4640] leading-relaxed">
                      Physically test hand-selected seasonal swatches from Loro Piana, Dormeuil, and Holland &amp; Sherry.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct CTA */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('Home Measurement Visit')}
                  className="w-full py-4 bg-[#775a19] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#8f6e21] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg text-[#ffdea5]">
                    event_available
                  </span>
                  <span>Schedule Home Measurement Visit</span>
                </button>
                <p className="text-[11px] text-center text-[#7c766f]">
                  Complimentary with commissions over $850. Zero obligation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 100% Custom Measurement Guarantee Banner */}
      <section className="px-5 py-3 max-w-xl mx-auto w-full">
        <div className="bg-[#ebe8e1] rounded-2xl p-4 shadow-sm border border-[#ccc5bd]/50 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#fed488] text-[#785a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold text-[#1c1c18]">
              100% Custom Measurement Guarantee
            </span>
            <p className="text-[11px] text-[#4a4640] mt-0.5 leading-snug">
              Free local alterations and pattern recuts if your finished garment is not flawless on first fitting.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Atelier Footer */}
      <footer className="mt-8 bg-[#f6f3ec] px-5 py-8 max-w-xl mx-auto w-full flex flex-col gap-5 border-t border-[#e5dfd3] rounded-t-2xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19] text-xl">style</span>
            <span className="font-serif text-xl text-[#1c1c18] font-medium tracking-tight">
              StitchCraft Atelier
            </span>
          </div>
          <p className="text-xs text-[#4a4640]">
            Curators of bespoke sartorial craftsmanship, bridging heritage English tailoring with modern structural science.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-1 text-xs">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
              The House
            </span>
            <span className="text-[#1c1c18]">Savile Row Heritage</span>
            <span className="text-[#1c1c18]">Master Cutters</span>
            <span className="text-[#1c1c18]">Cloth Mills</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#775a19]">
              Assistance
            </span>
            <span className="text-[#1c1c18]">Fit Consultation</span>
            <span className="text-[#1c1c18]">Care &amp; Pressing</span>
            <span className="text-[#1c1c18]">Guarantee Policy</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[#7c766f] text-[10px] border-t border-[#e5dfd3]">
          <span>&copy; 2026 StitchCraft Bespoke.</span>
          <span>Precision Cut N&deg; 4821</span>
        </div>
      </footer>
    </div>
  );
};
