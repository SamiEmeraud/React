// Routes / Route : associe une URL à un composant
import { Routes, Route } from 'react-router'
import Layout from './composants/Layout.jsx'
import Inscription from './composants/Inscription.jsx'
import Connexion from './composants/Connexion.jsx'
import Boutique from './composants/Boutique.jsx'
import Accueil from './composants/Accueil.jsx'
import Panier from './composants/Panier.jsx'
import AjoutProduit from './composants/AjoutProduit.jsx'

function App() {
  return (
    <Routes>
      {/* Layout entoure toutes les pages : en-tête + pied de page
          Cette route "parente" n'a pas de path : elle ne correspond à aucune adresse,
          elle sert seulement de cadre. Les routes à l'intérieur sont ses "enfants" :
          celle qui correspond à l'URL s'affiche à la place de <Outlet /> dans Layout.jsx */}
      <Route element={<Layout />}>
        {/* Page d'accueil : le formulaire d'inscription */}
        <Route path="/" element={<Inscription />} />
        {/* Page de connexion (lien "Se connecter") */}
        <Route path="/authentification" element={<Connexion />} />
        {/* Page d'accueil affichée après la connexion */}
        <Route path="/accueil" element={<Accueil />} />
        {/* Les produits */}
        <Route path="/boutique" element={<Boutique />} />
        {/* Récapitulatif du panier */}
        <Route path="/panier" element={<Panier />} />
        {/* Ajout de produits : réservé à l'admin */}
        <Route path="/admin/produits" element={<AjoutProduit />} />
      </Route>
    </Routes>
  )
}

export default App
