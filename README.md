# Simple Blockchain in TypeScript

Inspired by: https://dev.to/freakcdev297/creating-a-blockchain-in-60-lines-of-javascript-5fka

## Start

```
npm start
```

## Debug in VS Code

<kbd>F5</kbd>

_Note: Re-compile on file change isn't available in debug mode, so stop/start is required to reflect code changes._

## Build

```
npm run build
```

Deployable build will be in `dist` folder.

Command to run production app in Linux / macOS:

```
NODE_PATH=dist/ node ./dist/index.js
```

Command to run production app in Windows:

```
$env:NODE_PATH="dist/"
node ./dist/index.js
```

Explanation of `NODE_PATH=dist/`: https://stackoverflow.com/a/65867369/188740
