const VerEx = require("verbal-expressions");

export const VerbalStringParser = (text: string): string => {
    let tester = VerEx();
    try {
        eval("tester = " + text);
        return tester.toString();
    } catch (e) {
        throw new Error("Error on converting verbal string to Regex");
    }
};
