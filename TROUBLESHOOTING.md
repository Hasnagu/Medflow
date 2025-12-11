# Guide de dépannage MedFlow

## Erreur "Failed to fetch" lors de l'inscription

### Symptômes
- Message d'erreur: `TypeError: Failed to fetch`
- L'inscription échoue immédiatement
- Aucune communication avec le serveur

### Causes possibles

#### 1. Projet Supabase inactif ou en pause
**Solution :**
- Connectez-vous à https://supabase.com/dashboard
- Vérifiez que votre projet est actif
- Si le projet est en pause, cliquez sur "Resume project"

#### 2. Authentification par email non activée
**Solution :**
- Allez dans votre dashboard Supabase
- Naviguez vers Authentication > Providers
- Vérifiez que "Email" est activé
- Si nécessaire, configurez les paramètres SMTP

#### 3. Problème de connexion réseau
**Solution :**
- Vérifiez votre connexion internet
- Essayez de désactiver les extensions de navigateur (bloqueurs de pub, etc.)
- Testez dans une fenêtre de navigation privée
- Vérifiez que votre pare-feu ou antivirus n'bloque pas *.supabase.co

#### 4. Configuration incorrecte
**Solution :**
- Vérifiez `/utils/supabase/info.tsx`
- Le `projectId` doit correspondre à votre projet Supabase
- Le `publicAnonKey` doit être votre clé publique anon key

### Diagnostic automatique

1. **Ouvrir la console du navigateur** (F12)
2. **Sur la page d'inscription**, cliquer sur "Exécuter les diagnostics"
3. **Consulter les résultats** dans la console

Les diagnostics vont vérifier :
- ✅ Configuration du Project ID
- ✅ Configuration de l'Anon Key
- ✅ Format de l'URL Supabase
- ✅ Initialisation du client
- ✅ Connectivité au service Auth
- ✅ Accessibilité des endpoints
- ✅ Connectivité réseau

### Vérifications manuelles

#### Vérifier l'URL du projet
```javascript
// Dans la console du navigateur
console.log('Supabase URL:', 'https://qlmubmicpthmkvvrpdff.supabase.co')
```

#### Tester la connectivité
```javascript
// Dans la console du navigateur
fetch('https://qlmubmicpthmkvvrpdff.supabase.co/auth/v1/health', {
  headers: {
    'apikey': 'VOTRE_ANON_KEY'
  }
})
.then(r => console.log('Status:', r.status))
.catch(e => console.error('Error:', e))
```

### Configuration Supabase requise

1. **Email Authentication activé**
   - Dashboard > Authentication > Providers > Email

2. **Confirmation email désactivée (développement)**
   - Dashboard > Authentication > Settings
   - Décochez "Enable email confirmations"

3. **URL du site configurée**
   - Dashboard > Authentication > URL Configuration
   - Site URL: Votre URL d'application

### Erreurs courantes et solutions

#### "Email rate limit exceeded"
**Cause :** Trop de tentatives d'inscription avec le même email  
**Solution :** Attendez 60 minutes ou utilisez un autre email

#### "Invalid API key"
**Cause :** La clé anon key est incorrecte  
**Solution :** Copiez la clé depuis Dashboard > Settings > API

#### "User already registered"
**Cause :** Un compte existe déjà avec cet email  
**Solution :** Utilisez la page de connexion ou un autre email

#### CORS error
**Cause :** URL du site non configurée dans Supabase  
**Solution :** Ajoutez votre URL dans Dashboard > Authentication > URL Configuration

### Mode développement

Le mode développement utilise **directement Supabase Auth** (pas d'Edge Functions).

Configuration dans `/config/app.tsx`:
```typescript
export const AppConfig = {
  useEdgeFunctions: false,  // Mode direct (recommandé pour dev)
  // ...
};
```

### Support

Si le problème persiste après avoir suivi ce guide :

1. Consultez les logs dans la console du navigateur
2. Vérifiez les logs Supabase (Dashboard > Logs)
3. Vérifiez que votre projet Supabase n'a pas atteint ses limites
4. Essayez de créer un compte via l'interface Supabase (Dashboard > Authentication > Users)

### Checklist de dépannage

- [ ] Projet Supabase actif
- [ ] Email authentication activé
- [ ] Project ID correct dans info.tsx
- [ ] Anon Key correct dans info.tsx
- [ ] Confirmation email désactivée (pour dev)
- [ ] Site URL configurée
- [ ] Connexion internet fonctionnelle
- [ ] Pas de bloqueur de contenu actif
- [ ] Console du navigateur sans erreurs CORS
- [ ] Diagnostics réussis
