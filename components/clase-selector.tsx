import type { Clase } from "@/lib/clases-data"
import { cn } from "@/lib/utils"

interface ClaseSelectorProps {
  clases: Clase[]
  selected: string
  onSelect: (id: string) => void
}

export function ClaseSelector({ clases, selected, onSelect }: ClaseSelectorProps) {
  return (
    <nav aria-label="Selección de clase">
      <div className="grid grid-cols-5 gap-2">
        {clases.map((clase) => {
          const isSelected = selected === clase.id
          return (
            <button
              key={clase.id}
              onClick={() => onSelect(clase.id)}
              aria-pressed={isSelected}
              aria-label={clase.nombre}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl p-2 transition-all duration-200 border",
                isSelected
                  ? "border-white/30 text-white"
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
              style={
                isSelected
                  ? {
                      backgroundColor: `${clase.color}30`,
                      borderColor: `${clase.color}60`,
                      boxShadow: `0 0 16px ${clase.color}30`,
                    }
                  : {}
              }
            >
              <span
                className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                style={isSelected ? { backgroundColor: `${clase.color}40` } : { backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                {clase.emoji}
              </span>
              <span className="text-xs font-medium text-center leading-tight line-clamp-2 w-full">{clase.nombre}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
