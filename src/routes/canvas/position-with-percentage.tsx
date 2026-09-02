import { Assets, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/position-with-percentage", [
    async () => {
        await showImage("eggHead", "eggHead", {
            percentagePosition: 0.5,
            anchor: 0.5,
        });
        await showImage("flowerTop", "flowerTop", {
            percentagePosition: 0,
        });
        await showImage("panda", "panda", {
            percentageX: 1,
            percentageY: 0,
            anchor: { x: 1, y: 0 },
        });
        await showImage("skully", "skully", {
            percentageX: 0,
            percentageY: 1,
            anchor: { x: 0, y: 1 },
        });
        await showImage("helmlok", "helmlok", {
            percentagePosition: 1,
            anchor: 1,
        });
        await showImage("bunny", "bunny", {
            percentageX: 0.5,
            percentageY: 1,
            anchor: { x: 0.5, y: 1 },
        });
    },
]);

export const positionWithPercentageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/position-with-percentage",
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
