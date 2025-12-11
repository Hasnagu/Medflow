# 🧪 Guide de Tests - MedFlow

Ce document décrit la stratégie de tests et les procédures de QA pour MedFlow.

---

## 📋 Stratégie de Tests

### Pyramide de Tests

```
       /\
      /  \      E2E Tests (10%)
     /____\
    /      \    Integration Tests (30%)
   /________\
  /          \  Unit Tests (60%)
 /____________\
```

---

## ✅ Tests Manuels

### Checklist de Tests Fonctionnels

#### 🔐 Authentification

**Login**
- [ ] Login avec email/password valides
- [ ] Login avec email invalide → Erreur affichée
- [ ] Login avec password invalide → Erreur affichée
- [ ] Login avec champ vide → Validation
- [ ] Redirection vers dashboard après login
- [ ] Session persistante après refresh

**Signup**
- [ ] Création compte avec données valides
- [ ] Email déjà existant → Erreur
- [ ] Password faible → Validation
- [ ] Tous les champs requis → Validation
- [ ] Auto-login après signup

**Logout**
- [ ] Déconnexion fonctionne
- [ ] Redirection vers login
- [ ] Session cleared
- [ ] Impossible d'accéder aux pages protégées

---

#### 👨‍⚕️ Dashboard Admin

**Vue d'ensemble**
- [ ] 4 KPIs affichés correctement
- [ ] Graphique rendez-vous chargé
- [ ] Graphique revenus chargé
- [ ] Activité récente affichée
- [ ] Quick actions cliquables

**Navigation**
- [ ] Onglet Patients → PatientList
- [ ] Onglet Services → ServiceList
- [ ] Onglet Facturation → InvoiceList
- [ ] Bouton retour fonctionne
- [ ] État actif persistant

**Données**
- [ ] Stats calculées depuis API
- [ ] Loading state pendant chargement
- [ ] Error state si erreur API
- [ ] Retry fonctionne après erreur
- [ ] Données actualisées au refresh

---

#### 💊 Dashboard Médecin

**Vue d'ensemble**
- [ ] 4 KPIs personnalisés affichés
- [ ] Planning du jour chargé
- [ ] Patients récents affichés
- [ ] Bouton "Créer ordonnance" visible

**Création Ordonnance**
- [ ] Modal s'ouvre au clic
- [ ] Formulaire patient editable
- [ ] Ajout médicament fonctionne
- [ ] Suppression médicament fonctionne
- [ ] Validation champs obligatoires
- [ ] Génération PDF réussie
- [ ] Téléchargement automatique
- [ ] Toast de confirmation
- [ ] Fermeture modal après génération

**Planning**
- [ ] Filtrage rendez-vous aujourd'hui
- [ ] Affichage heure et durée
- [ ] Badges de statut corrects
- [ ] Actions disponibles selon statut

---

#### 🧑‍⚕️ Dashboard Patient

**Vue d'ensemble**
- [ ] 3 KPIs affichés
- [ ] Prochains RDV listés
- [ ] Documents récents affichés
- [ ] Paiements en attente visibles

**Documents**
- [ ] Liste complète des documents
- [ ] 4 statistiques correctes
- [ ] Recherche fonctionne
- [ ] Filtres fonctionnent
- [ ] Icons par type corrects
- [ ] Téléchargement PDF fonctionne
- [ ] PDF généré correctement
- [ ] Nom fichier correct

**Paiement**
- [ ] Liste factures affichée
- [ ] Badge statut correct
- [ ] Modal paiement s'ouvre
- [ ] Formulaire carte validé
- [ ] Formatage numéro carte automatique
- [ ] Validation CVV et expiration
- [ ] Traitement simule paiement
- [ ] Success screen affiché
- [ ] Reçu PDF généré
- [ ] Téléchargement reçu fonctionne
- [ ] Fermeture modal après succès

---

#### 📞 Dashboard Réceptionniste

**Vue d'ensemble**
- [ ] 4 KPIs affichés
- [ ] RDV du jour listés
- [ ] Paiements en attente affichés
- [ ] Quick actions disponibles

**Gestion RDV**
- [ ] Statuts affichés correctement
- [ ] Enregistrement patient fonctionne
- [ ] Bouton téléphone visible
- [ ] Navigation vers détails

---

### 📄 Tests de Génération PDF

#### Ordonnances

**Structure**
- [ ] En-tête bleu avec logo
- [ ] Titre "ORDONNANCE MÉDICALE"
- [ ] Infos patient complètes
- [ ] Infos médecin correctes
- [ ] Diagnostic affiché si fourni
- [ ] Tableau médicaments correctement formatté
- [ ] Signature médecin présente
- [ ] Disclaimer en bas

**Données**
- [ ] Nom patient correct
- [ ] Âge patient correct
- [ ] Date actuelle formatée (fr-FR)
- [ ] Nom médecin correct
- [ ] Spécialité médecin correcte
- [ ] Liste médicaments complète
- [ ] Tous les champs médicament présents

**Format**
- [ ] Taille A4 (210x297mm)
- [ ] Marges correctes
- [ ] Polices lisibles
- [ ] Couleurs cohérentes
- [ ] Pas de débordement de texte

#### Factures

**Structure**
- [ ] En-tête avec logo
- [ ] Numéro de facture unique
- [ ] Badge statut (vert/rouge)
- [ ] Infos patient
- [ ] Dates (émission, échéance)
- [ ] Tableau prestations
- [ ] Calculs (sous-total, TVA, total)
- [ ] Footer avec coordonnées

**Calculs**
- [ ] Sous-total = somme items
- [ ] TVA = 20% du sous-total
- [ ] Total = sous-total + TVA
- [ ] Montants formatés en euros
- [ ] 2 décimales toujours affichées

#### Comptes-Rendus

**Structure**
- [ ] En-tête avec titre type consultation
- [ ] Infos patient (nom, DOB)
- [ ] Infos médecin
- [ ] Signes vitaux si fournis
- [ ] Diagnostic complet
- [ ] Traitement prescrit
- [ ] Notes complémentaires
- [ ] Signature médecin

**Données**
- [ ] Date naissance formatée
- [ ] Signes vitaux optionnels
- [ ] Textes sur plusieurs lignes OK
- [ ] Pas de troncature

#### Reçus de Paiement

**Structure**
- [ ] En-tête vert avec checkmark
- [ ] "PAIEMENT RÉUSSI" visible
- [ ] Numéro de reçu unique
- [ ] Date et heure complètes
- [ ] Détails paiement dans encadré
- [ ] Montant en vert et large
- [ ] Message de remerciement
- [ ] Footer avec validité

**Données**
- [ ] Numéro reçu unique (RCP-timestamp)
- [ ] Date/heure formatée (fr-FR)
- [ ] Montant correct
- [ ] Méthode paiement affichée
- [ ] Numéro facture associée
- [ ] Description complète

---

## 🔒 Tests de Sécurité

### Authentification & Autorisation

**Tests d'Accès**
- [ ] User non authentifié → Redirect login
- [ ] Patient ne peut pas accéder admin dashboard
- [ ] Médecin ne peut pas accéder patient dashboard
- [ ] Réceptionniste ne peut pas créer ordonnances
- [ ] Admin a accès à tout

**Tests de Session**
- [ ] Token expiré → Re-login
- [ ] Logout invalide tous les tokens
- [ ] Refresh token fonctionne
- [ ] Session timeout après inactivité

### Validation des Entrées

**SQL Injection**
```javascript
// Tester avec :
Email: admin@test.com' OR '1'='1
Password: ' OR '1'='1' --

Résultat attendu: Erreur / Rejet
```

**XSS (Cross-Site Scripting)**
```javascript
// Tester avec :
Nom Patient: <script>alert('XSS')</script>
Diagnostic: <img src=x onerror="alert('XSS')">

Résultat attendu: Échappé / Sanitized
```

**Injection de Commandes**
- [ ] Upload fichiers malicieux bloqué
- [ ] Caractères spéciaux échappés
- [ ] HTML tags désactivés dans inputs

### Tests CORS

```bash
# Tester depuis domaine différent
curl -H "Origin: https://evil.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  https://votre-app.com/api/patients

Résultat attendu: 403 Forbidden
```

---

## ⚡ Tests de Performance

### Métriques Cibles

```
First Contentful Paint (FCP): < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.8s
Cumulative Layout Shift (CLS): < 0.1
First Input Delay (FID): < 100ms
```

### Tests de Charge

**Lighthouse Audit**
```bash
# Chrome DevTools → Lighthouse
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
```

**Bundle Size**
```bash
npm run build

# Vérifier tailles
dist/index.js < 200KB (gzipped)
dist/vendor.js < 500KB (gzipped)
Total < 1MB
```

### Tests de Réseau

**Simulation 3G Lent**
- [ ] Page charge en < 5s
- [ ] Interactions possibles < 8s
- [ ] Loading states visibles
- [ ] Pas d'erreurs timeout

**Hors Ligne**
- [ ] Message approprié affiché
- [ ] Retry automatique si connexion revient
- [ ] Données en cache utilisées si possible

---

## 📱 Tests Responsive

### Breakpoints à Tester

```
Mobile: 375px (iPhone SE)
Mobile L: 428px (iPhone 14 Pro Max)
Tablet: 768px (iPad)
Laptop: 1024px (iPad Pro)
Desktop: 1920px (Full HD)
4K: 3840px
```

### Checklist Mobile

**Layout**
- [ ] Navigation adaptée (hamburger menu)
- [ ] Grids passent en 1 colonne
- [ ] Cards stackées verticalement
- [ ] Padding/margin réduits
- [ ] Textes lisibles (min 16px)

**Interactions**
- [ ] Boutons assez larges (min 44px)
- [ ] Inputs agrandis au focus
- [ ] Modales plein écran
- [ ] Swipe gestures fonctionnent
- [ ] Pas de hover states obligatoires

**PDF**
- [ ] PDFs lisibles sur mobile
- [ ] Téléchargement fonctionne
- [ ] Pas de débordement

---

## 🧩 Tests d'Intégration

### API & Backend

**Patients API**
```javascript
✓ GET /patients → Liste patients
✓ POST /patients → Création patient
✓ PUT /patients/:id → Modification patient
✓ DELETE /patients/:id → Suppression patient
✓ GET /patients/:id → Détails patient
```

**Rendez-vous API**
```javascript
✓ GET /appointments → Liste RDV
✓ POST /appointments → Création RDV
✓ PUT /appointments/:id → Modification RDV
✓ DELETE /appointments/:id → Annulation RDV
✓ GET /appointments?date=today → Filtrage
```

**Factures API**
```javascript
✓ GET /invoices → Liste factures
✓ POST /invoices → Création facture
✓ PUT /invoices/:id → Modification
✓ GET /invoices?status=pending → Filtrage
```

### Supabase Integration

**Auth**
- [ ] Login via Supabase Auth
- [ ] Signup crée user + profile
- [ ] Logout invalide session
- [ ] Token refresh automatique

**Database**
- [ ] RLS policies appliquées
- [ ] Transactions ACID respectées
- [ ] Cascade deletes fonctionnent
- [ ] Indexes performants

**Storage (si utilisé)**
- [ ] Upload fichiers
- [ ] Download fichiers
- [ ] Delete fichiers
- [ ] Permissions correctes

---

## 🔍 Tests de Régression

### Après Chaque Modification

1. **Smoke Tests** (5 min)
   - Login/Logout
   - Navigation principale
   - Aucune erreur console

2. **Critical Path** (15 min)
   - Workflow complet patient
   - Workflow complet médecin
   - Paiement bout en bout

3. **Full Regression** (30 min)
   - Tous les modules CRUD
   - Tous les dashboards
   - Tous les PDF
   - Tous les paiements

---

## 📊 Rapports de Tests

### Template de Bug Report

```markdown
## Bug Title
[Component] Brief description

## Severity
Critical / High / Medium / Low

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
![Screenshot](url)

## Environment
- OS: macOS 14.0
- Browser: Chrome 120
- Screen: 1920x1080

## Console Errors
```
Error message here
```

## Additional Context
Any other relevant information
```

### Template de Test Report

```markdown
# Test Report - MedFlow v1.0.0

**Date:** 2024-12-09
**Tester:** Nom
**Environment:** Production

## Summary
- Total Tests: 150
- Passed: 145
- Failed: 5
- Blocked: 0
- Pass Rate: 96.7%

## Failed Tests
1. [BUG-001] PDF generation fails on mobile Safari
2. [BUG-002] Payment modal closes unexpectedly
3. [BUG-003] Stats not updating in real-time
4. [BUG-004] Search filter case-sensitive
5. [BUG-005] Date format inconsistent

## Recommendations
- Fix critical bugs before release
- Add more loading states
- Improve error messages

## Sign-off
Ready for production: ✅ Yes / ❌ No
```

---

## 🎯 Critères d'Acceptation

### Definition of Done

Une fonctionnalité est considérée comme "Done" quand :

- [ ] Code écrit et testé localement
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Code review approuvé
- [ ] Documentation mise à jour
- [ ] Tests manuels effectués
- [ ] Accessible (WCAG AA)
- [ ] Responsive (mobile + desktop)
- [ ] Performance acceptable (Lighthouse > 90)
- [ ] Aucune erreur console
- [ ] Aucune regression
- [ ] Déployé en staging
- [ ] Testé en staging
- [ ] Approuvé par Product Owner

---

## 🛠 Outils de Tests

### Recommandés

**Tests Unitaires**
- Vitest
- React Testing Library
- Jest

**Tests E2E**
- Playwright
- Cypress

**Tests Performance**
- Lighthouse CI
- WebPageTest
- GTmetrix

**Tests Accessibilité**
- axe DevTools
- WAVE
- Lighthouse

**Tests Sécurité**
- npm audit
- Snyk
- OWASP ZAP

---

## 📝 Checklist Pré-Release

### Production Readiness

**Code**
- [ ] Tous les tests passent
- [ ] Aucun TODO dans le code
- [ ] Aucune console.log en production
- [ ] Variables d'env configurées
- [ ] Build production réussit

**Performance**
- [ ] Lighthouse score > 90
- [ ] Bundle size optimisé
- [ ] Images optimisées
- [ ] Code splitting activé

**Sécurité**
- [ ] npm audit clean
- [ ] HTTPS activé
- [ ] CORS configuré
- [ ] RLS activé
- [ ] Tokens sécurisés

**UX**
- [ ] Responsive vérifié
- [ ] Loading states partout
- [ ] Error states appropriés
- [ ] Empty states informatifs
- [ ] Accessibilité WCAG AA

**Documentation**
- [ ] README à jour
- [ ] CHANGELOG à jour
- [ ] Guide utilisateur complet
- [ ] Guide déploiement validé

---

**Dernière mise à jour:** Décembre 2024
**Maintenu par:** L'équipe QA MedFlow
