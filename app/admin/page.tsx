"use client";

import { useState, useEffect } from "react";
import { guardarClaseCompleta, obtenerClasesParaAdmin, borrarClaseAccion } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Clase, Skill, SkillType } from "@/lib/types";
import EmojiPicker, { Theme } from "emoji-picker-react";

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
  const [modoEdicionSkill, setModoEdicionSkill] = useState<{tipo: "habilidades" | "pasivas" | "activables", index: number} | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const cargarLista = async () => {
    setIsLoading(true);
    const clases = await obtenerClasesParaAdmin();
    setListaClases(clases);
    setIsLoading(false);
  };

  useEffect(() => {
    cargarLista();
  }, []);

  const seleccionarClase = (c: Clase) => {
    setClase(c);
    setIdOriginal(c.id);
    setNuevaSkill(SKILL_VACIA);
    setModoEdicionSkill(null);
  };

  const prepararNuevaClase = () => {
    setClase(CLASE_VACIA);
    setIdOriginal(undefined);
    setNuevaSkill(SKILL_VACIA);
    setModoEdicionSkill(null);
  };

  const guardarClase = async () => {
    if (!clase.nombre) return alert("La clase debe tener un nombre");
    if (!clase.emoji) return alert("Selecciona un icono para la clase");
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

  // --- NUEVA LÓGICA DE HABILIDADES ---
  const agregarSkill = () => {
    if (!nuevaSkill.nombre || !nuevaSkill.descripcion) return alert("Nombre y descripción son obligatorios");
    
    const skill = nuevaSkill as Skill;
    const arrayDestino = skill.tipo === "pasiva" ? "pasivas" : skill.tipo === "activable" ? "activables" : "habilidades";
    
    if (modoEdicionSkill) {
      // Estamos editando una habilidad existente
      const oldArrayName = modoEdicionSkill.tipo;
      let arrayAntiguo = [...(clase[oldArrayName] || [])];

      if (oldArrayName === arrayDestino) {
        // Se queda en la misma categoría, solo actualizamos
        arrayAntiguo[modoEdicionSkill.index] = skill;
        setClase({ ...clase, [arrayDestino]: arrayAntiguo });
      } else {
        // Ha cambiado de categoría (ej: de pasiva a activable), la movemos
        arrayAntiguo.splice(modoEdicionSkill.index, 1);
        setClase({
          ...clase,
          [oldArrayName]: arrayAntiguo,
          [arrayDestino]: [...(clase[arrayDestino] || []), skill]
        });
      }
      setModoEdicionSkill(null);
    } else {
      // Estamos creando una habilidad nueva desde cero
      setClase({ ...clase, [arrayDestino]: [...(clase[arrayDestino] || []), skill] });
    }
    
    setNuevaSkill(SKILL_VACIA);
  };

  const cancelarEdicion = () => {
    setNuevaSkill(SKILL_VACIA);
    setModoEdicionSkill(null);
  };

  const editarSkill = (tipoArray: "habilidades" | "pasivas" | "activables", index: number) => {
    const skillAEditar = clase[tipoArray]![index];
    setNuevaSkill(skillAEditar);
    setModoEdicionSkill({ tipo: tipoArray, index });
    
    // Hace scroll automático hacia el formulario para que el usuario sepa dónde ha ido
    document.getElementById('skill-editor')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const borrarSkill = (tipoArray: "habilidades" | "pasivas" | "activables", index: number) => {
    if(!confirm("¿Borrar esta habilidad definitivamente?")) return;
    const nuevasSkills = [...(clase[tipoArray] || [])];
    nuevasSkills.splice(index, 1);
    setClase({ ...clase, [tipoArray]: nuevasSkills });
    if(modoEdicionSkill?.index === index && modoEdicionSkill?.tipo === tipoArray) {
      cancelarEdicion();
    }
  };

  const renderListaSkills = (skills: Skill[] | undefined, tipoArray: "habilidades" | "pasivas" | "activables", badgeColor: string) => {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="space-y-3 mt-6">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{tipoArray}</h4>
        {skills.map((h, i) => {
          const isEditing = modoEdicionSkill?.tipo === tipoArray && modoEdicionSkill?.index === i;
          
          return (
            <div key={i} className={`flex justify-between items-center p-4 rounded-lg border transition-colors ${
              isEditing 
                ? 'border-blue-500 bg-[#1e2433] shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                : 'bg-[#1e1e24] hover:bg-[#25252b] border-[#333]'
            }`}>
              <div className="flex items-start gap-4">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-opacity-10 mt-1 ${badgeColor}`}>
                  {h.tipo}
                </span>
                <div>
                  <p className="text-gray-100 font-medium text-sm">
                    {h.nombre} 
                    {h.coste && <span className="text-xs text-gray-500 font-normal ml-2">({h.coste})</span>}
                    {isEditing && <span className="ml-3 text-[10px] text-blue-400 font-bold uppercase tracking-wide">✏️ Editando...</span>}
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
          )
        })}
      </div>
    );
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0e0e11] text-sm">Cargando entorno de administración...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#0e0e11] text-gray-200 font-sans h-screen overflow-hidden">
      {/* HEADER */}
      <header className="bg-[#18181c] border-b border-[#2d2d33] shrink-0 px-6 py-4 flex justify-between items-center z-20">
        <div>
          <h1 className="text-xl font-semibold text-white leading-tight">Data Studio</h1>
          <p className="text-xs text-gray-400 mt-0.5">Gestor de Contenido Estático</p>
        </div>
        <div className="flex items-center gap-4">
          {idOriginal && (
            <Button variant="destructive" onClick={() => borrarClase(idOriginal, clase.nombre!)} className="text-sm h-9">
              Eliminar Registro
            </Button>
          )}
          <Button onClick={guardarClase} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md text-sm h-9 px-6">
            {idOriginal ? "Sincronizar Cambios" : "Publicar Nueva Clase"}
          </Button>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-[#131316] border-r border-[#2d2d33] flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4">
            <Button 
              onClick={prepararNuevaClase} 
              className={`w-full justify-start gap-2 mb-6 ${!idOriginal ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-[#1c1c22] text-gray-300 hover:bg-[#25252b] border border-[#333]'}`}
            >
              <span className="text-lg">+</span> Crear Nueva Clase
            </Button>

            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Clases Registradas ({listaClases.length})
            </h3>
            
            <div className="flex flex-col gap-1">
              {listaClases.map(c => (
                <button
                  key={c.id}
                  onClick={() => seleccionarClase(c)}
                  className={`w-full text-left px-3 py-2.5 rounded-md flex items-center gap-3 transition-colors ${
                    idOriginal === c.id 
                      ? 'bg-[#222228] text-white border border-[#333] shadow-sm' 
                      : 'text-gray-400 hover:bg-[#1c1c22] hover:text-gray-200 border border-transparent'
                  }`}
                >
                  <span className="text-lg grayscale-[0.2]">{c.emoji}</span>
                  <span className="font-medium text-sm truncate">{c.nombre}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ÁREA DE TRABAJO */}
        <main className="flex-1 overflow-y-auto bg-[#0e0e11] p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 pb-16">
            
            {/* COLUMNA 1: DATOS GENERALES */}
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
                  
                  <div className="grid grid-cols-2 gap-4 relative">
                    
                    {/* SELECTOR DE EMOJIS PROFESIONAL */}
                    <div className="space-y-1.5 relative">
                      <label className="text-xs font-medium text-gray-400">Icono / Emoji</label>
                      <button 
                        type="button"
                        onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                        className="w-full h-11 text-xl bg-[#131316] border border-[#2d2d33] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500 transition-all flex items-center justify-center cursor-pointer"
                      >
                        {clase.emoji || "❓"}
                      </button>

                      {isEmojiPickerOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setIsEmojiPickerOpen(false)}
                          />
                          <div className="absolute top-16 left-0 z-50 shadow-2xl">
                            <EmojiPicker 
                              theme={Theme.DARK} 
                              onEmojiClick={(emojiData) => {
                                setClase({...clase, emoji: emojiData.emoji});
                                setIsEmojiPickerOpen(false);
                              }}
                              searchPlaceHolder="Buscar emoji..."
                              width={320}
                              height={400}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Color Base</label>
                      <div className="flex gap-2 items-center bg-[#131316] border border-[#2d2d33] rounded-md pr-2">
                        <input type="color" className="h-[42px] w-10 cursor-pointer bg-transparent border-0 p-1" 
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

            {/* COLUMNA 2: CONSTRUCTOR DE HABILIDADES */}
            <div className="xl:col-span-8 space-y-6">
              
              <section id="skill-editor" className={`bg-[#18181c] rounded-xl border transition-colors shadow-sm overflow-hidden relative ${modoEdicionSkill ? 'border-blue-500' : 'border-[#2d2d33]'}`}>
                <div className={`absolute top-0 left-0 w-1 h-full ${modoEdicionSkill ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                
                <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#1c1c22] flex justify-between items-center pl-8">
                  <h2 className="text-xs font-bold text-gray-400 tracking-wide uppercase">
                    {modoEdicionSkill ? "Editando Habilidad" : "Nueva Habilidad"}
                  </h2>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${modoEdicionSkill ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-gray-800 text-gray-400'}`}>
                    {modoEdicionSkill ? "Modo Edición" : "Modo Creación"}
                  </span>
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

                  <div className="mt-6 flex justify-end gap-3">
                    {modoEdicionSkill && (
                      <Button type="button" variant="outline" onClick={cancelarEdicion} className="bg-transparent text-gray-300 border-gray-600 hover:text-white">
                        Cancelar
                      </Button>
                    )}
                    <Button type="button" onClick={agregarSkill} className={`${modoEdicionSkill ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white hover:bg-gray-200 text-black'} text-sm font-semibold px-6 py-2 shadow-sm transition-transform active:scale-95`}>
                      {modoEdicionSkill ? "Guardar Cambios" : "Añadir Habilidad"}
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
          </div>
        </main>
      </div>
    </div>
  );
}