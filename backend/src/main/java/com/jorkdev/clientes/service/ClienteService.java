package com.jorkdev.clientes.service;

import com.jorkdev.clientes.dto.ClienteRequest;
import com.jorkdev.clientes.dto.ClienteResponse;
import com.jorkdev.clientes.entity.Cliente;
import com.jorkdev.clientes.exception.ResourceNotFoundException;
import com.jorkdev.clientes.exception.EmailAlreadyExistsException;
import com.jorkdev.clientes.mapper.ClienteMapper;
import com.jorkdev.clientes.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    @Transactional(readOnly = true)
    public Page<ClienteResponse> findAll(Pageable pageable) {
        log.info("Retrieving all clients with pagination: {}", pageable);
        return clienteRepository.findAll(pageable)
                .map(clienteMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<ClienteResponse> findAllActive(Pageable pageable) {
        log.info("Retrieving all active clients with pagination: {}", pageable);
        return clienteRepository.findAllActive(pageable)
                .map(clienteMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<ClienteResponse> findByFilters(String nombre, String apellido, String email, Pageable pageable) {
        log.info("Searching clients with filters - nombre: {}, apellido: {}, email: {}", nombre, apellido, email);
        return clienteRepository.findByFilters(nombre, apellido, email, pageable)
                .map(clienteMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public ClienteResponse findById(Long id) {
        log.info("Retrieving client by id: {}", id);
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
        return clienteMapper.toResponse(cliente);
    }

    public ClienteResponse create(ClienteRequest request) {
        log.info("Creating new client with email: {}", request.getEmail());
        
        if (clienteRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("El email ya está en uso: " + request.getEmail());
        }

        Cliente cliente = clienteMapper.toEntity(request);
        Cliente savedCliente = clienteRepository.save(cliente);
        log.info("Client created successfully with id: {}", savedCliente.getId());
        
        return clienteMapper.toResponse(savedCliente);
    }

    public ClienteResponse update(Long id, ClienteRequest request) {
        log.info("Updating client with id: {}", id);
        
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));

        // Check if email is being changed to an existing one
        if (!cliente.getEmail().equals(request.getEmail()) && 
            clienteRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("El email ya está en uso: " + request.getEmail());
        }

        clienteMapper.updateEntity(cliente, request);
        Cliente updatedCliente = clienteRepository.save(cliente);
        log.info("Client updated successfully with id: {}", updatedCliente.getId());
        
        return clienteMapper.toResponse(updatedCliente);
    }

    public void delete(Long id) {
        log.info("Deleting client with id: {}", id);
        
        if (!clienteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id: " + id);
        }

        clienteRepository.deleteById(id);
        log.info("Client deleted successfully with id: {}", id);
    }

    public ClienteResponse deactivate(Long id) {
        log.info("Deactivating client with id: {}", id);
        
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));

        cliente.setActivo(false);
        Cliente updatedCliente = clienteRepository.save(cliente);
        log.info("Client deactivated successfully with id: {}", updatedCliente.getId());
        
        return clienteMapper.toResponse(updatedCliente);
    }
}

