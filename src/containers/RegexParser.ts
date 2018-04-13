import { connect } from "react-redux";

import RegexParser from "../components/RegexParser";
import {
  MapStateToProps,
  MapDispatchToProps,
  Dispatch
} from "react-redux";

import {State} from "../state";
import {parse} from "../actions/RegexParseAction";

type DispatchProps = {
  parse: (verbalRegex: string) => void;
};

const mapStateToProps: MapStateToProps<any, any, State> = (state) => {
  const {
      regexString
  } = state;

  return {
    regexString
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: Dispatch<any>
) => {
  return {
    parse: (verbalRegex: string) => {
      dispatch(parse(verbalRegex));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegexParser);
