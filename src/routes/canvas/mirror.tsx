import { Assets, canvas, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/mirror", [
    async () => {
        const alien = await showImage("alien", "eggHead", { align: 0.5, anchor: 0.5 });
        canvas.animate(alien, { scaleX: -1 });
    },
    () => canvas.animate("alien", { scaleX: 1 }),
]);

export const mirrorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/mirror",
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
