import * as React from "react";

type Props = {
  count :number;
  increase: (count: number) => void;
}
export type State = {
  count: number;
}

export default class Counter extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  onClick(): void {
    const count = this.props.count;
    this.props.increase(count);
  }

  render(): React.ReactNode {
    const count = this.props.count;
    return (
      <div>
        <input type="text" value={count} />
        <input type="button" value="increase" onClick={this.onClick.bind(this)} />
      </div>
    );
  }
}
