import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    type AnimatedSprite,
    addAnimatedSprite,
    Assets,
    canvas,
    Game,
    narration,
    newLabel,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("animated-sprite/animated-sprite-add", [
    () => {
        narration.dialogue =
            "The animated sprite has been added, but its frames are not loaded yet";
        addAnimatedSprite("fighter", undefined, {
            anchor: 0.5,
            align: 0.5,
            animationSpeed: 0.4,
        });
    },
    async () => {
        narration.dialogue = "Frames loaded, start playing";
        const fighter = canvas.find<AnimatedSprite>("fighter");
        if (fighter) {
            await fighter.load();
            fighter.play();
        }
    },
]);

export const animatedSpriteAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/animated-sprite/animated-sprite-add",
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
