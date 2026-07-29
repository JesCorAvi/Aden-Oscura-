import { crearClaseJson } from '@/app/actions';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="max-w-2xl mx-auto p-8 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Creador de Clases</h1>
      <p className="mb-8 text-gray-400">Rellena este formulario para crear un archivo JSON automáticamente en el proyecto.</p>
      
      <form action={crearClaseJson} className="flex flex-col gap-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="nombre" className="text-sm font-medium text-gray-300">Nombre de la Clase</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            required 
            className="p-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Ej: Paladín"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descripcion" className="text-sm font-medium text-gray-300">Descripción</label>
          <textarea 
            id="descripcion" 
            name="descripcion" 
            required 
            rows={3}
            className="p-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Ej: Un guerrero sagrado que usa magia de luz..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="habilidades" className="text-sm font-medium text-gray-300">Habilidades (separadas por comas)</label>
          <input 
            type="text" 
            id="habilidades" 
            name="habilidades" 
            required 
            className="p-2 rounded bg-gray-950 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            placeholder="Ej: Golpe Divino, Aura Protectora, Sanación"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          Generar Archivo de Clase
        </Button>
      </form>
    </div>
  );
}