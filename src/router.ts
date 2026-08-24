import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { currentDialogueRoute } from "./routes/current-dialogue";
import { dialogueGlueRoute } from "./routes/dialogue-glue";
import { performanceRoute } from "./routes/performance";
import { rootRoute } from "./routes/__root";

export const queryClient = new QueryClient();

const routeTree = rootRoute.addChildren([
    performanceRoute,
    currentDialogueRoute,
    dialogueGlueRoute,
]);

export const router = createRouter({
    routeTree,
    context: { queryClient },
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
