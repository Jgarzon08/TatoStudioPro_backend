# TatoStudioPro - Backend API

## Descripción General
Este proyecto corresponde al desarrollo de la API REST para TatoStudioPro, la plataforma web y portafolio profesional de fotografía. La aplicación permite gestionar servicios/paquetes fotográficos, exhibir la galería de imágenes, capturar solicitudes de clientes mediante un formulario de contacto y conectar con un agente de Inteligencia Artificial para atención automatizada. Además, incluye autenticación de usuarios para la administración del contenido (CMS).

### Funcionalidades Principales
- Gestión de Usuarios (Auth): Autenticación de administradores para el panel de control.
- Catálogo de Servicios: Administración de paquetes fotográficos y tarifas.
- Galería / Portafolio: Gestión de fotografías y categorización.
- Formulario de Contacto: Recepción y almacenamiento de solicitudes de cotización de clientes.
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
pnpm install mongoose nodemon express dotenv

3. Configurar variables de entorno:
Crea un archivo .env en la raíz del proyecto basándote en el siguiente formato:
PORT=3001
URI_MONGO=mongodb+srv://<usuario>:<password>@tatostudiopro.vuwhrnt.mongodb.net/?appName=TatoStudioPro

4. Ejecutar el servidor:
- Modo Desarrollo: pnpm dev
- Modo Producción: pnpm start

El servidor estará corriendo en http://localhost:3001 (o el puerto configurado en el .env).

---

## Estado del Proyecto
En desarrollo - Fase inicial: Estructuración de arquitectura, modelos de datos con Mongoose y conexión a MongoDB completada.

---

## Información de Contacto
* Desarrollador: Julián Garzón
* GitHub: https://github.com/Jgarzon08