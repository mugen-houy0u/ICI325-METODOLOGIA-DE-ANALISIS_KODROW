'use client';

import { useState } from 'react';
import MainScreen from '@/components/MainScreen';
import BookingFlow from '@/components/BookingFlow';
import PatientHistory from '@/components/PatientHistory';

type View = 'home' | 'booking' | 'history';

export default function Page() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigateToBooking = () => {
    setCurrentView('booking');
  };

  const handleNavigateToHistory = () => {
    setCurrentView('history');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' && (
        <MainScreen
          onNavigateToBooking={handleNavigateToBooking}
          onNavigateToHistory={handleNavigateToHistory}
        />
      )}
      {currentView === 'booking' && (
        <BookingFlow onBack={handleBackToHome} />
      )}
      {currentView === 'history' && (
        <PatientHistory onBack={handleBackToHome} />
      )}
    </>
  );
}
