// Ruta: lib/clases-data.ts
import fs from 'fs';
import path from 'path';
import { Clase } from './types'; 

export function obtenerTodasLasClases(): Clase[] {
  const dataDirectory = path.join(process.cwd(), 'data/clases');
  
  if (!fs.existsSync(dataDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(dataDirectory);
  
  if (fileNames.length === 0) {
    return [];
  }

  const clases: Clase[] = fileNames
    .filter(file => file.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(dataDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents) as Clase; // <-- Tipamos el JSON parseado
    });

  return clases;
}