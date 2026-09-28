import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, Game, newLabel, transitions } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/tvin-transition", [
    async () => {
        await transitions.tvIn("alien", "eggHead");
        await transitions.tvIn("human", {
            value: ["m01-body", "m01-eyes-smile", "m01-mouth-smile00"],
            options: { scale: 0.5, xAlign: 0.7 },
        });
    },
    async () => {
        await transitions.tvIn("alien", "flowerTop", { brightness: 4, scanlines: true });
        transitions.tvOut("human");
    },
]);

export const tvinTransitionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/tvin-transition",
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
