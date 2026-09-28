import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, narration, newLabel, showImage } from "@drincs/pixi-vn";
import { filters } from "@drincs/pixi-vn/filters";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const ALIAS = "alien";

/**
 * Filters are attached with plain PixiJS `component.filters` - there is no `addFilter`/`removeFilter`
 * API in Pixi'VN. Whatever list you assign is saved with the element, so going back/forward in the
 * narration restores exactly the filters that were active at each step.
 */
function target() {
    const component = canvas.find(ALIAS);
    if (!component) {
        throw new Error(`"${ALIAS}" is not on the canvas`);
    }
    return component;
}

export const startLabel = newLabel("canvas/persistent-filters-example", [
    async () => {
        await showImage(ALIAS, "eggHead", { anchor: 0.5, align: 0.5 });
        narration.dialogue = { text: "No filters yet. Go back and forward to see filters saved/restored at each step." };
    },
    () => {
        target().filters = [new filters.OldFilmFilter({ sepia: 0.8, noise: 0.25, scratch: 0.6, vignetting: 0.35 })];
        narration.dialogue = { text: "OldFilmFilter applied." };
    },
    () => {
        const component = target();
        component.filters = [...(component.filters ?? []), new filters.OutlineFilter({ thickness: 6, color: 0xffee00 })];
        narration.dialogue = { text: "OutlineFilter added, OldFilmFilter kept." };
    },
    () => {
        const component = target();
        component.filters = (component.filters ?? []).filter((f) => !(f instanceof filters.OldFilmFilter));
        narration.dialogue = { text: "OldFilmFilter removed, OutlineFilter kept." };
    },
    () => {
        const component = target();
        component.filters = [
            ...(component.filters ?? []),
            new filters.HslAdjustmentFilter({ hue: 120, saturation: 0, lightness: 0, colorize: false, alpha: 1 }),
        ];
        narration.dialogue = { text: "HslAdjustmentFilter added." };
    },
    () => {
        target().filters = null;
        narration.dialogue = { text: "All filters removed." };
    },
]);

export const persistentFiltersExampleRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/persistent-filters-example",
    loader: async ({ context }) => {
        await Assets.loadBundle("images");
        Game.onEnd(async () => {
            await Game.start(startLabel, {});
            await context.queryClient.invalidateQueries();
        });
        await Game.start(startLabel, {});
        await context.queryClient.invalidateQueries();
    },
    component: () => (
        <ContinueOverlay>
            <NarrationScreen />
            <TextInputDialog />
            <div className="absolute top-3 left-3 z-10">
                <BackButton />
            </div>
        </ContinueOverlay>
    ),
});
