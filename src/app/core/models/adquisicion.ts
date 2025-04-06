import { HistorialAdquisicion } from './historial-adquisicion';

export interface Adquisicion {
    id?: number;
    presupuesto: number;
    unidad: string;
    tipoBienServicio: string;
    cantidad: number;
    valorUnitario: number;
    valorTotal?: number;
    fechaAdquisicion: Date;
    proveedor: string;
    documentacion: string;
    activo: boolean;
    fechaCreacion?: Date;
    fechaModificacion?: Date;
    historial?: HistorialAdquisicion[];
  }