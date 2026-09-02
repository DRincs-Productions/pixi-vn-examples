import path from "node:path";
import { AssetPack } from "@assetpack/core";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import assetPackConfig from "./.assetpack.ts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), assetpackPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
    assetsInclude: ["**/*.ink"],
});

function assetpackPlugin(): Plugin {
    let mode: ResolvedConfig["command"];
    let ap: AssetPack | undefined;

    return {
        name: "vite-plugin-assetpack",
        configResolved(resolvedConfig) {
            mode = resolvedConfig.command;
            if (!resolvedConfig.publicDir) return;
            if (assetPackConfig.output) return;
            const publicDir = resolvedConfig.publicDir.replace(process.cwd(), "");
            assetPackConfig.output = `.${publicDir}/assets/`;
        },
        buildStart: async () => {
            if (mode === "serve") {
                if (ap) return;
                ap = new AssetPack(assetPackConfig);
                void ap.watch();
            } else {
                await new AssetPack(assetPackConfig).run();
            }
        },
        buildEnd: async () => {
            if (ap) {
                await ap.stop();
                ap = undefined;
            }
        },
    };
}
