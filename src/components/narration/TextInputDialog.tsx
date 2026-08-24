import { narration } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    INTERFACE_DATA_QUERY_KEY,
    useQueryDialogue,
    useQueryInputValue,
} from "@/hooks/useQueryInterface";

export default function TextInputDialog() {
    const { data: { text } = {} } = useQueryDialogue();
    const {
        data: { isRequired: open, currentValue, type } = {
            isRequired: false,
            currentValue: undefined,
            type: undefined,
        },
    } = useQueryInputValue<string | number>();
    const [value, setValue] = useState<string | number>("");
    const queryClient = useQueryClient();

    // biome-ignore lint/correctness/useExhaustiveDependencies: reseed only when the prompt (re)opens, not every time currentValue changes (we're the ones changing it via confirm())
    useEffect(() => {
        if (open) {
            setValue(currentValue ?? "");
        }
    }, [open]);

    const confirm = () => {
        narration.input.value = value;
        queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_QUERY_KEY] });
    };

    return (
        <Dialog open={open}>
            <DialogContent showCloseButton={false} onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Your input is needed</DialogTitle>
                    {text && <DialogDescription>{text}</DialogDescription>}
                </DialogHeader>
                <Input
                    type={type === "number" ? "number" : "text"}
                    value={value}
                    onChange={(e) => {
                        setValue(type === "number" ? e.target.valueAsNumber : e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            confirm();
                        }
                    }}
                />
                <DialogFooter>
                    <Button onClick={confirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
