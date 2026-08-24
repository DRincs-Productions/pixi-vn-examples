import { createRouter } from "@tanstack/react-router";
import { performanceRoute } from "./routes/performance";
import { rootRoute } from "./routes/__root";

const routeTree = rootRoute.addChildren([performanceRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
