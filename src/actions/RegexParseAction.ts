export type RegexParseAction = {
    type: "PARSE",
    regexString: string
};

export const parse = (verbalRegex: string): RegexParseAction => {
    const regexString: string = 'sample' + verbalRegex;
    return {
        type: "PARSE",
        regexString: regexString
    };
};
