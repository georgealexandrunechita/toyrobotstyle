# Toy Robot Style

[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-brightgreen?style=flat&logo=render)](https://toyrobotstyle.onrender.com/)

## Live Demo

**[https://toyrobotstyle.onrender.com/](https://toyrobotstyle.onrender.com/)**

Juego interactivo donde controlas un robot en un tablero 5x5 con paredes. Movimientos circulares, rotaciones y reportes de posición en tiempo real.

---

## Características

- Tablero 5x5 interactivo con límites circulares
- Robot con posición, dirección y movimientos dinámicos
- Sistema de paredes y obstáculos
- Reporte de estado en tiempo real
- Música ambiental con control de volumen
- Diseño fully responsive (móvil/tablet/desktop)
- Interfaz vaporwave cyberpunk con video de fondo
- Feedback visual instantáneo con SweetAlert2

---

## Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces de usuario
- **React Router DOM** - Navegación entre páginas
- **Vite** - Build tool y dev server ultrarrápido
- **Tailwind CSS** - Framework de utilidades CSS

### Librerías y Herramientas
- **SweetAlert2** - Alertas y modales personalizados
- **Cloudinary** - Hosting de recursos multimedia (video/audio)
- **ESLint** - Linter de código JavaScript/React

### Deployment
- **Render** - Plataforma de hosting y despliegue continuo

---

## Instalación Local

```bash
# Clonar el repositorio
git clone <repo-url>
cd toy-robot-style

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build


Estructura del Proyecto
text
src/
├── components/
│   ├── Board.jsx          # Tablero de juego 5x5
│   └── RobotReport.jsx    # Componente de reporte
├── pages/
│   ├── Home.jsx           # Página de inicio
│   └── Game.jsx           # Página del juego
├── App.jsx                # Componente principal con rutas
└── main.jsx               # Punto de entrada
Uso
Colocar Robot: Define posición inicial (fila, columna, dirección)

Colocar Pared: Añade obstáculos en el tablero

Mover: El robot avanza en su dirección actual (con límites circulares)

Girar: Rota 90° a la izquierda o derecha

Ver Reporte: Muestra la posición actual del robot

Limpiar Todo: Reinicia el tablero completo

Reglas del Juego
El tablero es 5x5 (filas 1-5, columnas 1-5)

Las direcciones son: NORTH, EAST, SOUTH, WEST

El robot no puede atravesar paredes

Si el robot sale del tablero, reaparece en el lado opuesto (límites circulares)

No se puede colocar una pared donde está el robot

Créditos
Desarrollado por ALEX NECHITA como proyecto de práctica en React + Vite.

Música: Machine by Zambolino (freetouse.com)

