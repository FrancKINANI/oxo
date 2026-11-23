# Plan de réalisation : OXO — Comprendre l’économie au Maroc

**Branch**: 001-economie-maroc | **Date**: 2026-11-20 | **Spec**: spec.md

**Input**: Spécification fonctionnelle de specs/001-economie-maroc/spec.md

## Résumé

Créer une première expérience éducative web mobile qui relie dépenses du quotidien et mécanismes économiques au Maroc. Le MVP guide l’apprenant à travers un parcours sur les prix et l’IPC, une simulation modifiable de panier, un scénario pédagogique sur les arbitrages du budget public et un tuteur IA limité à des contenus et sources relus.

Le produit s’appuie sur les ressources marocaines déjà publiées et ajoute des explications progressives, des liens entre concepts et des scénarios manipulables.

## Contexte technique

**Langage/version** : à décider avant l’implémentation; le prototype fonctionnel ne dépend pas d’un choix de pile irréversible.

**Dépendances principales** : aucune API économique en temps réel pour le MVP; contenu et données sélectionnés puis revus avant publication. Tuteur IA derrière une interface contrôlée, fournisseur à choisir après revue de confidentialité et de qualité.

**Stockage** : état de simulation et progression de session en mémoire locale; aucune donnée financière personnelle ou compte utilisateur requis; les questions du tuteur ne sont pas conservées après la session.

**Validation** : vérification indépendante des calculs, revue éditoriale des sources et sessions observées auprès d’un petit groupe pilote. Dans l’étape documentaire actuelle, la validation porte sur les contenus et les parcours prototypes; l’implémentation logicielle devra ajouter des tests automatisés sur les règles de calcul, les métadonnées des sources, les états d’entrée invalides et les abstentions du tuteur avant toute intégration.

**Plateforme cible** : expérience web responsive, optimisée pour mobile; mode hors ligne complet non requis pour le MVP.

**Type de projet** : produit éducatif web avec contenu structuré, simulations pédagogiques et tuteur conversationnel limité.

**Objectifs de performance** : les calculs locaux s’affichent sans attente perceptible; l’interface annonce une attente ou une indisponibilité si le tuteur IA ne répond pas.

**Contraintes** : sources traçables et datées; séparation entre faits, hypothèses et opinions; langage simple; aucune recommandation individualisée de placement; aucun compte ni publicité de produit financier.

**Échelle/périmètre** : prototype destiné à valider le produit avec un groupe pilote marocain; pas de charge de production, couverture nationale exhaustive ou mise à jour temps réel.

## Vérification de la constitution

- Apprentissage avant action : conforme, les simulations servent un objectif pédagogique.
- Hypothèses et sources visibles : conforme, les données et périodes sont référencées.
- Jugement indépendant : conforme, le scénario public montre les compromis sans prescrire une opinion.
- IA bornée : conforme, le tuteur se limite au corpus relu et peut s’abstenir.
- Accessibilité et apprentissage mesurable : conforme sous réserve de tester le français simple et le Darija.
- Données et confidentialité : conforme, MVP anonyme sans information financière personnelle.
- Absence de vente et transaction : conforme.

Aucune dérogation constitutionnelle n’est identifiée.

## Phase 0 — Recherche

Les décisions et sources sont dans research.md. La recherche conduit à :
1. Positionner le MVP sur la compréhension économique située et les liens entre quotidien, données et décisions collectives.
2. Commencer par une expérience web mobile sans compte et sans donnée en temps réel.
3. Utiliser HCP et Ministère des Finances pour les prix et le budget; ajouter Bank Al-Maghrib pour les mécanismes monétaires.
4. Traiter le tuteur IA comme une aide dans le parcours, jamais comme le produit entier.
5. Valider le public, les langues et la valeur du tuteur avec des utilisateurs avant expansion.

## Phase 1 — Conception du produit

### Architecture de contenu

- Parcours d’apprentissage contenant objectifs, étapes, notions, explications et activités.
- Concepts reliés à leurs prérequis et à des références.
- Scénarios définis par variables, règles, résultats, hypothèses et limites.
- Sources liées aux contenus et révisions éditoriales.
- Progression temporaire et non identifiante.

Le modèle conceptuel complet est dans data-model.md.

### Interfaces et contrats

Le MVP ne publie pas d’API tierce et ne dépend pas de données économiques en direct. Les comportements visibles ont leurs critères d’acceptation dans spec.md. Le contrat d’intégration IA et le fournisseur restent des décisions d’implémentation; le fournisseur doit respecter FR-008 et FR-009 et être revu pour la confidentialité.

### Guide de validation

quickstart.md décrit une session de prototype de bout en bout et les résultats d’apprentissage à observer.

## Structure documentaire et produit envisagée

    content/
      morocco/
        sources.md
        concepts/
        journeys/
        scenarios/
    prototype/
      web/
    research/
      user-interviews.md

Les dossiers applicatifs réels et la pile technique seront choisis après validation du prototype et revue d’architecture. Les spécifications restent la source de vérité du produit.

## Vérification après conception

- Pas de recommandation de placement ni de parcours commercial : conforme.
- Sources et hypothèses documentées : conforme.
- Aucune collecte de données personnelles dans le MVP : conforme.
- Neutralité et distinction fait/hypothèse : conforme.
- Pile technique différée sans effet sur les exigences produit : conforme.

## Suivi de complexité

Aucune dérogation à justifier.
