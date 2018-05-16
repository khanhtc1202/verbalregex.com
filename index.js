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
    // $("#verbal_regex").val('VerEx()');

    $("#regex").val('');
    $("#flag").val('');

    $("#match_string").val('');
    $('#match_string').highlightWithinTextarea('update');
})



var codemirror = CodeMirror.fromTextArea(document.getElementById("verbal_regex"), {
    lineNumbers: true,
    styleActiveLine: true,
    theme: 'dracula'
});

codemirror.on('change', function() {
    codemirror.save();
});

// keymap を指定
codemirror.setCursor({
    line: 2,
    ch: 1
});
codemirror.setOption('extraKeys', {
    'Cmd-E': function() {
        snippet()
    },
    'Ctrl-E': function() {
        snippet()
    }
});
// スニペットの配列
const snippets = [{
    text: '.find(\'\')\n',
    displayText: '.find(value)          Find exactly the given value'
}, {
    text: '.maybe(\'\')\n',
    displayText: '.maybe(value)         0 or 1 times'
}, {
    text: '.then(\'\')\n',
    displayText: '.then(value)          Shorthand for find'
}, {
    text: '.anyOf(\'\')\n',
    displayText: '.anyOf(value)         Matches any char in value'
}, {
    text: '.any(\'\')\n',
    displayText: '.any(value)           Shorthand for anyOf'
}, {
    text: '.linebreak()\n',
    displayText: '.linebreak()          Matches any linebreak'
}, {
    text: '.br()\n',
    displayText: '.br()                 Shorthand for linebreak()'
}, {
    text: '.tab()\n',
    displayText: '.tab()                Match tab char'
}, {
    text: '.word()\n',
    displayText: '.word()               Matches at least one word'
}, {
    text: '.endOfLine()\n',
    displayText: '.endOfLine()          Append "$" at end of expression'
}, {
    text: '.startOfLine()\n',
    displayText: '.startOfLine()        Append "^" at start of expression'
}, {
    text: '.anything()\n',
    displayText: '.anything()           Matches everything'
}, {
    text: '.anythingBut(\'\')\n',
    displayText: '.anythingBut(value)   Matches everything excepting letter in given value'
}, {
    text: '.withAnyCase()\n',
    displayText: '.withAnyCase()        Ignore case insensitive (append modifier "i")'
}, {
    text: '.stopAtFirst()\n',
    displayText: '.stopAtFirst()        Stop at first match (remove modifier "g")'
}, {
    text: '.searchOneLine()\n',
    displayText: '.searchOneLine()      Only search in one line (remove modifier "m")'
}, {
    text: '.range(\'\', \'\')\n',
    displayText: '.range(from, to)      Add expression to match a range (or multiply ranges)'
}, {
    text: '.add(\'\')\n'
}, {
    text: '.multiple(\'\')\n'
}, {
    text: '.or()\n'
}];

function snippet() {
    CodeMirror.showHint(codemirror, function() {
        const cursor = codemirror.getCursor();
        const token = codemirror.getTokenAt(cursor);
        const start = token.start;
        const end = cursor.ch;
        const line = cursor.line;
        const currentWord = token.string;
        // 入力した文字列をスニペット配列から探す
        const list = snippets.filter(function(item) {
            return item.text.indexOf(currentWord) >= 0
        });
        return {
            list: list.length ? list : snippets,
            from: CodeMirror.Pos(line, start),
            to: CodeMirror.Pos(line, end)
        }
    }, {
        completeSingle: false
    })
}
