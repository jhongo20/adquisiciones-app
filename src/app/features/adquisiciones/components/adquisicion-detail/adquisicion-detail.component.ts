// src/app/features/adquisiciones/components/adquisicion-detail/adquisicion-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Adquisicion } from '../../../../core/models/adquisicion';
import { HistorialAdquisicion } from '../../../../core/models/historial-adquisicion';
import { AdquisicionService } from '../../../../core/services/adquisicion.service';

@Component({
  selector: 'app-adquisicion-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './adquisicion-detail.component.html',
  styleUrls: ['./adquisicion-detail.component.scss']
})
export class AdquisicionDetailComponent implements OnInit {
  adquisicion: Adquisicion | null = null;
  historial: HistorialAdquisicion[] = [];
  isLoading = false;
  displayedColumns: string[] = ['campoModificado', 'valorAnterior', 'valorNuevo', 'fechaModificacion', 'usuarioModificacion'];

  constructor(
    private adquisicionService: AdquisicionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAdquisicion();
  }

  loadAdquisicion(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/adquisiciones']);
      return;
    }

    this.isLoading = true;
    const adquisicionId = +id;

    // Cargar los detalles de la adquisición
    this.adquisicionService.getAdquisicionById(adquisicionId).subscribe({
      next: (adquisicion) => {
        this.adquisicion = adquisicion;
        this.loadHistorial(adquisicionId);
      },
      error: (error) => {
        console.error('Error al cargar adquisición', error);
        this.snackBar.open('Error al cargar datos de la adquisición', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
        this.router.navigate(['/adquisiciones']);
      }
    });
  }

  loadHistorial(id: number): void {
    this.adquisicionService.getHistorial(id).subscribe({
      next: (historial) => {
        this.historial = historial;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar historial', error);
        this.snackBar.open('Error al cargar historial de la adquisición', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/adquisiciones']);
  }

  editarAdquisicion(): void {
    if (this.adquisicion) {
      this.router.navigate(['/adquisiciones/editar', this.adquisicion.id]);
    }
  }

  desactivarAdquisicion(): void {
    if (!this.adquisicion) return;

    if (confirm('¿Está seguro de desactivar esta adquisición?')) {
      this.isLoading = true;
      this.adquisicionService.deactivateAdquisicion(this.adquisicion.id!).subscribe({
        next: () => {
          this.snackBar.open('Adquisición desactivada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.loadAdquisicion(); // Recargar para ver estado actualizado
        },
        error: (error) => {
          console.error('Error al desactivar adquisición', error);
          this.snackBar.open('Error al desactivar adquisición', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
    }
  }
}