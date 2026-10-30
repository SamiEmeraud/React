import { Link, Navigate } from "react-router";
import { useAuth } from "../Contexte/useAuth.js";
import styles from "./Accueil.module.css";

// Page d'accueil affichée juste après la connexion
function Accueil() {
  // ===== useAuth (hook personnalisé qui lit le contexte) =====
  // Utilisateur connecté ({ id, prenom } ou null), fourni par UserProvider
  const { utilisateur } = useAuth();

  // Pas connecté : retour à la page de connexion
  // <Navigate> redirige dès qu'il est affiché : c'est une protection de la page
  if (!utilisateur) return <Navigate to="/authentification" />;

  return (
    <main className={styles.page}>
      <section className={styles.carte}>
        <h1 className={styles.titre}>Bienvenue, {utilisateur.prenom} !</h1>
        <p className={styles.texte}>Vous êtes connecté à votre espace client instae-commerce.</p>

        {/* Lien vers les produits et le panier */}
        <Link to="/boutique" className={styles.bouton}>Voir les produits</Link>
      </section>
    </main>
  );
}

export default Accueil;
