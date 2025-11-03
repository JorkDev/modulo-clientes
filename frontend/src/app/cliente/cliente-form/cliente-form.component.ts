import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h2>{{ isEdit ? 'Editar Cliente' : 'Nuevo Cliente' }}</h2>
        <button class="btn-back" (click)="goBack()">← Volver</button>
      </div>

      <form [formGroup]="clienteForm" (ngSubmit)="onSubmit()" class="cliente-form">
        <div class="form-row">
          <div class="form-group">
            <label for="nombre">Nombre *</label>
            <input id="nombre" type="text" formControlName="nombre" class="form-control"
                   [class.error]="clienteForm.get('nombre')?.invalid && clienteForm.get('nombre')?.touched">
            @if (clienteForm.get('nombre')?.invalid && clienteForm.get('nombre')?.touched) {
              <span class="error-message">Nombre es requerido</span>
            }
          </div>

          <div class="form-group">
            <label for="apellido">Apellido *</label>
            <input id="apellido" type="text" formControlName="apellido" class="form-control"
                   [class.error]="clienteForm.get('apellido')?.invalid && clienteForm.get('apellido')?.touched">
            @if (clienteForm.get('apellido')?.invalid && clienteForm.get('apellido')?.touched) {
              <span class="error-message">Apellido es requerido</span>
            }
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input id="email" type="email" formControlName="email" class="form-control"
                 [class.error]="clienteForm.get('email')?.invalid && clienteForm.get('email')?.touched">
          @if (clienteForm.get('email')?.invalid && clienteForm.get('email')?.touched) {
            <span class="error-message">Email es requerido y debe ser válido</span>
          }
        </div>

        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento *</label>
          <input id="fechaNacimiento" type="date" formControlName="fechaNacimiento" class="form-control"
                 [class.error]="clienteForm.get('fechaNacimiento')?.invalid && clienteForm.get('fechaNacimiento')?.touched">
          @if (clienteForm.get('fechaNacimiento')?.invalid && clienteForm.get('fechaNacimiento')?.touched) {
            <span class="error-message">Fecha de nacimiento es requerida</span>
          }
        </div>

        <div class="form-group">
          <label for="direccion">Dirección *</label>
          <textarea id="direccion" formControlName="direccion" class="form-control" rows="3"
                    [class.error]="clienteForm.get('direccion')?.invalid && clienteForm.get('direccion')?.touched"></textarea>
          @if (clienteForm.get('direccion')?.invalid && clienteForm.get('direccion')?.touched) {
            <span class="error-message">Dirección es requerida</span>
          }
        </div>

        <div class="form-group">
          <label for="telefono">Teléfono *</label>
          <input id="telefono" type="tel" formControlName="telefono" class="form-control"
                 [class.error]="clienteForm.get('telefono')?.invalid && clienteForm.get('telefono')?.touched">
          @if (clienteForm.get('telefono')?.invalid && clienteForm.get('telefono')?.touched) {
            <span class="error-message">Teléfono es requerido</span>
          }
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" formControlName="activo" class="checkbox">
            Cliente Activo
          </label>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="goBack()">Cancelar</button>
          <button type="submit" class="btn-primary" [disabled]="clienteForm.invalid || saving">
            {{ saving ? 'Guardando...' : 'Guardar' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .form-header h2 {
      color: #333;
      font-size: 2rem;
    }

    .cliente-form {
      max-width: 800px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 600;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      margin-bottom: 0;
    }

    .checkbox {
      width: 1.25rem;
      height: 1.25rem;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    .btn-back {
      background: transparent;
      color: #667eea;
      padding: 0.5rem 1rem;
      border: 2px solid #667eea;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.2s;
    }

    .btn-back:hover {
      background: #667eea;
      color: white;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }

      .form-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `]
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;
  isEdit = false;
  clienteId?: number;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      activo: [true]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.clienteId = +id;
      this.loadCliente();
    }
  }

  loadCliente() {
    if (this.clienteId) {
      this.clienteService.getById(this.clienteId).subscribe({
        next: (cliente) => {
          // Convert fechaNacimiento to YYYY-MM-DD format for input[type="date"]
          const fecha = new Date(cliente.fechaNacimiento).toISOString().split('T')[0];
          this.clienteForm.patchValue({
            ...cliente,
            fechaNacimiento: fecha
          });
        },
        error: (error) => {
          console.error('Error loading client:', error);
          alert('Error al cargar el cliente');
          this.goBack();
        }
      });
    }
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.saving = true;
      const clienteData = this.clienteForm.value;

      const request = this.isEdit && this.clienteId
        ? this.clienteService.update(this.clienteId, clienteData)
        : this.clienteService.create(clienteData);

      request.subscribe({
        next: () => {
          alert(`Cliente ${this.isEdit ? 'actualizado' : 'creado'} exitosamente`);
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          console.error('Error saving client:', error);
          alert(`Error al ${this.isEdit ? 'actualizar' : 'crear'} el cliente`);
          this.saving = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/clientes']);
  }
}

