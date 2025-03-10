# GreenThumb - Plateforme d'Agriculture et de Jardinage Marocain

GreenThumb est une plateforme web complète dédiée à l'agriculture et au jardinage marocain, mettant en valeur les plantes traditionnelles, les techniques agricoles locales et le riche patrimoine horticole du Maroc.

## Pages et Fonctionnalités

### 1. Accueil (index.html)

- Hero section avec appel à l'action
- **Paroles et phrases sur l'agriculture et le jardinage marocain**
- Catégories populaires avec images
- Navigation intuitive
- Design responsive et moderne
- **Possibilité de switcher en mode sombre**
- Animations AOS pour le défilement

### 2. Plantes (plantes.html)

- Catalogue complet des plantes marocaines
- Noms en français et arabe
- **Système de filtrage avancé** :
  - Par saison (été, automne, hiver)
  - Par type (aromatiques, médicinales, ornementales)
- **Système de recherche dédié** (barre de recherche en temps réel)
- Images haute qualité
- Descriptions détaillées et conseils de culture
- **Possibilité de switcher en mode sombre**

### 3. Jardins (jardins.html)

- Galerie des jardins traditionnels marocains
- **Système de recherche dédié**
- **Guide pratique du jardinage marocain** en grille responsive
- **Export PDF des fiches de jardins**
- Caractéristiques détaillées :
  - Style de jardin
  - Surface recommandée
  - Types de plantes adaptées
  - Systèmes d'irrigation
- **Possibilité de switcher en mode sombre**

### 4. Boutique (boutique.html)

- Catalogue organisé de produits
- **Système de filtrage par catégories** :
  - Graines et Semences
  - Outils de Jardinage
  - Décoration de Jardin
- **Tri des produits** :
  - Par prix (croissant/décroissant)
  - Par nom
- **Panier d'achat interactif** :
  - Ajout/suppression via `addToCart()`
  - Mise à jour des quantités
  - Calcul automatique du total
  - Modal de panier (`cart-modal`) fixé à droite
- Animations d'ajout au panier
- Stockage des données dans `localStorage`
- **Possibilité de switcher en mode sombre**

### 5. Blog (blog.html)

- Articles sur l'agriculture marocaine
- **Système de pagination**
- **Système de recherche dédié**
- **Section de commentaires interactive**
- Mise en page responsive
- **Possibilité de switcher en mode sombre**

### 6. Contact (contact.html)

- Formulaire de contact avec validation
- Carte de localisation interactive
- Informations de contact (email, téléphone)
- Heures d'ouverture
- Validation des entrées en temps réel
- **Possibilité de switcher en mode sombre**

## Architecture Technique

### Structure des Fichiers

GreenThumb/
├── css/
│   ├── boutique-style.css     # Styles de la boutique
│   ├── components.css         # Styles des composants réutilisables
│   ├── dark-mode.css          # Styles du thème sombre
│   ├── enhanced-style.css     # Styles améliorés
│   ├── jardins-style.css      # Styles de la page jardins
│   ├── modern-style.css       # Styles modernes
│   ├── pages-style.css        # Styles spécifiques aux pages
│   ├── plantes-style.css      # Styles de la page plantes
│   └── style.css              # Styles globaux
├── js/
│   ├── blog.js               # Logique du blog
│   ├── boutique.js           # Logique de la boutique
│   ├── cart.js               # Gestion du panier
│   ├── category-filter.js    # Filtrage par catégories
│   ├── contact.js            # Gestion du formulaire de contact
│   ├── content-toggle.js     # Basculement de contenu
│   ├── dark-mode.js          # Gestion du mode sombre
│   ├── drag-drop.js          # Fonctionnalités glisser-déposer
│   ├── enhanced-interactions.js # Interactions améliorées
│   ├── export-pdf.js         # Exportation PDF
│   ├── jardins.js            # Logique de la page jardins
│   ├── main.js               # JavaScript principal
│   ├── nav.js                # Navigation
│   ├── plantes.js            # Logique de la page plantes
│   ├── search-jardins.js     # Recherche dans les jardins
│   ├── search.js             # Recherche globale
│   └── theme.js              # Gestion des thèmes
├── articles/                 # Articles du blog
│   └── menthe-marocaine.html # Article sur la menthe
├── index.html               # Page d'accueil
├── plantes.html             # Page des plantes
├── jardins.html             # Page des jardins
├── boutique.html            # Page de la boutique
├── blog.html                # Page du blog
├── contact.html             # Page de contact
└── README.md                # Documentation du projet

## Technologies Utilisées

#### Frontend

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, animations
- **JavaScript ES6+** : Interactivité dynamique

#### Bibliothèques

- **Font Awesome** : Icônes
- **Google Fonts** : Polices (Poppins, Noto Sans Arabic)
- **html2pdf.js** : Exportation PDF
- **AOS** : Animations au défilement

#### Fonctionnalités Avancées

- **Mode sombre/clair persistant** (activable dans toutes les pages)
- Support multilingue (français/arabe)
- Responsive design (breakpoints 768px, 480px)
- LocalStorage pour le panier et les préférences
- Validation des formulaires

## Performance et Optimisation

- Chargement différé des images
- Minification des fichiers CSS/JS
- Animations optimisées
- Support des navigateurs modernes

## Sécurité

- Validation des entrées
- Protection contre XSS
- Sanitization des données

## Installation et Prérequis

### Démarrage Rapide
- Ouvrir `index.html` dans un navigateur moderne
- **Connexion Internet requise** pour :
  - Polices Google Fonts
  - Icônes Font Awesome
  - Bibliothèque html2pdf.js

## Maintenance et Bonnes Pratiques

### 1. Mises à jour Recommandées
- Vérifier les dépendances externes
- Maintenir le contenu des articles et produits
- Mettre à jour les prix de la boutique

### 2. Tests et Performance
- Tester sur divers appareils et navigateurs
- Surveiller les performances avec Lighthouse
- Effectuer des sauvegardes régulières
- Optimiser les images et ressources

## Contribution

### Guide de Contribution
1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouveau`)
3. Commiter les changements
4. Pousser la branche
5. Ouvrir une Pull Request

## Support et Contact

### Nous Contacter
- **Email** : contact@greenthumb.ma
- **Téléphone** : +212 5XX-XXXXXX
- **Site web** : www.greenthumb.ma