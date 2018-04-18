import { connect } from "react-redux";

import RegexParser from "../components/RegexParser";
import {
  MapStateToProps,
  MapDispatchToProps,
  Dispatch
} from "react-redux";

import {State} from "../state";
import {parse} from "../actions/RegexParseAction";
import {clearText} from "../actions/ClearTextAction";

type DispatchProps = {
  parse: (verbalRegex: string) => void;
  clear: () => void;
};

const mapStateToProps: MapStateToProps<any, any, State> = (state) => {
  const {
      regexString,
      flagString
  } = state;

  return {
    regexString,
    flagString
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (
  dispatch: Dispatch<any>
) => {
  return {
    parse: (verbalRegex: string) => {
      dispatch(parse(verbalRegex));
    },
    clear: () => {
      dispatch(clearText());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegexParser);
