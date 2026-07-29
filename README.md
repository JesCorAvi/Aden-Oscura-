### 1. Preparar el Entorno Local

Dado que el proyecto utiliza una arquitectura de "Contenido como Código" estática, los cambios deben realizarse siempre desde tu propio ordenador, nunca desde la URL pública de Vercel.

* Abre tu terminal (o la terminal integrada de tu editor, como VS Code).
* Asegúrate de estar en la carpeta raíz del proyecto (`Aden-Oscura-`).
* Ejecuta el servidor de desarrollo iniciando este comando:
`pnpm dev`
* Abre tu navegador web y entra en la ruta del panel de administración: **`http://localhost:3000/admin`**.

---

### 2. Crear una Nueva Clase y sus Habilidades

Una vez dentro del panel de administración local, la interfaz estará por defecto en el modo de creación.

1. **Datos Generales:** Rellena los campos de la columna izquierda (Nombre de la Clase, Color Base, Restricciones de Equipo y Descripción).
2. **Icono:** Haz clic en el recuadro del icono para abrir el selector visual y elige el emoji que mejor represente a la clase.
3. **Añadir Habilidades:** En la columna derecha, utiliza el "Editor de Habilidad".
* Escribe el nombre y la descripción.
* Selecciona el tipo mecánico en el menú desplegable (Habilidad, Pasiva, Activable, etc.).
* Rellena los campos opcionales si los tiene (Coste, Alcance, Duración).
* Haz clic en **"Añadir a la lista"**. Verás que la habilidad baja al "Inventario de Habilidades" y se clasifica por colores.


4. **Generar el Archivo:** Cuando la clase y sus habilidades estén listas, haz clic en el botón azul de la esquina superior derecha: **"Publicar Nueva Clase"**. Esto creará un archivo `.json` automáticamente en tu carpeta `data/clases/`.

---

### 3. Editar o Eliminar Datos Existentes

Si te has equivocado en algo o quieres balancear una clase existente, puedes hacerlo fácilmente.

1. **Seleccionar la Clase:** En la barra lateral izquierda (Sidebar), verás una lista con todas las clases registradas. Haz clic en la que quieras modificar. Los datos cargarán automáticamente en los formularios.
2. **Modificar Datos Generales:** Cambia cualquier texto, color o emoji en la columna izquierda.
3. **Editar Habilidades:** Ve al "Inventario de Habilidades" (abajo a la derecha) y haz clic en el botón **"Editar"** de la habilidad que quieras cambiar. Sus datos subirán al editor, el fondo se volverá azul y podrás modificarla. Haz clic en **"Guardar Cambios"** para actualizarla.
4. **Borrar:** Si quieres borrar una habilidad, pulsa "Borrar" en su tarjeta. Si quieres eliminar la clase entera, pulsa el botón rojo **"Eliminar Registro"** en la cabecera superior.
5. **Guardar Edición:** Una vez hechos los ajustes en la clase, haz clic en el botón azul de la cabecera, que ahora dirá **"Sincronizar Cambios"**. Esto sobreescribirá el archivo `.json` en tu ordenador.

---

### 4. Publicar los Cambios (Sincronizar con Vercel)

Hasta este punto, los cambios (los nuevos archivos `.json` o las modificaciones) solo existen en tu ordenador. Para que sean visibles en la web pública para todo el mundo, debes subirlos a GitHub.

* Abre tu gestor de control de versiones (GitHub Desktop, la pestaña de Source Control de VS Code, o tu terminal).
* Verás que hay archivos nuevos o modificados en la carpeta `data/clases/`.
* Añade todos los cambios al *Stage*:
`git add .`
* Crea un *Commit* describiendo lo que has hecho:
`git commit -m "Añadida nueva clase Paladín y ajustadas las habilidades del Gladiador"`
* Sube los cambios al repositorio:
`git push`

¡Y eso es todo! Al hacer el `push`, Vercel detectará automáticamente los nuevos archivos `.json`, compilará la página de nuevo en un par de minutos de forma totalmente estática, y tu web estará actualizada de forma instantánea y gratuita.
