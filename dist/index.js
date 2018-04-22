

$("#compile").click(function(){
    verbalRegex = $("#verbal_regex").val();
    tester = VerEx();

    try {
        eval("tester = " + verbalRegex);
        regexString = tester.toString();

        var flagPart = regexString.split("/").pop();
        var regexPart = '';
        if(flagPart != undefined){
            regexPart = regexString.substr(1,regexString.length - 2 - flagPart.length);
        }
        else{
            regexPart = regexString.substr(1,regexString.length - 1);
        }

        $("#regex").val(regexPart);
        $("#flag").val(flagPart);
    }
    catch(e){
        console.log("Error: " + e);
        alert("Error on converting verbal string to Regex");
    }
})
