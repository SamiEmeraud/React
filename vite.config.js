import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // react() : permet à Vite de transformer le JSX en JavaScript
    react(),
    // React Compiler : optimise automatiquement les rendus des composants.
    // Il mémorise des calculs : c'est pourquoi le Layout relit localStorage dans un
    // useEffect (sinon la lecture pouvait rester "en mémoire" et l'en-tête ne changeait pas)
    babel({ presets: [reactCompilerPreset()] })
  ],

  // "server" (en anglais) : options du serveur de dev Vite
  server: {
    // Redirige toutes les requêtes /api vers le backend Express
    // Ex. : fetch("/api/produits") dans React (port 5173) est transmis à
    // http://localhost:3000/api/produits. C'est le pont entre le frontend et le backend.
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
})
