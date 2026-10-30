// PAS UTILISÉ PAR LE SITE : tout le fichier est mis en commentaire

// import { useState } from 'react';
// import Header from './Enfant1/Enfant1';
// import Dashboard from './Enfant2/Enfant2';
 
// /****************Parent****************************** */
// export default function Parent() {
//   const [user, setUser] = useState(null);
//   const login = (name) => setUser({ name });
//   const logout = () => setUser(null);
 
//   console.log('App-Parent', { user });
 
//   return (
//     <>
//       <Header user={user} login={login} logout={logout} />
//       {/* //enfant 1 relaye les props à son enfant */}
//       <Dashboard user={user} />
//       {/* //enfant 2 relaye les props à son enfant */}
//     </>
//   );
// }