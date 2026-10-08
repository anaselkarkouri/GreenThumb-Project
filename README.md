# GreenThumb — Jardinage et patrimoine végétal marocain

Un site web consacré aux plantes, aux jardins marocains et aux conseils de jardinage. Le projet associe contenus éditoriaux et interactions côté navigateur : recherche, filtres, panier et export PDF.

**HTML5 · CSS3 · JavaScript · localStorage · html2pdf.js · Responsive design**

## Fonctionnalités

- Accueil et navigation entre sept pages : plantes, jardins, boutique, blog, contact et article détaillé.
- Catalogue de plantes, catégories et conseils saisonniers.
- Recherche de jardins et export PDF de leurs fiches.
- Boutique avec filtres, tri et panier conservé dans le navigateur.
- Blog, pagination et articles de jardinage.
- Thème clair/sombre mémorisé et interfaces adaptées aux différentes tailles d’écran.
- Formulaire de contact et parcours de commande de démonstration côté navigateur.

## Lancer le site

```bash
git clone https://github.com/anaselkarkouri/GreenThumb-Project.git
cd GreenThumb-Project
python -m http.server 8087 --bind 127.0.0.1
```

Ouvrir `http://127.0.0.1:8087`. Les bibliothèques PDF, les polices et certaines illustrations sont chargées depuis leurs services externes. Le site est une réalisation front-end : le panier, les messages et les parcours présentés servent la démonstration de l’interface.

## Vérifications

Les sept pages ont passé les contrôles DOM : aucun fichier local référencé manquant, aucun échec d’exécution dans le harnais, recherche de jardins, affichage des requêtes comme texte, ajout unique au panier et changement de thème. Les scripts JavaScript passent la vérification syntaxique. Les contenus, scripts et documents du dépôt existant restent suivis dans son historique Git.

## Aperçu

![Accueil mobile](docs/media/accueil-mobile.jpg)

Capture réelle de la version publiée, octobre 2026.

## Documents

- [Présentation du projet](Green%20Modern%20Gardening%20Presentation.pdf)
- [Proposition de campagne marketing](Document%20Proposition%20de%20Campagne%20Marketing%20en%20Vert.pdf)

Projet présenté dans le portfolio d’**Anas El Karkouri**.
