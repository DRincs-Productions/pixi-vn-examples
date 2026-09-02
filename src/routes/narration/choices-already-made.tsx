import { Game, narration, newChoiceOption, newCloseChoiceOption, newLabel } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("narration/choices-already-made", [
    async () => {
        narration.dialogue = "Choose a fruit:";
        narration.choices = [
            newChoiceOption("Orange", startLabel, {}, { type: "jump" }),
            newChoiceOption("Banana", startLabel, {}, { type: "jump" }),
            newChoiceOption("Apple", startLabel, {}, { type: "jump" }),
            newCloseChoiceOption("Cancel"),
        ];
    },
    () => {
        narration.dialogue = "Restart";
    },
]);

export const choicesAlreadyMadeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/narration/choices-already-made",
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
