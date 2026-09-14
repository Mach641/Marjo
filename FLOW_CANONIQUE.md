# Voyage canonique — V1.4.43

## Source de vérité

`CONFIG.journeyChapters` définit les chapitres, leurs défis et leurs pauses. `CONFIG.routeOrder` est dérivé de cette configuration, sans ordre numérique implicite :

**D1 → D2 → pause 1 → D3 → D5 → pause 2 → D6 → D7 → pause 3 → D8 → D4 → final.**

D8 reste avant-dernier : sa projection dans le futur lointain prépare le retour au présent de D4. Les identifiants et dossiers des défis ne changent pas.

## Transitions persistées

`journey-state.js` est commun à l'application, aux raccourcis et aux tests :

- `completedChallenges[id]` : gameplay terminé.
- `rewardStage = {chapterId, phase: "conclusion"}` : conclusion à afficher, y compris après fermeture/rechargement.
- Au CTA, `phase: "reveal"` : retour au carnet et flip du seul souvenir gagné.
- `revealedMemories[id]` : face visible et accès au contenu. Enregistré au lancement du flip ; un reload pendant le flip affiche la face, sans répétition.
- `galleryViewed` et `revealedScenes` : consultation des contenus et scènes, sans changement de la mécanique decor/full.
- `illustrations[id]` : souvenir/remise terminé, distinct de la réussite du gameplay.
- `resumedPauses[id]` : reprise explicitement validée. Atteindre l'horaire seul ne fait pas apparaître la prochaine carte.

Les gardes de navigation appliquent les mêmes règles aux clics, au hash et au reload. Une conclusion en attente ne peut pas être sautée en demandant directement une galerie. Un défi futur reste inaccessible et invisible.

## Conclusions et récompenses

D1/D2/D3/D5/D6/D7/D8/D4 : gameplay → conclusion arc-en-ciel → CTA → carnet → flip → souvenir → remise → état stable, pause ou séquence finale après D4.

Un seul composant de conclusion reprend la composition D8. Ses copies se trouvent dans `CONFIG.text.conclusions`. D8 conserve exactement ses deux phrases et son CTA « Continuer », sans deuxième conclusion.

D2 conserve ses résultats de profil dans le contenu associé au polaroid. D6 conserve les quatre thèmes, leurs illustrations intermédiaires puis sa conclusion de récompense et la remise physique, sans galerie classique inventée. D7 conserve sa conclusion de récompense. Les galeries et handovers existants restent en place.

D4 suit le flow canonique jusqu'à la remise de sa dernière image physique : défi manuel du coucher de soleil, conclusion arc-en-ciel, retour carnet, flip, galerie portrait puis « Je l’ai ». La séquence spéciale commence ensuite : `password → final-handover → final`. La boîte reste inaccessible avant la validation de `MYMPVTME` et l'état final persiste avec `huntCompleted`.

## Trois pauses, un composant

| Pause | Après | Cible absolue (Paris/Majorque) | Prochain verso |
|---|---|---|---|
| pause-1 | D2 | 18 septembre 2026, 12:00 +02:00 | D3 |
| pause-2 | D5 | 19 septembre 2026, 08:00 +02:00 | D6 |
| pause-3 | D7 | 19 septembre 2026, 18:00 +02:00 | D8 |

Les cibles ISO sont configurables. Le calcul utilise l'instant absolu, pas le nom du jour ni le fuseau courant de l'appareil.

Avant la cible : carnet vu de dos, narration, countdown. Après la cible : carnet fermé face avant et « Reprendre le voyage ». Au clic seulement : hub et prochain verso sans flip. Recalcul au rendu, chaque seconde, à la visibilité et au retour de page ; le système fonctionne même si la PWA était fermée pendant l'échéance.

La face avant réutilise le PNG du prologue. Le dos est une couverture simple en CSS et texture existante. Les copies de pause, la question contemplative de pause 1 et la présentation des nouveaux écrans sont à valider visuellement. Aucun champ de réponse ou contrôle de position.

## Sauvegardes

`stateVersion` passe de 3 à 4 : les anciennes sauvegardes de développement incompatibles avec l'ancien ordre repartent au prologue. Ce reset concerne les anciennes sauvegardes normales et debug, sans nouvelle couche de compatibilité. Les sauvegardes version 4 persistent normalement.

Le mode debug conserve sa clé séparée. `debugTimeOffsetMs` simule une horloge qui continue d'avancer ; cette valeur est ignorée en production.

## Legacy retiré

Suppression de la branche interactive aéroport : configuration de coordonnées, GPS, flags de position et de réouverture en vol, devinette interactive, départ/avion, anciens verrous jeudi/vendredi et leurs handlers.

Les routes `geo`, `departure`, `flight`, `friday-returned`, `travel-past-large`, `thursday-lock`, `friday-lock`, `saturday-intro`, les anciens `resolution-*`/`reveal-*` et `book-closed` ne sont plus proposées ni déclarées. Une ancienne URL retombe sur l'état canonique autorisé, sans restaurer son écran.

Les voyages temporels génériques restent utilisés légitimement par les galeries. Leurs animations n'ont pas été supprimées avec la branche aéroport. Aucun ancien hub « Mes souvenirs ».

## Mode test

Le sélecteur propose pour chaque défi : disponible, gameplay, conclusion, révélation, contenu, remise, souvenir terminé ; et pour chaque pause : avant cible, reprise disponible, chapitre repris. D4 ajoute les étapes du coucher de soleil, de la galerie, du mot de passe, de la boîte et de la fin persistée. Ces fixtures utilisent les transitions de production et simulent un instant cohérent avec les chapitres déjà repris.

L'horloge de test se règle en heure de Paris. « Heure réelle » retire l'override. Il n'y a plus de raccourci aéroport, de contrôle GPS ni de bypass automatique des pauses.

## Validation

```sh
node tests/journey-state.mjs
node tests/canonical-journey.cjs
```

Le test navigateur nécessite Playwright ; `PLAYWRIGHT_MODULE` et `CHROME_PATH` peuvent désigner une installation existante. Il démarre son propre serveur temporaire.

Contrôles réalisés :

- Machine d'état : ordre, refus des actions prématurées, instant limite de chaque pause, sérialisation/reprise, flip unique, absence de D9.
- Navigateur : huit parcours réels, huit conclusions et leur reload, récompenses, pauses et reprises ; six portes, sept chansons, quarante réponses de couple, trois photos, cinq choix de route, quatorze questions D6, dix pommes D7 (horloge et positions déterministes dans le test uniquement), D4, mot de passe final, handover de la boîte et reload de l'état terminé.
- Production sans debug : horloge contrôlée, chaque pause avant/après échéance, reload hors ligne, reprise, URLs legacy, galerie D1 déjà vue directement en FULL sans perte de progression.
- Migration d'une sauvegarde version 3 et protection de la conclusion contre une navigation directe vers sa galerie.

Aucun changement des assets, des questions, du gameplay, du prologue ou des modules de galerie et de révélation decor 1 s + FULL 4 s. Les faces provisoires des autres polaroids restent en place.

Les nouvelles conclusions et pauses sont fonctionnellement testées, pas validées artistiquement. Revue visuelle avec Vincent et test iPhone physique encore nécessaires.

Cache : `voyage-majorque-v1-4-43-chapter-pauses`.
