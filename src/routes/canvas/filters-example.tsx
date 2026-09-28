import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, narration, newLabel, showImage } from "@drincs/pixi-vn";
import { filters } from "@drincs/pixi-vn/filters";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const ALIAS = "alien";

type FilterClassKey = { [K in keyof typeof filters]: (typeof filters)[K] extends abstract new (
    ...args: any
) => any
    ? K
    : never; }[keyof typeof filters];

/** One step per registered filter, applying it (alone) to the same image so it's easy to compare. */
const filterSteps: [name: string, build: () => InstanceType<(typeof filters)[FilterClassKey]>][] = [
        ["AlphaFilter", () => new filters.AlphaFilter({ alpha: 0.4 })],
        ["BlurFilter", () => new filters.BlurFilter({ strength: 12 })],
        ["NoiseFilter", () => new filters.NoiseFilter({ noise: 0.6 })],
        ["AdjustmentFilter", () => new filters.AdjustmentFilter({ gamma: 1.8, saturation: 2 })],
        [
            "AdvancedBloomFilter",
            () => new filters.AdvancedBloomFilter({ threshold: 0.2, bloomScale: 1.5 }),
        ],
        ["AsciiFilter", () => new filters.AsciiFilter({ size: 8 })],
        ["BackdropBlurFilter", () => new filters.BackdropBlurFilter({ strength: 10 })],
        ["BevelFilter", () => new filters.BevelFilter({ thickness: 4, rotation: 45 })],
        ["BloomFilter", () => new filters.BloomFilter({ strength: 15 })],
        ["BulgePinchFilter", () => new filters.BulgePinchFilter({ radius: 150, strength: 0.8 })],
        [
            "ColorGradientFilter",
            () =>
                new filters.ColorGradientFilter({
                    type: 0, // Linear
                    stops: [
                        { offset: 0, color: "red", alpha: 1 },
                        { offset: 1, color: "blue", alpha: 1 },
                    ],
                    alpha: 0.5,
                }),
        ],
        ["ColorOverlayFilter", () => new filters.ColorOverlayFilter({ color: 0xff00ff, alpha: 0.5 })],
        [
            "ColorReplaceFilter",
            () => new filters.ColorReplaceFilter({ targetColor: 0xff0000, tolerance: 0.3 }),
        ],
        ["ConvolutionFilter", () => new filters.ConvolutionFilter({ matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0], width: 3, height: 3 })],
        ["CrossHatchFilter", () => new filters.CrossHatchFilter()],
        ["CRTFilter", () => new filters.CRTFilter({ curvature: 6, lineWidth: 2, vignetting: 0.4 })],
        ["DotFilter", () => new filters.DotFilter({ scale: 0.6, angle: 5 })],
        ["DropShadowFilter", () => new filters.DropShadowFilter({ offset: { x: 8, y: 8 }, blur: 4 })],
        ["EmbossFilter", () => new filters.EmbossFilter(8)],
        ["GlitchFilter", () => new filters.GlitchFilter({ slices: 10, offset: 30 })],
        ["GlowFilter", () => new filters.GlowFilter({ distance: 15, outerStrength: 3, color: 0x00ffff })],
        ["GodrayFilter", () => new filters.GodrayFilter({ gain: 0.6, lacunarity: 2.5 })],
        ["GrayscaleFilter", () => new filters.GrayscaleFilter()],
        [
            "HslAdjustmentFilter",
            () =>
                new filters.HslAdjustmentFilter({
                    hue: 120,
                    saturation: 0.3,
                    lightness: 0,
                    colorize: false,
                    alpha: 1,
                }),
        ],
        ["KawaseBlurFilter", () => new filters.KawaseBlurFilter({ strength: 8 })],
        ["MotionBlurFilter", () => new filters.MotionBlurFilter({ velocity: { x: 40, y: 0 } })],
        [
            "MultiColorReplaceFilter",
            () =>
                new filters.MultiColorReplaceFilter({
                    replacements: [
                        [0xffffff, 0xff0000],
                        [0x000000, 0x0000ff],
                    ],
                }),
        ],
        ["OldFilmFilter", () => new filters.OldFilmFilter({ sepia: 0.5, scratch: 0.5 })],
        ["OutlineFilter", () => new filters.OutlineFilter({ thickness: 3, color: 0xffff00 })],
        ["PixelateFilter", () => new filters.PixelateFilter(10)],
        ["RadialBlurFilter", () => new filters.RadialBlurFilter({ angle: 15, radius: -1 })],
        [
            "ReflectionFilter",
            () => new filters.ReflectionFilter({ amplitude: [0, 20], waveLength: [30, 100] }),
        ],
        ["RGBSplitFilter", () => new filters.RGBSplitFilter({ red: { x: -10, y: 0 }, blue: { x: 10, y: 0 } })],
        ["ShockwaveFilter", () => new filters.ShockwaveFilter({ amplitude: 30, radius: 200 })],
        ["SimplexNoiseFilter", () => new filters.SimplexNoiseFilter({ strength: 0.5, step: 64 })],
        ["TiltShiftFilter", () => new filters.TiltShiftFilter({ blur: 30, gradientBlur: 400 })],
        ["TwistFilter", () => new filters.TwistFilter({ radius: 150, angle: 4 })],
        ["ZoomBlurFilter", () => new filters.ZoomBlurFilter({ strength: 0.2, innerRadius: 20 })],
    ];

export const startLabel = newLabel("canvas/filters-example", [
    async () => {
        await showImage(ALIAS, "eggHead", { anchor: 0.5, align: 0.5 });
        narration.dialogue = { text: "Continue to cycle through every registered filter." };
    },
    ...filterSteps.map(([name, build]) => {
        return async () => {
            const component = canvas.find(ALIAS);
            if (component) {
                component.filters = [build()];
            }
            narration.dialogue = { text: name };
        };
    }),
]);

export const filtersExampleRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/canvas/filters-example",
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
