import { CharacterBaseModel, narration, stepHistory } from "@drincs/pixi-vn";
import { useQuery } from "@tanstack/react-query";

export const INTERFACE_DATA_QUERY_KEY = "pixi-vn-interface";

export function useQueryCanGoBack() {
    return useQuery({
        queryKey: [INTERFACE_DATA_QUERY_KEY, "canGoBack"],
        queryFn: async () => stepHistory.canGoBack,
    });
}

export function useQueryCanGoNext() {
    return useQuery({
        queryKey: [INTERFACE_DATA_QUERY_KEY, "canGoNext"],
        queryFn: async () => narration.canContinue && !narration.input.isRequired,
    });
}

export function useQueryChoiceMenuOptions() {
    return useQuery({
        queryKey: [INTERFACE_DATA_QUERY_KEY, "choices"],
        queryFn: async () =>
            narration.choices.list?.map((option) => ({
                ...option,
                text: typeof option.text === "string" ? option.text : option.text.join(" "),
            })) ?? [],
    });
}

export function useQueryInputValue<T>() {
    return useQuery({
        queryKey: [INTERFACE_DATA_QUERY_KEY, "input"],
        queryFn: async () => ({
            isRequired: narration.input.isRequired,
            type: narration.input.type,
            currentValue: narration.input.value as T | undefined,
        }),
    });
}

export function useQueryDialogue() {
    return useQuery({
        queryKey: [INTERFACE_DATA_QUERY_KEY, "dialogue"],
        queryFn: async () => {
            const dialogue = narration.dialogue;
            let text = dialogue?.text;
            if (Array.isArray(text)) {
                text = text.join(" ");
            }
            const character: CharacterBaseModel | undefined =
                typeof dialogue?.character === "string"
                    ? new CharacterBaseModel(dialogue.character, { name: dialogue.character })
                    : (dialogue?.character as CharacterBaseModel | undefined);

            return { text, character };
        },
    });
}
