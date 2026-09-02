import { canvas, Game, newLabel, Text, TextStyle } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/text-canvas-style", [
    () => {
        const skewStyle = new TextStyle({
            fontFamily: "Arial",
            dropShadow: {
                alpha: 0.8,
                angle: 2.1,
                blur: 4,
                color: "0x111111",
                distance: 10,
            },
            fill: "#ffffff",
            stroke: { color: "#004620", width: 12, join: "round" },
            fontSize: 60,
            fontWeight: "lighter",
        });

        const skewText = new Text({
            text: "SKEW IS COOL",
            style: skewStyle,
            align: 0.5,
            skew: { x: 0.65, y: -0.3 },
        });

        canvas.add("text", skewText);
    },
]);

export const textCanvasStyleRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/text-canvas-style",
    loader: async ({ context }) => {
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
