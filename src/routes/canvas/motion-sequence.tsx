import { Assets, canvas, Game, newLabel, showImage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const motionSequenceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/motion-sequence",
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

export const startLabel = newLabel("canvas/motion-sequence", [
    async () => {
        const alien = await showImage("alien", "eggHead");
        canvas.animate(
            alien,
            [
                [{ xAlign: 0, yAlign: 0 }, { ease: "circInOut" }],
                [{ xAlign: 1, yAlign: 0 }, { ease: "backInOut" }],
                [{ xAlign: 1, yAlign: 1 }, { ease: "linear" }],
                [{ xAlign: 0, yAlign: 1 }, { ease: "anticipate" }],
                [{ xAlign: 0, yAlign: 0 }, { ease: "easeOut" }],
            ],
            { repeat: 10, duration: 10 },
        );
    },
]);
