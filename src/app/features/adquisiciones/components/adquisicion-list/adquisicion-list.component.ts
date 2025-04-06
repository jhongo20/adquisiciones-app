// src/app/features/adquisiciones/components/adquisicion-list/adquisicion-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Adquisicion } from '../../../../core/models/adquisicion';
import { FiltroAdquisicion } from '../../../../core/models/filtro-adquisicion';
import { AdquisicionService } from '../../../../core/services/adquisicion.service';
import { AdquisicionFilterComponent } from '../adquisicion-filter/adquisicion-filter.component';


@Component({
  selector: 'app-adquisicion-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    AdquisicionFilterComponent
  ],
  templateUrl: './adquisicion-list.component.html',
  styleUrls: ['./adquisicion-list.component.scss']
})
export class AdquisicionListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'unidad', 'tipoBienServicio', 'presupuesto', 
    'cantidad', 'valorUnitario', 'valorTotal', 
    'fechaAdquisicion', 'proveedor', 'acciones'
  ];
  dataSource: MatTableDataSource<Adquisicion>;
  isLoading = false;
  includeInactive = false;
  filtroAplicado: FiltroAdquisicion | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adquisicionService: AdquisicionService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<Adquisicion>([]);
  }

  ngOnInit(): void {
    this.cargarAdquisiciones();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarAdquisiciones(): void {
    this.isLoading = true;
    this.adquisicionService.getAdquisiciones(this.includeInactive).subscribe({
      next: (adquisiciones) => {
        this.dataSource.data = adquisiciones;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar adquisiciones', error);
        this.snackBar.open('Error al cargar adquisiciones', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  aplicarFiltro(filtro: FiltroAdquisicion): void {
    this.isLoading = true;
    this.filtroAplicado = filtro;
    
    this.adquisicionService.filtrarAdquisiciones(filtro).subscribe({
      next: (adquisiciones) => {
        this.dataSource.data = adquisiciones;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al filtrar adquisiciones', error);
        this.snackBar.open('Error al filtrar adquisiciones', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroAplicado = null;
    this.cargarAdquisiciones();
  }

  // Añade estos métodos para la navegación programática
  irANuevaAdquisicion(): void {
    this.router.navigate(['/adquisiciones/nuevo']);
    console.log('Navegando a nueva adquisición');
  }

  irADetalle(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/adquisiciones/detalle', id]);
    console.log('Navegando a detalle:', id);
  }

  irAEditar(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate(['/adquisiciones/editar', id]);
    console.log('Navegando a editar:', id);
  }

  desactivarAdquisicion(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (confirm('¿Está seguro de desactivar esta adquisición?')) {
      this.adquisicionService.deactivateAdquisicion(id).subscribe({
        next: () => {
          this.snackBar.open('Adquisición desactivada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.cargarAdquisiciones();
        },
        error: (error) => {
          console.error('Error al desactivar adquisición', error);
          this.snackBar.open('Error al desactivar adquisición', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  toggleIncludeInactive(): void {
    this.includeInactive = !this.includeInactive;
    this.cargarAdquisiciones();
  }

  aplicarFiltroBusqueda(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }















}