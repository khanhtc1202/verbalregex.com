const VerEx = require("verbal-expressions");

export type RegexParseAction = {
    type: "PARSE",
    regexString: string
};

export const parse = (verbalRegex: string): RegexParseAction => {
    const regexParser = VerEx();

    // TODO split verbalRegex to material (strip enter and space before split)


    const regexString: string = regexParser.toString() + 'sample' + verbalRegex;
    return {
        type: "PARSE",
        regexString: regexString
    };
};
