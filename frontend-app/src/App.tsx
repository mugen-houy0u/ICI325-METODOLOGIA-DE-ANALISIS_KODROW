'use client';

import { useState } from 'react';
import MainScreen from './components/MainScreen';
import BookingFlow from './components/BookingFlow';

type View = 'home' | 'booking';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigateToBooking = () => {
    setCurrentView('booking');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <>
      {currentView === 'home' && (
        <MainScreen onNavigateToBooking={handleNavigateToBooking} />
      )}
      {currentView === 'booking' && (
        <BookingFlow onBack={handleBackToHome} />
      )}
    </>
  );
}
