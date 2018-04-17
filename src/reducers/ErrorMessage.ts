import {Action} from "../actions/types";

const initialState: string = '';

export default (state: string = initialState, action: Action): string => {
    switch (action.type) {
        case "DIALOG_RAISE": {
            return action.message
        }
        default: {
            return state;
        }
    }
};
