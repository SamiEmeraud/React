import { useState, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext.jsx";

// Lit une valeur gardée dans le navigateur (ou la valeur par défaut)
function lire(cle, defaut) {
  try {
    return JSON.parse(localStorage.getItem(cle)) ?? defaut;
  } catch {
    return defaut;
  }
}


function UserProvider({ children }) {
  // ===== useState =====
  const [utilisateur, setUtilisateur] = useState(() => lire("utilisateur", null));
  const [panier, setPanier] = useState(() => lire("panier", []));

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  const connecter = (donnees) => {
    localStorage.setItem("utilisateur", JSON.stringify(donnees));
    setUtilisateur(donnees);
  };

  const deconnecter = () => {
    localStorage.removeItem("utilisateur");
    setPanier([]);
    setUtilisateur(null);
  };


  const ajouter = useCallback((produit, quantite) => {
    setPanier((prev) => {
      const existe = prev.find((a) => a.id === produit.id);
      if (existe) {
        return prev.map((a) => (a.id === produit.id ? { ...a, quantite: a.quantite + quantite } : a));
      }
      return [...prev, { ...produit, quantite }];
    });
  }, []);

  const retirer = (id) => setPanier((prev) => prev.filter((a) => a.id !== id));

  return (
    <UserContext.Provider value={{ utilisateur, connecter, deconnecter, panier, ajouter, retirer }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
