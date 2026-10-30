// Link : lien sans rechargement ; Outlet : emplacement de la page affichée
import { Link, Outlet, useNavigate } from "react-router";
import { useAuth } from "../Contexte/useAuth.js";
import styles from "./Layout.module.css";

// Mise en page commune à toutes les pages : en-tête + contenu + pied de page
function Layout() {
  // useNavigate() renvoie une fonction pour changer de page depuis le code
  const navigate = useNavigate();

  const { utilisateur, deconnecter } = useAuth();

  // Déconnexion : oublie l'utilisateur et son panier, retour à la connexion
  const deconnexion = () => {
    deconnecter();
    navigate("/authentification");
  };

  return (
    <div className={styles.layout}>
      <header className={styles.entete}>
        {/* Le logo ramène à l'accueil (ou à l'inscription si pas connecté) */}
        <Link to={utilisateur ? "/accueil" : "/"} className={styles.logo}>instae-commerce</Link>

        {/* Ternaire : utilisateur ? (affichage connecté) : (affichage non connecté) */}
        {utilisateur ? (
          // Connecté : navigation + déconnexion
          <nav className={styles.nav}>
            <Link to="/accueil" className={styles.lien}>Accueil</Link>
            <Link to="/boutique" className={styles.lien}>Boutique</Link>
            <Link to="/panier" className={styles.lien}>Panier</Link>
            {/* Lien visible seulement pour l'admin */}
            {utilisateur.role === "admin" && (
              <Link to="/admin/produits" className={styles.lien}>Ajouter un produit</Link>
            )}
            <button type="button" className={styles.deconnexion} onClick={deconnexion}>
              Se déconnecter
            </button>
          </nav>
        ) : (
          // Pas connecté : seulement "Panier" (page protégée -> renvoie à la connexion)
          <Link to="/panier" className={styles.lien}>Panier</Link>
        )}
      </header>

      {/* La page de la route actuelle (Inscription, Connexion...) s'affiche ici
          Outlet = emplacement réservé par React Router pour les routes "enfants"
          déclarées dans App.jsx à l'intérieur de <Route element={<Layout />}> */}
      <Outlet />

      <footer className={styles.pied}>
        © 2026 instae-commerce
        {/* Masqué sur mobile, comme dans la maquette M2 */}
        <span className={styles.liensPied}> · Mentions légales · Contact</span>
      </footer>
    </div>
  );
}

export default Layout;
