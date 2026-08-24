import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    Assets,
    eventDecorator,
    type FederatedEvent,
    Game,
    newLabel,
    showImage,
    type Sprite,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const addListenerGivenEventRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/add-listener-given-event",
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

export class Events {
    @eventDecorator()
    static buttonEvent(event: FederatedEvent, sprite: Sprite): void {
        switch (event.type) {
            case "pointerdown":
                sprite.scale.x *= 1.25;
                sprite.scale.y *= 1.25;
                break;
        }
    }
}

export const startLabel = newLabel("canvas/add-listener-given-event", [
    async () => {
        const bunny = await showImage("bunny", "bunny", {
            align: 0.5,
            anchor: 0.5,
        });
        bunny.eventMode = "static";
        bunny.cursor = "pointer";
        bunny.on("pointerdown", Events.buttonEvent);
    },
]);
