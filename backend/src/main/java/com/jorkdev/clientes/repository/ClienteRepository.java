package com.jorkdev.clientes.repository;

import com.jorkdev.clientes.entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT c FROM Cliente c WHERE c.activo = true")
    Page<Cliente> findAllActive(Pageable pageable);

    @Query("SELECT c FROM Cliente c WHERE " +
           "(:nombre IS NULL OR LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%'))) AND " +
           "(:apellido IS NULL OR LOWER(c.apellido) LIKE LOWER(CONCAT('%', :apellido, '%'))) AND " +
           "(:email IS NULL OR LOWER(c.email) LIKE LOWER(CONCAT('%', :email, '%')))")
    Page<Cliente> findByFilters(@Param("nombre") String nombre,
                                @Param("apellido") String apellido,
                                @Param("email") String email,
                                Pageable pageable);
}

