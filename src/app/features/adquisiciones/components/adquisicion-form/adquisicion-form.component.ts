// src/app/features/adquisiciones/components/adquisicion-form/adquisicion-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Adquisicion } from '../../../../core/models/adquisicion';
import { AdquisicionService } from '../../../../core/services/adquisicion.service';

@Component({
  selector: 'app-adquisicion-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './adquisicion-form.component.html',
  styleUrls: ['./adquisicion-form.component.scss']
})
export class AdquisicionFormComponent implements OnInit {
  adquisicionForm: FormGroup;
  isEditing = false;
  adquisicionId: number | null = null;
  isLoading = false;

  // Opciones para los campos de selección
  unidades: string[] = [
    'Dirección de Medicamentos y Tecnologías en Salud',
    'Dirección de Infraestructura',
    'Dirección Administrativa',
    'Dirección de TI'
  ];

  tiposBienServicio: string[] = [
    'Medicamentos',
    'Equipos médicos',
    'Mobiliario',
    'Software',
    'Servicios profesionales'
  ];

  proveedores: string[] = [
    'Laboratorios Bayer S.A.',
    'Tecnologías Médicas S.A.',
    'Consultoría Integral Ltda.',
    'Servicios Técnicos Especializados'
  ];

  constructor(
    private fb: FormBuilder,
    private adquisicionService: AdquisicionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.adquisicionForm = this.createForm();
  }

  ngOnInit(): void {
    this.checkIfEditing();
    this.setupCalculatedFields();
  }

  createForm(): FormGroup {
    return this.fb.group({
      presupuesto: [0, [Validators.required, Validators.min(0)]],
      unidad: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: [0, [Validators.required, Validators.min(0)]],
      valorTotal: [{value: 0, disabled: true}],
      fechaAdquisicion: [new Date(), Validators.required],
      proveedor: ['', Validators.required],
      documentacion: [''],
      activo: [true]
    });
  }

  checkIfEditing(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.adquisicionId = +id;
      this.loadAdquisicion(this.adquisicionId);
    }
  }

  setupCalculatedFields(): void {
    // Calcular el valor total automáticamente
    this.adquisicionForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });
    
    this.adquisicionForm.get('valorUnitario')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });
  }

  calcularValorTotal(): void {
    const cantidad = this.adquisicionForm.get('cantidad')?.value || 0;
    const valorUnitario = this.adquisicionForm.get('valorUnitario')?.value || 0;
    const valorTotal = cantidad * valorUnitario;
    
    this.adquisicionForm.get('valorTotal')?.setValue(valorTotal);
  }

  loadAdquisicion(id: number): void {
    this.isLoading = true;
    this.adquisicionService.getAdquisicionById(id).subscribe({
      next: (adquisicion) => {
        this.adquisicionForm.patchValue({
          presupuesto: adquisicion.presupuesto,
          unidad: adquisicion.unidad,
          tipoBienServicio: adquisicion.tipoBienServicio,
          cantidad: adquisicion.cantidad,
          valorUnitario: adquisicion.valorUnitario,
          valorTotal: adquisicion.valorTotal,
          fechaAdquisicion: new Date(adquisicion.fechaAdquisicion),
          proveedor: adquisicion.proveedor,
          documentacion: adquisicion.documentacion,
          activo: adquisicion.activo
        });
        this.isLoading = false;
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

  onSubmit(): void {
    if (this.adquisicionForm.invalid) {
      this.markFormGroupTouched(this.adquisicionForm);
      return;
    }

    this.isLoading = true;
    const formValues = this.adquisicionForm.getRawValue();
    const adquisicion: Adquisicion = {
      ...formValues,
      id: this.adquisicionId || undefined
    };

    if (this.isEditing && this.adquisicionId) {
      this.adquisicionService.updateAdquisicion(this.adquisicionId, adquisicion).subscribe({
        next: () => {
          this.snackBar.open('Adquisición actualizada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.isLoading = false;
          this.router.navigate(['/adquisiciones']);
        },
        error: (error) => {
          console.error('Error al actualizar adquisición', error);
          this.snackBar.open('Error al actualizar adquisición', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
    } else {
      this.adquisicionService.createAdquisicion(adquisicion).subscribe({
        next: () => {
          this.snackBar.open('Adquisición creada con éxito', 'Cerrar', {
            duration: 3000
          });
          this.isLoading = false;
          this.router.navigate(['/adquisiciones']);
        },
        error: (error) => {
          console.error('Error al crear adquisición', error);
          this.snackBar.open('Error al crear adquisición', 'Cerrar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/adquisiciones']);
  }
}