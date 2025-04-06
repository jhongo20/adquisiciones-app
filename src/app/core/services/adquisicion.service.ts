// src/app/core/services/adquisicion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}