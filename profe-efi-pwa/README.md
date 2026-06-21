# Profe-EFI — Setup y despliegue

## Estructura del proyecto
```
profe-efi-pwa/
├── index.html          ← entry point con meta PWA
├── vite.config.js      ← Vite + PWA plugin
├── package.json
└── src/
    ├── main.jsx        ← React root
    ├── App.jsx         ← App completa (todos los módulos)
    └── index.css       ← estilos globales + variables
```

---

## 1. Correr en local (tu computadora)

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```
Abre http://localhost:5173

---

## 2. Build para producción

```bash
npm run build
```
Genera la carpeta `dist/` lista para subir.

---

## 3. Desplegar en Vercel (gratis, recomendado)

### Opción A — desde GitHub (recomendada)
1. Sube la carpeta `profe-efi-pwa/` a un repo de GitHub
2. Ve a https://vercel.com → New Project
3. Importa el repo
4. Vercel detecta Vite automáticamente
5. Click en **Deploy**
6. En ~60 segundos tienes URL pública: `profe-efi.vercel.app`

### Opción B — desde terminal con Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 4. Instalar como app en tu Xiaomi HyperOS

1. Abre Chrome en el Xiaomi
2. Entra a la URL de Vercel
3. Toca los **tres puntos** (menú) → **"Añadir a pantalla de inicio"**
4. Confirma → la app aparece como ícono nativo
5. Desde ahí funciona sin barra del navegador, como app real

> **Nota HyperOS 2.0:** Si Chrome no muestra el banner automático de instalación,
> usa el menú manual (tres puntos → Añadir a pantalla de inicio).
> HyperOS bloquea banners automáticos por política de seguridad.

---

## 5. Variable de entorno para la API de Claude (IA MINEDUC)

La app llama a la API de Anthropic desde el cliente.
Para producción, necesitas una API key:

1. Ve a https://console.anthropic.com → API Keys
2. Crea una key
3. En Vercel → Settings → Environment Variables:
   ```
   VITE_ANTHROPIC_KEY=sk-ant-...
   ```
4. En `src/App.jsx`, en la función `generate()`, agrega el header:
   ```js
   "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
   "anthropic-version": "2023-06-01",
   "anthropic-dangerous-direct-browser-access": "true",
   ```

---

## 6. Módulos disponibles

| Módulo       | Descripción                                      |
|-------------|--------------------------------------------------|
| Inicio      | Dashboard: métricas, próxima sesión, alertas     |
| Plan        | Crear y gestionar sesiones con OA MINEDUC        |
| IA MINEDUC  | Generar planificaciones con Claude API           |
| Sesión      | Modo en vivo: FC, asistencia, notas al vuelo     |
| Alumnos     | Ficha, notas, asistencia, estado                 |
| Tests       | Cooper, salto, abdominales — registro y promedios|
| Pizarra     | Canvas táctica: fútbol, básquet, vóleibol, handball |

---

## 7. Stack técnico

- **Frontend:** React 18 + Vite 5
- **PWA:** vite-plugin-pwa (Workbox)
- **Íconos:** Lucide React
- **Estilos:** CSS-in-JS (inline styles) + index.css
- **Datos:** localStorage (MVP) → migrar a Supabase
- **IA:** Anthropic Claude API (claude-sonnet-4-6)
- **Deploy:** Vercel (gratuito)
