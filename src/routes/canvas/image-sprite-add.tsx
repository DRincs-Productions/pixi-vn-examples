import { addImage, Assets, canvas, Game, type ImageSprite, newLabel } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/image-sprite-add", [
    () => {
        addImage("alien", "eggHead");
        addImage("alien2", "eggHead", {
            xAlign: 0.5,
        });
        addImage("alien3", "eggHead", {
            xAlign: 1,
        });
    },
    async () => {
        const alien1 = canvas.find<ImageSprite>("alien");
        const alien2 = canvas.find<ImageSprite>("alien2");
        const alien3 = canvas.find<ImageSprite>("alien3");
        alien1 && (await alien1.load());
        alien2 && (await alien2.load());
        alien3 && (await alien3.load());
    },
]);

export const imageSpriteAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/image-sprite-add",
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
