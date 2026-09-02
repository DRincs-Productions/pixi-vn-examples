import { Game, narration, newLabel } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("narration/input-prompt", [
    () => {
        narration.dialogue = "Hello";
    },
    () => {
        narration.dialogue = "What is your name?";
        narration.input.request({ type: "string" });
    },
    () => {
        narration.dialogue = `My name is ${narration.input.value}`;
    },
    () => {
        narration.dialogue = "How old are you?";
        narration.input.request({ type: "number" }, 18);
    },
    () => {
        narration.dialogue = `I am ${narration.input.value} years old`;
    },
    () => {
        narration.dialogue = "Describe who you are:";
        narration.input.request({ type: "html textarea" });
    },
    () => {
        narration.dialogue = `${narration.input.value}`;
    },
    () => {
        narration.dialogue = "Restart";
    },
]);

export const inputPromptRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/narration/input-prompt",
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
