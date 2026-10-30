import { useState, createContext, useContext } from 'react'

const UserContext = createContext();

export default function App() {
  const [compteur, setCompteur] = useState(0);
  const [nom, setNom] = useState("");
  const [role, setRole] = useState("");

  const utilisateur = { nom, role };

  return (
    <UserContext.Provider value={utilisateur}>
      <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
      <input placeholder="Rôle" value={role} onChange={(e) => setRole(e.target.value)} />
      <button onClick={() => setCompteur(compteur + 1)}>Clics : {compteur}</button>
      <Navbar />
    </UserContext.Provider>
  );
}

const Navbar = function Navbar() {
  const user = useContext(UserContext);
  console.log("rendu Navbar");
  return <p>Bonjour {user.nom || "inconnu"} ({user.role || "sans rôle"})</p>;
};
