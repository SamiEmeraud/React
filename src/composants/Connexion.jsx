import { useState } from "react";
import { useAuth } from "../Contexte/useAuth.js";
import { Link, useNavigate } from "react-router";
import styles from "./Connexion.module.css";

function Connexion() {
  // État des deux champs du formulaire
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [erreur, setErreur] = useState("");
  
  const [utilisateur, setUtilisateur] = useState(null);

  const navigate = useNavigate();
 
  const { connecter } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    // Empêche le rechargement de la page
    e.preventDefault();

    try {
    
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      // Lit la réponse JSON : { id, prenom } ou { message }
      const data = await res.json();

      if (!res.ok) {
       
        setErreur(res.status === 401 ? "Adresse e-mail ou mot de passe incorrect." : data.message);
        setUtilisateur(null);
        return;
      }

     
      setErreur("");
      setUtilisateur(data);
     
      connecter(data);
      // Redirige vers la boutique
      navigate("/boutique");
    } catch {
     
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setUtilisateur(null);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.titre}>Se connecter</h1>

        {/* Zone du message d'erreur global, en haut du formulaire (maquette M2) */}
        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {/* Message de bienvenue avec l'identifiant renvoyé par le serveur */}
        {utilisateur && (
          <p className={styles.succes}>
            Bienvenue {utilisateur.prenom} ! (identifiant : {utilisateur.id})
          </p>
        )}

        {/* Champ Adresse e-mail */}
        <div className={styles.champ}>
          <label htmlFor="email" className={styles.label}>Adresse e-mail</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="exemple@mail.fr"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Champ Mot de passe */}
        <div className={styles.champ}>
          <label htmlFor="password" className={styles.label}>Mot de passe</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* US-05 : la page "mot de passe oublié" n'existe pas encore */}
        <a href="#" className={styles.oublie}>Mot de passe oublié ?</a>

        <button type="submit" className={styles.boutonPrincipal}>Se connecter</button>

        {/* Ligne de séparation */}
        <hr className={styles.separateur} />

        <p className={styles.question}>Pas encore de compte ?</p>
        {/* Lien vers l'inscription, affiché comme un bouton à contour bleu */}
        <Link to="/" className={styles.boutonSecondaire}>Créer un compte</Link>
      </form>
    </main>
  );
}

// Exporte le composant pour l'utiliser dans App.jsx
export default Connexion;
