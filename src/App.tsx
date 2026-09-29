/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ScreenType } from './types';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';
import { BottomNav } from './components/BottomNav';
import { BookingModal } from './components/BookingModal';
import { Toast } from './components/Toast';
import { HomeScreen } from './screens/HomeScreen';
import { LookbookScreen } from './screens/LookbookScreen';
import { CraftScreen } from './screens/CraftScreen';
import { SizingGuideScreen } from './screens/SizingGuideScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on screen transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const handleOpenBooking = (serviceName?: string) => {
    setBookingService(serviceName || 'Bespoke Suits & Tuxedos');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#1c1c18] font-sans flex flex-col relative selection:bg-[#fed488] selection:text-[#1c1c18]">
      {/* Fixed Atelier Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Slide-over Atelier Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Screen Content Viewport */}
      <main className="flex-1 w-full pt-16">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={setCurrentScreen}
            onOpenBooking={handleOpenBooking}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'lookbook' && (
          <LookbookScreen
            onNavigate={setCurrentScreen}
            onOpenBooking={handleOpenBooking}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'craft' && (
          <CraftScreen
            onNavigate={setCurrentScreen}
            onOpenBooking={handleOpenBooking}
            onShowToast={showToast}
          />
        )}
        {currentScreen === 'sizing' && (
          <SizingGuideScreen
            onNavigate={setCurrentScreen}
            onOpenBooking={handleOpenBooking}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Fixed Luxury Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Bespoke Booking Consultation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={bookingService}
        onShowToast={showToast}
      />

      {/* Floating Atelier Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
