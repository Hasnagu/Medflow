# 🏥 MedFlow - Système de Gestion de Cliniques Médicales

> ⚠️ **Note importante** : Si vous rencontrez une erreur "Failed to fetch" lors de l'inscription, consultez le fichier [ERREUR_RESOLUE.md](./ERREUR_RESOLUE.md) pour la solution. L'application fonctionne en mode développement par défaut et ne nécessite pas le déploiement des Edge Functions.

## 📋 Aperçu du Projet

**MedFlow** est une solution complète de gestion de cliniques médicales développée avec les technologies modernes du web. Le système gère l'intégralité du workflow médical, de la prise de rendez-vous à la facturation, en passant par les consultations et la génération de documents médicaux.

### 🎯 Objectifs du Projet
- Créer un système complet de gestion de clinique médicale
- Implémenter un contrôle d'accès basé sur les rôles (RBAC)
- Fournir des dashboards personnalisés pour chaque type d'utilisateur
- Générer des documents médicaux au format PDF
- Intégrer un système de paiement en ligne sécurisé
- Offrir une expérience utilisateur moderne et intuitive

## 🚀 Fonctionnalités Principales

### 👥 Gestion Multi-Rôles
Le système supporte 4 rôles utilisateurs avec des permissions spécifiques :

#### 🔐 Admin
- Vue d'ensemble complète de la clinique
- Gestion des patients, médecins et services
- Statistiques et rapports détaillés
- Gestion de la facturation globale
- Graphiques de performances (rendez-vous, revenus)

#### 🩺 Médecin
- Dashboard personnel avec planning du jour
- Gestion des consultations et dossiers patients
- Création d'ordonnances avec génération PDF
- Historique des patients traités
- Statistiques personnelles

#### 📞 Réceptionniste
- Gestion des rendez-vous
- Enregistrement des patients
- Gestion des paiements
- Vue d'ensemble de l'activité quotidienne
- Notifications et rappels

#### 🧑‍⚕️ Patient
- Portail personnel sécurisé
- Prise de rendez-vous en ligne
- Accès aux documents médicaux
- Téléchargement d'ordonnances et résultats en PDF
- Paiement en ligne des factures

### 📄 Gestion des Documents

#### Génération PDF Automatique
- **Ordonnances médicales** : Format professionnel avec en-tête clinique
- **Comptes-rendus médicaux** : Diagnostics, traitements, signes vitaux
- **Factures** : Détails des prestations et montants
- **Reçus de paiement** : Confirmation après paiement en ligne

#### Fonctionnalités Documents
- Recherche et filtrage avancés
- Téléchargement instantané en PDF
- Historique complet des documents
- Catégorisation automatique
- Interface intuitive de consultation

### 💳 Système de Paiement

#### Intégration Stripe
- Paiement sécurisé par carte bancaire
- Validation en temps réel
- Génération automatique de reçus PDF
- Historique des transactions
- Support multi-devises

#### Sécurité
- Cryptage des données sensibles
- Conformité PCI DSS
- Validation des cartes
- Protection contre la fraude

### 📊 Tableaux de Bord

#### Dashboards Modernes
- **Statistiques en temps réel** : KPIs personnalisés par rôle
- **Graphiques interactifs** : Visualisation des données (Recharts)
- **Actions rapides** : Navigation intuitive
- **État de chargement** : Feedback utilisateur
- **Gestion d'erreurs** : Messages clairs et options de réessai

#### Visualisations
- Graphiques de rendez-vous (Bar Chart)
- Évolution des revenus (Area Chart)
- Statistiques de consultation
- Activité récente

## 🛠 Stack Technique

### Frontend
- **React 18** : Interface utilisateur moderne
- **TypeScript** : Typage statique pour plus de fiabilité
- **Tailwind CSS** : Styling utilitaire et responsive
- **shadcn/ui** : Composants UI élégants et accessibles
- **Recharts** : Graphiques et visualisations
- **jsPDF** : Génération de documents PDF

### Backend
- **Supabase** : Backend as a Service
  - PostgreSQL : Base de données relationnelle
  - Auth : Authentification et autorisation
  - Storage : Stockage de fichiers
  - Real-time : Synchronisation en temps réel

### Bibliothèques Clés
- **react-hook-form** : Gestion des formulaires
- **lucide-react** : Icônes modernes
- **sonner** : Notifications toast
- **date-fns** : Manipulation des dates

## 📦 Structure du Projet

```
medflow/
├── components/
│   ├── auth/               # Authentification (Login, Signup)
│   ├── dashboards/         # Dashboards par rôle
│   ├── patients/           # Gestion des patients
│   ├── appointments/       # Gestion des rendez-vous
│   ├── consultations/      # Consultations médicales
│   ├── billing/            # Facturation
│   ├── documents/          # Gestion des documents
│   ├── payments/           # Système de paiement Stripe
│   ├── prescriptions/      # Création d'ordonnances
│   ├── charts/             # Graphiques et visualisations
│   ├── shared/             # Composants partagés
│   └── ui/                 # Composants UI de base
├── contexts/
│   └── AuthContext.tsx     # Contexte d'authentification
├── hooks/
│   └── useApi.tsx          # Hook pour les appels API
├── utils/
│   ├── api.tsx             # Utilitaires API
│   ├── pdfGenerator.tsx    # Génération de PDF
│   └── supabase/           # Configuration Supabase
├── types/
│   └── index.tsx           # Définitions TypeScript
└── styles/
    └── globals.css         # Styles globaux
```

## 🎨 Fonctionnalités des Documents PDF

### Ordonnances Médicales
```typescript
- En-tête professionnel avec logo clinique
- Informations patient (nom, âge, date)
- Diagnostic détaillé
- Liste des médicaments avec :
  • Nom et dosage
  • Fréquence de prise
  • Durée du traitement
  • Instructions spéciales
- Signature du médecin
- Date de validité
```

### Factures
```typescript
- Numéro de facture unique
- Informations patient
- Détail des prestations
- Calcul automatique (sous-total, TVA, total)
- Badge de statut (payée/en attente)
- Coordonnées de la clinique
```

### Reçus de Paiement
```typescript
- Confirmation visuelle de paiement
- Numéro de reçu unique
- Date et heure de transaction
- Montant payé
- Méthode de paiement
- Référence facture associée
```

## 💻 Installation et Utilisation

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Supabase (gratuit)

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-repo/medflow.git

# Installer les dépendances
cd medflow
npm install

# Configuration Supabase
# Créer un fichier .env avec vos credentials Supabase
VITE_SUPABASE_URL=votre_url
VITE_SUPABASE_ANON_KEY=votre_key

# Lancer l'application
npm run dev
```

### Comptes de Test

```
Admin:
- Email: admin@medflow.fr
- Password: admin123

Médecin:
- Email: doctor@medflow.fr
- Password: doctor123

Patient:
- Email: patient@medflow.fr
- Password: patient123

Réceptionniste:
- Email: reception@medflow.fr
- Password: reception123
```

## 🔐 Sécurité

### Authentification
- JWT tokens via Supabase Auth
- Sessions sécurisées
- Refresh tokens automatiques
- Déconnexion automatique après inactivité

### Autorisations
- Row Level Security (RLS) sur Supabase
- Vérification des permissions par rôle
- Protection des routes sensibles
- Validation côté serveur

### Données Médicales
- Conformité RGPD
- Chiffrement des données sensibles
- Anonymisation des données de test
- Sauvegarde automatique

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 🖥 Desktop (1920px+)
- 💻 Laptop (1024px - 1920px)
- 📱 Tablet (768px - 1024px)
- 📱 Mobile (320px - 768px)

## 🎯 Roadmap

### Version 1.0 (Actuelle) ✅
- ✅ Authentification multi-rôles
- ✅ Dashboards personnalisés
- ✅ CRUD Patients, Services, Rendez-vous
- ✅ Génération PDF (ordonnances, factures, reçus)
- ✅ Paiement en ligne Stripe
- ✅ Graphiques et statistiques

### Version 1.1 (Prochaine)
- 📅 Calendrier interactif de rendez-vous
- 📧 Notifications par email
- 📱 Notifications push
- 🔔 Rappels automatiques
- 📊 Rapports avancés
- 🌐 Multi-langues

### Version 2.0 (Future)
- 🤖 IA pour suggestions de diagnostic
- 📸 Téléchargement d'imagerie médicale
- 🔗 Intégration laboratoires externes
- 📞 Téléconsultation vidéo
- 📱 Application mobile native
- 🌍 Mode offline

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ dans le cadre d'un projet pédagogique SCRUM

## 📞 Support

Pour toute question ou support :
- 📧 Email: contact@medflow.fr
- 🐛 Issues: [GitHub Issues](https://github.com/votre-repo/medflow/issues)
- 📚 Documentation: [Wiki](https://github.com/votre-repo/medflow/wiki)

---

**MedFlow** - Simplifier la gestion médicale, améliorer les soins aux patients 🏥