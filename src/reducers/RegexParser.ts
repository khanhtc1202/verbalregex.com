import {RegexParseAction} from "../actions/RegexParseAction";

const initialState: string = '';

export default (state: string = initialState, action: RegexParseAction): string => {
    switch (action.type) {
        case "PARSE": {
            return action.regexString
        }
        default: {
            return state;
        }
    }
};
