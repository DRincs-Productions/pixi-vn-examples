import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, CANVAS_APP_GAME_LAYER_ALIAS, effects, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/vignette-pulse", [
    async () => {
        await showImage("background", "bg_grass");
    },
    async () => {
        await effects.vignettePulseEffect(CANVAS_APP_GAME_LAYER_ALIAS);
    },
    async () => {
        await effects.vignettePulseEffect(CANVAS_APP_GAME_LAYER_ALIAS, { radius: 0.7, blur: 0.6, pulses: 3 });
    },
]);

export const vignettePulseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/vignette-pulse",
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
