import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteRequest, PageResponse } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 10, sortBy = 'id', direction = 'ASC'): Observable<PageResponse<Cliente>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
    
    return this.http.get<PageResponse<Cliente>>(`${this.apiUrl}`, { params });
  }

  getActivos(page = 0, size = 10, sortBy = 'id', direction = 'ASC'): Observable<PageResponse<Cliente>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
    
    return this.http.get<PageResponse<Cliente>>(`${this.apiUrl}/activos`, { params });
  }

  search(nombre: string | null, apellido: string | null, email: string | null, 
         page = 0, size = 10, sortBy = 'id', direction = 'ASC'): Observable<PageResponse<Cliente>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);
    
    if (nombre) params = params.set('nombre', nombre);
    if (apellido) params = params.set('apellido', apellido);
    if (email) params = params.set('email', email);
    
    return this.http.get<PageResponse<Cliente>>(`${this.apiUrl}/buscar`, { params });
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  create(cliente: ClienteRequest): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  update(id: number, cliente: ClienteRequest): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deactivate(id: number): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.apiUrl}/${id}/desactivar`, {});
  }
}

