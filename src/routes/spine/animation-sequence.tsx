import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const SPINEBOY_SKELETON =
    "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/spineboy/export/spineboy-pro.skel";
const SPINEBOY_ATLAS =
    "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/spineboy/export/spineboy-pma.atlas";

export const startLabel = newLabel("spine/animation-sequence", [
    async () => {
        await Assets.load(["spineboySkeleton", "spineboyAtlas"]);
        const spine = new Spine({
            atlas: "spineboyAtlas",
            skeleton: "spineboySkeleton",
            xAlign: 0.5,
            yAlign: 1,
        });
        spine.playSequence([["idle", { loop: true, duration: 0.5 }], "jump"], {
            repeat: Infinity,
        });
        canvas.add("boy", spine);
    },
]);

export const spineAnimationSequenceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/spine/animation-sequence",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
        Assets.add({ alias: "spineboySkeleton", src: SPINEBOY_SKELETON });
        Assets.add({ alias: "spineboyAtlas", src: SPINEBOY_ATLAS });
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
