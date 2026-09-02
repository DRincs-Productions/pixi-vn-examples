import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import {
    Assets,
    canvas,
    Game,
    ImageSprite,
    newLabel,
    Sprite,
    TickerBase,
    tickerDecorator,
    type TickerValue,
} from "@drincs/pixi-vn";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

export const performanceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/performance",
    loader: async ({ context }) => {
        canvas.app.renderer.resize(1440, 960);
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

interface TintingTestTickerArgs {
    direction: number;
    turningSpeed: number;
    speed: number;
}

@tickerDecorator("TintingTestTicker")
export class TintingTestTicker extends TickerBase<TintingTestTickerArgs> {
    override fn(_t: TickerValue, args: TintingTestTickerArgs, aliases: string[]): void {
        aliases.forEach((alias) => {
            // create a bounding box for the little dudes
            const dudeBoundsPadding = 100;
            const dudeBoundsXY = -dudeBoundsPadding;
            const dudeBoundsWidth = canvas.screen.width + dudeBoundsPadding * 2;
            const dudeBoundsHeight = canvas.screen.height + dudeBoundsPadding * 2;

            const dude = canvas.find(alias);
            if (dude && dude instanceof Sprite) {
                args.direction += args.turningSpeed * 0.01;
                dude.x += Math.sin(args.direction) * args.speed;
                dude.y += Math.cos(args.direction) * args.speed;
                dude.rotation = -args.direction - Math.PI / 2;

                // wrap the dudes by testing their bounds...
                if (dude.x < dudeBoundsXY) {
                    dude.x += dudeBoundsWidth;
                } else if (dude.x > dudeBoundsXY + dudeBoundsWidth) {
                    dude.x -= dudeBoundsWidth;
                }

                if (dude.y < dudeBoundsXY) {
                    dude.y += dudeBoundsHeight;
                } else if (dude.y > dudeBoundsXY + dudeBoundsHeight) {
                    dude.y -= dudeBoundsHeight;
                }
            }
        });
    }
}

export const startLabel = newLabel("canvas/performance", [
    async () => {
        const totalDudes = 300;

        for (let i = 0; i < totalDudes; i++) {
            // create a new Sprite that uses the image name that we just generated as its source
            const dude = new ImageSprite({}, "eggHead");
            await dude.load();

            // set the anchor point so the texture is centered on the sprite
            dude.anchor.set(0.5);

            // set a random scale for the dude - no point them all being the same size!
            dude.scale.set(0.8 + Math.random() * 0.3);

            // finally lets set the dude to be at a random position..
            dude.x = Math.random() * canvas.screen.width;
            dude.y = Math.random() * canvas.screen.height;

            dude.tint = Math.random() * 0xffffff;

            const args: TintingTestTickerArgs = {
                direction: 0,
                turningSpeed: 0,
                speed: 0,
            };

            // create some extra properties that will control movement :
            // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
            args.direction = Math.random() * Math.PI * 2;

            // this number will be used to modify the direction of the dude over time
            args.turningSpeed = Math.random() - 0.8;

            // create a random speed for the dude between 2 - 4
            args.speed = 2 + Math.random() * 2;

            canvas.add(`alien${i}`, dude);
            canvas.tickers.add(`alien${i}`, new TintingTestTicker(args));
        }
    },
]);
