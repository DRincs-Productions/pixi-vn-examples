import { Button } from "@/components/ui/button";
import useNarrationFunctions from "@/hooks/useNarrationFunctions";
import { useQueryChoiceMenuOptions } from "@/hooks/useQueryInterface";

export default function ChoiceMenu() {
    const { data: menu = [] } = useQueryChoiceMenuOptions();
    const { selectChoice } = useNarrationFunctions();

    if (menu.length === 0) {
        return null;
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="flex size-full flex-col items-center justify-[safe_center] gap-2 overflow-auto p-2"
        >
            {menu.map((item) => (
                <Button
                    key={item.choiceIndex}
                    variant="secondary"
                    size="lg"
                    className="w-full max-w-sm"
                    onClick={() => selectChoice(item)}
                >
                    {item.text}
                </Button>
            ))}
        </div>
    );
}
