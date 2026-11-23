# Spécification de fonctionnalité : OXO — Comprendre l’économie au Maroc

**Feature Branch**: 001-economie-maroc

**Created**: 2026-11-20

**Status**: Draft

**Input**: Vision produit formulée par le porteur du projet : rendre l’économie et la finance compréhensibles à partir des bases, relier les décisions personnelles et collectives, et utiliser l’IA et des simulations pour faciliter l’apprentissage au Maroc.

## Scénarios utilisateur et validation

### User Story 1 — Comprendre une hausse des prix dans la vie quotidienne (Priority: P1)

En tant qu’apprenant marocain qui n’a pas reçu d’éducation économique structurée, je veux comprendre pourquoi le coût de mon panier peut évoluer et ce que mesure l’inflation, afin de mieux interpréter une information économique et ses effets possibles sur mon budget.

**Why this priority**: Les prix sont une expérience quotidienne qui permet d’introduire les notions économiques avec un exemple concret et vérifiable.

**Independent Test**: Un apprenant suit ce parcours sans tuteur et peut expliquer avec ses mots la différence entre un prix individuel, son panier de dépenses et l’indice national des prix.

**Acceptance Scenarios**:

1. **Given** que l’apprenant ouvre le parcours, **When** il compare une sélection de dépenses à une mesure nationale, **Then** l’expérience explique les différences de couverture et de période avec la source et sa date.
2. **Given** qu’un terme comme inflation ou indice des prix apparaît, **When** l’apprenant demande sa définition, **Then** une explication simple et un exemple marocain s’affichent.
3. **Given** que les données actuelles ne sont pas disponibles, **When** le parcours est ouvert, **Then** la date des dernières données reste visible et aucune valeur n’est présentée comme actuelle.

### User Story 2 — Explorer une simulation sans confondre scénario et prévision (Priority: P1)

En tant qu’apprenant, je veux modifier une hypothèse simple et observer son effet dans un modèle pédagogique, afin de comprendre les liens entre des variables plutôt que de mémoriser des définitions.

**Why this priority**: Les interactions causales et les conséquences visibles forment la valeur distinctive du produit.

**Independent Test**: À partir d’un scénario fourni, l’apprenant modifie au moins une variable, voit le résultat recalculé et identifie l’hypothèse modifiée ainsi qu’une limite du modèle.

**Acceptance Scenarios**:

1. **Given** un scénario de panier de dépenses, **When** l’apprenant fait varier les prix de quelques catégories, **Then** le coût total et la variation simulée sont recalculés et chaque hypothèse est affichée.
2. **Given** un résultat de simulation, **When** l’apprenant le consulte, **Then** l’interface précise qu’il s’agit d’un scénario pédagogique, pas d’une prévision ni de la mesure officielle de l’IPC.
3. **Given** une entrée absente ou hors limites, **When** l’apprenant essaie de lancer le scénario, **Then** l’interface explique comment corriger l’entrée sans produire de résultat trompeur.

### User Story 3 — Lire un arbitrage du budget public (Priority: P2)

En tant qu’apprenant, je veux explorer un exemple simplifié de répartition des dépenses et recettes publiques, afin de comprendre les arbitrages et les conséquences possibles pour différents secteurs.

**Why this priority**: Ce parcours relie l’économie aux choix collectifs et distingue OXO d’un outil limité à la gestion individuelle de l’argent.

**Independent Test**: L’apprenant modifie la répartition d’un budget pédagogique, compare deux résultats et peut nommer au moins un arbitrage ainsi qu’une limite de la simulation.

**Acceptance Scenarios**:

1. **Given** un scénario explicitement identifié comme pédagogique, **When** l’apprenant modifie une allocation budgétaire, **Then** les conséquences prévues par les règles du scénario sont affichées avec leurs hypothèses.
2. **Given** une valeur issue d’un document officiel marocain, **When** elle est affichée, **Then** la source, la période, l’unité et son statut (observé, prévu ou simulé) sont indiqués.
3. **Given** plusieurs options de politique publique, **When** l’apprenant les compare, **Then** l’expérience montre les compromis selon les hypothèses sans qualifier une option de politiquement correcte.

### User Story 4 — Demander une explication guidée par l’IA (Priority: P2)

En tant qu’apprenant, je veux poser une question sur le concept ou la simulation en cours, afin d’obtenir une explication adaptée à mon niveau et de poursuivre mon raisonnement.

**Why this priority**: L’IA rend l’expérience accessible et adaptative tout en restant ancrée dans un parcours pédagogique conçu et vérifié.

**Independent Test**: L’apprenant pose une question sur le contenu ouvert et reçoit une réponse compréhensible, sourcée et limitée au corpus pédagogique approuvé, ou une réponse claire indiquant que le corpus ne permet pas de répondre.

**Acceptance Scenarios**:

1. **Given** une question couverte par le contenu relu, **When** l’apprenant sollicite le tuteur, **Then** la réponse explique le concept avec une référence et peut poser une question de compréhension.
2. **Given** une question portant sur une donnée absente ou non vérifiée, **When** le tuteur répond, **Then** il signale la limite et n’invente ni chiffre ni source.
3. **Given** une demande de recommandation personnalisée d’investissement, **When** le tuteur répond, **Then** il reste dans l’éducation générale et ne désigne aucun placement adapté à la personne.

### Cas limites

- Le panier choisi par l’apprenant diffère fortement du panier statistique national.
- La source officielle change sa méthodologie, sa période, son unité ou son URL.
- Les données sont anciennes, indisponibles, contradictoires ou uniquement publiées sous forme de document.
- Un scénario a plusieurs effets qui dépendent d’hypothèses non incluses dans le modèle.
- Une question IA concerne une actualité postérieure aux sources approuvées ou demande une prédiction.
- L’apprenant utilise un écran mobile étroit, une connexion lente ou une préférence de langue non prise en charge.
- Un utilisateur interprète une simulation comme un conseil financier ou une position officielle.
- Un apprenant saisit spontanément des données financières personnelles dans sa question au tuteur.

## Exigences

### Exigences fonctionnelles

- **FR-001**: Le produit MUST proposer un parcours guidé qui explique les notions de base en reliant finance quotidienne et économie marocaine.
- **FR-002**: Le produit MUST associer chaque donnée factuelle marocaine à sa source, son éditeur, sa date, sa période et son unité lorsqu’ils s’appliquent.
- **FR-003**: Le produit MUST séparer visuellement les données observées, les projections attribuées à leur éditeur et les variables hypothétiques.
- **FR-004**: Le produit MUST permettre à l’apprenant de modifier au moins une variable dans un scénario et d’observer le résultat recalculé.
- **FR-005**: Chaque simulation MUST afficher ses hypothèses, ses limites et un avertissement visible qu’elle ne constitue pas une prévision.
- **FR-006**: Le produit MUST proposer un scénario d’introduction aux prix et à l’inflation ainsi qu’un scénario pédagogique de budget public.
- **FR-007**: Le produit MUST inclure un glossaire en langage clair pour les termes utilisés dans ces parcours, avec une définition courte, un exemple marocain lorsque pertinent et des liens vers les concepts associés.
- **FR-008**: Le tuteur IA MUST répondre à partir de contenus relus et MUST associer aux réponses factuelles les sources correspondantes.
- **FR-009**: Le tuteur IA MUST signaler les questions non couvertes et MUST éviter d’inventer des données ou des citations.
- **FR-010**: Le produit MUST préserver la distinction entre faits, interprétations, hypothèses et opinions politiques.
- **FR-011**: L’expérience MVP MUST fonctionner dans un navigateur mobile sans exiger la création d’un compte.
- **FR-012**: Le MVP MUST être disponible en français simple. Les termes difficiles doivent être accompagnés d’explications; l’usage du Darija dans l’interface et l’audio sera testé avec le public pilote.
- **FR-013**: Le MVP MUST rester éducatif et MUST exclure les transactions, la collecte d’identifiants financiers et les recommandations personnalisées de placement.
- **FR-014**: Le produit MUST indiquer la date de dernière revue éditoriale de chaque parcours à un emplacement visible et cohérent avec la version publiée.
- **FR-015**: Le tuteur MUST ne jamais demander de données financières personnelles et MUST avertir l’apprenant de ne pas partager d’identifiants, de soldes ou de revenus privés. Les questions ne sont pas conservées après la session MVP.

### Entités principales

- **Parcours d’apprentissage**: suite ordonnée d’objectifs, concepts, explications et activités.
- **Concept**: notion, définition en langage clair, exemples, prérequis et concepts liés.
- **Scénario**: situation réelle ou hypothétique avec objectif pédagogique et règles de calcul explicites.
- **Variable de simulation**: valeur d’entrée, unité, domaine autorisé, origine et statut.
- **Résultat de simulation**: résultat calculé à partir des entrées et règles d’un scénario donné.
- **Source**: publication ou jeu de données avec éditeur, URL, date, période, unité et concepts soutenus.
- **Révision éditoriale**: version validée du contenu, statut de revue et date de mise à jour.
- **Progression apprenant**: étapes achevées et réponses d’apprentissage conservées de manière anonyme dans le MVP.

## Critères de succès

### Résultats mesurables

- **SC-001**: Au moins 80 % des participants pilotes terminent le parcours d’introduction sans aide d’un facilitateur.
- **SC-002**: Au moins 4 participants sur 5 expliquent correctement, après le parcours, la différence entre évolution de leur panier et IPC national.
- **SC-003**: Au moins 75 % des participants modifient une hypothèse, interprètent le résultat et identifient une limite du scénario.
- **SC-004**: 100 % des chiffres officiels affichés dans le MVP ont une source, une période et un statut vérifiables.
- **SC-005**: Pour chaque réponse factuelle du tuteur IA, l’apprenant peut consulter les références utilisées ou voit clairement que le corpus ne permet pas de répondre.
- **SC-006**: Dans un entretien de retour, au moins 4 participants sur 5 décrivent une notion économique qu’ils peuvent maintenant relier à une situation de la vie quotidienne.

## Hypothèses

- Le premier public de validation est constitué d’adultes de 18 à 30 ans au Maroc, notamment étudiants et jeunes actifs qui n’ont pas bénéficié d’un enseignement économique structuré. Cette hypothèse doit être validée par recherche utilisateur.
- Le français simple est la langue de contenu initiale du prototype. Des explications en Darija seront testées avant toute décision de généralisation.
- Le MVP est une expérience web conçue d’abord pour mobile; aucun compte n’est requis.
- Les sources officielles publiques sont prioritaires pour les faits et indicateurs, sans être présentées comme une validation indépendante de toutes les interprétations.
- Les simulations utilisent un modèle pédagogique volontairement simplifié. Les résultats ne prétendent pas représenter l’ensemble de l’économie marocaine.
- Les seuils de succès sont des cibles initiales à revoir après un premier pilote.
- Les contenus et scénarios doivent être relus par des personnes compétentes en économie et par des utilisateurs marocains avant publication.
- Le choix d’un fournisseur ou d’un modèle IA et l’architecture d’implémentation sont des décisions ultérieures; ils doivent respecter la constitution et la politique de données.
