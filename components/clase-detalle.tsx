"use client";

import { useState } from "react";
import { Clase } from "@/lib/types";
import { SkillCard } from "@/components/skill-card"; 

interface ClaseDetalleProps {
  clase: Clase | null;
}

// Eliminamos la palabra "default" para que coincida con tu importación
export function ClaseDetalle({ clase }: ClaseDetalleProps) {
  const [activeTab, setActiveTab] = useState<"habilidades" | "pasivas" | "activables">("habilidades");

  if (!clase) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px] text-gray-500 bg-gray-900/50 rounded-lg border border-gray-800">
        Selecciona una clase en el menú lateral para ver sus detalles.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ================= CABECERA DE LA CLASE ================= */}
      <div 
        className="p-6 rounded-lg border border-gray-800 bg-gray-900 flex flex-col gap-4 shadow-sm" 
        style={{ borderTop: `4px solid ${clase.color}` }}
      >
        <div className="flex items-center gap-4">
          <span className="text-5xl">{clase.emoji}</span>
          <div>
            <h2 className="text-3xl font-bold text-white">{clase.nombre}</h2>
            <p className="text-sm text-gray-400 mt-1 font-medium">{clase.equipo}</p>
          </div>
        </div>
        <p className="text-gray-300 leading-relaxed mt-2">{clase.descripcion}</p>
      </div>

      {/* ================= NAVEGACIÓN DE PESTAÑAS ================= */}
      <div className="flex border-b border-gray-800">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "habilidades" ? "border-b-2 text-white" : "text-gray-500 hover:text-gray-300"
          }`}
          style={{ borderColor: activeTab === "habilidades" ? clase.color : "transparent" }}
          onClick={() => setActiveTab("habilidades")}
        >
          Habilidades ({clase.habilidades?.length || 0})
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "pasivas" ? "border-b-2 text-white" : "text-gray-500 hover:text-gray-300"
          }`}
          style={{ borderColor: activeTab === "pasivas" ? clase.color : "transparent" }}
          onClick={() => setActiveTab("pasivas")}
        >
          Pasivas ({clase.pasivas?.length || 0})
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === "activables" ? "border-b-2 text-white" : "text-gray-500 hover:text-gray-300"
          }`}
          style={{ borderColor: activeTab === "activables" ? clase.color : "transparent" }}
          onClick={() => setActiveTab("activables")}
        >
          Activables ({clase.activables?.length || 0})
        </button>
      </div>

      {/* ================= CONTENIDO DE LAS PESTAÑAS ================= */}
      <div className="mt-2">
        {/* PESTAÑA: HABILIDADES */}
        {activeTab === "habilidades" && (
          <div className="space-y-3">
            {clase.habilidades?.map((skill, index) => (
              <SkillCard
                key={`habilidad-${skill.nombre}-${index}`} 
                skill={skill}
                accentColor={clase.colorDark}
              />
            ))}
            {(!clase.habilidades || clase.habilidades.length === 0) && (
              <p className="text-gray-500 text-sm py-4">No hay habilidades activas registradas para esta clase.</p>
            )}
          </div>
        )}

        {/* PESTAÑA: PASIVAS */}
        {activeTab === "pasivas" && (
          <div className="space-y-3">
            {clase.pasivas?.map((skill, index) => (
              <SkillCard
                key={`pasiva-${skill.nombre}-${index}`} 
                skill={skill}
                accentColor={clase.colorDark}
              />
            ))}
            {(!clase.pasivas || clase.pasivas.length === 0) && (
              <p className="text-gray-500 text-sm py-4">No hay pasivas registradas para esta clase.</p>
            )}
          </div>
        )}

        {/* PESTAÑA: ACTIVABLES */}
        {activeTab === "activables" && (
          <div className="space-y-3">
            {clase.activables?.map((skill, index) => (
              <SkillCard
                key={`activable-${skill.nombre}-${index}`} 
                skill={skill}
                accentColor={clase.colorDark}
              />
            ))}
            {(!clase.activables || clase.activables.length === 0) && (
              <p className="text-gray-500 text-sm py-4">No hay habilidades activables registradas para esta clase.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}