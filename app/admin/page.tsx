"use client";

import { useState, useEffect } from "react";
import { guardarClaseCompleta, obtenerClasesParaAdmin, borrarClaseAccion } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Clase, Skill, SkillType } from "@/lib/types";

const CLASE_VACIA: Partial<Clase> = {
  nombre: "", emoji: "", color: "#ffffff", colorDark: "#aaaaaa", equipo: "", descripcion: "", habilidades: [], pasivas: [], activables: [],
};

const SKILL_VACIA: Partial<Skill> = {
  nombre: "", tipo: "habilidad", descripcion: "", coste: "", alcance: "", duracion: "", porcentaje: "",
};

export default function AdminPage() {
  const [listaClases, setListaClases] = useState<Clase[]>([]);
  const [clase, setClase] = useState<Partial<Clase>>(CLASE_VACIA);
  const [idOriginal, setIdOriginal] = useState<string | undefined>(undefined);
  const [nuevaSkill, setNuevaSkill] = useState<Partial<Skill>>(SKILL_VACIA);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar las clases al abrir la página
  const cargarLista = async () => {
    setIsLoading(true);
    const clases = await obtenerClasesParaAdmin();
    setListaClases(clases);
    setIsLoading(false);
  };

  useEffect(() => {
    cargarLista();
  }, []);

  // --- FUNCIONES DE CLASES ---
  const seleccionarClase = (c: Clase) => {
    setClase(c);
    setIdOriginal(c.id);
    setNuevaSkill(SKILL_VACIA);
  };

  const prepararNuevaClase = () => {
    setClase(CLASE_VACIA);
    setIdOriginal(undefined);
    setNuevaSkill(SKILL_VACIA);
  };

  const guardarClase = async () => {
    if (!clase.nombre) return alert("La clase debe tener un nombre");
    await guardarClaseCompleta(JSON.stringify(clase), idOriginal);
    alert(`¡Clase ${clase.nombre} guardada con éxito!`);
    prepararNuevaClase();
    cargarLista();
  };

  const borrarClase = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres borrar la clase ${nombre}?`)) return;
    await borrarClaseAccion(id);
    if (idOriginal === id) prepararNuevaClase();
    cargarLista();
  };

  // --- FUNCIONES DE HABILIDADES ---
  const agregarSkill = () => {
    if (!nuevaSkill.nombre || !nuevaSkill.descripcion) return alert("Nombre y descripción son obligatorios");
    
    const skill = nuevaSkill as Skill;
    const arrayDestino = skill.tipo === "pasiva" ? "pasivas" : skill.tipo === "activable" ? "activables" : "habilidades";
    
    setClase({ ...clase, [arrayDestino]: [...(clase[arrayDestino] || []), skill] });
    setNuevaSkill(SKILL_VACIA);
  };

  const borrarSkill = (tipoArray: "habilidades" | "pasivas" | "activables", index: number) => {
    const nuevasSkills = [...(clase[tipoArray] || [])];
    nuevasSkills.splice(index, 1);
    setClase({ ...clase, [tipoArray]: nuevasSkills });
  };

  const editarSkill = (tipoArray: "habilidades" | "pasivas" | "activables", index: number) => {
    const skillAEditar = clase[tipoArray]![index];
    setNuevaSkill(skillAEditar); // La cargamos en el formulario principal
    borrarSkill(tipoArray, index); // La quitamos de la lista para no duplicar
  };

  // Renderizador de las tarjetas de habilidades del inventario
  const renderListaSkills = (skills: Skill[] | undefined, tipoArray: "habilidades" | "pasivas" | "activables", badgeColor: string) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="space-y-3 mt-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tipoArray}</h4>
        {skills.map((h, i) => (
          <div key={i} className="flex justify-between items-center bg-[#1e1e24] hover:bg-[#25252b] transition-colors p-4 rounded-lg border border-[#333]">
            <div className="flex items-start gap-4">
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-opacity-10 mt-1 ${badgeColor}`}>
                {h.tipo}
              </span>
              <div>
                <p className="text-gray-100 font-medium text-sm">
                  {h.nombre} 
                  {h.coste && <span className="text-xs text-gray-500 font-normal ml-2">({h.coste})</span>}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{h.descripcion}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-4 shrink-0">
              <Button type="button" variant="outline" size="sm" onClick={() => editarSkill(tipoArray, i)} className="h-8 text-xs bg-transparent border-gray-600 hover:text-white">
                Editar
              </Button>
              <Button type="button" variant="destructive" size="sm" onClick={() => borrarSkill(tipoArray, i)} className="h-8 text-xs">
                Borrar
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0e0e11] text-sm">Cargando entorno de administración...</div>;

  return (
    <div className="min-h-screen bg-[#0e0e11] text-gray-200 font-sans pb-16">
      {/* ================= HEADER TIPO CRM ================= */}
      <header className="bg-[#18181c] border-b border-[#2d2d33] sticky top-0 z-10 px-8 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-white">Data Studio</h1>
          <p className="text-xs text-gray-400 mt-1">Gestor de Clases y Habilidades</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            className="p-2 text-sm bg-[#222228] border border-[#333] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow cursor-pointer"
            onChange={(e) => {
              if(e.target.value === "nueva") prepararNuevaClase();
              else seleccionarClase(listaClases.find(c => c.id === e.target.value)!);
            }}
            value={idOriginal || "nueva"}
          >
            <option value="nueva">+ Crear Nueva Clase</option>
            <optgroup label="Clases Existentes">
              {listaClases.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </optgroup>
          </select>
          
          {idOriginal && (
            <Button variant="destructive" onClick={() => borrarClase(idOriginal, clase.nombre!)} className="text-sm">
              Eliminar Registro
            </Button>
          )}
          <Button onClick={guardarClase} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md text-sm">
            {idOriginal ? "Sincronizar Cambios" : "Publicar Clase"}
          </Button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 mt-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* ================= COLUMNA IZQUIERDA: DATOS GENERALES ================= */}
        <div className="xl:col-span-4 space-y-6">
          <section className="bg-[#18181c] rounded-xl border border-[#2d2d33] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#1c1c22]">
              <h2 className="text-xs font-bold text-gray-400 tracking-wide uppercase">Información de la Clase</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Nombre de la Clase</label>
                <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#2d2d33] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  value={clase.nombre || ""} onChange={e => setClase({...clase, nombre: e.target.value})} placeholder="Ej: Paladín" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Icono / Emoji</label>
                  <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#2d2d33] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-center" 
                    value={clase.emoji || ""} onChange={e => setClase({...clase, emoji: e.target.value})} placeholder="🛡️" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Color Base</label>
                  <div className="flex gap-2 items-center bg-[#131316] border border-[#2d2d33] rounded-md pr-2">
                    <input type="color" className="h-9 w-10 cursor-pointer bg-transparent border-0 p-1" 
                      value={clase.color || "#ffffff"} onChange={e => setClase({...clase, color: e.target.value})} />
                    <input type="text" className="w-full text-xs bg-transparent text-gray-300 uppercase focus:outline-none" 
                      value={clase.color || ""} readOnly />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Restricciones de Equipo</label>
                <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#2d2d33] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  value={clase.equipo || ""} onChange={e => setClase({...clase, equipo: e.target.value})} placeholder="Ej: Armadura pesada, escudos..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Descripción del Rol</label>
                <textarea className="w-full p-2.5 text-sm bg-[#131316] border border-[#2d2d33] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none leading-relaxed" rows={5}
                  value={clase.descripcion || ""} onChange={e => setClase({...clase, descripcion: e.target.value})} placeholder="Escribe un resumen sobre el lore y la jugabilidad..." />
              </div>
            </div>
          </section>
        </div>

        {/* ================= COLUMNA DERECHA: CONSTRUCTOR DE HABILIDADES ================= */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Builder de Habilidades */}
          <section className="bg-[#18181c] rounded-xl border border-[#2d2d33] shadow-sm overflow-hidden relative">
            {/* Pequeña tira de color para darle estilo */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            
            <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#1c1c22] flex justify-between items-center pl-8">
              <h2 className="text-xs font-bold text-gray-400 tracking-wide uppercase">Editor de Habilidad</h2>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Modo Edición</span>
            </div>
            
            <div className="p-6 pl-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                
                <div className="space-y-1.5 xl:col-span-2">
                  <label className="text-xs font-medium text-gray-400">Nombre de la Habilidad <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all" 
                    value={nuevaSkill.nombre || ""} onChange={e => setNuevaSkill({...nuevaSkill, nombre: e.target.value})} placeholder="Ej: Golpe Divino" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Tipo Mecánico <span className="text-red-500">*</span></label>
                  <select className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer" 
                    value={nuevaSkill.tipo || "habilidad"} onChange={e => setNuevaSkill({...nuevaSkill, tipo: e.target.value as SkillType})}>
                    <option value="habilidad">Habilidad (Activa)</option>
                    <option value="pasiva">Pasiva</option>
                    <option value="activable">Activable</option>
                    <option value="automatica">Automática</option>
                    <option value="toggle">Toggle</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Coste de Recurso</label>
                  <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all" 
                    value={nuevaSkill.coste || ""} onChange={e => setNuevaSkill({...nuevaSkill, coste: e.target.value})} placeholder="Ej: 5 magia, 1 alma..." />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Alcance Efectivo</label>
                  <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all" 
                    value={nuevaSkill.alcance || ""} onChange={e => setNuevaSkill({...nuevaSkill, alcance: e.target.value})} placeholder="Ej: 10 metros, Personal..." />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Duración / Cooldown</label>
                  <input type="text" className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all" 
                    value={nuevaSkill.duracion || ""} onChange={e => setNuevaSkill({...nuevaSkill, duracion: e.target.value})} placeholder="Ej: 3 turnos" />
                </div>

                <div className="space-y-1.5 xl:col-span-3">
                  <label className="text-xs font-medium text-gray-400">Efectos y Descripción <span className="text-red-500">*</span></label>
                  <textarea className="w-full p-2.5 text-sm bg-[#131316] border border-[#333] rounded-md text-white focus:outline-none focus:border-blue-500 transition-all resize-none leading-relaxed" rows={3}
                    value={nuevaSkill.descripcion || ""} onChange={e => setNuevaSkill({...nuevaSkill, descripcion: e.target.value})} placeholder="¿Qué hace mecánicamente esta habilidad?..." />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={agregarSkill} className="bg-white hover:bg-gray-200 text-black text-sm font-semibold px-6 py-2 shadow-sm transition-transform active:scale-95">
                  {nuevaSkill.nombre ? `Guardar "${nuevaSkill.nombre}"` : "Añadir a la lista"}
                </Button>
              </div>
            </div>
          </section>

          {/* Inventario de Habilidades de la clase */}
          <section className="bg-[#18181c] rounded-xl border border-[#2d2d33] shadow-sm overflow-hidden min-h-[300px]">
            <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#1c1c22] flex justify-between items-center">
              <h2 className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                Base de Datos de Habilidades
              </h2>
              <span className="text-xs font-medium text-gray-500">
                Total: {(clase.habilidades?.length || 0) + (clase.pasivas?.length || 0) + (clase.activables?.length || 0)}
              </span>
            </div>
            
            <div className="p-6 pt-2">
              {renderListaSkills(clase.habilidades, "habilidades", "text-blue-400 border border-blue-500/30 bg-blue-500/10")}
              {renderListaSkills(clase.pasivas, "pasivas", "text-emerald-400 border border-emerald-500/30 bg-emerald-500/10")}
              {renderListaSkills(clase.activables, "activables", "text-amber-400 border border-amber-500/30 bg-amber-500/10")}
              
              {!clase.habilidades?.length && !clase.pasivas?.length && !clase.activables?.length && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-[#222228] flex items-center justify-center border border-[#333]">
                    <span className="text-2xl opacity-50">📂</span>
                  </div>
                  <h3 className="text-gray-300 font-medium mb-1">El inventario está vacío</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Utiliza el editor superior para crear habilidades, pasivas y activables.
                  </p>
                </div>
              )}
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}