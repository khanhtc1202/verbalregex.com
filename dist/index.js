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

        var re = new RegExp(regexPart,flagPart);


        $('#match_string').highlightWithinTextarea({
            highlight: re,
            className: 'pick-color'
        });
    }
    catch(e){
        console.log("Error: " + e);
        alert("Error on converting verbal string to Regex");
    }
})

// $("#regex").onchange(function(){
//
// })

$('#match_string').highlightWithinTextarea({
    highlight: '',
    className: 'pick-color'
});

$('#clear').click(function(){
    $("#verbal_regex").val('');

    $("#regex").val('');
    $("#flag").val('');

    $("#match_string").val('');
    $('#match_string').highlightWithinTextarea('update');
})
