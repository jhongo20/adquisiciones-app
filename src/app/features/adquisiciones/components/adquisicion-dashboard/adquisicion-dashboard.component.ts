import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';

import { AdquisicionService } from '../../../../core/services/adquisicion.service';
import { Adquisicion } from '../../../../core/models/adquisicion';

@Component({
  selector: 'app-adquisicion-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTableModule
  ],
  templateUrl: './adquisicion-dashboard.component.html',
  styleUrls: ['./adquisicion-dashboard.component.scss']
})
export class AdquisicionDashboardComponent implements OnInit {
  estadisticas: any = null;
  ultimasAdquisiciones: Adquisicion[] = [];
  isLoading = false;
  displayedColumns: string[] = ['tipoBienServicio', 'proveedor', 'fechaAdquisicion', 'valorTotal', 'estado'];

  constructor(private adquisicionService: AdquisicionService) { }

  ngOnInit(): void {
    this.cargarEstadisticas();
    this.cargarUltimasAdquisiciones();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.adquisicionService.getEstadisticas().subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas', error);
        this.isLoading = false;
      }
    });
  }

  cargarUltimasAdquisiciones(): void {
    this.adquisicionService.getUltimasAdquisiciones(5).subscribe({
      next: (adquisiciones) => {
        this.ultimasAdquisiciones = adquisiciones;
      },
      error: (error) => {
        console.error('Error al cargar últimas adquisiciones', error);
      }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  }
}