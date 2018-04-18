export type Action = RegexParseAction |
                     DialogRaiseAction;

type RegexParseAction = {
    type: "PARSE",
    regexString: string,
    flagString: string
};

type DialogRaiseAction = {
    type: "DIALOG_RAISE",
    message: string
}
