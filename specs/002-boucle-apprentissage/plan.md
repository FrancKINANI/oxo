# Plan d’implémentation — Boucle d’apprentissage OXO

**Branche** : `feat/002-apprentissage-lot-a`  
**Date** : 2026-11-24  
**Spécification** : [spec.md](spec.md)

## Résumé

Livrer la refonte en quatre lots indépendants, dans quatre PR successives. Le lot A fiabilise les données HCP d’octobre 2026, leur provenance, et la simulation. Les lots B à D ajoutent ensuite les manifestes typés et l’i18n, la boucle d’apprentissage locale, puis la robustesse du tuteur et l’accessibilité. Chaque lot doit passer `npm run verify` et `npm run build`; le lot suivant ne commence qu’après CI verte.

## Contexte technique

- **Langage** : TypeScript, React 19, Vite; SPA statique.
- **Dépendances** : dépendances runtime existantes seulement; aucune nouvelle dépendance.
- **Persistance** : `localStorage` uniquement, réservé aux préférences/progression définies par la spec; aucun serveur ni télémétrie.
- **Tests** : Vitest, Testing Library, scripts `npm run verify` et `npm run build`.
- **Plateforme** : navigateurs modernes, déploiement statique Vercel.
- **Performance** : bundle gzip ≤ baseline du MVP +10 % (baseline mesurée au lot A).
- **Sécurité** : aucune requête réseau au chargement, aucune IA distante, CSP sans `unsafe-inline`.
- **Portée** : contenu français pour le Maroc; aucun moteur adaptatif, contenu anglais/darija, ou écran hors parcours.

## Ordre et périmètre des lots

### Lot A — Références observées et simulation

Introduire un snapshot HCP typé, daté et référencé par ID stable; afficher les chiffres d’octobre 2026 avec période, unité, territoire, éditeur, URL, date de publication, date de collecte et statut. Corriger le panier de 240 DH, qualifier les poids pédagogiques, et proposer le preset réel alimentaire +0,3 % / transport +11,6 % sur un an. Ajouter les tests de provenance et de cohérence des dates. Mettre à jour la documentation réelle de l’architecture et de production.

### Lot B — Manifeste, locales et concepts

Créer un manifeste de leçon typé et validé au build, migrer le contenu actuel sans changement de comportement, séparer les chaînes d’interface dans le catalogue `fr`, et typer le graphe des concepts. La leçon sur l’inflation suit observation, mécanisme, formalisation, limites et récupération; son contenu reste `to_review`.

### Lot C — Boucle d’apprentissage locale

Ajouter les étapes interpréter et synthèse, les retours de misconception, l’auto-évaluation sans notation générative, et les événements de progression locaux versionnés. Conserver les données uniquement dans le navigateur et gérer les anciennes données invalides sans casser l’application.

### Lot D — Tuteur, modèle et accessibilité

Améliorer l’analyse déterministe du tuteur et son corpus, établir des cas dorés d’abstention et de sur-refus, compléter le piège de focus et les annonces des contrôles, borner les entrées du calcul, supprimer les calculs dupliqués et relier le glossaire aux concepts.

## Vérifications et portes de livraison

Pour chaque lot : `npm run verify`, `npm run build`, inspection du diff, mesure de la taille gzip, mise à jour des documents, branche et PR dédiées. Attendre la CI verte de la PR avant de commencer le lot suivant. La protection de `main` et la restriction Vercel à `main` sont des actions humaines à vérifier avant pilote; elles seront rappelées dans la PR de clôture.

## Structure retenue

```text
src/content/                 Données, leçons, locales et validation de contenu
src/features/prices/         Présentation des observations HCP
src/features/simulation/     Simulation pédagogique et modèle pur
src/features/lesson/         Étapes de leçon et progression
src/features/tutor/          Tuteur local déterministe
src/components/layout/       Navigation, panneaux et dialogues partagés
specs/002-boucle-apprentissage/  Spécification et artefacts de livraison
content/morocco/             Sources éditoriales locales
```

## Décisions structurantes

- Les snapshots sont des données figées du build; aucun fetch de données HCP au runtime.
- Le mode observé et le mode hypothèse sont explicitement séparés dans le modèle et l’interface.
- Les faits officiels ne sont affichés qu’avec source et période; les poids inconnus ne sont pas extrapolés.
- Les quatre lots restent des PR distinctes et ordonnées par la CI.
