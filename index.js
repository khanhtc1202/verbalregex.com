$("#compile").click(function(){
    compile();
})

$('#clear').click(function(){
    $("#regex").val('');
    $("#flag").val('');

    $("#match_string").val('');
})


var editor = CodeMirror.fromTextArea(document.getElementById("match_string"), {
    lineNumbers: false,
    styleActiveLine: true,
    theme: 'dracula',
    lineWrapping: true
  });

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

function showSnippet(cm){
    snippet();
    var completion = cm.state.completionActive.data;
    CodeMirror.on(completion, 'pick', function(completion, element) {
        if(completion.text.indexOf("\n") == -1){
            const cursor = codemirror.getCursor();
            const end = cursor.ch;
            const line = cursor.line;

            codemirror.setCursor({line:line,ch:end-2});
        }
    });
}

codemirror.setOption('extraKeys', {
    'Cmd-E': function (cm) {
        showSnippet(cm);
    },
    'Ctrl-E': function (cm) {
        showSnippet(cm);
    },
    'Cmd-Enter': function () {
        compile();
    },
    'Ctrl-Enter': function () {
        compile();
    }
});

// スニペットの配列
const snippets = [{
    text: '.find(\'\')',
    displayText: '.find(value)          Find exactly the given value'
}, {
    text: '.maybe(\'\')',
    displayText: '.maybe(value)         0 or 1 times'
}, {
    text: '.then(\'\')',
    displayText: '.then(value)          Shorthand for find'
}, {
    text: '.anyOf(\'\')',
    displayText: '.anyOf(value)         Matches any char in value'
}, {
    text: '.any(\'\')',
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
    text: '.anythingBut(\'\')',
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
    text: '.range(\'\', \'\')',
    displayText: '.range(from, to)      Add expression to match a range (or multiply ranges)'
}, {
    text: '.add(\'\')'
}, {
    text: '.multiple(\'\')'
}, {
    text: '.or()\n'
}];

function snippet() {
    CodeMirror.showHint(codemirror, function() {
        const cursor = codemirror.getCursor();
        const token = codemirror.getTokenAt(cursor);
        const start = token.string===")" ? token.start+1 : token.start;
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

function compile() {
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

        if(regexPart != "(?:)")
        {
            const lines = $($('.CodeMirror-code')[1]).children();

            for (var i = 0; i < lines.length; i++) {
                while ((result = re.exec($(lines[i]).text())) !== null) {
                    if(result=="") break;
                    const start = {line: i,ch: result.index};
                    const end = {line: i,ch: result.index + result[0].length};
                    editor.markText(start,end, {className: "cm-matchhighlight"});
                }
            }
        }
        else{
            // TODO show infinite error
        }
    }
    catch(e){
        // TODO show error in a more beautiful way
        console.log(e);
        alert("Error on converting verbal string to Regex");
    }
}
