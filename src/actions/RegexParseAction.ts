import {VerbalStringParser} from "../infrastructure/VerbalRegexParser";
import {State} from "../state";
import {Dispatch} from "redux";
import {raiseModal} from "./DialogRaiseAction";

export const parse = (verbalRegex: string): any => {

    return (dispatch:Dispatch<State>) => {
        try {
            const regexString: string = VerbalStringParser(verbalRegex);
            dispatch(throwRegexString(regexString));
        } catch (e) {
            dispatch(throwRegexString(''));
            dispatch(raiseModal(e.toString()));
        }
    };

};

const throwRegexString = (regexString: string): any => {
    return {
        type: "PARSE",
        regexString: regexString
    };
};
