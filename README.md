# Pixi'VN examples

These examples target **@drincs/pixi-vn v1.9.5**, which has not been released yet.
Canvas transitions use `transitions` and canvas effects use `effects` from `@drincs/pixi-vn`.

Until v1.9.5 is published, run `npm run build` and `npm pack` in the local Pixi'VN library.
Then install that package in this project without changing the dependency declared in
`package.json`:

```sh
npm install --no-save --package-lock=false /path/to/pixi-vn/drincs-pixi-vn-1.9.5.tgz
npm run build
```

After the release, `npm install` will resolve the declared `^1.9.5` dependency normally.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Biome rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Biome configuration

If you are developing a production application, you can adjust the lint and formatter rules in `biome.json`. See the [Biome configuration documentation](https://biomejs.dev/reference/configuration/) for the full list of rules and categories.
