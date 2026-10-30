import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// BrowserRouter : active la navigation (nécessaire pour <Link> dans Inscription)
import { BrowserRouter } from 'react-router'
import './index.css'
// Le site : inscription, connexion, accueil, boutique
import App from './App.jsx'
// useContext : fournit l'utilisateur connecté à toutes les pages
import UserProvider from './Contexte/UserProvider.jsx'

// Exemples du cours (remplacer <App /> plus bas par l'un d'eux pour les voir,
// et enlever <StrictMode> pour ne pas avoir les messages en double dans la console) :
// import Parents from './Props/Exemple2/Parents.jsx'
// import SansUseMemo from './usememo/SansUseMemo.jsx'
// import AvecUseMemo from './usememo/AvecUseMemo.jsx'
// import Exemple3 from './UseCallback/Exemple3.jsx'
// import Exemple4 from './UseCallback/Exemple4.jsx'
import App_hold from './App_hold.jsx'
// Point de départ de React :
// - document.getElementById('root') récupère la <div id="root"> vide de index.html
// - createRoot(...) : React prend le contrôle de cette zone de la page
// - .render(...) : affiche l'application dedans
// - StrictMode : vérifications en plus pendant le développement (sans effet sur l'affichage ;
//   il peut exécuter deux fois les effets au démarrage, c'est normal en mode dev)
// - BrowserRouter : placé une seule fois, autour de toute l'application
// - UserProvider : placé autour de <App /> pour que toutes les pages lisent l'utilisateur
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        {/* <App_hold /> */}
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
