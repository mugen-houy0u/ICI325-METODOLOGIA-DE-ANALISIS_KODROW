'use client';

import { User, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Datos mock del usuario actual
const currentUser = {
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@email.com',
  phone: '+56 9 1234 5678',
  initials: 'JP'
};

export default function UserProfile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-full">
          <Avatar className="h-10 w-10 bg-teal-600 cursor-pointer">
            <AvatarFallback className="bg-teal-600 text-white">
              {currentUser.initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-teal-600">
              <AvatarFallback className="bg-teal-600 text-white">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-gray-800">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-sm text-gray-500">Paciente</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Correo electrónico</p>
                <p className="text-sm text-gray-800">{currentUser.email}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">Teléfono</p>
                <p className="text-sm text-gray-800">{currentUser.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
