var VerEx = require("verbal-expressions");

export type RegexParseAction = {
    type: "PARSE",
    regexString: string
};

export const parse = (verbalRegex: string): RegexParseAction => {
    var regexParser = VerEx();

    const regexString: string = regexParser.toString() + 'sample' + verbalRegex;
    return {
        type: "PARSE",
        regexString: regexString
    };
};
