package com.jorkdev.clientes.mapper;

import com.jorkdev.clientes.dto.ClienteRequest;
import com.jorkdev.clientes.dto.ClienteResponse;
import com.jorkdev.clientes.entity.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public Cliente toEntity(ClienteRequest request) {
        return Cliente.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .fechaNacimiento(request.getFechaNacimiento())
                .direccion(request.getDireccion())
                .telefono(request.getTelefono())
                .activo(request.getActivo() != null ? request.getActivo() : true)
                .build();
    }

    public ClienteResponse toResponse(Cliente cliente) {
        return ClienteResponse.builder()
                .id(cliente.getId())
                .nombre(cliente.getNombre())
                .apellido(cliente.getApellido())
                .email(cliente.getEmail())
                .fechaNacimiento(cliente.getFechaNacimiento())
                .direccion(cliente.getDireccion())
                .telefono(cliente.getTelefono())
                .activo(cliente.getActivo())
                .fechaCreacion(cliente.getFechaCreacion())
                .fechaActualizacion(cliente.getFechaActualizacion())
                .build();
    }

    public void updateEntity(Cliente cliente, ClienteRequest request) {
        cliente.setNombre(request.getNombre());
        cliente.setApellido(request.getApellido());
        cliente.setEmail(request.getEmail());
        cliente.setFechaNacimiento(request.getFechaNacimiento());
        cliente.setDireccion(request.getDireccion());
        cliente.setTelefono(request.getTelefono());
        if (request.getActivo() != null) {
            cliente.setActivo(request.getActivo());
        }
    }
}

