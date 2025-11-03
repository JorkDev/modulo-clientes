# Módulo de Clientes

Sistema completo de gestión de clientes desarrollado con arquitectura moderna, escalable y segura. El proyecto incluye un backend construido con Spring Boot 3 y un frontend desarrollado con Angular 18.

## Arquitectura

### Backend (Spring Boot 3.2.0)
- **Framework**: Spring Boot 3.2.0
- **Base de Datos**: PostgreSQL 16 (Docker)
- **ORM**: Spring Data JPA / Hibernate
- **Seguridad**: Spring Security
- **API Documentation**: Swagger/OpenAPI 3
- **Métricas**: Actuator con Prometheus
- **Validación**: Jakarta Validation

### Frontend (Angular 18)
- **Framework**: Angular 18
- **Arquitectura**: Standalone Components
- **Styling**: CSS moderno con diseño responsivo
- **State Management**: Servicios Angular con RxJS
- **HTTP Client**: Angular HttpClient

### Infraestructura
- **Containerización**: Docker & Docker Compose
- **Base de Datos**: PostgreSQL 16 Alpine
- **Web Server**: Nginx (Frontend)

## Características

### Funcionalidades Principales
- CRUD completo de clientes
- Búsqueda y filtrado avanzado
- Paginación de resultados
- Soft delete (desactivación de clientes)
- Validación de datos robusta
- Manejo de errores centralizado
- API RESTful documentada
- Interfaz de usuario moderna y responsiva

### Seguridad
- Validación de datos backend y frontend
- CORS configurado apropiadamente
- Headers de seguridad HTTP
- Manejo seguro de contraseñas de base de datos
- Health checks para servicios

### Escalabilidad
- Conexión pooling con HikariCP
- Paginación eficiente
- Consultas optimizadas
- Arquitectura modular y separación de responsabilidades
- Contenedores independientes y escalables

## Instalación y Ejecución con Docker

### 1. Clonar el Repositorio
```bash
git clone modulo-clientes
cd modulo-clientes
```

### 2. Construir e Iniciar los Contenedores
```bash
docker-compose up -d --build
```

Este comando:
- Construye las imágenes de backend y frontend
- Inicia PostgreSQL con la base de datos configurada
- Configura la red interna entre servicios
- Crea los volúmenes necesarios

### 3. Verificar que los Servicios Están Corriendo
```bash
docker-compose ps
```

### 4. Acceder a la Aplicación
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **API Documentation (Swagger)**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/actuator/health
- **Base de Datos**: localhost:5432

### 5. Detener los Servicios
```bash
docker-compose down
```

Para eliminar también los volúmenes (incluyendo datos de BD):
```bash
docker-compose down -v
```

## Desarrollo Local

### Backend

#### Requisitos
- Java 17+
- Maven 3.9+

#### Configuración
1. Crear base de datos PostgreSQL local:
```bash
# Ejecutar PostgreSQL con Docker
docker run -d --name local-postgres \
  -e POSTGRES_DB=clientesdb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

2. Clonar y compilar:
```bash
cd backend
mvn clean install
```

3. Ejecutar la aplicación:
```bash
mvn spring-boot:run
```

O configurar en tu IDE y ejecutar `ModuloClientesApplication`

### Frontend

#### Requisitos
- Node.js 18+

#### Configuración
1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm start
```

La aplicación estará disponible en http://localhost:4200

## API Endpoints

### Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes` | Listar todos los clientes (paginado) |
| GET | `/api/clientes/activos` | Listar clientes activos |
| GET | `/api/clientes/buscar` | Buscar clientes por filtros |
| GET | `/api/clientes/{id}` | Obtener cliente por ID |
| POST | `/api/clientes` | Crear nuevo cliente |
| PUT | `/api/clientes/{id}` | Actualizar cliente |
| DELETE | `/api/clientes/{id}` | Eliminar cliente |
| PATCH | `/api/clientes/{id}/desactivar` | Desactivar cliente |

### Parámetros de Paginación
- `page`: Número de página (default: 0)
- `size`: Tamaño de página (default: 10)
- `sortBy`: Campo para ordenar (default: id)
- `direction`: Dirección ASC/DESC (default: ASC)

### Filtros de Búsqueda
- `nombre`: Buscar por nombre
- `apellido`: Buscar por apellido
- `email`: Buscar por email

**Nota**: Todos los filtros son opcionales y se combinan con AND

## Modelo de Datos

### Cliente
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "fechaNacimiento": "1990-01-15",
  "direccion": "Calle Principal 123",
  "telefono": "+34 600 123 456",
  "activo": true,
  "fechaCreacion": "2024-01-01T10:00:00",
  "fechaActualizacion": "2024-01-01T10:00:00"
}
```

## Seguridad

### Configuraciones Aplicadas
- Validación de datos en todas las capas
- Manejo centralizado de excepciones
- CORS configurado para entornos específicos
- Headers de seguridad HTTP
- Health checks para monitoreo
- Logging estructurado

### Variables de Entorno

El proyecto usa variables de entorno para configuración sensible:

**Backend**:
```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=clientesdb
DB_USER=postgres
DB_PASSWORD=postgres
SERVER_PORT=8080
```

## Monitoreo

### Health Checks
- Backend: http://localhost:8080/actuator/health
- Base de Datos: Verificado automáticamente por Docker

### Métricas
- Prometheus: http://localhost:8080/actuator/prometheus
- Actuator Info: http://localhost:8080/actuator/info

## Testing

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend
npm test
```

## Troubleshooting

### Base de datos no conecta
```bash
# Verificar que PostgreSQL está corriendo
docker-compose ps postgres

# Ver logs
docker-compose logs postgres

# Reiniciar servicio
docker-compose restart postgres
```

### Backend no inicia
```bash
# Ver logs
docker-compose logs backend

# Reconstruir imagen
docker-compose up -d --build backend
```

### Frontend no carga
```bash
# Ver logs
docker-compose logs frontend

# Verificar que backend está disponible
curl http://localhost:8080/actuator/health
```

## Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia Apache 2.0. Ver el archivo `LICENSE` para más detalles.
