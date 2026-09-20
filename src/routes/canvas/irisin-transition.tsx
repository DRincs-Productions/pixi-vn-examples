import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, Game, newLabel, transitions } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/irisin-transition", [
    async () => {
        await transitions.irisIn("alien", "eggHead");
        await transitions.irisIn("human", {
            value: ["m01-body", "m01-eyes-smile", "m01-mouth-smile00"],
            options: { scale: 0.5, xAlign: 0.7 },
        });
    },
    async () => {
        await transitions.irisIn("alien", "flowerTop", {
            origin: { x: 0.2, y: 0.8 },
            softness: 25,
        });
        transitions.irisOut("human");
    },
]);

export const irisinTransitionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/irisin-transition",
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
