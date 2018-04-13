import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from "./reducers"

const store = createStore(
  reducers,
  applyMiddleware(createLogger())
);

export default store;
