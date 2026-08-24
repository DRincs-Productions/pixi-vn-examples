import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel, Sprite } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const removeAllCanvasComponentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/remove-all-canvas-components",
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

export const startLabel = newLabel("canvas/remove-all-canvas-components", [
    async () => {
        const texture = await Assets.load("eggHead");
        for (let i = 0; i < 3; i++) {
            const sprite = new Sprite();
            sprite.texture = texture;
            sprite.x = i * 150;
            canvas.add(`sprite${i}`, sprite);
        }
    },
    () => {
        canvas.removeAll();
    },
]);
