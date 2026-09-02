import { Assets, canvas, Game, type ImageSprite, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/move", [
    async () => {
        const alien = await showImage("alien", "eggHead");
        canvas.animate(alien, { xAlign: 1, yAlign: 0 }, { ease: "easeOut" });
    },
    () => canvas.animate<ImageSprite>("alien", { xAlign: 1, yAlign: 1 }, { ease: "backOut" }),
    () => canvas.animate<ImageSprite>("alien", { xAlign: 0, yAlign: 1 }, { ease: "circIn" }),
    () => canvas.animate<ImageSprite>("alien", { xAlign: 0, yAlign: 0 }, { ease: "linear" }),
]);

export const moveRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/move",
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
