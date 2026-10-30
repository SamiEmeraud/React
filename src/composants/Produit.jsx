import { useState, memo } from "react";
import styles from "./Produit.module.css";

// Carte d'un produit ; produit = { id, nom, prix }
// PROPS : onAjouter = fonction (du contexte) qui ajoute au panier
function Produit({ produit, onAjouter }) {
  // ===== useState =====
  // Quantité choisie sur CETTE carte
  const [quantite, setQuantite] = useState(1);

  return (
    <article className={styles.carte}>
      {/* Initiale du produit ("Clavier" -> "C") */}
      <div className={styles.image}>{produit.nom[0]}</div>
      <h3 className={styles.nom}>{produit.nom}</h3>
      <p className={styles.prix}>{produit.prix} €</p>

      <div className={styles.quantite}>
        {/* Math.max : on ne descend jamais sous 1 */}
        <button type="button" className={styles.boutonQuantite} onClick={() => setQuantite(Math.max(1, quantite - 1))}>−</button>
        <span className={styles.valeurQuantite}>{quantite}</span>
        <button type="button" className={styles.boutonQuantite} onClick={() => setQuantite(quantite + 1)}>+</button>
      </div>

      <button type="button" className={styles.boutonAjouter} onClick={() => { onAjouter(produit, quantite); setQuantite(1); }}>
        Ajouter au panier
      </button>
    </article>
  );
}

// memo : la carte n'est ré-affichée que si ses props changent
// (marche car onAjouter garde la même référence grâce à useCallback)
export default memo(Produit);
