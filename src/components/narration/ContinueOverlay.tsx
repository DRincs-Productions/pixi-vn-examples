import type { ReactNode } from "react";
import { useState } from "react";
import useNarrationFunctions from "@/hooks/useNarrationFunctions";
import { useQueryCanGoNext } from "@/hooks/useQueryInterface";
import { cn } from "@/lib/utils";

export default function ContinueOverlay({ children }: { children: ReactNode }) {
    const { data: canGoNext = false } = useQueryCanGoNext();
    const [loading, setLoading] = useState(false);
    const { goNext } = useNarrationFunctions();

    return (
        <div
            onClick={() => {
                if (!canGoNext || loading) {
                    return;
                }
                setLoading(true);
                goNext().finally(() => setLoading(false));
            }}
            className={cn(
                "pointer-events-auto relative size-full",
                canGoNext && !loading && "cursor-pointer",
            )}
        >
            {children}
        </div>
    );
}
