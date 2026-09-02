import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, newLabel } from "@drincs/pixi-vn";
import { Spine } from "@drincs/pixi-vn-spine";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const GOBLINS_SKELETON =
    "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/goblins/export/goblins-pro.skel";
const GOBLINS_ATLAS =
    "https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/examples/goblins/export/goblins-pma.atlas";

export const startLabel = newLabel("spine/skin", [
    async () => {
        await Assets.load(["goblinsSkeleton", "goblinsAtlas"]);
        const spine = new Spine({
            atlas: "goblinsAtlas",
            skeleton: "goblinsSkeleton",
            skin: "goblin",
            xAlign: 0.5,
            yAlign: 1,
            animation: "walk",
        });
        canvas.add("goblin", spine);
    },
    () => {
        canvas.find<Spine>("goblin")?.setSkin("goblingirl");
    },
]);

export const spineSkinRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/spine/skin",
    loader: async ({ context }) => {
        Assets.add({ alias: "goblinsSkeleton", src: GOBLINS_SKELETON });
        Assets.add({ alias: "goblinsAtlas", src: GOBLINS_ATLAS });
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
