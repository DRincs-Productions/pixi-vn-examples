import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    Assets,
    canvas,
    Game,
    type ImageContainer,
    newLabel,
    showImageContainer,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const showImageContainerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/show-image-container",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
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

export const startLabel = newLabel("canvas/show-image-container", [
    async () => {
        await showImageContainer("james", ["m01-body", "m01-eyes-smile", "m01-mouth-smile00"], {
            xAlign: 0.5,
            yAlign: 1,
        });
    },
    () => {
        canvas.tickers.removeAll();
        canvas.animate<ImageContainer>("james", { xAlign: 0, yAlign: 1 });
    },
]);
