export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  direccion: string;
  telefono: string;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface ClienteRequest {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  direccion: string;
  telefono: string;
  activo?: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

