import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel } from "@drincs/pixi-vn";
import { Live2D } from "@drincs/pixi-vn-live2d";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const SHIZUKU_MODEL =
    "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";

export const startLabel = newLabel("live2d/show", [
    async () => {
        const live2d = new Live2D({
            source: "shizuku",
            xAlign: 0.5,
            yAlign: 1,
            scale: 0.5,
        });
        await live2d.ready;
        canvas.add("shizuku", live2d);
    },
]);

export const live2dShowRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/live2d/show",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
        Assets.add({ alias: "shizuku", src: SHIZUKU_MODEL });
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
