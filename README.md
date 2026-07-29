# 🛡️ Aden Oscura - Gestor de Clases Estático

Este proyecto es una aplicación web estática construida con **Next.js** y **React**. Está diseñada para gestionar y visualizar clases de un sistema RPG (juego de rol), sus habilidades, pasivas y activables, de forma totalmente estática y sin necesidad de bases de datos externas.

---

## ✨ Características Principales

*   **CMS Local sin Base de Datos:** Utiliza el sistema de archivos del sistema operativo (`fs` de Node.js) para guardar la información directamente en archivos `.json`.
*   **Panel de Administración Avanzado:** Incluye una interfaz tipo "Data Studio" en la ruta `/admin` que permite crear, editar y eliminar clases de forma visual.
*   **Constructor de Habilidades:** Un editor interno para añadir mecánicas específicas a cada clase, categorizadas en: Habilidades Activas, Pasivas, Activables, Automáticas y Toggle.
*   **Selector de Emojis Nativo:** Integración con `emoji-picker-react` para seleccionar visualmente los iconos representativos de cada clase.
*   **Rendimiento Extremo (Static Generation):** Al no depender de llamadas a bases de datos en la nube, Next.js compila el contenido de los `.json` de forma estática, haciendo que los tiempos de carga sean instantáneos en producción.

---

## 🏗️ Arquitectura "Content as Code" (Flujo de Trabajo)

Dado que el proyecto se despliega en **Vercel** (cuya arquitectura *Serverless* tiene un sistema de archivos de solo lectura por seguridad), el panel de administración **no guarda datos en producción**. 

El flujo de trabajo correcto para añadir contenido es el siguiente:

1. **Desarrollo Local:** Un miembro del equipo descarga el repositorio y ejecuta la aplicación en local (`pnpm dev`).
2. **Creación:** Accede a `http://localhost:3000/admin` y utiliza la interfaz para generar el contenido. Al guardar, el sistema crea o modifica físicamente los archivos en la carpeta `data/clases/` de su ordenador.
3. **Control de Versiones:** El desarrollador hace un `git commit` de los nuevos archivos `.json` generados y los sube a GitHub (`git push`).
4. **Despliegue Automático:** Vercel detecta los cambios en el repositorio, reconstruye la página web leyendo los nuevos JSON y publica el contenido actualizado al instante para todos los usuarios.

---

## 🚀 Instalación y Uso Local

### Requisitos Previos
*   Node.js instalado.
*   El gestor de paquetes `pnpm` activado.

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/aden-oscura.git](https://github.com/tu-usuario/aden-oscura.git)
   cd aden-oscura
