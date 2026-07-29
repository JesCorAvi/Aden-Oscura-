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

El flujo de trabajo correcto para añadir contenido se basa en usar el entorno local para generar los archivos `.json` y luego subirlos al repositorio.

---

## 🚀 Instalación y Uso Local

### Requisitos Previos
*   Node.js instalado.
*   El gestor de paquetes `pnpm` activado.

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/aden-oscura.git](https://github.com/tu-usuario/aden-oscura.git)
   cd aden-oscura

   ```

2. **Instalar dependencias:**
Asegúrate de realizar una instalación limpia utilizando `pnpm` para evitar conflictos de *lockfiles*.
```bash
pnpm install

```



3. **Iniciar el servidor de desarrollo:**
```bash
pnpm dev

```


4. **Acceder a la aplicación:**
* **Web Pública:** [http://localhost:3000](http://localhost:3000)
* **Panel de Administración:** [http://localhost:3000/admin](http://localhost:3000/admin)



---

## 📝 Guía de Creación y Edición de Contenido (CMS Local)

Para crear, editar y subir nuevo contenido (clases y habilidades), sigue estos pasos desde tu propio ordenador (entorno local):

### 1. Preparar el Entorno Local

Las modificaciones de contenido **siempre** deben realizarse en local, nunca desde la URL pública de Vercel.

* Abre tu terminal en la carpeta raíz del proyecto y ejecuta: `pnpm dev`
* Entra en tu navegador a: `http://localhost:3000/admin`

### 2. Crear una Nueva Clase

Por defecto, la interfaz estará en modo de creación.

1. **Datos Generales:** Rellena los campos de la columna izquierda (Nombre, Color Base, Equipo y Descripción).
2. **Icono:** Haz clic en el recuadro del icono para abrir el selector visual y elegir un emoji representativo.
3. **Añadir Habilidades:** Utiliza el "Editor de Habilidad" en la columna derecha. Rellena los datos (Nombre, Tipo, Coste, etc.) y haz clic en **"Añadir a la lista"**.
4. **Generar el Archivo:** Haz clic en el botón azul superior **"Publicar Nueva Clase"**. Esto creará un archivo `.json` automáticamente en tu carpeta `data/clases/`.

### 3. Editar o Eliminar Datos Existentes

1. **Seleccionar:** En la barra lateral izquierda (Sidebar), haz clic en la clase que quieras modificar. Sus datos se cargarán en los formularios.
2. **Editar Habilidades:** Ve al "Inventario de Habilidades" (abajo a la derecha) y haz clic en **"Editar"** sobre cualquier habilidad. Modifica los datos en el editor y pulsa **"Guardar Cambios"**.
3. **Borrar:** Puedes borrar habilidades individuales desde sus tarjetas, o eliminar la clase completa con el botón rojo **"Eliminar Registro"** en la cabecera.
4. **Sincronizar:** Haz clic en el botón azul **"Sincronizar Cambios"** para sobrescribir el archivo `.json` en tu disco duro.

### 4. Publicar los Cambios (Sincronizar con Vercel)

Una vez guardados los cambios en local, debes subirlos a GitHub para que Vercel actualice la web pública.

* Abre tu terminal y añade los cambios:
```bash
git add .

```


* Crea un *Commit* describiendo tus cambios:
```bash
git commit -m "Añadida nueva clase Paladín y ajustadas habilidades"

```


* Sube los cambios al repositorio:
```bash
git push

```


* *Nota: Vercel detectará el `push`, compilará la página de forma estática y tu web estará actualizada en cuestión de minutos.*

---

## 📂 Estructura de Datos

Toda la información generada desde el panel de administración se guarda en formato estandarizado dentro de la carpeta `/data/clases/`. Cada clase es un archivo independiente.

**Ejemplo de la estructura generada (`gladiador.json`):**

```json
{
  "id": "gladiador",
  "nombre": "Gladiador",
  "emoji": "⚔️",
  "color": "#c0392b",
  "colorDark": "#e74c3c",
  "equipo": "Armaduras ligeras y pesadas.",
  "descripcion": "Guerrero de doble espada...",
  "habilidades": [
    {
      "nombre": "Corte Doble",
      "tipo": "habilidad",
      "descripcion": "Realiza dos rápidos cortes con ambas espadas."
    }
  ],
  "pasivas": [],
  "activables": []
}

```

---

## 🛠️ Stack Tecnológico

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Librería UI:** [React](https://react.dev/)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Librerías Extra:** `emoji-picker-react` (Selector visual)

```

```
