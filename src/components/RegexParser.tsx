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
            <div>
                <textarea onChange={this.onChange.bind(this)} />
                <br/>
                <input type="button" value="parse" onClick={this.onClick.bind(this)} />
                <hr/>
                <p><strong>Regex:</strong> {regexString}</p>
            </div>
        );
    }
}
