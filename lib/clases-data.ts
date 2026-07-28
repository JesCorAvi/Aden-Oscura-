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

export const CLASES: Clase[] = [
  {
    id: "gladiador",
    nombre: "Gladiador",
    emoji: "⚔️",
    color: "#c0392b",
    colorDark: "#e74c3c",
    equipo: "Armaduras ligeras y pesadas. Puede utilizar cualquier arma.",
    descripcion:
      "Guerrero de doble espada que acumula energía sónica para desatar poderosos ataques de área y a distancia.",
    habilidades: [
      {
        nombre: "Sonic Focus",
        tipo: "pasiva",
        descripcion: "Requiere dos espadas. Carga la energía necesaria para utilizar habilidades de tipo Sonic.",
        requiere: "Dos espadas",
        efecto: [
          "Recupera 1 carga por turno.",
          "Recupera 2 cargas si no realiza ninguna acción durante el turno.",
          "Consume 1 punto de magia al activarse.",
          "Máximo de cargas: 8.",
        ],
      },
      {
        nombre: "Corte Doble",
        tipo: "habilidad",
        porcentaje: "25%",
        descripcion: "Realiza dos rápidos cortes con ambas espadas.",
        requiere: "Dos espadas",
        efecto: ["Daño: 2D6."],
      },
      {
        nombre: "Corte Triple",
        tipo: "habilidad",
        porcentaje: "15%",
        descripcion: "Ejecuta tres cortes consecutivos.",
        requiere: "Dos espadas",
        efecto: ["Daño: 3D6.", "Ignora la defensa proporcionada por escudos, pero no la armadura."],
        coste: "3 cargas",
      },
      {
        nombre: "Onda Sónica",
        tipo: "habilidad",
        porcentaje: "25%",
        descripcion: "Lanza una ráfaga de energía sónica contra un objetivo distante.",
        requiere: "Dos espadas",
        efecto: ["Daño: 2D6."],
        coste: "4 cargas",
        alcance: "10 metros",
      },
      {
        nombre: "Barrido Sónico",
        tipo: "habilidad",
        porcentaje: "20%",
        descripcion: "Genera una onda de energía sónica que daña a todos los enemigos situados frente al usuario.",
        requiere: "Dos espadas",
        efecto: ["Daño: 1D6."],
        coste: "2 cargas",
        alcance: "Cono de 5 metros",
      },
      {
        nombre: "Espíritu de Duelista",
        tipo: "habilidad",
        porcentaje: "Acción",
        descripcion: "Obtiene +1 dado de bonificación en todas las habilidades de ataque realizadas con dos espadas.",
        efecto: ["Consume 10 puntos de magia.", "Duración: 5 turnos."],
        coste: "10 magia",
        duracion: "5 turnos",
      },
      {
        nombre: "Warcry",
        tipo: "habilidad",
        porcentaje: "Acción",
        descripcion: "Incrementa el ataque físico en 2 puntos por cada golpe acertado.",
        efecto: ["Duración: 10 turnos.", "Reutilización: Descanso corto."],
        duracion: "10 turnos",
        reutilizacion: "Descanso corto",
      },
      {
        nombre: "Battle Roar",
        tipo: "habilidad",
        porcentaje: "Acción",
        descripcion:
          "Aumenta temporalmente el HP máximo en un 50% y recupera inmediatamente esa misma cantidad de vida.",
        coste: "12 magia",
        duracion: "10 turnos",
        reutilizacion: "Descanso corto",
      },
    ],
    pasivas: [],
    activables: [
      {
        nombre: "Detectar Debilidad: Animal",
        tipo: "activable",
        descripcion: "Obtiene +2 al daño contra animales.",
        efecto: ["+2 daño contra animales."],
      },
      {
        nombre: "Detectar Debilidad: Botánica",
        tipo: "activable",
        descripcion: "Obtiene +2 al daño contra plantas.",
        efecto: ["+2 daño contra plantas."],
      },
      {
        nombre: "Detectar Debilidad: Dragones",
        tipo: "activable",
        descripcion: "Obtiene +2 al daño contra dragones.",
        efecto: ["+2 daño contra dragones."],
      },
      {
        nombre: "Vicious Stance",
        tipo: "activable",
        descripcion: "La habilidad Empalar inflige 1 dado adicional de daño.",
        efecto: ["La habilidad Empalar inflige 1 dado adicional de daño."],
        coste: "1 magia por turno",
      },
    ],
  },
  {
    id: "paladin",
    nombre: "Paladín",
    emoji: "🛡️",
    color: "#d4a017",
    colorDark: "#f1c40f",
    equipo: "Armaduras ligeras y pesadas. Puede utilizar cualquier arma.",
    descripcion:
      "Guerrero sagrado especializado en provocar a los enemigos, resistir daño y apoyar al grupo con bendiciones.",
    habilidades: [
      {
        nombre: "Aggression",
        tipo: "habilidad",
        porcentaje: "25% y POD",
        descripcion: "Provoca a un enemigo para obligarlo a atacarte.",
        coste: "1 magia",
        duracion: "5 turnos",
      },
      {
        nombre: "Aura of Hate",
        tipo: "habilidad",
        porcentaje: "20% y POD",
        descripcion: "Provoca a todos los enemigos cercanos para que te ataquen.",
        coste: "2 magia",
        alcance: "20 metros",
        duracion: "5 turnos",
      },
      {
        nombre: "Holy Blessing",
        tipo: "habilidad",
        porcentaje: "20%",
        descripcion: "Restaura vida a un objetivo.",
        efecto: ["Cura: 2D6 HP."],
        coste: "10 magia",
      },
      {
        nombre: "Remedy",
        tipo: "habilidad",
        porcentaje: "Acción",
        descripcion: "Detiene el sangrado del usuario.",
        coste: "1 magia",
      },
      {
        nombre: "Majesty",
        tipo: "habilidad",
        porcentaje: "Acción",
        descripcion: "Incrementa la defensa a cambio de reducir la capacidad de esquiva.",
        efecto: [
          "Aumenta la defensa en X puntos.",
          "Todas las tiradas de esquiva se realizan con un grado de desventaja.",
        ],
        coste: "1 magia",
        duracion: "3 turnos",
      },
      {
        nombre: "Shield Stun",
        tipo: "habilidad",
        porcentaje: "15%",
        descripcion: "Golpea con el escudo dejando al objetivo aturdido.",
        requiere: "Escudo",
        efecto: ["El objetivo no puede realizar acciones durante 1 turno.", "Solo puede utilizarse una vez por combate."],
      },
    ],
    pasivas: [
      {
        nombre: "Maestría con Armadura Pesada",
        tipo: "pasiva",
        descripcion: "Mientras lleve armadura pesada equipada, reduce el daño recibido en 1 punto.",
      },
      {
        nombre: "Maestría con Escudos",
        tipo: "pasiva",
        descripcion: "Mientras lleve un escudo equipado, reduce el daño recibido en 1 punto.",
      },
      {
        nombre: "Armadura Sagrada",
        tipo: "pasiva",
        descripcion: "Obtiene 1 dado de bonificación para resistir ataques de magia oscura.",
      },
      {
        nombre: "Maestría con Armas Contundentes y Espadas Cortas",
        tipo: "pasiva",
        descripcion: "Inflige +2 de daño con armas contundentes y espadas cortas.",
      },
      {
        nombre: "Resistencia Mágica",
        tipo: "pasiva",
        descripcion: "Obtiene 1 dado de bonificación para resistir ataques mágicos.",
      },
    ],
  },
  {
    id: "soulbreaker",
    nombre: "Soulbreaker",
    emoji: "💀",
    color: "#6c3483",
    colorDark: "#9b59b6",
    equipo: "Armaduras ligeras. Puede utilizar cualquier arma.",
    descripcion:
      "Maestro de la oscuridad que roba fragmentos del alma de sus enemigos para desatar devastadores ataques oscuros.",
    habilidades: [
      {
        nombre: "Soul Mastery",
        tipo: "pasiva",
        descripcion: "Requiere Estoque. Cada vez que inflige daño roba fragmentos del alma del enemigo.",
        requiere: "Estoque",
        efecto: ["Obtiene 2 almas por ataque.", "Máximo: 20 almas."],
      },
      {
        nombre: "Death Mark",
        tipo: "habilidad",
        porcentaje: "20% y POD",
        descripcion: "Marca al enemigo con oscuridad.",
        efecto: ["Reduce 1 punto de vida y 1 punto de magia por turno."],
        coste: "1 alma",
        alcance: "50 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Soul of Pain",
        tipo: "habilidad",
        porcentaje: "25%",
        descripcion: "Libera un alma para atacar al objetivo.",
        efecto: ["Daño: 2D6 de oscuridad.", "El objetivo pierde su siguiente acción."],
        coste: "3 almas",
        alcance: "50 metros",
      },
      {
        nombre: "Surrender to the Unholy",
        tipo: "habilidad",
        porcentaje: "15% y POD",
        descripcion: "Reduce la resistencia del enemigo a la oscuridad y aumenta su resistencia a la magia sagrada.",
        coste: "2 almas",
        alcance: "50 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Triple Thrust",
        tipo: "habilidad",
        porcentaje: "15% y POD",
        descripcion: "Ejecuta tres estocadas consecutivas.",
        efecto: ["Daño: 2D8 de oscuridad."],
        coste: "1 alma",
      },
    ],
    pasivas: [
      {
        nombre: "Inmunidad Mágica",
        tipo: "pasiva",
        descripcion: "Obtiene 1 dado de bonificación para resistir ataques mágicos.",
      },
      {
        nombre: "Maestría con Armadura Ligera",
        tipo: "pasiva",
        descripcion: "Reduce el daño recibido en 1 punto.",
      },
    ],
  },
  {
    id: "spellhowler",
    nombre: "Spellhowler",
    emoji: "🌀",
    color: "#1a5276",
    colorDark: "#2980b9",
    equipo: "Túnicas o armaduras de tipo túnica y un bastón o espada mágica.",
    descripcion:
      "Mago oscuro de largo alcance que combina hechizos de viento, fuego, oscuridad y maldiciones devastadoras.",
    habilidades: [
      {
        nombre: "Body to Mind",
        tipo: "automatica",
        descripcion: "Sacrifica 1 punto de vida para recuperar 1 punto de magia.",
      },
      {
        nombre: "Corpse Life Drain",
        tipo: "automatica",
        descripcion: "Absorbe energía de un cadáver reciente.",
        efecto: ["Recupera 1D3 HP.", "El cadáver debe llevar muerto menos de 30 minutos."],
        coste: "1 magia",
      },
      {
        nombre: "Curse Fear",
        tipo: "habilidad",
        porcentaje: "15% y POD",
        descripcion: "El objetivo entra en pánico y huye.",
        coste: "5 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Hurricane",
        tipo: "habilidad",
        porcentaje: "30%",
        descripcion: "Lanza un huracán de viento.",
        efecto: ["Daño: 2D8 + la mitad del bono mágico.", "Elemento: Viento."],
        coste: "4 magia",
        alcance: "50 metros",
      },
      {
        nombre: "Shadow Flare",
        tipo: "habilidad",
        porcentaje: "20%",
        descripcion: "Dispara una mezcla de fuego y oscuridad.",
        efecto: ["Daño: 4D6.", "Provoca Quemadura."],
        coste: "5 magia",
        alcance: "50 metros",
      },
      {
        nombre: "Vampiric Claw",
        tipo: "habilidad",
        porcentaje: "20%",
        descripcion: "Una garra oscura desgarra al enemigo absorbiendo su energía.",
        efecto: ["Daño: 3D3."],
        coste: "5 magia",
        alcance: "50 metros",
      },
      {
        nombre: "Curse Chaos",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "Confunde al enemigo.",
        efecto: ["El objetivo realiza todos sus ataques con 1 dado de penalización."],
        coste: "5 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Silence",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "Impide al objetivo hablar y lanzar magia.",
        coste: "6 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Sleep",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "Induce un sueño profundo.",
        efecto: ["El objetivo realiza cualquier acción con desventaja hasta recibir al menos 1 punto de daño."],
        coste: "10 magia",
        alcance: "25 metros",
        duracion: "La mitad de tu bono de magia",
      },
      {
        nombre: "Surrender to Poison",
        tipo: "habilidad",
        descripcion: "Reduce la resistencia del enemigo al veneno.",
        coste: "2 magia",
        alcance: "50 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Surrender to Wind",
        tipo: "habilidad",
        descripcion: "Reduce la resistencia al viento y aumenta la resistencia a la tierra.",
        coste: "2 magia",
        alcance: "50 metros",
        duracion: "Tu bono de magia",
      },
    ],
    pasivas: [
      {
        nombre: "Inmunidad Mágica",
        tipo: "pasiva",
        descripcion: "Obtiene 1 dado de bonificación para resistir ataques mágicos.",
      },
      {
        nombre: "Maestría con Túnicas",
        tipo: "pasiva",
        descripcion: "Reduce el daño recibido en 1 punto.",
      },
    ],
  },
  {
    id: "nigromante",
    nombre: "Nigromante",
    emoji: "🦴",
    color: "#1b5e20",
    colorDark: "#27ae60",
    equipo: "Túnicas o armaduras de tipo túnica y un bastón o espada mágica.",
    descripcion:
      "Hechicero de la muerte que lanza maldiciones devastadoras, invoca criaturas corrompidas y drena la vida de los cadáveres.",
    habilidades: [
      {
        nombre: "Body to Mind",
        tipo: "automatica",
        descripcion: "Sacrifica 1 punto de vida para recuperar 1 punto de magia.",
      },
      {
        nombre: "Corpse Life Drain",
        tipo: "automatica",
        descripcion: "Recupera 1D3 HP desde un cadáver de menos de 30 minutos.",
        coste: "1 magia",
      },
      {
        nombre: "Curse Fear",
        tipo: "habilidad",
        porcentaje: "15% y POD",
        descripcion: "El objetivo huye presa del miedo.",
        coste: "5 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Vampiric Claw",
        tipo: "habilidad",
        porcentaje: "20%",
        descripcion: "Una garra oscura desgarra al enemigo absorbiendo su energía.",
        efecto: ["Daño: 3D3."],
        coste: "5 magia",
        alcance: "50 metros",
      },
      {
        nombre: "Curse Chaos",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "El objetivo realiza ataques con 1 dado de penalización.",
        coste: "5 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Silence",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "Impide lanzar magia.",
        coste: "6 magia",
        alcance: "25 metros",
        duracion: "Tu bono de magia",
      },
      {
        nombre: "Dormir",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "El objetivo realiza cualquier acción con desventaja hasta recibir daño.",
        coste: "10 magia",
        alcance: "25 metros",
        duracion: "La mitad de tu bono de magia",
      },
      {
        nombre: "Curse Discord",
        tipo: "habilidad",
        porcentaje: "10% y POD",
        descripcion: "Obliga al objetivo a atacar a uno de sus aliados.",
        coste: "5 magia",
        alcance: "25 metros",
        duracion: "La mitad de tu bono de magia",
      },
      {
        nombre: "Curse: Weakness",
        tipo: "habilidad",
        porcentaje: "15% y POD",
        descripcion: "Debilita los ataques físicos del objetivo.",
        efecto: ["Reduce el daño físico en la mitad de tu bono de magia."],
        coste: "3 magia",
        alcance: "25 metros",
        duracion: "La mitad de tu bono de magia",
      },
      {
        nombre: "Summon Corrupted Man",
        tipo: "habilidad",
        porcentaje: "15%",
        descripcion: "Invoca un Hombre Corrupto utilizando un cadáver.",
        efecto: ["Requiere 3 Cristales de Grado D.", "Duración: Permanente mientras consuma 1 Cristal de Grado D al día."],
        coste: "5 magia",
      },
      {
        nombre: "Transfer Pain",
        tipo: "toggle",
        descripcion: "Transfiere la mitad del daño recibido a las criaturas invocadas.",
        coste: "2 magia por turno",
        duracion: "Mientras se mantenga el coste de magia",
      },
    ],
    pasivas: [
      {
        nombre: "Inmunidad Mágica",
        tipo: "pasiva",
        descripcion: "Obtiene 1 dado de bonificación para resistir ataques mágicos.",
      },
      {
        nombre: "Maestría con Túnicas",
        tipo: "pasiva",
        descripcion: "Reduce el daño recibido en 1 punto.",
      },
    ],
  },
]
