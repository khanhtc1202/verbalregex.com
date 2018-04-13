import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Counter from "./containers/Counter"

import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("app")
);
