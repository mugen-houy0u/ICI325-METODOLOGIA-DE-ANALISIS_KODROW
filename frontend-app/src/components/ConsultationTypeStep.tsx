'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Stethoscope, Sparkles, Activity } from 'lucide-react';

interface ConsultationTypeStepProps {
  onSubmit: (type: string) => void;
}

export default function ConsultationTypeStep({
  onSubmit
}: ConsultationTypeStepProps) {
  const [selectedType, setSelectedType] = useState('');

  const consultationTypes = [
    {
      id: 'consulta',
      label: 'Consulta',
      description: 'Revisión general y diagnóstico',
      icon: Stethoscope,
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    },
    {
      id: 'operacion',
      label: 'Operación',
      description: 'Procedimientos quirúrgicos',
      icon: Activity,
      color: 'bg-red-100 text-red-600 hover:bg-red-200'
    },
    {
      id: 'estetica',
      label: 'Estética',
      description: 'Tratamientos estéticos dentales',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-600 hover:bg-purple-200'
    }
  ];

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit(selectedType);
    }
  };

  return (
    <div>
      <h2 className="text-gray-900 mb-2">Seleccione el Tipo de Consulta</h2>
      <p className="text-gray-600 mb-8">
        Elija el tipo de servicio que necesita
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {consultationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className={`p-6 cursor-pointer transition-all border-2 ${
                selectedType === type.id
                  ? 'border-teal-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${type.color}`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-gray-900 mb-2">{type.label}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}