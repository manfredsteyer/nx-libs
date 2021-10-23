# Beispiel für Angular Bibliothek

## Notiz: Generatoren mit Bibliothek ausliefern

Damit die Generatoren auch mit der Angular CLI funktionieren, sollten Sie in Schematics umwandeln:

```typescript
import {
  [...]
  convertNxGenerator,
} from '@nrwl/devkit';

[...]


export default async function generate(host: Tree, options: InstallGeneratorSchema) {
  [...]
}

export const schematic = convertNxGenerator(generate);
```

In der ``collection.json`` werden dann sowohl die Generatoren als auch die Schematics eingetragen (siehe libs\tabbed-pane\collection.json).

Tragen Sie die ``collection.json`` sowie den Ordner ``generators`` in Ihrer ``ng-package.json`` unter ``assets`` ein. Letzteres ist notwendig, damit die Templates kopiert werden.

Damit die Generatoren auch ohne NX funktionieren, sollten Sie die verwendeten ``@nrwl/*`` Bibliotheken unter ``allowedNonPeerDependencies`` hinterlegen.

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/libs/tabbed-pane",
  "lib": {
    "entryFile": "src/index.ts"
  },
  "assets": ["collection.json", "src/generators"],
  "allowedNonPeerDependencies": ["@nrwl/devkit", "@nrwl/angular", "@nrwl/workspace"]
}
```

Geben Sie die benötigten ``@nrwl/*`` Bibliotheken auch in der ``package.json`` Ihrer Bibliothek an. Außerdem sollten Sie auf die ``collection.json`` verweisen:

```json
{
  "name": "@my-project/tabbed-pane",
  "version": "1.2.1",
  "peerDependencies": {
    "@angular/common": "^12.2.0",
    "@angular/core": "^12.2.0"
  },
  "dependencies": {
    "tslib": "^2.3.0",
    "@nrwl/angular": "^13.0.2",
    "@nrwl/devkit": "^13.0.2",
    "@nrwl/workspace": "^13.0.2"
  },
  "schematics": "./collection.json"
}
```

Erstellen Sie im Ordner Ihrer Bibliothek eine ``tsconfig.generators.json``:

```json
{
  "compilerOptions": {
    "outDir": "../../dist/libs/tabbed-pane/src/generators",
    "target": "ES5",
    "types": [],
    "lib": ["es2018"],
    "moduleResolution": "node",
    "module": "CommonJS"
  },
  "include": [
    "src/generators/**/*.ts"
  ],
  "exclude": [
    "src/test-setup.ts",
    "**/*.spec.ts",
  ]
}
```

Erstellen Sie sich ein Build-Skript in der package.json in Ihrem Projekt-Root:

```
"build": "nx build tabbed-pane && tsc -p libs/tabbed-pane/tsconfig.generators.json",
```

Nutzen Sie ab nun dieses Skript zum Bauen Ihrer Bibliothek.

