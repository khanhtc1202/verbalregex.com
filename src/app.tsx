import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import store from "./store";
import RegexParser from "./containers/RegexParser";

ReactDOM.render(
  <Provider store={store}>
      <div>
          <RegexParser />
      </div>
  </Provider>,
  document.getElementById("app")
);
