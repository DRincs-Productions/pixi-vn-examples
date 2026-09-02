import { CharacterBaseModel, Game, RegisteredCharacters } from "@drincs/pixi-vn";
import { importInkText } from "@drincs/pixi-vn-ink";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../../__root";
import inkText from "./emotions.ink?raw";

const START_KNOT = "start";

const mc = new CharacterBaseModel("mc", {
    name: "Liam",
});

const mcHappy = new CharacterBaseModel(
    { id: "mc", emotion: "happy" },
    {
        name: "Liam happy",
    },
);

RegisteredCharacters.add([mc, mcHappy]);

export const inkCharacterEmotionsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/ink/character/emotions",
    loader: async ({ context }) => {
        await importInkText([inkText]);
        Game.onEnd(async () => {
            await Game.start(START_KNOT, {});
            await context.queryClient.invalidateQueries();
        });
        await Game.start(START_KNOT, {});
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
