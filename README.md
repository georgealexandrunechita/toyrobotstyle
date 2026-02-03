# Toy Robot Game

Un juego interactivo desarrollado con React y Tailwind CSS donde controlas un robot en un tablero 5x5.

## Características

- **Tablero 5x5 interactivo** - Visualización moderna del tablero de juego
- **Control de Robot** - Coloca, mueve y gira el robot
- **Sistema de Paredes** - Coloca obstáculos en el tablero
- **Reportes** - Obtén la posición y dirección actual del robot
- **Interfaz Oscura Moderna** - Diseño con gradientes púrpura/rosa

## Tecnologías

- **React 19** - Framework de UI
- **Tailwind CSS v4** - Estilos y diseño responsive
- **Vite** - Build tool y dev server
- **React Router** - Navegación entre vistas

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5174](http://localhost:5174) en tu navegador.

## Comandos del Juego

- **PLACE_ROBOT row,col,facing** - Coloca el robot en una posición (1-5) y dirección (NORTH/SOUTH/EAST/WEST)
- **PLACE_WALL row,col** - Coloca una pared en la posición especificada
- **MOVE** - Mueve el robot una casilla hacia donde está mirando
- **LEFT** - Gira el robot 90° a la izquierda
- **RIGHT** - Gira el robot 90° a la derecha
- **REPORT** - Obtiene la posición y dirección actual del robot

## Build

```bash
npm run build
npm run preview
```

## Proyecto

ALEX NECHITA

