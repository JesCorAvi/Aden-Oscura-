import { obtenerTodasLasClases } from '@/lib/clases-data';
import { ClasesApp } from '@/components/clases-app';

export default function Home() {
  const clases = obtenerTodasLasClases();

  return (
    <main className="min-h-screen bg-background">
      <ClasesApp clases={clases} />
    </main>
  );
}