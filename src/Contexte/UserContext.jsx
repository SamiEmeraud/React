// Importe createContext : crée une "boîte" partagée par tous les composants
import { createContext } from "react";

// ===== useContext (étape 1/3) : création du contexte =====
// UserContext contiendra { utilisateur, connecter, deconnecter }.
// null = valeur par défaut si un composant l'utilise sans <UserProvider> autour.
// Ce fichier ne contient que le contexte (pas de composant), comme ça
// le rechargement à chaud de Vite fonctionne bien.
export const UserContext = createContext(null);
