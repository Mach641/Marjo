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
4. Pour tester la vraie géolocalisation hors `localhost`, utiliser de préférence la version GitHub Pages en HTTPS : Safari peut refuser le GPS sur une origine HTTP du réseau local.
5. Charger une première fois toutes les ressources avec du réseau, puis activer le mode avion et rafraîchir pour valider le cache offline.

## Mode debug

Ajouter `?debug=1` avant le hash dans l’URL :

```text
http://localhost:8000/?debug=1
```

Le panneau **Mode test** permet de :

- aller directement à n’importe quelle étape ;
- parcourir librement les défis, voyages temporels et souvenirs ;
- reset complètement la progression ;
- ignorer les verrous de changement de journée ;
- valider la géolocalisation sans GPS ;
- tester l’ensemble du parcours sans attendre les dates réelles.

Le debug est actif uniquement tant que `?debug=1` est présent dans l’URL. Revenir à l’URL normale le désactive immédiatement ; son statut n’est jamais enregistré dans le navigateur.

## Reset de progression

En debug, utiliser **Reset complet**. Hors debug, exécuter dans la console :

```js
localStorage.removeItem("voyage-majorque-v1");
location.reload();
```

## Modifier les contenus

Les textes, défis, souvenirs, coordonnées, dates de déverrouillage et réglages des voyages temporels sont regroupés dans `config.js`. Les mentions `PLACEHOLDER` indiquent ce qui doit encore être remplacé par le contenu définitif.

Les composants réutilisables de la V1 sont séparés dans `time-travel.js`, `gallery-viewer.js`, `road-trip.js` et `family-game.js`.

Pour éviter un ancien cache après une livraison importante, changer `CACHE_NAME` dans `service-worker.js`.
