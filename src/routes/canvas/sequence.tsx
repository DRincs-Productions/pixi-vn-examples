import { Assets, canvas, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/sequence", [
    async () => {
        const alien = await showImage("alien", "eggHead");
        canvas.animate(
            alien,
            {
                xAlign: [0, 1, 1, 0, 0],
                yAlign: [0, 0, 1, 1, 0],
            },
            { repeat: Infinity, duration: 10 },
        );
    },
]);

export const sequenceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/sequence",
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
