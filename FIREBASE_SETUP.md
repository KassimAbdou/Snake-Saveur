# 🔧 Configuration Firebase pour Snake-Saveur

## Pourquoi Firebase ?
Firebase permet que **tous les clients** voient les mêmes **Plats du Jour** en temps réel, peu importe l'appareil ou le navigateur utilisé. Les données sont centralisées sur le cloud et synchronisées automatiquement.

---

## 📋 Étapes de Configuration

### 1️⃣ Créer un compte Firebase (gratuit)
1. Allez sur [firebase.google.com](https://firebase.google.com)
2. Cliquez sur "Commencer" ou "Go to Console"
3. Connectez-vous avec un compte Google

### 2️⃣ Créer un nouveau projet
1. Cliquez sur "Créer un projet"
2. Donnez un nom : **Snake-Saveur** (ou votre préférence)
3. Désactiver Google Analytics (optionnel pour ce projet)
4. Cliquez sur "Créer"

### 3️⃣ Créer une application web
1. Dans le tableau de bord, cherchez l'icône "</>" pour ajouter une app web
2. Donnez un surnom : **Web**
3. Cliquez sur "Enregistrer l'application"
4. **Copiez la configuration Firebase**

Vous verrez quelque chose comme :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDnV8QvFH5KL9mNoPqRsTuVwXyZ1a2b3c4d",
  authDomain: "snake-saveur.firebaseapp.com",
  projectId: "snake-saveur-12345",
  storageBucket: "snake-saveur-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 4️⃣ Mettre à jour firebase-config.js
1. Ouvrez le fichier `firebase-config.js` dans votre projet
2. Remplacez la configuration par celle que vous avez copiée
3. Sauvegardez le fichier

### 5️⃣ Configurer Realtime Database
1. Dans le console Firebase, allez dans **Realtime Database**
2. Cliquez sur "Créer une base de données"
3. Région : choisissez la plus proche (ex: europe-west1)
4. Mode de démarrage : **Mode test** (pour commencer)
5. Cliquez sur "Créer"

### 6️⃣ Configurer les règles de sécurité (Important!)
1. Dans Realtime Database, allez sur l'onglet **Règles**
2. Remplacez le contenu par :

```json
{
  "rules": {
    "platsDuJour": {
      ".read": true,
      ".write": false
    }
  }
}
```

3. Cliquez sur "Publier"

**Explication** :
- `.read: true` = Tout le monde peut LIRE les plats du jour
- `.write: false` = Personne ne peut écrire directement (sécurité)

### 7️⃣ Autoriser l'admin à modifier les données
Pour permettre au propriétaire d'ajouter/supprimer les plats, modifiez les règles :

```json
{
  "rules": {
    "platsDuJour": {
      ".read": true,
      ".write": "root.child('adminSecret').val() === 'SECRET_KEY'"
    }
  }
}
```

Puis dans votre code admin, avant chaque écriture, validez la clé secrète.

**OU** (plus simple mais moins sécurisé pour commencer) :

```json
{
  "rules": {
    "platsDuJour": {
      ".read": true,
      ".write": true
    }
  }
}
```

---

## ✅ Tester la Configuration

1. Ouvrez votre site dans deux navigateurs (ou deux appareils)
2. Sur le premier : Connectez-vous comme Admin et ajoutez un plat
3. Sur le second : Vous devez voir le plat **automatiquement** !

---

## 🚨 Troubleshooting

### Les plats n'apparaissent pas ?
- Vérifiez que `firebase-config.js` a la bonne configuration
- Ouvrez la **Console du navigateur** (F12) et cherchez les erreurs
- Vérifiez que Realtime Database est créée

### L'admin ne peut pas ajouter de plats ?
- Vérifiez les règles de sécurité (`.write` doit être `true` ou validé)
- Assurez-vous que `db` est défini dans `firebase-config.js`

### Performance lente ?
- C'est normal pour une connexion réseau lente
- Firebase synchronise en temps réel, ce qui peut prendre 1-2 secondes

---

## 🔒 Prochaines étapes de sécurité

Une fois en production, vous devriez :
1. Activer l'authentification Firebase
2. Utiliser des tokens pour admin uniquement
3. Implémenter des règles plus strictes
4. Monitorer l'usage pour rester dans le tier gratuit

---

## 📞 Besoin d'aide ?
- Documentation Firebase : [firebase.google.com/docs](https://firebase.google.com/docs)
- Contactez votre développeur avec l'erreur de la console (F12)
