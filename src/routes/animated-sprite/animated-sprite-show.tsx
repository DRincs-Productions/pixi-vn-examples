import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel, showAnimatedSprite } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-show", [
    async () => {
        await showAnimatedSprite("explosion", {
            anchor: 0.5,
            align: { x: 0.25, y: 0.5 },
            animationSpeed: 0.5,
        });
        await showAnimatedSprite("fighter", {
            anchor: 0.5,
            align: { x: 0.75, y: 0.5 },
            animationSpeed: 0.4,
        });
    },
]);

export const animatedSpriteShowRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-show",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
        Assets.add({ alias: "explosion", src: "https://pixijs.com/assets/spritesheet/mc.json" });
        Assets.add({ alias: "fighter", src: "https://pixijs.com/assets/spritesheet/fighter.json" });
        Assets.add({
            alias: "digits",
            src: "https://pixijs.com/assets/spritesheet/0123456789.json",
        });
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
