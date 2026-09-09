# Gallery Asset Workflow

## Principe

Les fichiers présents dans `masters/` sont les sources haute qualité officielles.

Ils ne doivent pas être utilisés directement par le site.

Toute illustration destinée au site doit avoir une version web optimisée séparée dans les dossiers d’assets réellement utilisés par le site.

## Workflow obligatoire

Pour chaque illustration de galerie :

1. Archiver le master haute qualité dans :
   `masters/gallery/dX/`

2. Créer une version web optimisée adaptée à l’iPhone et à la PWA.

3. Stocker cette version optimisée dans le dossier d’assets utilisé par le site.

4. Vérifier que le site référence uniquement la version web optimisée, jamais le master.

5. Si un asset déjà référencé est remplacé sous la même URL :
   - incrémenter/invalider la version du cache du service worker.

## Définition de "terminé"

Une image de galerie n’est considérée comme intégrée définitivement que lorsque :

- le master haute qualité est archivé ;
- l’export web optimisé existe ;
- le site référence l’export web ;
- le cache PWA a été mis à jour si nécessaire.

## Convention de nommage recommandée

Masters :

`dX-YY-description-master.png`

Exemple :

`d2-01-lac-annecy-master.png`

Exports web :

`dX-YY-description.webp`

Exemple :

`d2-01-lac-annecy.webp`

## Règle importante

Ne pas remplir `masters/` avec toutes les variantes de travail.

Y stocker uniquement les versions validées comme masters définitifs.
