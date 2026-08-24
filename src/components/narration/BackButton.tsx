import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useNarrationFunctions from "@/hooks/useNarrationFunctions";
import { useQueryCanGoBack } from "@/hooks/useQueryInterface";

export default function BackButton() {
    const { data: canGoBack = false } = useQueryCanGoBack();
    const [loading, setLoading] = useState(false);
    const { goBack } = useNarrationFunctions();

    if (!canGoBack) {
        return null;
    }

    return (
        <Button
            variant="secondary"
            size="icon-sm"
            disabled={loading}
            onClick={(e) => {
                e.stopPropagation();
                setLoading(true);
                goBack().finally(() => setLoading(false));
            }}
        >
            <ArrowLeftIcon />
            <span className="sr-only">Back</span>
        </Button>
    );
}
