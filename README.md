# Frontend de Gestión de Adquisiciones ADRES

Sistema de gestión de adquisiciones desarrollado con Angular, proporcionando una interfaz de usuario intuitiva para el control y seguimiento de adquisiciones de bienes y servicios.

![Logo de ADRES](https://github.com/jhongo20/adquisiciones-app/blob/main/src/assets/images/logo-adres.png)

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.6.

## Tecnologías utilizadas

- Angular 19.2
- Angular Material
- RxJS
- TypeScript
- SCSS para estilos

## Características principales

- **Dashboard**: Visualización de métricas y datos clave sobre adquisiciones
- **Gestión de adquisiciones**: Listado, creación, edición y visualización de detalles
- **Filtros avanzados**: Múltiples opciones de búsqueda y filtrado
- **Historial de cambios**: Seguimiento detallado de modificaciones en cada adquisición
- **Interfaz responsiva**: Adaptable a diferentes dispositivos y tamaños de pantalla

## Requisitos previos

- Node.js (versión 18 o superior)
- npm (versión 9 o superior)
- Angular CLI (versión 19 o superior)
- Backend API ejecutándose (por defecto en http://localhost:5138)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jhongo20/frontend-Adquisiciones.git
   cd frontend-Adquisiciones
   # Sistema de Gestión de Adquisiciones

## 🧩 Instalar dependencias

```bash
npm install
```

## 🔧 Configurar la URL de la API
La aplicación está configurada para conectarse a la API en http://localhost:5138.
Si tu API se ejecuta en otra dirección, modifica el archivo src/environments/environment.ts:

typescript
Copiar
Editar
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5138'
};
🚀 Servidor de desarrollo
Para iniciar un servidor de desarrollo local, ejecuta:

bash
Copiar
Editar
ng serve
Una vez que el servidor esté funcionando, abre tu navegador y navega a:
http://localhost:4200

La aplicación se recargará automáticamente cuando modifiques cualquiera de los archivos fuente.

## ⚙️ Generación de código
Angular CLI incluye potentes herramientas de generación de código.
Para generar un nuevo componente, ejecuta:

```bash
Copiar
Editar
ng generate component component-name
```
Para una lista completa de esquemas disponibles (como componentes, directivas o pipes), ejecuta:

```bash
Copiar
Editar
ng generate --help
```
## 🏗️ Compilación
Para compilar el proyecto ejecuta:

```bash
Copiar
Editar
ng build
```
Esto compilará tu proyecto y almacenará los artefactos de compilación en el directorio dist/.
Por defecto, la compilación de producción optimiza tu aplicación para rendimiento y velocidad.

## ✅ Ejecución de pruebas unitarias
Para ejecutar pruebas unitarias con el ejecutor de pruebas Karma, usa el siguiente comando:

```bash
Copiar
Editar
ng test
```
##🧪 Ejecución de pruebas end-to-end
Para pruebas end-to-end (e2e), ejecuta:

```bash
Copiar
Editar
ng e2e
```
Angular CLI no viene con un framework de pruebas end-to-end por defecto. Puedes elegir uno que se adapte a tus necesidades.

## 🧱 Estructura del proyecto
src/
├── app/
│   ├── core/                 # Servicios y modelos centrales
│   │   ├── models/           # Interfaces y clases de datos
│   │   └── services/         # Servicios para comunicación con API
│   ├── features/             # Módulos funcionales
│   │   └── adquisiciones/    # Funcionalidades de adquisiciones
│   │       └── components/   # Componentes específicos
│   ├── shared/               # Componentes y utilidades compartidas
│   │   └── components/       # Componentes reutilizables (navbar, footer)
│   ├── app.component.ts      # Componente raíz
│   └── app.routes.ts         # Configuración de rutas
├── assets/                   # Imágenes, iconos y otros recursos
├── environments/             # Configuraciones por entorno
└── styles.scss               # Estilos globales
##🧮 Componentes principales
##📊 Dashboard de Adquisiciones
Visualización de estadísticas clave y datos resumidos:

Total de adquisiciones

Valor total y promedio

Distribución por tipo de bien/servicio

Distribución por unidad administrativa

Últimas adquisiciones realizadas

##📋 Lista de Adquisiciones
Listado completo con opciones avanzadas:

Filtrado por múltiples criterios

Ordenamiento por columnas

Búsqueda de texto

Acciones rápidas (ver, editar, desactivar)

## 📝 Formulario de Adquisiciones
Interfaz para creación y edición de adquisiciones:

Validaciones en tiempo real

Cálculo automático de valores totales

Selección de proveedores y unidades

## 🔎 Detalle de Adquisiciones
Visualización completa de información:

Datos generales

Historial cronológico de cambios

Visualización de estados

## ⚡ Guía de uso rápido
Página inicial: Al abrir la aplicación, verás el dashboard con métricas clave.

Listar adquisiciones: Accede desde el menú "Adquisiciones" para ver todas las existentes.

Filtrar adquisiciones: Usa el panel de filtros para encontrar registros específicos.

Crear nueva adquisición: Desde el botón "Nueva Adquisición" en la barra de navegación.

Ver detalles: Haz clic en el icono de "ojo" en la fila de una adquisición para ver todos sus detalles e historial.

Editar: Usa el icono de "lápiz" en la lista para modificar una adquisición existente.

Desactivar: El icono de "papelera" permite desactivar una adquisición sin eliminarla de la base de datos.

## 📚 Recursos adicionales
Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita:
Angular CLI Overview and Command Reference

## 🔗 Integración con el backend
Esta aplicación frontend está diseñada para funcionar con el backend de gestión de adquisiciones, que proporciona la API RESTful necesaria para todas las operaciones.

## 👥 Colaboradores
Desarrollador: Jhon Jairo Perez

GitHub: @jhongo20
