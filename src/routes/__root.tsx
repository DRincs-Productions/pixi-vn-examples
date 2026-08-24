import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";

export interface RouterContext {
    queryClient: QueryClient;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet />,
    pendingComponent: () => (
        <div className="flex size-full items-center justify-center">
            <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </div>
    ),
});
