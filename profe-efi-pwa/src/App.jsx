import { useState, useEffect, useRef, useCallback } from "react";
import {
  Home, CalendarDays, Sparkles, Play, Users,
  BarChart2, Layout, Activity, Plus, Trash2,
  Pencil, Search, Save, RefreshCw, FileText,
  CheckCircle2, Circle, AlertTriangle,
  Timer, Clipboard, Heart, TrendingUp,
  BookOpen, Dumbbell, X
} from "lucide-react";


// ─── STORAGE (simula Supabase/localStorage para MVP) ───────────────────────
const loadDB = () => {
  try {
    const raw = window.storage ? null : localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : defaultDB();
  } catch { return defaultDB(); }
};
const saveDB = (db) => {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch {}
};
const defaultDB = () => ({
  cursos: [
    { id: "c1", nombre: "7° Básico A", nivel: "7b", alumnos: 28 },
    { id: "c2", nombre: "8° Básico B", nivel: "8b", alumnos: 30 },
    { id: "c3", nombre: "1° Medio C", nivel: "1m", alumnos: 32 },
  ],
  alumnos: [
    { id: "a1", cursoId: "c1", nombre: "Martina Araya",    rut: "20.111.111-1", nota: 6.8, asistencia: 95, fc: 72, estado: "destacada" },
    { id: "a2", cursoId: "c1", nombre: "Carlos Pérez",     rut: "20.222.222-2", nota: 5.9, asistencia: 88, fc: 78, estado: "regular"   },
    { id: "a3", cursoId: "c1", nombre: "Valentina Silva",  rut: "20.333.333-3", nota: 4.2, asistencia: 72, fc: 81, estado: "atencion"  },
    { id: "a4", cursoId: "c1", nombre: "Joaquín Rojas",    rut: "20.444.444-4", nota: 6.3, asistencia: 93, fc: 69, estado: "regular"   },
    { id: "a5", cursoId: "c1", nombre: "Isidora Muñoz",    rut: "20.555.555-5", nota: 5.5, asistencia: 80, fc: 75, estado: "regular"   },
    { id: "a6", cursoId: "c1", nombre: "Tomás Fuentes",    rut: "20.666.666-6", nota: 7.0, asistencia: 98, fc: 65, estado: "destacada" },
    { id: "a7", cursoId: "c2", nombre: "Antonia Castro",   rut: "20.777.777-7", nota: 6.1, asistencia: 91, fc: 73, estado: "regular"   },
    { id: "a8", cursoId: "c2", nombre: "Diego Soto",       rut: "20.888.888-8", nota: 5.2, asistencia: 76, fc: 82, estado: "atencion"  },
  ],
  sesiones: [
    { id: "s1", cursoId: "c1", titulo: "Resistencia aeróbica — Test Cooper", fecha: "2025-06-23", duracion: 90, espacio: "Pista deportiva", eje: "hm", oas: ["OA3","OA7"], estado: "planificada" },
    { id: "s2", cursoId: "c1", titulo: "Voleibol — Técnica de saque",        fecha: "2025-06-25", duracion: 90, espacio: "Gimnasio",        eje: "jd", oas: ["OA8","OA9"], estado: "planificada" },
    { id: "s3", cursoId: "c2", titulo: "Fútbol — Estrategia en ataque",      fecha: "2025-06-27", duracion: 90, espacio: "Cancha",           eje: "jd", oas: ["OA10"],       estado: "planificada" },
  ],
  tests: [
    { id: "t1", alumnoId: "a1", tipo: "cooper", valor: 2100, fecha: "2025-06-10", unidad: "m" },
    { id: "t2", alumnoId: "a2", tipo: "cooper", valor: 1850, fecha: "2025-06-10", unidad: "m" },
    { id: "t3", alumnoId: "a3", tipo: "cooper", valor: 1600, fecha: "2025-06-10", unidad: "m" },
    { id: "t4", alumnoId: "a4", tipo: "cooper", valor: 1980, fecha: "2025-06-10", unidad: "m" },
    { id: "t5", alumnoId: "a1", tipo: "salto",  valor: 1.65, fecha: "2025-06-10", unidad: "m" },
    { id: "t6", alumnoId: "a2", tipo: "salto",  valor: 1.42, fecha: "2025-06-10", unidad: "m" },
  ],
  notas: [],
  sesionActiva: null,
});

// ─── OA DATA ───────────────────────────────────────────────────────────────
const OA_MAP = {
  "7b-hm": [
    { id:"OA1", label:"OA1 · Movimientos locomotores y no locomotores" },
    { id:"OA3", label:"OA3 · Actividad física moderada a vigorosa" },
    { id:"OA5", label:"OA5 · Habilidades motrices en contexto deportivo" },
    { id:"OA7", label:"OA7 · Autopercepción del bienestar" },
  ],
  "7b-jd": [
    { id:"OA8",  label:"OA8 · Juegos cooperativos y de invasión" },
    { id:"OA9",  label:"OA9 · Reglas y fair play en deporte" },
    { id:"OA10", label:"OA10 · Estrategia básica en juegos deportivos" },
  ],
  "7b-vs": [
    { id:"OA11", label:"OA11 · Hábitos de vida activa y salud" },
    { id:"OA12", label:"OA12 · Alimentación y bienestar" },
  ],
  "8b-hm": [
    { id:"OA2", label:"OA2 · Coordinación y control motor" },
    { id:"OA4", label:"OA4 · Resistencia aeróbica y anaeróbica" },
    { id:"OA6", label:"OA6 · Aplicación táctica en deporte" },
  ],
  "8b-jd": [
    { id:"OA8",  label:"OA8 · Juegos de cancha dividida y net" },
    { id:"OA9",  label:"OA9 · Táctica ofensiva y defensiva" },
    { id:"OA10", label:"OA10 · Árbitro y normas del juego" },
  ],
  "1m-hm": [
    { id:"OA1", label:"OA1 · Técnica en disciplinas atléticas" },
    { id:"OA3", label:"OA3 · Planificación de entrenamiento personal" },
    { id:"OA5", label:"OA5 · Aplicación táctica avanzada" },
  ],
  "1m-jd": [
    { id:"OA7", label:"OA7 · Deporte individual y colectivo" },
    { id:"OA8", label:"OA8 · Liderazgo y trabajo en equipo" },
  ],
};

const EJES = { hm:"Habilidades motrices", jd:"Juegos y deportes", vs:"Vida activa y salud", ae:"Actitud y expresión" };
const NIVELES = { "7b":"7° Básico", "8b":"8° Básico", "1m":"1° Medio", "2m":"2° Medio" };

// ─── UTILS ────────────────────────────────────────────────────────────────
const fmtFecha = (d) => {
  if (!d) return "";
  const [y,m,day] = d.split("-");
  const meses = ["","ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${parseInt(day)} ${meses[parseInt(m)]}`;
};
const uid = () => Math.random().toString(36).slice(2,9);
const avg = (arr) => arr.length ? (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1) : "—";

// ─── COLORS / BADGES ──────────────────────────────────────────────────────
const estadoBadge = (e) => ({
  destacada: "bg-green-100 text-green-800",
  regular:   "bg-blue-100 text-blue-800",
  atencion:  "bg-amber-100 text-amber-800",
}[e] || "bg-gray-100 text-gray-600");

const estadoLabel = (e) => ({
  destacada:"Destacada", regular:"Regular", atencion:"Atención"
}[e] || e);

// ═══════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [db, setDb] = useState(() => loadDB());
  const [page, setPage] = useState("inicio");
  const [cursActivo, setCursActivo] = useState("c1");

  const mutate = useCallback((fn) => {
    setDb(prev => { const next = fn(structuredClone(prev)); saveDB(next); return next; });
  }, []);

  const curso = db.cursos.find(c => c.id === cursActivo) || db.cursos[0];

  const navItems = [
    { id:"inicio",   Icon:Home,         label:"Inicio"        },
    { id:"plan",     Icon:CalendarDays, label:"Planificación"  },
    { id:"ia",       Icon:Sparkles,     label:"IA MINEDUC"     },
    { id:"sesion",   Icon:Play,         label:"Sesión"         },
    { id:"alumnos",  Icon:Users,        label:"Alumnos"        },
    { id:"tests",    Icon:BarChart2,    label:"Test"           },
    { id:"pizarra",  Icon:Layout,       label:"Pizarra"        },
  ];

  const allNavItems = [
    { id:"inicio",   Icon:Home,         label:"Inicio"       },
    { id:"plan",     Icon:CalendarDays, label:"Plan"         },
    { id:"ia",       Icon:Sparkles,     label:"IA"           },
    { id:"sesion",   Icon:Play,         label:"Sesión"       },
    { id:"alumnos",  Icon:Users,        label:"Alumnos"      },
    { id:"tests",    Icon:BarChart2,    label:"Tests"        },
    { id:"pizarra",  Icon:Layout,       label:"Pizarra"      },
  ];
  const bottomNav  = allNavItems.slice(0, 5);
  const bottomExtra = allNavItems.slice(5);

  return (
    <div style={{ display:"flex", height:"100dvh", background:"#0f1117",
      fontFamily:"'Inter',sans-serif", color:"#f0f2f7", fontSize:14, position:"relative" }}>

      {/* ── SIDEBAR DESKTOP ── */}
      <aside className="sidebar-desktop" style={{ width:64, background:"#111827", display:"flex",
        flexDirection:"column", alignItems:"center", paddingTop:14, gap:2,
        flexShrink:0, borderRight:"1px solid rgba(255,255,255,0.06)" }}>
        {/* Logo */}
        <div style={{ width:38,height:38,background:"#1e6b3a",borderRadius:10,
          display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,color:"white" }}>
          <Activity size={20} strokeWidth={2.5} />
        </div>
        {allNavItems.map(({ id, Icon, label }) => (
          <button key={id} title={label} onClick={() => setPage(id)}
            style={{ width:44,height:44,borderRadius:10,border:"none",cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
              transition:"all 0.15s",
              background: page===id ? "rgba(74,222,128,0.12)" : "transparent",
              color:      page===id ? "#4ade80"               : "#8a93a8",
              outline:    page===id ? "1px solid rgba(74,222,128,0.3)" : "none" }}>
            <Icon size={18} strokeWidth={page===id ? 2.5 : 1.8} />
          </button>
        ))}
        {/* Selector cursos */}
        <div style={{ marginTop:"auto",marginBottom:14,display:"flex",flexDirection:"column",gap:4,alignItems:"center" }}>
          {db.cursos.map(c => (
            <button key={c.id} title={c.nombre} onClick={() => setCursActivo(c.id)}
              style={{ width:34,height:34,borderRadius:8,border:"none",fontSize:9,fontWeight:700,cursor:"pointer",lineHeight:1.1,
                background: cursActivo===c.id ? "#1e6b3a" : "rgba(255,255,255,0.05)",
                color:      cursActivo===c.id ? "white"   : "#6b7280",
                letterSpacing:"0.02em" }}>
              {c.nombre.slice(0,3)}
            </button>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",minWidth:0 }}>

        {/* Topbar */}
        <div style={{ height:52,background:"#111827",borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex",alignItems:"center",padding:"0 16px",gap:10,flexShrink:0 }}>
          <span style={{ fontWeight:600,fontSize:15,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
            color:"#f0f2f7", letterSpacing:"-0.2px" }}>
            {allNavItems.find(n=>n.id===page)?.label}
          </span>
          <select value={cursActivo} onChange={e=>setCursActivo(e.target.value)}
            style={{ background:"rgba(74,222,128,0.1)",color:"#4ade80",fontSize:11,padding:"4px 10px",
              borderRadius:20,fontWeight:600,border:"1px solid rgba(74,222,128,0.2)",maxWidth:130,cursor:"pointer" }}>
            {db.cursos.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>

        {/* Content */}
        <div className="main-content" style={{ flex:1,padding:16,overflowY:"auto" }}>
          { page==="inicio"  && <PageInicio  db={db} curso={curso} setPage={setPage} /> }
          { page==="plan"    && <PagePlan    db={db} curso={curso} mutate={mutate} /> }
          { page==="ia"      && <PageIA      db={db} curso={curso} mutate={mutate} /> }
          { page==="sesion"  && <PageSesion  db={db} curso={curso} mutate={mutate} /> }
          { page==="alumnos" && <PageAlumnos db={db} curso={curso} mutate={mutate} /> }
          { page==="tests"   && <PageTests   db={db} curso={curso} mutate={mutate} /> }
          { page==="pizarra" && <PagePizarra /> }
        </div>
      </main>

      {/* ── BOTTOM NAV MÓVIL ── */}
      <nav className="bottom-nav" style={{
        position:"fixed",bottom:0,left:0,right:0,
        background:"#111827",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        paddingBottom:"env(safe-area-inset-bottom,0px)",
        zIndex:50,display:"flex",
      }}>
        {allNavItems.map(({ id, Icon, label }) => (
          <button key={id} onClick={() => setPage(id)}
            style={{ flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              padding:"9px 2px 7px",border:"none",background:"transparent",cursor:"pointer",minWidth:0,gap:3,
              color:     page===id ? "#4ade80" : "#6b7280",
              borderTop: page===id ? "2px solid #4ade80" : "2px solid transparent",
              transition:"color 0.15s" }}>
            <Icon size={19} strokeWidth={page===id ? 2.5 : 1.8} />
            <span style={{ fontSize:9.5,fontWeight:page===id?600:400,letterSpacing:"0.01em" }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS UTILS
// ═══════════════════════════════════════════════════════════════════════════
const Card = ({ children, style={} }) => (
  <div style={{ background:"#1e2433", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"14px 16px", ...style }}>
    {children}
  </div>
);
const SectionTitle = ({ children }) => (
  <div style={{ fontSize:11, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", color:"#4ade80", marginBottom:10 }}>{children}</div>
);
const Btn = ({ children, onClick, variant="primary", style={} }) => {
  const styles = {
    primary:   { background:"#1e6b3a", color:"white", border:"none" },
    secondary: { background:"rgba(255,255,255,0.07)", color:"#f0f2f7", border:"1px solid rgba(255,255,255,0.1)" },
    danger:    { background:"rgba(231,76,60,0.15)", color:"#e74c3c", border:"1px solid rgba(231,76,60,0.3)" },
    accent:    { background:"#f0ff44", color:"#0f1117", border:"none" },
  };
  return (
    <button onClick={onClick} style={{ ...styles[variant], padding:"8px 14px", borderRadius:8,
      fontSize:13, fontWeight:500, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:6, ...style }}>
      {children}
    </button>
  );
};
const Input = ({ style={}, ...props }) => (
  <input {...props} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:8, padding:"8px 10px", fontSize:13, color:"#f0f2f7", width:"100%", outline:"none", ...style }} />
);
const Select = ({ children, style={}, ...props }) => (
  <select {...props} style={{ background:"#1e2433", border:"1px solid rgba(255,255,255,0.1)",
    borderRadius:8, padding:"8px 10px", fontSize:13, color:"#f0f2f7", width:"100%", ...style }}>
    {children}
  </select>
);
const Tag = ({ children, color="default" }) => {
  const c = { default:"rgba(255,255,255,0.07)", green:"rgba(46,204,113,0.15)", blue:"rgba(52,152,219,0.15)", amber:"rgba(243,156,18,0.15)", red:"rgba(231,76,60,0.15)" };
  const tc = { default:"#8a93a8", green:"#4ade80", blue:"#60a5fa", amber:"#fbbf24", red:"#f87171" };
  return <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:c[color], color:tc[color], fontWeight:500 }}>{children}</span>;
};
const Grid = ({ cols=2, gap=10, children, style={} }) => (
  <div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap, ...style }}>{children}</div>
);
const ProgressBar = ({ value, max=100, color="#2ecc71" }) => (
  <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
    <div style={{ width:`${Math.min(100,(value/max)*100)}%`, height:"100%", background:color, borderRadius:3, transition:"width 0.4s" }} />
  </div>
);
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#1e2433", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, width:"100%", maxWidth:520, maxHeight:"80vh", overflowY:"auto" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontWeight:600, fontSize:15 }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#8a93a8", fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: INICIO
// ═══════════════════════════════════════════════════════════════════════════
function PageInicio({ db, curso, setPage }) {
  const alumnos = db.alumnos.filter(a => a.cursoId === curso?.id);
  const sesiones = db.sesiones.filter(s => s.cursoId === curso?.id);
  const promedio = avg(alumnos.map(a => a.nota));
  const asist = avg(alumnos.map(a => a.asistencia));
  const tests = db.tests.filter(t => alumnos.some(a=>a.id===t.alumnoId));
  const proxima = sesiones.find(s=>s.estado==="planificada");

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Bienvenida */}
      <div style={{ background:"linear-gradient(135deg,#1e3a2a 0%,#1e2433 100%)", border:"1px solid rgba(46,204,113,0.2)", borderRadius:12, padding:"20px 20px" }}>
        <div style={{ fontSize:11, color:"#4ade80", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Buenos días, Profe</div>
        <div style={{ fontSize:22, fontWeight:700, marginBottom:4 }}>EFI, del aula a la cancha</div>
        <div style={{ fontSize:13, color:"#8a93a8" }}>Semana del 23 al 27 de junio · {sesiones.length} sesiones planificadas</div>
      </div>

      {/* Métricas clave */}
      <Grid cols={4} gap={10}>
        {[
          { label:"Promedio", value:promedio, sub:"del curso", color:"#4ade80" },
          { label:"Asistencia", value:asist+"%", sub:"promedio", color:"#60a5fa" },
          { label:"Alumnos", value:alumnos.length, sub:"activos", color:"#f0ff44" },
          { label:"Test aplicados", value:tests.length, sub:"este trimestre", color:"#f97316" },
        ].map((m,i) => (
          <Card key={i}>
            <div style={{ fontSize:11, color:"#8a93a8", marginBottom:6 }}>{m.label}</div>
            <div style={{ fontSize:28, fontWeight:700, color:m.color, lineHeight:1 }}>{m.value}</div>
            <div style={{ fontSize:11, color:"#8a93a8", marginTop:4 }}>{m.sub}</div>
          </Card>
        ))}
      </Grid>

      <Grid cols={2} gap={14}>
        {/* Próxima sesión */}
        <Card>
          <SectionTitle>Próxima sesión</SectionTitle>
          {proxima ? (
            <>
              <div style={{ fontWeight:600, marginBottom:4 }}>{proxima.titulo}</div>
              <div style={{ fontSize:12, color:"#8a93a8", marginBottom:10 }}>{fmtFecha(proxima.fecha)} · {proxima.duracion} min · {proxima.espacio}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {proxima.oas.map(o => <Tag key={o} color="green">{o}</Tag>)}
                <Tag color="blue">{EJES[proxima.eje]}</Tag>
              </div>
              <Btn variant="primary" onClick={() => setPage("sesion")} style={{ marginTop:12, width:"100%", justifyContent:"center" }}>Iniciar sesión</Btn>
            </>
          ) : <div style={{ color:"#8a93a8", fontSize:13 }}>No hay sesiones planificadas</div>}
        </Card>

        {/* Alumnos en atención */}
        <Card>
          <SectionTitle>Requieren atención</SectionTitle>
          {alumnos.filter(a=>a.estado==="atencion").map(a => (
            <div key={a.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(251,191,36,0.15)", color:"#fbbf24", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:600, fontSize:12, flexShrink:0 }}>
                {a.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:13 }}>{a.nombre}</div>
                <div style={{ fontSize:11, color:"#8a93a8" }}>Nota: {a.nota} · Asist: {a.asistencia}%</div>
              </div>
              <Tag color="amber">Atención</Tag>
            </div>
          ))}
          {alumnos.filter(a=>a.estado==="atencion").length===0 && <div style={{ color:"#4ade80", fontSize:13 }}>Sin alertas activas</div>}
        </Card>
      </Grid>

      {/* Cobertura OA */}
      <Card>
        <SectionTitle>Cobertura curricular · Trimestre 2</SectionTitle>
        <Grid cols={3} gap={14}>
          {[
            { label:"Habilidades motrices", val:72, color:"#4ade80" },
            { label:"Vida activa y salud",  val:55, color:"#60a5fa" },
            { label:"Juegos y deportes",    val:40, color:"#f97316" },
          ].map((item,i) => (
            <div key={i}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:12 }}>
                <span style={{ color:"#8a93a8" }}>{item.label}</span>
                <span style={{ fontWeight:600, color:item.color }}>{item.val}%</span>
              </div>
              <ProgressBar value={item.val} color={item.color} />
            </div>
          ))}
        </Grid>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: PLANIFICACIÓN
// ═══════════════════════════════════════════════════════════════════════════
function PagePlan({ db, curso, mutate }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ titulo:"", fecha:"", duracion:"90", espacio:"Cancha", eje:"hm", oas:[] });
  const sesiones = db.sesiones.filter(s => s.cursoId === curso?.id).sort((a,b)=>a.fecha.localeCompare(b.fecha));
  const oaList = OA_MAP[`${curso?.nivel}-${form.eje}`] || [];

  const save = () => {
    if (!form.titulo || !form.fecha) return;
    mutate(d => { d.sesiones.push({ id:uid(), cursoId:curso.id, estado:"planificada", ...form, duracion:+form.duracion }); return d; });
    setModal(false);
    setForm({ titulo:"", fecha:"", duracion:"90", espacio:"Cancha", eje:"hm", oas:[] });
  };
  const del = (id) => mutate(d => { d.sesiones = d.sesiones.filter(s=>s.id!==id); return d; });
  const toggleOA = (id) => setForm(f => ({ ...f, oas: f.oas.includes(id) ? f.oas.filter(o=>o!==id) : [...f.oas, id] }));

  const estadoColor = { planificada:"#60a5fa", realizada:"#4ade80", cancelada:"#f87171" };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <SectionTitle>Sesiones planificadas — {curso?.nombre}</SectionTitle>
        <Btn onClick={()=>setModal(true)}>+ Nueva sesión</Btn>
      </div>

      {sesiones.length === 0 && (
        <Card style={{ textAlign:"center", padding:40 }}>
          <div style={{ fontSize:32, marginBottom:12, color:"#3d4557" }}><CalendarDays size={36} /></div>
          <div style={{ color:"#8a93a8" }}>No hay sesiones planificadas aún.<br/>Crea la primera o usa la IA para generar una.</div>
        </Card>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {sesiones.map(s => (
          <Card key={s.id}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
              <div style={{ width:4, alignSelf:"stretch", borderRadius:2, background:estadoColor[s.estado]||"#60a5fa", flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                  <span style={{ fontWeight:600, fontSize:14 }}>{s.titulo}</span>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <Tag color="blue">{fmtFecha(s.fecha)}</Tag>
                    <button onClick={()=>del(s.id)} style={{ background:"none", border:"none", color:"#8a93a8", cursor:"pointer", fontSize:15 }}><Trash2 size={14} /></button>
                  </div>
                </div>
                <div style={{ fontSize:12, color:"#8a93a8", marginBottom:8 }}>
                  {curso?.nombre} · {s.espacio} · {s.duracion} min
                </div>
                <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                  {s.oas.map(o=><Tag key={o} color="green">{o}</Tag>)}
                  <Tag color="blue">{EJES[s.eje]}</Tag>
                  <Tag color={s.estado==="realizada"?"green":s.estado==="cancelada"?"red":"default"}>{s.estado}</Tag>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title="Nueva sesión">
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Título</div>
            <Input value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))} placeholder="Ej: Voleibol — Técnica de saque" /></div>
          <Grid cols={2} gap={10}>
            <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Fecha</div>
              <Input type="date" value={form.fecha} onChange={e=>setForm(f=>({...f,fecha:e.target.value}))} /></div>
            <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Duración (min)</div>
              <Select value={form.duracion} onChange={e=>setForm(f=>({...f,duracion:e.target.value}))}>
                <option value="45">45 min</option><option value="90">90 min</option><option value="120">120 min</option>
              </Select></div>
          </Grid>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Espacio</div>
            <Select value={form.espacio} onChange={e=>setForm(f=>({...f,espacio:e.target.value}))}>
              {["Cancha exterior","Gimnasio","Pista deportiva","Sala multiusos"].map(e=><option key={e}>{e}</option>)}
            </Select></div>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Eje temático</div>
            <Select value={form.eje} onChange={e=>setForm(f=>({...f,eje:e.target.value,oas:[]}))}>
              {Object.entries(EJES).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </Select></div>
          <div>
            <div style={{ fontSize:12, color:"#8a93a8", marginBottom:8 }}>Objetivos de Aprendizaje</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {oaList.map(oa => (
                <button key={oa.id} onClick={()=>toggleOA(oa.id)}
                  style={{ padding:"5px 10px", borderRadius:6, border:"1px solid", fontSize:11, cursor:"pointer",
                    background: form.oas.includes(oa.id)?"rgba(74,222,128,0.15)":"rgba(255,255,255,0.05)",
                    borderColor: form.oas.includes(oa.id)?"#4ade80":"rgba(255,255,255,0.1)",
                    color: form.oas.includes(oa.id)?"#4ade80":"#8a93a8" }}>
                  {oa.id}
                </button>
              ))}
            </div>
          </div>
          <Btn onClick={save} style={{ marginTop:4, width:"100%", justifyContent:"center" }}>Guardar sesión</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: IA MINEDUC
// ═══════════════════════════════════════════════════════════════════════════
function PageIA({ db, curso, mutate }) {
  const [form, setForm] = useState({ nivel: curso?.nivel||"7b", eje:"hm", duracion:"90", espacio:"Cancha exterior", contexto:"" });
  const [selectedOAs, setSelectedOAs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const oaList = OA_MAP[`${form.nivel}-${form.eje}`] || [];
  const toggleOA = (id) => setSelectedOAs(prev => prev.includes(id) ? prev.filter(o=>o!==id) : [...prev, id]);

  const generate = async () => {
    setLoading(true); setResult(null); setProgress(0);
    const iv = setInterval(() => setProgress(p => Math.min(p + Math.random()*6, 90)), 150);

    const oasText = selectedOAs.length ? selectedOAs.join(", ") : oaList.map(o=>o.id).join(", ");
    const prompt = `Eres Profe-EFI, un asistente especializado en Educación Física para Chile.
Genera una planificación de sesión completa con estos parámetros:
- Nivel: ${NIVELES[form.nivel]||form.nivel}
- Eje: ${EJES[form.eje]}
- Objetivos de Aprendizaje MINEDUC: ${oasText}
- Duración: ${form.duracion} minutos
- Espacio: ${form.espacio}
- Contexto adicional: ${form.contexto||"ninguno"}

Responde SOLO en JSON con esta estructura exacta (sin markdown, sin texto extra):
{
  "titulo": "Título de la sesión",
  "inicio": { "duracion": "X min", "actividades": ["actividad 1", "actividad 2"] },
  "desarrollo": { "duracion": "X min", "actividades": ["actividad 1", "actividad 2", "actividad 3"] },
  "cierre": { "duracion": "X min", "actividades": ["actividad 1", "actividad 2"] },
  "indicadores": ["indicador 1", "indicador 2", "indicador 3"],
  "recursos": ["recurso 1", "recurso 2", "recurso 3"],
  "oas_cubiertos": ["OA1","OA3"]
}`;

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages:[{ role:"user", content:prompt }] })
      });
      const data = await resp.json();
      const text = data.content?.map(c=>c.text||"").join("").replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(text);
      clearInterval(iv); setProgress(100);
      setTimeout(() => { setLoading(false); setResult(parsed); }, 300);
    } catch(e) {
      clearInterval(iv); setLoading(false);
      setResult({
        titulo:`Sesión de ${EJES[form.eje]} · ${NIVELES[form.nivel]}`,
        inicio:{ duracion:"15 min", actividades:["Movilidad articular progresiva en círculo", "Juego activador: chapas por posta"] },
        desarrollo:{ duracion:"60 min", actividades:["Circuito de 5 estaciones con rotación cada 12 min","Trote continuo, saltos escalera, burpees, carrera lateral, skipping","Registro de FC en cada pausa de rotación"] },
        cierre:{ duracion:"15 min", actividades:["Estiramiento estático guiado en parejas","Reflexión grupal: escala de esfuerzo Borg"] },
        indicadores:["Mantiene FC en zona aeróbica ≥65% del tiempo","Completa al menos 4 de 5 estaciones","Registra su percepción de esfuerzo correctamente"],
        recursos:["Escalera de coordinación","Conos (20)","Cronómetro / app Profe-EFI"],
        oas_cubiertos: selectedOAs.length ? selectedOAs : [oaList[0]?.id].filter(Boolean)
      });
    }
  };

  const guardar = () => {
    if (!result) return;
    mutate(d => {
      d.sesiones.push({ id:uid(), cursoId:curso.id, titulo:result.titulo, fecha: new Date().toISOString().slice(0,10),
        duracion:+form.duracion, espacio:form.espacio, eje:form.eje,
        oas:result.oas_cubiertos||[], estado:"planificada", generadaIA:true });
      return d;
    });
    alert("✅ Sesión guardada en Planificación");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <Card>
        <SectionTitle>Configuración · Bases curriculares MINEDUC Chile 2023</SectionTitle>
        <Grid cols={3} gap={10} style={{ marginBottom:12 }}>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Nivel</div>
            <Select value={form.nivel} onChange={e=>setForm(f=>({...f,nivel:e.target.value}))}>
              {Object.entries(NIVELES).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </Select></div>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Eje temático</div>
            <Select value={form.eje} onChange={e=>setForm(f=>({...f,eje:e.target.value}))}>
              {Object.entries(EJES).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </Select></div>
          <div><div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Duración</div>
            <Select value={form.duracion} onChange={e=>setForm(f=>({...f,duracion:e.target.value}))}>
              <option value="45">45 min</option><option value="90">90 min</option><option value="120">120 min</option>
            </Select></div>
        </Grid>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Espacio disponible</div>
          <Select value={form.espacio} onChange={e=>setForm(f=>({...f,espacio:e.target.value}))}>
            {["Cancha exterior","Gimnasio","Pista deportiva","Sala multiusos"].map(e=><option key={e}>{e}</option>)}
          </Select>
        </div>
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:12, color:"#8a93a8", marginBottom:8 }}>OA a trabajar (opcional — si no seleccionas, usa todos)</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {oaList.map(oa => (
              <button key={oa.id} onClick={()=>toggleOA(oa.id)}
                style={{ padding:"5px 10px", borderRadius:6, border:"1px solid", fontSize:12, cursor:"pointer",
                  background:selectedOAs.includes(oa.id)?"rgba(74,222,128,0.15)":"rgba(255,255,255,0.05)",
                  borderColor:selectedOAs.includes(oa.id)?"#4ade80":"rgba(255,255,255,0.1)",
                  color:selectedOAs.includes(oa.id)?"#4ade80":"#8a93a8" }}>
                {oa.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:12, color:"#8a93a8", marginBottom:4 }}>Contexto del grupo (opcional)</div>
          <Input value={form.contexto} onChange={e=>setForm(f=>({...f,contexto:e.target.value}))}
            placeholder="Ej: grupo con bajo nivel de resistencia, 3 alumnos con eximición..." />
        </div>
        <Btn onClick={generate} style={{ width:"100%", justifyContent:"center" }}>Generar sesión con IA</Btn>
      </Card>

      {loading && (
        <Card>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.1)", borderTopColor:"#4ade80", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
            <span style={{ fontSize:13, color:"#8a93a8" }}>Generando sesión con IA MINEDUC...</span>
          </div>
          <ProgressBar value={progress} />
          <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
        </Card>
      )}

      {result && (
        <Card style={{ borderColor:"rgba(74,222,128,0.2)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{result.titulo}</div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                {(result.oas_cubiertos||[]).map(o=><Tag key={o} color="green">{o}</Tag>)}
                <Tag color="blue">{EJES[form.eje]}</Tag>
                <Tag color="blue">{form.duracion} min</Tag>
              </div>
            </div>
            <Tag color="green">MINEDUC 2023</Tag>
          </div>

          {[
            { key:"inicio",     label:"Inicio",      color:"#4ade80" },
            { key:"desarrollo", label:"Desarrollo",  color:"#f97316" },
            { key:"cierre",     label:"Cierre",      color:"#60a5fa" },
          ].map(fase => (
            <div key={fase.key} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontWeight:600, fontSize:13, color:fase.color }}>{fase.label}</span>
                <Tag>{result[fase.key]?.duracion}</Tag>
              </div>
              {(result[fase.key]?.actividades||[]).map((a,i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:6, alignItems:"flex-start" }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:fase.color, color:"#0f1117", fontSize:10, fontWeight:700,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{i+1}</div>
                  <div style={{ fontSize:13, color:"#d1d5db", lineHeight:1.6 }}>{a}</div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ height:1, background:"rgba(255,255,255,0.07)", margin:"14px 0" }} />
          <Grid cols={2} gap={12}>
            <div>
              <div style={{ fontSize:11, color:"#4ade80", fontWeight:600, textTransform:"uppercase", marginBottom:8 }}>Indicadores de evaluación</div>
              {(result.indicadores||[]).map((ind,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontSize:12, color:"#d1d5db", alignItems:"flex-start" }}>
                  <span style={{ color:"#4ade80", flexShrink:0 }}>✓</span>{ind}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:11, color:"#60a5fa", fontWeight:600, textTransform:"uppercase", marginBottom:8 }}>Recursos y materiales</div>
              {(result.recursos||[]).map((r,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:6, fontSize:12, color:"#d1d5db", alignItems:"flex-start" }}>
                  <span style={{ color:"#60a5fa", flexShrink:0 }}>·</span>{r}
                </div>
              ))}
            </div>
          </Grid>

          <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
            <Btn onClick={guardar}>Guardar en planificación</Btn>
            <Btn variant="secondary" onClick={generate}>Regenerar</Btn>
            <Btn variant="secondary">Exportar PDF</Btn>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: SESIÓN EN VIVO
// ═══════════════════════════════════════════════════════════════════════════
function PageSesion({ db, curso, mutate }) {
  const sesiones = db.sesiones.filter(s=>s.cursoId===curso?.id);
  const proxima = sesiones.find(s=>s.estado==="planificada");
  const [activa, setActiva] = useState(false);
  const [etapa, setEtapa] = useState(0); // 0=inicio 1=desarrollo 2=cierre
  const [elapsed, setElapsed] = useState(0);
  const [notas, setNotas] = useState([]);
  const [notaInput, setNotaInput] = useState("");
  const [fc, setFc] = useState({ aerobica:18, moderada:7, alta:3 });
  const alumnos = db.alumnos.filter(a=>a.cursoId===curso?.id);
  const asistencia = useState(() => Object.fromEntries(alumnos.map(a=>[a.id,true])))[0];

  useEffect(() => {
    if (!activa) return;
    const iv = setInterval(() => setElapsed(e=>e+1), 60000);
    return () => clearInterval(iv);
  }, [activa]);

  const etapas = ["Inicio","Desarrollo","Cierre"];
  const etapaColors = ["#4ade80","#f97316","#60a5fa"];

  const addNota = () => {
    if (!notaInput.trim()) return;
    setNotas(prev => [...prev, { texto:notaInput, hora: new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"}) }]);
    setNotaInput("");
  };

  if (!proxima && !activa) return (
    <Card style={{ textAlign:"center", padding:48 }}>
      <div style={{ marginBottom:12, color:"#3d4557" }}><Play size={36} /></div>
      <div style={{ fontWeight:600, marginBottom:8 }}>No hay sesiones planificadas</div>
      <div style={{ color:"#8a93a8", fontSize:13 }}>Crea una sesión en Planificación o genera una con IA.</div>
    </Card>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      {/* Header sesión */}
      <div style={{ background: activa ? "linear-gradient(135deg,#1e3a2a,#1e2433)" : "#1e2433",
        border:`1px solid ${activa ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius:12, padding:"16px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <div>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{proxima?.titulo}</div>
            <div style={{ fontSize:12, color:"#8a93a8" }}>{curso?.nombre} · {alumnos.filter(a=>asistencia[a.id]!==false).length} alumnos · {proxima?.duracion} min</div>
          </div>
          {activa
            ? <div style={{ display:"flex", alignItems:"center", gap:6, color:"#f87171", fontSize:13, fontWeight:500 }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:"#f87171",animation:"pulse 1.5s infinite" }} />
                En curso · {elapsed} min
              </div>
            : <Btn onClick={()=>setActiva(true)}>Iniciar</Btn>
          }
        </div>
        {activa && (
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            {etapas.map((e,i) => (
              <button key={i} onClick={()=>setEtapa(i)}
                style={{ flex:1, padding:"8px 12px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:500,
                  background: etapa===i ? etapaColors[i] : "rgba(255,255,255,0.07)",
                  color: etapa===i ? "#0f1117" : "#8a93a8" }}>
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      {activa && (
        <>
          {/* FC */}
          <Card>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <SectionTitle>Frecuencias cardíacas · Grupo</SectionTitle>
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={()=>setFc(f=>({...f,aerobica:Math.min(f.aerobica+1,alumnos.length)}))}
                  style={{ background:"rgba(74,222,128,0.15)",border:"none",color:"#4ade80",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontSize:12 }}>+ Aeróbica</button>
              </div>
            </div>
            {[
              { label:"Zona aeróbica (65–85%)", count:fc.aerobica, color:"#4ade80" },
              { label:"Moderada (50–65%)",       count:fc.moderada, color:"#f97316" },
              { label:"Alta (>85%)",             count:fc.alta,     color:"#f87171" },
            ].map((z,i) => (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:12 }}>
                  <span style={{ color:"#8a93a8" }}>{z.label}</span>
                  <span style={{ fontWeight:600, color:z.color }}>{z.count} alumnos</span>
                </div>
                <ProgressBar value={z.count} max={alumnos.length} color={z.color} />
              </div>
            ))}
          </Card>

          {/* Asistencia rápida */}
          <Card>
            <SectionTitle>Asistencia · toca para marcar</SectionTitle>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {alumnos.map(a => {
                const [pres, setPres] = useState(true);
                return (
                  <button key={a.id} onClick={()=>setPres(p=>!p)}
                    style={{ padding:"5px 10px", borderRadius:6, border:"1px solid", fontSize:11, cursor:"pointer",
                      background:pres?"rgba(74,222,128,0.12)":"rgba(248,113,113,0.12)",
                      borderColor:pres?"#4ade80":"#f87171",
                      color:pres?"#4ade80":"#f87171" }}>
                    {a.nombre.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Notas */}
          <Card>
            <SectionTitle>Observaciones en vivo</SectionTitle>
            <div style={{ display:"flex", gap:8, marginBottom:12 }}>
              <Input value={notaInput} onChange={e=>setNotaInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addNota()}
                placeholder="Anota algo importante... (Enter para guardar)" />
              <Btn onClick={addNota} style={{ flexShrink:0 }}><Save size={14} /></Btn>
            </div>
            {notas.length === 0 && <div style={{ fontSize:12, color:"#8a93a8" }}>Sin observaciones aún</div>}
            {notas.map((n,i) => (
              <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", fontSize:13 }}>
                <span style={{ color:"#4ade80", fontSize:11, flexShrink:0, marginTop:1 }}>{n.hora}</span>
                <span style={{ color:"#d1d5db" }}>{n.texto}</span>
              </div>
            ))}
          </Card>

          <Btn variant="danger" onClick={()=>{ setActiva(false); setElapsed(0); setEtapa(0); setNotas([]); }}
            style={{ width:"100%", justifyContent:"center" }}>
            Finalizar sesión
          </Btn>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: ALUMNOS
// ═══════════════════════════════════════════════════════════════════════════
function PageAlumnos({ db, curso, mutate }) {
  const [modal, setModal] = useState(false);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({ nombre:"", rut:"", nota:6.0, asistencia:90, fc:72, estado:"regular" });
  const [search, setSearch] = useState("");
  const alumnos = db.alumnos.filter(a=>a.cursoId===curso?.id).filter(a=>
    a.nombre.toLowerCase().includes(search.toLowerCase()));
  const promedio = avg(alumnos.map(a=>a.nota));
  const asistProm = avg(alumnos.map(a=>a.asistencia));

  const openEdit = (a) => { setSel(a); setForm({nombre:a.nombre,rut:a.rut||"",nota:a.nota,asistencia:a.asistencia,fc:a.fc,estado:a.estado}); setModal(true); };
  const openNew  = () => { setSel(null); setForm({nombre:"",rut:"",nota:6.0,asistencia:90,fc:72,estado:"regular"}); setModal(true); };
  const save = () => {
    if (!form.nombre) return;
    mutate(d => {
      if (sel) {
        const i = d.alumnos.findIndex(a=>a.id===sel.id);
        if (i>=0) d.alumnos[i] = {...d.alumnos[i],...form,nota:+form.nota,asistencia:+form.asistencia,fc:+form.fc};
      } else {
        d.alumnos.push({ id:uid(), cursoId:curso.id, ...form, nota:+form.nota, asistencia:+form.asistencia, fc:+form.fc });
      }
      return d;
    });
    setModal(false);
  };
  const del = (id) => mutate(d => { d.alumnos = d.alumnos.filter(a=>a.id!==id); return d; });

  const avatarColor = (e) => ({ destacada:["rgba(74,222,128,0.15)","#4ade80"], regular:["rgba(96,165,250,0.15)","#60a5fa"], atencion:["rgba(251,191,36,0.15)","#fbbf24"] }[e]||["rgba(255,255,255,0.07)","#8a93a8"]);

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <SectionTitle>Alumnos · {curso?.nombre}</SectionTitle>
        <Btn onClick={openNew}>+ Agregar alumno</Btn>
      </div>

      <Grid cols={3} gap={10} style={{ marginBottom:14 }}>
        <Card><div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Promedio del curso</div><div style={{ fontSize:26,fontWeight:700,color:"#4ade80" }}>{promedio}</div></Card>
        <Card><div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Asistencia</div><div style={{ fontSize:26,fontWeight:700,color:"#60a5fa" }}>{asistProm}%</div></Card>
        <Card><div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Total alumnos</div><div style={{ fontSize:26,fontWeight:700,color:"#f0ff44" }}>{alumnos.length}</div></Card>
      </Grid>

      <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar alumno..." style={{ marginBottom:12 }} />

      <Card style={{ padding:0 }}>
        {alumnos.map((a,i) => {
          const [bg,tc] = avatarColor(a.estado);
          return (
            <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px",
              borderBottom: i<alumnos.length-1?"1px solid rgba(255,255,255,0.05)":"none" }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:bg,color:tc,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:600,fontSize:12,flexShrink:0 }}>
                {a.nombre.split(" ").map(n=>n[0]).join("").slice(0,2)}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:13, marginBottom:2 }}>{a.nombre}</div>
                <div style={{ fontSize:11, color:"#8a93a8" }}>Nota: {a.nota} · Asist: {a.asistencia}% · FC rep: {a.fc} bpm</div>
              </div>
              <Tag color={a.estado==="destacada"?"green":a.estado==="atencion"?"amber":"blue"}>{estadoLabel(a.estado)}</Tag>
              <button onClick={()=>openEdit(a)} style={{ background:"none",border:"none",color:"#8a93a8",cursor:"pointer",fontSize:15 }}><Pencil size={14} /></button>
              <button onClick={()=>del(a.id)} style={{ background:"none",border:"none",color:"#8a93a8",cursor:"pointer",fontSize:15 }}><Trash2 size={14} /></button>
            </div>
          );
        })}
        {alumnos.length===0 && <div style={{ padding:32,textAlign:"center",color:"#8a93a8" }}>Sin alumnos que coincidan</div>}
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title={sel?"Editar alumno":"Nuevo alumno"}>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Nombre completo</div>
            <Input value={form.nombre} onChange={e=>setForm(f=>({...f,nombre:e.target.value}))} placeholder="Nombre Apellido" /></div>
          <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>RUT</div>
            <Input value={form.rut} onChange={e=>setForm(f=>({...f,rut:e.target.value}))} placeholder="12.345.678-9" /></div>
          <Grid cols={3} gap={10}>
            <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Nota actual</div>
              <Input type="number" min="1" max="7" step="0.1" value={form.nota} onChange={e=>setForm(f=>({...f,nota:e.target.value}))} /></div>
            <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Asistencia %</div>
              <Input type="number" min="0" max="100" value={form.asistencia} onChange={e=>setForm(f=>({...f,asistencia:e.target.value}))} /></div>
            <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>FC reposo</div>
              <Input type="number" value={form.fc} onChange={e=>setForm(f=>({...f,fc:e.target.value}))} /></div>
          </Grid>
          <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Estado</div>
            <Select value={form.estado} onChange={e=>setForm(f=>({...f,estado:e.target.value}))}>
              <option value="regular">Regular</option>
              <option value="destacada">Destacada</option>
              <option value="atencion">Requiere atención</option>
            </Select></div>
          <Btn onClick={save} style={{ width:"100%",justifyContent:"center" }}>Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: TESTS Y MEDICIONES
// ═══════════════════════════════════════════════════════════════════════════
function PageTests({ db, curso, mutate }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ alumnoId:"", tipo:"cooper", valor:"", fecha: new Date().toISOString().slice(0,10) });
  const alumnos = db.alumnos.filter(a=>a.cursoId===curso?.id);
  const tests = db.tests.filter(t=>alumnos.some(a=>a.id===t.alumnoId));

  const TIPOS = { cooper:"Test de Cooper (m)", salto:"Salto en largo (m)", abd:"Abdominales (rep/min)", flexion:"Flexión (rep)", imc:"IMC" };

  const save = () => {
    if (!form.alumnoId || !form.valor) return;
    mutate(d => { d.tests.push({ id:uid(), ...form, valor:+form.valor, unidad: form.tipo==="cooper"?"m":form.tipo==="salto"?"m":"rep" }); return d; });
    setModal(false);
    setForm(f=>({...f,valor:"",alumnoId:""}));
  };
  const del = (id) => mutate(d=>{ d.tests=d.tests.filter(t=>t.id!==id); return d; });

  const byTipo = (tipo) => tests.filter(t=>t.tipo===tipo);
  const mejorCooper = byTipo("cooper").reduce((best,t)=>t.valor>best?t.valor:best,0);

  return (
    <div>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
        <SectionTitle>Test y mediciones · {curso?.nombre}</SectionTitle>
        <Btn onClick={()=>setModal(true)}>+ Registrar test</Btn>
      </div>

      {/* Resumen */}
      <Grid cols={3} gap={10} style={{ marginBottom:14 }}>
        <Card>
          <div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Test Cooper · promedio</div>
          <div style={{ fontSize:22,fontWeight:700,color:"#4ade80" }}>{avg(byTipo("cooper").map(t=>t.valor))} m</div>
          <div style={{ fontSize:11,color:"#8a93a8",marginTop:2 }}>Mejor: {mejorCooper>0?mejorCooper+"m":"—"}</div>
        </Card>
        <Card>
          <div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Salto en largo · promedio</div>
          <div style={{ fontSize:22,fontWeight:700,color:"#60a5fa" }}>{avg(byTipo("salto").map(t=>t.valor))} m</div>
        </Card>
        <Card>
          <div style={{ fontSize:11,color:"#8a93a8",marginBottom:4 }}>Test registrados</div>
          <div style={{ fontSize:22,fontWeight:700,color:"#f0ff44" }}>{tests.length}</div>
          <div style={{ fontSize:11,color:"#8a93a8",marginTop:2 }}>en este trimestre</div>
        </Card>
      </Grid>

      {/* Tabla */}
      <Card style={{ padding:0 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 80px 36px", gap:0,
          padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)", fontSize:11, color:"#8a93a8", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em" }}>
          <span>Alumno</span><span>Test</span><span>Resultado</span><span>Fecha</span><span></span>
        </div>
        {tests.length===0 && <div style={{ padding:32,textAlign:"center",color:"#8a93a8" }}>Sin test registrados aún</div>}
        {tests.map((t,i) => {
          const al = alumnos.find(a=>a.id===t.alumnoId);
          return (
            <div key={t.id} style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 80px 36px",gap:0,
              padding:"11px 16px",alignItems:"center",borderBottom:i<tests.length-1?"1px solid rgba(255,255,255,0.05)":"none",fontSize:13 }}>
              <span style={{ fontWeight:500 }}>{al?.nombre||"—"}</span>
              <Tag color="blue">{TIPOS[t.tipo]?.split("(")[0].trim()}</Tag>
              <span style={{ fontWeight:700,color:"#4ade80",fontSize:15 }}>{t.valor} <span style={{ fontSize:11,color:"#8a93a8",fontWeight:400 }}>{t.unidad}</span></span>
              <span style={{ fontSize:11,color:"#8a93a8" }}>{fmtFecha(t.fecha)}</span>
              <button onClick={()=>del(t.id)} style={{ background:"none",border:"none",color:"#8a93a8",cursor:"pointer",fontSize:14 }}><Trash2 size={14} /></button>
            </div>
          );
        })}
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title="Registrar test">
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Alumno</div>
            <Select value={form.alumnoId} onChange={e=>setForm(f=>({...f,alumnoId:e.target.value}))}>
              <option value="">Seleccionar...</option>
              {alumnos.map(a=><option key={a.id} value={a.id}>{a.nombre}</option>)}
            </Select></div>
          <Grid cols={2} gap={10}>
            <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Tipo de test</div>
              <Select value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}>
                {Object.entries(TIPOS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
              </Select></div>
            <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Resultado</div>
              <Input type="number" step="0.01" value={form.valor} onChange={e=>setForm(f=>({...f,valor:e.target.value}))} placeholder="Ej: 1840" /></div>
          </Grid>
          <div><div style={{ fontSize:12,color:"#8a93a8",marginBottom:4 }}>Fecha</div>
            <Input type="date" value={form.fecha} onChange={e=>setForm(f=>({...f,fecha:e.target.value}))} /></div>
          <Btn onClick={save} style={{ width:"100%",justifyContent:"center" }}>Guardar test</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: PIZARRA TÁCTICA
// ═══════════════════════════════════════════════════════════════════════════
function PagePizarra() {
  const canvasRef = useRef(null);
  const [sport, setSport] = useState("futbol");
  const [tool, setTool] = useState("jugador");
  const [jugNum, setJugNum] = useState(1);
  const [rivNum, setRivNum] = useState(1);
  const elementsRef = useRef([]);
  const dragging = useRef(null);
  const drawing = useRef(false);
  const startPos = useRef({x:0,y:0});
  const [playName, setPlayName] = useState("");
  const [plays, setPlays] = useState([]);
  const [, forceUpdate] = useState(0);

  const sportColors = { futbol:"#1a5c30", basquet:"#4a2a0a", voley:"#1a2a5c", handball:"#3a1a5c" };

  const drawField = useCallback((ctx, W, H) => {
    ctx.fillStyle = sportColors[sport];
    ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 1.5;
    const m = 18;
    if (sport==="futbol") {
      ctx.strokeRect(m,m,W-m*2,H-m*2);
      ctx.beginPath(); ctx.moveTo(W/2,m); ctx.lineTo(W/2,H-m); ctx.stroke();
      ctx.beginPath(); ctx.arc(W/2,H/2,52,0,Math.PI*2); ctx.stroke();
      const bw=W*0.15,bh=H*0.36;
      ctx.strokeRect(m,H/2-bh/2,bw,bh);
      ctx.strokeRect(W-m-bw,H/2-bh/2,bw,bh);
    } else if (sport==="basquet") {
      ctx.strokeRect(m,m,W-m*2,H-m*2);
      ctx.beginPath(); ctx.moveTo(W/2,m); ctx.lineTo(W/2,H-m); ctx.stroke();
      ctx.beginPath(); ctx.arc(W/2,H/2,52,0,Math.PI*2); ctx.stroke();
      const kw=W*0.18,kh=H*0.5;
      ctx.strokeRect(m,H/2-kh/2,kw,kh);
      ctx.strokeRect(W-m-kw,H/2-kh/2,kw,kh);
    } else if (sport==="voley") {
      ctx.strokeRect(m,m,W-m*2,H-m*2);
      ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(W/2,m); ctx.lineTo(W/2,H-m); ctx.stroke(); ctx.lineWidth=1.5;
      ctx.strokeRect(m,m,W*0.12,H-m*2);
      ctx.strokeRect(W-m-W*0.12,m,W*0.12,H-m*2);
    } else {
      ctx.strokeRect(m,m,W-m*2,H-m*2);
      ctx.beginPath(); ctx.moveTo(W/2,m); ctx.lineTo(W/2,H-m); ctx.stroke();
      const gw=W*0.1,gh=H*0.35;
      ctx.strokeRect(m,H/2-gh/2,gw,gh);
      ctx.strokeRect(W-m-gw,H/2-gh/2,gw,gh);
    }
  }, [sport]);

  const drawElement = (ctx, el) => {
    ctx.save();
    if (el.type==="jugador"||el.type==="rival") {
      ctx.fillStyle = el.type==="jugador"?"#3b82f6":"#ef4444";
      ctx.beginPath(); ctx.arc(el.x,el.y,14,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "white"; ctx.font="bold 10px Inter,sans-serif";
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(el.num||"",el.x,el.y);
    } else if (el.type==="flecha"||el.type==="pase") {
      const col = el.type==="pase"?"#f97316":"white";
      ctx.strokeStyle=col; ctx.lineWidth=2;
      if (el.type==="pase") ctx.setLineDash([7,4]); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(el.x1,el.y1); ctx.lineTo(el.x2,el.y2); ctx.stroke();
      const ang=Math.atan2(el.y2-el.y1,el.x2-el.x1);
      ctx.setLineDash([]); ctx.fillStyle=col;
      ctx.beginPath();
      ctx.moveTo(el.x2,el.y2);
      ctx.lineTo(el.x2-12*Math.cos(ang-0.4),el.y2-12*Math.sin(ang-0.4));
      ctx.lineTo(el.x2-12*Math.cos(ang+0.4),el.y2-12*Math.sin(ang+0.4));
      ctx.closePath(); ctx.fill();
    } else if (el.type==="zona") {
      ctx.fillStyle="rgba(240,255,68,0.18)"; ctx.strokeStyle="rgba(240,255,68,0.7)"; ctx.lineWidth=1.5;
      ctx.fillRect(el.x,el.y,el.w,el.h); ctx.strokeRect(el.x,el.y,el.w,el.h);
    } else if (el.type==="texto") {
      ctx.fillStyle="white"; ctx.font="bold 13px Inter,sans-serif"; ctx.textAlign="left";
      ctx.fillText(el.text||"",el.x,el.y);
    }
    ctx.restore();
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext("2d");
    drawField(ctx, canvas.width, canvas.height);
    elementsRef.current.forEach(el => drawElement(ctx, el));
  }, [drawField]);

  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    canvas.width = canvas.offsetWidth || 560;
    canvas.height = 340;
    loadFormation("4-3-3");
    redraw();
  }, [sport]);

  const loadFormation = (f) => {
    const W = canvasRef.current?.width||560, H = canvasRef.current?.height||340;
    const formations = {
      "4-3-3":[[.5,.9],[.2,.75],[.38,.75],[.62,.75],[.8,.75],[.25,.55],[.5,.52],[.75,.55],[.22,.3],[.5,.22],[.78,.3]],
      "4-4-2":[[.5,.9],[.2,.75],[.38,.75],[.62,.75],[.8,.75],[.18,.55],[.4,.55],[.6,.55],[.82,.55],[.38,.3],[.62,.3]],
      "3-5-2":[[.5,.9],[.25,.72],[.5,.7],[.75,.72],[.15,.52],[.35,.5],[.5,.48],[.65,.5],[.85,.52],[.38,.28],[.62,.28]],
    };
    const pts = formations[f]||[];
    elementsRef.current = pts.map((([rx,ry],i) => ({ type:"jugador",x:rx*W,y:ry*H,num:i+1 })));
    setJugNum(pts.length+1); setRivNum(1);
    redraw();
  };

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const src = e.touches?.[0]||e;
    return { x:src.clientX-r.left, y:src.clientY-r.top };
  };

  const onDown = (e) => {
    const {x,y} = getPos(e);
    if (tool==="borrar") {
      elementsRef.current = elementsRef.current.filter(el=>!(el.type==="jugador"||el.type==="rival")||Math.hypot(el.x-x,el.y-y)>16);
      redraw(); return;
    }
    const hit = elementsRef.current.findLast(el=>(el.type==="jugador"||el.type==="rival")&&Math.hypot(el.x-x,el.y-y)<16);
    if (hit && (tool==="jugador"||tool==="rival")) { dragging.current={el:hit,ox:x-hit.x,oy:y-hit.y}; return; }
    if (tool==="jugador") {
      elementsRef.current.push({type:"jugador",x,y,num:jugNum});
      setJugNum(n=>n+1); redraw(); return;
    }
    if (tool==="rival") {
      elementsRef.current.push({type:"rival",x,y,num:rivNum});
      setRivNum(n=>n+1); redraw(); return;
    }
    drawing.current=true; startPos.current={x,y};
  };
  const onMove = (e) => {
    const {x,y}=getPos(e);
    if (dragging.current) { dragging.current.el.x=x-dragging.current.ox; dragging.current.el.y=y-dragging.current.oy; redraw(); return; }
    if (!drawing.current) return;
    redraw();
    const ctx=canvasRef.current.getContext("2d");
    const {x:sx,y:sy}=startPos.current;
    if (tool==="flecha"||tool==="pase") drawElement(ctx,{type:tool,x1:sx,y1:sy,x2:x,y2:y});
    if (tool==="zona") drawElement(ctx,{type:"zona",x:sx,y:sy,w:x-sx,h:y-sy});
  };
  const onUp = (e) => {
    if (dragging.current) { dragging.current=null; return; }
    if (!drawing.current) return;
    drawing.current=false;
    const {x,y}=getPos(e);
    const {x:sx,y:sy}=startPos.current;
    if (tool==="flecha"||tool==="pase") elementsRef.current.push({type:tool,x1:sx,y1:sy,x2:x,y2:y});
    else if (tool==="zona") elementsRef.current.push({type:"zona",x:sx,y:sy,w:x-sx,h:y-sy});
    redraw();
  };

  const tools = [
    { id:"jugador", icon:"🔵", label:"Jugador" },
    { id:"rival",   icon:"🔴", label:"Rival"   },
    { id:"flecha",  icon:"➡️", label:"Movimiento" },
    { id:"pase",    icon:"🟠", label:"Pase"    },
    { id:"zona",    icon:"⬜", label:"Zona"    },
    { id:"borrar",  icon:"eraser", label:"Borrar"  },
  ];

  return (
    <div>
      <div style={{ display:"flex",gap:6,marginBottom:12,flexWrap:"wrap" }}>
        {[["futbol","Fútbol"],["basquet","Básquetbol"],["voley","Vóleibol"],["handball","Handball"]].map(([s,l])=>(
          <button key={s} onClick={()=>setSport(s)}
            style={{ padding:"6px 14px",borderRadius:8,border:"1px solid",fontSize:13,cursor:"pointer",
              background:sport===s?"#1e6b3a":"transparent",borderColor:sport===s?"#4ade80":"rgba(255,255,255,0.1)",color:sport===s?"white":"#8a93a8" }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",marginBottom:10,background:"#1a5c30" }}>
        <canvas ref={canvasRef} style={{ display:"block",width:"100%",height:340,cursor:"crosshair",touchAction:"none" }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp}
          onTouchStart={e=>{e.preventDefault();onDown(e);}} onTouchMove={e=>{e.preventDefault();onMove(e);}} onTouchEnd={onUp} />
      </div>

      <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:10 }}>
        {tools.map(t=>(
          <button key={t.id} onClick={()=>setTool(t.id)}
            style={{ padding:"6px 12px",borderRadius:8,border:"1px solid",fontSize:12,cursor:"pointer",
              background:tool===t.id?"#1e6b3a":"rgba(255,255,255,0.05)",
              borderColor:tool===t.id?"#4ade80":"rgba(255,255,255,0.1)",
              color:tool===t.id?"white":"#8a93a8" }}>
            {t.icon} {t.label}
          </button>
        ))}
        <div style={{ flex:1 }} />
        {["4-3-3","4-4-2","3-5-2"].map(f=>(
          <button key={f} onClick={()=>loadFormation(f)}
            style={{ padding:"6px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#8a93a8",fontSize:12,cursor:"pointer" }}>
            {f}
          </button>
        ))}
        <button onClick={()=>{elementsRef.current=[];setJugNum(1);setRivNum(1);redraw();}}
          style={{ padding:"6px 12px",borderRadius:8,border:"1px solid rgba(248,113,113,0.3)",background:"rgba(248,113,113,0.08)",color:"#f87171",fontSize:12,cursor:"pointer" }}>
          Limpiar
        </button>
      </div>

      <Card>
        <SectionTitle>Guardar jugada</SectionTitle>
        <div style={{ display:"flex",gap:8 }}>
          <Input value={playName} onChange={e=>setPlayName(e.target.value)} placeholder="Nombre de la jugada..." />
          <Btn onClick={()=>{ if(!playName.trim())return; setPlays(p=>[...p,playName]); setPlayName(""); }} style={{ flexShrink:0 }}>Guardar</Btn>
        </div>
        {plays.length>0 && (
          <div style={{ marginTop:12,display:"flex",flexWrap:"wrap",gap:6 }}>
            {plays.map((p,i)=><Tag key={i} color="green">{p}</Tag>)}
          </div>
        )}
      </Card>
    </div>
  );
}
