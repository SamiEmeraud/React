// PAS UTILISÉ PAR LE SITE : tout le fichier est mis en commentaire

// import { useState } from 'react';
// import Header from './Enfant1/Enfant1';
// import Dashboard from './Enfant2/Enfant2';

// /****************PARENT****************************** */
// // Possède le state "user" et le transmet à ses deux enfants via les props
// export default function Parents() {
//   const [user, setUser] = useState(null); // personne connectée au départ

//   console.log('PARENT', { user });

//   const login = (nom) => setUser({ name: nom }); // appelée par PetitEnfant1
//   const logout = () => setUser(null);

//   return (
//     <>
//       <Header user={user} login={login} logout={logout} />
//       <Dashboard user={user} />
//     </>
//   );
// }
