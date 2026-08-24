import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { performanceRoute } from "./routes/performance";
import { rootRoute } from "./routes/__root";

export const queryClient = new QueryClient();

const routeTree = rootRoute.addChildren([performanceRoute]);

export const router = createRouter({
    routeTree,
    context: { queryClient },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
