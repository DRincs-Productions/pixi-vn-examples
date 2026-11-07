import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, narration, newLabel } from "@drincs/pixi-vn";
import { type AnimatedSprite, addAnimatedSprite } from "@drincs/pixi-vn/canvas";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-add", [
    () => {
        narration.dialogue =
            "The Aseprite animation has been added, but its frames are not loaded yet";
        addAnimatedSprite(
            "pixel-fire",
            {
                spritesheet: "pixel-fire",
                animation: "pixel-fire",
                useFrameDurations: true,
            },
            { anchor: 0.5, align: 0.5 },
        );
    },
    async () => {
        narration.dialogue = "Frames loaded, start playing";
        const fire = canvas.find<AnimatedSprite>("pixel-fire");
        if (fire) {
            await fire.load();
            fire.play();
        }
    },
]);

export const animatedSpriteAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-add",
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
