import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    Assets,
    CANVAS_APP_GAME_LAYER_ALIAS,
    effects,
    Game,
    newLabel,
    showImage,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/chromatic-aberration", [
    async () => {
        await showImage("bg", "bg_grass", { scale: 1.3 });
        await showImage("alien", "helmlok", { align: 0.5 });
    },
    async () => {
        await effects.chromaticAberrationEffect("alien");
    },
    async () => {
        await effects.chromaticAberrationEffect("alien", { strength: 15, bursts: 3 });
    },
    async () => {
        await effects.chromaticAberrationEffect(CANVAS_APP_GAME_LAYER_ALIAS);
    },
]);

export const chromaticAberrationRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/chromatic-aberration",
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
