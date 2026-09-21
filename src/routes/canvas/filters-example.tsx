import BackButton from "@/components/narration/BackButton";
import ContinueOverlay from "@/components/narration/ContinueOverlay";
import NarrationScreen from "@/components/narration/NarrationScreen";
import TextInputDialog from "@/components/narration/TextInputDialog";
import { Assets, canvas, Game, narration, newLabel, showImage } from "@drincs/pixi-vn";
import { Filters } from "@drincs/pixi-vn/filters";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../__root";

const ALIAS = "alien";

/** One step per registered filter, applying it (alone) to the same image so it's easy to compare. */
const filterSteps: [name: string, build: () => InstanceType<(typeof Filters)[keyof typeof Filters]>][] =
    [
        ["AlphaFilter", () => new Filters.AlphaFilter({ alpha: 0.4 })],
        ["BlurFilter", () => new Filters.BlurFilter({ strength: 12 })],
        ["NoiseFilter", () => new Filters.NoiseFilter({ noise: 0.6 })],
        ["AdjustmentFilter", () => new Filters.AdjustmentFilter({ gamma: 1.8, saturation: 2 })],
        [
            "AdvancedBloomFilter",
            () => new Filters.AdvancedBloomFilter({ threshold: 0.2, bloomScale: 1.5 }),
        ],
        ["AsciiFilter", () => new Filters.AsciiFilter({ size: 8 })],
        ["BackdropBlurFilter", () => new Filters.BackdropBlurFilter({ strength: 10 })],
        ["BevelFilter", () => new Filters.BevelFilter({ thickness: 4, rotation: 45 })],
        ["BloomFilter", () => new Filters.BloomFilter({ strength: 15 })],
        ["BulgePinchFilter", () => new Filters.BulgePinchFilter({ radius: 150, strength: 0.8 })],
        [
            "ColorGradientFilter",
            () =>
                new Filters.ColorGradientFilter({
                    stops: [
                        { offset: 0, color: "red" },
                        { offset: 1, color: "blue" },
                    ],
                    alpha: 0.5,
                }),
        ],
        ["ColorOverlayFilter", () => new Filters.ColorOverlayFilter({ color: 0xff00ff, alpha: 0.5 })],
        [
            "ColorReplaceFilter",
            () => new Filters.ColorReplaceFilter({ targetColor: 0xff0000, tolerance: 0.3 }),
        ],
        ["ConvolutionFilter", () => new Filters.ConvolutionFilter({ matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0], width: 3, height: 3 })],
        ["CrossHatchFilter", () => new Filters.CrossHatchFilter()],
        ["CRTFilter", () => new Filters.CRTFilter({ curvature: 6, lineWidth: 2, vignetting: 0.4 })],
        ["DotFilter", () => new Filters.DotFilter({ scale: 0.6, angle: 5 })],
        ["DropShadowFilter", () => new Filters.DropShadowFilter({ offset: { x: 8, y: 8 }, blur: 4 })],
        ["EmbossFilter", () => new Filters.EmbossFilter(8)],
        ["GlitchFilter", () => new Filters.GlitchFilter({ slices: 10, offset: 30 })],
        ["GlowFilter", () => new Filters.GlowFilter({ distance: 15, outerStrength: 3, color: 0x00ffff })],
        ["GodrayFilter", () => new Filters.GodrayFilter({ gain: 0.6, lacunarity: 2.5 })],
        ["GrayscaleFilter", () => new Filters.GrayscaleFilter()],
        [
            "HslAdjustmentFilter",
            () => new Filters.HslAdjustmentFilter({ hue: 120, saturation: 0.3 }),
        ],
        ["KawaseBlurFilter", () => new Filters.KawaseBlurFilter({ strength: 8 })],
        ["MotionBlurFilter", () => new Filters.MotionBlurFilter({ velocity: { x: 40, y: 0 } })],
        [
            "MultiColorReplaceFilter",
            () =>
                new Filters.MultiColorReplaceFilter({
                    replacements: [
                        [0xffffff, 0xff0000],
                        [0x000000, 0x0000ff],
                    ],
                }),
        ],
        ["OldFilmFilter", () => new Filters.OldFilmFilter({ sepia: 0.5, scratch: 0.5 })],
        ["OutlineFilter", () => new Filters.OutlineFilter({ thickness: 3, color: 0xffff00 })],
        ["PixelateFilter", () => new Filters.PixelateFilter(10)],
        ["RadialBlurFilter", () => new Filters.RadialBlurFilter({ angle: 15, radius: -1 })],
        [
            "ReflectionFilter",
            () => new Filters.ReflectionFilter({ amplitude: [0, 20], waveLength: [30, 100] }),
        ],
        ["RGBSplitFilter", () => new Filters.RGBSplitFilter({ red: { x: -10, y: 0 }, blue: { x: 10, y: 0 } })],
        ["ShockwaveFilter", () => new Filters.ShockwaveFilter({ amplitude: 30, radius: 200 })],
        ["SimplexNoiseFilter", () => new Filters.SimplexNoiseFilter({ strength: 0.5, step: 64 })],
        ["TiltShiftFilter", () => new Filters.TiltShiftFilter({ blur: 30, gradientBlur: 400 })],
        ["TwistFilter", () => new Filters.TwistFilter({ radius: 150, angle: 4 })],
        ["ZoomBlurFilter", () => new Filters.ZoomBlurFilter({ strength: 0.2, innerRadius: 20 })],
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
