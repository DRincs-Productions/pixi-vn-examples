import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel, showAnimatedSprite } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-frames", [
    async () => {
        // Only some frames of the spritesheet, in the given order
        await showAnimatedSprite(
            "fighter",
            {
                spritesheet: "fighter",
                frames: ["rollSequence0000.png", "rollSequence0010.png", "rollSequence0020.png"],
            },
            { anchor: 0.5, align: { x: 0.25, y: 0.5 }, animationSpeed: 0.05 },
        );
        // Frames with a custom duration (in milliseconds)
        await showAnimatedSprite(
            "countdown",
            {
                spritesheet: "digits",
                frames: [
                    { texture: "0123456789 3.ase", time: 1000 },
                    { texture: "0123456789 2.ase", time: 1000 },
                    { texture: "0123456789 1.ase", time: 1000 },
                    { texture: "0123456789 0.ase", time: 2000 },
                ],
            },
            { anchor: 0.5, align: { x: 0.75, y: 0.5 }, scale: 3 },
        );
    },
]);

export const animatedSpriteFramesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-frames",
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
