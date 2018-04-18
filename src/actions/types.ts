export type Action = RegexParseAction |
                     DialogRaiseAction |
                     ClearTextAction;

type RegexParseAction = {
    type: "PARSE",
    regexString: string,
    flagString: string
};

type DialogRaiseAction = {
    type: "DIALOG_RAISE",
    message: string
}

type ClearTextAction = {
    type: "CLEAR_TEXT",
    regexString: string,
    flagString: string
}
