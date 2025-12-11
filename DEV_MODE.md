# Mode Développement MedFlow

## 🔧 Qu'est-ce que le Mode Développement ?

Le mode développement (Mock Auth) permet de faire fonctionner MedFlow **sans connexion Supabase active**. C'est idéal pour :

- ✅ Développement local sans configuration Supabase
- ✅ Tests rapides de l'interface
- ✅ Démonstrations hors ligne
- ✅ Développement quand Supabase n'est pas accessible

## 🚀 Activation

Le mode développement est activé dans `/config/app.tsx` :

```typescript
export const AppConfig = {
  useMockAuth: true,  // true = mode développement, false = Supabase réel
  // ...
};
```

## 👥 Comptes de Test Préchargés

Quand le mode développement est activé, deux comptes sont automatiquement créés :

### Administrateur
- **Email:** admin@medflow.com
- **Mot de passe:** admin123
- **Rôle:** Administrateur

### Médecin
- **Email:** doctor@medflow.com
- **Mot de passe:** doctor123
- **Rôle:** Médecin

## 📝 Création de Nouveaux Comptes

Vous pouvez créer de nouveaux comptes via la page d'inscription. Les données sont **stockées localement** dans le localStorage de votre navigateur.

## 💾 Stockage des Données

En mode développement :

- **Utilisateurs:** Stockés dans `localStorage` sous la clé `medflow_mock_users`
- **Session:** Stockée dans `localStorage` sous la clé `medflow_mock_session`
- **Persistance:** Les données restent même après rechargement de la page
- **Portée:** Données spécifiques à votre navigateur et domaine

## 🔄 Fonctionnalités Disponibles

### ✅ Fonctionnent en mode développement :
- Inscription / Connexion / Déconnexion
- Navigation entre les dashboards
- Gestion de session persistante
- Tous les rôles utilisateurs (Admin, Médecin, Réceptionniste, Patient)

### ⚠️ Limites du mode développement :
- Pas de synchronisation entre appareils
- Données effacées si vous videz le cache du navigateur
- Pas de validation email
- Pas d'API backend pour les données métier (patients, rendez-vous, etc.)
- Pas de génération de PDF avec données réelles
- Pas de paiements Stripe

## 🔧 Commandes Utiles

### Ouvrir la Console du Navigateur (F12) et exécuter :

```javascript
// Voir tous les utilisateurs mock
const users = JSON.parse(localStorage.getItem('medflow_mock_users'));
console.log(users);

// Voir la session actuelle
const session = JSON.parse(localStorage.getItem('medflow_mock_session'));
console.log(session);

// Réinitialiser les données mock
localStorage.removeItem('medflow_mock_users');
localStorage.removeItem('medflow_mock_session');
location.reload();
```

## 🔄 Basculer vers Supabase Réel

Pour utiliser un vrai projet Supabase :

1. **Configurez Supabase** dans `/utils/supabase/info.tsx`
2. **Désactivez le mode mock** dans `/config/app.tsx` :
   ```typescript
   useMockAuth: false
   ```
3. **Rechargez l'application**

## 🛡️ Sécurité

⚠️ **IMPORTANT** : Le mode développement n'est PAS sécurisé et ne doit JAMAIS être utilisé en production.

- Les mots de passe sont stockés en clair
- Aucune protection contre les attaques
- Données accessibles via la console
- Aucune authentification réelle

## 🐛 Dépannage

### Le mode développement ne s'active pas
- Vérifiez que `useMockAuth: true` dans `/config/app.tsx`
- Vérifiez la console pour les messages de démarrage
- Assurez-vous que localStorage est disponible

### Mes comptes ont disparu
- Le localStorage a été vidé
- Rechargez la page pour recréer les comptes par défaut
- Créez à nouveau vos comptes de test

### Je veux désactiver le banner jaune
- Mettez `useMockAuth: false` dans `/config/app.tsx`
- Le banner n'apparaît qu'en mode développement

## 📚 Architecture Technique

```
/utils/mockAuth.tsx          # Système d'authentification mock
/config/app.tsx              # Configuration (useMockAuth)
/contexts/AuthContext.tsx    # Logique d'authentification avec fallback mock
/components/ui/DevModeBanner.tsx  # Banner d'indication du mode dev
```

## ✨ Avantages

1. **Développement rapide** sans attendre la configuration Supabase
2. **Pas de dépendance réseau** - fonctionne hors ligne
3. **Démonstrations faciles** - pas besoin de credentials
4. **Tests UI** - testez l'interface sans backend
5. **Formation** - idéal pour apprendre le système

## 📖 Prochaines Étapes

Pour un système complet de production :

1. Configurez votre projet Supabase
2. Désactivez le mode mock
3. Implémentez les tables de base de données
4. Déployez les Edge Functions
5. Configurez les politiques RLS (Row Level Security)

---

**Mode Développement MedFlow** - Développez plus vite, sans contraintes ! 🚀
