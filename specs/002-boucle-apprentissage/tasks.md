# Tâches — Boucle d’apprentissage OXO

**Règle de livraison** : un lot par branche/PR. Exécuter `npm run verify` et `npm run build`, puis attendre la CI verte avant d’entamer le lot suivant. Ne pas fusionner sans revue autorisée.

## Lot A — Données HCP et simulation

- [x] A001 Ajouter un modèle `DataPoint` / `SnapshotId` avec période de référence, période comparée, unité, géographie, éditeur, titre, URL, date de publication, date de collecte et statut éditorial.
- [x] A002 Créer le snapshot HCP d’octobre 2026 à partir des sources S1/S2 et lier les données de leçon par ID stable.
- [x] A003 Corriger la scène d’observation pour afficher IPC +1,9 % annuel, alimentation +0,3 % annuel, transport +11,6 % annuel et légumes +6,8 % mensuel, avec provenance lisible et badge cohérent.
- [x] A004 Corriger les textes du panier 240 DH : exemple fixe, panier fictif simplifié, base mensuelle et hypothèse pédagogique.
- [x] A005 Étiqueter les poids 40/25/35 comme hypothèses; afficher le seul poids officiel alimentaire 37,28 % et « 12 postes officiels vs 3 postes simplifiés ».
- [x] A006 Ajouter le preset « Scénario réel octobre 2026 » et distinguer mode observé du mode libre hypothétique.
- [x] A007 Marquer les contenus éditoriaux modifiés `to_review` avec date de revue.
- [x] A008 Tester la complétude de provenance, la cohérence période/publication et l’affichage du preset.
- [x] A009 Mettre à jour `docs/architecture.md` et `docs/production.md`; mesurer la taille gzip et vérifier les contraintes CSP/offline.
- [x] A010 Exécuter verify/build, relire le diff, pousser la branche et ouvrir la PR Lot A. CI verte sur la PR #5.

## Lot B — Manifestes, i18n et graphe

- [x] B001 Définir et valider au build le `LessonManifest` complet (objectifs, prérequis, références, modèle/paramètres, blocs, quiz et revue éditoriale).
- [x] B002 Migrer la leçon existante et les concepts vers le manifeste sans changement visible non demandé.
- [x] B003 Généraliser le pipeline de validation pour faire échouer les contenus incomplets avec un champ explicite.
- [x] B004 Placer les chaînes UI dans le catalogue `fr` et retirer les chaînes d’interface des composants.
- [x] B005 Définir les types/nœuds/arêtes du graphe de concepts sans moteur adaptatif.
- [x] B006 Structurer la leçon inflation en observation, mécanisme, formalisation, limites et récupération; statut `to_review`; mettre à jour les tests/docs.
- [x] B007 Vérifier, construire, contrôler le budget gzip et livrer la PR Lot B après CI verte du lot A (PR #6 fusionnée; CI verte).

## Lot C — Interpréter et synthèse

- [x] C001 Étendre `StepId`, routage et navigation aux étapes interpréter et synthèse.
- [x] C002 Ajouter les questions à misconception et des explications ciblées pour chaque mauvaise réponse.
- [x] C003 Ajouter une restitution libre avec mots-clés/grille d'auto-évaluation, sans correction générative.
- [x] C004 Ajouter la synthèse idée clé, limites, sources et prochaine étape.
- [x] C005 Définir des événements versionnés `step_completed`, `quiz_answered`, `hypothesis_changed`, `tutor_abstention`.
- [x] C006 Persister localement concepts vus, quiz réussis et révision; traiter proprement les données locales invalides.
- [x] C007 Tester le parcours complet et la persistance; vérifier/build puis PR Lot C après CI verte du lot B.

## Lot D — Tuteur et accessibilité

- [x] D001 Remplacer les déclencheurs de refus par un appariement intention/contexte; traiter « acheter des tomates » et « les soldes » sans faux refus.
- [x] D002 Étendre le corpus et créer un jeu doré couvrant hors corpus, misconceptions, adversarial, abstention, sur-refus et conformité.
- [x] D003 Partager un piège de focus accessible pour InfoDialog et TutorDock avec fermeture clavier et retour de focus.
- [x] D004 S’assurer que les curseurs annoncent leur valeur et leur sens par `aria-valuetext`.
- [x] D005 Borner `calculateBasket` contre NaN, valeurs négatives et valeurs supérieures à 100; dédupliquer percentChange/weightedChange.
- [x] D006 Relier les termes du glossaire aux concepts correspondants.
- [x] D007 Mettre à jour les tests/docs, vérifier/build, mesurer gzip et livrer la PR Lot D après CI verte du lot C.

## Clôture

- [x] Z001 Vérifier ≥3 chiffres HCP avec provenance complète et période de référence octobre 2026.
- [x] Z002 Vérifier les quatre étapes de la boucle, le manifeste, i18n, le graphe et les événements locaux.
- [x] Z003 Confirmer absence de réseau, LLM, télémétrie, contenu anglais/darija, adaptativité et dépendance runtime ajoutée.
- [x] Z004 Dans la PR finale, rappeler les actions humaines : protection `main` avec PR obligatoire/CI verte et déploiement Vercel uniquement depuis `main`.
