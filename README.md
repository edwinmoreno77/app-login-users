# Frontend Login

Este es un proyecto de frontend para un sistema de login desarrollado con React, TypeScript y Vite.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```bash
VITE_BASE_URL=http://localhost:5004/
```

2. Para desarrollo local, puedes copiar el archivo `.env.example` y renombrarlo a `.env`:
```bash
cp .env.example .env
```

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd frontendLogin
```

2. Instala las dependencias:
```bash
pnpm install
# o
yarn install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción

Para construir el proyecto para producción:

```bash
pnpm run build
# o
yarn build
```

Los archivos de construcción se generarán en la carpeta `dist`.

## Tecnologías Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM

## Estructura del Proyecto

```
frontendLogin/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── hooks/         # Custom hooks
│   ├── context/       # Contextos de React
│   ├── types/         # Definiciones de tipos TypeScript
│   └── utils/         # Utilidades y funciones auxiliares
├── public/            # Archivos estáticos
└── ...
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica los tipos de TypeScript




