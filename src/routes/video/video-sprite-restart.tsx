import {
    Assets,
    canvas,
    Game,
    narration,
    newLabel,
    showVideo,
    type VideoSprite,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const videoSpriteRestartRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/video/video-sprite-restart",
    loader: async ({ context }) => {
        await Assets.loadBundle("videos");
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

export const startLabel = newLabel("video/video-sprite-restart", [
    async () => {
        narration.dialogue = "add video";
        await showVideo("video");
    },
    async () => {
        narration.dialogue = "restart video";
        const video = canvas.find<VideoSprite>("video");
        if (video) {
            video.restart();
        }
    },
]);
