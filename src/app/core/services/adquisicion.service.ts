// src/app/core/services/adquisicion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Adquisicion } from '../models/adquisicion';
import { HistorialAdquisicion } from '../models/historial-adquisicion';
import { FiltroAdquisicion } from '../models/filtro-adquisicion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {
  private apiUrl = `${environment.apiUrl}/api/adquisiciones`;

  constructor(private http: HttpClient) { }

  getAdquisiciones(includeInactive: boolean = false): Observable<Adquisicion[]> {
    return this.http.get<Adquisicion[]>(`${this.apiUrl}?includeInactive=${includeInactive}`);
  }

  getAdquisicionById(id: number): Observable<Adquisicion> {
    return this.http.get<Adquisicion>(`${this.apiUrl}/${id}`);
  }

  createAdquisicion(adquisicion: Adquisicion): Observable<Adquisicion> {
    return this.http.post<Adquisicion>(this.apiUrl, adquisicion);
  }

  updateAdquisicion(id: number, adquisicion: Adquisicion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, adquisicion);
  }

  deactivateAdquisicion(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }

  getHistorial(id: number): Observable<HistorialAdquisicion[]> {
    return this.http.get<HistorialAdquisicion[]>(`${this.apiUrl}/${id}/historial`);
  }

  filtrarAdquisiciones(filtro: FiltroAdquisicion): Observable<Adquisicion[]> {
    let params = new HttpParams();
    
    if (filtro.unidad) params = params.set('unidad', filtro.unidad);
    if (filtro.tipoBienServicio) params = params.set('tipoBienServicio', filtro.tipoBienServicio);
    if (filtro.proveedor) params = params.set('proveedor', filtro.proveedor);
    if (filtro.fechaDesde) params = params.set('fechaDesde', filtro.fechaDesde.toISOString());
    if (filtro.fechaHasta) params = params.set('fechaHasta', filtro.fechaHasta.toISOString());
    
    return this.http.get<Adquisicion[]>(`${this.apiUrl}/filtrar`, { params });
  }

  // Método para obtener estadísticas de adquisiciones
  getEstadisticas(): Observable<any> {
    return this.getAdquisiciones(true).pipe(
      map(adquisiciones => {
        return {
          total: adquisiciones.length,
          activas: adquisiciones.filter(a => a.activo).length,
          inactivas: adquisiciones.filter(a => !a.activo).length,
          valorTotal: adquisiciones.reduce((sum, a) => sum + (a.valorTotal || 0), 0),
          valorPromedio: adquisiciones.length > 0 
            ? adquisiciones.reduce((sum, a) => sum + (a.valorTotal || 0), 0) / adquisiciones.length 
            : 0,
          porTipoBienServicio: this.agruparPorPropiedad(adquisiciones, 'tipoBienServicio'),
          porUnidad: this.agruparPorPropiedad(adquisiciones, 'unidad'),
          porProveedor: this.agruparPorPropiedad(adquisiciones, 'proveedor'),
          ultimasAdquisiciones: [...adquisiciones]
            .sort((a, b) => new Date(b.fechaAdquisicion).getTime() - new Date(a.fechaAdquisicion).getTime())
            .slice(0, 5)
        };
      })
    );
  }

  // Método auxiliar para agrupar adquisiciones por una propiedad
  private agruparPorPropiedad(adquisiciones: Adquisicion[], propiedad: keyof Adquisicion) {
    const grupos: { [key: string]: any } = {};

    adquisiciones.forEach(a => {
      const valor = String(a[propiedad]);
      if (!grupos[valor]) {
        grupos[valor] = {
          nombre: valor,
          cantidad: 0,
          valorTotal: 0
        };
      }
      grupos[valor].cantidad++;
      grupos[valor].valorTotal += (a.valorTotal || 0);
    });

    return Object.values(grupos).sort((a, b) => b.valorTotal - a.valorTotal);
  }

  // Método para obtener las últimas adquisiciones
  getUltimasAdquisiciones(limit: number = 5): Observable<Adquisicion[]> {
    return this.getAdquisiciones().pipe(
      map(adquisiciones => 
        [...adquisiciones]
          .sort((a, b) => new Date(b.fechaAdquisicion).getTime() - new Date(a.fechaAdquisicion).getTime())
          .slice(0, limit)
      )
    );
  }

}