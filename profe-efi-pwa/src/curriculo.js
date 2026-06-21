// ─────────────────────────────────────────────────────────────────────────────
// CURRÍCULO OFICIAL MINEDUC — Educación Física y Salud
// Fuente: Bases Curriculares 1°–6° básico (2013) y 7° básico–2° medio (vigente)
//         Planes y Programas UCE MINEDUC
// ─────────────────────────────────────────────────────────────────────────────

// ── EJES TEMÁTICOS (comunes a todos los niveles) ──────────────────────────
export const EJES = {
  hm:  "Habilidades motrices",
  vas: "Vida activa y saludable",
  sjl: "Seguridad, juego limpio y liderazgo",
  cf:  "Condición física y entrenamiento",   // 7° básico en adelante
  dep: "Deportes y actividades físicas",
};

// ── NIVELES ───────────────────────────────────────────────────────────────
export const NIVELES = {
  "1b": "1° Básico",
  "2b": "2° Básico",
  "3b": "3° Básico",
  "4b": "4° Básico",
  "5b": "5° Básico",
  "6b": "6° Básico",
  "7b": "7° Básico",
  "8b": "8° Básico",
  "1m": "1° Medio",
  "2m": "2° Medio",
  "3m": "3° Medio",
  "4m": "4° Medio",
};

// ── UNIDADES POR NIVEL (estructura oficial MINEDUC) ───────────────────────
export const UNIDADES = {
  "1b": [
    { n:1, titulo:"Habilidades motrices básicas de locomoción, manipulación y estabilidad en juegos y actividades físicas. Hábitos de higiene, prevención y seguridad.", horas:30 },
    { n:2, titulo:"Acciones motrices en relación a sí mismos, un objeto o un compañero. Nociones básicas para orientarse en el espacio. Hábitos de higiene.", horas:28 },
    { n:3, titulo:"Expresión de ideas, estados de ánimo y emociones por medio de movimientos corporales. Práctica de juegos tradicionales y actividades lúdicas.", horas:28 },
    { n:4, titulo:"Movimiento en diferentes ambientes. Práctica de juegos colectivos e individuales. Trabajo en equipo y roles.", horas:30 },
  ],
  "2b": [
    { n:1, titulo:"Desarrollo de habilidades motrices para saltar, botear el balón simultáneo a la marcha, mantención del equilibrio, suspensiones, giros y volteos.", horas:30 },
    { n:2, titulo:"Habilidades motrices básicas de locomoción, manipulación y estabilidad. Normas de higiene. Identificación de acciones de riesgo.", horas:28 },
    { n:3, titulo:"Habilidades motrices básicas y movimientos corporales que expresen ideas, sensaciones, estados de ánimo y emociones.", horas:28 },
    { n:4, titulo:"Habilidades motrices básicas en diferentes ambientes. Juegos individuales y colectivos. Trabajo en equipo: asumir roles, colaborar y liderar.", horas:30 },
  ],
  "3b": [
    { n:1, titulo:"Habilidades motrices, manipulación de objetos y estabilidad corporal. Juegos colectivos resolviendo problemas de espacio, tiempo y número de personas.", horas:30 },
    { n:2, titulo:"Ejercicios que refuercen la estabilidad y juegos colectivos. Registro de respuestas corporales provocadas por la exigencia física.", horas:28 },
    { n:3, titulo:"Práctica de juegos predeportivos y actividades rítmicas y lúdicas. Regularidad de la actividad física con guía del docente.", horas:28 },
    { n:4, titulo:"Responsabilidad y honestidad como valores en la práctica deportiva. Ejecución de la actividad física en entorno natural.", horas:30 },
  ],
  "4b": [
    { n:1, titulo:"Control de habilidades de locomoción, manipulación y estabilidad. Juegos colectivos: resolver problemas de espacio, tiempo y número de personas.", horas:30 },
    { n:2, titulo:"Habilidades para atrapar objetos, desplazarse botando un balón en zigzag, saltar y caminar sobre base. Medición de frecuencia cardiaca.", horas:28 },
    { n:3, titulo:"Juegos predeportivos aplicando reglas. Movimientos de danzas tradicionales. Fomento de la práctica regular de actividad física.", horas:28 },
    { n:4, titulo:"Juegos predeportivos con reglas. Responsabilidad y honestidad al jugar; roles en el juego. Respeto por decisiones de la autoridad.", horas:30 },
  ],
  "5b": [
    { n:1, titulo:"Habilidades motrices básicas en múltiples actividades deportivas y predeportivas. Resolución de problemas al practicar juegos colectivos y deportes.", horas:22 },
    { n:2, titulo:"Práctica de deportes individuales y colectivos acorde a reglas y aplicando estrategias específicas. Resolución de problemas.", horas:20 },
    { n:3, titulo:"Ejecución de una danza nacional. Práctica de actividad física de intensidad moderada a vigorosa de forma regular.", horas:12 },
    { n:4, titulo:"Práctica de deportes y juegos colectivos con reglas y estrategias. Responsabilidad, liderazgo y respeto por los demás.", horas:22 },
  ],
  "6b": [
    { n:1, titulo:"Aplicación de habilidades motrices básicas en variedad de actividades deportivas. Juegos colectivos con estrategias y reglas.", horas:20 },
    { n:2, titulo:"Práctica de juegos y deportes individuales y colectivos aplicando reglas, principios, estrategias y orientaciones del entrenador.", horas:20 },
    { n:3, titulo:"Ejecución de una danza nacional. Promoción de práctica regular de actividad física. Desarrollo de resistencia, fuerza, flexibilidad y velocidad.", horas:16 },
    { n:4, titulo:"Práctica de deportes individuales y colectivos con liderazgo y respeto. Roles de colaboración en actividades colectivas.", horas:20 },
  ],
  "7b": [
    { n:1, titulo:"Habilidades motrices específicas en deporte individual y de oposición. Estrategias y tácticas para resolver problemas en juegos o deportes.", horas:20 },
    { n:2, titulo:"Habilidades motrices específicas en deporte de colaboración y oposición/colaboración. Trabajo en equipo, toma de decisiones, estrategias y reglas.", horas:20 },
    { n:3, titulo:"Desarrollo de resistencia cardiovascular, fuerza muscular, flexibilidad y velocidad aplicando principios FIDT (frecuencia, intensidad, duración, tipo).", horas:16 },
    { n:4, titulo:"Principios FIDT para desarrollar resistencia cardiovascular, fuerza muscular, flexibilidad y velocidad. Efectos en condición física.", horas:20 },
  ],
  "8b": [
    { n:1, titulo:"Principios FIDRPT (frecuencia, intensidad, duración, recuperación, progresión, tipo) para desarrollar resistencia, fuerza, flexibilidad y velocidad.", horas:20 },
    { n:2, titulo:"Plan de entrenamiento personal aplicando principios FIDRPT para condición física saludable.", horas:20 },
    { n:3, titulo:"Habilidades motrices específicas en deporte de oposición/colaboración y secuencias de movimiento en danza.", horas:16 },
    { n:4, titulo:"Principios FIDRPT para resistencia cardiovascular, fuerza muscular, flexibilidad y velocidad.", horas:20 },
  ],
  "1m": [
    { n:1, titulo:"Principios FIDRPT para desarrollar resistencia cardiovascular, fuerza muscular, flexibilidad y velocidad.", horas:20 },
    { n:2, titulo:"Habilidades motrices específicas en deporte de colaboración y oposición/colaboración. Trabajo en equipo, reglas y evaluación de estrategias.", horas:20 },
    { n:3, titulo:"Práctica segura y responsable de actividad física. Monitoreo del esfuerzo, descanso, evitar drogas/tabaco/alcohol.", horas:16 },
    { n:4, titulo:"Promoción de vida activa en la comunidad. Práctica regular de actividad física con autocuidado y seguridad.", horas:20 },
  ],
  "2m": [
    { n:1, titulo:"Diseño, aplicación y evaluación de estrategias y tácticas en juegos o deportes.", horas:20 },
    { n:2, titulo:"Evaluación, aplicación y refinamiento de estrategias y tácticas en juegos o deportes.", horas:20 },
    { n:3, titulo:"Habilidades motrices específicas de locomoción, manipulación y estabilidad en al menos un deporte y una danza.", horas:16 },
    { n:4, titulo:"Promoción de vida activa en la comunidad. Práctica regular con autocuidado y seguridad.", horas:20 },
  ],
  "3m": [
    { n:1, titulo:"Diseño y aplicación de plan de entrenamiento personal con variables de condición física. Evaluación de resultados.", horas:18 },
    { n:2, titulo:"Liderazgo en actividades físicas y deportivas. Organización de eventos y actividades deportivas.", horas:18 },
    { n:3, titulo:"Proyectos deportivos que promuevan autocuidado y vida activa. Responsabilidad con la comunidad.", horas:16 },
    { n:4, titulo:"Factores del entorno que favorecen estilos de vida activos y saludables.", horas:16 },
  ],
  "4m": [
    { n:1, titulo:"Plan de entrenamiento avanzado. Evaluación de impacto en condición física y bienestar.", horas:18 },
    { n:2, titulo:"Liderazgo deportivo comunitario. Organización y evaluación de proyectos deportivos.", horas:18 },
    { n:3, titulo:"Análisis crítico de factores que influyen en la actividad física y salud en la sociedad.", horas:16 },
    { n:4, titulo:"Estilo de vida activo y saludable como proyecto personal. Autonomía y responsabilidad.", horas:16 },
  ],
};

// ── OBJETIVOS DE APRENDIZAJE POR NIVEL — COMPLETOS ───────────────────────
export const OA_COMPLETOS = {

  // ── 1° A 6° BÁSICO ────────────────────────────────────────────────────
  "1b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Ejecutar una variedad de habilidades motrices básicas de locomoción (correr, saltar, galopar, deslizarse, rodar, trepar), manipulación (lanzar, patear, cachar) y estabilidad (girar, rotar, balancear), demostrando coordinación, control y dominio corporal.", indicadores:["Corre cambiando de dirección y velocidad","Salta con pie derecho e izquierdo","Lanza y cacha objetos de distintos tamaños","Mantiene equilibrio en diferentes posturas"] },
      { id:"OA2", eje:"hm", texto:"Demostrar orientación espacial al relacionarse con un objeto o compañero, identificando nociones de posición, dirección y distancia (arriba/abajo, adelante/atrás, cerca/lejos, entre otros).", indicadores:["Se desplaza arriba/abajo de obstáculos","Ubica objetos a su izquierda/derecha","Reconoce distancias en actividades físicas"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Ejecutar actividades físicas de intensidad moderada a vigorosa que incrementen la condición física, por medio de juegos y circuitos.", indicadores:["Participa en juegos por tiempo determinado","Ejecuta ejercicios con peso propio","Realiza carreras cortas mejorando velocidad","Completa circuitos de desplazamiento"] },
      { id:"OA7", eje:"vas", texto:"Demostrar hábitos de higiene personal antes, durante y después de la práctica de actividad física; por ejemplo: lavado de manos y dientes, uso de desodorante y ducha.", indicadores:["Conoce importancia del aseo personal","Practica hábitos de higiene post-ejercicio"] },
    ],
    sjl: [
      { id:"OA9",  eje:"sjl", texto:"Practicar actividades físicas y/o deportivas de manera segura y responsable, siguiendo las instrucciones del profesor y las reglas del juego.", indicadores:["Sigue instrucciones del docente","Respeta el turno de sus compañeros","Cuida materiales e instalaciones"] },
      { id:"OA10", eje:"sjl", texto:"Participar en juegos colectivos demostrando actitudes de juego limpio, respeto por el compañero y las reglas, y responsabilidad en los roles asignados.", indicadores:["Acepta resultados del juego","Respeta a compañeros y rivales","Cumple roles asignados en el juego"] },
    ],
  },

  "2b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Ejecutar habilidades motrices de locomoción (saltar en un pie, galopar, saltar la cuerda), manipulación (lanzar y cachar con una y dos manos, botar el balón de forma continua) y estabilidad (suspenderse, girar sobre el eje longitudinal y transversal, hacer volteretas).", indicadores:["Salta la cuerda rítmicamente","Bota el balón de forma continua al caminar","Ejecuta volteretas hacia adelante con control","Hace suspensiones en barra o espalderas"] },
      { id:"OA2", eje:"hm", texto:"Demostrar orientación espacial en relación a sí mismo, un compañero y el espacio, identificando nociones de posición, dirección, distancia y velocidad.", indicadores:["Reconoce posición relativa en espacio","Se orienta siguiendo trayectorias"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Ejecutar actividades físicas de intensidad moderada a vigorosa usando el peso del propio cuerpo u objetos simples, participando en juegos y circuitos.", indicadores:["Mantiene actividad física por períodos más largos","Ejecuta circuitos con diferentes estaciones","Reconoce señales corporales del esfuerzo físico"] },
    ],
    sjl: [
      { id:"OA9",  eje:"sjl", texto:"Participar en actividades físicas de manera segura, identificando acciones y situaciones de riesgo.", indicadores:["Identifica riesgos en el espacio físico","Actúa con precaución en materiales y equipos"] },
      { id:"OA10", eje:"sjl", texto:"Asumir roles dentro del juego colectivo, respetando las reglas y las decisiones de sus compañeros.", indicadores:["Toma roles de líder y seguidor","Respeta normas del juego"] },
    ],
  },

  "3b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Combinar e integrar habilidades motrices básicas de locomoción, manipulación y estabilidad en situaciones de juego colectivo.", indicadores:["Combina correr y lanzar en secuencia","Integra habilidades en juegos con reglas simples","Ejecuta circuitos que combinan distintas habilidades"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Ejecutar actividades físicas de intensidad moderada a vigorosa, identificando las respuestas corporales al ejercicio: aumento de FC, respiración y temperatura.", indicadores:["Identifica aumento de FC post-ejercicio","Registra tiempo de actividad continua","Describe sensaciones durante el esfuerzo"] },
    ],
    sjl: [
      { id:"OA9",  eje:"sjl", texto:"Practicar actividad física con responsabilidad y honestidad, asumiendo roles y respetando las reglas del juego y las decisiones del árbitro.", indicadores:["Acepta decisiones del árbitro","Cumple roles dentro del equipo","Respeta reglas sin supervisión directa"] },
      { id:"OA10", eje:"sjl", texto:"Participar en actividades físicas en entorno natural, reconociendo la importancia del cuidado del medioambiente.", indicadores:["Cuida el entorno donde realiza actividad física","Participa en actividades outdoor"] },
    ],
  },

  "4b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Controlar y combinar habilidades de locomoción, manipulación y estabilidad al practicar juegos colectivos que impliquen estrategias básicas.", indicadores:["Aplica estrategias básicas en juegos","Combina desplazamiento con manejo de balón","Resuelve problemas de espacio en juego colectivo"] },
      { id:"OA2", eje:"hm", texto:"Medir la frecuencia cardiaca antes y después del ejercicio, y registrar los datos obtenidos.", indicadores:["Mide FC por método de palpación","Registra FC en reposo y post-ejercicio","Compara valores de FC en diferentes momentos"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Participar en actividades físicas de intensidad moderada a vigorosa monitoreando el esfuerzo mediante la medición de la frecuencia cardiaca.", indicadores:["Mantiene FC en zona de trabajo aeróbico","Autorregula intensidad según FC","Registra datos de FC en planilla"] },
    ],
    sjl: [
      { id:"OA9",  eje:"sjl", texto:"Practicar juegos predeportivos aplicando reglas, asumiendo responsabilidad y honestidad, y respetando las decisiones de la autoridad.", indicadores:["Aplica reglas en juegos predeportivos","Acepta resultados adversos con actitud deportiva","Cumple roles asignados por el docente"] },
      { id:"OA10", eje:"sjl", texto:"Ejecutar movimientos de danzas tradicionales chilenas, demostrando coordinación y expresión.", indicadores:["Ejecuta pasos básicos de cueca u otra danza","Coordina movimientos con la música","Participa con actitud expresiva"] },
    ],
  },

  "5b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Aplicar habilidades motrices básicas en el contexto de deportes individuales (atletismo, natación, gimnasia) y colectivos (fútbol, básquetbol, voleibol, handball).", indicadores:["Aplica fundamentos técnicos de al menos un deporte individual","Aplica fundamentos de al menos un deporte colectivo","Resuelve problemas tácticos básicos en juego"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Practicar actividad física de intensidad moderada a vigorosa de forma regular (mínimo 60 minutos al día), identificando sus beneficios para la salud.", indicadores:["Describe beneficios de la actividad regular","Participa activamente en clases de EF","Lleva registro de actividad física semanal"] },
    ],
    sjl: [
      { id:"OA8",  eje:"sjl", texto:"Demostrar actitudes de juego limpio, respeto y liderazgo al participar en deportes colectivos e individuales.", indicadores:["Asume liderazgo positivo en el equipo","Gestiona conflictos con fairplay","Motiva a sus compañeros durante la actividad"] },
      { id:"OA9",  eje:"sjl", texto:"Practicar actividad física en entornos distintos (exterior, sala, piscina, naturaleza) con conductas de autocuidado y seguridad.", indicadores:["Identifica riesgos en distintos entornos","Aplica medidas de autocuidado en cada ambiente"] },
      { id:"OA11", eje:"sjl", texto:"Ejecutar una danza nacional con coordinación, expresión y conocimiento del contexto cultural.", indicadores:["Ejecuta cueca u otra danza nacional","Conoce el contexto cultural de la danza","Coordina pasos en pareja o grupo"] },
    ],
  },

  "6b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Demostrar la aplicación de habilidades motrices básicas en una variedad de actividades deportivas individuales y colectivas, con mayor dominio técnico.", indicadores:["Ejecuta al menos tres deportes individuales o colectivos","Demuestra progresión técnica en actividades deportivas","Aplica fundamentos técnicos con mayor precisión"] },
      { id:"OA2", eje:"hm", texto:"Aplicar estrategias básicas en deportes colectivos, asumiendo distintos roles (ataque, defensa, portero/a).", indicadores:["Implementa estrategias ofensivas y defensivas","Adapta su rol según la situación del juego","Toma decisiones tácticas en tiempo real"] },
    ],
    vas: [
      { id:"OA6", eje:"vas", texto:"Desarrollar la resistencia, fuerza, flexibilidad y velocidad mediante actividades físicas progresivas, monitoreando la FC y el esfuerzo.", indicadores:["Completa circuitos de condición física","Registra FC y relaciona con intensidad del esfuerzo","Reconoce los cuatro componentes de la condición física"] },
    ],
    sjl: [
      { id:"OA8",  eje:"sjl", texto:"Asumir roles de liderazgo en actividades deportivas, promoviendo la participación equitativa y el respeto por las diferencias individuales.", indicadores:["Lidera grupos en actividades físicas","Promueve participación de todos los compañeros","Respeta diferencias de condición física y habilidad"] },
      { id:"OA11", eje:"sjl", texto:"Ejecutar una danza nacional con dominio de los pasos, expresión corporal y valoración del patrimonio cultural.", indicadores:["Coordina pasos con música","Demuestra expresión corporal","Valora la danza como patrimonio cultural"] },
    ],
  },

  // ── 7° BÁSICO A 2° MEDIO ──────────────────────────────────────────────
  "7b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Aplicar, combinar y ajustar habilidades motrices específicas en al menos un deporte individual y uno de oposición, demostrando coordinación, control y dominio técnico.", indicadores:["Aplica fundamentos técnicos de deporte individual elegido","Ejecuta acciones defensivas y ofensivas en deporte de oposición","Combina habilidades motrices en situación de juego real"] },
      { id:"OA2", eje:"hm", texto:"Aplicar variedad de estrategias y tácticas para resolver problemas durante la práctica de juegos o deportes (atacar, defender, recuperar la posesión, entre otros).", indicadores:["Implementa al menos dos estrategias de ataque","Aplica principios de defensa básicos","Toma decisiones tácticas en situación real de juego"] },
    ],
    dep: [
      { id:"OA5", eje:"dep", texto:"Combinar, aplicar y ajustar habilidades motrices en deporte de colaboración y de oposición/colaboración, tomando decisiones, aplicando estrategias y reglas.", indicadores:["Ejecuta deportes de colaboración (ej: voleibol, básquetbol)","Aplica principios tácticos ofensivos y defensivos","Trabaja en equipo para lograr objetivos comunes"] },
    ],
    cf: [
      { id:"OA3", eje:"cf", texto:"Desarrollar la resistencia cardiovascular, fuerza muscular, flexibilidad y velocidad aplicando principios de frecuencia, intensidad, duración y tipo de ejercicio (FIDT).", indicadores:["Identifica los principios FIDT","Aplica los principios FIDT en circuitos físicos","Mide y registra FC antes, durante y después del ejercicio","Reconoce zonas de FC para entrenamiento aeróbico"] },
      { id:"OA4", eje:"cf", texto:"Practicar actividad física en distintos entornos con autocuidado, seguridad y conductas de vida saludable.", indicadores:["Aplica normas de seguridad en distintos espacios deportivos","Identifica conductas de autocuidado en el deporte"] },
    ],
    sjl: [
      { id:"OA6", eje:"sjl", texto:"Demostrar actitudes de juego limpio, trabajo en equipo y liderazgo positivo al participar en actividades físicas y deportivas.", indicadores:["Gestiona victorias y derrotas con actitud deportiva","Lidera y motiva a compañeros","Respeta al árbitro y decisiones del juego"] },
    ],
  },

  "8b": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Aplicar con mayor dominio técnico habilidades motrices específicas en deportes de oposición/colaboración y en una secuencia de danza.", indicadores:["Ejecuta habilidades técnicas con mayor precisión","Aplica combinaciones técnicas en situación de juego","Demuestra progresión respecto al año anterior"] },
    ],
    dep: [
      { id:"OA5", eje:"dep", texto:"Aplicar con mayor precisión habilidades motrices específicas en deporte de oposición/colaboración y usar esas habilidades en una secuencia de movimientos en danza.", indicadores:["Ejecuta secuencias técnicas en el deporte elegido","Coordina movimientos corporales en danza"] },
    ],
    cf: [
      { id:"OA3", eje:"cf", texto:"Aplicar los principios FIDRPT (frecuencia, intensidad, duración, recuperación, progresión y tipo) para desarrollar un plan de entrenamiento físico personal.", indicadores:["Diseña plan básico de entrenamiento con principios FIDRPT","Aplica el plan y registra resultados","Evalúa su condición física inicial y final","Ajusta el plan según los resultados obtenidos"] },
      { id:"OA4", eje:"cf", texto:"Diseñar y aplicar un plan de entrenamiento para alcanzar una condición física saludable, estableciendo metas personales.", indicadores:["Establece metas de condición física personales","Diseña plan de entrenamiento de 4 a 6 semanas","Registra ingesta calórica y gasto energético básico"] },
    ],
    sjl: [
      { id:"OA6", eje:"sjl", texto:"Liderar y promover actividades físicas y deportivas en la comunidad escolar, asumiendo roles de organización y gestión.", indicadores:["Organiza una actividad física para el curso","Promueve participación activa de compañeros"] },
    ],
  },

  "1m": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Aplicar con mayor control habilidades motrices específicas en al menos un deporte de colaboración y uno de oposición/colaboración, evaluando estrategias.", indicadores:["Aplica estrategias complejas en deporte de colaboración","Evalúa efectividad de tácticas usadas en el juego","Demuestra dominio técnico superior al año anterior"] },
    ],
    cf: [
      { id:"OA3", eje:"cf", texto:"Aplicar principios de frecuencia, intensidad, recuperación, progresión, duración y tipo para desarrollar un plan de entrenamiento personal más completo.", indicadores:["Diseña plan de entrenamiento de 4–6 semanas","Incluye variables de resistencia, fuerza, flexibilidad y velocidad","Monitorea FC y percepción de esfuerzo (escala Borg)","Evalúa y ajusta el plan según resultados"] },
    ],
    vas: [
      { id:"OA4", eje:"vas", texto:"Practicar actividad física de forma segura y responsable, monitoreando el esfuerzo, durmiendo las horas adecuadas y evitando drogas, tabaco y alcohol.", indicadores:["Monitorea FC y escala de esfuerzo en actividades","Conoce relación entre sueño, alimentación y rendimiento","Identifica factores de riesgo para la salud del deportista"] },
    ],
    sjl: [
      { id:"OA5", eje:"sjl", texto:"Participar y promover actividades físicas y deportivas en la comunidad escolar, asumiendo roles de liderazgo.", indicadores:["Organiza actividad deportiva para el curso","Promueve vida activa entre sus pares","Toma iniciativa en planificación de actividades"] },
    ],
  },

  "2m": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Diseñar, aplicar y evaluar estrategias y tácticas durante la práctica de juegos o deportes, demostrando dominio técnico y pensamiento táctico.", indicadores:["Diseña estrategias ofensivas y defensivas","Evalúa la efectividad de las tácticas aplicadas","Ajusta estrategias en tiempo real según el desarrollo del juego"] },
      { id:"OA2", eje:"hm", texto:"Perfeccionar y aplicar con precisión habilidades motrices específicas de locomoción, manipulación y estabilidad en al menos un deporte y en una danza.", indicadores:["Demuestra dominio técnico en el deporte elegido","Ejecuta secuencia de danza con coordinación y expresión"] },
    ],
    cf: [
      { id:"OA3", eje:"cf", texto:"Diseñar, aplicar y evaluar un plan de entrenamiento personal avanzado, considerando todos los principios del entrenamiento deportivo.", indicadores:["Diseña plan con macrociclo y microciclo básico","Evalúa progresión de condición física","Ajusta variables de entrenamiento según resultados"] },
    ],
    sjl: [
      { id:"OA5", eje:"sjl", texto:"Promover la práctica regular de actividad física en la comunidad escolar, liderando proyectos deportivos y saludables.", indicadores:["Diseña y ejecuta proyecto deportivo para el colegio","Evalúa el impacto de su proyecto en la comunidad"] },
    ],
  },

  "3m": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Diseñar y aplicar un plan de entrenamiento personal que considere metas de condición física, con seguimiento y evaluación de resultados.", indicadores:["Establece metas SMART de condición física","Diseña plan de 6 semanas con principios de entrenamiento","Evalúa progresión y ajusta variables","Presenta informe de resultados del plan"] },
    ],
    sjl: [
      { id:"OA4", eje:"sjl", texto:"Promover y evaluar el impacto de proyectos deportivos que fomenten el autocuidado y la vida activa en la comunidad.", indicadores:["Planifica proyecto deportivo comunitario","Evalúa indicadores de participación e impacto","Presenta resultados y aprendizajes del proyecto"] },
      { id:"OA5", eje:"sjl", texto:"Analizar cómo los factores del entorno (infraestructura, cultura, familia, políticas públicas) favorecen o dificultan la actividad física.", indicadores:["Identifica factores facilitadores y obstaculizadores","Propone soluciones a barreras de actividad física","Reflexiona sobre el rol de la escuela en la promoción de salud"] },
    ],
  },

  "4m": {
    hm: [
      { id:"OA1", eje:"hm", texto:"Diseñar, aplicar y evaluar un plan de entrenamiento avanzado que integre variables de periodización, considerando bienestar integral.", indicadores:["Integra principios de periodización básica","Incluye monitoreo de salud y bienestar emocional","Evalúa impacto del plan en su calidad de vida"] },
    ],
    sjl: [
      { id:"OA4", eje:"sjl", texto:"Planificar y liderar proyectos deportivos que promuevan la actividad física en la comunidad.", indicadores:["Lidera equipo en organización de evento deportivo","Diseña estrategia de convocatoria e inclusión","Evalúa el impacto del proyecto en la comunidad"] },
      { id:"OA5", eje:"sjl", texto:"Analizar críticamente los factores sociales, culturales y económicos que influyen en la actividad física y salud en la sociedad chilena.", indicadores:["Analiza estadísticas de actividad física en Chile","Propone iniciativas de política pública deportiva","Reflexiona sobre su rol como promotor de salud"] },
    ],
  },
};

// ── ACTITUDES TRANSVERSALES (presentes en todos los niveles) ──────────────
export const ACTITUDES = [
  "Demostrar actitud proactiva para mantenerse activo y participar en actividades físicas.",
  "Respetar la diversidad física, de habilidades y de género en el deporte.",
  "Promover la participación equitativa de hombres y mujeres en toda actividad física.",
  "Asumir con responsabilidad los roles asignados en juegos y deportes.",
  "Demostrar honestidad y juego limpio en todo contexto de actividad física.",
  "Valorar la actividad física como parte de un estilo de vida saludable.",
  "Cuidar el medioambiente y los espacios donde se realiza actividad física.",
];

// ── HELPER: obtener OA planos por nivel ───────────────────────────────────
export const getOAsByNivel = (nivel) => {
  const data = OA_COMPLETOS[nivel];
  if (!data) return [];
  return Object.values(data).flat();
};

// ── HELPER: obtener OA por nivel y eje ────────────────────────────────────
export const getOAsByNivelEje = (nivel, eje) => {
  const data = OA_COMPLETOS[nivel];
  if (!data || !data[eje]) return [];
  return data[eje];
};

// ── HELPER: obtener texto enriquecido para el prompt de IA ────────────────
export const getCurriculoContexto = (nivel, eje, oaIds) => {
  const allOAs = getOAsByNivelEje(nivel, eje);
  const selectedOAs = oaIds?.length
    ? allOAs.filter(oa => oaIds.includes(oa.id))
    : allOAs;

  const unidades = UNIDADES[nivel] || [];
  const nivelLabel = NIVELES[nivel] || nivel;
  const ejeLabel = EJES[eje] || eje;
  const actitudes = ACTITUDES.slice(0, 3).join("; ");

  const oaTextos = selectedOAs.map(oa =>
    `${oa.id}: ${oa.texto}\n  Indicadores: ${oa.indicadores?.join(" / ") || "—"}`
  ).join("\n\n");

  const unidadesTexto = unidades.map(u =>
    `Unidad ${u.n} (${u.horas} hrs): ${u.titulo}`
  ).join("\n");

  return `
NIVEL: ${nivelLabel}
EJE TEMÁTICO: ${ejeLabel}

OBJETIVOS DE APRENDIZAJE SELECCIONADOS:
${oaTextos}

ESTRUCTURA DE UNIDADES DEL AÑO (${nivelLabel}):
${unidadesTexto}

ACTITUDES TRANSVERSALES A INTEGRAR:
${actitudes}
`.trim();
};

// ── EJES DISPONIBLES POR NIVEL ────────────────────────────────────────────
export const getEjesByNivel = (nivel) => {
  const n = parseInt(nivel);
  // Básico 1-6: hm, vas, sjl
  // Básico 7-8 y Media: hm, cf, dep, sjl
  if (["1b","2b","3b","4b","5b","6b"].includes(nivel)) {
    return { hm:"Habilidades motrices", vas:"Vida activa y saludable", sjl:"Seguridad, juego limpio y liderazgo" };
  }
  return { hm:"Habilidades motrices", cf:"Condición física y entrenamiento", dep:"Deportes y actividades físicas", sjl:"Seguridad, juego limpio y liderazgo" };
};
