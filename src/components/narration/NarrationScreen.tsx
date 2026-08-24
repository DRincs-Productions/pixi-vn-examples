import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryDialogue } from "@/hooks/useQueryInterface";
import ChoiceMenu from "./ChoiceMenu";

export default function NarrationScreen() {
    const { data: { text, character } = {} } = useQueryDialogue();
    const characterName = `${character?.name ?? ""} ${character?.surname ?? ""}`.trim();

    return (
        <div className="absolute inset-0 flex flex-col gap-3 p-4">
            <div className="min-h-0 flex-1">
                <ChoiceMenu />
            </div>
            {text && (
                <Card className="max-h-[45%] shrink-0 bg-card/95 backdrop-blur">
                    <CardContent className="flex min-h-0 gap-3">
                        {character?.icon && (
                            <Avatar size="lg" className="shrink-0">
                                <Image
                                    src={character.icon}
                                    alt=""
                                    className="aspect-square size-full rounded-full object-cover"
                                />
                            </Avatar>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                            {character?.name && (
                                <span
                                    className="font-heading text-sm font-medium"
                                    style={{ color: character.color }}
                                >
                                    {characterName}
                                </span>
                            )}
                            <ScrollArea className="max-h-24">
                                <p className="pr-2 text-sm text-card-foreground">{text}</p>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
