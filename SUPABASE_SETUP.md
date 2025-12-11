# Configuration Supabase pour MedFlow

Ce guide explique comment configurer correctement Supabase pour l'application MedFlow et résoudre les erreurs d'authentification.

## 📋 Table des matières

1. [État actuel](#état-actuel)
2. [Configuration rapide](#configuration-rapide)
3. [Déploiement des Edge Functions](#déploiement-des-edge-functions)
4. [Dépannage](#dépannage)

## 🔍 État actuel

L'application MedFlow utilise **deux modes d'authentification** :

### Mode 1 : Direct Supabase Auth (Mode actuel - Par défaut)
✅ **Actif par défaut**
- Utilise directement l'API Supabase Auth côté client
- Aucun déploiement Edge Function requis
- Configuration dans `/config/app.tsx` : `useEdgeFunctions: false`
- ✨ Parfait pour le développement et les tests

### Mode 2 : Edge Functions (Mode production)
⚠️ **Nécessite déploiement**
- Utilise les Edge Functions Supabase pour une sécurité renforcée
- Requiert le déploiement des fonctions dans `/supabase/functions/`
- Configuration dans `/config/app.tsx` : `useEdgeFunctions: true`
- 🚀 Recommandé pour la production

## ⚙️ Configuration rapide

### Option A : Mode développement (Recommandé pour démarrer)

L'application est déjà configurée pour fonctionner en mode développement. **Aucune action requise !**

Le fichier `/config/app.tsx` est configuré avec :
```typescript
useEdgeFunctions: false  // Utilise Supabase Auth directement
```

### Option B : Activer l'authentification par email

Pour permettre aux utilisateurs de s'inscrire sans confirmation email :

1. Allez dans votre projet Supabase : https://supabase.com/dashboard
2. Naviguez vers **Authentication** → **Providers** → **Email**
3. Désactivez "**Confirm email**" pour permettre les inscriptions instantanées
4. Cliquez sur "**Save**"

## 🚀 Déploiement des Edge Functions

Si vous souhaitez utiliser le mode production avec les Edge Functions (recommandé pour la production) :

### Prérequis
```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter à Supabase
supabase login
```

### Lier votre projet
```bash
# Lier votre projet local au projet Supabase
supabase link --project-ref qlmubmicpthmkvvrpdff
```

### Déployer les Edge Functions
```bash
# Déployer toutes les fonctions
supabase functions deploy make-server-550b4c2a

# Ou déployer une fonction spécifique
supabase functions deploy make-server-550b4c2a --project-ref qlmubmicpthmkvvrpdff
```

### Activer le mode Edge Functions
Une fois déployé, modifiez `/config/app.tsx` :
```typescript
export const AppConfig = {
  useEdgeFunctions: true,  // ⬅️ Changez ceci à true
  // ... reste de la configuration
};
```

## 🔧 Dépannage

### Erreur : "TypeError: Failed to fetch"

**Cause** : Les Edge Functions ne sont pas déployées ou ne répondent pas.

**Solution** :
1. Vérifiez que `useEdgeFunctions: false` dans `/config/app.tsx`
2. Ou déployez les Edge Functions (voir ci-dessus)

### Erreur : "User already registered"

**Cause** : L'email est déjà utilisé dans Supabase Auth.

**Solutions** :
- Utilisez un autre email
- Ou supprimez l'utilisateur existant dans Supabase Dashboard : **Authentication** → **Users**

### Erreur : "Email not confirmed"

**Cause** : La confirmation d'email est activée dans Supabase.

**Solution** :
1. Allez dans **Authentication** → **Providers** → **Email**
2. Désactivez "**Confirm email**"
3. Ou configurez un serveur SMTP pour envoyer les emails de confirmation

### Les données ne persistent pas après rafraîchissement

**Cause** : Les Edge Functions stockent les données dans KV store qui est temporaire.

**Solutions** :
- **Court terme** : Continuez en mode développement (données dans user_metadata)
- **Long terme** : Créez des tables dans Supabase Database pour stocker les données de manière persistante

## 📊 Architecture de données

### Mode Direct (Actuel)
```
Supabase Auth
└── Users
    └── user_metadata
        ├── name
        ├── role
        ├── phone
        └── clinicId
```

### Mode Edge Functions (Production recommandée)
```
Supabase Auth + Edge Functions + Database
├── Users (Auth)
├── KV Store (Temporaire)
└── Database Tables (Persistant)
    ├── users
    ├── patients
    ├── appointments
    ├── consultations
    ├── billing
    └── services
```

## 🔐 Configuration de sécurité recommandée

### Pour la production :
1. ✅ Activez les Edge Functions
2. ✅ Configurez les Row Level Security (RLS) policies
3. ✅ Activez la confirmation d'email avec SMTP
4. ✅ Migrez du KV Store vers Database Tables
5. ✅ Configurez les CORS appropriés
6. ✅ Activez le rate limiting

## 📞 Support

Si vous rencontrez des problèmes :

1. Consultez la [documentation Supabase](https://supabase.com/docs)
2. Vérifiez les logs dans la console du navigateur
3. Vérifiez les logs Supabase : **Logs** → **Edge Functions**
4. Consultez le fichier `TESTING.md` pour les tests

## ✨ Prochaines étapes recommandées

1. ✅ **Testez l'inscription** en mode développement (actuel)
2. 📝 Créez des tables Database pour la persistance
3. 🚀 Déployez les Edge Functions
4. 🔄 Migrez les données du KV Store vers Database
5. 🔒 Configurez les RLS policies
6. 📧 Configurez l'envoi d'emails
7. 💳 Intégrez Stripe pour les paiements

---

**Note importante** : L'application fonctionne actuellement en mode développement avec authentification directe. C'est parfait pour tester toutes les fonctionnalités ! Pour la production, suivez les étapes de déploiement des Edge Functions.
