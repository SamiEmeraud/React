// PAS UTILISÉ PAR LE SITE : tout le fichier est mis en commentaire

// import { useRef, useState } from 'react';

// /**
//  * Version SANS useMemo.
//  * Le filtrage est recalculé à CHAQUE rendu du composant,
//  * y compris quand on tape dans « Note ».
//  *
//  * Note : en développement, <React.StrictMode> exécute le rendu deux fois,
//  * ce qui double le compteur. Retirer StrictMode (main.jsx) ou tester en
//  * build de production pour des chiffres exacts.
//  */

// // Grande liste créée une seule fois, hors du composant (référence stable)
// const TAILLE = 500000;
// const nombres = Array.from({ length: TAILLE }, (_, i) => i);

// export default function SansUseMemo() {
//   const [recherche, setRecherche] = useState('');
//   const [note, setNote] = useState('');
//   const compteur = useRef(0);

//   // Sans useMemo, le filtrage se relance à chaque saisie, même dans « Note »
//   const resultats = (() => {
//     compteur.current++;
//     const debut = performance.now();
//     console.log(`[SANS useMemo] Calcul n°${compteur.current}...`);

//     const liste = nombres.filter((n) => String(n).includes(recherche));

//     console.log(
//       `[SANS useMemo] Durée : ${(performance.now() - debut).toFixed(2)} ms`
//     );
//     return liste;
//   })();

//   return (
//     <div style={{ maxWidth: 400, margin: '24px auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#c0392b' }}>Sans useMemo</h2>

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
//           border: '2px solid #c0392b',
//           borderRadius: 8,
//           padding: 16,
//           textAlign: 'center',
//         }}
//       >
//         <div style={{ fontSize: 48, fontWeight: 'bold', color: '#c0392b' }}>
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
