import {Action} from "./types";

export const clearText = (): Action => {
    return {
        type: "CLEAR_TEXT",
        regexString: '',
        flagString: ''
    }
};
