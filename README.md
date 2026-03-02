# 🏛️ Chronos Archive: Gestión Digital de Patrimonio Histórico

**¿Puede la tecnología simplificar el acceso a la historia?** Chronos Archive es una solución Full-Stack desarrollada para digitalizar la administración de archivos históricos. El proyecto nace de la necesidad de crear herramientas intuitivas para investigadores y archiveros, permitiendo una gestión segura y estructurada de figuras históricas y usuarios del sistema.

## 🛠️ Arquitectura Técnica

El proyecto se divide en dos grandes bloques interconectados:

### Frontend (React)
- **Interfaz de Usuario:** Diseño "Oxford Style" enfocado en la legibilidad y la sobriedad académica.
- **Estado y Autenticación:** Implementación de Hooks personalizados (`useToken`) para gestionar sesiones mediante JWT.
- **Navegación:** Sistema de rutas protegidas según el rol del usuario (Admin/Investigador).

### Backend (Node.js & Express)
- **Seguridad:** Cifrado de credenciales con **Bcrypt** y validación de esquemas con **Express-Validator**.
- **Gestión de Datos:** Arquitectura basada en repositorios para desacoplar la lógica de negocio de la persistencia de datos (Usuarios, Investigadores y Registros Históricos).
- **API REST:** Endpoints estructurados para operaciones CRUD completas.

## 🚀 Funcionalidades Destacadas

- ✅ **Control de Acceso:** Diferenciación jerárquica entre Directores de Archivo e Investigadores.
- ✅ **Gestión de Registros:** Alta, consulta y baja de figuras históricas en tiempo real.
- ✅ **Seguridad Activa:** Limpieza automática de tokens y protección de rutas privadas.
- ✅ **UX Profesional:** Sidebar interactivo con estados activos y tablas dinámicas.

---
*Este proyecto transforma la complejidad de los archivos físicos en una solución tecnológica tangible y eficiente.*
