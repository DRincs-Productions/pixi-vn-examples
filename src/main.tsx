import { Assets, Container, Game, canvas } from "@drincs/pixi-vn";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { manifest } from "./assets";
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./constants";
import "./index.css";
import { queryClient, router } from "./router";

const body = document.body;
if (!body) {
    throw new Error("body element not found");
}

Game.init(body, {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: BACKGROUND_COLOR,
}).then(async () => {
    canvas.layers.add("ui", new Container());
    await Assets.init({ manifest, basePath: "/assets/" });

    const root = document.getElementById("root");
    if (!root) {
        throw new Error("root element not found");
    }

    const htmlLayer = canvas.htmlLayers.add("ui", root);
    const reactRoot = createRoot(htmlLayer);

    reactRoot.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </StrictMode>,
    );
});
