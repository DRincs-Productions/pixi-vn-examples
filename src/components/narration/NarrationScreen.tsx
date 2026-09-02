import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
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
        <div className="absolute inset-0 flex flex-col">
            <div className="min-h-0 flex-1">
                <ChoiceMenu />
            </div>
            {text && (
                <Card
                    size="sm"
                    className="h-[45%] shrink-0 rounded-[16px_16px_0_0] bg-card/95 pb-1 backdrop-blur"
                >
                    <CardContent className="flex min-h-0 flex-1 gap-3 px-2">
                        {character?.icon && (
                            <Avatar size="lg" className="shrink-0">
                                <Image
                                    src={character.icon}
                                    alt=""
                                    className="aspect-square size-full rounded-full object-cover"
                                />
                            </Avatar>
                        )}
                        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-1">
                            {character?.name && (
                                <span
                                    className="font-heading text-sm font-medium"
                                    style={{ color: character.color }}
                                >
                                    {characterName}
                                </span>
                            )}
                            <ScrollArea className="min-h-0 flex-1">
                                <div className="prose prose-sm dark:prose-invert max-w-none pr-2 text-sm text-card-foreground">
                                    <Markdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                    >
                                        {text}
                                    </Markdown>
                                </div>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
