import { combineReducers } from 'redux';

import Counter from './Counter';

export default combineReducers({
  count: Counter
});
