import { useMemo } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../Contexte/useAuth.js";
import styles from "./Panier.module.css";

// Page Panier (/panier) : récapitulatif de commande
function Panier() {

  const { utilisateur, panier, retirer } = useAuth();

  // ===== useMemo =====
  
  const total = useMemo(() => panier.reduce((somme, a) => somme + a.prix * a.quantite, 0), [panier]);

  if (!utilisateur) return <Navigate to="/authentification" />;

  return (
    <main className={styles.page}>
      <p className={styles.surtitre}>VOTRE SÉLECTION</p>
      <h1 className={styles.titre}>Récapitulatif de commande</h1>
      <p className={styles.texte}>Retrouve ici les produits que tu as ajoutés à ton panier.</p>

      <section className={styles.carte}>
        <h2 className={styles.sousTitre}>
          Mon panier <span className={styles.compteur}>{panier.length}</span>
        </h2>

        {panier.length === 0 && <p className={styles.vide}>Votre panier est vide.</p>}

        {panier.map((a) => (
          <div key={a.id} className={styles.ligne}>
            <span>{a.nom} × {a.quantite}</span>
            <span>
              {(a.prix * a.quantite).toFixed(2)} €
              <button type="button" className={styles.boutonRetirer} onClick={() => retirer(a.id)}>✕</button>
            </span>
          </div>
        ))}

        {/* toFixed(2) : 2 chiffres après la virgule (44.98999... -> "44.99") */}
        <p className={styles.total}>Total : <strong>{total.toFixed(2)} €</strong></p>
        <button type="button" className={styles.boutonCommander} disabled={panier.length === 0}>Commander</button>
      </section>

      <Link to="/boutique" className={styles.continuer}>Continuer mes achats</Link>
    </main>
  );
}

export default Panier;
