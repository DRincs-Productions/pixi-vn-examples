import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { addVideo, Assets, canvas, Game, newLabel, type VideoSprite } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("video/video-sprite-add", [
    () => {
        addVideo("video");
        addVideo("video2", "video", {
            xAlign: 0.5,
        });
        addVideo("video3", "video", {
            xAlign: 1,
        });
    },
    async () => {
        const video1 = canvas.find<VideoSprite>("video");
        const video2 = canvas.find<VideoSprite>("video2");
        const video3 = canvas.find<VideoSprite>("video3");
        video1 && (await video1.load());
        video2 && (await video2.load());
        video3 && (await video3.load());
    },
]);

export const videoSpriteAddRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/video/video-sprite-add",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
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
