import {VerbalStringParser} from "../infrastructure/VerbalRegexParser";
import {State} from "../state";
import {Dispatch} from "redux";
import {raiseModal} from "./DialogRaiseAction";

export const parse = (verbalRegex: string): any => {

    return (dispatch:Dispatch<State>) => {
        try {
            const regexString: string = VerbalStringParser(verbalRegex);
            var flagPart = regexString.split("/").pop();
            var regexPart = '';
            if(flagPart != undefined){
                regexPart = regexString.substr(1,regexString.length - 2 - flagPart.length);
            }
            else{
                regexPart = regexString.substr(1,regexString.length - 1);
            }

            dispatch(throwRegexString(regexPart, flagPart));
        } catch (e) {
            dispatch(throwRegexString('',''));
            dispatch(raiseModal(e.toString()));
        }
    };

};

const throwRegexString = (regexString: string, flagString: string | undefined = ''): any => {
    return {
        type: "PARSE",
        regexString: regexString,
        flagString: flagString
    };
};
