import { narration, stepHistory } from "@drincs/pixi-vn";
import type { StoredIndexedChoiceInterface } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { INTERFACE_DATA_QUERY_KEY } from "./useQueryInterface";

export default function useNarrationFunctions() {
    const queryClient = useQueryClient();

    const invalidate = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_QUERY_KEY] }),
        [queryClient],
    );

    const goNext = useCallback(async () => {
        if (!narration.canContinue) {
            return;
        }
        return narration
            .continue({})
            .then(invalidate)
            .catch((e) => console.error(e));
    }, [invalidate]);

    const goBack = useCallback(async () => {
        return stepHistory
            .back({})
            .then(invalidate)
            .catch((e) => console.error(e));
    }, [invalidate]);

    const selectChoice = useCallback(
        async (item: StoredIndexedChoiceInterface) => {
            return narration.choices
                .select(item, {})
                .then(invalidate)
                .catch((e) => console.error(e));
        },
        [invalidate],
    );

    return { goNext, goBack, selectChoice };
}
