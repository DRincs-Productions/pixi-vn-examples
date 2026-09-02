import {
    Game,
    type Label,
    narration,
    newChoiceOption,
    newCloseChoiceOption,
    newLabel,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel: Label = newLabel("narration/choice-menus", [
    async () => {
        narration.dialogue = "Choose a fruit:";
        narration.choices = [
            newChoiceOption("Orange", orangeLabel, {}),
            newChoiceOption("Banana", bananaLabel, {}, { type: "jump" }),
            newChoiceOption("Apple", appleLabel, { quantity: 5 }, { type: "call" }),
            newCloseChoiceOption("Cancel"),
        ];
    },
    () => {
        narration.dialogue = "Restart";
    },
    async (props) => await narration.jump(startLabel, props),
]);

export const choiceMenusRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/narration/choice-menus",
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

const appleLabel = newLabel<{ quantity: number }>("choice-menus-apple", [
    (props) => {
        narration.dialogue = `You have ${props?.quantity ?? 0} apples`;
    },
]);
const orangeLabel = newLabel("choice-menus-orange", [
    () => {
        narration.dialogue = "You have an orange";
    },
]);
const bananaLabel = newLabel("choice-menus-banana", [
    () => {
        narration.dialogue = "You have a banana";
    },
]);
