import { combineReducers } from 'redux';

import RegexParser from "./RegexParser";
import ErrorMessage from "./ErrorMessage";
import FlagParser from "./FlagParser";

export default combineReducers({
  regexString: RegexParser,
  flagString: FlagParser,
  message: ErrorMessage
});
