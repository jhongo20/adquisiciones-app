// src/app/features/adquisiciones/components/adquisicion-filter/adquisicion-filter.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FiltroAdquisicion } from '../../../../core/models/filtro-adquisicion';
import { AdquisicionService } from '../../../../core/services/adquisicion.service';

@Component({
  selector: 'app-adquisicion-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './adquisicion-filter.component.html',
  styleUrls: ['./adquisicion-filter.component.scss']
})
export class AdquisicionFilterComponent implements OnInit {
  @Output() filtroAplicado = new EventEmitter<FiltroAdquisicion>();
  @Output() filtrosLimpiados = new EventEmitter<void>();

  filtroForm: FormGroup;
  unidades: string[] = [];
  tiposBienServicio: string[] = [];
  proveedores: string[] = [];

  constructor(
    private fb: FormBuilder,
    private adquisicionService: AdquisicionService
  ) {
    this.filtroForm = this.fb.group({
      unidad: [''],
      tipoBienServicio: [''],
      proveedor: [''],
      fechaDesde: [null],
      fechaHasta: [null],
      incluirInactivos: [false]
    });
  }

  ngOnInit(): void {
    this.cargarOpcionesFiltro();
  }

  cargarOpcionesFiltro(): void {
    // En un escenario real, obtendríamos estas opciones de la API
    // Para este ejemplo, usamos datos ficticios
    this.unidades = [
      'Dirección de Medicamentos y Tecnologías en Salud',
      'Dirección de Infraestructura',
      'Dirección Administrativa',
      'Dirección de TI'
    ];

    this.tiposBienServicio = [
      'Medicamentos',
      'Equipos médicos',
      'Mobiliario',
      'Software',
      'Servicios profesionales'
    ];

    this.proveedores = [
      'Laboratorios Bayer S.A.',
      'Tecnologías Médicas S.A.',
      'Consultoría Integral Ltda.',
      'Servicios Técnicos Especializados'
    ];
  }

  aplicarFiltro(): void {
    if (this.filtroForm.valid) {
      const filtro: FiltroAdquisicion = this.filtroForm.value;
      this.filtroAplicado.emit(filtro);
    }
  }

  limpiarFiltros(): void {
    this.filtroForm.reset({
      unidad: '',
      tipoBienServicio: '',
      proveedor: '',
      fechaDesde: null,
      fechaHasta: null,
      incluirInactivos: false
    });
    this.filtrosLimpiados.emit();
  }
}