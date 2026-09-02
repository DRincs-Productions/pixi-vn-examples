import { Assets, Game, narration, newLabel, sound } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("sound/sound", [
    async () => {
        await sound.play("sfx_whoosh", { delay: 0.1 });
        await sound.play("bgm_cheerful", { loop: true, channel: "bgm" });
        narration.dialogue =
            "Hello, I'm a cheerful background music that will loop forever until you stop me.";
    },
    () => {
        sound.pause("bgm_cheerful");
        narration.dialogue = "I'm paused, but I can be resumed.";
    },
    () => {
        sound.resume("bgm_cheerful");
        narration.dialogue = "I'm back!";
    },
]);

export const soundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/sound/sound",
    loader: async ({ context }) => {
        await Assets.loadBundle("audio");
        sound.channels.add("bgm", { background: true });
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
