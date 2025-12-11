# 🚀 Guide de Déploiement - MedFlow

Ce guide vous accompagne dans le déploiement de MedFlow en production.

---

## 📋 Prérequis

### Comptes Nécessaires
- ✅ Compte GitHub (gratuit)
- ✅ Compte Vercel (gratuit)
- ✅ Compte Supabase (gratuit)
- ⚠️ Compte Stripe (optionnel - pour paiements)

### Outils Locaux
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git >= 2.0.0
```

---

## 🔧 Configuration Supabase

### 1. Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Créez une nouvelle organisation
4. Créez un nouveau projet :
   - Nom: `medflow-production`
   - Database Password: Générez un mot de passe fort
   - Region: Choisissez la plus proche de vos utilisateurs
   - Plan: Free tier pour commencer

### 2. Configuration de la Base de Données

#### Schéma SQL

Exécutez ces commandes SQL dans l'éditeur SQL de Supabase :

```sql
-- Créer les tables principales
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'doctor', 'receptionist', 'patient')),
  phone TEXT,
  clinic_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  blood_type TEXT,
  allergies TEXT[],
  medical_history TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  reason TEXT,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID REFERENCES appointments(id),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  diagnosis TEXT,
  treatment TEXT,
  notes TEXT,
  vital_signs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  appointment_id UUID REFERENCES appointments(id),
  consultation_id UUID REFERENCES consultations(id),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  due_date DATE NOT NULL,
  paid_date DATE,
  items JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_patient ON invoices(patient_id);
```

#### Row Level Security (RLS)

```sql
-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Policies pour les patients
CREATE POLICY "Patients can view own data" ON patients
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE email = auth.email() AND role = 'patient'
    )
  );

-- Policies pour les médecins
CREATE POLICY "Doctors can view all patients" ON patients
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role IN ('doctor', 'admin', 'receptionist')
    )
  );

-- Policies pour les rendez-vous
CREATE POLICY "Users can view own appointments" ON appointments
  FOR SELECT USING (
    patient_id IN (SELECT id FROM patients WHERE created_by = auth.uid())
    OR doctor_id = auth.uid()
    OR auth.uid() IN (SELECT id FROM users WHERE role IN ('admin', 'receptionist'))
  );
```

### 3. Récupérer les Clés API

1. Dans votre projet Supabase, allez dans `Settings` → `API`
2. Copiez :
   - Project URL
   - anon/public key

---

## ⚙️ Configuration du Projet

### 1. Cloner le Repository

```bash
git clone https://github.com/votre-username/medflow.git
cd medflow
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine :

```env
# Supabase
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anon

# Stripe (optionnel)
VITE_STRIPE_PUBLIC_KEY=pk_live_votre-cle-publique

# Application
VITE_APP_NAME=MedFlow
VITE_APP_URL=https://votre-domaine.com
```

### 4. Test Local

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

---

## 🌐 Déploiement sur Vercel

### Option 1 : Via Interface Vercel (Recommandé)

#### Étape 1 : Connexion GitHub
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign up" ou "Log in"
3. Connectez votre compte GitHub

#### Étape 2 : Import du Projet
1. Cliquez sur "New Project"
2. Sélectionnez votre repository `medflow`
3. Cliquez sur "Import"

#### Étape 3 : Configuration
```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Étape 4 : Variables d'Environnement
Ajoutez dans Vercel :
```
VITE_SUPABASE_URL = https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY = votre-cle-anon
VITE_STRIPE_PUBLIC_KEY = pk_live_...
VITE_APP_URL = https://votre-app.vercel.app
```

#### Étape 5 : Déployer
1. Cliquez sur "Deploy"
2. Attendez la fin du build (2-3 minutes)
3. Votre app est en ligne ! 🎉

### Option 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Production
vercel --prod
```

---

## 🔒 Configuration Stripe (Paiements)

### 1. Créer un Compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte
3. Complétez le KYC si nécessaire

### 2. Récupérer les Clés API

1. Dashboard Stripe → `Developers` → `API keys`
2. Copiez votre `Publishable key`
3. Mode Test : `pk_test_...`
4. Mode Production : `pk_live_...`

### 3. Configuration Webhook (Optionnel)

Pour recevoir les notifications de paiement :

```bash
# URL Webhook
https://votre-domaine.com/api/webhooks/stripe

# Events à écouter
payment_intent.succeeded
payment_intent.failed
charge.succeeded
```

---

## 📊 Monitoring et Analytics

### Vercel Analytics

Activez dans le dashboard Vercel :
1. Project Settings → Analytics
2. Enable Analytics
3. Gratuit jusqu'à 100k events/mois

### Supabase Monitoring

1. Allez dans votre projet Supabase
2. `Database` → `Query Performance`
3. Surveillez les requêtes lentes

### Logs

```bash
# Voir les logs Vercel
vercel logs

# Logs en temps réel
vercel logs --follow
```

---

## 🔐 Sécurité Production

### Checklist Sécurité

- [ ] RLS activé sur toutes les tables Supabase
- [ ] Variables d'environnement configurées
- [ ] HTTPS activé (automatique sur Vercel)
- [ ] CORS configuré correctement
- [ ] Rate limiting activé
- [ ] Logs d'audit activés
- [ ] Backup automatique configuré

### Rate Limiting

Configurez dans Supabase :
```sql
-- Limiter les requêtes par IP
SELECT set_config('app.settings.rate_limit', '100', false);
```

### CORS

Ajoutez dans `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://votre-domaine.com" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
      ]
    }
  ]
}
```

---

## 🔄 CI/CD et Automatisation

### GitHub Actions

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📱 Domaine Personnalisé

### Ajouter un Domaine

1. Dans Vercel : `Settings` → `Domains`
2. Ajoutez votre domaine (ex: `medflow.com`)
3. Configurez les DNS :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

4. Attendez la propagation DNS (5-10 minutes)

---

## 🗄 Backup et Restauration

### Backup Supabase

```bash
# Backup automatique quotidien (Plan Pro)
# Ou export manuel :

# SQL
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql

# Restore
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

### Backup Vercel

Les déploiements Vercel sont immuables :
- Chaque déploiement est sauvegardé
- Rollback en 1 clic
- Historique complet disponible

---

## 🧪 Tests Pré-Production

### Checklist de Test

```bash
# Tests fonctionnels
- [ ] Login/Logout
- [ ] CRUD Patients
- [ ] CRUD Rendez-vous
- [ ] Génération PDF
- [ ] Paiement Stripe
- [ ] Responsive mobile

# Tests de performance
- [ ] Page load < 3s
- [ ] Time to interactive < 5s
- [ ] Core Web Vitals OK

# Tests de sécurité
- [ ] SQL Injection protected
- [ ] XSS protected
- [ ] CSRF protected
- [ ] Rate limiting works
```

---

## 🐛 Dépannage

### Erreur : Build Failed

```bash
# Vérifier les logs
vercel logs

# Rebuild local
npm run build

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Erreur : Supabase Connection

```bash
# Vérifier les variables d'env
echo $VITE_SUPABASE_URL

# Tester la connexion
curl https://votre-projet.supabase.co/rest/v1/
```

### Erreur : PDF Generation

```bash
# Vérifier jsPDF installé
npm list jspdf

# Réinstaller si nécessaire
npm install jspdf jspdf-autotable
```

---

## 📞 Support Post-Déploiement

### Ressources
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Stripe](https://stripe.com/docs)

### Community
- Discord Vercel
- Discord Supabase
- GitHub Issues

---

## ✅ Post-Déploiement

### À Faire Après le Déploiement

1. **Monitoring**
   - [ ] Configurer alertes Vercel
   - [ ] Surveiller erreurs Sentry
   - [ ] Vérifier métriques performance

2. **Sécurité**
   - [ ] Scanner vulnérabilités (npm audit)
   - [ ] Vérifier certificats SSL
   - [ ] Tester rate limiting

3. **Documentation**
   - [ ] Mettre à jour README avec URL prod
   - [ ] Documenter architecture déployée
   - [ ] Créer guide utilisateur final

4. **Communication**
   - [ ] Annoncer aux utilisateurs
   - [ ] Envoyer emails d'invitation
   - [ ] Former les équipes

---

## 🎉 Félicitations !

Votre application MedFlow est maintenant en production ! 🚀

**URL de production :** `https://votre-app.vercel.app`

---

**Dernière mise à jour :** Décembre 2024
**Maintenu par :** L'équipe MedFlow
