# Arquitectura del Sistema

## Visión General

El Módulo de Clientes es una aplicación web de tres capas con arquitectura de microservicios empaquetada en contenedores Docker. El sistema está diseñado para ser escalable, mantenible y seguro.

## Arquitectura de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        NGINX (Frontend)                     │
│                  http://localhost:4200                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP/HTTPS
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Angular 18 Frontend                      │
│                  ┌──────────────────┐                       │
│                  │   Components     │                       │
│                  │   - Cliente List │                       │
│                  │   - Cliente Form │                       │
│                  │   - Cliente Detail                       │
│                  └────────┬─────────┘                       │
│                           │                                 │
│                  ┌────────▼─────────┐                       │
│                  │   Cliente Service │                      │
│                  └────────┬──────────┘                       │
└───────────────────────────┼─────────────────────────────────┘
                            │
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Spring Boot Backend                        │
│                  http://localhost:8080                      │
│  ┌────────────────────────────────────────────────────┐   │
│  │              Presentation Layer                    │   │
│  │  ┌────────────────────────────────────────────┐   │   │
│  │  │      ClienteController (REST Endpoints)    │   │   │
│  │  └──────────────────┬─────────────────────────┘   │   │
│  └─────────────────────┼─────────────────────────────┘   │
│                        │                                   │
│  ┌─────────────────────▼─────────────────────────────┐   │
│  │               Business Layer                      │   │
│  │  ┌────────────────────────────────────────────┐   │   │
│  │  │        ClienteService (Business Logic)     │   │   │
│  │  │        ClienteMapper (DTO Mapping)         │   │   │
│  │  └──────────────────┬─────────────────────────┘   │   │
│  └─────────────────────┼─────────────────────────────┘   │
│                        │                                   │
│  ┌─────────────────────▼─────────────────────────────┐   │
│  │               Data Access Layer                   │   │
│  │  ┌────────────────────────────────────────────┐   │   │
│  │  │    ClienteRepository (JPA Repository)      │   │   │
│  │  └──────────────────┬─────────────────────────┘   │   │
│  └─────────────────────┼─────────────────────────────┘   │
└────────────────────────┼─────────────────────────────────┘
                         │
                         │ JDBC/Hibernate
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                        │
│                  localhost:5432                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │               clientesdb                           │   │
│  │  ┌────────────────────────────────────────────┐   │   │
│  │  │         clientes table                     │   │   │
│  │  │  - id (PK)                                │   │   │
│  │  │  - nombre                                 │   │   │
│  │  │  - apellido                               │   │   │
│  │  │  - email (unique)                         │   │   │
│  │  │  - fecha_nacimiento                       │   │   │
│  │  │  - direccion                              │   │   │
│  │  │  - telefono                               │   │   │
│  │  │  - activo                                 │   │   │
│  │  │  - fecha_creacion                         │   │   │
│  │  │  - fecha_actualizacion                    │   │   │
│  │  └───────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Capas de la Aplicación

### 1. Capa de Presentación (Frontend)

**Tecnologías**: Angular 18, TypeScript, CSS3, RxJS

**Componentes**:
- `AppComponent`: Componente raíz de la aplicación
- `ClienteListComponent`: Lista de clientes con paginación y filtros
- `ClienteFormComponent`: Formulario para crear/editar clientes
- `ClienteDetailComponent`: Vista detallada de un cliente

**Características**:
- Standalone Components (sin NgModules)
- Reactive Forms con validación
- Manejo de estado con RxJS Observables
- Diseño responsivo con CSS Grid y Flexbox
- Component-based architecture

### 2. Capa de Aplicación (Backend API)

**Tecnologías**: Spring Boot 3.2, Spring MVC, Spring Data JPA, Spring Security

**Componentes**:

#### Controller Layer
- `ClienteController`: Expone endpoints REST para operaciones CRUD

#### Service Layer
- `ClienteService`: Contiene la lógica de negocio
- `ClienteMapper`: Convierte entre Entidades y DTOs

#### Repository Layer
- `ClienteRepository`: Acceso a datos usando Spring Data JPA

#### DTOs
- `ClienteRequest`: DTO para crear/actualizar clientes
- `ClienteResponse`: DTO para responder clientes

**Características**:
- RESTful API design
- Paginación y ordenamiento
- Búsqueda y filtrado avanzado
- Validación de datos
- Manejo centralizado de excepciones

### 3. Capa de Datos

**Tecnologías**: PostgreSQL 16, Hibernate ORM, HikariCP

**Entidades**:
- `Cliente`: Entidad principal que representa un cliente

**Características**:
- Hibernate como ORM
- Connection pooling con HikariCP
- Transacciones automáticas
- Auditing fields (fecha_creacion, fecha_actualizacion)
- Soft delete con campo `activo`

## Flujo de Datos

### Crear Cliente

```
Usuario → ClienteFormComponent
    ↓
    → Completa formulario
    ↓
    → ClienteService.create(ClienteRequest)
    ↓
    → HTTP POST /api/clientes
    ↓
ClienteController.createCliente()
    ↓
    → Validación (@Valid)
    ↓
ClienteService.create()
    ↓
    → Verificar email único
    ↓
ClienteMapper.toEntity()
    ↓
ClienteRepository.save()
    ↓
    → INSERT INTO clientes
    ↓
PostgreSQL
    ↓
    → ClienteResponse
    ↓
    → HTTP 201 Created
    ↓
Frontend muestra mensaje de éxito
```

### Listar Clientes con Filtros

```
Usuario → ClienteListComponent
    ↓
    → Aplica filtros (nombre, apellido, email)
    ↓
    → ClienteService.search()
    ↓
    → HTTP GET /api/clientes/buscar?nombre=Juan&page=0&size=10
    ↓
ClienteController.searchClientes()
    ↓
ClienteService.findByFilters()
    ↓
ClienteRepository.findByFilters() (JPQL Query)
    ↓
    → SELECT * FROM clientes WHERE nombre LIKE '%Juan%'
    ↓
PostgreSQL
    ↓
    → Page<Cliente>
    ↓
    → Page<ClienteResponse>
    ↓
    → HTTP 200 OK
    ↓
Frontend muestra tabla paginada
```

## Configuración de Seguridad

### CORS (Cross-Origin Resource Sharing)
- Configurado en `CorsConfig`
- Permite requests desde `http://localhost:4200`
- Headers permitidos: Origin, Content-Type, Accept, Authorization
- Métodos permitidos: GET, POST, PUT, PATCH, DELETE, OPTIONS

### Spring Security
- Configurado en `SecurityConfig`
- CSRF deshabilitado para API REST
- Endpoints públicos: `/api/**`, `/actuator/**`, `/swagger-ui/**`
- Sesiones stateless

### Validación
- **Backend**: Jakarta Validation (`@Valid`, `@NotBlank`, `@Email`, etc.)
- **Frontend**: Angular Reactive Forms validators

## Manejo de Errores

### Backend
```java
GlobalExceptionHandler
    ↓
    │
    ├─ ResourceNotFoundException → 404 Not Found
    ├─ EmailAlreadyExistsException → 409 Conflict
    ├─ MethodArgumentNotValidException → 400 Bad Request
    └─ Exception → 500 Internal Server Error
```

### Frontend
- Try-catch en servicios
- Mensajes de error amigables
- Loading states
- Manejo de estados vacíos

## Escalabilidad

### Backend
- **Connection Pooling**: HikariCP con configuración optimizada
- **Paginación**: Reducir carga de memoria
- **Caching**: Preparado para implementar cache (Redis)
- **Stateless**: Fácil de escalar horizontalmente

### Base de Datos
- **Índices**: Prepared para agregar índices según uso
- **Query Optimization**: JPQL queries optimizadas
- **Connection Pooling**: Múltiples conexiones reutilizables

### Frontend
- **Lazy Loading**: Módulos cargados bajo demanda
- **OnPush Change Detection**: Optimización de rendimiento
- **Lazy loading de componentes**: Mejor tiempo inicial

## Monitoreo y Observabilidad

### Actuator Endpoints
- `/actuator/health`: Estado de salud
- `/actuator/info`: Información de la aplicación
- `/actuator/prometheus`: Métricas para Prometheus

### Logging
- **Backend**: Logback con niveles configurables
- **Frontend**: Console logging con niveles
- **Docker**: Logs centralizados con docker-compose logs

## Dockerización

### Multi-Stage Builds
- **Backend**: Maven build → JRE runtime
- **Frontend**: Node build → Nginx serve

### Networking
- Bridge network: `cliente-network`
- Servicios aislados
- DNS interno entre contenedores

### Volúmenes
- `postgres_data`: Persistencia de datos
- Configuraciones montadas

### Health Checks
- PostgreSQL: `pg_isready`
- Backend: Actuator health endpoint
- Dependencias configuradas

## Despliegue

### Desarrollo
```bash
docker-compose up
# Frontend: localhost:4200
# Backend: localhost:8080
```

### Producción (Recomendaciones)
1. Variables de entorno para secrets
2. HTTPS con SSL certificates
3. Load balancer (Nginx/Traefik)
4. Database backup automático
5. Monitoring (Prometheus + Grafana)
6. Logging agregado (ELK Stack)
7. CI/CD pipeline (GitHub Actions/Jenkins)

## Mejoras Futuras

### Corto Plazo
- [ ] Tests unitarios y de integración
- [ ] Rate limiting
- [ ] API versioning
- [ ] Internacionalización (i18n)
- [ ] Dark mode

### Mediano Plazo
- [ ] Autenticación JWT
- [ ] Roles y permisos
- [ ] Audit logging
- [ ] Caching con Redis
- [ ] File uploads
- [ ] Exportación a Excel/PDF

### Largo Plazo
- [ ] Microservicios adicionales
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] GraphQL API
- [ ] Real-time updates (WebSockets)
- [ ] Mobile app
- [ ] Analytics dashboard

## Principios de Diseño Aplicados

1. **SOLID**: Single Responsibility, Open/Closed, etc.
2. **DRY**: Don't Repeat Yourself
3. **Separation of Concerns**: Capas bien definidas
4. **Dependency Injection**: Spring IoC
5. **RESTful**: API REST estándar
6. **Clean Code**: Código legible y mantenible
7. **Security First**: Validación y sanitización
8. **Fail Fast**: Validación temprana
9. **Stateless**: API sin estado
10. **Idempotency**: Operaciones repetibles

