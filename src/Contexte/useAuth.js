import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

// ===== Hook personnalisé useAuth =====
// Raccourci pour lire le contexte : useAuth() au lieu de useContext(UserContext).
// Renvoie { utilisateur, connecter, deconnecter, panier, ajouter, retirer }.
// Si un composant l'utilise sans <UserProvider> autour, on affiche une erreur claire.
export function useAuth() {
  const contexte = useContext(UserContext);
  if (!contexte) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <UserProvider>");
  }
  return contexte;
}
