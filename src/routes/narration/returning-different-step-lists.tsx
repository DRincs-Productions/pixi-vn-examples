import { Game, narration, newLabel, storage } from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { rootRoute } from "../__root";

export const startLabel = newLabel("narration/returning-different-step-lists", () => {
    const condition = storage.flags.get("condition");
    if (condition) {
        return [
            () => {
                narration.dialogue = "Step 2";
            },
            () => {
                narration.dialogue = "Restart";
            },
        ];
    } else {
        return [
            () => {
                narration.dialogue = "Step 1";
            },
            async (props, { labelId }) => {
                storage.flags.set("condition", true);
                return await narration.jump(labelId, props);
            },
        ];
    }
});

export const returningDifferentStepListsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/narration/returning-different-step-lists",
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
