import {
    Assets,
    CharacterBaseModel,
    Game,
    narration,
    newLabel,
    RegisteredCharacters,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "./__root";

export const currentDialogueRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/current-dialogue",
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

export const eggHead = new CharacterBaseModel("egg-head", {
    name: "Egg",
    surname: "Head",
    age: 25,
    icon: "eggHead",
    color: "#9e2e12",
});
RegisteredCharacters.add([eggHead]);

export const startLabel = newLabel("current-dialogue", [
    () => {
        // in this example, there is no character with id 'Alice'
        // so when you get the current dialogue, the character is a fake character with the name 'Alice'
        narration.dialogue = {
            character: "Alice",
            text: "Hello, world!",
        };
    },
    () => {
        // in this example, there is a character with id 'egg-head'
        // so when you get the current dialogue, the character is the character with id 'egg-head'
        narration.dialogue = {
            character: "egg-head",
            text: "Hello, world!",
        };
        // or better
        narration.dialogue = {
            character: eggHead,
            text: "Hello, world!",
        };
    },
    // if you don't want to set a character, you can set a string
    () => (narration.dialogue = "Hello, world!"),
]);
