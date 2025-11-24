// Types para las respuestas del backend

export interface Paciente {
    nombre: string;
    apellido: string;
    rut: string;
    telefono: string;
}

export interface Consulta {
    _id?: string;
    tipo: string;
    doctor: string;
    fecha: string;
    hora: string;
    paciente: Paciente;
}

export interface Odontologo {
    _id: string;
    nombre: string;
    especialidad: string;
    rut: string;
    horarios: string[];
}

export interface CreateConsultaRequest {
    tipo: string;
    doctor: string;
    fecha: string;
    hora: string;
    paciente: Paciente;
}

export interface CreateConsultaResponse {
    status: string;
    id_insertado: string;
}
