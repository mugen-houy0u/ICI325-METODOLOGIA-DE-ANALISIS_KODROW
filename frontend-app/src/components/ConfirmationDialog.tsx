'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { AppointmentData } from '@/types/appointment';
import { createConsulta } from '../services/api';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  appointmentData: AppointmentData;
}

export default function ConfirmationDialog({
  open,
  onClose,
  appointmentData
}: ConfirmationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consultationTypeLabels: Record<string, string> = {
    consulta: 'Consulta',
    operacion: 'Operación',
    estetica: 'Estética'
  };

  // Enviar consulta al backend cuando se abre el diálogo
  useEffect(() => {
    if (open && !isSuccess && !isSubmitting) {
      const submitAppointment = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
          const consultaData = {
            tipo: appointmentData.consultationType,
            doctor: appointmentData.doctorName,
            fecha: appointmentData.selectedDate,
            hora: appointmentData.selectedTime,
            paciente: {
              nombre: appointmentData.patientName,
              apellido: appointmentData.patientLastName,
              rut: appointmentData.patientRUT,
              telefono: appointmentData.patientPhone
            }
          };

          await createConsulta(consultaData);
          setIsSuccess(true);
        } catch (err) {
          console.error('Error al crear consulta:', err);
          setError('No se pudo guardar la consulta. Por favor, intente nuevamente.');
        } finally {
          setIsSubmitting(false);
        }
      };

      submitAppointment();
    }
  }, [open, appointmentData, isSuccess, isSubmitting]);

  // Limpiar estados al cerrar
  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  // Mostrar loading mientras se envía
  if (isSubmitting) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
            <p className="text-gray-600">Guardando su reserva...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Mostrar error si hay
  if (error) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
            </div>
            <DialogTitle className="text-center">Error</DialogTitle>
            <DialogDescription className="text-center">{error}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }


  // Mostrar confirmación exitosa
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center">
            ¡Reserva Confirmada!
          </DialogTitle>
          <DialogDescription className="text-center">
            Su cita ha sido agendada exitosamente
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">Paciente</p>
              <p className="text-gray-900">
                {appointmentData.patientName} {appointmentData.patientLastName}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">RUT</p>
              <p className="text-gray-900">{appointmentData.patientRUT}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-gray-900">{appointmentData.patientPhone}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">Tipo de Consulta</p>
              <p className="text-gray-900">
                {consultationTypeLabels[appointmentData.consultationType]}
              </p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">Doctor</p>
              <p className="text-gray-900">{appointmentData.doctorName}</p>
            </div>

            <div className="border-b border-gray-200 pb-3">
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="text-gray-900">{appointmentData.selectedDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Hora</p>
              <p className="text-gray-900">{appointmentData.selectedTime}</p>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <p className="text-sm text-teal-800">
              Le enviaremos un recordatorio por SMS 24 horas antes de su cita.
              Por favor, llegue 10 minutos antes de su hora agendada.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleClose}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Nueva Reserva
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}