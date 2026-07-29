// Ruta: lib/types.ts

export type SkillType = "habilidad" | "pasiva" | "activable" | "automatica" | "toggle"

export interface Skill {
  nombre: string
  tipo: SkillType
  descripcion: string
  efecto?: string[]
  requiere?: string
  coste?: string
  alcance?: string
  duracion?: string
  reutilizacion?: string
  cooldown?: string
  porcentaje?: string
}

export interface Clase {
  id: string
  nombre: string
  emoji: string
  color: string
  colorDark: string
  equipo: string
  descripcion: string
  habilidades: Skill[]
  pasivas: Skill[]
  activables?: Skill[]
}