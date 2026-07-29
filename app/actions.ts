'use server'

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Clase } from '@/lib/types';
import { obtenerTodasLasClases } from '@/lib/clases-data';

// 1. Enviar las clases al cliente
export async function obtenerClasesParaAdmin() {
  return obtenerTodasLasClases();
}

// 2. Guardar o Editar Clase
export async function guardarClaseCompleta(claseDataString: string, idOriginal?: string) {
  const claseData = JSON.parse(claseDataString) as Clase;
  
  // Generamos el nuevo ID por si le han cambiado el nombre
  const nuevoId = claseData.nombre.toLowerCase().trim().replace(/\s+/g, '-');
  claseData.id = nuevoId;

  const dataDirectory = path.join(process.cwd(), 'data/clases');
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  // Si estamos editando y el ID (nombre) ha cambiado, borramos el archivo viejo
  if (idOriginal && idOriginal !== nuevoId) {
    const oldFilePath = path.join(dataDirectory, `${idOriginal}.json`);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  // Guardamos el archivo (si el ID es el mismo, simplemente lo sobreescribe)
  const filePath = path.join(dataDirectory, `${nuevoId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(claseData, null, 2), 'utf8');

  revalidatePath('/');
  revalidatePath('/admin');
}

// 3. Borrar Clase
export async function borrarClaseAccion(id: string) {
  const filePath = path.join(process.cwd(), 'data/clases', `${id}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  revalidatePath('/');
  revalidatePath('/admin');
}