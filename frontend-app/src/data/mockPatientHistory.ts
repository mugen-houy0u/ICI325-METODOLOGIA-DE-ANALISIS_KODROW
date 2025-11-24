import { PatientHistoryData } from '../types/patient';

export const mockPatientHistory: PatientHistoryData = {
  patientName: 'Juan Pérez',
  patientRUT: '12.345.678-9',
  appointments: [
    {
      id: '1',
      date: '2024-11-15',
      time: '10:00',
      consultationType: 'Consulta General',
      doctorName: 'Dra. María González',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-10-20',
      time: '14:30',
      consultationType: 'Estética Dental',
      doctorName: 'Dr. Carlos Ramírez',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-09-10',
      time: '09:00',
      consultationType: 'Operación',
      doctorName: 'Dr. Pedro Martínez',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-12-05',
      time: '11:00',
      consultationType: 'Consulta General',
      doctorName: 'Dra. María González',
      status: 'scheduled'
    }
  ],
  treatments: [
    {
      id: '1',
      name: 'Blanqueamiento Dental',
      description: 'Tratamiento de blanqueamiento profesional con láser',
      date: '2024-10-20',
      doctorName: 'Dr. Carlos Ramírez',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Extracción de Muela del Juicio',
      description: 'Extracción quirúrgica de terceros molares',
      date: '2024-09-10',
      doctorName: 'Dr. Pedro Martínez',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Limpieza Dental Profunda',
      description: 'Profilaxis y limpieza dental profesional',
      date: '2024-11-15',
      doctorName: 'Dra. María González',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Ortodoncia',
      description: 'Tratamiento de ortodoncia con brackets',
      date: '2024-08-01',
      doctorName: 'Dra. Ana López',
      status: 'in-progress'
    }
  ],
  doctors: [
    {
      id: '1',
      name: 'Dra. María González',
      specialty: 'Odontología General',
      totalAppointments: 5,
      lastVisit: '2024-11-15'
    },
    {
      id: '2',
      name: 'Dr. Carlos Ramírez',
      specialty: 'Estética Dental',
      totalAppointments: 3,
      lastVisit: '2024-10-20'
    },
    {
      id: '3',
      name: 'Dr. Pedro Martínez',
      specialty: 'Cirugía Oral',
      totalAppointments: 2,
      lastVisit: '2024-09-10'
    },
    {
      id: '4',
      name: 'Dra. Ana López',
      specialty: 'Ortodoncia',
      totalAppointments: 4,
      lastVisit: '2024-10-30'
    }
  ]
};
