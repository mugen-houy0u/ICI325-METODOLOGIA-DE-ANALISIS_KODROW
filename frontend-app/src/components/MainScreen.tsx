'use client';

import { Calendar } from 'lucide-react';
import { Button } from './ui/button';
import UserProfile from './UserProfile';

interface MainScreenProps {
  onNavigateToBooking: () => void;
}

export default function MainScreen({ onNavigateToBooking }: MainScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-teal-600">Estéticom</h1>
              <p className="text-gray-600 mt-1">Clínica Odontológica</p>
            </div>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-gray-800 mb-3">Bienvenido a Estéticom</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Agenda tu cita odontológica de manera fácil y rápida con nuestros especialistas.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Agendar cita */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow max-w-md w-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-teal-600" />
              </div>
              <div>
                <h3 className="text-gray-800 mb-2">Agendar cita</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Solicita una nueva cita con nuestros especialistas en odontología
                </p>
              </div>
              <Button
                onClick={onNavigateToBooking}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Nueva Cita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
