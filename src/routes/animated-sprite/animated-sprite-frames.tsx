import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel } from "@drincs/pixi-vn";
import { showAnimatedSprite } from "@drincs/pixi-vn/canvas";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-frames", [
    async () => {
        // Only some frames of the spritesheet, in the given order
        await showAnimatedSprite(
            "pixel-fire",
            {
                spritesheet: "pixel-fire",
                frames: ["pixel-fire_0", "pixel-fire_4", "pixel-fire_8", "pixel-fire_13"],
            },
            { anchor: 0.5, align: { x: 0.25, y: 0.5 }, animationSpeed: 0.4 },
        );
        // Explicit per-frame timing overrides the duration stored in the Aseprite file
        await showAnimatedSprite(
            "pixel-fire-timed",
            {
                spritesheet: "pixel-fire",
                frames: [
                    { texture: "pixel-fire_0", time: 500 },
                    { texture: "pixel-fire_5", time: 500 },
                    { texture: "pixel-fire_10", time: 1000 },
                ],
            },
            { anchor: 0.5, align: { x: 0.75, y: 0.5 }, scale: 2 },
        );
    },
]);

export const animatedSpriteFramesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-frames",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
        await Assets.loadBundle("animated-sprite");
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
