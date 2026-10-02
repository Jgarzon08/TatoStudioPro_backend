# TatoStudioPro - Backend API

## Descripción General
Este proyecto corresponde al desarrollo de la API REST para TatoStudioPro, la plataforma web y portafolio profesional de fotografía. La aplicación permite gestionar servicios/paquetes fotográficos, exhibir la galería de imágenes, capturar solicitudes de clientes mediante un formulario de contacto y conectar con un agente de Inteligencia Artificial para atención automatizada. Además, incluye autenticación de usuarios y administración de contenido (CMS) con control de acceso basado en roles (RBAC).

### Funcionalidades Principales
- Gestión de Usuarios & Seguridad (Auth & RBAC): Autenticación mediante JWT, encriptación de contraseñas con bcryptjs y permisos por roles (admin y user).
- Catálogo de Servicios: CRUD completo para paquetes fotográficos y tarifas.
- Galería / Portafolio: CRUD completo para la gestión de fotografías y categorización.
- Formulario de Contacto: Recepción pública de solicitudes de clientes y gestión de estados (pendiente, leido, respondido) desde el CMS.
- Integración con IA: Base preparada para consultas del agente inteligente.

---

## Autores
* Julián Garzón - Desarrollador Backend & DBA - https://github.com/Jgarzon08

---

## Requisitos Previos
Asegúrate de contar con las siguientes herramientas e instancias antes de ejecutar el proyecto:

* Node.js (Versión v18.x o superior)
* Gestor de paquetes: pnpm (o npm / yarn)
* Base de Datos: Instancia activa de MongoDB Atlas (o MongoDB Local)
* Git para control de versiones

---

## Instrucciones de Instalación y Ejecución

Sigue estos pasos para clonar e iniciar el servidor en tu entorno local:

1. Clonar el repositorio:
git clone https://github.com/Jgarzon08/TatoStudioPro_backend.git
cd TatoStudioPro_backend

2. Instalar dependencias:
pnpm install

3. Configurar variables de entorno:
Crea un archivo .env en la raíz del proyecto basándote en el siguiente formato:

PORT=3001
URI_MONGO=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/nombre_bd
JWT_SECRET=tu_clave_secreta_super_segura

4. Ejecutar el servidor:
- Modo Desarrollo: pnpm dev
- Modo Producción: pnpm start

El servidor estará corriendo en http://localhost:3001 (o el puerto configurado en el .env).

---

## Documentación de Endpoints (API REST)

### 1. Autenticación y Usuarios (/api/users)
- POST /login | Iniciar sesión y obtener Token JWT | Público
- POST /register | Registrar un nuevo usuario/administrador | Protegido (admin)
- GET / | Consultar lista de usuarios | Protegido (admin, user)
- GET /:id | Consultar usuario por ID | Protegido (admin, user)
- PUT /:id | Actualizar información de usuario | Protegido (admin)
- DELETE /:id | Eliminar un usuario | Protegido (admin)

### 2. Servicios (/api/services)
- GET / | Consultar servicios activos | Público
- GET /:id | Consultar servicio por ID | Público
- POST / | Crear un nuevo servicio | Protegido (admin, user)
- PUT /:id | Actualizar un servicio | Protegido (admin, user)
- DELETE /:id | Eliminar un servicio | Protegido (admin)

### 3. Portafolio / Galería (/api/portfolio)
- GET / | Consultar todas las fotografías | Público
- GET /:id | Consultar fotografía por ID | Público
- POST / | Agregar nueva fotografía | Protegido (admin, user)
- PUT /:id | Actualizar fotografía | Protegido (admin, user)
- DELETE /:id | Eliminar una fotografía | Protegido (admin)

### 4. Formulario de Contacto (/api/contact)
- POST / | Enviar mensaje desde la web pública | Público
- GET / | Consultar mensajes recibidos | Protegido (admin, user)
- GET /:id | Consultar mensaje por ID | Protegido (admin, user)
- PUT /:id | Cambiar estado del mensaje (pendiente, leido, respondido) | Protegido (admin, user)
- DELETE /:id | Eliminar mensaje del sistema | Protegido (admin)

---

## Estado del Proyecto
En desarrollo - Fase 2: Implementación de Controladores CRUD completada, Middlewares de Autenticación JWT y Control de Acceso por Roles (RBAC) integrados exitosamente.

---

## Información de Contacto
* Desarrollador: Julián Garzón
* GitHub: https://github.com/Jgarzon08