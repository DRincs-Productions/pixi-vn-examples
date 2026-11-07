import fs from "node:fs/promises";
import type { AssetPackConfig, AssetPipe } from "@assetpack/core";
import { path } from "@assetpack/core";
import { aseprite, asepriteManifestMod } from "@drincs/assetpack-plugin-aseprite";
import { pixiPipes } from "@assetpack/core/pixi";

const manifestOutput = "src/assets/manifest.gen.json";

/**
 * AssetPack only creates a manifest bundle for folders explicitly tagged
 * with "{m}" (see pixiManifest's `manifest` tag); everything else lands in
 * the single "default" bundle. This splits the "default" bundle into one
 * bundle per top-level folder under the assets entry, named after that
 * folder, so bundles mirror the folder structure without needing to tag
 * every folder manually. Files directly at the entry root (no folder) stay
 * in "default". Runs after the manifest has been written to disk, so it
 * re-reads and rewrites the file.
 */
function groupBundlesByFolder(options: { output: string }): AssetPipe<{ output: string }> {
    return {
        name: "group-bundles-by-folder",
        defaultOptions: options,
        async finish(_asset, opts) {
            const manifest = JSON.parse(await fs.readFile(opts.output, "utf-8"));

            const bundles = new Map<string, { name: string; assets: unknown[] }>();
            for (const bundle of manifest.bundles) {
                if (bundle.name !== "default") {
                    bundles.set(bundle.name, bundle);
                    continue;
                }
                for (const asset of bundle.assets) {
                    const folder = path.dirname(asset.src[0]).split("/")[0];
                    const bundleName = folder === "." ? "default" : folder;
                    const target = bundles.get(bundleName) ?? {
                        name: bundleName,
                        assets: [],
                    };
                    target.assets.push(asset);
                    bundles.set(bundleName, target);
                }
            }
            manifest.bundles = [...bundles.values()];

            await fs.writeFile(opts.output, JSON.stringify(manifest, null, 2));
        },
    };
}

const config: AssetPackConfig = {
    entry: "./src/assets",
    output: "./public/assets",
    cache: true,
    cacheLocation: ".assetpack",
    ignore: ["**/*.ts", "**/*.js", "**/*.gen.*"],
    pipes: [
        aseprite(),
        ...pixiPipes({
            manifest: {
                output: manifestOutput,
                createShortcuts: true,
                trimExtensions: true,
            },
        }),
        groupBundlesByFolder({ output: manifestOutput }),
        asepriteManifestMod({ output: manifestOutput }),
    ],
};

export default config;
