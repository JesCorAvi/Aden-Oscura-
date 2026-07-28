import type { Skill } from "@/lib/clases-data"
import { cn } from "@/lib/utils"

const TIPO_LABEL: Record<string, { label: string; color: string }> = {
  habilidad: { label: "Habilidad", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  pasiva: { label: "Pasiva", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  activable: { label: "Activable", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  automatica: { label: "Automática", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  toggle: { label: "Toggle", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
}

interface SkillCardProps {
  skill: Skill
  accentColor: string
}

export function SkillCard({ skill, accentColor }: SkillCardProps) {
  const tipoInfo = TIPO_LABEL[skill.tipo] ?? TIPO_LABEL.habilidad

  return (
    <article
      className="rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/20"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      <header className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-base leading-tight">{skill.nombre}</h3>
          {skill.requiere && (
            <p className="text-xs text-white/40 mt-0.5">Requiere: {skill.requiere}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {skill.porcentaje && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${accentColor}30`, color: accentColor, border: `1px solid ${accentColor}40` }}
            >
              {skill.porcentaje}
            </span>
          )}
          <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", tipoInfo.color)}>
            {tipoInfo.label}
          </span>
        </div>
      </header>

      <p className="text-sm text-white/70 leading-relaxed mb-3">{skill.descripcion}</p>

      {skill.efecto && skill.efecto.length > 0 && (
        <ul className="space-y-1 mb-3">
          {skill.efecto.map((e, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
              {e}
            </li>
          ))}
        </ul>
      )}

      {(skill.coste || skill.alcance || skill.duracion || skill.reutilizacion) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t border-white/10">
          {skill.coste && (
            <Stat icon="💎" label="Coste" value={skill.coste} />
          )}
          {skill.alcance && (
            <Stat icon="🎯" label="Alcance" value={skill.alcance} />
          )}
          {skill.duracion && (
            <Stat icon="⏱️" label="Duración" value={skill.duracion} />
          )}
          {skill.reutilizacion && (
            <Stat icon="🔄" label="Recarga" value={skill.reutilizacion} />
          )}
        </div>
      )}
    </article>
  )
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span>{icon}</span>
      <span className="text-white/40">{label}:</span>
      <span className="text-white/80 font-medium">{value}</span>
    </div>
  )
}
