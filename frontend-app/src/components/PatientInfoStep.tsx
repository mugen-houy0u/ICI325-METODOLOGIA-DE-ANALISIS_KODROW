'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PatientInfoStepProps {
  onSubmit: (data: {
    name: string;
    lastName: string;
    rut: string;
    phone: string;
  }) => void;
  onBack: () => void;
}

export default function PatientInfoStep({
  onSubmit,
  onBack
}: PatientInfoStepProps) {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.lastName &&
      formData.rut &&
      formData.phone
    ) {
      onSubmit(formData);
    }
  };

  const isFormValid =
    formData.name && formData.lastName && formData.rut && formData.phone;

  return (
    <div>
      <h2 className="text-gray-900 mb-2">Datos Personales</h2>
      <p className="text-gray-600 mb-8">
        Complete sus datos para continuar con la reserva
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Ingrese su nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ingrese su apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input
              id="rut"
              name="rut"
              type="text"
              placeholder="12.345.678-9"
              value={formData.rut}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+56 9 1234 5678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="px-8"
          >
            Volver
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}