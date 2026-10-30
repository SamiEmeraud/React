
import { useState } from "react";

import { Link } from "react-router";

import styles from "./Inscription.module.css";


function Inscription() {

  const [form, setForm] = useState({
    nom: "",            // valeur initiale vide
    prenom: "",
    email: "",
    password: "",
    confirmation: "",   // confirmation du mot de passe
    cgu: false,         // case à cocher : booléen
  });

  // État du message d'erreur ("" = pas d'erreur)
  const [erreur, setErreur] = useState("");
 
  const [succes, setSucces] = useState(false);

  // Gestionnaire appelé à chaque modification d'un champ
  const handleChange = (e) => {
    // Extrait les propriétés utiles du champ qui a changé (déstructuration)
    const { name, value, type, checked } = e.target;
    // Met à jour l'état avec un nouvel objet (prev = ancien état)
    setForm((prev) => ({
      ...prev,  // recopie tous les champs existants
      // [name] : clé dynamique (nom, email...) ; une checkbox donne "checked", les autres "value"
      [name]: type === "checkbox" ? checked : value,
    }));
    // Affiche le champ modifié dans la console (y compris le mot de passe en clair)
    console.log(e.target.name, e.target.value);
  };

  // Fonction appelée à l'envoi du formulaire ; async pour pouvoir utiliser await
  const handleSubmit = async (e) => {
    // Empêche le rechargement de la page (comportement par défaut d'un formulaire)
    e.preventDefault();

    // try/catch : intercepte les erreurs réseau
    try {
      // Envoie la requête au backend et attend la réponse
      const res = await fetch("/api/inscription", {
        method: "POST",                                    // envoi de données
        headers: { "Content-Type": "application/json" },   // le corps est du JSON
        // Convertit l'objet en texte JSON ; confirmation et cgu ne sont pas envoyés
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          password: form.password,
        }),
      });
      // Lit le corps de la réponse et le convertit en objet JavaScript
      const data = await res.json();

      // res.ok vaut false pour tout code HTTP hors 200-299 (400, 409, 500...)
      if (!res.ok) {
        // Affiche le message renvoyé par le serveur
        setErreur(data.message);
        // Masque un éventuel message de succès précédent
        setSucces(false);
        // Arrête la fonction ici
        return;
      }

      // Réponse positive : efface l'erreur et affiche le succès
      setErreur("");
      setSucces(true);
    } catch {
      // Le serveur n'a pas répondu (backend éteint, proxy Vite absent...)
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setSucces(false);
    }
  };

  // JSX : ce que le composant affiche
  return (
    // Balise sémantique du contenu principal de la page
    <main className={styles.page}>
      {/* onSubmit : appelle handleSubmit à l'envoi ; noValidate désactive la validation du navigateur */}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.titre}>Créer un compte</h1>

        {/* Zone du message global en haut du formulaire (même place que la maquette M2) */}
        {/* Affiche l'erreur seulement si erreur n'est pas vide */}
        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {/* Affiche le message de succès seulement si succes vaut true */}
        {succes && <p className={styles.succes}>Inscription réussie, {form.prenom} !</p>}

        {/* Bloc du champ Nom */}
        <div className={styles.champ}>
          {/* htmlFor relie l'étiquette à l'input d'id "nom" : un clic dessus active le champ */}
          <label htmlFor="nom" className={styles.label}>Nom</label>
          {/* Champ contrôlé : value vient de l'état, onChange le met à jour ; name sert à handleChange */}
          <input className={styles.input} type="text" id="nom" name="nom" value={form.nom} onChange={handleChange} />
        </div>

        {/* Bloc du champ Prénom, même principe */}
        <div className={styles.champ}>
          <label htmlFor="prenom" className={styles.label}>Prénom</label>
          <input className={styles.input} type="text" id="prenom" name="prenom" value={form.prenom} onChange={handleChange} />
        </div>

        {/* Bloc du champ Email */}
        <div className={styles.champ}>
          <label htmlFor="email" className={styles.label}>Adresse e-mail</label>
          <input
            className={styles.input}
            type="email"                    // clavier adapté sur mobile
            id="email"
            name="email"
            placeholder="exemple@mail.fr"   // texte d'exemple grisé
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Bloc du champ Mot de passe */}
        <div className={styles.champ}>
          <label htmlFor="password" className={styles.label}>Mot de passe</label>
          {/* type="password" masque les caractères saisis */}
          <input className={styles.input} type="password" id="password" name="password" value={form.password} onChange={handleChange} />
        </div>

        {/* Bloc du champ Confirmation */}
        <div className={styles.champ}>
          <label htmlFor="confirmation" className={styles.label}>Confirmer le mot de passe</label>
          <input
            className={styles.input}
            type="password"
            id="confirmation"
            name="confirmation"
            value={form.confirmation}
            onChange={handleChange}
          />
        </div>

        {/* Case à cocher et son texte sur la même ligne */}
        <div className={styles.champCase}>
          {/* Case à cocher : on utilise "checked" (booléen) au lieu de "value" */}
          <input className={styles.caseACocher} type="checkbox" id="cgu" name="cgu" checked={form.cgu} onChange={handleChange} />
          <label htmlFor="cgu" className={styles.labelCase}>J'accepte les conditions d'utilisation</label>
        </div>

        {/* Bouton principal bleu qui déclenche l'envoi du formulaire */}
        <button type="submit" className={styles.boutonPrincipal}>S'inscrire</button>

        {/* Ligne de séparation */}
        <hr className={styles.separateur} />

        <p className={styles.question}>Déjà un compte ?</p>
        {/* Lien vers la connexion, affiché comme un bouton à contour bleu */}
        <Link to="/authentification" className={styles.boutonSecondaire}>Se connecter</Link>
      </form>
    </main>
  );
}

// Exporte le composant pour l'importer dans App.jsx ou le routeur
export default Inscription;