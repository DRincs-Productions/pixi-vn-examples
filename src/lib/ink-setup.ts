import { type CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";
import { addBaseHashtagCommands, HashtagCommands, TextReplaces } from "@drincs/pixi-vn-ink";
import zod from "zod";

addBaseHashtagCommands();

// Replaces `[characterId]` in ink text with the character's current name.
TextReplaces.add((key) => RegisteredCharacters.get<CharacterBaseModel>(key)?.name, {
    name: "character name",
    validation: "characterId",
    type: "after-translation",
    i18nInterpolation: true,
    description: "Replaces a character ID with the character's name in the game.",
});

// `# rename <characterId> <newName>`
HashtagCommands.add(
    async (script) => {
        const character = RegisteredCharacters.get<CharacterBaseModel>(script[1]);
        if (character) {
            character.name = script[2];
        }
        return true;
    },
    {
        name: "character rename",
        description:
            "Renames a character in the game.\n\n```ink\n# rename <characterId> <newName>\n```",
        validation: zod.tuple([zod.literal("rename"), zod.string(), zod.string()]),
    },
);
