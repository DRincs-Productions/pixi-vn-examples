import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel, Sprite } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const getCanvasComponentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/get-canvas-components",
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

export const startLabel = newLabel("canvas/get-canvas-components", [
    async () => {
        const sprite = new Sprite();
        const texture = await Assets.load("eggHead");
        sprite.texture = texture;
        canvas.add("sprite", sprite);
    },
    () => {
        const sprite = canvas.find("sprite");
        if (sprite) {
            sprite.x = 100;
            sprite.y = 100;
        }
    },
]);
