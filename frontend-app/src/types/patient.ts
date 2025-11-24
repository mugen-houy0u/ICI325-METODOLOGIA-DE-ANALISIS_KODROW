export interface PatientAppointment {
  id: string;
  date: string;
  time: string;
  consultationType: string;
  doctorName: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export interface PatientTreatment {
  id: string;
  name: string;
  description: string;
  date: string;
  doctorName: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface PatientDoctor {
  id: string;
  name: string;
  specialty: string;
  totalAppointments: number;
  lastVisit: string;
}

export interface PatientHistoryData {
  patientName: string;
  patientRUT: string;
  appointments: PatientAppointment[];
  treatments: PatientTreatment[];
  doctors: PatientDoctor[];
}
