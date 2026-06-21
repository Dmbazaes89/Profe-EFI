import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Ocultar splash cuando React esté listo
if (window.__hideSplash) {
  setTimeout(window.__hideSplash, 600)
}

// Registrar Service Worker (lo maneja vite-plugin-pwa automáticamente)
