import * as React from "react";

type Props = {
    regexString: string;
    parse: (verbalRegex: string) => void;
}

type State = {
    verbalRegex: string;
}

export default class RegexParser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    onChange(e: any): void {
        this.setState({verbalRegex: e.target.value});
    }

    onClick(): void {
        this.props.parse(this.state.verbalRegex);
    }

    render(): React.ReactNode {
        const regexString = this.props.regexString;
        return (
            <div id="inner" className="gainlayout">

                <div id="form_wrapper">
                    <div id="test_and_result">
                        <div className="row input_title">
                            <div className="col-sm-6">
                                <label>Editor:</label>
                            </div>
                            <div className="col-sm-6">
                                <label>Input string:</label>
                            </div>
                        </div>
                        <div className="row input_text">
                            <div id="test_string" className="col-sm-6">
                                <textarea className="text_input" onChange={this.onChange.bind(this)}/>
                            </div>

                            <div id="result" className="col-sm-6">
                                <textarea id="match_string" className="text_input" />
                            </div>
                        </div>

                        <div id="row test_controls">
                            <span id="test_settings">
                              <label>Wrap words <input id="word_wrap" name="word_wrap" type="checkbox" value="1" /></label>
                              <label>Show invisibles <input id="show_invisibles" name="show_invisibles" type="checkbox" value="1" /></label>
                            </span>
                        </div>

                    </div>
                    <div className="row input_title regex_below">
                        <label id="regex_label" htmlFor="regex">Regular expression:</label>
                    </div>
                    <div className="row regex_below flex-container">
                        <span className="slash">/</span>
                        <input id="regex" name="regex" tabIndex={1} type="text" value={regexString} />
                        <span className="slash">/</span>
                        <input id="flag" name="flag" tabIndex={2} type="text" /><br/>
                    </div>

                </div>

                <div className="form_controls">
                    <input type="button" value="parse" onClick={this.onClick.bind(this)} />
                    <input type="button" value="clear fields" />
                </div>

            </div>
        );
    }
}
