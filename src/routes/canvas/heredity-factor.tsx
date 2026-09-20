import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    Assets,
    canvas,
    Game,
    newLabel,
    showImage,
    transitions,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const startLabel = newLabel("canvas/heredity-factor", [
    async () => {
        const alien = await showImage("alien", "eggHead", { anchor: 0.5, align: 0.5 });

        canvas.animate(alien, { angle: 360 }, { duration: 5, repeat: Infinity });
        canvas.animate(
            alien,
            { xAlign: [0, 1, 1, 0, 0], yAlign: [0, 0, 1, 1, 0] },
            { repeat: Infinity, duration: 10 },
        );
    },
    async () => await showImage("alien", "flowerTop"),
    async () => await transitions.showWithDissolve("alien", "helmlok"),
    async () => await transitions.showWithFade("alien", "skully"),
    async () => await transitions.moveIn("alien", "eggHead", { removeOldComponentWithMoveOut: true }),
    async () => await transitions.zoomIn("alien", "flowerTop", { removeOldComponentWithZoomOut: true }),
    async () => await transitions.pushIn("alien", "helmlok"),
    async () => await transitions.wipeIn("alien", "skully", { angle: 45, softness: 30 }),
    async () => await transitions.irisIn("alien", "eggHead"),
    async () => await transitions.splitIn("alien", "flowerTop", { orientation: "horizontal" }),
    async () => await transitions.flashIn("alien", "helmlok"),
    async () => await transitions.blurIn("alien", "skully"),
    async () => await transitions.pixelateIn("alien", "eggHead"),
]);

export const heredityFactorRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/heredity-factor",
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
