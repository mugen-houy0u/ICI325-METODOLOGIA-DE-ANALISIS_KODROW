'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Clock, Loader2 } from 'lucide-react';
import { getOdontologos, getConsultasByDoctorAndDate } from '../services/api';
import type { Odontologo } from '../types/api';

interface DoctorScheduleStepProps {
  consultationType: string;
  onSubmit: (data: {
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
  }) => void;
  onBack: () => void;
}

export default function DoctorScheduleStep({
  consultationType,
  onSubmit,
  onBack
}: DoctorScheduleStepProps) {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]);

  // Cargar odontólogos del backend
  useEffect(() => {
    const loadOdontologos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOdontologos();
        setOdontologos(data);
      } catch (err) {
        console.error('Error al cargar odontólogos:', err);
        setError('No se pudieron cargar los odontólogos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    loadOdontologos();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      const doctor = odontologos.find((d) => d._id === selectedDoctor);
      if (doctor) {
        setAvailableTimes(doctor.horarios);
      }
    } else {
      setAvailableTimes([]);
    }
    setSelectedTime('');
  }, [selectedDoctor, odontologos]);

  // Cargar horarios ocupados cuando se selecciona doctor y fecha
  useEffect(() => {
    const loadOccupiedTimes = async () => {
      if (selectedDoctor && selectedDate) {
        const doctor = odontologos.find((d) => d._id === selectedDoctor);
        if (doctor) {
          const fechaStr = selectedDate.toLocaleDateString('es-CL');
          const consultas = await getConsultasByDoctorAndDate(doctor.nombre, fechaStr);
          const occupied = consultas.map((c) => c.hora);
          setOccupiedTimes(occupied);
        }
      } else {
        setOccupiedTimes([]);
      }
    };

    loadOccupiedTimes();
  }, [selectedDoctor, selectedDate, odontologos]);

  const handleSubmit = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      const doctor = odontologos.find((d) => d._id === selectedDoctor);
      if (doctor) {
        onSubmit({
          doctorId: selectedDoctor,
          doctorName: doctor.nombre,
          date: selectedDate.toLocaleDateString('es-CL'),
          time: selectedTime
        });
      }
    }
  };

  const isFormValid = selectedDoctor && selectedDate && selectedTime;

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-gray-600">Cargando odontólogos...</p>
      </div>
    );
  }

  // Mostrar error si hay
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-gray-900 mb-2">Seleccione Doctor y Horario</h2>
      <p className="text-gray-600 mb-8">
        Elija su doctor de preferencia y el horario que más le acomode
      </p>

      <div className="space-y-6">
        {/* Doctor Selection */}
        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor</Label>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger id="doctor">
              <SelectValue placeholder="Seleccione un doctor" />
            </SelectTrigger>
            <SelectContent>
              {odontologos.map((doctor) => (
                <SelectItem key={doctor._id} value={doctor._id}>
                  {doctor.nombre} - {doctor.especialidad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date and Time Selection */}
        {selectedDoctor && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0; // Disable past dates and Sundays
                  }}
                  className="rounded-md"
                />
              </Card>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <Label>Horario Disponible</Label>
              <Card className="p-4">
                {selectedDate ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        {selectedDate.toLocaleDateString('es-CL', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {availableTimes.map((time) => {
                        const isOccupied = occupiedTimes.includes(time);
                        const isSelected = selectedTime === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => !isOccupied && setSelectedTime(time)}
                            disabled={isOccupied}
                            className={`py-3 px-4 rounded-md border-2 transition-all ${isOccupied
                              ? 'border-red-300 bg-red-50 text-red-400 cursor-not-allowed'
                              : isSelected
                                ? 'border-teal-600 bg-teal-50 text-teal-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            <span className="block">{time}</span>
                            {isOccupied && (
                              <span
                                className="text-xs block mt-1 px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: '#fecaca',
                                  color: '#b91c1c'
                                }}
                              >
                                Ocupado
                              </span>
                            )}
                          </button>
                        );
                      })}

                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Seleccione una fecha para ver horarios disponibles
                  </p>
                )}
              </Card>
            </div>
          </div>
        )}

        {/* Selected Summary */}
        {selectedDoctor && selectedDate && selectedTime && (
          <Card className="p-4 bg-teal-50 border-teal-200">
            <h3 className="text-teal-900 mb-2">Resumen de su Reserva</h3>
            <div className="space-y-1 text-teal-800">
              <p>
                <span className="inline-block w-24">Doctor:</span>
                {odontologos.find((d) => d._id === selectedDoctor)?.nombre}
              </p>
              <p>
                <span className="inline-block w-24">Fecha:</span>
                {selectedDate.toLocaleDateString('es-CL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p>
                <span className="inline-block w-24">Hora:</span>
                {selectedTime}
              </p>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
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
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8"
          >
            Confirmar Reserva
          </Button>
        </div>
      </div>
    </div>
  );
}