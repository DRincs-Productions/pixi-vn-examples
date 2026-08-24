# pixi-vn-examples

## Purpose

This project is a collection of runnable examples for **Pixi'VN**, the JavaScript/TypeScript engine for creating story-driven games (e.g. Visual Novels).

Each example lives behind its own route. Each route is responsible for starting a specific `label` that demonstrates one Pixi'VN feature or pattern.

## Example lifecycle

Every example follows the same lifecycle:

1. The route mounts and calls `Game.start(labelId, props)` to run the example's `label`.
2. The `label`'s `steps` run through whatever the example is demonstrating.
3. When the `label` finishes (all its `steps` are completed), Pixi'VN triggers `Game.onEnd`.
4. Each example registers its own `Game.onEnd` handler, and that handler restarts the same example by calling `Game.start` on the `start` label again — so an example loops back to its beginning once it reaches the end, instead of leaving the player stuck on a finished narration.

```ts
Game.onEnd(async (props) => {
    Game.start("start", props);
});
```

When adding a new example:

- Give it its own route.
- Give it a `start` label (and any other labels it needs).
- Wire up a `Game.onEnd` handler for that example that restarts it via the `start` label.

## Assets: anime style

Local assets live under `src/assets/<example>/` (one folder per example, matching its route — AssetPack groups bundles by top-level folder, see `.assetpack.ts`).

Whenever an image asset needs to be generated for an example, it **must be generated in anime style** (matching Pixi'VN's focus on story-driven games / visual novels), rather than a generic/realistic/other-style illustration.

## UI components: always use shadcn, never hand-roll

This project uses shadcn (see `components.json`). Whenever a UI component is needed:

1. **First check if shadcn already has it.** Use the shadcn CLI to search/view before writing anything:
   ```bash
   npx shadcn search <query>
   npx shadcn view <component>
   ```
2. **Add it with the CLI** rather than writing the component by hand:
   ```bash
   npx shadcn add <component>
   ```
3. Only write a component from scratch if shadcn genuinely has no equivalent. Never create a component from 0 when a shadcn one exists — extend/compose the generated component under `src/components/ui` instead.
