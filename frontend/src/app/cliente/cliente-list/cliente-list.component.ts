import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente, PageResponse } from '../models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cliente-list-container">
      <div class="list-header">
        <h2>Lista de Clientes</h2>
        <button class="btn-primary" (click)="navigateToCreate()">
          <span class="icon">+</span> Nuevo Cliente
        </button>
      </div>

      <div class="filter-section">
        <div class="filter-group">
          <input type="text" [(ngModel)]="filterNombre" placeholder="Buscar por nombre..." 
                 class="filter-input" (input)="onFilterChange()">
          <input type="text" [(ngModel)]="filterApellido" placeholder="Buscar por apellido..." 
                 class="filter-input" (input)="onFilterChange()">
          <input type="text" [(ngModel)]="filterEmail" placeholder="Buscar por email..." 
                 class="filter-input" (input)="onFilterChange()">
        </div>
        <div class="filter-actions">
          <button class="btn-secondary" (click)="clearFilters()">Limpiar</button>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            @if (loading) {
              <tr>
                <td colspan="7" class="text-center">Cargando...</td>
              </tr>
            } @else if (clientes.length === 0) {
              <tr>
                <td colspan="7" class="text-center">No se encontraron clientes</td>
              </tr>
            } @else {
              @for (cliente of clientes; track cliente.id) {
                <tr>
                  <td>{{ cliente.id }}</td>
                  <td>{{ cliente.nombre }}</td>
                  <td>{{ cliente.apellido }}</td>
                  <td>{{ cliente.email }}</td>
                  <td>{{ cliente.telefono }}</td>
                  <td>
                    <span [class]="'status-badge ' + (cliente.activo ? 'active' : 'inactive')">
                      {{ cliente.activo ? 'Activo' : 'Inactivo' }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn-icon view" (click)="viewCliente(cliente.id)" title="Ver">
                        👁️
                      </button>
                      <button class="btn-icon edit" (click)="editCliente(cliente.id)" title="Editar">
                        ✏️
                      </button>
                      <button class="btn-icon delete" (click)="deleteCliente(cliente.id)" title="Eliminar">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <div class="pagination" *ngIf="pageResponse && pageResponse.totalPages > 1">
        <button class="btn-page" [disabled]="currentPage === 0" (click)="previousPage()">
          Anterior
        </button>
        <span class="page-info">
          Página {{ currentPage + 1 }} de {{ pageResponse.totalPages }}
        </span>
        <button class="btn-page" [disabled]="currentPage >= pageResponse.totalPages - 1" 
                (click)="nextPage()">
          Siguiente
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cliente-list-container {
      background: white;
      border-radius: 10px;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .list-header h2 {
      color: #333;
      font-size: 2rem;
    }

    .filter-section {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .filter-group {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .filter-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
    }

    .filter-actions {
      display: flex;
      justify-content: flex-end;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;
    }

    .data-table th {
      background: #667eea;
      color: white;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
    }

    .data-table td {
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .data-table tbody tr:hover {
      background: #f8f9fa;
    }

    .text-center {
      text-align: center;
      padding: 2rem !important;
      color: #999;
    }

    .status-badge {
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .status-badge.active {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.inactive {
      background: #f8d7da;
      color: #721c24;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.25rem;
      transition: transform 0.2s;
    }

    .btn-icon:hover {
      transform: scale(1.2);
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-page {
      padding: 0.5rem 1rem;
      border: 1px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-page:hover:not(:disabled) {
      background: #667eea;
      color: white;
    }

    .btn-page:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      font-weight: 600;
      color: #666;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    @media (max-width: 768px) {
      .list-header {
        flex-direction: column;
        gap: 1rem;
      }

      .filter-group {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  pageResponse?: PageResponse<Cliente>;
  loading = false;
  currentPage = 0;
  pageSize = 10;

  filterNombre: string = '';
  filterApellido: string = '';
  filterEmail: string = '';

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.loading = true;
    
    const hasFilters = this.filterNombre || this.filterApellido || this.filterEmail;
    
    const request = hasFilters
      ? this.clienteService.search(this.filterNombre, this.filterApellido, this.filterEmail, 
                                   this.currentPage, this.pageSize)
      : this.clienteService.getAll(this.currentPage, this.pageSize);

    request.subscribe({
      next: (response) => {
        this.clientes = response.content;
        this.pageResponse = response;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading clients:', error);
        this.loading = false;
        alert('Error al cargar los clientes');
      }
    });
  }

  onFilterChange() {
    this.currentPage = 0;
    this.loadClientes();
  }

  clearFilters() {
    this.filterNombre = '';
    this.filterApellido = '';
    this.filterEmail = '';
    this.currentPage = 0;
    this.loadClientes();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadClientes();
    }
  }

  nextPage() {
    if (this.pageResponse && this.currentPage < this.pageResponse.totalPages - 1) {
      this.currentPage++;
      this.loadClientes();
    }
  }

  navigateToCreate() {
    this.router.navigate(['/clientes/nuevo']);
  }

  viewCliente(id: number) {
    this.router.navigate(['/clientes', id]);
  }

  editCliente(id: number) {
    this.router.navigate(['/clientes/editar', id]);
  }

  deleteCliente(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          alert('Cliente eliminado exitosamente');
          this.loadClientes();
        },
        error: (error) => {
          console.error('Error deleting client:', error);
          alert('Error al eliminar el cliente');
        }
      });
    }
  }
}

