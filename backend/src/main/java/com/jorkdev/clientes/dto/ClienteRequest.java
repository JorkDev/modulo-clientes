package com.jorkdev.clientes.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteRequest {

    @NotBlank(message = "Nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Apellido es obligatorio")
    private String apellido;

    @NotBlank(message = "Email es obligatorio")
    @Email(message = "Email debe ser válido")
    private String email;

    @Past(message = "Fecha de nacimiento debe ser en el pasado")
    @NotNull(message = "Fecha de nacimiento es obligatoria")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "Dirección es obligatoria")
    private String direccion;

    @NotBlank(message = "Teléfono es obligatorio")
    private String telefono;

    private Boolean activo;
}

