"use client"

import { useState } from "react"
import type { Clase } from "@/lib/clases-data"
import { SkillCard } from "./skill-card"
import { cn } from "@/lib/utils"

type TabId = "habilidades" | "pasivas" | "activables"

interface ClaseDetalleProps {
  clase: Clase
}

export function ClaseDetalle({ clase }: ClaseDetalleProps) {
  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "habilidades", label: "Habilidades", count: clase.habilidades.length },
    { id: "pasivas", label: "Pasivas", count: clase.pasivas.length },
    ...(clase.activables && clase.activables.length > 0
      ? [{ id: "activables" as TabId, label: "Activables", count: clase.activables.length }]
      : []),
  ]

  const [activeTab, setActiveTab] = useState<TabId>("habilidades")

  const skills =
    activeTab === "habilidades"
      ? clase.habilidades
      : activeTab === "pasivas"
        ? clase.pasivas
        : clase.activables ?? []

  return (
    <section className="space-y-5">
      {/* Header de la clase */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: `linear-gradient(135deg, ${clase.color}25 0%, transparent 60%)`,
          borderColor: `${clase.color}40`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: `${clase.color}30`, border: `1.5px solid ${clase.color}50` }}
          >
            {clase.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{clase.nombre}</h2>
            <p className="text-sm text-white/60 mt-0.5 leading-relaxed">{clase.descripcion}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">Equipo permitido</p>
          <p className="text-sm text-white/70">{clase.equipo}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-lg py-2 px-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
              activeTab === tab.id
                ? "text-white shadow-sm"
                : "text-white/50 hover:text-white/80"
            )}
            style={
              activeTab === tab.id
                ? { backgroundColor: clase.color, boxShadow: `0 2px 12px ${clase.color}60` }
                : {}
            }
          >
            {tab.label}
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-bold",
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
              )}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Lista de skills */}
      {skills.length === 0 ? (
        <div className="text-center py-10 text-white/30 text-sm">Sin {activeTab} disponibles</div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <SkillCard key={skill.nombre} skill={skill} accentColor={clase.colorDark} />
          ))}
        </div>
      )}
    </section>
  )
}
