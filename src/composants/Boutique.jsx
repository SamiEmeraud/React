import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Contexte/useAuth.js";
import BarreRecherche from "./BarreRecherche.jsx";
import Produit from "./Produit.jsx";
import styles from "./Boutique.module.css";

function Boutique() {

  const { utilisateur, ajouter } = useAuth();

  // ===== useState =====
  const [produits, setProduits] = useState([]);
  const [recherche, setRecherche] = useState("");


  useEffect(() => {
    fetch("/api/produits")
      .then((res) => res.json())
      .then((liste) => setProduits(liste));
  }, []);


  const produitsFiltres = useMemo(
    () => produits.filter((p) => p.nom.toLowerCase().includes(recherche.toLowerCase())),
    [produits, recherche]
  );

  // Pas connecté : retour à la connexion (après les hooks : règle des hooks)
  if (!utilisateur) return <Navigate to="/authentification" />;

  return (
    <main className={styles.boutique}>
      <p className={styles.surtitre}>INSTA-E-COMMERCE</p>
      <h1 className={styles.titre}>La boutique</h1>
      <p className={styles.texte}>Découvre notre sélection de périphériques pour ton espace de jeu et de travail.</p>

      <h2 className={styles.sousTitre}>Nos produits</h2>
      <div className={styles.ligneRecherche}>
        {/* PROPS : la valeur et la fonction pour la changer */}
        <BarreRecherche valeur={recherche} onChange={setRecherche} />
        <span className={styles.nombre}>{produitsFiltres.length} produits</span>
      </div>

      <div className={styles.grille}>
        {produitsFiltres.map((p) => (
          <Produit key={p.id} produit={p} onAjouter={ajouter} />
        ))}
      </div>
    </main>
  );
}

export default Boutique;
