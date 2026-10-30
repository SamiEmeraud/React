import { useRef, useEffect } from "react";
import styles from "./BarreRecherche.module.css";

// Champ de recherche ; la valeur est gardée par le parent (Boutique)
// PROPS : valeur = texte tapé ; onChange = fonction qui met à jour ce texte
function BarreRecherche({ valeur, onChange }) {
  // ===== useRef =====
  // Référence vers l'<input> (changer une ref ne relance pas l'affichage)
  const inputRef = useRef(null);

  // ===== useEffect =====
  // À l'arrivée sur la page : curseur dans la recherche
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={styles.recherche}>
      <label htmlFor="recherche" className={styles.label}>Rechercher un produit</label>
      <input
        ref={inputRef}
        id="recherche"
        className={styles.input}
        type="text"
        placeholder="Rechercher un produit..."
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default BarreRecherche;
