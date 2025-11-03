import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="detail-container">
      <div class="detail-header">
        <h2>Detalle del Cliente</h2>
        <div class="header-actions">
          <button class="btn-secondary" (click)="editCliente()">Editar</button>
          <button class="btn-back" (click)="goBack()">← Volver</button>
        </div>
      </div>

      @if (loading) {
        <div class="loading">Cargando...</div>
      } @else if (cliente) {
        <div class="detail-card">
          <div class="detail-section">
            <h3>Información Personal</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="label">ID:</span>
                <span class="value">{{ cliente.id }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Nombre:</span>
                <span class="value">{{ cliente.nombre }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Apellido:</span>
                <span class="value">{{ cliente.apellido }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Email:</span>
                <span class="value">{{ cliente.email }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Teléfono:</span>
                <span class="value">{{ cliente.telefono }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Fecha de Nacimiento:</span>
                <span class="value">{{ formatDate(cliente.fechaNacimiento) }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section">
            <h3>Información de Contacto</h3>
            <div class="detail-item full-width">
              <span class="label">Dirección:</span>
              <span class="value">{{ cliente.direccion }}</span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Estado</h3>
            <div class="detail-item">
              <span class="label">Estado:</span>
              <span [class]="'status-badge ' + (cliente.activo ? 'active' : 'inactive')">
                {{ cliente.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
          </div>

          <div class="detail-section">
            <h3>Información del Sistema</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="label">Fecha de Creación:</span>
                <span class="value">{{ formatDateTime(cliente.fechaCreacion) }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Última Actualización:</span>
                <span class="value">{{ formatDateTime(cliente.fechaActualizacion) }}</span>
              </div>
            </div>
          </div>

          <div class="detail-actions">
            <button class="btn-danger" (click)="deleteCliente()">Eliminar Cliente</button>
            @if (cliente.activo) {
              <button class="btn-warning" (click)="deactivateCliente()">Desactivar Cliente</button>
            }
          </div>
        </div>
      } @else {
        <div class="error">Cliente no encontrado</div>
      }
    </div>
  `,
  styles: [`
    .detail-container {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .detail-header h2 {
      color: #333;
      font-size: 2rem;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .loading, .error {
      text-align: center;
      padding: 3rem;
      color: #999;
      font-size: 1.2rem;
    }

    .detail-card {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .detail-section {
      border-bottom: 1px solid #eee;
      padding-bottom: 1.5rem;
    }

    .detail-section:last-of-type {
      border-bottom: none;
    }

    .detail-section h3 {
      color: #667eea;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-item.full-width {
      grid-column: 1 / -1;
    }

    .label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      color: #333;
      font-size: 1.1rem;
    }

    .status-badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      width: fit-content;
    }

    .status-badge.active {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.inactive {
      background: #f8d7da;
      color: #721c24;
    }

    .detail-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 2rem;
      border-top: 2px solid #eee;
    }

    .btn-secondary {
      background: #667eea;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-secondary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-back {
      background: transparent;
      color: #667eea;
      padding: 0.75rem 1.5rem;
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

    .btn-danger {
      background: #dc3545;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-danger:hover {
      background: #c82333;
    }

    .btn-warning {
      background: #ffc107;
      color: #333;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s;
    }

    .btn-warning:hover {
      background: #e0a800;
    }

    @media (max-width: 768px) {
      .detail-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .header-actions {
        width: 100%;
        flex-direction: column;
      }

      .detail-grid {
        grid-template-columns: 1fr;
      }

      .detail-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ClienteDetailComponent implements OnInit {
  cliente?: Cliente;
  loading = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadCliente(+id);
    }
  }

  loadCliente(id: number) {
    this.loading = true;
    this.clienteService.getById(id).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading client:', error);
        this.loading = false;
        alert('Error al cargar el cliente');
      }
    });
  }

  editCliente() {
    if (this.cliente) {
      this.router.navigate(['/clientes/editar', this.cliente.id]);
    }
  }

  deleteCliente() {
    if (this.cliente && confirm('¿Está seguro de que desea eliminar permanentemente este cliente?')) {
      this.clienteService.delete(this.cliente.id).subscribe({
        next: () => {
          alert('Cliente eliminado exitosamente');
          this.goBack();
        },
        error: (error) => {
          console.error('Error deleting client:', error);
          alert('Error al eliminar el cliente');
        }
      });
    }
  }

  deactivateCliente() {
    if (this.cliente && confirm('¿Está seguro de que desea desactivar este cliente?')) {
      this.clienteService.deactivate(this.cliente.id).subscribe({
        next: () => {
          alert('Cliente desactivado exitosamente');
          this.loadCliente(this.cliente!.id);
        },
        error: (error) => {
          console.error('Error deactivating client:', error);
          alert('Error al desactivar el cliente');
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/clientes']);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

