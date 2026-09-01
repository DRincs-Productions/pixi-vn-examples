import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Game, canvas, newLabel, showText } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const textCanvasRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/text-canvas",
    loader: async ({ context }) => {
        canvas.app.renderer.background.color = "#ffffff";
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

export const startLabel = newLabel("canvas/text-canvas", [
    async () => {
        const text = await showText("text", "Hello World!", {
            xAlign: 0.5,
            yAlign: 0.5,
        });
        text.style.fontSize = 90;
    },
]);
