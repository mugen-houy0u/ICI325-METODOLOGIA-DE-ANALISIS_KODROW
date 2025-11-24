'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import ConsultationTypeStep from './ConsultationTypeStep';
import PatientInfoStep from './PatientInfoStep';
import DoctorScheduleStep from './DoctorScheduleStep';
import ConfirmationDialog from './ConfirmationDialog';
import UserProfile from './UserProfile';
import { AppointmentData } from '../types/appointment';

interface BookingFlowProps {
  onBack: () => void;
}

export default function BookingFlow({ onBack }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    consultationType: '',
    patientName: '',
    patientLastName: '',
    patientRUT: '',
    patientPhone: '',
    doctorId: '',
    doctorName: '',
    selectedDate: '',
    selectedTime: ''
  });

  const handleConsultationTypeSubmit = (type: string) => {
    setAppointmentData({ ...appointmentData, consultationType: type });
    setCurrentStep(2);
  };

  const handlePatientInfoSubmit = (data: {
    name: string;
    lastName: string;
    rut: string;
    phone: string;
  }) => {
    setAppointmentData({
      ...appointmentData,
      patientName: data.name,
      patientLastName: data.lastName,
      patientRUT: data.rut,
      patientPhone: data.phone
    });
    setCurrentStep(3);
  };

  const handleDoctorScheduleSubmit = (data: {
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
  }) => {
    setAppointmentData({
      ...appointmentData,
      doctorId: data.doctorId,
      doctorName: data.doctorName,
      selectedDate: data.date,
      selectedTime: data.time
    });
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    // Reset to initial state and go back to main screen
    setCurrentStep(1);
    setAppointmentData({
      consultationType: '',
      patientName: '',
      patientLastName: '',
      patientRUT: '',
      patientPhone: '',
      doctorId: '',
      doctorName: '',
      selectedDate: '',
      selectedTime: ''
    });
    onBack();
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToMain = () => {
    if (currentStep === 1) {
      onBack();
    } else {
      handleStepBack();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={handleBackToMain}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </Button>
            <div className="flex-1">
              <h1 className="text-teal-600">Estéticom</h1>
              <p className="text-gray-600 mt-1">Clínica Odontológica</p>
            </div>
            <UserProfile />
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= step
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {step === 1 && 'Tipo de Consulta'}
                  {step === 2 && 'Datos Personales'}
                  {step === 3 && 'Doctor y Horario'}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    currentStep > step ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <ConsultationTypeStep onSubmit={handleConsultationTypeSubmit} />
          )}
          {currentStep === 2 && (
            <PatientInfoStep
              onSubmit={handlePatientInfoSubmit}
              onBack={handleStepBack}
            />
          )}
          {currentStep === 3 && (
            <DoctorScheduleStep
              consultationType={appointmentData.consultationType}
              onSubmit={handleDoctorScheduleSubmit}
              onBack={handleStepBack}
            />
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showConfirmation}
        onClose={handleConfirmationClose}
        appointmentData={appointmentData}
      />
    </div>
  );
}
