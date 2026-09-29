import React, { useState } from 'react';
import { ATELIER_INFO } from '../data/content';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onShowToast: (message: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onShowToast,
}) => {
  const [service, setService] = useState(preselectedService || 'Bespoke Suits & Tuxedos');
  const [locationType, setLocationType] = useState<'atelier' | 'home'>('atelier');
  const [selectedDate, setSelectedDate] = useState('2026-10-05');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !contact) {
      alert('Please provide your name and contact details.');
      return;
    }

    const ref = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsSuccess(true);
    onShowToast(`Fitting appointment confirmed (Ref: ${ref})`);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#181716]/60 backdrop-blur-md transition-opacity"
        onClick={resetAndClose}
        aria-hidden="true"
      />

      <div className="relative min-h-screen flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div
          className="relative w-full max-w-lg bg-[#fdfbf7] text-[#1c1c18] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-[#e5dfd3] max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Book a Fitting Appointment"
        >
          {/* Grab Handle */}
          <div className="w-12 h-1 bg-[#ccc5bd] rounded-full mx-auto mb-4 sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e5dfd3]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#775a19] text-xl">
                event_seat
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#775a19]">
                  Savile Row Concierge
                </p>
                <h3 className="font-serif text-xl text-[#1c1c18] font-medium">
                  {isSuccess ? 'Appointment Confirmed' : 'Reserve Fitting Consultation'}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={resetAndClose}
              className="w-9 h-9 rounded-full bg-[#f1eee7] flex items-center justify-center text-[#4a4640] hover:text-[#1c1c18] hover:bg-[#ebe8e1] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {isSuccess ? (
            <div className="py-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#fed488]/40 border border-[#775a19]/30 flex items-center justify-center text-[#775a19]">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#775a19]">
                  Booking Reference: {bookingRef}
                </span>
                <h4 className="font-serif text-2xl text-[#1c1c18] mt-1">
                  We look forward to fitting you.
                </h4>
                <p className="text-sm text-[#4a4640] mt-2 max-w-sm mx-auto leading-relaxed">
                  Your appointment for <strong>{service}</strong> is scheduled for{' '}
                  <strong>{selectedDate} at {selectedTime}</strong> (
                  {locationType === 'atelier'
                    ? 'Savile Row Atelier'
                    : 'White-Glove At-Home Visit'}
                  ). Master Cutter Julian Thorne’s guild team has been notified.
                </p>
              </div>

              <div className="w-full bg-[#f6f3ec] p-4 rounded-lg text-left text-xs text-[#4a4640] flex flex-col gap-2 border border-[#e5dfd3]">
                <div className="flex justify-between">
                  <span className="text-[#7c766f]">Client:</span>
                  <span className="font-semibold text-[#1c1c18]">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7c766f]">Contact:</span>
                  <span className="font-semibold text-[#1c1c18]">{contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7c766f]">Location:</span>
                  <span className="font-semibold text-[#1c1c18]">
                    {locationType === 'atelier'
                      ? ATELIER_INFO.address
                      : 'Client Private Residence'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full mt-2 py-3 px-4 bg-[#181716] text-white rounded font-semibold text-xs uppercase tracking-widest hover:bg-[#2c2a27] transition-colors"
              >
                Return to Atelier
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              {/* Location Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5">
                  Consultation Setting
                </label>
                <div className="grid grid-cols-2 gap-2 bg-[#f1eee7] p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setLocationType('atelier')}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      locationType === 'atelier'
                        ? 'bg-[#181716] text-white shadow-sm'
                        : 'text-[#4a4640] hover:text-[#1c1c18]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">storefront</span>
                    <span>Savile Row Atelier</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocationType('home')}
                    className={`py-2 px-3 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      locationType === 'home'
                        ? 'bg-[#181716] text-white shadow-sm'
                        : 'text-[#4a4640] hover:text-[#1c1c18]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">home_pin</span>
                    <span>At-Home Concierge</span>
                  </button>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label
                  htmlFor="serviceSelect"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5"
                >
                  Commission / Garment Type
                </label>
                <select
                  id="serviceSelect"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-md text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                >
                  <option value="Bespoke Suits & Tuxedos">Bespoke Suits & Tuxedos</option>
                  <option value="Bridal & Evening Wear">Bridal & Evening Wear</option>
                  <option value="Traditional & Ethnic Attire">Traditional & Ethnic Attire</option>
                  <option value="Precision Alterations & Restyling">Precision Alterations & Restyling</option>
                  <option value="General Wardrobe Assessment">General Wardrobe Assessment</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="bookingDate"
                    className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5"
                  >
                    Preferred Date
                  </label>
                  <input
                    id="bookingDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full py-2 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-md text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5">
                    Available Time Slot
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-1.5 px-2.5 rounded text-xs transition-colors ${
                          selectedTime === slot
                            ? 'bg-[#775a19] text-white font-medium'
                            : 'bg-[#f1eee7] text-[#4a4640] hover:bg-[#ebe8e1]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Name */}
              <div>
                <label
                  htmlFor="clientFullName"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="clientFullName"
                  type="text"
                  placeholder="e.g. Lord Alistair Wright"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-md text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                  required
                />
              </div>

              {/* Contact Information */}
              <div>
                <label
                  htmlFor="clientContact"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5"
                >
                  Contact (Email or Telephone)
                </label>
                <input
                  id="clientContact"
                  type="text"
                  placeholder="e.g. alistair@mayfair.co.uk or +44 20 7946 0912"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-md text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19]"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="clientNotes"
                  className="block text-[11px] font-bold uppercase tracking-wider text-[#4a4640] mb-1.5"
                >
                  Occasion, Fabric Notes, or Address (Optional)
                </label>
                <textarea
                  id="clientNotes"
                  rows={2}
                  placeholder="e.g., Black-tie wedding gala in November, preference for Italian Barathea wool..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full py-2 px-3 bg-[#f6f3ec] border border-[#e5dfd3] rounded-md text-sm text-[#1c1c18] focus:outline-none focus:border-[#775a19] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#181716] text-white rounded font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#2c2a27] active:scale-[0.99] transition-all shadow-md mt-1"
              >
                <span className="material-symbols-outlined text-[#ffdea5] text-lg">
                  calendar_month
                </span>
                <span>Confirm Fitting Appointment</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
