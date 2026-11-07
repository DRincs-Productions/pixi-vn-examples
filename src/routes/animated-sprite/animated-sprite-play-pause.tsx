import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, narration, newLabel } from "@drincs/pixi-vn";
import { type AnimatedSprite, showAnimatedSprite } from "@drincs/pixi-vn/canvas";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-play-pause", [
    async () => {
        narration.dialogue = "Play the animation";
        await showAnimatedSprite(
            "pixel-fire",
            {
                spritesheet: "pixel-fire",
                animation: "pixel-fire",
                useFrameDurations: true,
            },
            { anchor: 0.5, align: 0.5 },
        );
    },
    () => {
        narration.dialogue = "Pause the animation";
        canvas.find<AnimatedSprite>("pixel-fire")?.stop();
    },
    () => {
        narration.dialogue = "Resume the animation, slower";
        const fire = canvas.find<AnimatedSprite>("pixel-fire");
        if (fire) {
            fire.animationSpeed = 0.1;
            fire.play();
        }
    },
    () => {
        narration.dialogue = "Go to frame 7 and stop";
        canvas.find<AnimatedSprite>("pixel-fire")?.gotoAndStop(7);
    },
]);

export const animatedSpritePlayPauseRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-play-pause",
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
