# 📖 Guide Utilisateur MedFlow

## 🎯 Introduction

Bienvenue dans MedFlow ! Ce guide vous aidera à utiliser toutes les fonctionnalités du système.

## 🔐 Connexion

### Première Connexion
1. Accédez à l'application MedFlow
2. Entrez vos identifiants fournis par l'administrateur
3. Cliquez sur "Se connecter"

### Rôles Disponibles
- **Admin** : Gestion complète de la clinique
- **Médecin** : Consultations et ordonnances
- **Réceptionniste** : Rendez-vous et accueil
- **Patient** : Portail personnel

---

## 👨‍⚕️ Guide Médecin

### 📋 Créer une Ordonnance PDF

#### Étape 1 : Accéder au Créateur d'Ordonnance
1. Sur votre dashboard, cliquez sur **"Créer une ordonnance"**
2. Une fenêtre de dialogue s'ouvre

#### Étape 2 : Renseigner les Informations Patient
```
- Nom du patient : Nom complet
- Âge : Ex: "45 ans"
```

#### Étape 3 : Ajouter le Diagnostic (Optionnel)
- Décrivez le diagnostic dans la zone de texte
- Exemple: "Infection respiratoire haute"

#### Étape 4 : Prescrire les Médicaments
Pour chaque médicament :
```
✓ Nom du médicament : Ex: "Amoxicilline 500mg"
✓ Dosage : Ex: "500mg"
✓ Fréquence : Ex: "3 fois par jour"
✓ Durée : Ex: "7 jours"
✓ Instructions : Ex: "Après les repas"
```

**Ajouter plusieurs médicaments :**
- Cliquez sur "Ajouter un médicament"
- Remplissez les champs pour chaque médicament
- Supprimez avec l'icône corbeille si nécessaire

#### Étape 5 : Générer le PDF
1. Vérifiez toutes les informations
2. Cliquez sur **"Générer PDF"**
3. Le PDF se télécharge automatiquement
4. Le fichier s'appelle : `ordonnance_NomPatient_timestamp.pdf`

### 📊 Consulter les Statistiques
- **Patients aujourd'hui** : Nombre de consultations du jour
- **Rendez-vous semaine** : Planning hebdomadaire
- **Consultations en attente** : À traiter
- **Ordonnances créées** : Total créé

### 📅 Gérer le Planning
1. Cliquez sur "Mon Agenda"
2. Visualisez vos rendez-vous
3. Actions disponibles :
   - Voir détails
   - Démarrer consultation
   - Annuler/Reporter

---

## 🧑‍⚕️ Guide Patient

### 📄 Accéder aux Documents Médicaux

#### Navigation
1. Sur votre dashboard, cliquez sur **"Mes Documents"**
2. Vous accédez à la bibliothèque de documents

#### Types de Documents
```
📘 Ordonnances : Prescriptions médicales
📗 Comptes-rendus : Résultats de consultation
📙 Résultats d'analyses : Laboratoire
📕 Imagerie médicale : Radios, IRM, Scanner
```

#### Rechercher un Document
1. **Barre de recherche** : Tapez le nom du médecin ou type de document
2. **Filtres** :
   - Tous les documents
   - Ordonnances uniquement
   - Comptes-rendus uniquement
   - Résultats d'analyses
   - Imagerie médicale

#### Télécharger un Document PDF
1. Trouvez le document dans la liste
2. Cliquez sur **"Télécharger PDF"**
3. Le PDF s'ouvre et se télécharge
4. Format : `type_document_nom_date.pdf`

#### Statistiques Documents
- **Total** : Nombre total de documents
- **Ordonnances** : Nombre d'ordonnances
- **Comptes-rendus** : Résultats consultations
- **Analyses** : Résultats laboratoire

### 💳 Payer une Facture en Ligne

#### Étape 1 : Accéder aux Paiements
1. Dashboard → **"Mes Paiements"**
2. Ou cliquez sur **"Mes Factures"**

#### Étape 2 : Sélectionner une Facture
```
Badge Rouge "En attente" = À payer
Badge Vert "Payé" = Déjà réglé
```

#### Étape 3 : Initialiser le Paiement
1. Cliquez sur **"Payer avec Stripe"**
2. Une fenêtre sécurisée s'ouvre

#### Étape 4 : Remplir les Informations Bancaires

**Informations Requises :**
```
✓ Nom du titulaire : Nom sur la carte
✓ Numéro de carte : 16 chiffres (format automatique)
✓ Date d'expiration : MM/AA
✓ CVV : 3 chiffres au dos
```

**Cartes Acceptées :**
- 💳 Visa
- 💳 Mastercard
- 💳 American Express

#### Étape 5 : Confirmer le Paiement
1. Vérifiez le montant
2. Cliquez sur **"Payer XX.XX€"**
3. Traitement sécurisé (2-3 secondes)

#### Étape 6 : Télécharger le Reçu
1. ✅ Paiement confirmé
2. Informations du reçu affichées :
   - Numéro de reçu
   - Date et heure
   - Montant payé
   - Moyen de paiement
3. Cliquez sur **"Télécharger le reçu PDF"**
4. Conservez votre reçu : `recu_paiement_RCP-xxxxx.pdf`

### 🔒 Sécurité des Paiements
- 🔐 Connexion SSL/TLS cryptée
- 💳 Conformité PCI DSS
- 🛡️ Protection anti-fraude
- 🚫 Données non stockées

---

## 👨‍💼 Guide Administrateur

### 📊 Tableau de Bord

#### Statistiques Principales
1. **Total Patients** : Nombre total inscrits
2. **Rendez-vous aujourd'hui** : Consultations du jour
3. **Médecins actifs** : Personnel médical
4. **Revenu mensuel** : Chiffre d'affaires

#### Graphiques Interactifs
```
📊 Rendez-vous par semaine
- Visualisation en barres
- Données des 7 derniers jours
- Survol pour détails

📈 Revenus mensuels
- Courbe d'évolution
- Données sur 12 mois
- Tendances de croissance
```

### 🗂️ Gestion Multi-Onglets
**Accès rapide :**
- Patients : CRUD complet
- Services : Catalogue et tarifs
- Facturation : Toutes les factures

### 📈 Analyser les Performances
1. Consultez les graphiques
2. Identifiez les tendances
3. Exportez les rapports (prochainement)

---

## 📞 Guide Réceptionniste

### 📅 Gérer les Rendez-vous

#### Voir les Rendez-vous du Jour
1. Dashboard → Section **"Rendez-vous du jour"**
2. Badge de statut :
   - 🔵 **Planifié** : À venir
   - 🟡 **En attente** : Patient présent
   - 🟢 **Arrivé** : Enregistré

#### Enregistrer un Patient
1. Trouvez le rendez-vous dans la liste
2. Cliquez sur **"Enregistrer"**
3. Statut passe à "Arrivé"

#### Contacter un Patient
1. Cliquez sur l'icône 📞 Téléphone
2. Numéro affiché (si disponible)

### 💰 Encaisser les Paiements
1. Section **"Paiements en attente"**
2. Sélectionnez le patient
3. Cliquez sur **"Encaisser"**
4. Générez le reçu

---

## 🎨 Conseils d'Utilisation

### ✨ Bonnes Pratiques

#### Documents PDF
```
✓ Vérifiez les informations avant génération
✓ Nommage automatique avec date
✓ Archivage sécurisé dans la base de données
✓ Téléchargement illimité
```

#### Paiements en Ligne
```
✓ Vérifiez le montant avant paiement
✓ Conservez tous les reçus
✓ Contactez l'admin en cas de problème
✓ Délai de traitement : instantané
```

#### Sécurité
```
✓ Déconnexion après utilisation
✓ Mot de passe fort recommandé
✓ Ne partagez pas vos identifiants
✓ Signaler toute activité suspecte
```

---

## 🆘 Dépannage

### Problème : PDF ne se télécharge pas
**Solutions :**
1. Vérifiez les bloqueurs de pop-up
2. Autorisez les téléchargements
3. Essayez un autre navigateur
4. Vérifiez l'espace disque

### Problème : Paiement refusé
**Causes possibles :**
- ❌ Carte expirée
- ❌ Fonds insuffisants
- ❌ CVV incorrect
- ❌ Carte bloquée

**Actions :**
1. Vérifiez les informations
2. Contactez votre banque
3. Essayez une autre carte
4. Contactez le support

### Problème : Document non visible
**Vérifications :**
1. Le document est-il disponible ?
2. Statut = "Disponible" ?
3. Rafraîchir la page
4. Vider le cache

### Problème : Connexion impossible
**Solutions :**
1. Vérifiez email/mot de passe
2. Respectez la casse
3. Réinitialiser le mot de passe
4. Contacter l'administrateur

---

## 📱 Navigation Mobile

### Interface Responsive
```
📱 Mobile : Navigation simplifiée
📱 Tablet : Vue optimisée
💻 Desktop : Vue complète
```

### Gestes Tactiles
- **Swipe** : Naviguer entre sections
- **Tap** : Sélectionner
- **Long press** : Options avancées
- **Pinch** : Zoom (graphiques)

---

## 🔔 Notifications

### Types de Notifications
```
✅ Succès : Opération réussie
ℹ️ Info : Information importante
⚠️ Attention : Action requise
❌ Erreur : Problème détecté
```

### Paramètres (Prochainement)
- Email
- SMS
- Push notifications
- Rappels automatiques

---

## 💡 Astuces & Raccourcis

### Médecin
```
⌨️ Ctrl + N : Nouvelle ordonnance
⌨️ Ctrl + P : Planning
⌨️ Ctrl + S : Sauvegarder
```

### Patient
```
⌨️ Ctrl + D : Documents
⌨️ Ctrl + P : Paiements
⌨️ Ctrl + R : Rendez-vous
```

### Tous
```
⌨️ Ctrl + / : Recherche globale
⌨️ Ctrl + H : Aide
⌨️ Ctrl + Q : Déconnexion
```

---

## 📞 Support & Contact

### Obtenir de l'Aide
```
📧 Email : support@medflow.fr
📞 Téléphone : +33 1 23 45 67 89
💬 Chat : Disponible 9h-18h
🎫 Ticket : Via l'interface
```

### Horaires Support
```
Lundi - Vendredi : 9h - 18h
Samedi : 9h - 13h
Dimanche : Fermé
Urgences : 24/7
```

---

## 🎓 Formation

### Ressources Disponibles
- 📹 Vidéos tutoriels
- 📚 Documentation complète
- 🎯 Guide pas à pas
- 💻 Environnement de test

### Sessions de Formation
- Formation initiale : 2h
- Perfectionnement : 1h
- Support personnalisé : Sur demande

---

**MedFlow** - Votre assistant médical intelligent 🏥

*Version 1.0 - Décembre 2024*
