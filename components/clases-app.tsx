"use client"

import { useState } from "react"
import { CLASES } from "@/lib/clases-data"
import { ClaseSelector } from "./clase-selector"
import { ClaseDetalle } from "./clase-detalle"

export function ClasesApp() {
  const [selectedId, setSelectedId] = useState<string>(CLASES[0].id)
  const selectedClase = CLASES.find((c) => c.id === selectedId) ?? CLASES[0]

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Clases <span className="text-white/40 font-normal">· Cthulhu L2</span>
              </h1>
              <p className="text-xs text-white/40 mt-0.5">Guía de referencia rápida</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-lg">🎲</span>
            </div>
          </div>
          <ClaseSelector clases={CLASES} selected={selectedId} onSelect={setSelectedId} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <ClaseDetalle key={selectedId} clase={selectedClase} />
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 pb-8 pt-4 border-t border-white/5">
        <p className="text-center text-xs text-white/20">Clases Cthulhu L2 · Guía de referencia</p>
      </footer>
    </div>
  )
}
