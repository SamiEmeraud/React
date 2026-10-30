import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../Contexte/useAuth.js";
import styles from "./AjoutProduit.module.css";

// Page /admin/produits : formulaire pour ajouter un produit au catalogue
// (remplace l'ajout à la main dans DB Browser). Réservée à l'admin.
function AjoutProduit() {
  // ===== useAuth =====
  const { utilisateur } = useAuth();

  // ===== useState =====
  // Valeurs des champs du formulaire
  const [form, setForm] = useState({ nom: "", prix: "", image: "" });
  const [erreur, setErreur] = useState("");
  // Dernier produit ajouté (pour afficher le message de succès)
  const [ajoute, setAjoute] = useState(null);

  // Protection de la page : pas connecté -> connexion ; pas admin -> boutique
  if (!utilisateur) return <Navigate to="/authentification" />;
  if (utilisateur.role !== "admin") return <Navigate to="/boutique" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Vérification côté navigateur avant d'appeler le serveur
    if (!form.nom.trim() || !(Number(form.prix) > 0)) {
      setErreur("Indique un nom et un prix supérieur à 0.");
      setAjoute(null);
      return;
    }

    try {
      // POST /api/produits : envoie le produit + l'id de l'utilisateur,
      // le serveur vérifie dans la base qu'il est bien admin
      const res = await fetch("/api/produits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, utilisateurId: utilisateur.id }),
      });
      // Lit la réponse JSON : le produit créé ou { message }
      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message);
        setAjoute(null);
        return;
      }

      // Succès : message + formulaire vidé pour en ajouter un autre
      setErreur("");
      setAjoute(data);
      setForm({ nom: "", prix: "", image: "" });
    } catch {
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setAjoute(null);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <p className={styles.surtitre}>ADMINISTRATION</p>
        <h1 className={styles.titre}>Ajouter un produit</h1>

        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {ajoute && (
          <p className={styles.succes}>
            « {ajoute.nom} » ajouté à {ajoute.prix} € (identifiant : {ajoute.id})
          </p>
        )}

        {/* Champ Nom */}
        <div className={styles.champ}>
          <label htmlFor="nom" className={styles.label}>Nom du produit</label>
          <input
            className={styles.input}
            type="text"
            id="nom"
            name="nom"
            placeholder="Ex. : Écran"
            value={form.nom}
            onChange={handleChange}
          />
        </div>

        {/* Champ Prix */}
        <div className={styles.champ}>
          <label htmlFor="prix" className={styles.label}>Prix (€)</label>
          <input
            className={styles.input}
            type="number"
            id="prix"
            name="prix"
            min="0.01"
            step="0.01"
            placeholder="Ex. : 19.99"
            value={form.prix}
            onChange={handleChange}
          />
        </div>

        {/* Champ Image (facultatif) : chemin ou adresse d'une image */}
        <div className={styles.champ}>
          <label htmlFor="image" className={styles.label}>Image (facultatif)</label>
          <input
            className={styles.input}
            type="text"
            id="image"
            name="image"
            placeholder="/images/ecran.jpg ou https://..."
            value={form.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.boutonPrincipal}>Ajouter le produit</button>

        <Link to="/boutique" className={styles.lienBoutique}>Voir la boutique</Link>
      </form>
    </main>
  );
}

export default AjoutProduit;
