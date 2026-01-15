// Firebase Configuration
// Configuration de votre application web Snake-Saveur

const firebaseConfig = {
  apiKey: "AIzaSyABP40nk1YxjlKeZRvSU7mk3wA7CW-tB8M",
  authDomain: "snake-saveur-756ff.firebaseapp.com",
  projectId: "snake-saveur-756ff",
  storageBucket: "snake-saveur-756ff.appspot.com",
  messagingSenderId: "776993018176",
  appId: "1:776993018176:web:c583a282b9a73b0dff6aa5",
  measurementId: "G-YHPCJMMKQN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fonctions utilitaires pour charger et sauvegarder les plats
function chargerPlatsFromFirebase(callback) {
  db.ref('platsDuJour').on('value', (snapshot) => {
    const data = snapshot.val();
    const plats = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
    callback(plats);
  });
}

function sauvegarderPlatsToFirebase(plats) {
  db.ref('platsDuJour').set(plats);
}

function ajouterPlatToFirebase(plat) {
  db.ref('platsDuJour').push(plat);
}

function supprimerPlatFromFirebase(index) {
  db.ref('platsDuJour').once('value', (snapshot) => {
    const data = snapshot.val();
    if (Array.isArray(data)) {
      data.splice(index, 1);
      db.ref('platsDuJour').set(data);
    } else {
      const keys = Object.keys(data);
      const keyToDelete = keys[index];
      db.ref('platsDuJour/' + keyToDelete).remove();
    }
  });
}
