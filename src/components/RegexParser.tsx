import * as React from "react";
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

type Props = {
    regexString: string;
    flagString: string;
    parse: (verbalRegex: string) => void;
    clear: () => void;
}

type State = {
    verbalRegex: string;
    raiseModal: boolean;
}

export default class RegexParser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {verbalRegex: '', raiseModal: false};
    }

    onChange(e: any): void {
        this.setState({verbalRegex: e.target.value});
    }

    onClick(): void {
        this.props.parse(this.state.verbalRegex);
    }

    onClear(): void {
        this.setState({verbalRegex: ''});
        this.props.clear();
    }

    handleOpen(): void {
        this.setState({raiseModal: true});
    }

    handleClose(): void {
        this.setState({raiseModal: false});
    }

    modalComponent(): React.ReactNode {
        const actions = [
            <FlatButton
                label="Done"
                primary={true}
                onClick={this.handleClose.bind(this)}
            />
        ];

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Dialog
                    title="API"
                    actions={actions}
                    modal={false}
                    open={this.state.raiseModal}
                    onRequestClose={this.handleClose.bind(this)}
                    autoScrollBodyContent={true}
                >
                    <div >
                        <code>VerEx()</code>
                        <table>
                            <tbody>
                            <tr>
                                <td><code>.anything()</code></td>
                                <td>
                                    Matches everything
                                </td>
                            </tr>
                            <tr>
                                <td><code>.anythingBut(value)</code></td>
                                <td>Matches everything excepting letter in given value</td>
                            </tr>
                            <tr>
                                <td><code>.endOfLine()</code></td>
                                <td>append "$" at end of expression</td>
                            </tr>
                            <tr>
                                <td><code>
                                    .find(value)</code></td>
                                <td>Find exactly the given value</td>
                            </tr>
                            <tr>
                                <td><code>.maybe(value)</code></td>
                                <td>0 or 1 times</td>
                            </tr>
                            <tr>
                                <td><code>.startOfLine()</code></td>
                                <td>Append "^" at start of expression</td>
                            </tr>
                            <tr>
                                <td><code>.then(value)</code></td>
                                <td>Shorthand for <code>find</code></td>
                            </tr>
                            <tr>
                                <td><code>.withAnyCase()</code></td>
                                <td>
                                    Ignore case insensitive (append modifier "i")
                                </td>
                            </tr>
                            <tr>
                                <td><code>.stopAtFirst()</code></td>
                                <td>Stop at first match (remove modifier "g")</td>
                            </tr>
                            <tr>
                                <td><code>.searchOneLine()</code></td>
                                <td>Only search in one line (remove modifier "m")</td>
                            </tr>
                            <tr>
                                <td><code>
                                    .add(expression)</code></td>
                            </tr>
                            <tr>
                                <td><code>.multiple(value)</code></td>
                            </tr>
                            <tr>
                                <td><code>.or()</code></td>
                            </tr>
                            <tr>
                                <td><code>.anyOf(value)</code></td>
                                <td>
                                    Matches any char in value
                                </td>
                            </tr>
                            <tr>
                                <td><code>.any(value)</code></td>
                                <td>Shorthand for <code>anyOf</code></td>
                            </tr>
                            <tr>
                                <td><code>.linebreak()</code></td>
                                <td>Matches any linebreak</td>
                            </tr>
                            <tr>
                                <td><code>
                                    .br()</code></td>
                                <td>Shorthand for <code>linebreak()</code></td>
                            </tr>
                            <tr>
                                <td><code>.range(from, to)</code></td>
                                <td>Add expression to match a range (or multiply ranges)</td>
                            </tr>
                            <tr>
                                <td><code>.tab()</code></td>
                                <td>match tab char</td>
                            </tr>
                            <tr>
                                <td><code>.word()</code></td>
                                <td>Matches at least one word</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                    <strong>See more <a href={"https://github.com/VerbalExpressions/JSVerbalExpressions/wiki"}>here</a></strong>

                </Dialog>
            </MuiThemeProvider>
        );
    }

    render(): React.ReactNode {
        const regexString = this.props.regexString;
        const flagString = this.props.flagString;
        return (
            <div id="inner" className="gainlayout">
                <div id="form_wrapper">
                    <div id="test_and_result">
                        <div className="row input_title">
                            <div className="col-sm-6">
                                <label>Editor:</label>
                            </div>
                            <div className="col-sm-6">
                                <label >Input string:</label>
                            </div>
                        </div>
                        <div className="row input_text">
                            <div id="test_string" className="col-sm-6">
                                <textarea className="text_input input_box" value={this.state.verbalRegex} onChange={this.onChange.bind(this)}/>
                            </div>

                            <div id="result" className="col-sm-6">
                                <textarea id="match_string" ref="match_string" className="text_input" />
                            </div>
                        </div>
                        <div className="row input_text">
                            <div id="result" className="col-sm-12">
                                <span className="test_settings">
                                    <label  onClick={this.handleOpen.bind(this)} className="help_button">Help</label>
                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="row input_title regex_below">
                        <label id="regex_label" htmlFor="regex">Regular expression:</label>
                    </div>
                    <div className="row regex_below flex-container">
                        <span className="slash">/</span>
                        <input id="regex" className={"input_box"} name="regex" tabIndex={1} type="text" value={regexString} />
                        <span className="slash">/</span>
                        <input id="flag" className={"input_box"} name="flag" tabIndex={2} type="text" value={flagString} /><br/>
                    </div>

                </div>

                <div className="form_controls">
                    <input type="button" value="Compile" onClick={this.onClick.bind(this)} />
                    <input type="button" value="Clear" onClick={this.onClear.bind(this)} />
                </div>
                {this.modalComponent()}
            </div>
        );
    }
}
