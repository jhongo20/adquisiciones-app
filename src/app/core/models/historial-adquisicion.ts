export interface HistorialAdquisicion {
    id?: number;
    adquisicionId: number;
    campoModificado: string;
    valorAnterior: string;
    valorNuevo: string;
    fechaModificacion: Date;
    usuarioModificacion: string;
  }