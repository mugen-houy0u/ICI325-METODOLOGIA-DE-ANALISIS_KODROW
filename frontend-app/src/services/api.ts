// API Service para comunicación con el backend
import type {
    Odontologo,
    CreateConsultaRequest,
    CreateConsultaResponse,
    Consulta,
} from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Cliente base para hacer peticiones
async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.detail || `HTTP error! status: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Obtener todos los odontólogos
export async function getOdontologos(): Promise<Odontologo[]> {
    return apiClient<Odontologo[]>('/api/odontologos/');
}

// Obtener un odontólogo por ID
export async function getOdontologoById(id: string): Promise<Odontologo> {
    return apiClient<Odontologo>(`/api/odontologos/${id}`);
}

// Crear una nueva consulta
export async function createConsulta(
    data: CreateConsultaRequest
): Promise<CreateConsultaResponse> {
    return apiClient<CreateConsultaResponse>('/api/consultas/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// Obtener todas las consultas
export async function getConsultas(): Promise<Consulta[]> {
    return apiClient<Consulta[]>('/api/consultas/');
}

// Obtener consultas por doctor y fecha para identificar horarios ocupados
export async function getConsultasByDoctorAndDate(
    doctorName: string,
    fecha: string
): Promise<Consulta[]> {
    const allConsultas = await getConsultas();

    // Filtrar por doctor y fecha
    return allConsultas.filter(
        (consulta) => consulta.doctor === doctorName && consulta.fecha === fecha
    );
}
