package com.jorkdev.clientes.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "Apellido es obligatorio")
    @Column(nullable = false)
    private String apellido;

    @NotBlank(message = "Email es obligatorio")
    @Email(message = "Email debe ser válido")
    @Column(nullable = false, unique = true)
    private String email;

    @Past(message = "Fecha de nacimiento debe ser en el pasado")
    @NotNull(message = "Fecha de nacimiento es obligatoria")
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @NotBlank(message = "Dirección es obligatoria")
    @Column(nullable = false)
    private String direccion;

    @NotBlank(message = "Teléfono es obligatorio")
    @Column(nullable = false)
    private String telefono;

    @Column(name = "activo")
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}

