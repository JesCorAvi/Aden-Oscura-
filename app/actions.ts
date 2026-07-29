'use server'

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function crearClaseJson(formData: FormData) {
  // 1. Recoger los datos del formulario
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const habilidadesString = formData.get('habilidades') as string;

  // 2. Dar formato a las habilidades (separadas por comas)
  const habilidades = habilidadesString.split(',').map(hab => ({
    nombre: hab.trim(),
    descripcion: "Descripción pendiente" // Podrás editar esto más adelante
  }));

  // 3. Crear el objeto de la clase y su ID (en minúsculas y sin espacios)
  const id = nombre.toLowerCase().trim().replace(/\s+/g, '-');
  const nuevaClase = {
    id,
    nombre,
    descripcion,
    habilidades
  };

  // 4. Definir la ruta donde se guardará (carpeta "data/clases")
  const dataDirectory = path.join(process.cwd(), 'data/clases');
  
  // Si la carpeta no existe, la creamos automáticamente
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  const filePath = path.join(dataDirectory, `${id}.json`);

  // 5. Escribir el archivo físicamente en el disco duro
  fs.writeFileSync(filePath, JSON.stringify(nuevaClase, null, 2), 'utf8');

  // 6. Refrescar la caché de Next.js para que la nueva clase aparezca al instante
  revalidatePath('/');
  revalidatePath('/admin');
}