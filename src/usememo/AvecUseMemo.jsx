// PAS UTILISÉ PAR LE SITE : tout le fichier est mis en commentaire

// import { useMemo, useRef, useState } from 'react';

// /**
//  * Version AVEC useMemo.
//  * Le filtrage n'est recalculé que si `recherche` change.
//  * Taper dans « Note » ne relance PAS le calcul.
//  *
//  * Note : en développement, <React.StrictMode> exécute le rendu deux fois,
//  * ce qui double le compteur. Retirer StrictMode (main.jsx) ou tester en
//  * build de production pour des chiffres exacts.
//  */

// // Grande liste créée une seule fois, hors du composant (référence stable)
// const TAILLE = 500000;
// const nombres = Array.from({ length: TAILLE }, (_, i) => i);

// export default function AvecUseMemo() {
//   const [recherche, setRecherche] = useState('');
//   const [note, setNote] = useState('');
//   const compteur = useRef(0);

//   const resultats = useMemo(() => {
//     compteur.current++;
//     const debut = performance.now();
//     console.log(`[AVEC useMemo] Calcul n°${compteur.current}...`);

//     const liste = nombres.filter((n) => String(n).includes(recherche));

//     console.log(
//       `[AVEC useMemo] Durée : ${(performance.now() - debut).toFixed(2)} ms`
//     );
//     return liste;
//   }, [recherche]); // nombres est une constante hors composant : inutile ici

//   return (
//     <div style={{ maxWidth: 400, margin: '24px auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#27ae60' }}>Avec useMemo</h2>

//       <label style={{ display: 'block', marginBottom: 12 }}>
//         Recherche (déclenche le calcul)
//         <input
//           value={recherche}
//           onChange={(e) => setRecherche(e.target.value)}
//           placeholder="ex : 123"
//           style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
//         />
//       </label>

//       <label style={{ display: 'block', marginBottom: 20 }}>
//         Note (sans rapport avec le calcul)
//         <input
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//           placeholder="tapez ce que vous voulez"
//           style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
//         />
//       </label>

//       <div
//         style={{
//           border: '2px solid #27ae60',
//           borderRadius: 8,
//           padding: 16,
//           textAlign: 'center',
//         }}
//       >
//         <div style={{ fontSize: 48, fontWeight: 'bold', color: '#27ae60' }}>
//           {compteur.current}
//         </div>
//         <div>calcul(s) effectué(s)</div>
//         <p style={{ marginBottom: 0 }}>
//           {resultats.length.toLocaleString('fr-FR')} résultat(s)
//         </p>
//       </div>
//     </div>
//   );
// }
