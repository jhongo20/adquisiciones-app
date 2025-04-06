export interface FiltroAdquisicion {
    unidad?: string;
    tipoBienServicio?: string;
    proveedor?: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
    incluirInactivos?: boolean;
  }