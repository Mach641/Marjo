# Voyage Majorque — V1

Carnet de voyage romantique statique pour `marjoetvincent.fr`. Le site fonctionne sans build, sans backend et reste compatible avec GitHub Pages.

## Lancer en local

Depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/>.

Ne pas ouvrir directement `index.html` avec une URL `file://` : les modules JavaScript et le service worker nécessitent un serveur HTTP.

## Tester sur iPhone

1. Connecter le Mac et l’iPhone au même Wi-Fi.
2. Lancer le serveur avec `python3 -m http.server 8000 --bind 0.0.0.0`.
3. Relever l’adresse IP locale du Mac, puis ouvrir `http://ADRESSE_DU_MAC:8000/` dans Safari.
4. Pour tester la PWA et son service worker sur iPhone, utiliser la version GitHub Pages en HTTPS. La progression ne dépend pas de la localisation.
5. Charger une première fois toutes les ressources avec du réseau, puis activer le mode avion et rafraîchir pour valider le cache offline.

## Mode debug

Ajouter `?debug=1` avant le hash dans l’URL :

```text
http://localhost:8000/?debug=1
```

Le panneau **Mode test** permet de :

- ouvrir les états disponibles, gameplay, conclusion, révélation, souvenir et remise de chaque défi ;
- tester chaque pause avant l’horaire, après l’horaire et après reprise ;
- utiliser une horloge de test (heure de Paris) sans attendre les dates réelles ;
- revenir au carnet, rejouer le prologue et réinitialiser la progression de test.

Les horaires restent actifs en debug. Les raccourcis construisent leurs états avec la même logique que la production. La sauvegarde de test est séparée de la sauvegarde réelle.

Le debug est actif uniquement tant que `?debug=1` est présent dans l’URL. Revenir à l’URL normale le désactive immédiatement ; son statut n’est jamais enregistré dans le navigateur.

## Reset de progression

En debug, utiliser **Reset complet**. Hors debug, exécuter dans la console :

```js
localStorage.removeItem("voyage-majorque-v1");
location.reload();
```

## Modifier les contenus

Les textes, défis, souvenirs, chapitres, horaires absolus des reprises et réglages des voyages temporels sont regroupés dans `config.js`. Les mentions `PLACEHOLDER` indiquent ce qui doit encore être remplacé par le contenu définitif.

Les composants réutilisables de la V1 sont séparés dans `time-travel.js`, `gallery-viewer.js`, `road-trip.js` et `family-game.js`.

Pour éviter un ancien cache après une livraison importante, changer `CACHE_NAME` dans `service-worker.js`.

Le parcours et sa validation sont décrits dans [FLOW_CANONIQUE.md](FLOW_CANONIQUE.md). `journey-state.js` contient les transitions communes ; `config.js` définit l’ordre et les pauses. La version 4 de sauvegarde repart à zéro pour les anciens états de développement incompatibles.
