jQuery(document).keydown(function(event) {
        // If Control or Command key is pressed and the S key is pressed
        // run save function. 83 is the key code for S.
        if((event.ctrlKey || event.metaKey) && event.which == 13) {
            // Save Function
            event.preventDefault();
            compile();
            return false;
        }
    }
);

const hintText = ["Press Ctrl / Cmd + Enter for compiling","Press Ctrl / Cmd + E for showing code auto complete"];

$("#compile").click(function(){
    compile();
});

$('#clear').click(function(){
    $("#regex").val('');
    $("#flag").val('');

    $("#match_string").val('');
    $('#match_string').highlightWithinTextarea('update');
});

const codemirror = CodeMirror.fromTextArea(document.getElementById("verbal_regex"), {
    lineNumbers: true,
    styleActiveLine: true,
    theme: 'dracula',
    lineWrapping: true
});

$('#match_string').highlightWithinTextarea({
    highlight: '',
    className: 'pick-color'
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

    if(cm.state.completionActive!=null){
        var completion = cm.state.completionActive.data;
        CodeMirror.on(completion, 'pick', function(completion, element) {
            if(completion.text.indexOf("\n") === -1){
                const cursor = codemirror.getCursor();
                const end = cursor.ch;
                const line = cursor.line;

                codemirror.setCursor({line:line,ch:end-2});
            }
        });
    }
}

codemirror.setOption('extraKeys', {
    'Cmd-E': function (cm) {
        showSnippet(cm);
    },
    'Ctrl-E': function (cm) {
        showSnippet(cm);
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
    text: '.lineBreak()\n',
    displayText: '.lineBreak()          Matches any linebreak'
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
        var declineStart = 0;

        if(codemirror.getTokenAt({line:cursor.line,ch:cursor.ch - token.string.length}).string==='.'){
            declineStart = 1;
        }

        const start = token.string===")" ? token.start+1 : token.start;
        const end = cursor.ch;
        const line = cursor.line;
        const currentWord = token.string;
        // 入力した文字列をスニペット配列から探す
        const list = snippets.filter(function(item) {
            return item.text.toLowerCase().indexOf(currentWord.toLowerCase()) >= 0
        });
        return {
            list: list.length ? list : snippets,
            from: CodeMirror.Pos(line, start - declineStart),
            to: CodeMirror.Pos(line, end)
        }
    }, {
        completeSingle: false
    })
}

function validateVerbalString(verbalString) {
    verbalString = verbalString.replace("\n","").replace("\t","");
    if (verbalString.indexOf("\'\'")!==-1) {
        throw "Invalid verbal syntax: missing value";
    }
    if (verbalString.indexOf("VerEx().anything")===0) {
        throw "Invalid verbal syntax: anything";
    }
    if (verbalString.indexOf("VerEx().endOfLine")===0) {
        throw "Invalid verbal syntax: endOfLine";
    }
    if (verbalString.indexOf("VerEx().searchOneLine")===0) {
        throw "Invalid verbal syntax: searchOneLine";
    }
    if (verbalString.indexOf("VerEx().multiple")===0) {
        throw "Invalid verbal syntax: multiple";
    }
    if (verbalString.indexOf("VerEx().or")===0) {
        throw "Invalid verbal syntax: or";
    }
    if (verbalString.indexOf("VerEx().withAnyCase")===0) {
        throw "Invalid verbal syntax: withAnyCase";
    }
}

function compile() {
    let verbalRegex = $("#verbal_regex").val();
    let tester = VerEx();

    try {
        validateVerbalString(verbalRegex);
        eval("tester = " + verbalRegex);
        let regexString = tester.toString();

        var flagPart = regexString.split("/").pop();
        var regexPart = '';
        if(flagPart !== undefined){
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
        // TODO show error in a more beautiful way
        alert("Error on converting verbal string to Regex:\n" + e);
    }
}

var count = 0;
setInterval(function(){
    count = count + 1;
    count = count % 2;

    $("#usage-hint").text(hintText[count]);
}, 5000);

const textarea = document.getElementById('match_string');
tabOverride.autoIndent(false);
tabOverride.set(textarea);
