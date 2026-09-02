import { Assets, Game, newLabel, removeWithFade, showWithFade } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/fade-transition", [
    async () => {
        await showWithFade("alien", "eggHead", { duration: 5 });
        await showWithFade("human", {
            value: ["m01-body", "m01-eyes-smile", "m01-mouth-smile00"],
            options: { scale: 0.5, xAlign: 0.7 },
        });
    },
    async () => {
        await showWithFade("alien", "flowerTop");
        removeWithFade("human");
    },
]);

export const fadeTransitionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/fade-transition",
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
