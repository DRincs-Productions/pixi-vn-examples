# pixi-vn-examples

## Purpose

This project is a collection of runnable examples for **Pixi'VN**, the JavaScript/TypeScript engine for creating story-driven games (e.g. Visual Novels).

Each example lives behind its own route. Each route is responsible for starting a specific `label` that demonstrates one Pixi'VN feature or pattern.

## Example lifecycle

Every example follows the same lifecycle:

1. The route mounts and calls `Game.start(label, props)` to run the example's entry `label`.
2. The `label`'s `steps` run through whatever the example is demonstrating.
3. When the `label` finishes (all its `steps` are completed), Pixi'VN triggers `Game.onEnd`.
4. Each example registers its own `Game.onEnd` handler, and that handler restarts the same example by calling `Game.start` on its entry `label` again — so an example loops back to its beginning once it reaches the end, instead of leaving the player stuck on a finished narration.

```ts
Game.onEnd(async () => {
    await Game.start(startLabel, {});
});
```

**Label ids must be unique across the whole app — never name them `"start"`.** `newLabel(id, ...)` registers into one process-wide registry (`RegisteredLabels`, keyed by that id string), and `Game.start`/`narration.jump` resolve labels by id, not by the JS object reference you pass. Since every route's module is statically imported by `src/router.ts` and evaluated in the same bundle, two examples both calling `newLabel("start", [...])` silently collide — whichever module happens to be evaluated last wins, and *every* route ends up running that one label. Name each example's entry label after its own route instead (e.g. `newLabel("performance", [...])`, `newLabel("current-dialogue", [...])`).

When adding a new example:

- Give it its own route.
- Give it an entry label id that matches the route (and any other labels it needs, also uniquely named).
- Wire up a `Game.onEnd` handler for that example that restarts it via its entry label.

## Characters: define per-route, not globally

`CharacterBaseModel`s (and their `RegisteredCharacters.add(...)` registration) must be defined **inside the route file that uses them**, not in a shared/global file (e.g. no `src/values/characters.ts` imported by multiple routes). Each route is self-contained, matching how canvas routes each define their own local consts (e.g. `heredity-factor.tsx`'s alien setup) instead of pulling from a shared module. If two routes happen to need "the same" character (e.g. several `ink/character/*` examples all using an `mc`/"Liam" character), redefine it identically in each route file rather than factoring it out.

## Assets: anime style

Local assets live under `src/assets/<folder>/` — AssetPack groups bundles by top-level folder (see `.assetpack.ts`), and a route loads the bundle(s) it needs with `Assets.loadBundle("<folder>")` in its `loader`. Assets used by more than one example (e.g. `src/assets/images/`) go in a shared folder rather than being duplicated per example — duplicating a file under two folders would also register its alias twice, and the manifest's alias-dedup logic would rename the second occurrence, breaking the alias examples expect (e.g. `"eggHead"`).

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
