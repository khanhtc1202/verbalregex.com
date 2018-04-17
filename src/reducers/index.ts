import { combineReducers } from 'redux';

import RegexParser from "./RegexParser";
import ErrorMessage from "./ErrorMessage";

export default combineReducers({
  regexString: RegexParser,
  message: ErrorMessage
});
