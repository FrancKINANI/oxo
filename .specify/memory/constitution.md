<!-- Sync Impact Report
Version change: initial constitution → 1.0.0
Added principles: learning before action; transparent models and sources; nonpartisan civic-economic education; bounded AI; accessibility and privacy.
Added sections: Product and data constraints; Spec-driven workflow.
Deferred items: final target cohort and language mix to validate during pilot research.
-->

# OXO Constitution

## Core Principles

### I. Teach Understanding Before Action
OXO MUST help learners build transferable understanding of finance and economics before it introduces decisions or actions. Lessons MUST connect concepts to everyday situations and show how ideas relate across household, market, and public levels. Completion badges or engagement mechanics MUST NOT substitute for demonstrated comprehension.

### II. Make Assumptions, Sources, and Uncertainty Visible
Every factual economic claim MUST identify its source and reference date. Every simulation MUST distinguish observed data from assumptions and hypothetical choices. OXO MUST show the limits of simplified models and MUST NOT present scenario outputs as forecasts or guarantees.

### III. Support Independent, Nonpartisan Judgment
OXO MUST explain economic mechanisms, evidence, and plausible trade-offs without instructing learners which political position to adopt. Content about public policy MUST distinguish stated policy goals, observed results, and competing interpretations. The product MUST not disguise advocacy or commercial promotion as education.

### IV. Keep AI Within a Reviewed Learning Experience
AI MUST support a defined learning activity: clarify a concept, ask a learner to reason through a scenario, or explain a result using reviewed OXO material and cited sources. AI MUST say when its sources do not support an answer, MUST NOT invent current facts, and MUST NOT provide personalized investment instructions in the MVP. An open-ended chatbot is not, by itself, a product feature objective.

### V. Design for Accessible, Measurable Learning
The product MUST use plain language, short steps, and interactive examples that work on common mobile screens. MVP content MUST be reviewed with Moroccan learners for comprehension and language fit. Product success MUST be measured by learning and transfer to new examples, not only by time spent, streaks, or lesson completion.

## Product and Data Constraints

The initial product is an educational experience for Morocco. Source material should prioritize public and primary sources, including the Haut-Commissariat au Plan, the Ministry of Economy and Finance, Bank Al-Maghrib, and the AMMC. Source records MUST retain title, publisher, URL, publication or reference date, and the claims or variables they support.

The MVP does not execute transactions, hold funds, connect user accounts, recommend specific securities, or rank financial products. It does not collect personal financial data. Learner progress is anonymous unless a later approved specification defines a clear need, retention period, and consent flow.

## Development Workflow

Use Spec Kit artifacts as the source of truth: constitution, feature specification, research, plan, data model, validation guide, and tasks. New product scope MUST be specified before implementation. Material changes to audience, learning goals, data use, AI behavior, or financial activity require updating the affected specs and reviewing the constitution. Do not select implementation technology unless the feature plan records the reason and alternatives.

## Governance

This constitution governs product decisions and implementation. Proposed amendments must explain the user or learning need, identify affected specifications, and receive project owner review. Versions follow semantic versioning: major for principle changes, minor for new principles or constraints, and patch for clarifications. Every feature plan and implementation review must check alignment with this constitution. The project owner approves scope changes and each release stage.

**Version**: 1.0.0 | **Ratified**: 2026-11-20 | **Last Amended**: 2026-11-20
