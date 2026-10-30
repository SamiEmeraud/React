// PAS UTILISÉ PAR LE SITE : tout le fichier est mis en commentaire

// import { useState } from 'react';
 
// /****************PETIT-ENFANT 1****************************** */
// // Utilise les props et possède le champ de saisie
// export default function UserMenu({ user, login, logout }) {
//   const [nom, setNom] = useState(''); // state local : ce que l'on tape
 
//   console.log('PETIT-ENFANT 1', { user, nom });
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (nom.trim()) {
//       login(nom.trim()); // la valeur saisie remonte au parent via la prop login
//       setNom('');        // on vide le champ
//     }
//   };
 
//   if (user) {
//     return (
//       <span>
//         Bonjour {user.name} <button onClick={logout}>Déconnexion</button>
//       </span>
//     );
//   }
 
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={nom}
//         onChange={(e) => setNom(e.target.value)}
//         placeholder="Votre prénom"
//       />
//       <button type="submit">Connexion</button>
//     </form>
//   );
// }