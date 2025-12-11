# 🚀 Démarrage Rapide - MedFlow

## ✅ Tout est prêt !

L'application MedFlow est **entièrement configurée et prête à l'emploi**. Vous n'avez rien à installer ou configurer !

## 📝 Créer votre premier compte

### Étape 1 : Accéder à l'inscription

1. L'application s'ouvre sur la page de connexion
2. Cliquez sur **"S'inscrire"** en bas de la page

### Étape 2 : Remplir le formulaire

Remplissez les informations suivantes :

```
📝 Nom complet : Votre nom (ex: "Dr. Marie Dupont")
📧 Email : Votre adresse email (ex: "marie.dupont@example.com")
📱 Téléphone : Optionnel (ex: "+33 6 12 34 56 78")
👤 Rôle : Choisissez parmi :
   - Administrateur (accès complet)
   - Médecin (gestion consultations)
   - Réceptionniste (rendez-vous, paiements)
   - Patient (portail personnel)
🔒 Mot de passe : Minimum 6 caractères
🔒 Confirmation : Retapez le mot de passe
```

### Étape 3 : Valider

1. Cliquez sur **"S'inscrire"**
2. ⏳ Attendez quelques secondes...
3. ✅ Vous êtes automatiquement connecté !

## 🎉 C'est tout !

Vous avez maintenant accès à votre dashboard personnalisé selon votre rôle :

### 🔐 Dashboard Admin
- Vue d'ensemble complète
- Graphiques de performance
- Gestion des utilisateurs
- Statistiques globales

### 🩺 Dashboard Médecin
- Planning du jour
- Consultations en cours
- Création d'ordonnances
- Graphiques personnels

### 📞 Dashboard Réceptionniste
- Rendez-vous du jour
- Gestion des paiements
- Enregistrement patients
- Activité récente

### 🧑‍⚕️ Dashboard Patient
- Mes rendez-vous
- Mes documents
- Mes factures
- Paiements en ligne

## 🔧 Erreurs Courantes

### ❌ "Un compte avec cet email existe déjà"

**Solution** : Utilisez un autre email ou connectez-vous avec cet email

### ❌ "Le mot de passe doit contenir au moins 6 caractères"

**Solution** : Utilisez un mot de passe plus long (minimum 6 caractères)

### ❌ "Les mots de passe ne correspondent pas"

**Solution** : Vérifiez que les deux mots de passe sont identiques

### ⏰ "L'inscription prend du temps"

**C'est normal** : La première connexion peut prendre quelques secondes. Les suivantes seront instantanées.

## 🎯 Que faire ensuite ?

### En tant qu'Administrateur :
1. ✅ Créez des services médicaux (menu "Services")
2. ✅ Ajoutez des patients (menu "Patients")
3. ✅ Consultez les statistiques
4. ✅ Explorez les graphiques

### En tant que Médecin :
1. ✅ Consultez votre planning
2. ✅ Créez une consultation (onglet "Consultations")
3. ✅ Générez une ordonnance PDF
4. ✅ Visualisez vos statistiques

### En tant que Réceptionniste :
1. ✅ Créez un rendez-vous (onglet "Rendez-vous")
2. ✅ Enregistrez un nouveau patient
3. ✅ Gérez les paiements
4. ✅ Consultez l'activité du jour

### En tant que Patient :
1. ✅ Consultez vos documents (onglet "Documents")
2. ✅ Téléchargez vos ordonnances en PDF
3. ✅ Payez vos factures en ligne
4. ✅ Consultez votre historique

## 💡 Conseils

### 🎨 Interface
- **Navigation** : Utilisez le menu latéral pour accéder aux différentes sections
- **Onglets** : Chaque dashboard a plusieurs onglets (Vue d'ensemble, Patients, Rendez-vous, etc.)
- **Actions rapides** : Boutons d'action en haut à droite des pages

### 📊 Données
- Les données sont **sauvegardées automatiquement**
- Elles persistent même après rafraîchissement de la page
- Elles sont synchronisées avec Supabase

### 🔐 Sécurité
- Votre session reste active pendant 1 heure
- Déconnectez-vous après utilisation (bouton en bas du menu)
- Vos données sont chiffrées et sécurisées

## 🆘 Besoin d'aide ?

### 📚 Documentation
- [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md) - Guide détaillé par rôle
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Configuration Supabase
- [TESTING.md](./TESTING.md) - Tests et validation
- [ERREUR_RESOLUE.md](./ERREUR_RESOLUE.md) - Résolution des erreurs courantes

### 🔍 Problème d'inscription ?
Si vous rencontrez l'erreur **"Failed to fetch"** :
1. Consultez [ERREUR_RESOLUE.md](./ERREUR_RESOLUE.md)
2. Vérifiez que Supabase est configuré
3. L'application fonctionne en **mode développement** par défaut

### 🐛 Bug ou Question ?
1. Consultez d'abord la documentation
2. Vérifiez les fichiers de dépannage
3. Ouvrez une issue sur GitHub

## ⚙️ Configuration Avancée (Optionnel)

### 🚀 Mode Production

Si vous souhaitez déployer en production :

1. **Déployer les Edge Functions**
   ```bash
   supabase functions deploy make-server-550b4c2a
   ```

2. **Activer le mode production**
   - Ouvrez `/config/app.tsx`
   - Changez `useEdgeFunctions: true`

3. **Configurer l'email**
   - Activez SMTP dans Supabase
   - Configurez les templates d'email

Consultez [DEPLOYMENT.md](./DEPLOYMENT.md) pour plus de détails.

## 🎯 Fonctionnalités Principales à Tester

### ✅ Génération PDF
1. Allez dans "Consultations" (médecin) ou "Documents" (patient)
2. Cliquez sur "Télécharger PDF"
3. Le PDF s'ouvre/télécharge automatiquement

### ✅ Paiement en Ligne
1. Allez dans "Mes factures" (patient)
2. Cliquez sur "Payer maintenant"
3. Utilisez une carte de test Stripe :
   - Numéro : `4242 4242 4242 4242`
   - Date : N'importe quelle date future
   - CVC : N'importe quel 3 chiffres

### ✅ Graphiques
1. Dashboard Admin ou Médecin
2. Consultez les graphiques interactifs
3. Survolez pour voir les détails

## 🌟 Prêt à commencer ?

Cliquez sur le bouton **"S'inscrire"** et créez votre compte en 30 secondes !

---

**Astuce** : Pour tester toutes les fonctionnalités, créez plusieurs comptes avec différents rôles.

**Bon démarrage avec MedFlow !** 🏥
