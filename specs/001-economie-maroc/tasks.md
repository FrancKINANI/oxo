# Tâches : OXO — Comprendre l’économie au Maroc

**Documents d’entrée** : specs/001-economie-maroc/

**Prérequis** : plan.md et spec.md; research.md, data-model.md, quickstart.md

**Tests logiciels** : aucune tâche de test logiciel n’est incluse; ils n’ont pas été demandés. Les sessions du guide quickstart sont des activités de validation produit.

**Organisation** : les phases suivent les user stories de spec.md.

## Phase 1 : Préparation

**But** : valider les hypothèses d’audience, de sources et de langue avant de produire le prototype.

- [ ] T001 Préparer le guide d’entretien pour des adultes marocains de 18 à 30 ans dans research/user-interviews.md
- [ ] T002 [P] Créer l’inventaire des sources marocaines avec éditeur, titre, date, période et usage dans content/morocco/sources.md
- [ ] T003 [P] Définir les règles de langage simple, neutralité et distinction entre fait et hypothèse dans content/editorial-standard.md

---

## Phase 2 : Fondations de contenu

**But** : établir les formats et contrôles partagés dont toutes les expériences d’apprentissage dépendent.

- [ ] T004 Décrire les champs obligatoires des concepts et références dans content/schema/concept-schema.md
- [ ] T005 Décrire les champs obligatoires d’un scénario, notamment hypothèses, variables, unités, règles et limites, dans content/schema/scenario-schema.md
- [ ] T006 Définir la revue avant publication et le suivi des versions dans content/content-review.md

**Checkpoint** : les contenus et modèles peuvent être produits avec des sources et hypothèses traçables.

---

## Phase 3 : User Story 1 — Comprendre les prix et l’IPC (Priority: P1) MVP

**Goal** : expliquer un changement des prix quotidiens et la différence entre le panier personnel et l’IPC national.

**Independent Test** : suivre quickstart.md jusqu’à la reformulation de l’apprenant, sans tutorat humain.

- [X] T007 [P] Rédiger la fiche du concept inflation dans content/morocco/concepts/inflation.md
- [X] T008 [P] Rédiger la fiche du concept indice des prix et méthodologie IPC dans content/morocco/concepts/ipc.md
- [X] T009 Construire le parcours sur le panier de dépenses et l’IPC en référençant les sources dans content/morocco/journeys/prix-et-ipc.md
- [X] T010 Décrire le flux et les écrans du prototype mobile du parcours guidé dans prototype/web/learning/prix-et-ipc.md

**Checkpoint** : un apprenant peut suivre seul le parcours et décrire une différence entre son panier et l’IPC.

---

## Phase 4 : User Story 2 — Explorer une simulation (Priority: P1)

**Goal** : permettre à l’apprenant de modifier des prix hypothétiques et de voir les conséquences dans un modèle pédagogique.

**Independent Test** : modifier deux variables dans le scénario et expliquer les résultats, les hypothèses et une limite.

- [X] T011 Définir les variables, unités, valeurs d’exemple, règles de calcul et limites dans content/morocco/scenarios/panier-prix.md
- [X] T012 Concevoir l’interaction mobile et les états d’entrée invalide dans prototype/web/simulations/panier-prix.md
- [X] T013 Documenter les résultats affichés et leur distinction avec une prévision ou l’IPC officiel dans content/morocco/scenarios/panier-prix-display.md

**Checkpoint** : chaque valeur calculée peut être reliée aux entrées et règles décrites.

---

## Phase 5 : User Story 3 — Lire un arbitrage de budget public (Priority: P2)

**Goal** : montrer un arbitrage budgétaire à l’aide d’un scénario neutre et sourcé.

**Independent Test** : déplacer une allocation pédagogique et identifier un compromis sans conclure qu’une option est politiquement correcte.

- [ ] T014 [P] Extraire les catégories et références utiles du Budget citoyen du PLF 2027 dans content/morocco/budget-citoyen-source-notes.md
- [ ] T015 Rédiger un scénario de budget pédagogique avec budget fixe, choix d’allocation, conséquences simplifiées et limites dans content/morocco/scenarios/arbitrage-budget-public.md
- [ ] T016 Concevoir l’activité de comparaison d’allocations et l’affichage des hypothèses dans prototype/web/simulations/arbitrage-budget-public.md
- [ ] T017 Faire relire le scénario pour neutralité, attribution des sources et compréhension dans content/reviews/arbitrage-budget-public-review.md

**Checkpoint** : le scénario permet d’identifier au moins un arbitrage et indique clairement qu’il ne reproduit pas une prévision budgétaire.

---

## Phase 6 : User Story 4 — Utiliser le tuteur IA cadré (Priority: P2)

**Goal** : répondre aux questions de l’apprenant dans le parcours en citant le corpus pédagogique et en signalant les limites.

**Independent Test** : poser une question couverte et une question non couverte; la première reçoit une réponse référencée, la seconde une abstention compréhensible.

- [X] T018 Définir les catégories de questions, règles d’abstention, protection contre les données personnelles et formats de réponse dans ai/tutor-behavior.md
- [X] T019 Définir le contrat des citations et des références dans ai/source-attribution.md
- [ ] T020 Comparer les options de confidentialité et consigner la décision de fournisseur avant tout branchement IA dans ai/provider-decision.md
- [X] T021 Concevoir l’état d’erreur et l’explication du tuteur dans prototype/web/tutor/tutor-interaction.md

**Checkpoint** : le tuteur ne présente pas de fait sans référence vérifiable et peut déclarer le corpus insuffisant.

---

## Phase 7 : Revue transversale

**But** : préparer les décisions du premier pilote.

- [ ] T022 [P] Consolider les choix de langue et de public après les entretiens dans research/pilot-decisions.md
- [ ] T023 Mettre à jour ROADMAP.md avec le périmètre confirmé après revue du prototype
- [ ] T024 Comparer les observations pilote aux critères SC-001 à SC-006 dans research/pilot-outcomes.md

---

## Phase 8 : Couverture de validation ajoutée

**But** : fermer les écarts de traçabilité identifiés dans l’analyse des artefacts.

- [ ] T025 [P] Rédiger le glossaire des termes des parcours dans content/glossary.md, avec définition simple, exemple applicable et lien vers les concepts associés
- [ ] T026 Définir la matrice de contrôle de chaque chiffre officiel : source, éditeur, URL, date, période, unité, statut observé/prévu/simulé et date de dernière vérification
- [ ] T027 Définir le corpus approuvé du tuteur, son index des références et les règles d’abstention lorsqu’une question dépasse les sources vérifiées
- [ ] T028 Ajouter à chaque modèle de parcours l’emplacement et le format de la date de dernière revue éditoriale
- [ ] T029 Compléter la grille du pilote avec les mesures SC-001 à SC-006 et les règles de réussite documentées dans quickstart.md
- [ ] T030 Définir le plan de vérification future des règles de calcul, métadonnées de sources, entrées invalides, citations IA et abstentions dans research/implementation-validation.md

## Dépendances et ordre

- Préparation : T001 à T003 peuvent commencer en parallèle.
- Fondations : T004 à T006 démarrent après la disponibilité de l’inventaire et du standard éditorial.
- US1 : T007 et T008 peuvent être rédigées en parallèle; T009 les assemble; T010 transforme le parcours en prototype.
- US2 : T011 vient avant l’interaction T012 et l’affichage T013.
- US3 : T014 alimente T015; T016 et la revue T017 suivent le scénario.
- US4 : T018 et T019 définissent le comportement avant T021; T020 doit précéder toute intégration réelle.
- Revue transversale : T022 et T024 dépendent des entretiens et du pilote; T023 dépend de la décision d’étape.
- Couverture ajoutée : T025 vient des concepts existants; T026 suit l’inventaire T002; T027 suit les règles T018-T019; T028 suit la revue T006; T029 suit le guide pilote; T030 suit les modèles de scénario et les contrats IA.

## Opportunités parallèles

- T002 et T003.
- T007 et T008.
- T014 en parallèle des premiers contenus de US1.
- T018 et T019.
- T022 peut être préparée pendant la mise en place du pilote.
- T025, T026, T027 et T028 peuvent être réalisées en parallèle une fois les fondations disponibles.

## Stratégie de livraison

1. Confirmer l’audience, la langue et les sources dans la phase de préparation.
2. Réaliser un MVP démontrable avec US1 et US2 : parcours prix/IPC et simulation du panier.
3. Ajouter US3 si les utilisateurs comprennent la simulation et souhaitent explorer les choix publics.
4. Ajouter US4 après vérification que les réponses IA peuvent être limitées et référencées de manière fiable.
5. Revoir les critères d’apprentissage et la feuille de route après le pilote.

## Notes

- Les tâches marquées [P] sont indépendantes et peuvent être réalisées en parallèle.
- Les tâches US1 à US4 correspondent aux parcours de spec.md.
- Les chemins d’application désignent les livrables à créer; la pile technique doit être décidée avant de remplacer les prototypes documentaires par du code.
