import { Assets, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const alignRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/align",
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

export const startLabel = newLabel("canvas/align", [
    async () => {
        await showImage("eggHead", "eggHead", { align: 0.5 });
        await showImage("flowerTop", "flowerTop", { align: 0 });
        await showImage("panda", "panda", { xAlign: 1, yAlign: 0 });
        await showImage("skully", "skully", { xAlign: 0, yAlign: 1 });
        await showImage("helmlok", "helmlok", { align: 1 });
        await showImage("bunny", "bunny", { xAlign: 0.5, yAlign: 1 });
    },
]);
