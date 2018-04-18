import {Action} from "../actions/types";

const initialState: string = '';

export default (state: string = initialState, action: Action): string => {
    switch (action.type) {
        case "PARSE": {
            return action.regexString
        }
        case "CLEAR_TEXT": {
            return action.regexString
        }
        default: {
            return state;
        }
    }
};
