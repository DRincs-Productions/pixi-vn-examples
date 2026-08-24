import { Game, narration, newLabel } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "./__root";

export const dialogueGlueRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/dialogue-glue",
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

export const startLabel = newLabel("dialogue-glue", [
    () => {
        narration.dialogue = "Hello, my name is Alice and ...";
    },
    () => {
        // "glue" appends the next dialogue to the current one instead of replacing it
        narration.dialogGlue = true;
        narration.dialogue = "I am a character in this game.";
    },
]);
