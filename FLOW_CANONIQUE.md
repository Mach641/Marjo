# Parcours canonique — V1.4.42

Ordre unique : **1 → 8 → 2 → 3 → 5 → 6 → 7 → 4**, fourni par `CONFIG.routeOrder`.

## État et navigation

La persistance existante est conservée, sans changement de `stateVersion` ni remise à zéro :

- `completedChallenges[id]` : défi réussi, polaroid face visible aux visites ultérieures.
- `pendingNotebookReveal` : événement transitoire partagé, déclenchant le retournement uniquement au moment de la première réussite. Aucun rejeu au rechargement.
- `galleryViewed[id]` et `revealedScenes` : consultation du contenu et des scènes ; mécanique decor/full inchangée.
- `illustrations[id]` : remise physique / souvenir terminé. C'est cette validation, pas la seule réussite du défi, qui rend le prochain verso accessible.
- `currentStep` : progression conservée, sans régression lors de la relecture d'un ancien souvenir.

`completeChallenge` et `finishSouvenir` sont les deux transitions communes. `notebookChapterIds` affiche les souvenirs acquis et le premier défi accessible, sans exposer les défis futurs. Les anciennes sauvegardes avec une remise validée sont normalisées comme défi terminé, sans effacer leurs autres données.

Le hub est toujours `book-open` / « NOTRE VOYAGE ». `book-closed` est désormais un alias vers ce hub. Les cartes conservent leur taille, leurs rotations, leur grille à deux colonnes (les quatre premières en 2×2), leurs tapes et le titre validé. Quand les rangées suivantes dépassent l'écran, le carnet défile pour rendre la récompense active visible.

Les faces D2–D8 restent provisoires, en papier avec leur titre existant, conformément à l'accord utilisateur. Aucun asset n'est inventé ou remplacé.

## Parcours par défi

| Défi | Réussite → carnet | Contenu ouvert depuis la face | Fin du souvenir → nouveau verso |
|---|---|---|---|
| D1 | Six portes → flip Vincennes | Galerie portrait existante → handover validé | D8 |
| D8 | Sept chansons → conclusion arc-en-ciel conservée → Continuer → flip | Galerie existante → handover commun | D2 |
| D2 | Dernière réponse du test → flip | Résultats du profil conservés → galerie → handover | D3 |
| D3 | Dernière photo identifiée → flip | Galerie → handover | D5 |
| D5 | Fin de l'itinéraire → flip | Galerie Stockholm → handover | D6 |
| D6 | Quatre thèmes et leurs illustrations intermédiaires → flip | Conclusion existante → remise finale, sans galerie classique ajoutée | D7 |
| D7 | Dix pommes → flip | Conclusion existante → handover | D4 |
| D4 | Moment « Samedi soir / Marche jusqu'au banc » → Continuer → flip | Moment Majorque existant et son « Je l'ai » | Aucun ; accès à la fin globale existante |

Les étapes de calendrier, départ et géolocalisation précédant D2, celles du samedi précédant D5, et le retour au présent précédant D4 restent accessibles depuis leur verso. Elles ne s'interposent plus entre une remise et le retour au carnet. Une reprise en cours de ces étapes repart de l'étape sauvegardée.

D4 n'avait pas de mini-jeu ni de bouton de fin : un bouton « Continuer » termine désormais le moment du banc avant la révélation. Après la remise D4, « Continuer le voyage » reprend `order`, puis les lettres, le mot de passe et la dernière page existants. Aucun défi supplémentaire.

## Anciennes branches débranchées

- Carnet fermé « Notre carnet » et carnet ouvert « Mes souvenirs » remplacés par le hub unique.
- `resolution-1` à `resolution-8` deviennent les entrées canoniques de réussite, y compris le nouveau raccourci D4.
- Anciennes pages de résolution D3/D5/D8 et l'écran D8 « Celle-là, garde-la… » retirés du parcours.
- `analysis-2` et `reveal-5/6` sont des alias de réussite ; les résultats utiles D2 et les conclusions D6/D7 sont conservés dans le contenu souvenir.
- Aucun changement dans les modules des défis, les modules de galerie, le swipe, le plein écran ou la révélation decor 1 s + fade FULL 4 s.
- Handover D1 réutilisé pour les remises physiques D2/D3/D5/D6/D7/D8. Majorque conserve sa conclusion particulière.

## Vérification

`tests/canonical-journey.cjs` démarre un serveur temporaire et utilise Playwright. Installation de Playwright requise ; `PLAYWRIGHT_MODULE` et `CHROME_PATH` peuvent désigner une installation existante.

```sh
node tests/canonical-journey.cjs
```

Ce test parcourt les huit raccourcis Resolution puis une progression ininterrompue : six portes, sept chansons, quarante réponses du profil, trois photos, cinq étapes de route, vingt-quatre questions avec quatre illustrations, dix pommes (horloge et positions des pommes déterministes dans le test seulement), puis Majorque. Il contrôle à chaque étape le flip unique, les cartes visibles, le prochain verso, le handover et la reprise après rechargement.

Contrôles complémentaires effectués dans Chrome mobile : D1 réel comparé au raccourci, reprise PWA hors ligne sans debug, scènes D1 déjà vues directement en FULL, aucune perte de progression, dernière récompense visible à 320 et 390 px. Pas de nouveau test sur iPhone physique dans cette passe.

Cache : `voyage-majorque-v1-4-42-canonical-journey`.
