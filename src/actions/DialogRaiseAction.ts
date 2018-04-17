import {Action} from "./types";

export const raiseModal = (message: string): Action => {
    // TODO create modal go here
    alert(message);

    return {
        type: "DIALOG_RAISE",
        message: message
    }
};
