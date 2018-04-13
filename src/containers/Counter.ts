import { connect } from "react-redux";

import Counter from "../components/Counter";
import {increase} from "../actions/CounterAction";
import {
  MapStateToProps,
  MapDispatchToProps,
  Dispatch
} from "react-redux";

import {State} from "../components/Counter"

type DispatchProps = {
  increase: (count: number) => void;
};

const mapStateToProps: MapStateToProps<State, {}, State> = (state) => {
  const count = state.count;

  return {
    count
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: Dispatch<any>
) => {
  return {
    increase: (count: number) => {
      dispatch(increase(count));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
