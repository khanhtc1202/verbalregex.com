import { combineReducers } from 'redux';

import RegexParser from "./RegexParser";

export default combineReducers({
  regexString: RegexParser
});
