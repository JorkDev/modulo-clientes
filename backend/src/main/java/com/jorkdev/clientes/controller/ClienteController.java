package com.jorkdev.clientes.controller;

import com.jorkdev.clientes.dto.ClienteRequest;
import com.jorkdev.clientes.dto.ClienteResponse;
import com.jorkdev.clientes.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "API para gestión de clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @GetMapping
    @Operation(summary = "Obtener todos los clientes", description = "Retorna una lista paginada de todos los clientes")
    public ResponseEntity<Page<ClienteResponse>> getAllClientes(
            @Parameter(description = "Número de página (0-indexed)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Tamaño de la página", example = "10")
            @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Campo para ordenar", example = "id")
            @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Dirección del orden", example = "ASC")
            @RequestParam(defaultValue = "ASC") Sort.Direction direction) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return ResponseEntity.ok(clienteService.findAll(pageable));
    }

    @GetMapping("/activos")
    @Operation(summary = "Obtener clientes activos", description = "Retorna una lista paginada de clientes activos")
    public ResponseEntity<Page<ClienteResponse>> getActiveClientes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return ResponseEntity.ok(clienteService.findAllActive(pageable));
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar clientes por filtros", description = "Busca clientes según filtros opcionales")
    public ResponseEntity<Page<ClienteResponse>> searchClientes(
            @Parameter(description = "Nombre del cliente")
            @RequestParam(required = false) String nombre,
            @Parameter(description = "Apellido del cliente")
            @RequestParam(required = false) String apellido,
            @Parameter(description = "Email del cliente")
            @RequestParam(required = false) String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") Sort.Direction direction) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        return ResponseEntity.ok(clienteService.findByFilters(nombre, apellido, email, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por ID", description = "Retorna un cliente específico por su ID")
    public ResponseEntity<ClienteResponse> getClienteById(
            @Parameter(description = "ID del cliente")
            @PathVariable Long id) {
        return ResponseEntity.ok(clienteService.findById(id));
    }

    @PostMapping
    @Operation(summary = "Crear nuevo cliente", description = "Crea un nuevo cliente")
    public ResponseEntity<ClienteResponse> createCliente(@Valid @RequestBody ClienteRequest request) {
        ClienteResponse response = clienteService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar cliente", description = "Actualiza un cliente existente")
    public ResponseEntity<ClienteResponse> updateCliente(
            @Parameter(description = "ID del cliente")
            @PathVariable Long id,
            @Valid @RequestBody ClienteRequest request) {
        return ResponseEntity.ok(clienteService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar cliente", description = "Elimina un cliente por su ID")
    public ResponseEntity<Void> deleteCliente(
            @Parameter(description = "ID del cliente")
            @PathVariable Long id) {
        clienteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/desactivar")
    @Operation(summary = "Desactivar cliente", description = "Desactiva un cliente (soft delete)")
    public ResponseEntity<ClienteResponse> deactivateCliente(
            @Parameter(description = "ID del cliente")
            @PathVariable Long id) {
        return ResponseEntity.ok(clienteService.deactivate(id));
    }
}

